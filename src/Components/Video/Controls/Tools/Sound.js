import { useContext } from "react";
import { VideoContext } from "../..";
import Button from "../../../Button";
import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
function Sound() {
    const { sound, setSound, volume, setVolume } = useContext(VideoContext);
    return (
        <div className=" relative group/sound">
            <Button
                _className={"flex items-center justify-center w-8 h-8"}
                onClick={() => setSound((prev) => !prev)}
            >
                {sound ? (
                    <RxSpeakerLoud className="text-white text-[20px]" />
                ) : (
                    <RxSpeakerOff className="text-white text-[20px]" />
                )}
            </Button>

            <div className=" absolute bottom-full pb-[30px] left-0 hidden justify-center w-full h-max group-hover/sound:flex">
                <input
                    className=" w-[60px] h-[5px] outline-none -rotate-90"
                    type="range"
                    name=""
                    id=""
                    value={sound ? volume : 0}
                    onChange={(e) => {
                        setSound(true);
                        setVolume(e.target.value);
                    }}
                />
            </div>

            {/* <div
                className=" absolute bottom-full left-[12px] flex items-end w-1 h-[60px] bg-matteGray rounded
             opacity-0 invisible transition-all delay-75 cursor-pointer group-hover:opacity-100 group-hover:visible "
            >
                <div
                    style={{ height: sound ? `${volume}%` : "0" }}
                    className=" relative w-full h-[33%] bg-blue-500 rounded"
                >
                    <div className=" absolute right-0 top-0 flex items-end justify-center h-1 w-full bg-transparent ">
                        <div className="w-max h-max ">
                            <div className="h-3 w-3 rounded-full bg-white"></div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Sound;
