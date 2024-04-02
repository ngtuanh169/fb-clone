import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import groupApi from "../../../../api/groupApi";
import invitationJoinGroupApi from "../../../../api/invitationJoinGroupApi";
import { GroupContext } from "../GroupProvider";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import Button from "../../../../Components/Button";
import { formatAvatar } from "../../../../Hooks/useFormat";
function Invitation() {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { groupData, setGroupData } = useContext(GroupContext);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const getSenderInfo = async () => {
            try {
                setLoading(true);
                const params = {
                    receiverId: user.userId,
                    groupId: groupData.id,
                };
                const res = await groupApi.getSenderInfoInvitation(params);
                if (res.success) {
                    setUserData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.id && user.userId && getSenderInfo();
    }, [groupData.id]);
    const acceptInvitation = async (senderId, receiverId, groupId) => {
        try {
            setLoadingAccept(true);
            const params = new FormData();
            params.append("senderId", senderId);
            params.append("receiverId", receiverId);
            params.append("groupId", groupId);
            const res = await invitationJoinGroupApi.accept(params);
            setTimeout(() => {
                if (res.success) {
                    setGroupData({
                        ...groupData,
                        checkJoined: true,
                        checkInvitation: false,
                    });
                    navigate(`/group/${groupId}`);
                }
                setLoadingAccept(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };
    const cancelInvitation = async (senderId, receiverId, groupId) => {
        try {
            setLoadingCancel(true);
            const params = new FormData();
            params.append("senderId", senderId);
            params.append("receiverId", receiverId);
            params.append("groupId", groupId);
            const res = await invitationJoinGroupApi.cancel(params);
            setTimeout(() => {
                if (res.success) {
                    setGroupData({
                        ...groupData,
                        checkInvitation: false,
                    });
                }
                setLoadingCancel(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col sm:flex-row gap-1 justify-between w-full">
            {loading ? (
                <div className=" max-w-full w-[350px] h-10 rounded-md overflow-hidden">
                    <SkeletonLoading />
                </div>
            ) : (
                <>
                    <div className="flex items-center">
                        {groupData.status == 0 ? (
                            <Link
                                to={`/group/${groupData.id}/user/${userData.userId}`}
                            >
                                <img
                                    className="h-10 w-10 rounded-full object-cover object-center border"
                                    src={formatAvatar(
                                        userData.userAvt,
                                        userData.userSx
                                    )}
                                    alt=""
                                />
                            </Link>
                        ) : (
                            <Link to={`/profile/${userData.userId}`}>
                                <img
                                    className="h-10 w-10 rounded-full object-cover object-center border"
                                    src={formatAvatar(
                                        userData.userAvt,
                                        userData.userSx
                                    )}
                                    alt=""
                                />
                            </Link>
                        )}

                        <span className=" flex ml-2 font-medium text-[17px] line-clamp-2">
                            {groupData.status == 0 ? (
                                <Link
                                    className="hover:underline"
                                    to={`/group/${groupData.id}/user/${userData.userId}`}
                                >
                                    <span>{userData.userName}</span>
                                </Link>
                            ) : (
                                <Link
                                    className="hover:underline"
                                    to={`/profile/${userData.userId}`}
                                >
                                    <span>{userData.userName}</span>
                                </Link>
                            )}
                            <span className="ml-1 font-normal">
                                đã mời bạn tham gia nhóm này
                            </span>
                        </span>
                    </div>
                    <div className=" grid grid-cols-2 gap-2 justify-between">
                        <Button
                            _className={`flex items-center justify-center h-10 w-[full] px-2 bg-blue-600 
                                rounded-md hover:bg-blue-700`}
                            cursorDefault={loadingAccept || loadingCancel}
                            onClick={() =>
                                !loadingAccept &&
                                !loadingCancel &&
                                userData.userId &&
                                acceptInvitation(
                                    userData.userId,
                                    user.userId,
                                    groupData.id
                                )
                            }
                        >
                            {loadingAccept && (
                                <span className="block w-5 h-5 mr-1">
                                    <LoadingCircleLine />
                                </span>
                            )}
                            <span className="font-medium text-white">
                                Tham gia nhóm
                            </span>
                        </Button>
                        <Button
                            _className={`flex items-center justify-center h-10 w-[full] px-2 bg-gray-200 
                                rounded-md hover:bg-gray-300`}
                            cursorDefault={loadingAccept || loadingCancel}
                            onClick={() =>
                                !loadingAccept &&
                                !loadingCancel &&
                                userData.userId &&
                                cancelInvitation(
                                    userData.userId,
                                    user.userId,
                                    groupData.id
                                )
                            }
                        >
                            {loadingCancel && (
                                <span className="block w-5 h-5 mr-1">
                                    <LoadingCircleLine />
                                </span>
                            )}
                            <span className="font-medium ">Từ chối</span>
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Invitation;
