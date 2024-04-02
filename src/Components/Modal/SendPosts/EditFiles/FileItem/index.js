import { useContext } from "react";
import { ScreenSize } from "../../../../../App";
import Video from "../../../../Video";
import Button from "../../../../Button";
import { PostsContext } from "../../PostsProvider";
import { HiPencil } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
function FileItem({ fileId, fileUrl, fileType }) {
    const context = useContext(PostsContext);
    const contextSize = useContext(ScreenSize);
    const type = fileType.split("/")[0];
    return (
        <div
            style={{
                width:
                    context.fileList.length < 3 && contextSize.width >= 640
                        ? "480px"
                        : "",
                height: context.fileList.length < 3 ? "205px" : "",
            }}
            className=" relative group w-[350px] lg:w-[400px] h-[200px] bg-black rounded-lg overflow-hidden"
        >
            <div className=" absolute top-0 left-0 flex justify-between w-full p-2 invisible group-hover:visible ">
                <div className="flex">
                    <label
                        htmlFor={fileId}
                        className="flex items-center p-2 font-semibold bg-white rounded-md cursor-pointer shadow-md z-10"
                    >
                        <HiPencil />
                        <span className="ml-2">Thay đổi</span>
                    </label>
                    <input
                        className="h-0 w-0 outline-none"
                        type="file"
                        id={fileId}
                        onChange={(e) =>
                            context.changeFile(fileId, e.target.files[0])
                        }
                    />
                </div>
                <Button
                    _className={
                        "flex items-center justify-center w-[27px] h-[27px] bg-white rounded-full shadow-md z-10"
                    }
                    onClick={() => context.deleteFile(fileId)}
                >
                    <IoMdClose />
                </Button>
            </div>
            {type === "image" && (
                <img
                    className="w-full h-full object-contain"
                    src={fileUrl}
                    alt=""
                />
            )}
            {type === "video" && <Video videoUrl={fileUrl} type={fileType} />}
        </div>
    );
}

export default FileItem;
