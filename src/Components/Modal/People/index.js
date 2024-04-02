import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formatAvatar, formatNumberK } from "../../../Hooks/useFormat";
import userApi from "../../../api/userApi";
import conversationsApi from "../../../api/conversationsApi";
import { addConversations } from "../../../redux/actions/conversationsList";
import Modal from "../index";
import MainCard from "../../MainCard";
import SkeletonLoading from "../../SkeletonLoading";
import Button from "../../Button";
import { MdClose } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
function People({ users = [], closeModal = () => {} }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({
        limit: users.length,
        page: 1,
        usersList: JSON.stringify(users),
    });
    const [loading, setLoading] = useState(false);
    const [usersList, setUsersList] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const res = await userApi.getUserInArray(payload);
                if (res.success && res.data) {
                    setUsersList(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        users.length > 0 && getUsers();
    }, []);

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
    return (
        <Modal closeModal={closeModal}>
            <div className="w-full sm:w-[548px] h-[200px] m-auto px-2">
                <MainCard>
                    <div className=" border-b ">
                        <div className="relative flex justify-center items-center w-full h-[60px] ">
                            <span className=" font-bold text-[20px]">
                                Mọi người
                            </span>
                            <div className=" absolute right-[8px] top-0 flex items-center h-full">
                                <Button
                                    _className={`flex items-center justify-center w-9 h-9 bg-gray-200 rounded-full hover:bg-gray-300`}
                                    onClick={closeModal}
                                >
                                    <span className="text-[24px] text-gray-500">
                                        <MdClose />
                                    </span>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-2 w-full max-h-[300px] p-2 
                        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full"
                    >
                        {usersList.length > 0 &&
                            usersList.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between w-full"
                                >
                                    <div
                                        style={{
                                            maxWidth: "calc(100% - 170px)",
                                        }}
                                        className="flex gap-2"
                                    >
                                        <div className="">
                                            <Link to={`/profile/${item.id}`}>
                                                <img
                                                    className="w-10 h-10 rounded-full object-cover object-center border"
                                                    src={formatAvatar(
                                                        item.avatar,
                                                        item.sx
                                                    )}
                                                    alt=""
                                                />
                                            </Link>
                                        </div>
                                        <div className="flex flex-col justify-between">
                                            <Link
                                                to={`/profile/${item.id}`}
                                                className="text-[15px] font-semibold hover:underline"
                                            >
                                                <span className=" line-clamp-1">
                                                    {item.name}
                                                </span>
                                            </Link>
                                            {item.countFriends > 0 && (
                                                <span className="text-[13px] font-normal">{`${formatNumberK(
                                                    item.countFriends
                                                )} bạn bè`}</span>
                                            )}
                                        </div>
                                    </div>
                                    {item.id !== user.userId && (
                                        <div className="">
                                            {item.checkFriend ? (
                                                <Button
                                                    _className={`flex items-center gap-1 p-2 rounded-md text-[15px] font-semibold 
                                                        bg-gray-200 hover:bg-gray-300`}
                                                    onClick={() => {
                                                        _addConversations(
                                                            user.userId,
                                                            item.id
                                                        );
                                                        closeModal();
                                                    }}
                                                >
                                                    <BsMessenger />
                                                    <span>Nhắn tin</span>
                                                </Button>
                                            ) : (
                                                <Button
                                                    _className={`flex items-center gap-1 p-2 rounded-md text-[15px] font-semibold 
                                                       text-white bg-blue-500 hover:bg-blue-600`}
                                                    to={`/profile/${item.id}`}
                                                >
                                                    <FaUserCircle />
                                                    <span>
                                                        Xem trang cá nhân
                                                    </span>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        {loading &&
                            Array(3)
                                .fill(0)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center w-full"
                                    >
                                        <div className="w-10 h-10">
                                            <SkeletonLoading circle />
                                        </div>
                                        <div className="ml-2 w-[250px] h-[25px] rounded-md overflow-hidden">
                                            <SkeletonLoading />
                                        </div>
                                    </div>
                                ))}
                    </div>
                </MainCard>
            </div>
        </Modal>
    );
}

export default People;
