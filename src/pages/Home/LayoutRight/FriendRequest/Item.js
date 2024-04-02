import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatTimestamp, formatAvatar } from "../../../../Hooks/useFormat";
import { SocketContext } from "../../../../Socket";
import friendsApi from "../../../../api/friendsApi";
import Button from "../../../../Components/Button";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
function Item({ data }) {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [canceled, setCanceled] = useState(false);
    const [disabled, setDisabled] = useState(false);
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
                setAccepted(true);
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
                setCanceled(true);
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
        <div className="w-full rounded-lg mb-2">
            <div className="flex justify-between p-2">
                <div className="flex w-full">
                    <Link to={`/profile/${data.senderId}`}>
                        <img
                            className=" w-[46px] h-[46px] rounded-full mr-3 "
                            src={formatAvatar(data.senderAvt, data.senderSx)}
                            alt=""
                        />
                    </Link>
                    <div className=" flex-1 flex-col">
                        <div className="flex flex-col">
                            <Link
                                to={`/profile/${data.senderId}`}
                                className={" w-max"}
                            >
                                <span className=" font-semibold hover:underline">
                                    {data.senderName}
                                </span>
                            </Link>
                            <span className=" text-[13px] text-blue-500 font-medium">
                                {formatTimestamp(data.time)}
                            </span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <Button
                                _className={
                                    "flex justify-center w-[45%] p-1.5 rounded-md bg-blue-600 hover:bg-blue-700 "
                                }
                                cursorDefault={disabled}
                                onClick={() => !disabled && acceptRequest()}
                            >
                                {loadingAccept && (
                                    <div className=" w-5 h-5 mr-1">
                                        <LoadingCircleLine />
                                    </div>
                                )}
                                <span className="font-medium text-white">
                                    {accepted ? "Đã xác nhận" : "Xác nhận"}
                                </span>
                            </Button>
                            <Button
                                _className={
                                    "flex justify-center w-[45%] p-1.5 rounded-md bg-gray-300 hover:bg-gray-400 "
                                }
                                cursorDefault={disabled}
                                onClick={() => !disabled && cancelRequest()}
                            >
                                {loadingCancel && (
                                    <div className=" w-5 5-4 mr-1">
                                        <LoadingCircleLine />
                                    </div>
                                )}
                                <span className="font-medium">
                                    {canceled ? "Đã hủy bỏ" : "Hủy bỏ"}
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Item;
