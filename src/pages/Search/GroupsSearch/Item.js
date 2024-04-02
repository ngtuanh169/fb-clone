import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatNumberK, formatFullDate } from "../../../Hooks/useFormat";
import { SocketContext } from "../../../Socket";
import groupApi from "../../../api/groupApi";
import MainCard from "../../../Components/MainCard";
import LoadingCircleLine from "../../../Components/LoadingCircleLine";
import Button from "../../../Components/Button";
import { BsDot } from "react-icons/bs";
function Item({ data = {} }) {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const [joined, setJoined] = useState(data.joined);
    const [invitation, setInvitation] = useState(data.invitation);
    const [request, setRequest] = useState(data.requestJoinGroup);
    const [loading, setLoading] = useState(false);

    const requestJoinGruop = async (userId, groupId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", userId);
            params.append("groupId", groupId);
            const res = await groupApi.requestJoinGroup(params);
            if (res.success) {
                setRequest(true);
                const sendData = {
                    ...res.data,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const cancelRequest = async (userId, groupId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("userId", userId);
            params.append("groupId", groupId);
            const res = await groupApi.cancelRequestJoinGroup(params);
            if (res.success) {
                setRequest(false);
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full md:w-[680px]">
            <MainCard>
                <div className="flex w-full p-4">
                    <div className="w-[60px] h-[60px] rounded-lg border overflow-hidden">
                        <Link className="" to={`/group/${data.id}`}>
                            <img
                                className="w-full h-full object-cover "
                                src={data.banner}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div
                        style={{ maxWidth: "calc(100% - 60px)" }}
                        className="grow flex flex-col sm:flex-row justify-between flex-1 pl-4"
                    >
                        <div className="flex flex-col w-full">
                            <div className="flex flex-col justify-between">
                                <div className="">
                                    <Link
                                        to={`/group/${data.id}`}
                                        className=" hover:underline"
                                    >
                                        <span className=" font-semibold text-[17px] line-clamp-2">
                                            {data.name}
                                        </span>
                                    </Link>
                                </div>
                                <div className="flex flex-row flex-wrap py-1 text-gray-500">
                                    <div className="flex items-center w-max">
                                        <span>{data.statusName}</span>
                                    </div>
                                    {data.members > 0 && (
                                        <div className="flex items-center w-max">
                                            <span className=" flex h-full items-center">
                                                <BsDot />
                                            </span>
                                            <span className="whitespace-nowrap">{`${formatNumberK(
                                                +data.members
                                            )} thành viên`}</span>
                                        </div>
                                    )}
                                    {data.timeJoinGroup && (
                                        <div className="flex items-center w-max">
                                            {data.timeJoinGroup && (
                                                <span className="flex h-full items-center">
                                                    <BsDot />
                                                </span>
                                            )}
                                            <span className=" line-clamp-1">{` Là thành viên từ ${formatFullDate(
                                                data.timeJoinGroup
                                            )}`}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {data.invitationJoinGroup && (
                                <span className="text-[13px] text-blue-500 line-clamp-2">
                                    Có lời mời tham gia nhóm
                                </span>
                            )}
                            {data.des && (
                                <span className="text-[13px] text-gray-500 line-clamp-2">
                                    {data.des}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center w-full sm:w-auto h-full mt-2">
                            {(data.invitationJoinGroup || joined) && (
                                <Button
                                    _className={
                                        "w-full sm:w-max p-2 bg-gray-200 text-center rounded-lg hover:bg-gray-300"
                                    }
                                    to={`/group/${data.id}`}
                                >
                                    <span className=" font-medium ">
                                        Truy cập
                                    </span>
                                </Button>
                            )}
                            {request && (
                                <Button
                                    _className={`flex items-center justify-center w-full sm:w-max p-2 bg-gray-200 text-center 
                                        rounded-lg hover:bg-gray-300`}
                                    cursorDefault={loading}
                                    onClick={() =>
                                        !loading &&
                                        cancelRequest(user.userId, data.id)
                                    }
                                >
                                    {loading && (
                                        <span className="block w-5 h-5 mr-1">
                                            <LoadingCircleLine />
                                        </span>
                                    )}
                                    <span className=" font-medium ">
                                        Hủy yêu cầu
                                    </span>
                                </Button>
                            )}
                            {!joined &&
                                !data.invitationJoinGroup &&
                                !request && (
                                    <Button
                                        _className={`flex items-center justify-center w-full sm:w-max p-2 bg-blue-100 text-center 
                                        rounded-lg hover:bg-blue-200`}
                                        cursorDefault={loading}
                                        onClick={() =>
                                            !loading &&
                                            requestJoinGruop(
                                                user.userId,
                                                data.id
                                            )
                                        }
                                    >
                                        {loading && (
                                            <span className="block w-5 h-5 mr-1">
                                                <LoadingCircleLine />
                                            </span>
                                        )}
                                        <span className=" font-medium text-blue-500">
                                            Tham gia
                                        </span>
                                    </Button>
                                )}
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default Item;
