import { useContext, useEffect, useRef, useState } from "react";
import { formatTimeVideo } from "../../../Hooks/useFormat";
import { VideoContext } from "..";
import { ScreenSize } from "../../../App";
function TimeLine() {
    const divRef = useRef();
    const circleRef = useRef();
    const { currentTime, setTimeUpdate, fullTime } = useContext(VideoContext);
    const { width } = useContext(ScreenSize);
    const [percent, setPercent] = useState(0);
    const [percentHover, setPercentHover] = useState(0);

    useEffect(() => {
        const number = (currentTime / fullTime) * 100;
        number > 100 ? setPercent(100) : setPercent(number);
    }, [currentTime]);

    useEffect(() => {
        const handleEvent = (e) => {
            const distanceLeft = divRef.current
                ? divRef.current.getBoundingClientRect().left
                : 0;

            if (e.clientX - distanceLeft < 0) {
                return setPercentHover(0);
            }
            if (e.clientX - distanceLeft > e.target.clientWidth) {
                return setPercentHover(e.target.clientWidth);
            }
            const number = (e.clientX - distanceLeft) / e.target.clientWidth;
            setPercentHover(number * 100);
        };
        divRef.current &&
            divRef.current.addEventListener("mousemove", handleEvent);

        return () =>
            divRef.current &&
            divRef.current.removeEventListener("mousemove", handleEvent);
    }, [width]);

    return (
        <div className="flex items-center w-full">
            <div className="flex pr-2 text-white text-[13px] select-none">
                <span className=" ">{formatTimeVideo(currentTime)}</span>
                <span className=" px-1">/</span>
                <span className="">{formatTimeVideo(fullTime)}</span>
            </div>
            <div className="group/timeLine relative flex-1 h-1 bg-gray-400 ">
                <div
                    ref={divRef}
                    className="absolute top-0 left-0 w-full h-1 z-10 cursor-pointer"
                    onClick={() =>
                        setTimeUpdate((percentHover / 100) * fullTime)
                    }
                ></div>
                <div
                    style={{ width: `${percentHover}%` }}
                    className="absolute top-0 left-0 hidden h-1 bg-gray-300 transition-all duration-[0.03] 
                        group-hover/timeLine:block"
                ></div>
                <div className=" absolute top-0 left-0 w-full h-1">
                    <div
                        style={{ width: `${percent}%` }}
                        className=" relative h-full bg-blue-500 cursor-pointer"
                    >
                        <div className=" absolute right-0 top-0 flex items-center justify-center h-full w-1">
                            <div className="block w-max h-max">
                                <div
                                    ref={circleRef}
                                    className="w-1 h-1 bg-transparent transition-all rounded-full cursor-pointer 
                                group-hover/timeLine:bg-white group-hover/timeLine:w-3 group-hover/timeLine:h-3"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    style={{ left: `${percentHover}%` }}
                    className=" absolute left-0 -top-8 hidden items-center justify-center w-[1px] h-[1px] 
                        group-hover/timeLine:flex"
                >
                    <div className=" left-0 -top-8 px-2 py-[2px] rounded bg-matteBlack2">
                        <span className="text-white text-[13px]">
                            {formatTimeVideo((percentHover / 100) * fullTime)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeLine;
