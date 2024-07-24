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
            style={{
                height: `${clientWidth}px`,
                boxShadow: "0px 0px 5px 1px #ccc",
            }}
            className="rounded-md overflow-hidden"
        >
            <Link to={`/photo/${data.postsId}/${data.id}`}>
                <img
                    className={`h-full w-full object-cover object-center hover:opacity-90`}
                    src={data.url}
                    alt=""
                />
            </Link>
        </div>
    );
}

export default PhotoItem;
