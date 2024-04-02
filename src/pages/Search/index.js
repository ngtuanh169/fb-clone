import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { ScreenSize } from "../../App";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import {
    BsFillPeopleFill,
    BsFillChatLeftTextFill,
    BsFillFlagFill,
} from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
function Search({ children }) {
    const { text } = useParams();
    const context = useContext(ScreenSize);
    const navList = [
        {
            icon: BsFillPeopleFill,
            name: "Mọi người",
            link: "/search/people",
        },
        {
            icon: BsFillChatLeftTextFill,
            name: "Bài viết",
            link: "/search/posts",
        },
        {
            icon: HiUserGroup,
            name: "Nhóm",
            link: "/search/groups",
        },
        {
            icon: BsFillFlagFill,
            name: "Trang",
            link: "/search/pages",
        },
    ];
    return (
        <div className="flex w-full">
            <div className="flex flex-col lg:flex-row w-full">
                <SubLayoutLeft name={"Kết quả tìm kiếm"} des={text}>
                    <div className="w-full px-4 ">
                        <b className="block w-full h-[1px] bg-gray-300"></b>
                    </div>
                    {context.width >= 1024 && (
                        <div className="w-full p-4">
                            <span className=" font-semibold text-[17px]">
                                Bộ lọc
                            </span>
                        </div>
                    )}
                    <div className="flex lg:flex-col w-full px-2 py-2 gap-1 lg:gap-0 lg:py-0">
                        {navList.length > 0 &&
                            navList.map((item, index) => (
                                <div
                                    key={index}
                                    className="w-max lg:w-full rounded-md overflow-hidden hover:bg-hover"
                                >
                                    <NavLink
                                        className={({ isActive }) =>
                                            `flex w-full p-2 items-center ${
                                                isActive ? "bg-hover" : ""
                                            } `
                                        }
                                        to={`${item.link}/${text}`}
                                    >
                                        {({ isActive }) => (
                                            <>
                                                {context.width >= 1024 && (
                                                    <span
                                                        className={`flex items-center justify-center h-9 w-9 ${
                                                            isActive
                                                                ? "text-white bg-blue-500"
                                                                : "bg-gray-300"
                                                        }  rounded-full`}
                                                    >
                                                        {<item.icon />}
                                                    </span>
                                                )}
                                                <span
                                                    style={{
                                                        color:
                                                            isActive &&
                                                            context.width < 1024
                                                                ? "#3b82f6"
                                                                : "",
                                                    }}
                                                    className="text-[15px] font-bold lg:ml-2 lg:font-medium "
                                                >
                                                    {item.name}
                                                </span>
                                            </>
                                        )}
                                    </NavLink>
                                </div>
                            ))}
                    </div>
                </SubLayoutLeft>
                <div className="lg:flex-1">{children}</div>
            </div>
        </div>
    );
}

export default Search;
