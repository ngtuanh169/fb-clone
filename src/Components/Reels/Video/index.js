import { useEffect, useRef, useState } from "react";

function Video({ url = "", control = {} }) {
    const refVideo = useRef();
    useEffect(() => {
        control.play && refVideo.current && refVideo.current.play();
        !control.play && refVideo.current && refVideo.current.pause();
    }, [control.play]);
    useEffect(() => {
        if (refVideo.current) {
            control.sound
                ? (refVideo.current.volume = control.volume)
                : (refVideo.current.volume = 0);
        }
    }, [control.sound]);
    return (
        <div className=" w-full h-full ">
            <video
                ref={refVideo}
                src={url}
                loop={control?.replay}
                className="w-full h-full object-container object-center "
            ></video>
        </div>
    );
}

export default Video;
