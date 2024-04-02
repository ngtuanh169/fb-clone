import { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import MainCard from "../../../../Components/MainCard";
import img from "../../../../assets/images/avatar/avatar.jpg";
function Photo() {
    const { userId } = useParams();
    const imgRef = useRef();
    const [widthDiv, setWidthDiv] = useState(0);
    useEffect(() => {
        setWidthDiv(imgRef.current.clientWidth);
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
                <div className=" grid grid-cols-3 gap-1 mt-4 rounded-lg overflow-hidden">
                    {Array(9)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={index}
                                ref={imgRef}
                                style={{ height: `${widthDiv}px` }}
                                className=" overflow-hidden"
                            >
                                <img
                                    className=" w-full h-full cursor-pointer hover:opacity-90"
                                    src={img}
                                    alt=""
                                />
                            </div>
                        ))}
                </div>
            </div>
        </MainCard>
    );
}

export default Photo;
