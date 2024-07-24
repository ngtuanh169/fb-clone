import { useState, useEffect } from "react";
import userApi from "../../../api/userApi";
import Maincard from "../../../Components/MainCard";
import Button from "../../../Components/Button";
import LoadingCircleLine from "../../../Components/LoadingCircleLine";
import ProfileHeader from "../Component/ProfileHeader";
import VideosNav from "./VideosNav";
import VideosList from "./VideosList";
function ProfileVideos({ header = true }) {
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        type: "video",
    });
    const [videosList, setVideosList] = useState([]);
    const [totalPgaes, setTotalPgaes] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getVideosList = async () => {
            try {
                setLoading(true);
                const res = await userApi.getFiles(payload);
                if (res.success && res.count) {
                    setTotalPgaes(Math.ceil(res.count / payload.limit));
                    setVideosList([...videosList, ...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && payload.page <= totalPgaes && getVideosList();
    }, [payload]);
    return (
        <div className="">
            {header && <ProfileHeader />}
            <div className="w-full lg:w-[1000px] mx-auto">
                <Maincard>
                    <div className="flex flex-col gap-2 w-full p-2">
                        <VideosNav />
                        <div className="p-2">
                            <VideosList data={videosList} />
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
                </Maincard>
            </div>
        </div>
    );
}

export default ProfileVideos;
