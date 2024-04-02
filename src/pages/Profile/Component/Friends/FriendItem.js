import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ScreenSize } from "../../../../App";
import { formatAvatar } from "../../../../Hooks/useFormat";
function FriendItem({ data }) {
    const context = useContext(ScreenSize);
    const imgRef = useRef();
    const [widthDiv, setWidthDiv] = useState(0);
    useEffect(() => {
        setWidthDiv(imgRef.current.clientWidth);
    }, []);
    return (
        <div className="group relative flex flex-col ">
            <div ref={imgRef} style={{ height: `${widthDiv}px` }} className=" ">
                <Link
                    to={`/profile/${data.id}`}
                    className="block w-full h-full rounded-lg border overflow-hidden hover:opacity-90"
                >
                    <img
                        className="w-full h-full object-cover object-center "
                        src={formatAvatar(data.userAvt, data.userSx)}
                        alt=""
                    />
                </Link>
            </div>
            <Link
                to={`/profile/${data.id}`}
                className="w-full text-[13px] line-clamp-1 font-semibold hover:underline"
            >
                {data.userName}
            </Link>
        </div>
    );
}

export default FriendItem;
