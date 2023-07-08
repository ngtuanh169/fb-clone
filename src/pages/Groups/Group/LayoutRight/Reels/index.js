import { useContext } from "react";
import { ScreenSize } from "../../../../../App";
import Posts from "../../../../../Components/Posts";
import Introduce from "../Components/Introduce";
import MediaFiles from "../Components/MediaFiles";
import avatar from "../../../../../assets/images/avatar/avatar.jpg";
function Reels() {
    const context = useContext(ScreenSize);
    return (
        <div className="flex w-full">
            <div className="flex flex-col w-full mx-auto sm:w-[550px] xl:w-[600px]">
                <Posts
                    userId={1}
                    avatar={avatar}
                    name={"Nguyen Tu Anh"}
                    time={1680840924949}
                    groupId="1"
                    group={true}
                    groupMember={true}
                    iconClose={true}
                />
            </div>
            {context.width >= 1440 && (
                <div className="flex-1 flex flex-col ml-4">
                    <Introduce />
                    <MediaFiles />
                </div>
            )}
        </div>
    );
}

export default Reels;
