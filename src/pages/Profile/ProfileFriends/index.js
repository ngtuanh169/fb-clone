import MainCard from "../../../Components/MainCard";
import ProfileHeader from "../Component/ProfileHeader";
import FriendsListTool from "./FriendsListTool";
import FriendsList from "./FriendsList";
import FriendsListNav from "./FriendsListNav";
import avt from "../../../assets/images/avatar/avatar.jpg";
function ProfileFriends() {
    const data = [
        { id: 1, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 2, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 3, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 4, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
        { id: 5, avt, name: "Nguyen Tu Anh", des: "Ha Noi" },
    ];
    return (
        <div className="">
            <ProfileHeader />
            <div className="w-full lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col p-2">
                        <FriendsListTool />
                        <FriendsListNav />
                        <FriendsList data={data} />
                    </div>
                </MainCard>
            </div>
        </div>
    );
}

export default ProfileFriends;
