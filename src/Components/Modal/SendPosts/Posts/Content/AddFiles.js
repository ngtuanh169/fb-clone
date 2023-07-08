import { useContext } from "react";
import { ScreenSize } from "../../../../../App";
import Button from "../../../../Button";
import RenderGridLayout from "../../../../RenderGridLayout";
import EditFiles from "../../EditFiles";
import { PostsContext } from "../../PostsProvider";
import { GrClose } from "react-icons/gr";
import { AiOutlinePicture, AiOutlinePlusCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { MdClose } from "react-icons/md";
function AddFiles({ setShowAddImg = () => {}, setCurrentComp = () => {} }) {
    const context = useContext(PostsContext);
    const contextSize = useContext(ScreenSize);
    return (
        <div className=" relative w-full h-[250px] p-2 border rounded-md">
            {context.fileList.length > 0 ? (
                <div className=" relative flex flex-col w-full h-full">
                    <div className="absolute top-2 left-2 flex w-full z-30">
                        <div className=" mr-2 ">
                            <Button
                                _className="flex items-center w-max p-2 font-medium rounded-md bg-white cursor-pointer"
                                onClick={() =>
                                    setCurrentComp({ Comp: EditFiles })
                                }
                            >
                                <HiPencil />
                                <span className=" ml-1">
                                    {contextSize.width >= 640
                                        ? "Chỉnh sửa tất cả ảnh"
                                        : "Chỉnh sửa"}
                                </span>
                            </Button>
                        </div>
                        <div className=" mr-2 ">
                            <label
                                className="flex items-center w-max p-2 font-medium rounded-md bg-white cursor-pointer"
                                htmlFor="addFile"
                            >
                                <AiOutlinePlusCircle />
                                <span className=" ml-1">Thêm ảnh/video</span>
                            </label>
                            <input
                                className="w-0 h-0"
                                id="addFile"
                                type="file"
                                onChange={context.addFile}
                            />
                        </div>
                    </div>
                    <div className=" absolute right-2 top-2 z-30">
                        <Button
                            _className={
                                "flex items-center justify-center h-8 w-8 font-medium bg-white rounded-full"
                            }
                            onClick={() => context.setFileList([])}
                        >
                            <MdClose className=" text-gray-400 text-[22px]" />
                        </Button>
                    </div>
                    <RenderGridLayout fileList={context.fileList} />
                </div>
            ) : (
                <>
                    <label
                        htmlFor="file"
                        className="flex flex-col justify-center items-center 
                            w-full h-full bg-slate-100 cursor-pointer hover:bg-slate-200"
                    >
                        <span className="flex justify-center items-center w-[45px] h-[45px] bg-slate-300 text-[30px] rounded-full">
                            <AiOutlinePicture />
                        </span>
                        <span className=" font-bold">Thêm ảnh/video</span>
                        <span className=" text-xs">nhấp vào đây</span>
                    </label>
                    <input
                        className="h-[0] overflow-hidden"
                        type="file"
                        id="file"
                        onChange={context.addFile}
                    />
                    <span
                        className=" absolute top-3 right-3 flex items-center justify-center 
                            h-[30px] w-[30px] bg-white border rounded-full cursor-pointer hover:bg-slate-200"
                        onClick={() => setShowAddImg(false)}
                    >
                        <GrClose />
                    </span>
                </>
            )}
        </div>
    );
}

export default AddFiles;
