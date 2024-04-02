import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import conversationsApi from "../../../../api/conversationsApi";
import Button from "../../../../Components/Button";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import Item from "./Item";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";

function Contact() {
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({ text: "" });
    const [conversationsList, setConversationsList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        user.userId && getConversations(payload);
    }, []);
    const getConversations = async (payload = {}) => {
        try {
            setLoading(true);
            const params = { ...payload, userId: user.userId };
            const res = await conversationsApi.get(params);
            setConversationsList(res);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full pt-3 ">
            <div className="flex justify-between items-center mb-1">
                <span className=" text-[17px] text-gray-500 font-medium">
                    Cuộc trò chuyện
                </span>
                <div className="flex">
                    <Button
                        _className={
                            " h-[32px] w-[32px] flex justify-center items-center mr-3 rounded-full hover:bg-gray-200"
                        }
                    >
                        <AiOutlineSearch />
                    </Button>
                    <Button
                        _className={
                            " h-[32px] w-[32px] flex justify-center items-center rounded-full hover:bg-gray-200"
                        }
                    >
                        <BiDotsHorizontalRounded />
                    </Button>
                </div>
            </div>
            <div className="flex flex-col w-full">
                {conversationsList.length > 0 ? (
                    conversationsList.map((item) => (
                        <Item key={item.conversationsId} data={item} />
                    ))
                ) : (
                    <span className="text-center text-[15px] text-gray-500">
                        Không có cuộc trò chuyện nào
                    </span>
                )}
            </div>
        </div>
    );
}

export default Contact;
