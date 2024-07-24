import { useContext, useEffect, useRef } from "react";
import Button from "../../../Button";
import { PostsContext } from "../PostsProvider";
import { HiArrowSmLeft } from "react-icons/hi";
import { BsImages } from "react-icons/bs";
import FileItem from "./FileItem";
function EditFiles({ setCurrentComp = () => {}, setClientWidth = () => {} }) {
    let gridColums = "";
    const divRef = useRef();
    const { fileList } = useContext(PostsContext);
    if (fileList.length > 2 && fileList.length < 5) {
        gridColums = "md:grid-cols-2";
    }
    if (fileList.length > 4) {
        gridColums = "md:grid-cols-3";
    }
    useEffect(() => {
        divRef.current && setClientWidth(divRef.current.clientWidth);
    }, [fileList]);
    return (
        <div ref={divRef} className="flex flex-col w-full sm:w-max">
            <div className=" relative flex items-center justify-center w-full h-[60px]">
                <div className=" absolute top-0 left-2 flex items-center h-full">
                    <Button
                        _className={
                            "flex items-center justify-center h-9 w-9 rounded-full bg-gray-200 hover:bg-gray-300"
                        }
                        onClick={() => setCurrentComp(undefined)}
                    >
                        <HiArrowSmLeft className="text-[20px] text-gray-500" />
                    </Button>
                </div>
                <span className=" text-[20px] font-bold">Ảnh/Video</span>
            </div>
            <div
                className={`a grid ${gridColums} grid-cols-1 gap-2 w-[370px] sm:w-max max-h-[450px] p-2 bg-slate-200 
                    scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full`}
            >
                {fileList.length > 0 ? (
                    fileList.map((item) => (
                        <FileItem
                            key={item.id}
                            fileId={item.id}
                            fileUrl={item.url}
                            fileType={item.type}
                        />
                    ))
                ) : (
                    <div className="w-[370px] sm:w-[500px] h-[200px] "></div>
                )}
            </div>
            <div className=" flex justify-end items-center w-full h-[60px] px-2">
                <div className="flex">
                    <label
                        htmlFor={fileList.length < 3 ? "addFile" : ""}
                        className={`flex items-center p-2 font-medium text-blue-500 rounded-md select-none ${
                            fileList.length < 3
                                ? "hover:bg-hover cursor-pointer"
                                : ""
                        } `}
                    >
                        <BsImages />
                        <span className="ml-2 ">Thêm ảnh/video</span>
                    </label>

                    <input
                        className="h-0 w-0 outline-none"
                        type="file"
                        name=""
                        id="addFile"
                    />
                </div>
                <div className="ml-2">
                    <Button
                        _className={
                            "flex items-center justify-center w-[116px] p-2 bg-blue-500 rounded-md hover:bg-blue-600"
                        }
                        onClick={() => setCurrentComp(undefined)}
                    >
                        <span className="ml-2 text-white font-medium">
                            Xong
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EditFiles;
