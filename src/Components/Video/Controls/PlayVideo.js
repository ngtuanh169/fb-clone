import Button from "../../Button";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
function PlayVideo() {
    return (
        <div className="">
            <Button
                _className={
                    "flex items-center justify-center w-8 h-8 text-white "
                }
                hoverText={"Phát"}
            >
                <BsFillPlayFill className=" text-[25px] " />
                {/* <BsFillPauseFill className=" text-[25px] " /> */}
            </Button>
        </div>
    );
}

export default PlayVideo;
