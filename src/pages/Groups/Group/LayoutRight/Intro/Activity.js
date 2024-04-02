import { useContext, useEffect, useState } from "react";
import { formatNumber, formatTimestamp } from "../../../../../Hooks/useFormat";
import groupApi from "../../../../../api/groupApi";
import MainCard from "../../../../../Components/MainCard";
import SkeletonLoading from "../../../../../Components/SkeletonLoading";
import { GroupContext } from "../../GroupProvider";
import { MdOutlinePostAdd, MdGroups } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
function Activity() {
    const { groupData, setGroupData } = useContext(GroupContext);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getActivityInGroup = async () => {
            try {
                setLoading(true);
                const params = {
                    groupId: groupData.id,
                };
                const res = await groupApi.getActivityInGroup(params);
                if (res.success && res?.data) {
                    setData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.id && getActivityInGroup();
    }, []);
    useEffect(() => {
        data?.members &&
            data?.members !== groupData.members &&
            setGroupData({ ...groupData, members: data.members });
    }, [data?.members]);
    return (
        <MainCard>
            <div className="flex flex-col w-full p-5">
                <div className="flex items-center pb-5 border-b">
                    <span className="font-semibold text-[17px]">Hoạt động</span>
                </div>
                <div className="flex flex-col gap-2 w-full pt-3">
                    <div className="flex items-start gap-2 w-full">
                        <MdOutlinePostAdd className="text-[22px] text-gray-400 mt-[2px]" />
                        {loading ? (
                            <div className="w-[150px] h-[20px] rounded-md mt-1">
                                <SkeletonLoading />
                            </div>
                        ) : (
                            <>
                                <span className="grow flex flex-col ">
                                    <span>
                                        Hôm nay có{" "}
                                        {formatNumber(data.postsToday)} bài viết
                                        mới
                                    </span>
                                    <span className=" font-normal text-gray-500 text-[13px]">
                                        {formatNumber(data.postsInMonth)} trong
                                        tháng trước
                                    </span>
                                </span>
                            </>
                        )}
                    </div>
                    <div className="flex items-start gap-2 w-full">
                        <FaUserFriends className="text-[22px] text-gray-400 mt-[2px]" />
                        {loading ? (
                            <div className="w-[180px] h-[20px] rounded-md mt-1">
                                <SkeletonLoading />
                            </div>
                        ) : (
                            <>
                                <span className="grow flex flex-col ">
                                    <span>
                                        Tổng cộng {formatNumber(data.members)}{" "}
                                        thành viên
                                    </span>
                                    <span className=" font-normal text-gray-500 text-[13px]">
                                        +{formatNumber(data.membersInWeek)}{" "}
                                        trong tuần qua
                                    </span>
                                </span>
                            </>
                        )}
                    </div>
                    <div className="flex items-start gap-2 w-full">
                        <MdGroups className="text-[22px] text-gray-400 " />
                        <span className="grow flex ">
                            <span className="mr-1">Ngày tạo:</span>
                            <span>{formatTimestamp(groupData.createdAt)}</span>
                        </span>
                    </div>
                </div>
            </div>
        </MainCard>
    );
}

export default Activity;
