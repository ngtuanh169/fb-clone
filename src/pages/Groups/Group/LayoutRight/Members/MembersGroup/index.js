import { useContext, useEffect, useState } from "react";
import groupApi from "../../../../../../api/groupApi";
import { GroupContext } from "../../../GroupProvider";
import SkeletonLoading from "../../../../../../Components/SkeletonLoading";
import Member from "../Member";
function MembersGroup() {
    const { groupData, setGroupData } = useContext(GroupContext);
    const [payload, setPayload] = useState({
        limit: 10,
        page: 1,
        groupId: groupData.id,
    });
    const [userList, setUserList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [totalPageMembers, setTotalPageMembers] = useState(groupData.members);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getMembers = async () => {
            try {
                setLoading(true);
                const params = { ...payload, firstId, lastId };
                const res = await groupApi.getMembersInGroup(params);
                if (res.success && res.count > 0 && res?.data) {
                    const length = res.data.length;
                    setUserList([...userList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setTotalPageMembers(res.count);
                    payload.page == 1 && setFirstId(res.data[0].memberId);
                    setLastId(res.data[length - 1].memberId);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.id && !loading && payload.page <= totalPage && getMembers();
    }, [payload]);

    useEffect(() => {
        totalPageMembers !== groupData.members &&
            setGroupData({ ...groupData, members: totalPageMembers });
    }, [totalPageMembers]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollHeight - 22 < offsetHeight + scrollTop) {
                !loading &&
                    payload.page < totalPage &&
                    setPayload({ ...payload, page: payload.page + 1 });
            }
        };

        !loading && window.addEventListener("scroll", handleScroll);
        return () =>
            !loading && window.removeEventListener("scroll", handleScroll);
    }, [loading]);
    return (
        <div className="flex flex-col py-4 ">
            <div className="w-full">
                <span className=" font-medium">Thành viên nhóm</span>
                <span className=" px-1 font-medium">·</span>
                <span>{totalPageMembers}</span>
            </div>
            <div className="flex flex-col gap-2 w-full pt-4">
                {userList.length > 0 &&
                    userList.map((item) => (
                        <Member key={item.id} data={item} />
                    ))}
                {loading &&
                    Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 w-full"
                            >
                                <div className="w-[60px] h-[60px]">
                                    <SkeletonLoading circle />
                                </div>
                                <div className="w-[150px] h-[30px] rounded-md overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default MembersGroup;
