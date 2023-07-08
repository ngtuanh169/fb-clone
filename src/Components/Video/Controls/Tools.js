import Button from "../../Button";
import { RiSettings5Fill } from "react-icons/ri";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { RxSpeakerLoud } from "react-icons/rx";
function Tools() {
    return (
        <div className="flex w-[96px]">
            <div className="">
                <Button
                    _className={"flex items-center justify-center w-8 h-8"}
                    hoverText={"Cài đặt"}
                >
                    <RiSettings5Fill className="text-white text-[20px]" />
                </Button>
            </div>
            <div className="">
                <Button
                    _className={"flex items-center justify-center w-8 h-8"}
                    hoverText={"Chuyển sang toàn màn hình"}
                >
                    <MdOutlineZoomOutMap className="text-white text-[20px]" />
                </Button>
            </div>
            <div className=" relative group">
                <Button _className={"flex items-center justify-center w-8 h-8"}>
                    <RxSpeakerLoud className="text-white text-[20px]" />
                </Button>
                <div
                    className=" absolute bottom-full left-[12px] flex items-end w-2 h-[60px] bg-matteGray rounded
                         opacity-0 invisible transition-all delay-75 group-hover:opacity-100 group-hover:visible "
                >
                    <div className=" relative w-full h-[33%] bg-blue-500 rounded">
                        <div className=" absolute right-[-3px] top-[-6px] h-3 w-3 rounded-full bg-white"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Tools;
