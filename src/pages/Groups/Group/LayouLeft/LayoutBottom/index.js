import { useContext } from "react";
import { NavContext } from "../../NavProvider";
import Button from "../../../../../Components/Button";
import { FaUserPlus } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import { FaDotCircle } from "react-icons/fa";
function LayoutBottom() {
    const { groupId } = useParams();
    const context = useContext(NavContext);
    return (
        <div className="flex flex-col w-full border-t p-2">
            <div className="w-full p-2 mb-4">
                <span className=" font-medium text-gray-500">
                    Công cụ quản trị
                </span>
            </div>
            <div className="w-full">
                <Button
                    _className={"w-full"}
                    // onClick={() =>
                    //     context.setCurrentNav({
                    //         Comp: RequestJoinGroup,
                    //         layout: null,
                    //     })
                    // }
                >
                    <NavLink
                        to={`/group/${groupId}/member_request/${groupId}`}
                        className={({ isActive }) =>
                            `flex items-center justify-between w-full p-3 rounded-md ${
                                isActive
                                    ? "bg-blue-50"
                                    : "bg-gray-100 hover:bg-hover"
                            }  `
                        }
                    >
                        {({ isActive }) => (
                            <div className="flex-1 flex items-center">
                                <span>
                                    <FaUserPlus
                                        className={`text-[25px] ${
                                            isActive ? "text-blue-500" : ""
                                        }`}
                                    />
                                </span>
                                <span className="flex flex-col ml-2 leading-[1]">
                                    <span
                                        className={` font-medium ${
                                            isActive ? "text-blue-500" : ""
                                        }`}
                                    >
                                        Yêu cầu làm thành viên
                                    </span>
                                    <span
                                        className={`flex items-center mt-1 text-[13px] ${
                                            isActive
                                                ? "text-blue-500"
                                                : "text-gray-500"
                                        }  text-left`}
                                    >
                                        <span className="flex w-2 h-2 mr-1 rounded-full bg-blue-500 "></span>
                                        25 yêu cầu
                                    </span>
                                </span>
                            </div>
                        )}
                    </NavLink>
                </Button>
            </div>
        </div>
    );
}

export default LayoutBottom;
