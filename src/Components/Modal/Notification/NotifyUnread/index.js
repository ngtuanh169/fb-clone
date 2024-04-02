import { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../Socket";
import notificationApi from "../../../../api/notificationApi";
import SkeletonLoading from "../../../SkeletonLoading";
import NotifyItem from "../NotifyItem";
function NotifyUnread({
    closeModal = () => {},
    callApi,
    setCallApi = () => {},
    loading,
    setLoading = () => {},
}) {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const [payload, setPayload] = useState({ limit: 8, page: 1, number: 0 });
    const [notifyList, setNotifyList] = useState([]);
    const [totalPage, setTotalPage] = useState(0);

    useEffect(() => {
        const countNotifyUnread = async () => {
            try {
                setLoading(true);
                callApi && setCallApi(false);
                const res = await notificationApi.countNotifyUnread({
                    userId: user.userId,
                });
                if (res.success && res.count > 0) {
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setCallApi(true);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        user?.userId && countNotifyUnread();
    }, []);

    useEffect(() => {
        const getNotifyUnread = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await notificationApi.getNotifyUnread(params);
                setNotifyList([...notifyList, ...res]);
                setPayload({ ...payload, page: payload.page + 1 });
                setLoading(false);
                setCallApi(false);
            } catch (error) {
                console.log(error);
            }
        };
        if (callApi && user?.userId && payload.page <= totalPage)
            getNotifyUnread();
    }, [callApi]);

    useEffect(() => {
        const handleOnMessage = (e) => {
            const data = JSON.parse(e.data);
            data.type =
                "notification" &&
                data.typeNoti !== "friendRequest" &&
                setPayload((prev) => {
                    return { ...prev, number: prev.number + 1 };
                });
        };
        socketContext &&
            socketContext.addEventListener("message", handleOnMessage);
        return () =>
            socketContext &&
            socketContext.removeEventListener("message", handleOnMessage);
    }, [socketContext]);

    return (
        <div className="flex flex-col w-full">
            {notifyList.length === 0 && (
                <div className="w-full text-center">
                    <span className="text-[15px] text-gray-500">
                        Không có thông báo mới
                    </span>
                </div>
            )}
            {notifyList.length > 0 &&
                notifyList.map((item, index) => (
                    <NotifyItem
                        key={item.id}
                        data={item}
                        closeModal={closeModal}
                    />
                ))}
            {loading &&
                Array(2)
                    .fill(0)
                    .map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full h-14 mb-2"
                        >
                            <div className="h-14 w-14 mr-4">
                                <SkeletonLoading circle={true} />
                            </div>
                            <div className="flex-1 h-[15px]">
                                <SkeletonLoading />
                            </div>
                        </div>
                    ))}
        </div>
    );
}

export default NotifyUnread;
