import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    formatNumber,
    formatAvatar,
    formatTimestamp,
} from "../../../../../../Hooks/useFormat";
import { useClickOutSide } from "../../../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../../../App";
import { GroupContext } from "../../../GroupProvider";
import groupApi from "../../../../../../api/groupApi";
import conversationsApi from "../../../../../../api/conversationsApi";
import { addConversations } from "../../../../../../redux/actions/conversationsList";
import LoadingCircleLine from "../../../../../../Components/LoadingCircleLine";
import Button from "../../../../../../Components/Button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
function Item({
    data,
    usersList = [],
    setUsersList = () => {},
    setCountRequest = () => {},
}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const context = useContext(ScreenSize);
    const { groupData, setGroupData } = useContext(GroupContext);
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [loadingAccept, setLoadingAccept] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    const cancelRequest = async (memberId, groupId) => {
        try {
            setLoadingCancel(true);
            const params = { memberId, groupId };
            const res = await groupApi.cancelRequestJoinGroupByAdmin(params);
            if (res.success) {
                const newArr = usersList.filter((item) => item.id !== memberId);
                setUsersList([...newArr]);
                setGroupData({
                    ...groupData,
                    requestJoinGroup: groupData.requestJoinGroup - 1,
                });
                setCountRequest((prev) => prev - 1);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const acceptRequest = async (memberId, groupId) => {
        try {
            setLoadingAccept(true);
            const params = { memberId, groupId };
            const res = await groupApi.acceptRequestJoinGroupByAdmin(params);
            if (res.success) {
                const newArr = usersList.filter((item) => item.id !== memberId);
                setUsersList([...newArr]);
                setGroupData({
                    ...groupData,
                    requestJoinGroup: groupData.requestJoinGroup - 1,
                    members: groupData.members + 1,
                });
                setCountRequest((prev) => prev - 1);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const _addConversations = async (userId, othersId) => {
        try {
            console.log("a");
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
        <div
            style={{ boxShadow: "0px 1px 2px 1px #ccc" }}
            className="flex flex-col w-full sm:w-[600px] lg:w-[844px] mt-5 py-4 px-3 bg-white  rounded-lg "
        >
            <div className="flex justify-between w-full ">
                <div className="flex w-full sm:w-[50%] ">
                    <Link
                        className="block h-[60px] w-[60px] "
                        to={`/profile/${data.id}`}
                    >
                        <img
                            className=" h-full w-full object-cover object-center rounded-full"
                            src={formatAvatar(data.avatar, data.sx)}
                            alt=""
                        />
                    </Link>
                    <div
                        style={{ maxWidth: "calc(100% - 60px)" }}
                        className="grow flex flex-col justify-center h-full pl-3 "
                    >
                        <Link
                            to={`/profile/${data.id}`}
                            className="block w-full text-[17px] font-semibold hover:underline"
                        >
                            <span className="block max-w-full break-words">
                                {data.name}
                            </span>
                        </Link>
                        <span className="text-[15px] text-gray-500">
                            {`Đã yêu cầu ${formatTimestamp(data.createdAt)}`}
                        </span>
                    </div>
                </div>
                {context.width >= 640 && (
                    <div className="flex justify-end gap-3 w-[50%] ">
                        <div className="h-max">
                            <Button
                                _className={
                                    "flex items-center h-max px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600 "
                                }
                                cursorDefault={loadingAccept || loadingCancel}
                                onClick={() =>
                                    !loadingCancel &&
                                    !loadingAccept &&
                                    acceptRequest(data.id, groupData.id)
                                }
                            >
                                {loadingAccept && (
                                    <span className="block w-5 h-5 mr-1">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className="text-[15px] text-white font-semibold">
                                    Phê duyệt
                                </span>
                            </Button>
                        </div>
                        <div className="h-max">
                            <Button
                                _className={
                                    "flex items-center h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                                cursorDefault={loadingAccept || loadingCancel}
                                onClick={() =>
                                    !loadingCancel &&
                                    !loadingAccept &&
                                    cancelRequest(data.id, groupData.id)
                                }
                            >
                                {loadingCancel && (
                                    <span className="block w-5 h-5 mr-1">
                                        <LoadingCircleLine />
                                    </span>
                                )}
                                <span className=" text-[15px] font-semibold">
                                    Từ chối
                                </span>
                            </Button>
                        </div>
                        <div ref={divRef} className="relative h-max">
                            <Button
                                _className={
                                    " h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                                onClick={() => setShowModal(!showModal)}
                            >
                                <HiOutlineDotsHorizontal className="text-[23px]" />
                            </Button>
                            {showModal && (
                                <div
                                    style={{
                                        boxShadow: "0px 1px 2px 1px #ccc",
                                    }}
                                    className=" absolute top-[100%] right-0 flex flex-col w-[310px] p-2 rounded-lg bg-white z-10 "
                                >
                                    <Button
                                        _className={
                                            "text-left p-2  rounded  hover:bg-gray-200"
                                        }
                                        onClick={() => {
                                            _addConversations(
                                                user.userId,
                                                data.id
                                            );
                                            setShowModal(false);
                                        }}
                                    >
                                        <span className=" text-[15px] font-medium ">
                                            {`Nhắn tin cho ${data.name}`}
                                        </span>
                                    </Button>
                                    <Button
                                        to={`/profile/${data.id}`}
                                        _className={
                                            "text-left p-2  rounded  hover:bg-gray-200"
                                        }
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span
                                            className=" text-[15px] font-medium "
                                            onClick={() => setShowModal(false)}
                                        >
                                            Xem trang cá nhân
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full">
                <div className="w-[60px] mr-3"></div>
                <div className="flex flex-col">
                    {data.countFriends > 0 && (
                        <div className="flex items-center pt-2">
                            <FaUserFriends className="text-gray-500 text-[20px] mr-3" />
                            <span className=" font-medium">
                                {formatNumber(+data.countFriends)}
                            </span>
                            <span className="ml-1">người bạn</span>
                        </div>
                    )}
                    {data.countGroup > 0 && (
                        <div className="flex items-center pt-2">
                            <MdGroups className="text-gray-500 text-[20px] mr-3" />
                            <span className=" font-medium ">
                                {formatNumber(+data.countGroup)}
                            </span>
                            <span className="ml-1">nhóm khác</span>
                        </div>
                    )}
                    <div className="flex items-center pt-2">
                        <AiOutlineClockCircle className="text-gray-500 text-[20px] mr-3" />
                        <span className=" ">{`Tham gia Facebook từ ${formatTimestamp(
                            data.userCreatedAt
                        )} `}</span>
                    </div>
                    {data.introductionName && (
                        <div className="flex items-center pt-2">
                            <img
                                className="w-5 h-5 object-cover object-center mr-3 opacity-50"
                                src={data.introductionLink}
                                alt="icon"
                            />
                            <span className="mr-1 ">
                                {data.introductionContent}
                                <span className=" ml-1 font-medium">
                                    {data.introductionName}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            </div>
            {context.width < 640 && (
                <div className="flex gap-3 justify-end w-full mt-2">
                    <div className="w-1/3 h-max">
                        <Button
                            _className={
                                "flex items-center justify-center w-full h-max px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600 "
                            }
                            cursorDefault={loadingAccept || loadingCancel}
                            onClick={() =>
                                !loadingCancel &&
                                !loadingAccept &&
                                acceptRequest(data.id, groupData.id)
                            }
                        >
                            {loadingAccept && (
                                <span className=" block h-5 w-5">
                                    <LoadingCircleLine />
                                </span>
                            )}
                            <span className="text-[15px] text-white font-semibold">
                                Phê duyệt
                            </span>
                        </Button>
                    </div>
                    <div className="w-1/3 h-max">
                        <Button
                            _className={
                                "flex items-center justify-center w-full h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                            cursorDefault={loadingAccept || loadingCancel}
                            onClick={() =>
                                !loadingCancel &&
                                !loadingAccept &&
                                cancelRequest(data.id, groupData.id)
                            }
                        >
                            {loadingCancel && (
                                <span className=" block h-5 w-5">
                                    <LoadingCircleLine />
                                </span>
                            )}
                            <span className=" text-[15px] font-semibold">
                                Từ chối
                            </span>
                        </Button>
                    </div>
                    <div ref={divRef} className="relative  h-max">
                        <Button
                            _className={
                                " h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                            onClick={() => setShowModal(!showModal)}
                        >
                            <HiOutlineDotsHorizontal className="text-[23px]" />
                        </Button>
                        {showModal && (
                            <div
                                style={{
                                    boxShadow: "0px 1px 2px 1px #ccc",
                                }}
                                className=" absolute top-[100%] right-0 flex flex-col w-[310px] p-2 rounded-lg bg-white z-10 "
                            >
                                <Button
                                    _className={
                                        "text-left p-2  rounded  hover:bg-gray-200"
                                    }
                                    onClick={() => {
                                        _addConversations(user.userId, data.id);
                                        setShowModal(false);
                                    }}
                                >
                                    <span className=" text-[15px] font-medium ">
                                        {`Nhắn tin cho ${data.name}`}
                                    </span>
                                </Button>
                                <Button
                                    to={`/profile/${data.id}`}
                                    _className={
                                        "text-left p-2  rounded  hover:bg-gray-200"
                                    }
                                    onClick={() => setShowModal(false)}
                                >
                                    <span
                                        className=" text-[15px] font-medium "
                                        onClick={() => setShowModal(false)}
                                    >
                                        Xem trang cá nhân
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Item;
