import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ScreenSize } from "../../../App";
import { GroupProvider } from "./GroupProvider";
import LayoutLeft from "./LayouLeft";
import LayoutRight from "./LayoutRight";
import MemberInfo from "./MemberInfo";
function Group() {
    const { groupId, userId } = useParams();
    const context = useContext(ScreenSize);
    return (
        <GroupProvider>
            <div className="">
                {userId ? (
                    <MemberInfo />
                ) : (
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
                )}
            </div>
        </GroupProvider>
    );
}

export default Group;
