import { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import {
    formatTime,
    formatNumberK,
    formatNumber,
} from "../../../../../../Hooks/useFormat";
import { useClickOutSide } from "../../../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../../../App";
import Button from "../../../../../../Components/Button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ImHome3 } from "react-icons/im";
function Item({ data }) {
    const context = useContext(ScreenSize);
    const divRef = useRef();
    const [showModal, setShowModal] = useState(false);
    useClickOutSide(divRef, () => setShowModal(false));
    return (
        <div
            style={{ boxShadow: "0px 1px 2px 1px #ccc" }}
            className="flex flex-col w-full sm:w-[600px] lg:w-[844px] mt-5 py-4 px-3 bg-white  rounded-lg "
        >
            <div className="flex justify-between w-full ">
                <div className="flex w-max ">
                    <img
                        className="h-[60px] w-[60px] mr-3 object-cover object-center rounded-full"
                        src={data.avatar}
                        alt=""
                    />
                    <div className="flex flex-col justify-center h-full">
                        <Link
                            to={`/profile`}
                            className="text-[17px] font-semibold hover:underline"
                        >
                            <span>{data.name}</span>
                        </Link>
                        <span className="text-[15px] text-gray-500">
                            {`Đã yêu cầu ${formatTime(+data.requestTime)}`}
                        </span>
                    </div>
                </div>
                {context.width >= 600 && (
                    <div className="flex gap-3 ">
                        <div className="h-max">
                            <Button
                                _className={
                                    "h-max px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600 "
                                }
                            >
                                <span className="text-[15px] text-white font-semibold">
                                    Phê duyệt
                                </span>
                            </Button>
                        </div>
                        <div className="h-max">
                            <Button
                                _className={
                                    "h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                            >
                                <span className=" text-[15px] font-semibold">
                                    Từ chối
                                </span>
                            </Button>
                        </div>
                        <div ref={divRef} className="relative h-max">
                            <Button
                                _className={
                                    " h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                }
                                onClick={() => setShowModal(!showModal)}
                            >
                                <HiOutlineDotsHorizontal className="text-[23px]" />
                            </Button>
                            {showModal && (
                                <div
                                    style={{
                                        boxShadow: "0px 1px 2px 1px #ccc",
                                    }}
                                    className=" absolute top-[100%] right-0 flex flex-col w-[310px] p-2 rounded-lg bg-white z-10 "
                                >
                                    <Button
                                        _className={
                                            "text-left p-2  rounded  hover:bg-gray-200"
                                        }
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className=" text-[15px] font-medium ">
                                            {`Nhắn tin cho ${data.name}`}
                                        </span>
                                    </Button>
                                    <Button
                                        _className={
                                            "text-left p-2  rounded  hover:bg-gray-200"
                                        }
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span
                                            className=" text-[15px] font-medium "
                                            onClick={() => setShowModal(false)}
                                        >
                                            Xem trang cá nhân
                                        </span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex w-full">
                <div className="w-[60px] mr-3"></div>
                <div className="flex flex-col">
                    <div className="flex items-center pt-2">
                        <FaUserFriends className="text-gray-500 text-[20px] mr-3" />
                        <span className=" ">{`${formatNumberK(
                            +data.friends
                        )} người bạn`}</span>
                    </div>
                    <div className="flex items-center pt-2">
                        <MdGroups className="text-gray-500 text-[20px] mr-3" />
                        <span className=" font-medium ">{`${formatNumber(
                            +data.friends
                        )} nhóm khác`}</span>
                    </div>
                    <div className="flex items-center pt-2">
                        <AiOutlineClockCircle className="text-gray-500 text-[20px] mr-3" />
                        <span className=" ">{`Tham gia Facebook từ ${formatTime(
                            +data.joinTimeFacebok
                        )} `}</span>
                    </div>
                    <div className="flex items-center pt-2">
                        <ImHome3 className="text-gray-500 text-[20px] mr-3" />
                        <span className="mr-1 ">
                            Sống tại{" "}
                            <span className=" font-medium">{data.address}</span>{" "}
                        </span>
                    </div>
                </div>
            </div>
            {context.width < 600 && (
                <div className="flex gap-3 justify-end w-full mt-2">
                    <div className="w-1/3 h-max">
                        <Button
                            _className={
                                "w-full h-max px-3 py-2 bg-blue-500 rounded-md hover:bg-blue-600 "
                            }
                        >
                            <span className="text-[15px] text-white font-semibold">
                                Phê duyệt
                            </span>
                        </Button>
                    </div>
                    <div className="w-1/3 h-max">
                        <Button
                            _className={
                                "w-full h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                        >
                            <span className=" text-[15px] font-semibold">
                                Từ chối
                            </span>
                        </Button>
                    </div>
                    <div ref={divRef} className="relative  h-max">
                        <Button
                            _className={
                                " h-max px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                            }
                            onClick={() => setShowModal(!showModal)}
                        >
                            <HiOutlineDotsHorizontal className="text-[23px]" />
                        </Button>
                        {showModal && (
                            <div
                                style={{
                                    boxShadow: "0px 1px 2px 1px #ccc",
                                }}
                                className=" absolute top-[100%] right-0 flex flex-col w-[310px] p-2 rounded-lg bg-white z-10 "
                            >
                                <Button
                                    _className={
                                        "text-left p-2  rounded  hover:bg-gray-200"
                                    }
                                    onClick={() => setShowModal(false)}
                                >
                                    <span className=" text-[15px] font-medium ">
                                        {`Nhắn tin cho ${data.name}`}
                                    </span>
                                </Button>
                                <Button
                                    _className={
                                        "text-left p-2  rounded  hover:bg-gray-200"
                                    }
                                    onClick={() => setShowModal(false)}
                                >
                                    <span
                                        className=" text-[15px] font-medium "
                                        onClick={() => setShowModal(false)}
                                    >
                                        Xem trang cá nhân
                                    </span>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Item;
