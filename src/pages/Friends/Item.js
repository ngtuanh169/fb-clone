import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { formatAvatar, formatNumberK } from "../../Hooks/useFormat";
import conversationsApi from "../../api/conversationsApi";
import { SocketContext } from "../../Socket";
import friendsApi from "../../api/friendsApi";
import { addConversations } from "../../redux/actions/conversationsList";
import Button from "../../Components/Button";
import LoadingCircleLine from "../../Components/LoadingCircleLine";
import { BsMessenger } from "react-icons/bs";
import { FaUserPlus, FaUserFriends } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
function Item({ data = {}, noFriend = false }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const [addedFriend, setAddedFriend] = useState(false);
    const [loading, setLoading] = useState(false);
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
            setTimeout(() => {
                if (res.success) {
                    // const time = new Date().getTime();
                    const senData = {
                        id: res.data.id,
                        type: "notification",
                        typeNoti: "friendRequest",
                        receiverId: receiverId,
                        senderId: user.userId,
                        senderName: `${user.fName} ${user.lName}`,
                        senderAvt: user.avatar,
                        senderSx: user.sx,
                        time: res.data.time,
                    };
                    setAddedFriend(true);
                    socketContext &&
                        socketContext.send(JSON.stringify(senData));
                }
                setLoading(false);
            }, 1500);
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
                <div className="flex flex-col w-full">
                    <Link to={`/profile/${data.id}`}>
                        <img
                            className="w-full h-[200px] object-cover object-center "
                            src={formatAvatar(data.userAvt, data.userSx)}
                            alt=""
                        />
                    </Link>
                    <div className="px-2 pt-2">
                        <Link
                            className=" font-medium line-clamp-1 hover:underline"
                            to={`/profile/${data.id}`}
                        >
                            {data.userName}
                        </Link>
                    </div>
                    {data.countFriends > 0 && (
                        <div className="flex items-center w-full px-2">
                            <FaUserFriends className="text-gray-500" />
                            <span className="ml-1 text-[13px] text-gray-500">
                                Có {formatNumberK(+data.countFriends)} bạn bè
                            </span>
                        </div>
                    )}
                    {data.address && (
                        <div className="flex items-center w-full px-2 ">
                            <AiFillHome className="text-gray-500" />
                            <span className="ml-1 text-[13px] text-gray-500 line-clamp-1">
                                {data.address}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex flex-col w-full p-2">
                    <Button
                        _className={
                            "flex justify-center items-center w-full h-9 mt-2 bg-blue-600 rounded-md hover:bg-blue-700"
                        }
                        onClick={() => _addConversations(user.userId, data.id)}
                    >
                        <BsMessenger className="text-white mr-2" />

                        <span className="text-[15px] text-white font-medium">
                            Nhắn tin
                        </span>
                    </Button>

                    {noFriend ? (
                        <Button
                            _className={
                                "flex justify-center items-center w-full h-9 mt-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                            cursorDefault={loading || addedFriend}
                            onClick={() =>
                                !loading &&
                                !addedFriend &&
                                addFriend(user.userId, data.id)
                            }
                        >
                            {loading && (
                                <span className="block h-5 w-5 mr-1">
                                    <LoadingCircleLine />
                                </span>
                            )}
                            <FaUserPlus className=" mr-2" />
                            <span className="text-[15px] font-medium line-clamp-1">
                                {addedFriend ? "Đã thêm bạn bè" : "Thêm bạn bè"}
                            </span>
                        </Button>
                    ) : (
                        <Button
                            to={`/profile/${data.id}`}
                            _className={
                                "flex justify-center items-center w-full h-9 mt-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                        >
                            <span className="text-[15px] font-medium line-clamp-1">
                                Xem trang cá nhân
                            </span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Item;
