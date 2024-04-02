import { useState } from "react";
import { NavLink } from "react-router-dom";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
import FriendsList from "./FriendsList";
import People from "./People";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
function Friends() {
    const [userName, setUserName] = useState("");
    return (
        <div className="flex ">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="">
                    <SubLayoutLeft name={"Bạn bè"}>
                        <div className="">
                            <SearchSubLayout
                                nameInput="Tìm kiếm bạn bè"
                                text={userName}
                                setText={setUserName}
                            />
                        </div>
                        <div className="flex gap-2 my-2 p-1 lg:flex-col lg:gap-0 lg:my-0 ">
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
                <div className="w-full lg:w-[1030px] mx-auto pt-6 ">
                    <div className="w-full flex flex-col">
                        <FriendsList userName={userName} />
                        <People userName={userName} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Friends;
