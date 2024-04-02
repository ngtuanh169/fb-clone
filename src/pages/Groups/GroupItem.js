import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatNumberK } from "../../Hooks/useFormat";
import { ScreenSize } from "../../App";
import groupApi from "../../api/groupApi";
import { SocketContext } from "../../Socket";
import Button from "../../Components/Button";
import LoadingCircleLine from "../../Components/LoadingCircleLine";
import { BsDot } from "react-icons/bs";
import { ImEarth } from "react-icons/im";
import { FaLock } from "react-icons/fa";
function GroupItem({ data = {} }) {
    const user = useSelector((state) => state.user);
    const context = useContext(ScreenSize);
    const socketContext = useContext(SocketContext);
    const [loading, setLoading] = useState(false);
    const [sentRequest, setSentRequest] = useState(false);
    const requestJoinGroup = async (userId, groupId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", userId);
            params.append("groupId", groupId);
            const res = await groupApi.requestJoinGroup(params);
            if (res.success) {
                setSentRequest(true);
                const sendData = {
                    senderId: userId,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                    receiverId: res.data.receiverId,
                    groupId: res.data.groupId,
                    groupName: res.data.groupName,
                    type: res.data.type,
                    typeNoti: res.data.typeNoti,
                    content: res.data.content,
                    time: res.data.time,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className=" w-full mb-4">
            <div className="flex ">
                <div className=" w-max">
                    <Link to={"/"}>
                        <img
                            className="w-[60px] h-[60px] object-cover object-center rounded-lg"
                            src={data.banner}
                            alt=""
                        />
                    </Link>
                </div>
                <div
                    style={{ maxWidth: "calc(100% - 60px)" }}
                    className="grow flex flex-col pl-4 md:flex-row"
                >
                    <div className="flex flex-1 flex-col">
                        <div className="">
                            <Link to={`/group/${data.id}`}>
                                <span className=" line-clamp-2 font-semibold hover:underline">
                                    {data.name}
                                </span>
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row h-max text-[15px] text-gray-500">
                            <div className="flex items-center pr-2">
                                {data.statusId == 0 ? (
                                    <ImEarth className="mr-1 text-[13px]" />
                                ) : (
                                    <FaLock className="mr-1 text-[13px]" />
                                )}
                                <span className="">{data.statusName}</span>
                            </div>
                            <div className="flex">
                                <div className=" relative pr-2 md:px-2">
                                    <span className="whitespace-nowrap">
                                        {formatNumberK(data.members)} thành viên
                                    </span>
                                    {context.width >= 768 && (
                                        <BsDot className=" absolute left-[-6px] top-[4px] " />
                                    )}
                                </div>
                                {data.joined && (
                                    <div className="relative px-2">
                                        <span className=" line-clamp-1">
                                            Đã tham gia
                                        </span>
                                        <BsDot className=" absolute left-[-6px] top-[4px]" />
                                    </div>
                                )}
                                {data.requestJoinGroup && (
                                    <div className="relative px-2">
                                        <span className=" text-blue-500 line-clamp-1">
                                            Đã gửi yêu cầu
                                        </span>
                                        <BsDot className=" absolute left-[-6px] top-[4px]" />
                                    </div>
                                )}
                                {data.invitationJoinGroup && (
                                    <div className="relative px-2">
                                        <span className=" text-blue-500 line-clamp-1">
                                            Có lời mời tham gia
                                        </span>
                                        <BsDot className=" absolute left-[-6px] top-[4px]" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mt-2 md:mt-0 ">
                            <span className="text-[13px] text-gray-500 line-clamp-2">
                                {data.des && data.des}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center w-full md:w-auto md:h-full md:ml-2 mt-2 md:mt-0 ">
                        {(data.joined ||
                            data.requestJoinGroup ||
                            data.invitationJoinGroup) && (
                            <Button
                                to={`/group/${data.id}`}
                                _className={
                                    "w-full text-center md:w-auto p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                            >
                                <span className={" font-semibold"}>
                                    Truy cập
                                </span>
                            </Button>
                        )}
                        {!data.joined &&
                            !data.requestJoinGroup &&
                            !data.invitationJoinGroup && (
                                <Button
                                    _className={
                                        "flex items-center w-full md:w-auto p-2 rounded-md bg-blue-100 hover:bg-blue-300"
                                    }
                                    cursorDefault={loading}
                                    onClick={() =>
                                        !loading &&
                                        requestJoinGroup(user.userId, data.id)
                                    }
                                >
                                    {loading && (
                                        <span className="block w-5 h-5 mr-1">
                                            <LoadingCircleLine />
                                        </span>
                                    )}
                                    <span
                                        className={
                                            " font-semibold text-blue-800"
                                        }
                                    >
                                        {sentRequest
                                            ? "Đã gửi yêu cầu"
                                            : "Tham gia nhóm"}
                                    </span>
                                </Button>
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GroupItem;
