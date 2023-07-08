import { useContext, useState, useRef } from "react";
import { formatNumber } from "../../../../Hooks/useFormat";
import { useClickOutSide } from "../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../App";
import Button from "../../../../Components/Button";
import Confirm from "../../../../Components/Modal/Confirm";
import NavList from "./NavList";
import { GiEarthAmerica } from "react-icons/gi";
import { BsDot } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import img from "../../../../assets/images/avatar/avatar.jpg";
function LayoutTop() {
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const [showModal, setShoModal] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    useClickOutSide(divRef, () => setShoModal(false));
    return (
        <div className="flex flex-col w-full bg-white">
            {showConfirm && (
                <Confirm
                    title={"Xác nhận rời nhóm"}
                    text={
                        "Nếu bỏ theo dõi, bạn sẽ không nhận được thông báo hay nhìn thấy bài viết trong nhóm trên Bảng feed của mình nữa. "
                    }
                    closeModal={() => setShowConfirm(false)}
                />
            )}
            <div className=" w-full bg-gradient-to-b from-slate-400 via-white to-white">
                <div className=" flex justify-center">
                    <div className="relative w-full h-[300px] xl:w-[1100px] sm:h-[350px] md:h-[450px] sm:rounded-b-md overflow-hidden ">
                        <img
                            className="w-full h-full object-cover  "
                            src={img}
                            alt=""
                        />
                        <div className=" absolute bottom-0 left-0 flex items-center w-full h-[42px] bg-blue-800">
                            <span className="px-3 tex-[14px] text-white font-medium line-clamp-1">
                                Nhóm của Cộng đồng Front-end(HTML/CSS/JS) Việt
                                Nam
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col px-2 pb-2 xl:pb-0 xl:px-0 border-b boder-gray-900">
                <div className="flex justify-between w-full lg:w-[1000px] xl:w-[1030px] h-[90px] mx-auto">
                    <div className="flex items-center w-full h-full">
                        <span className=" text-[28px] font-bold line-clamp-2 ">
                            Cộng đồng Front-end(HTML/CSS/JS) Việt Nam
                        </span>
                    </div>
                </div>
                {context.width < 1280 && (
                    <>
                        <div className="flex items-center">
                            <GiEarthAmerica className="mr-1" />
                            <span>Nhóm công khai</span>
                            <BsDot className="mx-1" />
                            <span className="mr-1 font-medium">
                                {formatNumber(1233)}
                            </span>
                            <span>thành viên</span>
                        </div>
                        <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                            <div ref={divRef} className=" relative">
                                <Button
                                    _className={
                                        "flex items-center justify-center w-[170px] py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                                    }
                                    onClick={() => setShoModal(!showModal)}
                                >
                                    <MdGroups className="text-[25px] mr-1" />
                                    <span className=" font-medium">
                                        Đã tham gia
                                    </span>
                                </Button>
                                {showModal && (
                                    <div
                                        style={{
                                            boxShadow: "0 1px 3px 2px #ccc",
                                        }}
                                        className=" absolute top-[110%] left-0  bg-white rounded-lg p-2"
                                    >
                                        <Button
                                            _className={
                                                "flex items-center w-[250px] p-2 rounded-md hover:bg-gray-200"
                                            }
                                            onClick={() => {
                                                setShoModal(false);
                                                setShowConfirm(true);
                                            }}
                                        >
                                            <FiLogOut className="mr-1" />
                                            <span className=" font-medium">
                                                Rời nhóm
                                            </span>
                                        </Button>
                                    </div>
                                )}
                            </div>
                            <div className="">
                                <Button
                                    _className={
                                        "flex items-center justify-center w-[170px] py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
                                    }
                                >
                                    <FaUserPlus className="mr-1" />
                                    <span className=" font-medium ">Mời</span>
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div
                className=" w-full lg:w-[1000px] xl:w-[1030px] mx-auto 
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
            >
                <NavList />
            </div>
        </div>
    );
}

export default LayoutTop;
