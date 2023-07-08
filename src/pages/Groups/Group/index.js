import { useContext } from "react";
import { useParams } from "react-router-dom";
import { NavProvider } from "./NavProvider";
import { ScreenSize } from "../../../App";
import LayoutLeft from "./LayouLeft";
import LayoutRight from "./LayoutRight";
import MemberInfo from "./MemberInfo";
function Group() {
    const { groupId, userId } = useParams();
    const context = useContext(ScreenSize);
    return (
        <div className="">
            {userId ? (
                <MemberInfo />
            ) : (
                <NavProvider>
                    <div className="flex">
                        {context.width >= 1280 && (
                            <div className="">
                                <LayoutLeft />
                            </div>
                        )}
                        <div className="w-full xl:flex-1 ">
                            <LayoutRight />
                        </div>
                    </div>
                </NavProvider>
            )}
        </div>
    );
}

export default Group;
