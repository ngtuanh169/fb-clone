import { useContext, useState, useEffect } from "react";
import { ScreenSize } from "../../../../App";
import LayoutLeft from "../../../../pages/Home/LayoutLeft";
import NavItem from "./NavItem";
import { TiHome } from "react-icons/ti";
import { MdOndemandVideo } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { BsList } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
function HeaderNav() {
    const context = useContext(ScreenSize);
    const [showLefNav, setShowNavLef] = useState(false);
    useEffect(() => {
        if (showLefNav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
        }
    }, [showLefNav]);
    return (
        <div className=" flex-1 flex justify-start ml-2 md:ml-0 md:justify-center ">
            <ul className="flex justify-between md:w-[340px] lg:w-[600px]">
                {context.width >= 768 && (
                    <>
                        <div className=" md:w-1/5 ">
                            <NavItem to="/" name={"Trang chủ"}>
                                <TiHome className="h-full mx-auto my-0 " />
                            </NavItem>
                        </div>
                        <div className=" md:w-1/5 ">
                            <NavItem to="/videos" name={"Watch"}>
                                <MdOndemandVideo className="h-full mx-auto my-0 " />
                            </NavItem>
                        </div>
                        <div className=" md:w-1/5 ">
                            <NavItem to="/friends" name={"Bạn bè"}>
                                <FaUserFriends className="h-full mx-auto my-0 " />
                            </NavItem>
                        </div>
                        <div className=" md:w-1/5 ">
                            <NavItem to="/groups" name={"Nhóm"}>
                                <HiUserGroup className="h-full mx-auto my-0 " />
                            </NavItem>
                        </div>
                    </>
                )}
                {context.width >= 1024 && (
                    <div className="  md:w-1/5 ">
                        <NavItem to="/marketplace" name={"Marketplace"}>
                            <BsShop className="h-full mx-auto my-0 " />
                        </NavItem>
                    </div>
                )}
                {context.width < 768 && (
                    <div className="flex items-centerh-full w-[56px]">
                        <NavItem>
                            <BsList
                                style={{ color: showLefNav ? "blue" : "" }}
                                className="text-[30px] cursor-pointer"
                                onClick={() => setShowNavLef(!showLefNav)}
                            />
                        </NavItem>
                    </div>
                )}
                {showLefNav && (
                    <div
                        className=" fixed top-[56px] left-0 w-full h-screen px-2 bg-[#f0f2f5] scrollbar-thin "
                        onClick={() => setShowNavLef(false)}
                    >
                        <div className="h-max w-full mb-[50px] ">
                            <LayoutLeft />
                        </div>
                    </div>
                )}
            </ul>
        </div>
    );
}

export default HeaderNav;
