import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import userApi from "../../../api/userApi";
import SkeletonLoading from "../../../Components/SkeletonLoading";
import Item from "../Item";
import { FaUserFriends } from "react-icons/fa";
function People({ userName = "" }) {
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({ limit: 8, page: 1, userName });
    const [totalPage, setTotalPage] = useState(1);
    const [callApi, setCallApi] = useState(true);
    const [usersList, setUsersList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUsersNotFriend = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await userApi.getUsersNotFriend(params);

                if (res.success && res.count > 0) {
                    setPayload({ ...payload, page: payload.page + 1 });
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setUsersList([...usersList, ...res.data]);
                } else {
                    setTotalPage(0);
                }
                setCallApi(false);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId &&
            callApi &&
            payload.page <= totalPage &&
            getUsersNotFriend();
    }, [callApi]);

    useEffect(() => {
        setCallApi(false);
        const timeId = setTimeout(() => {
            if (userName.trim() !== payload.userName && !loading) {
                setPayload({ ...payload, page: 1, userName });
                setUsersList([]);
                setTotalPage(1);
                setCallApi(true);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [userName]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading && setCallApi(true);
            } else {
                !loading && setCallApi(false);
            }
        };

        !loading && window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);
    return (
        <div className="flex flex-col w-full mt-3 px-2 pb-2">
            <div className="w-full">
                <span className=" text-[20px] font-bold">
                    Những người bạn có thể biết
                </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3 w-full ">
                {usersList.length > 0 &&
                    usersList.map((item) => (
                        <Item key={item.id} data={item} noFriend={true} />
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
            {!loading && usersList.length === 0 && (
                <div className="flex flex-col text-center w-full mt-[100px] ">
                    <FaUserFriends className="text-gray-500 mx-auto text-[112px]" />
                    <span className="text-[20pxp] font-bold text-gray-500">
                        Không có người nào được hiển thị
                    </span>
                </div>
            )}
        </div>
    );
}

export default People;
