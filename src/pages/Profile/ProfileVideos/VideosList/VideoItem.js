import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatTimeVideo } from "../../../../Hooks/useFormat";
function VideoItem({ data = {} }) {
    const imgRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        imgRef.current && setClientWidth(imgRef.current.clientWidth);
    }, [imgRef.current]);
    return (
        <div
            ref={imgRef}
            style={{
                height: `${clientWidth}px`,
                boxShadow: "0px 0px 5px 1px #ccc",
            }}
            className=" relative rounded-md overflow-hidden"
        >
            <Link to={`/photo/${data.postsId}/${data.id}`} className="z-10">
                <img
                    className={` h-full w-full object-contain object-center bg-black hover:opacity-90`}
                    src={data.url2}
                    alt=""
                />
            </Link>
            <span className=" absolute right-2 bottom-2 text-white text-[13px] z-20">
                {formatTimeVideo(+data.duration)}
            </span>
        </div>
    );
}

export default VideoItem;
