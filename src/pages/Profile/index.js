import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ScreenSize } from "../../App";
import Posts from "../../Components/Posts";
import ProdileHeader from "./Component/ProfileHeader";
import PersonalInfomation from "./Component/PersonalInfomation";
import Photo from "./Component/Photo";
import Friends from "./Component/Friends";
import InputBox from "../../Components/InputBox";
import Filter from "./Component/Filter";
import avatar from "../../assets/images/avatar/avatar.jpg";
function Profile() {
    const { postsId } = useParams();
    const context = useContext(ScreenSize);
    return (
        <div className="">
            {postsId ? (
                <div className="w-full max-w-[500px] sm:max-w-none sm:w-[500px] md:w-[600px] mt-4 mx-auto">
                    <Posts
                        userId={1}
                        avatar={avatar}
                        name={"Nguyễn Tú Anh"}
                        time={1671894600425}
                        pageProfile={true}
                    />
                </div>
            ) : (
                <>
                    <ProdileHeader />
                    <div className=" flex flex-col lg:flex-row w-full max-w-[500px] lg:w-[1000px] lg:max-w-none lg:px-0 mx-auto">
                        <div className="w-full lg:w-2/5">
                            <PersonalInfomation />
                            <Photo />
                            <Friends />
                            <div className=""></div>
                            <div className="mb-4 lg:mb-0">
                                <span className="block text-[13px] text-gray-500 leading-[15px]">
                                    Quyền riêng tư · Điều khoản · Quảng cáo ·
                                    Lựa chọn quảng cáo · Cookie · Xem thêm ·
                                    Meta © 2023
                                </span>
                            </div>
                        </div>
                        <div className=" w-full  lg:flex-1 lg:ml-4 ">
                            <InputBox />
                            <Filter />
                            <Posts
                                userId={1}
                                avatar={avatar}
                                name={"Nguyễn Tú Anh"}
                                time={1671894600425}
                            />
                            <Posts
                                userId={2}
                                avatar={avatar}
                                name={"Nguyễn Tú Anh"}
                                time={1671894600425}
                            />
                            <Posts
                                userId={2}
                                avatar={avatar}
                                name={"Nguyễn Văn Tùng"}
                                time={1671894600425}
                            />
                            <Posts
                                userId={2}
                                avatar={avatar}
                                name={"Nguyễn Thị Hoan"}
                                time={1671894600425}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Profile;
