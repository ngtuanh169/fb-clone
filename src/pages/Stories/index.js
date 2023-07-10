import { useState, useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatTime } from "../../Hooks/useFormat";
import { ScreenSize } from "../../App";
import Button from "../../Components/Button";
import Video from "../../Components/Video";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import ChangeProfilePicture from "../../Components/Modal/ChangeProfilePicture";
import { BiPlus } from "react-icons/bi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Stories() {
    const { id } = useParams();
    const list = useSelector((state) => state.stories);
    const context = useContext(ScreenSize);
    const [showModal, setShowModal] = useState(false);
    const [story, setStory] = useState({});
    const [stories, setStories] = useState(list);
    const [storyIndex, setStoryIndex] = useState(0);
    useEffect(() => {
        const data = list.filter((item) => item.storyId === +id);
        const index = list.findIndex((item) => item.storyId === +id);
        if (data.length > 0) {
            setStory(...data);
        }
        if (index >= 0) {
            setStoryIndex(index);
        }
    }, [id]);
    return (
        <div className="flex h-full">
            {showModal && (
                <ChangeProfilePicture
                    title="Tạo tin"
                    video={true}
                    closeModal={() => setShowModal(false)}
                />
            )}
            <div className="flex flex-col lg:flex-row w-full">
                {context.width >= 1024 && (
                    <div className="">
                        <SubLayoutLeft name={"Tin"}>
                            <div className="w-full py-4 px-3">
                                <span className=" text-[17px] font-semibold">
                                    Tin của bạn
                                </span>
                            </div>
                            <div className="w-full px-3">
                                <Button
                                    _className={"flex items-center w-full "}
                                    onClick={() => setShowModal(true)}
                                >
                                    <span className="flex justify-center items-center w-[60px] h-[60px] bg-gray-200 rounded-full">
                                        <BiPlus className="text-blue-500 text-[24px]" />
                                    </span>
                                    <span className="flex-1 flex flex-col ml-3 text-left">
                                        <span className="text-[15px] font-semibold">
                                            Tạo tin
                                        </span>
                                        <span className=" text-[13px] font-normal text-gray-500 line-clamp-1">
                                            Bạn có thể chia sẻ ảnh đó hoặc viết
                                            gì đó
                                        </span>
                                    </span>
                                </Button>
                            </div>
                            <div className="w-full py-4 px-3">
                                <span className=" text-[17px] font-semibold">
                                    Tất cả tin
                                </span>
                            </div>
                            <div className="flex flex-col w-full px-1">
                                {stories.length > 0 &&
                                    stories.map((item, index) => (
                                        <div
                                            key={item.userStory}
                                            className="w-full"
                                        >
                                            <Button
                                                _className={`flex items-center w-full p-2 rounded-md ${
                                                    story.storyId ===
                                                    item.storyId
                                                        ? "bg-gray-200"
                                                        : ""
                                                } hover:bg-gray-200`}
                                                onClick={() => {
                                                    setStory(item);
                                                    setStoryIndex(index);
                                                }}
                                            >
                                                <span className="block w-[57px] h-[57px] rounded-full border-[3px] overflow-hidden border-gray-300">
                                                    <img
                                                        className="w-full h-full object-cover object-center border-[3px] border-white rounded-full"
                                                        src={item.avatar}
                                                        alt=""
                                                    />
                                                </span>
                                                <span className="flex-1 flex flex-col ml-2 text-left">
                                                    <span className=" text-[15px] font-semibold line-clamp-1">
                                                        {item.name}
                                                    </span>
                                                    <span className=" text-[15px] font-normal line-clamp-1">
                                                        {formatTime(+item.time)}
                                                    </span>
                                                </span>
                                            </Button>
                                        </div>
                                    ))}
                            </div>
                        </SubLayoutLeft>
                    </div>
                )}
                <div className="flex-1 flex justify-center h-full bg-black">
                    {story.file && (
                        <div className=" relative w-[375px] h-full ">
                            <div className=" absolute top-4 left-0 flex w-full px-2 z-20">
                                <div className="w-max">
                                    <Link
                                        to={`/profile/${story.userId}`}
                                        className="w-max h-max"
                                    >
                                        <img
                                            className="h-11 w-11 rounded-full border-2 border-gray-200"
                                            src={story.avatar}
                                            alt=""
                                        />
                                    </Link>
                                </div>
                                <div className="flex-1 flex items-center pl-3">
                                    <Link
                                        to={`/profile/${story.userId}`}
                                        className="w-max h-max"
                                    >
                                        <span className="text-white font-semibold text-[15px] hover:underline">
                                            {story.name}
                                        </span>
                                    </Link>
                                    <span className="ml-2 text-white text-[13px] font-normal">
                                        {formatTime(+story.time)}
                                    </span>
                                </div>
                            </div>
                            {storyIndex > 0 && (
                                <div className=" absolute top-0 left-0 sm:left-[-80px] flex items-center h-full w-[1px] z-20">
                                    <div className="w-max">
                                        <Button
                                            _className={
                                                "flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full opacity-50 hover:bg-white hover:opacity-100"
                                            }
                                            onClick={() => {
                                                setStory(
                                                    stories[storyIndex - 1]
                                                );
                                                setStoryIndex(storyIndex - 1);
                                            }}
                                        >
                                            <AiOutlineLeft className="text-[24px]" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                            {storyIndex < stories.length - 1 && (
                                <div className=" absolute top-0 right-0 sm:right-[-80px] flex items-center h-full z-20">
                                    <div className="w-max">
                                        <Button
                                            _className={
                                                "flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full opacity-50 hover:bg-white hover:opacity-100"
                                            }
                                            onClick={() => {
                                                setStory(
                                                    stories[storyIndex + 1]
                                                );
                                                setStoryIndex(storyIndex + 1);
                                            }}
                                        >
                                            <AiOutlineRight className="text-[24px]" />
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="w-full h-full">
                                <Video videoUrl={story.file} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Stories;
