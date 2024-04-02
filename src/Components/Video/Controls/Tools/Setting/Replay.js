import { useContext } from "react";
import Button from "../../../../Button";
import { VideoContext } from "../../..";
import { IoMdCheckmark } from "react-icons/io";
function Replay({ setCurrentComp }) {
    const { replay, setReplay } = useContext(VideoContext);
    return (
        <div className="flex flex-col gap-2 w-[200px] h-[100px]">
            <Button
                _className={`flex justify-start gap-2 items-center w-full p-2 text-white hover:bg-matteGray`}
                onClick={() => {
                    setReplay(true);
                    setCurrentComp(undefined);
                }}
            >
                <IoMdCheckmark
                    className={`${replay ? "text-white" : "text-transparent"}`}
                />
                <span className="text-[13px]">Bật</span>
            </Button>
            <Button
                _className={`flex justify-start gap-2 items-center w-full p-2 text-white hover:bg-matteGray`}
                onClick={() => {
                    setReplay(false);
                    setCurrentComp(undefined);
                }}
            >
                <IoMdCheckmark
                    className={`${!replay ? "text-white" : "text-transparent"}`}
                />
                <span className="text-[13px]">Tắt</span>
            </Button>
        </div>
    );
}

export default Replay;
