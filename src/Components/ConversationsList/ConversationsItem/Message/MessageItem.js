import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { formatTimeMess, formatAvatar } from "../../../../Hooks/useFormat";
import { ContextValue } from "./index";
import ElementFixed from "../../../ElementFixed";
import FileDetails from "./FileDetails";
import { IoPlayCircleOutline } from "react-icons/io5";
import img from "../../../../assets/images/avatar/avatar.jpg";
import video from "../../../../assets/videos/video3.mp4";
function MessageItem({ data = {}, item = {}, index }) {
    const data1 = [
        {
            id: 1,
            type: "image",
            url: "https://scontent.xx.fbcdn.net/v/t1.15752-9/418581627_1335855810445406_3366580831600809884_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=M6Wbd16gay8AX9GZBb2&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdQ5qzw2p5TRirCv56JyD8y10QlGusJwOQbrklTZOUM9bA&oe=65E0292F",
            file: img,
        },
        {
            id: 2,
            type: "image",
            url: "https://scontent.xx.fbcdn.net/v/t1.15752-9/354246188_185599550892945_2028180098094735799_n.jpg?stp=dst-jpg_s206x206&_nc_cat=105&ccb=1-7&_nc_sid=510075&_nc_ohc=XuKgko5r7y0AX_Y61Za&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdSpwDu6ba7nsYtT7MkoeE1Th51QKu7gHnBJjmLPk3tz7w&oe=65E00CD0",
            file: img,
        },
        {
            id: 3,
            type: "video",
            url: video,
            file: video,
        },
    ];
    const user = useSelector((state) => state.user);
    const context = useContext(ContextValue);
    const [showTime, setShowTime] = useState(false);
    const [showFile, setShowFile] = useState(false);

    return (
        <div
            style={{
                justifyContent: item.senderId !== user.userId ? "" : "end",
            }}
            className="flex w-full mt-4"
        >
            {showFile && (
                <FileDetails
                    filesList={data1}
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
                        <div
                            className=" relative flex group hover:z-30"
                            onMouseOver={() => setShowTime(true)}
                            onMouseOut={() => setShowTime(false)}
                        >
                            <div
                                style={{
                                    alignItems:
                                        item.senderId !== user.userId
                                            ? ""
                                            : "end",
                                }}
                                className="flex flex-col gap-2 w-max"
                            >
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
                                <div className="grid grid-cols-2 gap-1 w-[190px]">
                                    {data1.map((item, index) => (
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
                                    ))}
                                </div>
                            </div>

                            {showTime && (
                                <ElementFixed scrollValue={context}>
                                    <span
                                        style={{
                                            boxShadow: "0 3px 2px #5a5959",
                                        }}
                                        className="flex w-max px-2 py-1 text-[13px] text-white rounded-md bg-matteBlack 
                                        opacity-0 invisible transition-all delay-100 group-hover:visible group-hover:opacity-100 "
                                    >
                                        {formatTimeMess(item.createdAt)}
                                    </span>
                                </ElementFixed>
                            )}
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
