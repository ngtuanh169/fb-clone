import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import conversationsApi from "../../../api/conversationsApi";
import MessItem from "./MessItem";
import { FaFacebookMessenger } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";
import avatar from "../../../assets/images/avatar/avatar.jpg";
function MessList({ closeModal = () => {}, showMessWaiting = () => {} }) {
    const user = useSelector((state) => state.user);
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await conversationsApi.get({ userId: user.userId });
                setConversations(res);
            } catch (error) {
                console.log(error);
            }
        };
        getConversations();
    }, []);
    return (
        <div className="my-2 px-2 w-full h-[400px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full">
            {/* <div
                className="w-full p-2 rounded-md cursor-pointer hover:bg-hover"
                onClick={showMessWaiting}
            >
                <div className=" relative flex w-full h-full">
                    <div className="flex items-center justify-center w-[50px] h-[50px] bg-gray-300 rounded-full overflow-hidden">
                        <FaFacebookMessenger />
                    </div>
                    <div className="flex-1 flex flex-col ml-3">
                        <div className="">
                            <span className=" flex w-full text-[15px] font-semibold">
                                Tin nhắn đang chờ mới
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="block h-[6px] w-[6px] mr-1 bg-blue-500 rounded-full"></span>
                            <span className=" line-clamp-1 flex-1 text-xs font-medium">
                                Từ Tu Anh và 2 người khác
                            </span>
                        </div>
                    </div>
                    <div className=" absolute top-0 right-0 flex items-center h-full">
                        <BsChevronRight />
                    </div>
                </div>
            </div> */}
            {conversations.length > 0 &&
                conversations.map((item) => (
                    <MessItem
                        key={item.conversationsId}
                        data={item}
                        closeModal={closeModal}
                    />
                ))}
        </div>
    );
}

export default MessList;
