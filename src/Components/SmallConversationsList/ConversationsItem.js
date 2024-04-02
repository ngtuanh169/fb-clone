import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAvatar } from "../../Hooks/useFormat";
import {
    addConversations,
    closeConversations,
} from "../../redux/actions/conversationsList";
import Button from "../Button";
import { MdOutlineClose } from "react-icons/md";
function ConversationsItem({ data = {}, outside }) {
    const dispatch = useDispatch();
    const messNotification = useSelector((state) => state.messNotification);
    const [showNotification, setShowNotification] = useState(false);
    useEffect(() => {
        if (messNotification) {
            const checkIndex = messNotification.findIndex(
                (item) => item === data.conversationsId
            );
            checkIndex >= 0
                ? setShowNotification(true)
                : setShowNotification(false);
        }
    }, [messNotification]);
    return (
        <div className=" relative group ">
            <Button
                _className={`absolute right-[-5px] top-[-5px] w-[20px] flex justify-center items-center h-[20px] bg-white 
                    rounded-full invisible opacity-0  hover:bg-slate-300 group-hover:visible group-hover:opacity-100`}
                onClick={() =>
                    !outside &&
                    dispatch(closeConversations(data.conversationsId))
                }
            >
                <MdOutlineClose />
            </Button>
            {!outside && (
                <div
                    className=" absolute right-[110%] bottom-0 flex justify-center items-end 
                        invisible opacity-0 group-hover:visible group-hover:opacity-100"
                >
                    <span className=" min-w-[150px] w-max h-full p-3 rounded-lg drop-shadow-custom1 font-semibold bg-white ">
                        {data.othersName}
                    </span>
                    <span
                        className="w-0 h-0 mb-3 border-l-[15px] border-y-[10px] border-b-transparent border-t-transparent
                        border-l-white drop-shadow-custom2 z-50"
                    ></span>
                </div>
            )}
            <img
                className="w-[50px] h-[50px] rounded-full shadow-xl cursor-pointer animate-growUp"
                src={formatAvatar(data.othersAvt, data.othersSx)}
                alt=""
                onClick={() =>
                    !outside && dispatch(addConversations(data.conversationsId))
                }
            />
            {showNotification && (
                <span
                    style={{
                        boxShadow: "0 1px 2px 1px #f0f2f5",
                    }}
                    className=" absolute top-0 right-0 flex items-center justify-center w-3 h-3 rounded-full
                     bg-blue-700 text-white text-[13px] animate-dotNotification  group-hover:hidden"
                ></span>
            )}
        </div>
    );
}

export default ConversationsItem;
