import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../Socket";
import friendsApi from "../../../api/friendsApi";
import SkeletonLoading from "../../../Components/SkeletonLoading";
import SubLayoutLeft from "../../../Components/SubLayoutLeft";
import SearchSubLayout from "../../../Components/Modal/SearchSubLayout";
import Item from "./Item";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";

function FriendRequest() {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const [payload, setPayload] = useState({
        limit: 8,
        page: 1,
        number: 0,
        userName: "",
    });
    const [totalPage, setTotalPage] = useState(1);
    const [usersList, setUserList] = useState([]);
    const [callApi, setCallApi] = useState(true);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    useEffect(() => {
        const getFriendsRequest = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await friendsApi.getFriendRequest(params);
                if (res.success && res.count > 0) {
                    setUserList([...usersList, ...res.data]);
                    setPayload({ ...payload, page: payload.page + 1 });
                    setTotalPage(Math.ceil(res.count / payload.limit));
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
            getFriendsRequest();
    }, [callApi]);

    useEffect(() => {
        setCallApi(false);
        const timeId = setTimeout(() => {
            if (text.trim() !== payload.userName && !loading) {
                setPayload({ ...payload, page: 1, userName: text });
                setUserList([]);
                setTotalPage(1);
                setCallApi(true);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [text]);

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

    useEffect(() => {
        const handleMessage = (e) => {
            const sendData = JSON.parse(e.data);
            console.log(sendData);
            if (sendData.typeNoti === "friendRequest") {
                setPayload((prev) => {
                    return { ...prev, number: prev.number + 1 };
                });
            }
        };
        socketContext &&
            socketContext.addEventListener("message", handleMessage);
        return (
            socketContext &&
            socketContext.removeEventListener("message", handleMessage)
        );
    }, [socketContext]);
    return (
        <div className="flex ">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="">
                    <SubLayoutLeft name={"Bạn bè"}>
                        <div className="">
                            <SearchSubLayout
                                nameInput="Tìm kiếm bạn bè"
                                text={text}
                                setText={setText}
                            />
                        </div>
                        <div className="flex gap-2 my-2 p-1 lg:flex-col lg:gap-0 lg:my-0">
                            <NavLink
                                to={"/friends"}
                                className={({ isActive }) =>
                                    `flex items-center w-full py-2 px-1 lg:mt-3 rounded-md ${
                                        isActive ? "bg-hover" : ""
                                    } hover:bg-hover`
                                }
                                end
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={`flex items-center justify-center w-9 h-9 ${
                                                isActive
                                                    ? "bg-blue-500"
                                                    : "bg-slate-300"
                                            } rounded-full `}
                                        >
                                            <FaUserFriends
                                                className={`w-5 h-5 ${
                                                    isActive ? "text-white" : ""
                                                }`}
                                            />
                                        </span>
                                        <span className=" ml-2 text-[16px] font-medium">
                                            Trang chủ
                                        </span>
                                    </>
                                )}
                            </NavLink>
                            <NavLink
                                to={"/friends/request"}
                                className={({ isActive }) =>
                                    `flex items-center w-full py-2 px-1  rounded-md ${
                                        isActive ? "bg-hover" : ""
                                    } hover:bg-hover`
                                }
                                end
                            >
                                {({ isActive }) => (
                                    <>
                                        <span
                                            className={`flex items-center justify-center w-9 h-9 ${
                                                isActive
                                                    ? "bg-blue-500"
                                                    : "bg-slate-300"
                                            } rounded-full `}
                                        >
                                            <FaUserPlus
                                                className={`w-5 h-5 ${
                                                    isActive ? "text-white" : ""
                                                }`}
                                            />
                                        </span>
                                        <span className=" ml-2 text-[16px] font-medium">
                                            Lời mời kết bạn
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        </div>
                    </SubLayoutLeft>
                </div>
                <div className="w-full lg:w-[1030px] mx-auto pt-6">
                    <div className="flex flex-col w-full px-2">
                        <div className=" w-full">
                            <span className=" text-[20px] font-bold">
                                Lời mời kết bạn
                            </span>
                        </div>
                        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-3">
                            {usersList.length > 0 &&
                                usersList.map((item) => (
                                    <Item key={item.id} data={item} />
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
                                            className="flex flex-col w-full h-[390px] rounded-md overflow-hidden"
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
                                    Không có lời mời kết bạn nào được hiển thị
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendRequest;
