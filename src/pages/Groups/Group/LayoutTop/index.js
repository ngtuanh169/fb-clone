import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { formatNumber } from "../../../../Hooks/useFormat";
import { ScreenSize } from "../../../../App";
import { SocketContext } from "../../../../Socket";
import { GroupContext } from "../GroupProvider";
import groupApi from "../../../../api/groupApi";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import Button from "../../../../Components/Button";
import AddMembers from "../Components/AddMembers";
import NavList from "./NavList";
import Invitation from "./Invitation";
import GroupList from "./GroupList";
import { GiEarthAmerica } from "react-icons/gi";
import { MdGroups } from "react-icons/md";
import { BsDot } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";
import { BiPlus } from "react-icons/bi";
import img from "../../../../assets/images/banner/banner.png";
function LayoutTop() {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const context = useContext(ScreenSize);
    const { groupData, setGroupData, loading } = useContext(GroupContext);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [loadingCancel, setLoadingCancel] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showGroupList, setShowGroupList] = useState(false);
    const requestJoinGroup = async (userId, groupId) => {
        try {
            setLoadingRequest(true);
            const params = new FormData();
            params.append("userId", userId);
            params.append("groupId", groupId);
            const res = await groupApi.requestJoinGroup(params);
            if (res.success) {
                setGroupData({ ...groupData, checkRequest: true });
                const sendData = {
                    ...res.data,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                    senderName: `${user.fName} ${user.lName}`,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
            setLoadingRequest(false);
        } catch (error) {
            console.log(error);
        }
    };
    const cancelRequestJoinGroup = async (userId, groupId) => {
        try {
            setLoadingCancel(true);
            const params = new FormData();
            params.append("userId", userId);
            params.append("groupId", groupId);
            const res = await groupApi.cancelRequestJoinGroup(params);
            if (res.success) {
                setGroupData({ ...groupData, checkRequest: false });
            }
            setLoadingCancel(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showModal && <AddMembers closeModal={() => setShowModal(false)} />}
            <div className="flex flex-col w-full bg-white">
                <div className=" w-full bg-gradient-to-b from-slate-400 via-white to-white">
                    <div className=" flex justify-center">
                        <div className="relative w-full h-[300px] xl:w-[1100px] sm:h-[350px] md:h-[450px] sm:rounded-b-md overflow-hidden ">
                            {loading ? (
                                <div className="w-full h-full">
                                    <SkeletonLoading />
                                </div>
                            ) : (
                                <>
                                    <img
                                        className="w-full h-full object-cover  "
                                        src={
                                            groupData.banner
                                                ? groupData.banner
                                                : img
                                        }
                                        alt="image"
                                    />
                                    <div className=" absolute bottom-0 left-0 flex items-center w-full h-[42px] bg-blue-800">
                                        <span className="px-3 tex-[14px] text-white font-medium line-clamp-1">
                                            {groupData.name}
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col px-2 pb-2 xl:pb-0 xl:px-0 ">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center justify-between w-full lg:w-[1000px] xl:w-[1030px] min-h-[90px] mx-auto">
                        <div className="flex items-center w-full h-full">
                            <span className=" text-[28px] font-bold line-clamp-2 ">
                                {groupData.name}
                            </span>
                        </div>
                        {context.width < 640 && !loading && (
                            <div className="flex items-center">
                                {groupData.status == 0 ? (
                                    <GiEarthAmerica className="mr-1" />
                                ) : (
                                    <FaLock className="mr-1" />
                                )}

                                <span>
                                    {groupData.status == 0
                                        ? "Nhóm công khai"
                                        : "Nhóm riêng tư"}
                                </span>
                                <BsDot className="mx-1" />
                                <span className="mr-1 font-medium">
                                    {formatNumber(groupData.members)}
                                </span>
                                <span>thành viên</span>
                            </div>
                        )}
                        <div className="flex w-full h-full mb-1 sm:w-max">
                            {groupData.checkJoined && !loading && (
                                <Button
                                    _className={`flex items-center justify-center w-full sm:w-max h-max p-2 rounded-md text-white 
                                        bg-blue-500 hover:bg-blue-600`}
                                    onClick={() => setShowModal(!showModal)}
                                >
                                    <BiPlus className="text-[25px]" />
                                    <span className=" font-medium">Mời</span>
                                </Button>
                            )}
                            {groupData.checkRequest && !loading && (
                                <Button
                                    _className={`flex items-center justify-center w-full h-[41px] sm:w-max h-max p-2 rounded-md bg-gray-200
                                     hover:bg-gray-300`}
                                    cursorDefault={loadingCancel}
                                    onClick={() =>
                                        !loadingCancel &&
                                        cancelRequestJoinGroup(
                                            user.userId,
                                            groupData.id
                                        )
                                    }
                                >
                                    {loadingCancel && (
                                        <span className=" block w-5 h-5 mr-1">
                                            <LoadingCircleLine />
                                        </span>
                                    )}
                                    <span className=" font-medium">
                                        Huỷ yêu cầu
                                    </span>
                                </Button>
                            )}
                            {!groupData.checkJoined &&
                                !groupData.checkRequest &&
                                !groupData.checkInvitation &&
                                !loading && (
                                    <Button
                                        _className={`flex items-center justify-center w-full h-[41px] sm:w-max h-max p-2 rounded-md 
                                        text-white bg-blue-600 hover:bg-blue-700`}
                                        cursorDefault={loadingRequest}
                                        onClick={() =>
                                            !loadingRequest &&
                                            requestJoinGroup(
                                                user.userId,
                                                groupData.id
                                            )
                                        }
                                    >
                                        {loadingRequest && (
                                            <span className="block w-5 h-5 mr-1">
                                                <LoadingCircleLine />
                                            </span>
                                        )}
                                        {!loadingRequest && (
                                            <MdGroups className="mr-1 text-[20px]" />
                                        )}
                                        <span className=" font-medium">
                                            Tham gia nhóm
                                        </span>
                                    </Button>
                                )}
                            {!loading && !groupData.checkInvitation && (
                                <Button
                                    _className={
                                        "ml-2 p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                                    }
                                    onClick={() =>
                                        setShowGroupList(!showGroupList)
                                    }
                                >
                                    <span>
                                        <FiChevronDown
                                            className={`text-[25px] ${
                                                showGroupList
                                                    ? "rotate-180"
                                                    : ""
                                            }`}
                                        />
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                    {groupData.checkRequest && (
                        <div className="flex flex-col w-full lg:w-[1000px] xl:w-[1030px] mx-auto p-3 mb-1 rounded-lg bg-gray-100">
                            <span className=" font-medium text-[17px]">
                                Yêu cầu của bạn đang chờ xử lý
                            </span>
                            <span className=" font-normal text-gray-500">
                                Bạn sẽ nhận được thông báo nếu yêu cầu của bạn
                                được phê duyệt.
                            </span>
                        </div>
                    )}
                    {groupData.checkInvitation && !loading && (
                        <div className="flex w-full lg:w-[1000px] xl:w-[1030px] mx-auto p-3 mb-1 rounded-lg bg-gray-100">
                            <Invitation />
                        </div>
                    )}
                </div>
                {showGroupList && (
                    <div className="w-full lg:w-[1000px] xl:w-[1030px] mx-auto">
                        <GroupList />
                    </div>
                )}
                {!loading && (
                    <div
                        className=" w-full lg:w-[1000px] xl:w-[1030px] mx-auto border-t boder-gray-900
                            scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
                    >
                        <NavList />
                    </div>
                )}
            </div>
        </>
    );
}

export default LayoutTop;
