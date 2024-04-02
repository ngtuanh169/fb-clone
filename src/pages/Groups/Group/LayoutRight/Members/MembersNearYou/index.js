import { useState, useEffect, useContext } from "react";
import groupApi from "../../../../../../api/groupApi";
import SkeletonLoading from "../../../../../../Components/SkeletonLoading";
import { GroupContext } from "../../../GroupProvider";
import Member from "../Member";
import Button from "../../../../../../Components/Button";
function MembersNearYou() {
    const { groupData } = useContext(GroupContext);
    const [userList, setUserList] = useState([]);
    const [payload, setPayload] = useState({ limit: 3, page: 1 });
    const [totalPage, setTotalPage] = useState(1);
    const [totalMembers, setTotalMembers] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getMembers = async () => {
            try {
                setLoading(true);
                const params = { ...payload, groupId: groupData.id };
                const res = await groupApi.getMembersNearYou(params);
                if (res.success && res.count > 0) {
                    setUserList([...userList, ...res.data]);
                    setTotalMembers(res.count);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.id && !loading && payload.page <= totalPage && getMembers();
    }, [payload, groupData.id]);
    return (
        <>
            {userList.length > 0 ? (
                <div className="flex flex-col py-4 border-b">
                    <div className="w-full">
                        <span className=" font-medium">
                            Thành viên ở gần bạn
                        </span>
                        <span className=" px-1 font-medium">·</span>
                        <span>{totalMembers}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full mt-4">
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
                                        className="flex items-center gap-2 mt-4"
                                    >
                                        <div className="h-[60px] w-[60px] ">
                                            <SkeletonLoading circle />
                                        </div>
                                        <div className="h-[30px] w-[200px] rounded-md">
                                            <SkeletonLoading />
                                        </div>
                                    </div>
                                ))}
                    </div>
                    {payload.page < totalPage && (
                        <div className="mt-4 ">
                            <Button
                                _className={
                                    "w-full p-2 text-center rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                                onClick={() =>
                                    setPayload({
                                        ...payload,
                                        page: payload.page + 1,
                                    })
                                }
                            >
                                <span className=" font-medium">Xem thêm</span>
                            </Button>
                        </div>
                    )}
                </div>
            ) : (
                <></>
            )}
        </>
    );
}

export default MembersNearYou;
