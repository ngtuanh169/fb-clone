import { useState, useEffect, useRef, createContext } from "react";
import { useDispatch } from "react-redux";
import { addInfo } from "../../../redux/actions/conversationsList";
import userApi from "../../../api/userApi";
import ConversationTool from "./ConversationTool";
import Message from "./Message";
export const ContextValue = createContext();
function ConversationsItem({ data = {} }) {
    const dispatch = useDispatch();
    const divRef = useRef();
    const [isFocus, setIsFocus] = useState(false);
    const [dataOthers, setDataOthers] = useState({});

    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await userApi.getInfo({ userId: data.othersId });
                if (res.success) {
                    setDataOthers(res.data);
                    dispatch(
                        addInfo(
                            data.conversationsId,
                            res.data.name,
                            res.data.avatar,
                            res.data.sx
                        )
                    );
                }
            } catch (error) {
                console.log(error);
            }
        };
        data?.othersId && getInfo();
    }, [data?.othersId]);
    return (
        <div
            ref={divRef}
            style={{ boxShadow: "0 1px 3px 2px #ccc" }}
            className="flex flex-col w-[330px] h-[450px]  ml-3 bg-white  rounded-t-lg  "
        >
            <ConversationTool
                data={data}
                dataOthers={dataOthers}
                active={isFocus}
            />
            <Message data={data} isFocus={isFocus} setIsFocus={setIsFocus} />
        </div>
    );
}

export default ConversationsItem;
