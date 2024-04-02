import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../../../Socket";
import { addConversations } from "../../../../../redux/actions/conversationsList";
import { formatAvatar, formatTime } from "../../../../../Hooks/useFormat";
import { ScreenSize } from "../../../../../App";
import conversationsApi from "../../../../../api/conversationsApi";
import friendsApi from "../../../../../api/friendsApi";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import Button from "../../../../../Components/Button";
import { BsMessenger } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
function Member({ data = {} }) {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const context = useContext(ScreenSize);
    const socketContext = useContext(SocketContext);
    const [loading, setLoading] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const _addConversations = async (userId, othersId) => {
        try {
            const params = new FormData();
            params.append("userId", userId);
            params.append("othersId", othersId);
            const res = await conversationsApi.add(params);
            res[0].status === "success" &&
                dispatch(addConversations(res[0].conversationsId, othersId));
        } catch (error) {
            console.log(error);
        }
    };
    const addFriend = async (senderId, receiverId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("senderId", senderId);
            params.append("receiverId", receiverId);
            const res = await friendsApi.addFriend(params);
            if (res.success) {
                setSentRequest(true);
                const senData = {
                    id: res.data.id,
                    type: "notification",
                    typeNoti: "friendRequest",
                    receiverId: data.id,
                    senderId: user.userId,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                    time: res.data.time,
                };
                socketContext.send(JSON.stringify(senData));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex justify-between ">
            <div className="flex h-full">
                <div className=" relative">
                    <img
                        className="h-[60px] w-[60px] rounded-full border"
                        src={formatAvatar(data.avatar, data.sx)}
                        alt=""
                    />
                    {data?.statusLogin > 0 && (
                        <span
                            className=" absolute bottom-0 right-[5px] block w-3 h-3 rounded-full 
                        bg-green-500 border-2 border-white"
                        ></span>
                    )}
                </div>
                <div className="flex flex-col justify-evenly ml-2 ">
                    <Link
                        to={`/group/${groupId}/user/${data.id}`}
                        className=" hover:underline"
                    >
                        <span className=" font-medium">{data.name}</span>
                    </Link>
                    {data?.admin && (
                        <span className="w-max p-1  rounded bg-blue-100  text-blue-500 text-[13px] leading-[1]">
                            Quản trị viên
                        </span>
                    )}
                    {data?.createdAt && (
                        <span className=" text-[13px] font-medium text-gray-500">
                            Đã tham gia {formatTime(data?.createdAt)}
                        </span>
                    )}
                    {data?.codeName && (
                        <span className=" font-normal text-[13px] text-gray-500">
                            {data?.codeName}
                        </span>
                    )}
                </div>
            </div>
            {user.userId !== data.id && (
                <div className="my-auto">
                    {data?.checkFriend || data?.checkRequest || sentRequest ? (
                        <Button
                            _className={
                                "flex items-center gap-2 p-2 rounded-md sm:bg-gray-200 sm:hover:bg-gray-300"
                            }
                            onClick={() =>
                                _addConversations(user.userId, data.id)
                            }
                        >
                            <BsMessenger className=" text-gray-600 sm:text-gray-700 mr-1 sm:mr-0" />
                            {context.width >= 640 && (
                                <span className=" font-medium">Nhắn tin</span>
                            )}
                        </Button>
                    ) : (
                        <Button
                            _className={
                                "flex items-center gap-2 p-2 rounded-md sm:bg-gray-200 sm:hover:bg-gray-300"
                            }
                            cursorDefault={loading || sentRequest}
                            onClick={() =>
                                !loading &&
                                !sentRequest &&
                                addFriend(user.userId, data.id)
                            }
                        >
                            {loading ? (
                                <span className="block w-5 h-5">
                                    <LoadingCircleLine />
                                </span>
                            ) : (
                                <FaUserPlus className=" text-[20px] text-gray-600 sm:text-gray-700" />
                            )}
                            {context.width >= 640 && (
                                <span className=" font-medium">
                                    Thêm bạn bè
                                </span>
                            )}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Member;
