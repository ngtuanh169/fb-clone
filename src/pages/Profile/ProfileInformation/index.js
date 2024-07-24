import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProdileHeader from "../Component/ProfileHeader";
import MainCard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import ProfileFriends from "../ProfileFriends";
import VideosNav from "../ProfileVideos/VideosNav";
import VideosList from "../ProfileVideos/VideosList";
import ProfilePhotos from "../ProfilePhotos";
import ProfileVideos from "../ProfileVideos";
import Item from "./Item";
import profileIntroductionApi from "../../../api/profileIntroductionApi";
function ProfileInformation() {
    const { userId } = useParams();
    const [introductionList, setIntroductionList] = useState([]);
    const [currentNav, setCurrentNav] = useState(0);
    useEffect(() => {
        const getProfileIntroduction = async () => {
            try {
                const params = { userId };
                const res = await profileIntroductionApi.get(params);
                if (res?.length > 0) {
                    setIntroductionList(res);
                }
            } catch (error) {
                console.log(error);
            }
        };
        userId && getProfileIntroduction();
    }, [userId]);
    return (
        <div className="">
            <ProdileHeader />
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                {introductionList.length > 0 && (
                    <MainCard>
                        <div className="flex flex-col md:flex-row w-full p-2">
                            <div className="flex flex-col w-full md:w-[33%] px-1 border-b pb-4 md:pb-0 md:border-r md:border-b-0">
                                <div className="w-full">
                                    <span className="text-[20px] font-bold px-2">
                                        Giới thiệu
                                    </span>
                                </div>
                                <div className="w-full">
                                    <Button
                                        _className={`flex w-full text-left ${
                                            currentNav == 0
                                                ? "text-blue-700 bg-blue-100"
                                                : " text-gray-500 hover:bg-slate-200"
                                        } font-medium px-2 py-1 mt-2 rounded-md `}
                                        onClick={() => setCurrentNav(0)}
                                    >
                                        <span>Tổng quan</span>
                                    </Button>
                                </div>
                                {introductionList.length > 0 &&
                                    introductionList.map((item) => (
                                        <div key={item.id} className="w-full">
                                            <Button
                                                _className={`flex w-full text-left ${
                                                    currentNav == item.id
                                                        ? "text-blue-700 bg-blue-100"
                                                        : " text-gray-500 hover:bg-slate-200"
                                                } font-medium px-2 py-1 mt-2 rounded-md `}
                                                onClick={() =>
                                                    setCurrentNav(item.id)
                                                }
                                            >
                                                <span>{item.name}</span>
                                            </Button>
                                        </div>
                                    ))}
                            </div>
                            <div className="flex flex-col flex-1 px-2">
                                <Item
                                    data={introductionList}
                                    id={currentNav}
                                    setIntroductionList={setIntroductionList}
                                    introductionList={introductionList}
                                />
                            </div>
                        </div>
                    </MainCard>
                )}
            </div>
            <ProfileFriends pageInfo={true} />
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                <ProfilePhotos header={false} />
            </div>
            <div className="w-full px-2 lg:px-0 lg:w-[1000px] mx-auto">
                <ProfileVideos header={false} />
            </div>
        </div>
    );
}

export default ProfileInformation;
