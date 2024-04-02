import { useContext } from "react";
import { VideoContext } from "..";
import Button from "../../Button";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
function PlayVideo() {
    const { play, setPlay } = useContext(VideoContext);
    return (
        <div className="">
            <Button
                _className={
                    "flex items-center justify-center w-8 h-8 text-white select-none "
                }
                hoverText={`${play ? "Tạm dừng" : "Phát"}`}
                onClick={() => setPlay(!play)}
            >
                {play ? (
                    <BsFillPauseFill className=" text-[25px] " />
                ) : (
                    <BsFillPlayFill className=" text-[25px] " />
                )}
            </Button>
        </div>
    );
}

export default PlayVideo;
