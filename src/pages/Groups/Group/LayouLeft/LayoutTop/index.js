import { useState, useRef, useContext } from "react";
import { formatNumberK } from "../../../../../Hooks/useFormat";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import { NavContext } from "../../NavProvider";
import Button from "../../../../../Components/Button";
import Confirm from "../../../../../Components/Modal/Confirm";
import { GiEarthAmerica } from "react-icons/gi";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsFillCaretDownFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import img from "../../../../../assets/images/avatar/avatar.jpg";
import { NavLink, useParams } from "react-router-dom";
function LayoutTop() {
    const { groupId } = useParams();
    const context = useContext(NavContext);
    const modalRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [showModalConfirm, setShowModalConfirm] = useState(false);

    useClickOutSide(modalRef, () => setShowModal(false));
    return (
        <>
            {showModalConfirm && (
                <Confirm
                    title={"Xác nhận rời nhóm"}
                    text={
                        "Nếu bỏ theo dõi, bạn sẽ không nhận được thông báo hay nhìn thấy bài viết trong nhóm trên Bảng feed của mình nữa. "
                    }
                    closeModal={() => setShowModalConfirm(false)}
                />
            )}

            <div className="flex flex-col p-4">
                <div className="flex mb-3">
                    <div className="">
                        <img
                            className="h-12 w-12 rounded-md border border-gray-400"
                            src={img}
                            alt=""
                        />
                    </div>
                    <div className="flex-1 flex flex-col ml-3">
                        <div className=" leading-[1]">
                            <span className=" text-[16px] font-semibold line-clamp-2 text-ellipsis">
                                Cộng đồng Front-end(HTML/CSS/JS) Việt Nam
                            </span>
                        </div>
                        <div className="flex items-center text-gray-500">
                            <GiEarthAmerica />
                            <ul className="flex items-center ml-1">
                                <li className=" text-[13px] ">
                                    <span>Nhóm công khai</span>
                                </li>
                                <li>
                                    <span className="block px-1">·</span>
                                </li>
                                <li>
                                    <span className="text-[13px] font-medium cursor-pointer hover:underline">
                                        {formatNumberK(57647)} người tham gia
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full h-9 mb-3">
                    <div ref={modalRef} className=" relative w-[80%] h-full">
                        <Button
                            _className={
                                "flex justify-center items-center w-full h-full font-semibold bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                            onClick={() => setShowModal(!showModal)}
                        >
                            <i className=" block h-4 w-4 bg-urlIcons5 bg-szIcons5 bg-joinedTheGroup"></i>
                            <span className="mx-2 text-[14px]">
                                Đã tham gia nhóm
                            </span>
                            <BsFillCaretDownFill className="pt-1" />
                        </Button>
                        <div
                            style={{
                                visibility: showModal ? "visible" : "hidden",
                                opacity: showModal ? "100" : "0",
                            }}
                            className="absolute top-[115%] left-0 w-full transition-all ease-linear duration-150"
                        >
                            <div
                                style={{ boxShadow: "0 0 5px #828282" }}
                                className=" flex flex-col w-full bg-white rounded-md p-2 "
                            >
                                <span
                                    className="flex items-center w-full px-2 py-1 rounded-md font-semibold cursor-pointer hover:bg-hover"
                                    onClick={() => setShowModalConfirm(true)}
                                >
                                    <FiLogOut className="mr-2" /> Rời nhóm
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 ml-3 h-full">
                        <Button
                            _className={
                                "flex justify-center items-center w-full h-full py-2 bg-gray-200 rounded-md cursor-default"
                            }
                        >
                            <BiDotsHorizontalRounded />
                        </Button>
                    </div>
                </div>
                <div className="h-full">
                    <Button
                        _className={"w-full"}
                        onClick={() =>
                            context.setCurrentNav(context.navList[0])
                        }
                    >
                        <NavLink
                            to={`/group/${groupId}`}
                            className={({ isActive }) =>
                                `flex items-center w-full h-11 px-2 rounded-md ${
                                    isActive
                                        ? "text-blue-500 bg-blue-50"
                                        : "bg-gray-200"
                                }   `
                            }
                            end
                        >
                            <MdHome className="h-6 w-6" />
                            <span className="ml-2 font-semibold">
                                Trang chủ nhóm
                            </span>
                        </NavLink>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default LayoutTop;
