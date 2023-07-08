import { useState } from "react";
import { useParams } from "react-router-dom";
import ProdileHeader from "../Component/ProfileHeader";
import MainCard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import Overview from "./Overview";
import Work from "./Work";
import Education from "./Education";
import Adress from "./Adress";
import Relationships from "./Relationships";
import FriendsListTool from "../ProfileFriends/FriendsListTool";
import FriendsListNav from "../ProfileFriends/FriendsListNav";
import FriendsList from "../ProfileFriends/FriendsList";
import PhotosNav from "../ProfilePhotos/PhotosNav";
import PhotosList from "../ProfilePhotos/PhotosList";
import VideosNav from "../ProfileVideos/VideosNav";
import VideosList from "../ProfileVideos/VideosList";
import avt from "../../../assets/images/avatar/avatar.jpg";

function ProfileInformation() {
    const { nav } = useParams();
    const navList = [
        {
            id: 1,
            name: "Tổng quan",
            Comp: Overview,
        },
        {
            id: 2,
            name: "Công việc",
            Comp: Work,
        },
        {
            id: 3,
            name: "Học vấn",
            Comp: Education,
        },
        {
            id: 4,
            name: "Nơi sinh sống",
            Comp: Adress,
        },
        {
            id: 5,
            name: "Các mối quan hệ",
            Comp: Relationships,
        },
    ];

    const friendsData = [
        { id: 1, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 2, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 3, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 4, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 5, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
    ];

    const photoList = [
        { id: 1, photo: avt },
        { id: 2, photo: avt },
        { id: 3, photo: avt },
        { id: 4, photo: avt },
        { id: 5, photo: avt },
        { id: 6, photo: avt },
        { id: 7, photo: avt },
    ];

    const videosList = [
        { id: 1, img: avt, time: "2:02" },
        { id: 2, img: avt, time: "2:02" },
        { id: 3, img: avt, time: "2:02" },
        { id: 4, img: avt, time: "2:02" },
        { id: 5, img: avt, time: "2:02" },
    ];
    const [currentNav, setCurrentNav] = useState(navList[0]);

    return (
        <div className="">
            <ProdileHeader />
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col md:flex-row w-full p-2">
                        <div className="flex flex-col w-full md:w-[33%] px-1 border-b pb-4 md:pb-0 md:border-r md:border-b-0">
                            <div className="w-full">
                                <span className="text-[20px] font-bold px-2">
                                    Giới thiệu
                                </span>
                            </div>
                            {navList.length > 0 &&
                                navList.map((item) => (
                                    <div key={item.id} className="w-full">
                                        <Button
                                            _className={`flex w-full text-left ${
                                                item.id === currentNav.id
                                                    ? "text-blue-700 bg-blue-100"
                                                    : " text-gray-500 hover:bg-slate-200"
                                            } font-medium px-2 py-1 mt-2 rounded-md `}
                                            onClick={() => setCurrentNav(item)}
                                        >
                                            <span>{item.name}</span>
                                        </Button>
                                    </div>
                                ))}
                        </div>
                        <div className="flex flex-col flex-1 px-2">
                            <currentNav.Comp />
                        </div>
                    </div>
                </MainCard>
            </div>
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col w-full p-2">
                        <FriendsListTool />
                        <FriendsListNav />
                        <FriendsList data={friendsData} />
                        <div className="w-full h-10 px-2">
                            <Button
                                to={"/profile/1/friends"}
                                _className={
                                    "w-full h-full flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                            >
                                <span className=" font-semibold">
                                    Xem tất cả
                                </span>
                            </Button>
                        </div>
                    </div>
                </MainCard>
            </div>
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col w-full p-2">
                        <PhotosNav />
                        <PhotosList data={photoList} />
                        <div className="w-full h-10 px-2">
                            <Button
                                to={"/profile/1/photos"}
                                _className={
                                    "w-full h-full flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                            >
                                <span className=" font-semibold">
                                    Xem tất cả
                                </span>
                            </Button>
                        </div>
                    </div>
                </MainCard>
            </div>
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col w-full p-2">
                        <VideosNav />
                        <VideosList data={videosList} />
                        <div className="w-full h-10 px-2">
                            <Button
                                to={"/profile/1/videos"}
                                _className={
                                    "w-full h-full flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                            >
                                <span className=" font-semibold">
                                    Xem tất cả
                                </span>
                            </Button>
                        </div>
                    </div>
                </MainCard>
            </div>
        </div>
    );
}

export default ProfileInformation;
