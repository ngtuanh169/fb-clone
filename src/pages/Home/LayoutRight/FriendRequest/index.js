import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import friendsApi from "../../../../api/friendsApi";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import Item from "./Item";
function FriendRequest({ data }) {
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({ limit: 2, page: 1, number: 0 });
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getFriendRequest = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await friendsApi.getFriendRequest(params);
                if (res.success && res.count > 0) {
                    setRequestList(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user?.userId && getFriendRequest();
    }, []);

    return (
        <div className="w-full border-b border-gray-300">
            <div className="flex justify-between items-center mb-1">
                <span className=" text-[17px] text-gray-500 font-medium">
                    Lời mời kết bạn
                </span>
                {requestList.length === 2 && (
                    <Link
                        to={"/friends/request"}
                        className={" p-[6px] rounded hover:bg-gray-200"}
                    >
                        <span className="text-blue-500">Xem tất cả</span>
                    </Link>
                )}
            </div>
            {requestList.length === 0 && (
                <div className="w-full text-center">
                    <span className="text-gray-500 text-[15px]">
                        Không có yêu cầu nào mới
                    </span>
                </div>
            )}
            {loading &&
                Array(2)
                    .fill(0)
                    .map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full h-14 mb-2"
                        >
                            <div className="h-14 w-14 mr-4">
                                <SkeletonLoading circle={true} />
                            </div>
                            <div className="flex-1 h-[55px]">
                                <SkeletonLoading />
                            </div>
                        </div>
                    ))}

            {!loading &&
                requestList.length > 0 &&
                requestList.map((item) => <Item key={item.id} data={item} />)}
        </div>
    );
}

export default FriendRequest;
