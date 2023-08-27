import { useRef, useEffect, useState, useContext } from "react";
import { SocketContext } from "../../../Socket";
import messageApi from "../../../api/messageApi";
import TextMessItem from "./TextMessItem";
function TextMess({
    data,
    textMessList = [],
    setTextMessList = () => {},
    isFocus,
}) {
    const socketContext = useContext(SocketContext);
    const divRef = useRef();
    useEffect(() => {
        const getTextMessList = async () => {
            try {
                const res = await messageApi.getMessage({
                    conversationsId: data.conversationsId,
                });
                setTextMessList(res);
            } catch (error) {
                console.log(error);
            }
        };
        data.conversationsId && getTextMessList();
    }, [data.conversationsId]);
    useEffect(() => {
        socketContext.onmessage = (e) => {
            const resData = JSON.parse(e.data);
            if (
                resData.type === "message" &&
                resData.conversationsId === data.conversationsId
            ) {
                setTextMessList((prev) => [resData, ...prev]);
            }
        };
    }, [data.conversationsId]);

    return (
        <div className="w-full h-max px-2 bg-white  ">
            <div className="flex flex-col-reverse w-full pt-2">
                {textMessList.length > 0 &&
                    textMessList.map((item, index) => (
                        <div ref={divRef} key={index} className=" mt-4">
                            <TextMessItem
                                data={data}
                                item={item}
                                index={index}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default TextMess;
