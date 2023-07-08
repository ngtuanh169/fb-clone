import { useEffect, useRef, useState } from "react";
import Button from "../../Button";
import { MdInsertEmoticon } from "react-icons/md";
import { IoMdClose, IoIosSend } from "react-icons/io";
import { BsImage } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { AiFillPlusCircle, AiTwotoneLike } from "react-icons/ai";
function SendMess({ onFocus, active }) {
    const test =
        "https://vnanet.vn/Data/Articles/2022/07/27/6245403/vna_potal_lai_chau_nang_cao_chat_luong_vung_nguyen_lieu_che_stand.jpg";
    const inputRef = useRef();
    const [showFull, setShowFull] = useState(false);
    const [formVlaues, setFormVlaues] = useState({ image: [], text: "" });
    const changeValues = (name, value) => {
        if (name === "image") {
            setFormVlaues({
                ...formVlaues,
                image: [...formVlaues.image, "a"],
            });
        } else {
            setFormVlaues({ ...formVlaues, [name]: value });
        }
    };
    const deleteImage = (id) => {
        const newArray = formVlaues.image.filter((item, index) => index !== id);
        setFormVlaues({ ...formVlaues, image: newArray });
    };
    useEffect(() => {
        active && inputRef.current.focus();
    }, [active]);
    useEffect(() => {
        if (formVlaues.text || formVlaues.image.length > 0) {
            setShowFull(true);
        } else {
            setShowFull(false);
        }
    }, [formVlaues]);
    return (
        <div className="flex items-end w-full px-2 py-4 bg-white ">
            <div
                className={` flex justify-between w-max ${
                    active ? "text-blue-600" : "text-slate-400"
                } text-[22px]`}
            >
                <Button
                    _className={" w-[22px] h-[38px] mr-3 hover:text-gray-400"}
                    hoverText={"Mở hành động"}
                    classHoverText="left-[-35px]"
                >
                    <span className=" ">
                        <AiFillPlusCircle />
                    </span>
                </Button>
                <Button
                    _className={" w-[22px] h-[38px] mr-3 hover:text-gray-400"}
                    hoverText={"Thêm ảnh/video"}
                    classHoverText="left-[-30px]"
                >
                    <label
                        className="flex items-center w-full h-full cursor-pointer"
                        htmlFor="img"
                    >
                        <BsImage />
                    </label>
                    <input
                        className="h-0 w-0"
                        id="img"
                        type="file"
                        onChange={(e) => changeValues("image", e.target.files)}
                    />
                </Button>
            </div>
            <div className="flex flex-1 justify-between items-end">
                <div className="flex flex-col justify-end w-full p-1 bg-gray-200 rounded-3xl ">
                    {formVlaues.image.length > 0 && (
                        <div className="flex w-[200px] p-2 pb-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full">
                            <div className="flex w-max ">
                                {formVlaues.image.map((item, index) => (
                                    <div
                                        key={index}
                                        className=" relative w-12 h-12 mr-2"
                                    >
                                        <img
                                            className=" w-full h-full object-cover rounded-lg border "
                                            src={test}
                                            alt=""
                                        />
                                        <Button
                                            _className={
                                                "absolute top-[-8px] right-[-8px] flex items-center justify-center h-5 w-5 bg-white rounded-full"
                                            }
                                            onClick={() => deleteImage(index)}
                                        >
                                            <IoMdClose />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="w-full flex px-2 py-1">
                        <input
                            ref={inputRef}
                            className="flex w-full outline-none bg-transparent"
                            type="text"
                            placeholder="Aa"
                            value={formVlaues.text}
                            onChange={(e) =>
                                changeValues("text", e.target.value)
                            }
                            onFocus={() => onFocus(true)}
                            onBlur={() => onFocus(false)}
                        />
                        <Button
                            _className={"cursor-not-allowed"}
                            // hoverText={"Chọn biểu tượng cảm xúc"}
                            // classHoverText="left-[-60px]"
                        >
                            <span
                                className={`text-[20px] ${
                                    active ? "text-blue-600" : "text-slate-400"
                                }`}
                            >
                                <MdInsertEmoticon />
                            </span>
                        </Button>
                    </div>
                </div>
                <div className=" ml-2 pb-1">
                    {showFull ? (
                        <Button
                            _className={
                                "flex items-center justify-center h-[30px] w-[30px] rounded-full hover:bg-gray-200"
                            }
                        >
                            <span
                                className={`flex items-center ${
                                    active ? "text-blue-600" : "text-slate-400"
                                }`}
                            >
                                <IoIosSend className=" rotate-45 text-[22px] text-blue-500" />
                            </span>
                        </Button>
                    ) : (
                        <Button
                            _className={
                                "flex items-center justify-center h-[30px] w-[30px] rounded-full hover:bg-gray-200"
                            }
                        >
                            <span
                                className={`flex items-center ${
                                    active ? "text-blue-600" : "text-slate-400"
                                }`}
                            >
                                <AiTwotoneLike className="h-[22px] w-[22px]" />
                            </span>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SendMess;
