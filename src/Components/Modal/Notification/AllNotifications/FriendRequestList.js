import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import friendsApi from "../../../../api/friendsApi";
import FriendRequest from "../NotifyItem/FriendRequest";
import SkeletonLoading from "../../../SkeletonLoading";
function FriendRequestList({ closeModal = () => {} }) {
    const user = useSelector((state) => state.user);
    const [friendRequestList, setFriendRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getFriendRequest = async () => {
            try {
                setLoading(true);
                const res = await friendsApi.getFriendRequest({
                    userId: user.userId,
                    limit: 3,
                    page: 1,
                    number: 0,
                });
                if (res.success && res.count > 0) {
                    setFriendRequestList(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user?.userId && getFriendRequest();
    }, []);
    return (
        <>
            {loading &&
                Array(3)
                    .fill(0)
                    .map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center w-full h-14 mb-2"
                        >
                            <div className="h-14 w-14 mr-4">
                                <SkeletonLoading circle={true} />
                            </div>
                            <div className="flex-1 h-[15px]">
                                <SkeletonLoading />
                            </div>
                        </div>
                    ))}
            {!loading && friendRequestList.length > 0 && (
                <>
                    <div className="flex justify-between px-1">
                        <span className=" text-[16px] font-medium">
                            Lời mời kết bạn
                        </span>
                        {friendRequestList.length === 3 && (
                            <Link to={"/friends/request"} onClick={closeModal}>
                                <span className=" text-[16px] text-blue-500 border-x-[3px] border-blue-500 rounded-md">
                                    Xem tất cả
                                </span>
                            </Link>
                        )}
                    </div>
                    <div className="">
                        {friendRequestList.map(
                            (item, index) =>
                                index < 3 && (
                                    <FriendRequest
                                        key={item.id}
                                        data={item}
                                        closeModal={closeModal}
                                    />
                                )
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default FriendRequestList;
