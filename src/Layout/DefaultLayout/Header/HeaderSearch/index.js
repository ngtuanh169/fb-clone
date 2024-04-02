import { useState, useEffect, useRef, useContext } from "react";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../App";
import SearchHistory from "./SearchHistory";
import UserSearch from "./UserSearch";
import Button from "../../../../Components/Button";
import { BsFacebook } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { CgArrowLeft } from "react-icons/cg";
function HeaderSearch() {
    const screenSize = useContext(ScreenSize);
    const inputRef = useRef();
    const divRef = useRef();
    const [isFocus, setIsFocus] = useState(false);
    const [text, setText] = useState("");
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    useEffect(() => {
        if (screenSize.width <= 640 && showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "visible";
            setText("");
        }
    }, [showModal]);

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
                className={` absolute top-0 left-0 ${
                    showModal && screenSize.width <= 640
                        ? " w-screen h-screen "
                        : "w-[320px]"
                } xl:w-full h-full transition-all `}
            >
                <div
                    ref={divRef}
                    className={`flex flex-col w-full h-full sm:h-auto bg-white rounded-lg overflow-hidden ${
                        showModal ? "drop-shadow-xl" : ""
                    }`}
                >
                    <div className="flex items-center h-14 w-full px-4 ">
                        <div className=" h-max pr-2">
                            {showModal ? (
                                <Button
                                    _className={`flex justify-center items-center  ${
                                        isFocus
                                            ? "w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-slate-200"
                                            : "flex w-[40px] h-[40px]"
                                    }`}
                                    onClick={() => setShowModal(false)}
                                >
                                    <CgArrowLeft className=" text-gray-500 mr-1 text-[22px] " />
                                </Button>
                            ) : (
                                <Button
                                    to={"/"}
                                    _className={`flex justify-center items-center  ${
                                        isFocus
                                            ? "w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-slate-200"
                                            : "flex w-[40px] h-[40px]"
                                    }`}
                                >
                                    <BsFacebook className=" text-[45px] text-blue-600" />
                                </Button>
                            )}
                        </div>
                        <div
                            className={`xl:grow flex items-center justify-center h-10 w-10 py-2 px-4 boder
                             bg-gray-100 rounded-full ${
                                 showModal ? "grow" : ""
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
                                className=" grow w-full bg-transparent outline-none "
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
                        <div
                            className=" grow w-full h-full sm:w-full sm:h-max sm:max-h-[60vh] 
                            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full"
                        >
                            {text.trim() ? (
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
