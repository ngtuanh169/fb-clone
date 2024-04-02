import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import friendsApi from "../../../../api/friendsApi";
import { formatNumber } from "../../../../Hooks/useFormat";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import MainCard from "../../../../Components/MainCard";
import FriendItem from "./FriendItem";
function Friends() {
    const { userId } = useParams();
    const [payload, setPayload] = useState({ limit: 9, page: 1, number: 0 });
    const [friendsList, setFriendsList] = useState([]);
    const [countFriends, setCountFriends] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    useEffect(() => {
        const getFirends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId };
                const res = await friendsApi.getFriends(params);
                if (res.success) {
                    setFriendsList(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        userId && getFirends();
    }, [userId]);
    useEffect(() => {
        const countFirends = async () => {
            try {
                setLoading2(true);
                const params = { userId };
                const res = await friendsApi.count_friends(params);
                console.log(res);
                if (res.success) {
                    setCountFriends(res.count);
                }
                setLoading2(false);
            } catch (error) {
                console.log(error);
            }
        };
        userId && countFirends();
    }, [userId]);
    return (
        <MainCard>
            <div className="p-3">
                <div className="flex justify-between">
                    <h2 className="text-[20px] font-bold">Bạn bè</h2>
                    <Link
                        to={`/profile/${userId}/friends`}
                        className={
                            "py-1 px-2 text-blue-700 rounded-md hover:bg-hover"
                        }
                    >
                        <span>Xem tất bạn bè</span>
                    </Link>
                </div>
                {countFriends > 0 && (
                    <>
                        <div className="w-full">
                            {!loading2 && countFriends > 0 && (
                                <span className="text-gray-500">{`${formatNumber(
                                    +countFriends
                                )} người bạn`}</span>
                            )}
                            {loading2 && (
                                <div className="h-5 w-[100px] rounded-md overflow-hidden">
                                    <SkeletonLoading />
                                </div>
                            )}
                        </div>
                        <div className=" grid grid-cols-3 gap-1 mt-4 ">
                            {friendsList.length > 0 &&
                                friendsList.map((item) => (
                                    <div
                                        className="flex flex-col"
                                        key={item.id}
                                    >
                                        <FriendItem data={item} />
                                        <div className="w-full p-2"></div>
                                    </div>
                                ))}
                            {loading &&
                                Array(3)
                                    .fill(0)
                                    .map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col h-[122px] rounded-lg overflow-hidden"
                                        >
                                            <SkeletonLoading />
                                            <div className="w-full p-2"></div>
                                        </div>
                                    ))}
                        </div>
                    </>
                )}
            </div>
        </MainCard>
    );
}

export default Friends;
