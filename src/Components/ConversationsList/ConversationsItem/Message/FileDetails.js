import { useEffect, useState } from "react";
import Button from "../../../Button";
import Video from "../../../Video";

import { AiOutlineClose } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoPlayCircleOutline } from "react-icons/io5";
function FileDetails({ filesList = [], close = () => {} }) {
    const [indexSl, setIndexSl] = useState(0);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "visible");
    }, []);

    const prevIndex = (indexSl) => {
        if (indexSl > 0) {
            return setIndexSl(indexSl - 1);
        }
        setIndexSl(filesList.length - 1);
    };

    const nextIndex = (indexSl) => {
        if (indexSl < filesList.length - 1) {
            return setIndexSl(indexSl + 1);
        }
        setIndexSl(0);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${filesList[indexSl].url})`,
            }}
            className="fixed top-0 left-0 w-screen h-screen bg-black bg-no-repeat bg-cover z-[98]"
        >
            <div className=" relative flex flex-col w-full h-full bg-matteBlack3">
                <div className=" absolute top-0 left-0 flex justify-end w-full px-6 py-4">
                    <Button
                        _className={
                            "flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300"
                        }
                        onClick={close}
                    >
                        <AiOutlineClose className=" text-[16px]" />
                    </Button>
                </div>
                <div
                    style={{ height: "calc(100% - 58px" }}
                    className=" flex justify-between items-center w-full"
                >
                    <div className="hidden sm:block px-3">
                        <Button
                            _className={
                                "flex items-center justify-center w-12 h-12 rounded-full bg-white opacity-70 transition-all hover:opacity-100 "
                            }
                            onClick={() => prevIndex(indexSl)}
                        >
                            <FaChevronLeft className="text-[24px]" />
                        </Button>
                    </div>

                    <div className="grow flex justify-center items-center w-max h-full mx-auto ">
                        {filesList[indexSl].type === "image" && (
                            <img
                                className="w-[370px] h-full object-contain object-center"
                                src={filesList[indexSl].url}
                                alt=""
                            />
                        )}
                        {filesList[indexSl].type === "video" && (
                            <div className="w-full h-full ">
                                <Video
                                    videoUrl={filesList[indexSl].url}
                                    showControls={false}
                                ></Video>
                            </div>
                        )}
                    </div>
                    <div className="hidden sm:block px-3 ">
                        <Button
                            _className={
                                "flex items-center justify-center w-12 h-12 rounded-full bg-white opacity-70 transition-all hover:opacity-100 "
                            }
                            onClick={() => nextIndex(indexSl)}
                        >
                            <FaChevronRight className="text-[24px]" />
                        </Button>
                    </div>
                </div>
                <div className="flex gap-3 justify-center w-full bg-transparent mt-2">
                    {filesList.length > 0 &&
                        filesList.map((item, index) => (
                            <div
                                style={{
                                    opacity: `${
                                        indexSl === index ? "1" : "0.5"
                                    }`,
                                }}
                                className="w-[50px] h-[50px] rounded-md opacity-60 cursor-pointer overflow-hidden hover:opacity-100"
                                key={item.id}
                                onClick={() => setIndexSl(index)}
                            >
                                {item.type === "image" && (
                                    <img
                                        className="w-full h-full object-cover object-center"
                                        src={item.url}
                                        alt=""
                                    />
                                )}
                                {item.type === "video" && (
                                    <div className=" relative w-full h-full">
                                        <video
                                            controls={false}
                                            className="w-full  h-[80px] object-cover object-center "
                                            src={item.url}
                                        ></video>
                                        <div
                                            className=" absolute top-0 left-0 flex items-center justify-center h-full w-full
                                                         bg-matteGray"
                                        >
                                            <IoPlayCircleOutline className="text-[50px] text-gray-600" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default FileDetails;
