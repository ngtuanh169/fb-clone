import { useState, useRef, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import { formatAvatar, formatBanner } from "../../../../../Hooks/useFormat";
import { addConversations } from "../../../../../redux/actions/conversationsList";
import conversationsApi from "../../../../../api/conversationsApi";
import groupApi from "../../../../../api/groupApi";
import { GroupContext } from "../../GroupProvider";
import LoadingCircleLine from "../../../../../Components/LoadingCircleLine";
import Button from "../../../../../Components/Button";
import { BsMessenger, BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
function LayoutTop({ data = {} }) {
    const { groupId, userId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { groupData, setGroupData } = useContext(GroupContext);
    const modalRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    useClickOutSide(modalRef, () => setShowModal(false));

    const outGroup = async () => {
        try {
            setLoading(true);
            const res = await groupApi.outGroup({ groupId });
            if (res.success) {
                setGroupData({ ...groupData, checkJoined: false });
                navigate(`/group/${groupId}`);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
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
        <div className="flex flex-col justify-center items-center w-full bg-gradient-to-b from-slate-400 via-white to-white mb-4">
            <div className="w-full overflow-hidden">
                <img
                    className="w-full lg:w-[1100px] max-h-[400px] object-cover rounded-b-md mx-auto"
                    src={formatBanner(data.userBanner)}
                    alt=""
                />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[1000px] h-auto lg:h-[84px] mx-auto mb-4">
                <div className="  flex flex-col items-center lg:flex-row min-w-[168px] h-full ">
                    <div className="relative w-[168px] h-[84px] lg:h-[168px] lg:mr-4">
                        <img
                            className="absolute top-[-84px] left-0 w-[168px] h-[168px] rounded-full border-4 border-white"
                            src={formatAvatar(data.userAvt, data.userSx)}
                            alt=""
                        />
                    </div>
                    <div className="flex-1 flex items-center h-full">
                        <span className=" text-[32px] font-bold">
                            {data.userName}
                        </span>
                    </div>
                </div>
                <div className=" flex float-right gap-2 mt-2 lg:mt-0">
                    {userId !== user.userId && (
                        <Button
                            _className={
                                "flex items-center p-2 bg-blue-500 rounded-md hover:bg-blue-600"
                            }
                            onClick={() =>
                                _addConversations(user.userId, userId)
                            }
                        >
                            <BsMessenger className="text-[18px] text-white" />
                            <span className="ml-2 font-semibold text-white">
                                Nhắn tin
                            </span>
                        </Button>
                    )}

                    <Button
                        _className={
                            "flex items-center font-semibold p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        }
                        to={`/profile/${userId}`}
                    >
                        <FaUserCircle className="text-[20px]" />
                        <span className="ml-2">Xem trang cá nhân</span>
                    </Button>
                </div>
            </div>
            <div className="relative flex items-center justify-between w-full lg:w-[1000px] h-[60px] border-t border-gray-300">
                <div className="flex justify-center items-center h-full w-[167px] border-b-[3px] border-blue-500">
                    <span className="text-blue-500 font-medium">
                        Bài viết trong nhóm
                    </span>
                </div>
                <div ref={modalRef} className=" flex justify-center">
                    {data.joined &&
                        userId == user.userId &&
                        user.userId !== groupData.adminId && (
                            <Button
                                _className={
                                    "py-3 px-4 mr-4 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                                onClick={() => setShowModal(!showModal)}
                            >
                                <BsThreeDots />
                            </Button>
                        )}
                    {showModal && user.userId !== groupData.adminId && (
                        <div
                            style={{
                                boxShadow: "rgb(142, 141, 141) 0px 1px 10px",
                            }}
                            className=" absolute top-[110%] right-0 w-[330px] flex flex-col p-2 bg-white rounded-md"
                        >
                            <Button
                                _className={
                                    "flex items-center gap-2 p-2 rounded-md hover:bg-gray-300"
                                }
                                cursorDefault={loading}
                                onClick={() => !loading && outGroup()}
                            >
                                {loading ? (
                                    <span className="block w-5 h-5">
                                        <LoadingCircleLine />
                                    </span>
                                ) : (
                                    <FiLogOut className=" text-[20px]" />
                                )}
                                <span className=" font-semibold">
                                    Rời khỏi nhóm
                                </span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LayoutTop;
