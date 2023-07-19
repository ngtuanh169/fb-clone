import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeMess } from "../../../redux/actions/openMessList";
import { formatAvatar } from "../../../Hooks/useFormat";
import userApi from "../../../api/userApi";
import SkeletonLoading from "../../SkeletonLoading";
import { FaPhoneAlt } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { VscChromeClose } from "react-icons/vsc";
function MessItemTool({ data, active }) {
    const dispatch = useDispatch();

    return (
        <div className="flex justify-between w-full p-[2px] border-b">
            <div className="flex items-center p-2 cursor-pointer rounded-md hover:bg-hover">
                {data.othersName ? (
                    <>
                        <img
                            className="w-[30px] h-[30px] rounded-full"
                            src={formatAvatar(data.othersAvt, data.othersSx)}
                            alt=""
                        />
                        <span className="flex-1 ml-2 font-semibold line-clamp-1">
                            {data.othersName}
                        </span>
                    </>
                ) : (
                    <div className="w-[30px] h-[30px] rounded-full overflow-hidden">
                        <SkeletonLoading />
                    </div>
                )}
            </div>
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
                    onClick={() => dispatch(removeMess(data.id))}
                >
                    <VscChromeClose />
                </span>
            </div>
        </div>
    );
}

export default MessItemTool;
