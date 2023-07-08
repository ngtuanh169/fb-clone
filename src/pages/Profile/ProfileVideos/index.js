import Maincard from "../../../Components/MainCard";
import ProfileHeader from "../Component/ProfileHeader";
import VideosNav from "./VideosNav";
import VideosList from "./VideosList";
import img from "../../../assets/images/avatar/avatar.jpg";
function ProfileVideos() {
    const videosList = [
        { id: 1, img, time: "2:02" },
        { id: 2, img, time: "2:02" },
        { id: 3, img, time: "2:02" },
        { id: 4, img, time: "2:02" },
        { id: 5, img, time: "2:02" },
        { id: 6, img, time: "2:02" },
        { id: 7, img, time: "2:02" },
        { id: 8, img, time: "2:02" },
    ];
    return (
        <div className="">
            <ProfileHeader />
            <div className="w-full lg:w-[1000px] mx-auto">
                <Maincard>
                    <div className="flex flex-col w-full p-2">
                        <VideosNav />
                        <div className="p-2">
                            <VideosList data={videosList} />
                        </div>
                    </div>
                </Maincard>
            </div>
        </div>
    );
}

export default ProfileVideos;
