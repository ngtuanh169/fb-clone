import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
function VideoItem({ data = {} }) {
    const imgRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        imgRef.current && setClientWidth(imgRef.current.clientWidth);
    }, [imgRef.current]);
    return (
        <div
            ref={imgRef}
            style={{ height: `${clientWidth}px` }}
            className=" relative rounded-md overflow-hidden"
        >
            <Link to={"/profile/videos"}>
                <img
                    className={` h-full w-max hover:opacity-90`}
                    src={data.img}
                    alt=""
                />
            </Link>
            <span className=" absolute right-2 bottom-2 text-[13px] text-white ">
                {data.time}
            </span>
        </div>
    );
}

export default VideoItem;
