import { useContext } from "react";
import { useParams } from "react-router-dom";
import { NavContext } from "../NavProvider";
import LayoutTop from "../LayoutTop";
import RequestJoinGroup from "./RequestJoinGroup";

function LayoutRight() {
    const { memberRequest } = useParams();
    const context = useContext(NavContext);
    return (
        <div className="w-full">
            <div className="flex flex-col">
                {!memberRequest && (
                    <div className="">
                        <LayoutTop />
                    </div>
                )}
                <div className="flex w-full">
                    {memberRequest ? (
                        <RequestJoinGroup />
                    ) : (
                        <div className="w-full lg:w-[1000px] xl:w-[1030px] mt-4 mx-auto">
                            <context.currentNav.Comp />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LayoutRight;
