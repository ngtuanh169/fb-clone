import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ScreenSize } from "../../../../App";
import img from "../../../../assets/images/avatar/avatar.jpg";
import HoverInfoUser from "../../../../Components/Modal/HoverInfoUser";
function FriendItem({}) {
    const context = useContext(ScreenSize);
    const imgRef = useRef();
    const [widthDiv, setWidthDiv] = useState(0);
    useEffect(() => {
        setWidthDiv(imgRef.current.clientWidth);
    }, []);
    return (
        <div className="group relative flex flex-col ">
            <div ref={imgRef} style={{ height: `${widthDiv}px` }} className=" ">
                <img
                    className=" w-full h-full rounded-lg cursor-pointer hover:opacity-90"
                    src={img}
                    alt=""
                />
            </div>
            <Link
                to={"/"}
                className="w-full text-[13px] line-clamp-1 font-semibold hover:underline"
            >
                Nguyen Tu Anh
            </Link>
            {context.width >= 1024 && (
                <div
                    className="absolute bottom-[100%] right-[-150px] invisible z-[99] opacity-0 transition-all ease-linear 
                group-hover:visible group-hover:opacity-100"
                >
                    <HoverInfoUser
                        avt={img}
                        name={"Nguyen Tu Anh"}
                        numberFriends={1231}
                        address={"Hà Nội"}
                        followers={1232}
                    />
                </div>
            )}
        </div>
    );
}

export default FriendItem;
