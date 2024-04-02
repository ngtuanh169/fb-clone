import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    formatAvatar,
    formatNumberK,
    formatTime,
} from "../../../Hooks/useFormat";
import { SocketContext } from "../../../Socket";
import friendsApi from "../../../api/friendsApi";
import LoadingCircleLine from "../../../Components/LoadingCircleLine";
import Button from "../../../Components/Button";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
function Item({ data = {} }) {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const [accepted, setAccepted] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingCanceled, setLoadingCanceled] = useState(false);
    const cancelRequest = async (id) => {
        try {
            setLoadingCanceled(true);
            const params = new FormData();
            params.append("id", id);
            const res = await friendsApi.cancelFriendRequest(params);

            if (res.success && res?.notification) {
                const sendData = {
                    ...res.notification,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
                setCanceled(true);
            }
            setLoadingCanceled(false);
        } catch (error) {
            console.log(error);
        }
    };
    const acceptRequest = async (id, senderId, receiverId) => {
        try {
            setLoadingAccept(true);
            const params = new FormData();
            params.append("id", id);
            params.append("senderId", senderId);
            params.append("receiverId", receiverId);
            const res = await friendsApi.acceptFriendRequest(params);
            if (res.success && res?.notification) {
                const sendData = {
                    ...res.notification,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                console.log(sendData);
                socketContext && socketContext.send(JSON.stringify(sendData));
                setAccepted(true);
            }
            setLoadingAccept(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            style={{ boxShadow: "1px 1px 2px  #ccc" }}
            className=" w-full h-[390px] border rounded-md overflow-hidden"
        >
            <div className="flex flex-col justify-between w-full h-full">
                <div className="flex flex-col ">
                    <Link to={`/profile/${data.senderId}`}>
                        <img
                            className="w-full h-[200px] object-cover object-center "
                            src={formatAvatar(data.senderAvt, data.senderSx)}
                            alt=""
                        />
                    </Link>
                    <div className="px-2 pt-2">
                        <Link
                            className=" font-medium line-clamp-1 hover:underline"
                            to={`/profile/${data.senderId}`}
                        >
                            {data.senderName}
                        </Link>
                    </div>
                    {data.countFriends > 0 && (
                        <div className="flex items-center w-full px-2">
                            <FaUserFriends className="text-gray-500" />
                            <span className="ml-1 text-[13px] text-gray-500 line-clamp-1">
                                Có {formatNumberK(+data.countFriends)} người bạn
                            </span>
                        </div>
                    )}
                    {data.address && (
                        <div className="flex items-center w-full px-2">
                            <AiFillHome className="text-gray-500" />
                            <span className="ml-1 text-[13px] text-gray-500 line-clamp-1">
                                {data.address}
                            </span>
                        </div>
                    )}
                    <div className="px-2 pb-2">
                        <span className="text-[13px] text-blue-500 font-medium line-clamp-1">
                            {formatTime(data.time)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full p-2">
                    <Button
                        _className={
                            "flex justify-center items-center w-full h-9 bg-blue-600 rounded-md hover:bg-blue-700"
                        }
                        cursorDefault={
                            loadingAccept ||
                            loadingCanceled ||
                            accepted ||
                            canceled
                        }
                        onClick={() =>
                            !loadingAccept &&
                            !loadingCanceled &&
                            !accepted &&
                            !canceled &&
                            acceptRequest(
                                data.id,
                                data.senderId,
                                data.receiverId
                            )
                        }
                    >
                        {loadingAccept && (
                            <span className=" block  h-5 w-5 mr-1">
                                <LoadingCircleLine />
                            </span>
                        )}
                        <span className="text-[15px] text-white font-medium">
                            {`${accepted ? "Đã xác nhận" : "Xác nhận"}`}
                        </span>
                    </Button>
                    <Button
                        _className={
                            "flex justify-center items-center w-full h-9 mt-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        }
                        cursorDefault={
                            loadingAccept ||
                            loadingCanceled ||
                            accepted ||
                            canceled
                        }
                        onClick={() =>
                            !loadingAccept &&
                            !loadingCanceled &&
                            !accepted &&
                            !canceled &&
                            cancelRequest(
                                data.id,
                                data.senderId,
                                data.receiverId
                            )
                        }
                    >
                        {loadingCanceled && (
                            <span className=" block  h-5 w-5 mr-1">
                                <LoadingCircleLine />
                            </span>
                        )}
                        <span className="text-[15px] font-medium">{`${
                            canceled ? "Đã từ chối" : "Từ chối"
                        }`}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Item;
