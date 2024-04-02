import { useDispatch } from "react-redux";
import { formatAvatar, formatTimestamp } from "../../../Hooks/useFormat";
import { closeConversations } from "../../../redux/actions/conversationsList";
import SkeletonLoading from "../../SkeletonLoading";
import Button from "../../Button";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
function ConversationTool({ data, dataOthers = {}, active }) {
    const dispatch = useDispatch();
    return (
        <div className="flex justify-between w-full p-[2px] border-b">
            <Button
                _className=" p-2 rounded-md hover:bg-hover"
                to={`/profile/${data.othersId}`}
            >
                {dataOthers?.name ? (
                    <div className=" flex items-center w-full h-full">
                        <div className="relative w-[30px] h-[30px]">
                            <img
                                className="h-full w-full rounded-full"
                                src={formatAvatar(
                                    data.othersAvt,
                                    data.othersSx
                                )}
                                alt="avatar"
                            />
                            {dataOthers?.statusLogin === "1" && (
                                <span className=" absolute bottom-0 right-0 block w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                            )}
                        </div>
                        <div className="flex-1 flex flex-col ml-2 text-left">
                            <span className="font-semibold line-clamp-1  ">
                                {data.othersName}
                            </span>
                            <span className="text-[12px] text-gray-500 leading-3 line-clamp-1">
                                {dataOthers?.statusLogin === "1"
                                    ? "Đang hoạt động"
                                    : `Hoạt động ${formatTimestamp(
                                          dataOthers.userUpdateAt
                                      )}`}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="flex">
                        <div className="w-[30px] h-[34px] rounded-full overflow-hidden">
                            <SkeletonLoading />
                        </div>
                        <div className="w-[60px] h-[34px] ml-2 rounded-md overflow-hidden">
                            <SkeletonLoading />
                        </div>
                    </div>
                )}
            </Button>
            <div
                className={`flex items-center p-2 ${
                    active ? "text-blue-600" : "text-slate-400"
                }`}
            >
                <span className="p-[8px] rounded-full cursor-pointer hover:bg-hover">
                    <FaPhoneAlt />
                </span>
                <span className="p-[8px] rounded-full cursor-pointer hover:bg-hover">
                    <BsFillCameraVideoFill />
                </span>
                <span className="p-[8px] rounded-full cursor-pointer hover:bg-hover">
                    <AiOutlineMinus />
                </span>
                <span
                    className="p-[8px] rounded-full cursor-pointer hover:bg-hover"
                    onClick={() =>
                        dispatch(closeConversations(data.conversationsId))
                    }
                >
                    <VscChromeClose />
                </span>
            </div>
        </div>
    );
}

export default ConversationTool;
