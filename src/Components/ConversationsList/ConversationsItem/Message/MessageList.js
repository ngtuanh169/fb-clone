import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../../../Socket";
import messageApi from "../../../../api/messageApi";
import MessageItem from "./MessageItem";
function MessageList({
    data,
    messageList,
    setMessageList = () => {},
    loading,
    setLoading = () => {},
    callApi,
    setCallApi = () => {},
    setGetMessage = () => {},
    number,
    setNumber = () => {},
}) {
    const socketContext = useContext(SocketContext);
    const [payload, setPayload] = useState({ limit: 15, page: 0 });
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const countMessage = async () => {
            try {
                setLoading(true);
                const res = await messageApi.countMessage({
                    conversationsId: data.conversationsId,
                });
                if (res.success && res.count > 0) {
                    setPayload({ ...payload, page: 1 });
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setCallApi(true);
                }
                if (res.count === 0) {
                    setGetMessage(false);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        data.conversationsId && countMessage();
    }, [data.conversationsId]);

    useEffect(() => {
        const getMessage = async () => {
            try {
                setLoading(true);
                const res = await messageApi.getMessage({
                    conversationsId: data.conversationsId,
                    limit: payload.limit,
                    page: payload.page,
                    number,
                });
                if (res.success) {
                    setMessageList([...messageList, ...res.data]);
                    setPayload({ ...payload, page: payload.page + 1 });
                }
                if (payload.page === totalPage && totalPage > 0) {
                    setGetMessage(false);
                }
                setLoading(false);
                setCallApi(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (callApi && !loading && payload.page <= totalPage) getMessage();
    }, [callApi]);

    useEffect(() => {
        const handleOnMessage = (e) => {
            const socketdata = JSON.parse(e.data);
            console.log(socketdata);
            if (socketdata.type === "message") {
                setMessageList((prev) => [socketdata, ...prev]);
                setNumber((prev) => prev + 1);
            }
        };
        socketContext &&
            socketContext.addEventListener("message", handleOnMessage);
        return () =>
            socketContext &&
            socketContext.removeEventListener("message", handleOnMessage);
    }, [socketContext]);
    return (
        <div className="w-full flex flex-col-reverse px-2">
            {messageList.length > 0 &&
                messageList.map((item, index) => (
                    <MessageItem
                        key={index}
                        data={data}
                        item={item}
                        index={index}
                    />
                ))}
        </div>
    );
}

export default MessageList;
