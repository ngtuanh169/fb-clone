import { useState, useRef } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import { formatNumber } from "../../../Hooks/useFormat";
import MainCard from "../../MainCard";
import Button from "../../Button";
import { FaUserPlus, FaUserLock, FaRegUserCircle } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import friend from "../../../assets/images/imgIcon/friend.png";
import home from "../../../assets/images/imgIcon/home.png";
import signal from "../../../assets/images/imgIcon/signal.png";
function HoverInfoUser({ id, avt, name, numberFriends, address, followers }) {
    const listInfo = [
        { id: 1, icon: friend, text: `${formatNumber(numberFriends)} bạn bè` },
        { id: 2, icon: home, text: `Sống tại ${address}` },
        {
            id: 3,
            icon: signal,
            text: `Có ${formatNumber(followers)} người theo dõi`,
        },
    ];
    const modalRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    useClickOutSide(modalRef, () => setOpenModal(false));
    return (
        <div className="w-[400px] p-2">
            <MainCard>
                <div className="flex flex-col w-full h-full p-3 ">
                    <div className="flex px-3">
                        <div className="flex justify-center items-center">
                            <img
                                className="w-[100px] h-[100px] rounded-full"
                                src={avt}
                                alt=""
                            />
                        </div>
                        <div className="flex-1 ml-3">
                            <div className="w-full mb-2">
                                <span className="text-[18px] font-bold">
                                    {name}
                                </span>
                            </div>
                            {listInfo.length > 0 &&
                                listInfo.map((item) => (
                                    <div
                                        key={item.id}
                                        className="w-full flex mb-1"
                                    >
                                        <img
                                            className="w-[20px] h-[20px] opacity-60 "
                                            src={item.icon}
                                            alt=""
                                        />
                                        <span className="ml-2">
                                            {item.text}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="flex justify-between mt-2">
                        <div className="">
                            <Button
                                _className={
                                    "w-[150px] flex items-center justify-center py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                            >
                                <FaUserPlus />
                                <span className="ml-1 font-semibold">
                                    Thêm bạn bè
                                </span>
                            </Button>
                        </div>
                        <div className="">
                            <Button
                                _className={
                                    "w-[150px] flex items-center justify-center py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                                }
                            >
                                <BsMessenger />
                                <span className=" ml-1 font-semibold">
                                    Nhắn tin
                                </span>
                            </Button>
                        </div>
                        <div ref={modalRef}>
                            <Button
                                _className={
                                    "relative h-full py-2 px-3 rounded-md bg-gray-200 hover:bg-gray-300"
                                }
                                onClick={() => setOpenModal(!openModal)}
                            >
                                {openModal && (
                                    <div className=" absolute left-0 bottom-[-110px] w-[220px] px-1">
                                        <MainCard>
                                            <Button
                                                _className={
                                                    "flex items-center p-2 rounded-md hover:bg-hover"
                                                }
                                                onClick={() =>
                                                    setOpenModal(false)
                                                }
                                            >
                                                <FaUserLock className="text-[20px]" />
                                                <span className="ml-2 font-semibold">
                                                    Chặn
                                                </span>
                                            </Button>
                                            <Button
                                                to={"/"}
                                                _className={
                                                    "flex items-center p-2 rounded-md hover:bg-hover"
                                                }
                                            >
                                                <FaRegUserCircle className="text-[20px]" />
                                                <span className="ml-2 font-semibold">
                                                    Xem trang cá nhân
                                                </span>
                                            </Button>
                                        </MainCard>
                                    </div>
                                )}

                                <HiDotsHorizontal />
                            </Button>
                        </div>
                    </div>
                </div>
            </MainCard>
        </div>
    );
}

export default HoverInfoUser;
