import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import commentApi from "../../../../../api/commentApi";
import conversationsApi from "../../../../../api/conversationsApi";
import { addConversations } from "../../../../../redux/actions/conversationsList";
import { formatNumber, formatAvatar } from "../../../../../Hooks/useFormat";
import Modal from "../../../../Modal";
import MainCard from "../../../../MainCard";
import SkeletonLoading from "../../../../SkeletonLoading";
import Button from "../../../../Button";
import { MdClose } from "react-icons/md";
import { BsMessenger } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import like from "../../../../../assets/images/imgIcon/like.png";
function UsersLiked({
    commentId = 0,
    countLikes,
    setCountLikes = () => {},
    closeModal = () => {},
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const [payload, setPayload] = useState({ limit: 6, page: 1, commentId });
    const [usersList, setUsersList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [totalLikes, setTotalLikes] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUsersLiked = async () => {
            try {
                setLoading(true);
                const res = await commentApi.getUsersLiked(payload);
                if (res.success && res.count) {
                    res?.data && setUsersList([...usersList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setTotalLikes(res.count);
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && payload.page <= totalPage && getUsersLiked();
    }, [payload]);
    useEffect(() => {
        totalLikes !== countLikes && setCountLikes(totalLikes);
    }, [totalLikes]);
    console.log(payload);
    useEffect(() => {
        const handleScroll = (e) => {
            const scrollHeight = e.target.scrollHeight;
            const offsetHeight = e.target.offsetHeight;
            const scrollTop = e.target.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading &&
                    payload.page < totalPage &&
                    setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        divRef.current &&
            divRef.current.addEventListener("scroll", handleScroll);
        return () =>
            divRef.current &&
            divRef.current.removeEventListener("scroll", handleScroll);
    }, [divRef.current, loading]);

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
            <div className="w-full sm:w-[540px] m-auto px-2">
                <MainCard>
                    <div className=" relative flex items-center w-full h-[60px] border">
                        {totalLikes > 0 && (
                            <div className="flex items-center">
                                <img
                                    className="w-5 h-5 mx-2"
                                    src={like}
                                    alt=""
                                />
                                <span>{formatNumber(totalLikes)}</span>
                            </div>
                        )}
                        <div className=" absolute top-0 right-[8px] flex items-center h-full">
                            <Button
                                _className={`flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300`}
                                onClick={closeModal}
                            >
                                <span className="text-[20px]">
                                    <MdClose />
                                </span>
                            </Button>
                        </div>
                    </div>
                    <div
                        ref={divRef}
                        className="flex flex-col gap-2 w-full max-h-[300px] p-2 
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full "
                    >
                        {usersList.length > 0 &&
                            usersList.map((item) => (
                                <div
                                    key={item.userId}
                                    className="flex justify-between items-center w-full"
                                >
                                    <div
                                        style={{
                                            maxWidth: "calc(100% - 170px)",
                                        }}
                                        className="flex gap-2"
                                    >
                                        <div className=" relative">
                                            <Link
                                                to={`/profile/${item.userId}`}
                                            >
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover object-center border"
                                                    src={formatAvatar(
                                                        item.userAvt,
                                                        item.userSx
                                                    )}
                                                    alt=""
                                                />
                                            </Link>
                                            {item.statusLogin > 0 && (
                                                <span
                                                    className=" absolute bottom-[2px] right-[2px] block w-[9px] h-[9px] 
                                                    rounded-full bg-green-500 border-2 border-white"
                                                ></span>
                                            )}
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <Link
                                                className=" font-semibold hover:underline"
                                                to={`/profile/${item.userId}`}
                                            >
                                                <span className=" line-clamp-1">
                                                    {item.userName}
                                                </span>
                                            </Link>
                                            {item.countFriends > 0 && (
                                                <span className="text-gray-500 font-normal text-[13px]">{`${formatNumber(
                                                    item.countFriends
                                                )} người bạn`}</span>
                                            )}
                                        </div>
                                    </div>
                                    {item.userId !== user.userId && (
                                        <div className="">
                                            {item.checkFriend ? (
                                                <Button
                                                    _className={`flex items-center gap-2 p-2 rounded-md bg-gray-200 hover:bg-gray-200`}
                                                    onClick={() => {
                                                        _addConversations(
                                                            user.userId,
                                                            item.userId
                                                        );
                                                        closeModal();
                                                    }}
                                                >
                                                    <BsMessenger />
                                                    <span className=" font-medium">
                                                        Nhắn tin
                                                    </span>
                                                </Button>
                                            ) : (
                                                <Button
                                                    _className={`flex items-center gap-2 p-2 rounded-md text-white 
                                                    bg-blue-500 hover:bg-blue-600`}
                                                    to={`/profile/${item.userId}`}
                                                >
                                                    <FaUserCircle />
                                                    <span className=" font-medium">
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
                                        className="flex items-center gap-2 w-full"
                                    >
                                        <div className="w-10 h-10 ">
                                            <SkeletonLoading circle />
                                        </div>
                                        <div className="w-[200px] h-[25px] rounded-md overflow-hidden">
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

export default UsersLiked;
