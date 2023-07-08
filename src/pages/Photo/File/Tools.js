import Button from "../../../Components/Button";
import { TbZoomIn, TbZoomOut } from "react-icons/tb";
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
function Tools({
    zoomed,
    handleClickZoomIn,
    handleClickZoomOut,
    fullscreen,
    setFullscreen,
}) {
    return (
        <div className="flex items-center">
            <Button
                _className={
                    "flex justify-center items-center h-[40px] w-[40px] mr-2 text-white bg-black rounded-full "
                }
                cursorDefault={zoomed >= 2}
                onClick={zoomed < 2 && handleClickZoomIn}
            >
                <TbZoomIn className=" text-[25px]  " />
            </Button>
            <Button
                _className={
                    "flex justify-center items-center h-[40px] w-[40px] mr-2 text-white bg-black rounded-full "
                }
                cursorDefault={zoomed <= 1}
                onClick={zoomed > 1 && handleClickZoomOut}
            >
                <TbZoomOut className=" text-[25px]  " />
            </Button>
            {fullscreen ? (
                <Button
                    _className={
                        "flex justify-center items-center h-[40px] w-[40px] mr-2 text-white bg-black rounded-full "
                    }
                    onClick={() => setFullscreen(!fullscreen)}
                    hoverText={"Thoát chế độ toàn màn hình"}
                    hoverBottom
                >
                    <AiOutlineFullscreenExit className=" text-[25px]  " />
                </Button>
            ) : (
                <Button
                    _className={
                        "flex justify-center items-center h-[40px] w-[40px] mr-2 text-white bg-black rounded-full"
                    }
                    hoverText={"Chuyển sang toàn màn hình"}
                    hoverBottom
                    onClick={() => setFullscreen(!fullscreen)}
                >
                    <AiOutlineFullscreen className=" text-[25px]  " />
                </Button>
            )}
        </div>
    );
}

export default Tools;
