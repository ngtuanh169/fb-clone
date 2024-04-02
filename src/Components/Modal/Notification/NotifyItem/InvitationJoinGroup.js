import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import invitationJoinGroupApi from "../../../../api/invitationJoinGroupApi";
import Button from "../../../Button";
import LoadingCircleLine from "../../../LoadingCircleLine";
import { formatAvatar, formatTimestamp } from "../../../../Hooks/useFormat";
import { HiUserGroup } from "react-icons/hi";
function InvitationJoinGroup({ data, closeModal = () => {} }) {
    const user = useSelector((state) => state.user);
    const [loadingAccept, setLoadingAccept] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [canceled, setCanceled] = useState(false);

    const accept = async (senderId, groupId) => {
        try {
            setLoadingAccept(true);
            const params = {
                receiverId: user.userId,
                senderId,
                groupId,
            };
            const res = await invitationJoinGroupApi.accept(params);
            if (res.success) {
                setAccepted(true);
            }
            setLoadingAccept(false);
        } catch (error) {
            console.log(error);
        }
    };
    const cancel = async (senderId, groupId) => {
        try {
            setLoadingCancel(true);
            const params = {
                receiverId: user.userId,
                senderId,
                groupId,
            };
            const res = await invitationJoinGroupApi.cancel(params);
            if (res.success) {
                setCanceled(true);
            }
            setLoadingCancel(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex p-2 pr-5 rounded-md ">
            <div className=" ">
                <div className="relative w-max">
                    <Link to={`/profile/${data.senderId}`} onClick={closeModal}>
                        <img
                            className="w-14 h-14 rounded-full border border-gray-500"
                            src={formatAvatar(data.senderAvt, data.senderSx)}
                            alt=""
                        />
                    </Link>
                    <span
                        className=" absolute bottom-[-5px] right-[-5px] flex h-7 w-7 items-center justify-center rounded-full 
                             bg-gradient-to-b from-blue-300 to-blue-700"
                    >
                        <HiUserGroup className=" text-white text-[15px]" />
                    </span>
                </div>
            </div>
            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                <span className=" text-[15px] text-gray-600 line-clamp-3">
                    <Link
                        className=" font-semibold hover:underline "
                        to={`/profile/${data.senderId}`}
                        onClick={closeModal}
                    >
                        {data.senderName}
                    </Link>
                    <span className="mx-1">{data.content}</span>
                    <Link
                        className=" font-semibold hover:underline "
                        to={`/group/${data.groupId}`}
                        onClick={closeModal}
                    >
                        {data.groupName}
                    </Link>
                </span>
                <span className="text-[13px] text-blue-500 font-medium">
                    {formatTimestamp(data.time)}
                </span>
                {data.status == 2 ? (
                    <span className="text-[13px] font-normal text-gray-500">
                        Đã phản hồi lại
                    </span>
                ) : (
                    <div className="flex mt-1">
                        <Button
                            _className={
                                "flex justify-center items-center w-[108px] h-9 bg-blue-600 rounded-md hover:bg-blue-700"
                            }
                            cursorDefault={
                                loadingAccept ||
                                loadingCancel ||
                                accepted ||
                                canceled
                            }
                            onClick={() =>
                                !loadingAccept &&
                                !loadingCancel &&
                                !accepted &&
                                !canceled &&
                                accept(data.senderId, data.groupId)
                            }
                        >
                            {loadingAccept && (
                                <div className=" w-4 h-4 mr-1">
                                    <LoadingCircleLine />
                                </div>
                            )}
                            <span className="text-[15px] text-white font-medium">
                                {accepted ? "Đã tham gia" : "Tham gia"}
                            </span>
                        </Button>
                        <Button
                            _className={
                                "flex justify-center items-center w-[108px] h-9 ml-3 bg-gray-300 rounded-md hover:bg-gray-400"
                            }
                            cursorDefault={
                                loadingAccept ||
                                loadingCancel ||
                                accepted ||
                                canceled
                            }
                            onClick={() =>
                                !loadingAccept &&
                                !loadingCancel &&
                                !accepted &&
                                !canceled &&
                                cancel(data.senderId, data.groupId)
                            }
                        >
                            {loadingCancel && (
                                <div className=" w-4 h-4 mr-1">
                                    <LoadingCircleLine />
                                </div>
                            )}
                            <span className="text-[15px] font-medium">
                                {canceled ? "Đã từ chối" : "Từ chối"}
                            </span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InvitationJoinGroup;
