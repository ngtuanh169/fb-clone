import { useState, useRef, useEffect, createContext } from "react";
import Button from "../Button";
import Controls from "./Controls";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

export const VideoContext = createContext();

function Video({ videoUrl = "", showControls = true, maxHeight = false }) {
    const videoRef = useRef();
    const [play, setPlay] = useState(false);
    const [replay, setReplay] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [fullTime, setFullTime] = useState(4 * 60);
    const [timeUpdate, setTimeUpdate] = useState(0);
    const [sound, setSound] = useState(true);
    const [volume, setVolume] = useState(100);
    const [speed, setSpeed] = useState(1);
    const [fullScreen, setFullScreen] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        volume < 1 && setSound(false);
    }, [volume]);

    useEffect(() => {
        play ? videoRef.current.play() : videoRef.current.pause();
    }, [play]);

    useEffect(() => {
        if (!sound) {
            videoRef.current.volume = 0;
            return;
        }
        videoRef.current.volume = volume / 100;
    }, [volume, sound]);

    useEffect(() => {
        videoRef.current.playbackRate = speed;
    }, [speed]);

    useEffect(() => {
        const eventTimeupdate = (e) => setCurrentTime(e.target.currentTime);
        const eventLoadedmetadata = (e) => setFullTime(e.target.duration);
        const eventEnded = (e) => setPlay(false);
        videoRef.current &&
            videoRef.current.addEventListener(
                "loadedmetadata",
                eventLoadedmetadata
            );
        videoRef.current.addEventListener("timeupdate", eventTimeupdate);
        videoRef.current.addEventListener("ended", eventEnded);
        return () => {
            videoRef.current &&
                videoRef.current.removeEventListener(
                    "loadedmetadata",
                    eventLoadedmetadata
                );
            videoRef.current &&
                videoRef.current.removeEventListener(
                    "timeupdate",
                    eventTimeupdate
                );
            videoRef.current &&
                videoRef.current.removeEventListener("ended", eventEnded);
        };
    }, [videoRef.current]);

    useEffect(() => {
        if (videoRef.current && timeUpdate !== videoRef.current.currentTime) {
            videoRef.current.currentTime = timeUpdate;
        }
    }, [timeUpdate]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            setShowButton(false);
        }, 500);
        return () => clearTimeout(timeId);
    }, [showButton]);

    const value = {
        play,
        setPlay,
        replay,
        setReplay,
        currentTime,
        setCurrentTime,
        setTimeUpdate,
        fullTime,
        setFullTime,
        sound,
        setSound,
        volume,
        setVolume,
        speed,
        setSpeed,
        fullScreen,
        setFullScreen,
    };
    return (
        <VideoContext.Provider value={value}>
            {videoUrl && (
                <div
                    className={`group/video ${
                        fullScreen ? "fixed top-0 left-0 z-[99]" : "relative"
                    }  w-full h-full`}
                >
                    <video
                        ref={videoRef}
                        controls={false}
                        className={`w-full h-full ${
                            !fullScreen && maxHeight ? "max-h-[500px]" : ""
                        } bg-black object-contain object-center cursor-pointer`}
                        src={videoUrl}
                        loop={replay}
                        onClick={() => {
                            setPlay(!play);
                            setShowButton(true);
                        }}
                    >
                        {/* <source src={videoUrl} type={"video/mp4"} /> */}
                    </video>

                    {showButton && (
                        <div className=" absolute top-0 left-0 flex items-center justify-center w-full h-full">
                            <div
                                className={
                                    "flex items-center justify-center w-10 h-10 bg-matteBlack2 rounded-full animate-buttonVideo "
                                }
                            >
                                {play ? (
                                    <BsFillPlayFill className="text-[24px] text-white" />
                                ) : (
                                    <BsFillPauseFill className="text-[24px] text-white" />
                                )}
                            </div>
                        </div>
                    )}
                    {showControls && (
                        <div
                            className={`absolute bottom-0 left-0 w-full transition-all delay-200 opacity-0 group-hover/video:opacity-100 ${
                                !play ? "opacity-100" : ""
                            }`}
                        >
                            <Controls />
                        </div>
                    )}
                </div>
            )}
        </VideoContext.Provider>
    );
}

export default Video;
