import { useState, useRef, createContext, useEffect } from "react";
import LoadingCircleLine from "../../../LoadingCircleLine";
import InfoUser from "./InfoUser";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
export const ContextValue = createContext();
function Message({ data = {}, isFocus, setIsFocus = () => {} }) {
    const scrollRef = useRef();
    const [scrollValue, setScrollValue] = useState(0);
    const [messageList, setMessageList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callApi, setCallApi] = useState(false);
    const [getMessage, setGetMessage] = useState(true);
    const [number, setNumber] = useState(0);
    useEffect(() => {
        const handleOnScroll = (e) => {
            if (
                e.target.scrollHeight - 2 <
                e.target.offsetHeight - e.target.scrollTop
            ) {
                !loading && setCallApi(true);
            }
        };
        scrollRef.current &&
            scrollRef.current.addEventListener("scroll", handleOnScroll);
    }, []);

    return (
        <ContextValue.Provider value={scrollValue}>
            <div
                ref={scrollRef}
                className="flex-1 flex flex-col-reverse w-full overflow-y-scroll"
            >
                <MessageList
                    data={data}
                    loading={loading}
                    setLoading={setLoading}
                    messageList={messageList}
                    setMessageList={setMessageList}
                    callApi={callApi}
                    setCallApi={setCallApi}
                    setGetMessage={setGetMessage}
                    number={number}
                    setNumber={setNumber}
                />
                {!getMessage && <InfoUser data={data} />}
                {loading && (
                    <div className="w-full h-full">
                        <div className="w-5 h-5 mx-auto">
                            <LoadingCircleLine />
                        </div>
                    </div>
                )}
            </div>
            <div>
                <SendMessage
                    isFocus={isFocus}
                    setIsFocus={setIsFocus}
                    data={data}
                    messageList={messageList}
                    setMessageList={setMessageList}
                    setNumber={setNumber}
                />
            </div>
        </ContextValue.Provider>
    );
}

export default Message;
