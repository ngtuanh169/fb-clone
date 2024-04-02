import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import friendsApi from "../../../api/friendsApi";
import Button from "../../../Components/Button";
import SkeletonLoading from "../../../Components/SkeletonLoading";
import Item from "../Item";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
function FriendsList({ userName = "" }) {
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({
        limit: 8,
        page: 1,
        text: userName,
    });
    const [friendsList, setFriendsList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getFriends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await friendsApi.getFriends(params);
                if (res.success && res.count > 0) {
                    setFriendsList([...friendsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && payload.page <= totalPage && getFriends();
    }, [payload]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (userName.trim() !== payload.text && !loading) {
                setFriendsList([]);
                setTotalPage(1);
                setPayload({ ...payload, page: 1, text: userName });
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [userName]);
    return (
        <>
            <div className="flex flex-col w-full px-2 border-b border-gray-300">
                <div className="w-full">
                    <span className=" text-[20px] font-bold">Bạn bè</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3 mb-2 w-full ">
                    {friendsList.length > 0 &&
                        friendsList.map((item) => (
                            <Item key={item.id} data={item} noFriend={false} />
                        ))}
                    {loading &&
                        Array(4)
                            .fill(0)
                            .map((item, index) => (
                                <div
                                    key={index}
                                    style={{
                                        boxShadow: "1px 1px 5px  #ccc",
                                    }}
                                    className="flex flex-col h-[390px] w-full rounded-md overflow-hidden"
                                >
                                    <div className="w-full h-[200px]">
                                        <SkeletonLoading />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between w-full">
                                        <div className="w-[100px] h-8 rounded-md mt-4">
                                            <SkeletonLoading />
                                        </div>
                                        <div className="w-full rounded-md">
                                            <div className="w-full h-8 mb-2">
                                                <SkeletonLoading />
                                            </div>
                                            <div className="w-full h-8 mb-2">
                                                <SkeletonLoading />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
                {!loading && friendsList.length === 0 && (
                    <div className="flex flex-col text-center w-full mt-[100px] ">
                        <FaUserFriends className="text-gray-500 mx-auto text-[112px]" />
                        <span className="text-[20pxp] font-bold text-gray-500">
                            Không có bạn bè nào được hiển thị
                        </span>
                    </div>
                )}
                {payload.page < totalPage && (
                    <div className="w-full my-2">
                        <Button
                            _className={
                                "flex items-center justify-center w-full py-2 text-blue-500 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                            onClick={() =>
                                !loading &&
                                setPayload({
                                    ...payload,
                                    page: payload.page + 1,
                                })
                            }
                        >
                            <span className="  font-medium mr-2">Xem thêm</span>
                            <AiOutlineCaretDown />
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}

export default FriendsList;
