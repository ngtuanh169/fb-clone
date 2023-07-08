import { useState, useEffect, useRef } from "react";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import MainCard from "../../../../Components/MainCard";
import Button from "../../../../Components/Button";
import { AiOutlineCheck } from "react-icons/ai";
import { BsFillCaretDownFill } from "react-icons/bs";
function FormRelationships({ closeForm = () => {} }) {
    const relationships = ["Độc thân", "Hẹn hò", "Đã đính hôn", "Đã kết hôn"];
    const modalRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    const [relationship, setRelationship] = useState("");
    useClickOutSide(modalRef, () => setOpenModal(false));
    return (
        <div className="flex flex-col w-full ">
            <div
                className={`flex flex-col w-full transition-all ease-linear border-[2px] p-[2px] rounded-md `}
            >
                <div
                    className={`relative flex justify-between items-center w-full border rounded-md 
                        transition-all ease-linear p-2 cursor-pointer hover:border-gray-700`}
                    onClick={() => setOpenModal(!openModal)}
                >
                    <span>
                        {relationship ? relationship : "---trạng thái---"}
                    </span>
                    <BsFillCaretDownFill />
                    {openModal && (
                        <div
                            ref={modalRef}
                            className=" absolute top-[100%] left-0 w-full h-44 z-30"
                        >
                            <MainCard>
                                <div className="w-full max-h-[250px] scrollbar-thin scrollbar-thumb-slate-600 scrollbar-thumb-rounded-full">
                                    <div
                                        className="w-full p-1 rounded-md hover:bg-hover"
                                        onClick={() => {
                                            setRelationship("");
                                            setOpenModal(false);
                                        }}
                                    >
                                        <span>---trạng thái---</span>
                                    </div>
                                    {relationships.length > 0 &&
                                        relationships.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`flex justify-between items-center w-full p-2 mb-1 ${
                                                    relationship === item
                                                        ? "bg-hover"
                                                        : ""
                                                } rounded-md hover:bg-hover`}
                                                onClick={() => {
                                                    setRelationship(item);
                                                    setOpenModal(false);
                                                }}
                                            >
                                                <span>{item}</span>
                                                {relationship === item && (
                                                    <AiOutlineCheck className=" text-green-400" />
                                                )}
                                            </div>
                                        ))}
                                </div>
                            </MainCard>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full border-b my-3"></div>
            <div className="flex justify-end mt-3">
                <Button
                    _className={
                        "px-3 py-1 rounded-md mr-3 font-medium bg-gray-200 hover:bg-gray-300"
                    }
                    onClick={closeForm}
                >
                    Hủy
                </Button>
                <Button
                    _className={
                        "px-3 py-1 rounded-md text-white font-medium bg-blue-500 hover:bg-blue-600"
                    }
                    onClick={closeForm}
                >
                    Lưu
                </Button>
            </div>
        </div>
    );
}

export default FormRelationships;
