import { Link } from "react-router-dom";
import {
    formatTime,
    formatAvatar,
    formatTimestamp,
} from "../../../../Hooks/useFormat";
import { FaUser } from "react-icons/fa";
function ResFriendRequest({ data, closeModal = () => {}, newNoti }) {
    return (
        <div className="flex p-2 pr-5 rounded-md ">
            <div className=" ">
                <div className="relative w-max">
                    <Link to={`/profile/${data.senderId}`} onClick={closeModal}>
                        <img
                            className="w-14 h-14 rounded-full border border-gray-500"
                            src={formatAvatar(data.senderAvt, data.senderSx)}
                            alt=""
                        />
                    </Link>
                    <span
                        className=" absolute bottom-[-5px] right-[-5px] flex h-7 w-7 items-center justify-center rounded-full 
                             bg-gradient-to-b from-blue-300 to-blue-700"
                    >
                        <FaUser className=" text-white text-[15px]" />
                    </span>
                    {/* <i className=" absolute bottom-[-5px] right-[-5px] block h-7 w-7 bg-urlIcons4 bg-szIcons4 bg-userIcon4"></i> */}
                </div>
            </div>
            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                <span className=" text-[15px] text-gray-600 line-clamp-2">
                    <Link
                        className=" font-semibold hover:underline "
                        to={`/profile/${data.senderId}`}
                        onClick={closeModal}
                    >
                        {data.senderName}
                    </Link>
                    <span className="ml-1">{`${data.content}.`}</span>
                </span>
                <span className="text-[13px] text-blue-500 font-medium">
                    {formatTimestamp(data.time)}
                </span>
            </div>
        </div>
    );
}

export default ResFriendRequest;
