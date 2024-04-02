import { useState, useContext, useEffect, useRef } from "react";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import Button from "../../../../Button";
import { VideoContext } from "../../..";
import Replay from "./Replay";
import Speed from "./Speed";
import { RiSettings5Fill } from "react-icons/ri";
import { MdReplay } from "react-icons/md";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { BsSpeedometer } from "react-icons/bs";

function Setting() {
    const context = useContext(VideoContext);
    const divRef = useRef();
    const listComp = [
        {
            id: 1,
            Comp: Replay,
            icon: MdReplay,
            text: "Tự động phát lại",
            value: context.replay ? "Bật" : "Tắt",
        },
        {
            id: 2,
            Comp: Speed,
            icon: BsSpeedometer,
            text: "Tốc độ phát",
            value: context.speed === 1 ? "Chuẩn" : context.speed,
        },
    ];
    const [showModal, setShowModal] = useState(false);
    const [currentComp, setCurrentComp] = useState(undefined);
    useEffect(() => {
        !showModal && setCurrentComp(undefined);
    }, [showModal]);
    useClickOutSide(divRef, () => setShowModal(false));
    return (
        <div ref={divRef} className=" relative">
            <Button
                _className={
                    "flex items-center justify-center w-8 h-8 select-none"
                }
                hoverText={showModal ? false : "Cài đặt"}
                onClick={() => setShowModal(!showModal)}
            >
                <RiSettings5Fill className="text-white text-[20px]" />
            </Button>
            {showModal && (
                <div
                    className={`absolute bottom-full left-[-15px] flex justify-center w-full`}
                >
                    <div className="flex justify-end w-[200px] ">
                        <div className="w-full rounded-md overflow-hidden">
                            <div
                                style={{
                                    transform: currentComp
                                        ? "translateX(-200px)"
                                        : "translateX(0)",
                                }}
                                className={`flex w-max max-h-[250px] transition-all`}
                            >
                                <div
                                    className={`flex flex-col gap-2 w-[200px] py-2 bg-matteBlack overflow-hidden `}
                                >
                                    {listComp.length > 0 &&
                                        listComp.map((item) => (
                                            <div
                                                key={item.id}
                                                className="w-full"
                                            >
                                                <Button
                                                    _className={`flex items-center justify-between gap-2 w-full p-2 text-[13px] text-white 
                                                    font-medium hover:bg-matteGray`}
                                                    onClick={() =>
                                                        setCurrentComp(item)
                                                    }
                                                >
                                                    <span className="flex items-center gap-2 w-max ">
                                                        <item.icon className="text-[18px]" />
                                                        <span className="">
                                                            {item.text}
                                                        </span>
                                                    </span>
                                                    <span className="flex items-center gap-2 w-max">
                                                        <span className="">
                                                            {item.value}
                                                        </span>
                                                        <FiChevronRight className="text-[18px]" />
                                                    </span>
                                                </Button>
                                            </div>
                                        ))}
                                </div>
                                <div className="h-max w-max py-2 bg-matteBlack rounded-md ">
                                    {currentComp ? (
                                        <div className="flex flex-col gap-2 w-max">
                                            <div className="flex gap-2 w-full p-2 border-b border-gray-300 ">
                                                <Button
                                                    _className={"text-white"}
                                                    onClick={() =>
                                                        setCurrentComp(
                                                            undefined
                                                        )
                                                    }
                                                >
                                                    <FiChevronLeft />
                                                </Button>
                                                <Button
                                                    _className={"text-white"}
                                                    onClick={() =>
                                                        setCurrentComp(
                                                            undefined
                                                        )
                                                    }
                                                >
                                                    <span>Cài đặt</span>
                                                </Button>
                                            </div>
                                            <currentComp.Comp
                                                setCurrentComp={setCurrentComp}
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-0 h-0"></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Setting;
