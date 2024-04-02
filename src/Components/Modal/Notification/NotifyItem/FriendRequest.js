import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../../Button";
import { formatAvatar, formatTimestamp } from "../../../../Hooks/useFormat";
import { SocketContext } from "../../../../Socket";
import friendsApi from "../../../../api/friendsApi";
import LoadingCircleLine from "../../../LoadingCircleLine";
import { FaUser } from "react-icons/fa";
function FriendRequest({ data, closeModal = () => {}, pageHome }) {
    const socketContext = useContext(SocketContext);
    const user = useSelector((state) => state.user);
    const [disabled, setDisabled] = useState(false);
    const [accept, setAccept] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);

    const acceptRequest = async () => {
        try {
            setLoadingAccept(true);
            setDisabled(true);
            const params = new FormData();
            params.append("id", data.id);
            params.append("senderId", data.senderId);
            params.append("receiverId", data.receiverId);
            const res = await friendsApi.acceptFriendRequest(params);
            if (res.success) {
                setAccept(true);
            }
            if (res.success && res?.notification) {
                const sendData = {
                    ...res.notification,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoadingAccept(false);
        } catch (error) {
            console.log(error);
        }
    };
    const cancelRequest = async () => {
        try {
            setLoadingCancel(true);
            setDisabled(true);
            const params = new FormData();
            params.append("id", data.id);
            const res = await friendsApi.cancelFriendRequest(params);
            if (res.success) {
                setCancel(true);
            }
            if (res.success && res?.notification) {
                const sendData = {
                    ...res.notification,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoadingCancel(false);
        } catch (error) {
            console.log(error);
        }
    };
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
                <span className=" text-[15px] text-gray-600 line-clamp-3">
                    <Link
                        className=" font-semibold hover:underline "
                        to={`/profile/${data.senderId}`}
                        onClick={closeModal}
                    >
                        {data.senderName}
                    </Link>
                    <span className="ml-1">
                        đã gửi cho bạn lời mời kết bạn.
                    </span>
                </span>
                <span className="text-[13px] text-blue-500 font-medium">
                    {formatTimestamp(data.time)}
                </span>
                <div className="flex mt-1">
                    <Button
                        _className={
                            "flex justify-center items-center w-[108px] h-9 bg-blue-600 rounded-md hover:bg-blue-700"
                        }
                        cursorDefault={disabled}
                        onClick={!disabled && acceptRequest}
                    >
                        {loadingAccept && (
                            <div className=" w-4 h-4 mr-1">
                                <LoadingCircleLine />
                            </div>
                        )}
                        <span className="text-[15px] text-white font-medium">
                            {accept ? "Đã xác nhận" : "Xác nhận"}
                        </span>
                    </Button>
                    <Button
                        _className={
                            "flex justify-center items-center w-[108px] h-9 ml-3 bg-gray-300 rounded-md hover:bg-gray-400"
                        }
                        cursorDefault={disabled}
                        onClick={!disabled && cancelRequest}
                    >
                        {loadingCancel && (
                            <div className=" w-4 h-4 mr-1">
                                <LoadingCircleLine />
                            </div>
                        )}
                        <span className="text-[15px] font-medium">
                            {cancel ? "Đã từ chối" : "Từ chối"}
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FriendRequest;
