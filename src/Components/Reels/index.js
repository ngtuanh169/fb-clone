import { useEffect, useRef, useState } from "react";
import MainCard from "../MainCard";
import Video from "./Video";
import Sound from "./Sound";
import ReelsTop from "./ReelsTop";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SoundSource from "./SoundSource";
import Content from "./Content";
import Tools from "./Tools";
import img from "../../assets/images/imgIcon/404url.jpg";
function Reels({ data = {}, pageReels = false }) {
    const file = data.files[0];
    const reelsRef = useRef();
    const [showVideo, setShowVideo] = useState(false);
    const [postData, setPostData] = useState(data);
    const [control, setControl] = useState({
        play: false,
        volume: 1,
        sound: false,
        replay: true,
    });
    useEffect(() => {
        pageReels && !control.sound && setControl({ ...control, sound: true });
    }, [pageReels]);

    useEffect(() => {
        handleShowVideo(reelsRef.current);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            showVideo
                ? handlePlayVideo(reelsRef.current, control)
                : handleShowVideo(reelsRef.current);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [control.play, showVideo]);

    const handleShowVideo = (ref) => {
        if (!ref) return;
        const top = ref.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;
        if (top > screenHeight + 50) {
            setShowVideo(false);
        } else if (top < -screenHeight - 50) {
            setShowVideo(false);
        } else {
            setShowVideo(true);
        }
    };

    const handlePlayVideo = (ref, control) => {
        if (!ref) return;
        const screenHeight = window.innerHeight - 100;
        const top = ref.getBoundingClientRect().top;
        if (top > -300 && top < screenHeight) {
            !control.play && setControl({ ...control, play: true });
        } else {
            control.play && setControl({ ...control, play: false });
        }
    };

    const clickVideo = (pageReels) => {
        if (pageReels) {
            setControl({ ...control, play: !control.play });
        }
    };

    return (
        <MainCard>
            <div
                ref={reelsRef}
                className=" relative flex flex-col w-full h-[550px] m-auto px-1 bg-black rounded-lg"
            >
                <div className=" absolute top-4 left-4  max-w-[70%] z-20 ">
                    <ReelsTop data={postData} />
                </div>
                <div className=" absolute top-4 right-4 flex gap-2 items-center text-[20px] text-white z-20">
                    <Sound control={control} setControl={setControl} />
                    <div className=" cursor-pointer">
                        <HiOutlineDotsHorizontal />
                    </div>
                </div>
                <div
                    className="w-full h-full cursor-pointer z-10 hover:opacity-90"
                    onClick={() => clickVideo(pageReels)}
                >
                    {showVideo ? (
                        <Video url={file.url} control={control} />
                    ) : (
                        <img src={img} className="w-full h-full opacity-20" />
                    )}
                </div>
                <div
                    className={` absolute bottom-[35px] left-4 ${
                        pageReels ? "w-full" : "w-[85%]"
                    } z-20`}
                >
                    <Content text={postData.content} />
                </div>
                <div
                    className={`absolute bottom-2 left-4 ${
                        pageReels ? "w-full" : "w-[50%]"
                    } z-20`}
                >
                    <SoundSource data={postData} />
                </div>
                <div className=" absolute bottom-4 right-4 z-20">
                    <Tools data={postData} setData={setPostData} />
                </div>
            </div>
        </MainCard>
    );
}

export default Reels;
