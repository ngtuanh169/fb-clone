import ToolItem from "./ToolItem";
import { CgMenuGridO } from "react-icons/cg";
import { BsMessenger, BsBellFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import avatar from "../../../../assets/images/avatar/avatar.jpg";
function HeaderTool() {
    return (
        <div className=" w-3/12 ">
            <ul className="flex justify-end h-full">
                <ToolItem>
                    <CgMenuGridO />
                </ToolItem>
                <ToolItem>
                    <BsMessenger />
                </ToolItem>
                <ToolItem>
                    <BsBellFill />
                </ToolItem>
                <ToolItem>
                    <img
                        className="h-full w-full object-cover object-center"
                        src={avatar}
                        alt="avatar"
                    />
                </ToolItem>
            </ul>
        </div>
    );
}

export default HeaderTool;
