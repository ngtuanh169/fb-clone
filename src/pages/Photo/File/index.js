import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../Components/Button";
import Video from "../../../Components/Video";
import Tools from "./Tools";
import { CgClose } from "react-icons/cg";
import { BsFacebook } from "react-icons/bs";

import img from "../../../assets/images/avatar/avatar.jpg";
function File() {
    const navigate = useNavigate();
    const [fullscreen, setFullscreen] = useState(false);
    const [zoomed, setZoomed] = useState(1);
    const handleClickZoomIn = () => {
        if (zoomed >= 1 && zoomed < 2) {
            setZoomed(zoomed + 0.25);
        }
    };
    const handleClickZoomOut = () => {
        if (zoomed > 1) {
            setZoomed(zoomed - 0.25);
        }
    };
    return (
        <div
            className={` w-full h-full bg-black z-20 ${
                fullscreen ? "fixed top-0 left-0 w-screen h-screen" : "relative"
            } transition-all  `}
        >
            <div className=" absolute top-0 left-0 flex justify-between w-full py-2 pl-6 pr-4 z-30">
                <div className="flex items-center">
                    <Button
                        _className={
                            "flex justify-center items-center h-[40px] w-[40px] mr-2 text-white bg-black rounded-full "
                        }
                        hoverText={"Đóng"}
                        hoverBottom
                        onClick={() => navigate(-1)}
                    >
                        <CgClose className=" text-[25px]  " />
                    </Button>
                    <Button _className={"bg-white rounded-full"}>
                        <BsFacebook className=" text-[45px] text-blue-600 hover:text-blue-700" />
                    </Button>
                </div>
                <Tools
                    zoomed={zoomed}
                    handleClickZoomIn={handleClickZoomIn}
                    handleClickZoomOut={handleClickZoomOut}
                    fullscreen={fullscreen}
                    setFullscreen={setFullscreen}
                />
            </div>
            <div className="w-full h-full overflow-hidden">
                <img
                    style={{ transform: `scale(${zoomed})` }}
                    className="w-full h-full object-contain object-center transition-transform z-20"
                    src={img}
                    alt=""
                />
                {/* <Video /> */}
            </div>
        </div>
    );
}

export default File;
