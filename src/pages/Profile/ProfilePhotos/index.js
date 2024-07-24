import { useState, useEffect } from "react";
import userApi from "../../../api/userApi";
import ProdileHeader from "../Component/ProfileHeader";
import MainCard from "../../../Components/MainCard";
import PhotosNav from "./PhotosNav";
import PhotosList from "./PhotosList";
import avt from "../../../assets/images/banner/user_bn.png";
import Button from "../../../Components/Button";
import LoadingCircleLine from "../../../Components/LoadingCircleLine";
function ProfilePhotos({ header = true }) {
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        type: "image",
    });
    const [photoList, setPhotoList] = useState([]);
    const [totalPgaes, setTotalPgaes] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPhotoList = async () => {
            try {
                setLoading(true);
                const res = await userApi.getFiles(payload);
                if (res.success && res.count) {
                    setTotalPgaes(Math.ceil(res.count / payload.limit));
                    setPhotoList([...photoList, ...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && payload.page <= totalPgaes && getPhotoList();
    }, [payload]);

    return (
        <div className="">
            {header && <ProdileHeader />}
            <div className="w-full lg:w-[1000px] mx-auto">
                <MainCard>
                    <div className="flex flex-col w-full gap-2 p-2">
                        <PhotosNav />
                        <div className="w-full">
                            <PhotosList data={photoList} />
                        </div>
                        {loading && (
                            <div className="flex justify-center w-full">
                                <div className="w-5 h-5">
                                    <LoadingCircleLine />
                                </div>
                            </div>
                        )}
                        {payload.page < totalPgaes && (
                            <div className="w-full">
                                <Button
                                    _className={`w-full p-2 text-center rounded-md bg-gray-200 hover:bg-gray-300`}
                                    cursorDefault={loading}
                                    onClick={() =>
                                        !loading &&
                                        setPayload({
                                            ...payload,
                                            page: payload.page + 1,
                                        })
                                    }
                                >
                                    <span className=" font-medium">
                                        Xem thêm
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                </MainCard>
            </div>
        </div>
    );
}

export default ProfilePhotos;
