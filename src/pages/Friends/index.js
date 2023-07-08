import { useParams, NavLink } from "react-router-dom";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
import Item from "./Item";
import { FaUserFriends, FaUserPlus } from "react-icons/fa";
import { AiOutlineCaretDown } from "react-icons/ai";
import avt from "../../assets/images/avatar/avatar.jpg";
import Button from "../../Components/Button";
function Friends() {
    const data = [
        { id: 1, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 2, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 3, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 4, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 5, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 6, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 7, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 8, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
    ];

    return (
        <div className="flex ">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="">
                    <SubLayoutLeft name={"Bạn bè"}>
                        <div className="">
                            <SearchSubLayout nameInput="Tìm kiếm bạn bè" />
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
                <div className="w-full lg:w-[1030px] mx-auto pt-6">
                    <div className="w-full flex flex-col">
                        <div className="flex flex-col w-full px-2 border-b border-gray-300">
                            <div className="w-full">
                                <span className=" text-[20px] font-bold">
                                    Bạn bè
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-3  w-full ">
                                {data.length > 0 &&
                                    data.map((item) => (
                                        <Item key={item.id} data={data} />
                                    ))}
                            </div>
                            <div className="w-full my-2">
                                <Button
                                    _className={
                                        "flex items-center justify-center w-full py-2 text-blue-500 bg-gray-200 rounded-md hover:bg-gray-300"
                                    }
                                >
                                    <span className="  font-medium mr-2">
                                        Xem thêm
                                    </span>
                                    <AiOutlineCaretDown />
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-col w-full mt-3">
                            <div className="w-full">
                                <span className=" text-[20px] font-bold">
                                    Những người bạn có thể biết
                                </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mt-3  w-full ">
                                {data.length > 0 &&
                                    data.map((item) => (
                                        <Item
                                            key={item.id}
                                            data={data}
                                            noFriend={true}
                                        />
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Friends;
