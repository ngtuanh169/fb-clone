import { useContext } from "react";
import Button from "../../../../Button";
import { VideoContext } from "../../..";
import { IoMdCheckmark } from "react-icons/io";
function Speed({ setCurrentComp = () => setCurrentComp }) {
    const listSpeed = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75];
    const { speed, setSpeed } = useContext(VideoContext);
    return (
        <div
            className="flex flex-col gap-2 w-[200px] h-[200px] scrollbar-thin scrollbar-thumb-slate-200 
            scrollbar-thumb-rounded-md scrollbar-track-transparent"
        >
            {listSpeed.length > 0 &&
                listSpeed.map((item, index) => (
                    <Button
                        key={index}
                        _className={`flex justify-start gap-2 items-center w-full p-2 text-white hover:bg-matteGray`}
                        onClick={() => {
                            setSpeed(item);
                            setCurrentComp(undefined);
                        }}
                    >
                        <IoMdCheckmark
                            className={`${
                                speed === item
                                    ? "text-white"
                                    : "text-transparent"
                            }`}
                        />
                        <span className="text-[13px]">
                            {item === 1 ? "Chuẩn" : item}
                        </span>
                    </Button>
                ))}
        </div>
    );
}

export default Speed;
