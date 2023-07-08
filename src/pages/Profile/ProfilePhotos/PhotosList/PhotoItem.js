import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
function PhotoItem({ data }) {
    const imgRef = useRef();
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        imgRef.current && setClientWidth(imgRef.current.clientWidth);
    }, [imgRef.current]);
    return (
        <div
            ref={imgRef}
            style={{ height: `${clientWidth}px` }}
            className="rounded-md overflow-hidden"
        >
            <Link to={"/profile/photos"}>
                <img
                    className={` h-full w-max hover:opacity-90`}
                    src={data.photo}
                    alt=""
                />
            </Link>
        </div>
    );
}

export default PhotoItem;
