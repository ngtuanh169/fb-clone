import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addConversations } from "../../../../redux/actions/conversationsList";
import { formatAvatar, formatNumberK } from "../../../../Hooks/useFormat";
import conversationsApi from "../../../../api/conversationsApi";
import friendsApi from "../../../../api/friendsApi";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import Button from "../../../../Components/Button";
import ChangeProfilePicture from "../../../../Components/Modal/ChangeProfilePicture";
import AddFriend from "./ButtonStyle/AddFriend";
import UnFriend from "./ButtonStyle/UnFriend";
import AcceptRequest from "./ButtonStyle/AcceptRequest";
import CancelRequest from "./ButtonStyle/CancelRequest";
import { FaPen } from "react-icons/fa";
import { AiFillPlusCircle, AiFillCamera } from "react-icons/ai";
import { BsMessenger } from "react-icons/bs";
function HeaderBottom({ isLoading, userData = {} }) {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [showModalAvatar, setShowModalAvatar] = useState(false);
    const [showModalTin, setShowModalTin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingFriend, setLoadingFriend] = useState(false);
    const [countFriends, setCountFriends] = useState(0);
    const [buttonData, setButtonData] = useState({});
    const [buttonStyle, setButtonStyle] = useState({ Comp: AddFriend });
    useEffect(() => {
        const count_friends = async () => {
            try {
                setLoadingFriend(true);
                const params = {
                    userId,
                };
                const res = await friendsApi.count_friends(params);
                if (res.success) {
                    setCountFriends(res.count);
                }
                setLoadingFriend(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && count_friends();
    }, [userId]);
    useEffect(() => {
        const checkFriend = async () => {
            setLoading(true);
            const params = { userId: user.userId, othersId: userId };
            const res = await friendsApi.checkFriend(params);
            if (res.isFriend) {
                setButtonStyle({ Comp: UnFriend });
                setButtonData({});
                setLoading(false);
                return;
            }

            if (res.friendRequests) {
                setButtonData(res.friendRequests);
                res.friendRequests.senderId === user.userId
                    ? setButtonStyle({ Comp: CancelRequest })
                    : setButtonStyle({ Comp: AcceptRequest });
                setLoading(false);
                return;
            }
            setButtonData({});
            setButtonStyle({ Comp: AddFriend });
            setLoading(false);
        };
        user.userId !== userId && checkFriend();
    }, [userId]);

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
        <>
            {showModalAvatar && (
                <ChangeProfilePicture
                    title="Cập nhập ảnh đại diện"
                    closeModal={() => setShowModalAvatar(false)}
                />
            )}
            {showModalTin && (
                <ChangeProfilePicture
                    title="Thêm tin"
                    video={true}
                    closeModal={() => setShowModalTin(false)}
                />
            )}
            <div className="flex flex-col lg:flex-row w-full lg:w-[1000px] pb-5 lg:py-5 mx-auto">
                <div className=" relative w-full lg:w-1/5 h-[84px] lg:h-auto  ">
                    <div className=" absolute bottom-0 flex justify-center w-full lg:block">
                        <div className=" relative">
                            {isLoading ? (
                                <div className="w-[168px] h-[168px] rounded-full overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                            ) : (
                                <Link to={"/photo/1"}>
                                    <img
                                        className="w-[168px] h-[168px] rounded-full border-[4px] border-white  "
                                        src={formatAvatar(
                                            userId !== user.userId
                                                ? userData.avatar
                                                : user.avatar,
                                            userId !== user.userId
                                                ? userData.sx
                                                : user.sx
                                        )}
                                        alt=""
                                    />
                                </Link>
                            )}

                            {userId === user.userId && (
                                <Button
                                    _className=" absolute bottom-[5px] right-[10px] flex justify-center items-center 
                                        w-9 h-9 rounded-full bg-gray-200"
                                    onClick={() => setShowModalAvatar(true)}
                                >
                                    <AiFillCamera className="w-5 h-5" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-2/4 px-4  ">
                    {isLoading ? (
                        <div className="w-full h-full rounded-lg overflow-hidden">
                            <SkeletonLoading />
                        </div>
                    ) : (
                        <>
                            <span className="w-full text-[30px] text-center lg:text-left font-bold">
                                {userId === user.userId
                                    ? `${user.fName} ${user.lName}`
                                    : userData.name}
                            </span>
                            {loadingFriend && (
                                <span className="flex w-[80px] h-[23px] mx-auto lg:mx-0">
                                    <SkeletonLoading />
                                </span>
                            )}
                            {!loading && countFriends > 0 && (
                                <span className=" w-full h-[23px] font-medium text-center lg:text-left text-gray-500">
                                    {`${formatNumberK(countFriends)} bạn bè`}
                                </span>
                            )}

                            {/* <div className="flex justify-center lg:justify-start w-full mt-1">
                                <div className="relative flex w-max h-[40px]">
                                    {Array(6)
                                        .fill(0)
                                        .map((item, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    zIndex: 10 - index,
                                                }}
                                                className=" relative w-[35px] h-[40px]"
                                            >
                                                <div className="absolute top-0 left-0 h-[40px] w-[40px] rounded-full">
                                                    <img
                                                        className="h-full w-full rounded-full border-[2px] border-white"
                                                        src={avt}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div> */}
                        </>
                    )}
                </div>

                {userId === user.userId ? (
                    <div
                        className="flex flex-col md:flex-row md:flex-wrap md:justify-center lg:justify-end md:items-end 
                             w-full lg:w-2/4 md:mt-5 "
                    >
                        <Button
                            _className={`flex justify-center md:justify-start items-center p-2 mb-2 mx-2 text-white 
                                bg-blue-500 rounded-md md:mx-0 md:mb-0 md:mr-2 md:mx-2 mt-5 md:mt-0 hover:bg-blue-600`}
                            onClick={() => setShowModalTin(true)}
                        >
                            <AiFillPlusCircle />
                            <span className="ml-2 font-semibold">
                                Thêm vào tin
                            </span>
                        </Button>
                        <Button
                            to={`/profile/${user.userId}/info`}
                            _className={`flex justify-center md:justify-start items-center p-2 mx-2 bg-gray-200 rounded-md 
                                md:mx-0 hover:bg-gray-300`}
                        >
                            <FaPen />
                            <span className="ml-2 font-semibold">
                                Chỉnh sửa trang cá nhân
                            </span>
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-wrap justify-center items-end lg:justify-end w-full lg:w-2/4 md:mt-5 ">
                        <buttonStyle.Comp
                            loading={loading}
                            setLoading={setLoading}
                            data={buttonData}
                            setButtonStyle={setButtonStyle}
                            setButtonData={setButtonData}
                            userData={userData}
                        />
                        <Button
                            _className={`flex h-max justify-center md:justify-start items-center p-2 px-3 mb-2 md:mb-0 mx-2 
                                bg-gray-200 rounded-md md:mx-0 hover:bg-gray-300`}
                            onClick={() =>
                                _addConversations(user.userId, userId)
                            }
                        >
                            <BsMessenger />
                            <span className="ml-2 font-semibold">Nhắn tin</span>
                        </Button>
                    </div>
                )}
            </div>
            {buttonData.receiverId &&
                buttonData?.receiverId === user.userId && (
                    <div className=" w-full lg:w-[1000px] p-4 mb-5 mx-auto rounded-lg bg-gray-200">
                        <h2 className=" font-medium">{`${userData.name} đã gửi cho bạn lời mời kết bạn`}</h2>
                    </div>
                )}
            <div className="w-full lg:w-[1000px] mx-auto h-[1px] bg-gray-200"></div>
        </>
    );
}

export default HeaderBottom;
