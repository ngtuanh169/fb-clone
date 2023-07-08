import ProdileHeader from "../Component/ProfileHeader";
import MainCard from "../../../Components/MainCard";
import PhotosNav from "./PhotosNav";
import PhotosList from "./PhotosList";
import avt from "../../../assets/images/banner/user_bn.png";
function ProfilePhotos() {
    const photoList = [
        { id: 1, photo: avt },
        { id: 2, photo: avt },
        { id: 3, photo: avt },
        { id: 4, photo: avt },
        { id: 5, photo: avt },
        { id: 6, photo: avt },
        { id: 7, photo: avt },
    ];
    return (
        <div className="">
            <ProdileHeader />
            <div className="w-full lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col w-full p-2">
                        <PhotosNav />
                        <div className="w-full mt-2">
                            <PhotosList data={photoList} />
                        </div>
                    </div>
                </MainCard>
            </div>
        </div>
    );
}

export default ProfilePhotos;
