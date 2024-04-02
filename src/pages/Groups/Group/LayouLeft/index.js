import { useContext } from "react";
import { useSelector } from "react-redux";
import { GroupContext } from "../GroupProvider";
import LayoutTop from "./LayoutTop";
import LayoutBottom from "./LayoutBottom";
function LayoutLeft() {
    const user = useSelector((state) => state.user);
    const { groupData, loading } = useContext(GroupContext);
    return (
        <div className="w-[350px] ">
            <div className="fixed top-0 w-[350px] h-screen pt-[56px] bg-white shadow-lg z-30">
                <LayoutTop />
                {user.userId == groupData.adminId && !loading && (
                    <LayoutBottom />
                )}
            </div>
        </div>
    );
}

export default LayoutLeft;
