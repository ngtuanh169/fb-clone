import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import groupApi from "../../api/groupApi";
import Button from "../../Components/Button";
import SkeletonLoading from "../../Components/SkeletonLoading";
import LoadingCircleLine from "../../Components/LoadingCircleLine";
import GroupItem from "./GroupItem";
function YourGroups({ groupName = "" }) {
    const user = useSelector((state) => state.user);
    const [groupsList, setGroupsList] = useState([]);
    const [payload, setPayLoad] = useState({ limit: 8, page: 1, groupName });
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getGroups = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await groupApi.get(params);
                if (res.success && res.count > 0) {
                    setGroupsList([...groupsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(1);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && !loading && payload.page <= totalPage && getGroups();
    }, [user.userId, payload]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            const text = payload?.groupName ? payload?.groupName : "";
            if (groupName.trim() !== text) {
                setGroupsList([]);
                setPayLoad({ ...payload, page: 1, groupName });
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [groupName]);

    return (
        <div className="flex flex-col">
            <div className="flex flex-col">
                {groupsList.length > 0 &&
                    groupsList.map((item) => (
                        <GroupItem key={item.id} data={item} />
                    ))}
                {groupsList == 0 && !loading && (
                    <span className=" mx-auto my-5 font-medium text-gray-500">
                        Không có dữ liệu nhóm
                    </span>
                )}
                {loading &&
                    Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <div key={index} className="flex w-full mb-4">
                                <div className="w-[60px] h-[60px] rounded-lg overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                                <div className="flex flex-col ml-2 ">
                                    <div className="w-[250px] h-[25px] mb-2 rounded-sm">
                                        <SkeletonLoading />
                                    </div>
                                    <div className="w-[150px] h-[25px] rounded-sm">
                                        <SkeletonLoading />
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
            {payload.page < totalPage && (
                <div className="">
                    <Button
                        _className={
                            "flex justify-center items-center w-full rounded-md py-[3px] bg-gray-200 hover:bg-gray-300"
                        }
                        cursorDefault={loading}
                        onClick={() =>
                            !loading &&
                            setPayLoad({ ...payload, page: payload.page + 1 })
                        }
                    >
                        {loading && (
                            <span className="block w-5 h-5 mr-1">
                                <LoadingCircleLine />
                            </span>
                        )}
                        <span className=" font-semibold">Xem thêm</span>
                    </Button>
                </div>
            )}
        </div>
    );
}

export default YourGroups;
