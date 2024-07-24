import { useState } from "react";
import { useSelector } from "react-redux";
import { formatTimeMess, formatAvatar } from "../../../../Hooks/useFormat";
import FileDetails from "./FileDetails";
import { IoPlayCircleOutline } from "react-icons/io5";
function MessageItem({ data = {}, item = {}, index }) {
    const user = useSelector((state) => state.user);
    const [showFile, setShowFile] = useState(false);
    return (
        <div
            style={{
                justifyContent: item.senderId !== user.userId ? "" : "end",
            }}
            className="flex w-full mt-2"
        >
            {showFile && (
                <FileDetails
                    filesList={item.message.files}
                    close={() => setShowFile(false)}
                />
            )}
            <div className="flex flex-col w-full">
                <div
                    style={{
                        justifyContent:
                            item.senderId !== user.userId ? "" : "end",
                    }}
                    className="flex w-full"
                >
                    <div className="flex items-end">
                        {item.senderId !== user.userId && (
                            <div className="h-7 w-7 mr-2 z-20">
                                <img
                                    className="h-full w-full object-cover rounded-full"
                                    src={formatAvatar(
                                        data.othersAvt,
                                        data.othersSx
                                    )}
                                    alt=""
                                />
                            </div>
                        )}
                        <div className=" relative group flex flex-col group hover:z-30">
                            <div
                                style={{
                                    alignItems:
                                        item.senderId !== user.userId
                                            ? ""
                                            : "end",
                                }}
                                className="flex flex-col gap-2 w-max"
                            >
                                {item.message?.text && (
                                    <div
                                        style={{
                                            opacity: item?.sending ? ".3" : "1",
                                        }}
                                        className={`flex items-center justify-center w-max min-w-[38px] p-2 rounded-2xl  ${
                                            item?.senderId !== user.userId
                                                ? "bg-gray-200"
                                                : " bg-blue-500 text-white"
                                        }`}
                                    >
                                        <span className="block max-w-[190px] text-[15px] break-words">
                                            {item.message.text}
                                        </span>
                                    </div>
                                )}

                                {item.message.files?.length > 0 && (
                                    <div className="flex flex-wrap gap-1 max-w-[190px]">
                                        {item.message.files.map(
                                            (item, index) => (
                                                <div
                                                    className=" cursor-pointer"
                                                    onClick={() =>
                                                        !item.sending &&
                                                        setShowFile(true)
                                                    }
                                                >
                                                    {item.type === "image" && (
                                                        <img
                                                            key={index}
                                                            className="w-full h-[80px] object-cover object-center rounded-md"
                                                            src={item.url}
                                                            alt=""
                                                        />
                                                    )}
                                                    {item.type === "video" && (
                                                        <div className=" relative rounded-md overflow-hidden">
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
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                            <div
                                className="w-full text-center truncate invisible opacity-0 transition-all 
                                group-hover:visible group-hover:opacity-100"
                            >
                                <span className=" text-[13px] text-gray-500">
                                    {formatTimeMess(item.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {item?.sending && (
                    <div className=" flex justify-end">
                        <span className="text-[12px] text-gray-500 font-normal">
                            Đang gửi
                        </span>
                    </div>
                )}
                {item?.id && item?.timeId && index === 0 && (
                    <div className=" flex justify-end">
                        <span className="text-[12px] text-gray-500 font-normal">
                            Đã gửi
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessageItem;
