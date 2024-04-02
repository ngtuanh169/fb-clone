import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainCard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import ProfileHeader from "../Component/ProfileHeader";
import FriendsListTool from "./FriendsListTool";
import FriendsListNav from "./FriendsListNav";
import FriendsAll from "./FriendsAll";
import FriendsRecent from "./FriendsRecent";
import FriendsCurrentCity from "./FriendsCurrentCity";
import Followers from "./Followers";
function ProfileFriends({ pageInfo = false }) {
    const navList = [
        { id: 1, name: "Tất cả bạn bè", Comp: FriendsAll },
        { id: 2, name: "Đã thêm gần đây", Comp: FriendsRecent },
        { id: 3, name: "Tỉnh/Thành phố hiện tại", Comp: FriendsCurrentCity },
        { id: 4, name: "Người theo dõi", Comp: Followers },
    ];
    const { userId } = useParams();
    const [currentNav, setCurrentNav] = useState(navList[0]);

    const [loading, setLoading] = useState(false);
    const [callApi, setCallApi] = useState(true);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading && setCallApi(true);
            } else {
                !loading && setCallApi(false);
            }
        };
        !pageInfo &&
            !loading &&
            window.addEventListener("scroll", handleScroll);
        return () =>
            !pageInfo &&
            !loading &&
            window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    return (
        <div className="">
            {!pageInfo && <ProfileHeader />}
            <div className="w-full lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col p-2">
                        <FriendsListTool
                            userName={userName}
                            setUserName={setUserName}
                        />
                        <FriendsListNav
                            navList={navList}
                            currentNav={currentNav}
                            setCurrentNav={setCurrentNav}
                            setCallApi={setCallApi}
                        />

                        <currentNav.Comp
                            callApi={callApi}
                            setCallApi={setCallApi}
                            loading={loading}
                            setLoading={setLoading}
                            userName={userName}
                        />
                    </div>
                    {pageInfo && (
                        <div className="w-full h-10 px-2 mb-2">
                            <Button
                                to={`/profile/${userId}/friends`}
                                _className={
                                    "w-full h-full flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                            >
                                <span className=" font-semibold">
                                    Xem tất cả
                                </span>
                            </Button>
                        </div>
                    )}
                </MainCard>
            </div>
        </div>
    );
}

export default ProfileFriends;
