import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../Components/Button";
import Video from "../../../Components/Video";
import Tools from "./Tools";
import { CgClose } from "react-icons/cg";
import { BsFacebook } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function File({ files = [] }) {
    const navigate = useNavigate();
    const { fileId } = useParams();

    const [fileList, setFileList] = useState(files);
    const [indexSl, setIndexSl] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);
    const [zoomed, setZoomed] = useState(1);

    useEffect(() => {
        if (fileList.length > 0) {
            const index = fileList.findIndex((item) => fileId == item.id);
            index >= 0 && setIndexSl(index);
            console.log(index);
        }
    }, [fileId]);

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

    const prev = (index, length) => {
        if (index > 0) {
            return setIndexSl(index - 1);
        }
        setIndexSl(length - 1);
    };

    const next = (index, length) => {
        if (index < length - 1) {
            return setIndexSl(index + 1);
        }
        setIndexSl(0);
    };
    return (
        <div
            className={` w-full h-full bg-black z-50 ${
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
                    <Button _className={"bg-white rounded-full"} to={"/"}>
                        <BsFacebook className=" text-[45px] text-blue-600 hover:text-blue-700" />
                    </Button>
                </div>
                {fileList[indexSl].type === "image" && (
                    <Tools
                        zoomed={zoomed}
                        handleClickZoomIn={handleClickZoomIn}
                        handleClickZoomOut={handleClickZoomOut}
                        fullscreen={fullscreen}
                        setFullscreen={setFullscreen}
                    />
                )}
            </div>
            <div className="flex justify-between w-full h-full overflow-hidden ">
                {fileList.length > 0 && (
                    <div className="flex items-center w-max h-full px-2 z-10">
                        <Button
                            _className={`flex items-center justify-center w-10 h-10 bg-white rounded-full opacity-40 hover:opacity-100`}
                            onClick={() => prev(indexSl, fileList.length)}
                        >
                            <FaChevronLeft className="text-[20px]" />
                        </Button>
                    </div>
                )}
                <div className="grow h-full">
                    {fileList[indexSl].type === "image" && (
                        <img
                            style={{ transform: `scale(${zoomed})` }}
                            className="w-full h-full object-contain object-center transition-transform z-20"
                            src={fileList[indexSl].url}
                            alt=""
                            onClick={(e) => console.log([e.target])}
                        />
                    )}
                    {fileList[indexSl].type === "video" && (
                        <Video videoUrl={fileList[indexSl].url} />
                    )}
                </div>
                {fileList.length > 0 && (
                    <div className="flex items-center w-max h-full px-2">
                        <Button
                            _className={`flex items-center justify-center w-10 h-10 bg-white rounded-full opacity-40 hover:opacity-100`}
                            onClick={() => next(indexSl, fileList.length)}
                        >
                            <FaChevronRight className="text-[20px]" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default File;
