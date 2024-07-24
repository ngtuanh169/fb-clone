import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import userApi from "../../../../api/userApi";
import MainCard from "../../../../Components/MainCard";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
function Photo() {
    const { userId } = useParams();
    const imgRef = useRef();
    const [widthDiv, setWidthDiv] = useState(0);
    const [payload, setPayload] = useState({
        limit: 9,
        page: 1,
        type: "image",
    });
    const [photoList, setPhotoList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPhotoList = async () => {
            try {
                setLoading(true);
                const res = await userApi.getFiles(payload);
                if (res.success && res?.data) {
                    setPhotoList([...photoList, ...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        getPhotoList();
    }, []);
    useEffect(() => {
        imgRef.current && setWidthDiv(imgRef.current.clientWidth);
    });

    return (
        <MainCard>
            <div className="p-3">
                <div className="flex justify-between">
                    <h2 className="text-[20px] font-bold">Ảnh</h2>
                    <Link
                        to={`/profile/${userId}/photos`}
                        className={
                            "py-1 px-2 text-blue-700 rounded-md hover:bg-hover"
                        }
                    >
                        <span>Xem tất cả ảnh</span>
                    </Link>
                </div>
                <div className=" grid grid-cols-3 gap-2 mt-4 rounded-xl overflow-hidden ">
                    {photoList.length > 0 &&
                        photoList.map((item) => (
                            <div
                                key={item.id}
                                ref={imgRef}
                                style={{
                                    height: `${widthDiv}px`,
                                }}
                                className="w-full h-full "
                            >
                                <Link to={`/photo/${item.postsId}/${item.id}`}>
                                    <img
                                        className=" w-full h-full object-cover object-center cursor-pointer hover:opacity-90"
                                        src={item.url}
                                        alt=""
                                    />
                                </Link>
                            </div>
                        ))}
                </div>
                {loading && (
                    <div className="flex justify-center w-full p-2">
                        <div className="w-5 h-5">
                            <LoadingCircleLine />
                        </div>
                    </div>
                )}
            </div>
        </MainCard>
    );
}

export default Photo;
