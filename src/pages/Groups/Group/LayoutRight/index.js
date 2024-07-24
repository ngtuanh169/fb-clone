import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GroupContext } from "../GroupProvider";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import LayoutTop from "../LayoutTop";
import Discuss from "./Discuss";
import Files from "./Files";
import Reels from "./Reels";
import Remarkable from "./Remarkable";
import Members from "./Members";
import RequestJoinGroup from "./RequestJoinGroup";
import Intro from "./Intro";

function LayoutRight() {
    const { page } = useParams();
    const navigate = useNavigate();
    const { groupData, loading } = useContext(GroupContext);
    let Comp = undefined;
    switch (page) {
        case "members":
            Comp = Members;
            break;
        case "member-requests":
            Comp = RequestJoinGroup;
            break;
        case "reels":
            Comp = Reels;
            break;
        case "files":
            Comp = Files;
            break;
        case "remarkable":
            Comp = Remarkable;
            break;
        case "introduce":
            Comp = Intro;
            break;
        default:
            Comp = Discuss;
    }
    useEffect(() => {
        if (groupData?.id && !groupData.checkJoined && groupData.status == 1) {
            navigate(`/group/${groupData.id}/introduce`);
        }
    }, [groupData?.id]);

    return (
        <div className="w-full">
            <div className="flex flex-col">
                {page !== "member-requests" && (
                    <div className="">
                        <LayoutTop />
                    </div>
                )}
                <div className="flex w-full">
                    <div
                        className={`w-full ${
                            page == "member-requests"
                                ? ""
                                : "lg:w-[1000px] xl:w-[1030px] mt-4 mx-auto"
                        }`}
                    >
                        {loading && (
                            <div className="w-5 h-5 mx-auto my-auto">
                                <LoadingCircleLine />
                            </div>
                        )}
                        {!loading && groupData?.id && <Comp />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LayoutRight;
