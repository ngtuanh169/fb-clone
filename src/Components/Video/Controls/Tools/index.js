import { useContext } from "react";
import { VideoContext } from "../..";
import Button from "../../../Button";
import Setting from "./Setting";
import Sound from "./Sound";
import { MdOutlineZoomOutMap, MdOutlineFullscreenExit } from "react-icons/md";
function Tools() {
    const { fullScreen, setFullScreen } = useContext(VideoContext);
    return (
        <div className="flex w-[96px]">
            <Setting />
            <div className="">
                <Button
                    _className={
                        "flex items-center justify-center w-8 h-8 select-none"
                    }
                    onClick={() => setFullScreen(!fullScreen)}
                    hoverText={
                        fullScreen
                            ? "Thoát khỏi chế độ toàn màn hình"
                            : "Chuyển sang toàn màn hình"
                    }
                >
                    {fullScreen ? (
                        <MdOutlineFullscreenExit className="text-white text-[22px]" />
                    ) : (
                        <MdOutlineZoomOutMap className="text-white text-[20px]" />
                    )}
                </Button>
            </div>
            <Sound />
        </div>
    );
}

export default Tools;
