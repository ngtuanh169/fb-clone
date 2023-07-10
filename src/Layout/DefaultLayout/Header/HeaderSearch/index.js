import { useState, useEffect, useRef } from "react";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import SearchHistory from "./SearchHistory";
import UserSearch from "./UserSearch";
import Button from "../../../../Components/Button";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { CgArrowLeft } from "react-icons/cg";
function HeaderSearch() {
    const inputRef = useRef();

    const divRef = useRef();
    const [isFocus, setIsFocus] = useState(false);
    const [text, setText] = useState("");
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    useEffect(() => {
        isFocus && inputRef.current.focus();
        isFocus && text && setShowModal(true);
    }, [isFocus, text]);
    return (
        <div
            className={` relative h-full w-[112px] lg:w-[350px] ${
                showModal ? "z-50" : ""
            }  `}
        >
            <div
                className={` absolute top-0 left-0 w-[320px] xl:w-full h-full   `}
            >
                <div
                    ref={divRef}
                    className={`w-full bg-white rounded-lg ${
                        showModal ? "drop-shadow-xl" : ""
                    }`}
                >
                    <div className="h-14 w-full flex items-center px-4  ">
                        <div className=" h-max pr-2">
                            <Button
                                to={isFocus ? "" : "/"}
                                _className={`flex justify-center items-center  ${
                                    isFocus
                                        ? "w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-slate-200"
                                        : "flex w-[40px] h-[40px]"
                                }`}
                            >
                                {isFocus ? (
                                    <CgArrowLeft className=" text-gray-500 mr-1 text-[22px] " />
                                ) : (
                                    <BsFacebook className=" text-[45px] text-blue-600" />
                                )}
                            </Button>
                        </div>
                        <div
                            className={`xl:flex-1 flex items-center justify-center h-10 w-10  py-2 px-4 boder bg-gray-100 rounded-full ${
                                showModal ? "flex-1" : ""
                            }`}
                        >
                            <Button
                                _className={`transition-all duration-[150] ease-linear ${
                                    isFocus ? "w-0" : "w-[20px]"
                                } `}
                                onClick={() => setIsFocus(true)}
                            >
                                {!isFocus && (
                                    <AiOutlineSearch className=" text-gray-700" />
                                )}
                            </Button>

                            <input
                                ref={inputRef}
                                className=" flex-1 w-full bg-transparent outline-none "
                                type="text"
                                placeholder="Tìm kiếm trên Facebook"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onFocus={() => {
                                    setIsFocus(true);
                                    setShowModal(true);
                                }}
                                onBlur={() => setIsFocus(false)}
                            />
                        </div>
                    </div>
                    {showModal && (
                        <div className="w-full n max-h-[85vh]">
                            {text ? (
                                <div className=" w-full ">
                                    <UserSearch
                                        text={text}
                                        closeModal={() => setShowModal(false)}
                                    />
                                </div>
                            ) : (
                                <div className=" w-full">
                                    <SearchHistory
                                        text={text}
                                        closeModal={() => setShowModal(false)}
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HeaderSearch;
