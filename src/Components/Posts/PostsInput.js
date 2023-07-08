import { useState, useEffect, useRef, useContext } from "react";
import { ValueContext } from "./index";
import Video from "../Video";
import Button from "../Button";
import { BsCamera, BsPlayCircle } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import { GrClose } from "react-icons/gr";
import { IoIosSend } from "react-icons/io";
function PostInput({ isFocus = false, setIsFocus = () => {} }) {
    const context = useContext(ValueContext);
    const inputRef = useRef();
    const [file, setFile] = useState({});
    const handleAddFile = (file) => {
        const fileUrl = URL.createObjectURL(file);
        const type = file.type.split("/")[0];
        setFile({ fileUrl, file, type });
    };
    const deleteFile = () => {
        URL.revokeObjectURL(file.fileUrl);
        setFile({});
    };
    useEffect(() => {
        isFocus && inputRef.current && inputRef.current.focus();
    }, [isFocus]);
    return (
        <div className="w-full flex ">
            <div className="w-max">
                <img
                    style={{
                        width: context.pagePhoto ? "32px" : "40px",
                        height: context.pagePhoto ? "32px" : "40px",
                    }}
                    className="rounded-full mr-2 "
                    src={context.avatar}
                    alt=""
                />
            </div>
            <div className=" flex-1 flex flex-col">
                <div className="flex flex-col w-full rounded-xl py-2 px-4 bg-slate-100">
                    <div className="w-full">
                        <input
                            ref={inputRef}
                            className=" w-full bg-transparent outline-none"
                            type="text"
                            placeholder="Viết câu trả lời..."
                            onBlur={() => setIsFocus(false)}
                        />
                    </div>
                    <div className="flex justify-between w-full mt-2">
                        <div className="flex items-center">
                            <label
                                htmlFor="addFile"
                                className="flex justify-center items-center w-8 h-8 rounded-full cursor-pointer hover:bg-gray-200"
                            >
                                <BsCamera className="text-[20px] text-gray-500" />
                            </label>
                            <input
                                className="h-0 w-0 outline-none bg-transparent"
                                type="file"
                                id="addFile"
                                onChange={(e) =>
                                    handleAddFile(e.target.files[0])
                                }
                            />
                            <div className="flex items-center">
                                <Button
                                    _className={
                                        "flex justify-center items-center w-8 h-8 rounded-full cursor-not-allowed  "
                                    }
                                    // hoverText={"Chọn một biểu tượng cảm xúc"}
                                >
                                    <CiFaceSmile className="text-[20px] text-gray-500" />
                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Button
                                _className={
                                    "flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200"
                                }
                            >
                                <IoIosSend className=" rotate-45 text-[20px] text-blue-500" />
                            </Button>
                        </div>
                    </div>
                </div>
                {file.fileUrl && (
                    <div className="relative w-full my-2">
                        <Button
                            _className={
                                "absolute right-2 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300"
                            }
                            onClick={deleteFile}
                        >
                            <GrClose className="text-[12px]" />
                        </Button>
                        <div className=" relative w-[100px] h-[100px] rounded-xl overflow-hidden">
                            {file.type === "image" ? (
                                <img
                                    className="h-full w-full object-cover"
                                    src={file.fileUrl}
                                />
                            ) : (
                                <>
                                    <Video
                                        videoUrl={file.fileUrl}
                                        showControls={false}
                                    />
                                    <div
                                        className=" absolute top-0 left-0 flex items-center justify-center
                                                 w-full h-full bg-matteBlack2 z-10 "
                                    >
                                        <BsPlayCircle className=" text-[50px] text-white z-30" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostInput;
