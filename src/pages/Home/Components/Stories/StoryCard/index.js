import Video from "../../../../../Components/Video";
import { BsFillPlusCircleFill } from "react-icons/bs";
import avt from "../../../../../assets/images/avatar/avatar.jpg";
function StoryCard({ avatar, name, video, width, addStory = false }) {
    return (
        <div
            className={`group h-full py-3 pl-3`}
            style={{ width: `${width}px` }}
        >
            <div
                style={{ boxShadow: "0 0 2px 2px #ccc" }}
                className="flex flex-col h-full w-full bg-gray-200 rounded-lg overflow-hidden cursor-pointer relative"
            >
                <div className="flex-1 w-full">
                    {!addStory ? (
                        <>
                            <img
                                className=" absolute h-[40px] w-[40px] rounded-full top-2 left-2 p-1 z-30 bg-white "
                                src={avatar}
                                alt=""
                            />
                            <video
                                className={`h-full w-full object-cover object-center z-20 transition-transform duration-150 ease-linear ${
                                    addStory
                                        ? ""
                                        : "group-hover:scale-105 group-hover:opacity-90"
                                }`}
                                src={video}
                            />
                        </>
                    ) : (
                        <img
                            className={`h-full w-full object-cover object-center z-20 transition-transform duration-150 ease-linear ${
                                addStory
                                    ? ""
                                    : "group-hover:scale-105 group-hover:opacity-90"
                            }`}
                            src={avt}
                            alt=""
                        />
                    )}

                    {!addStory && (
                        <p className=" absolute left-0 bottom-2 w-full text-white text-center text-[13px] font-semibold ">
                            {name}
                        </p>
                    )}
                </div>
                {addStory && (
                    <div className="flex flex-col w-full ">
                        <div className=" relative w-full h-[20px]">
                            <div className=" absolute bottom-0 left-0 flex justify-center w-full">
                                <span className="flex justify-center items-center h-8 w-8 rounded-full bg-gray-200">
                                    <BsFillPlusCircleFill className="text-[25px] text-blue-600" />
                                </span>
                            </div>
                        </div>
                        <div className="w-full py-2 text-center">
                            <span className=" text-[13px] font-semibold">
                                Tạo tin
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StoryCard;
