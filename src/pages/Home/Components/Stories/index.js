import { useState, useRef, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { ScreenSize } from "../../../../App";
import MainCard from "../../../../Components/MainCard";
import ChangeProfilePicture from "../../../../Components/Modal/ChangeProfilePicture";
import TabItem from "./TabItem";
import StoryCard from "./StoryCard";
import { FaBookOpen } from "react-icons/fa";
import { RiVideoAddFill } from "react-icons/ri";
import { HiFilm } from "react-icons/hi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import story from "../../../../assets/images/avatar/story.jpg";
import { Link } from "react-router-dom";
function Stories() {
    const list = useSelector((state) => state.stories);
    const context = useContext(ScreenSize);
    const storiesRef = useRef();
    const [idTab, setIdTab] = useState(0);
    const [listStories, setListStories] = useState(list);
    const [indexSlider, setIndexSlider] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [number, setNumber] = useState(0);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setClientWidth(storiesRef.current.clientWidth / number);
    }, [number, context.width]);

    useEffect(() => {
        context.width < 640 ? setNumber(3) : setNumber(4);
    }, [context.width]);

    const handleClickNext = () => {
        if (indexSlider < listStories.length - 3)
            setIndexSlider(indexSlider + 1);
    };

    const handleClickPrev = () => {
        if (indexSlider > 0) setIndexSlider(indexSlider - 1);
    };
    return (
        <>
            {showModal && (
                <ChangeProfilePicture
                    title="Tạo tin"
                    closeModal={() => setShowModal(false)}
                    video={true}
                />
            )}
            <MainCard>
                <div className="flex justify-around w-full p-2 border-b border-gray-200">
                    <TabItem
                        id={0}
                        active={idTab}
                        text={"Tin"}
                        setId={setIdTab}
                    >
                        <FaBookOpen />
                    </TabItem>
                    <TabItem
                        id={1}
                        active={idTab}
                        text={"Reels"}
                        setId={setIdTab}
                    >
                        <HiFilm />
                    </TabItem>
                    {/* {context.width >= 640 && (
                        <TabItem
                            id={2}
                            active={idTab}
                            text={"Phòng họp mặt"}
                            setId={setIdTab}
                        >
                            <RiVideoAddFill />
                        </TabItem>
                    )} */}
                </div>
                <div
                    ref={storiesRef}
                    className="relative flex w-full h-[226px] pb-2 overflow-hidden "
                >
                    <div
                        className={`flex w-max transition-transform ease-linear duration-200`}
                        style={{
                            transform: `translateX(-${
                                indexSlider * clientWidth
                            }px) `,
                        }}
                    >
                        <div className="" onClick={() => setShowModal(true)}>
                            <StoryCard addStory={true} width={clientWidth} />
                        </div>
                        {listStories.length > 0 &&
                            listStories.map((item, index) => (
                                <div key={item.storyId}>
                                    <Link to={`/stories/${item.storyId}`}>
                                        <StoryCard
                                            avatar={item.avatar}
                                            video={item.file}
                                            name={item.name}
                                            width={clientWidth}
                                        />
                                    </Link>
                                </div>
                            ))}
                    </div>
                    {indexSlider > 0 && (
                        <button
                            className="h-11 w-11 rounded-full bg-white absolute left-2 top-1/3 shadow shadow-gray-700"
                            onClick={handleClickPrev}
                        >
                            <AiOutlineLeft className=" mx-auto text-2xl text-gray-600" />
                        </button>
                    )}
                    {indexSlider < listStories.length - number && (
                        <button
                            className=" h-11 w-11 rounded-full bg-white absolute right-2 top-1/3 shadow shadow-gray-700"
                            onClick={handleClickNext}
                        >
                            <AiOutlineRight className="mx-auto text-2xl text-gray-600" />
                        </button>
                    )}
                </div>
            </MainCard>
        </>
    );
}

export default Stories;
