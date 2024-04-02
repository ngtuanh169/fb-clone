import { useState, useRef, useEffect } from "react";
import { useClickOutSide } from "../../../Hooks/useClickOutSide";
import { formatAvatar, formatNumber } from "../../../Hooks/useFormat";
import profileIntroductionApi from "../../../api/profileIntroductionApi";
import friendsApi from "../../../api/friendsApi";
import MainCard from "../../MainCard";
import Button from "../../Button";
import SkeletonLoading from "../../SkeletonLoading";
import { FaUserPlus, FaUserLock, FaRegUserCircle } from "react-icons/fa";
import { BsMessenger } from "react-icons/bs";
import { HiDotsHorizontal } from "react-icons/hi";
import signal from "../../../assets/images/imgIcon/signal.png";
import { Link } from "react-router-dom";
function HoverInfoUser({ id, avt, name, sx, login }) {
    const modalRef = useRef();
    const [openModal, setOpenModal] = useState(false);
    const [followers, setFollowers] = useState(0);
    const [introductionList, setIntroductionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    useClickOutSide(modalRef, () => setOpenModal(false));
    // useEffect(() => {
    //     const countFollowers = async () => {
    //         try {
    //             setLoading(true);
    //             const params = { userId: id };
    //             const res = await friendsApi.countFriendsRequest(params);
    //             console.log(res);
    //             if (res.success) {
    //                 setFollowers(res.count);
    //             }
    //             // setLoading(false)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };
    //     id && countFollowers();
    // }, [id]);
    useEffect(() => {
        const getProfileIntroduction = async () => {
            try {
                setLoading2(true);
                const params = { userId: id };
                const res = await profileIntroductionApi.get(params);
                if (res?.length > 0) {
                    setIntroductionList(res);
                }
                setLoading2(false);
            } catch (error) {
                console.log(error);
            }
        };
        id && getProfileIntroduction();
    }, [id]);
    return (
        <div className="w-[400px] p-2">
            <MainCard>
                <div className="flex flex-col w-full h-full p-3 ">
                    <div className="flex px-3">
                        <div className=" relative flex justify-center items-center rounded-full ">
                            <Link
                                className="w-max h-max rounded-full"
                                to={`/profile/${id}`}
                            >
                                <img
                                    className="w-[100px] h-[100px] rounded-full border"
                                    src={formatAvatar(avt, sx)}
                                    alt=""
                                />
                            </Link>
                            {login && (
                                <span
                                    className=" absolute bottom-[5px] right-[8px] w-4 h-4 rounded-full
                                 bg-green-500 border-[3px] border-white"
                                ></span>
                            )}
                        </div>
                        <div className="flex-1 ml-3">
                            <div className="w-full mb-2">
                                <Link to={`/profile/${id}`}>
                                    <span className="text-[18px] font-bold">
                                        {name}
                                    </span>
                                </Link>
                            </div>
                            {/* {listInfo.length > 0 &&
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
                                ))} */}
                            <div className="flex items-center w-full mb-1">
                                {loading2 ? (
                                    <>
                                        <span className="block w-[20px] h-[20px] rounded-full overflow-hidden">
                                            <SkeletonLoading />
                                        </span>
                                        <span className="block w-[100px] h-5 ml-3 rounded-md overflow-hidden">
                                            <SkeletonLoading />
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <img
                                            className="w-[20px] h-[20px] opacity-50"
                                            src={signal}
                                            alt=""
                                        />
                                        <span className="ml-3">
                                            <span>Có</span>
                                            <Link
                                                to={`/profile/${id}/friends`}
                                                className="mx-1 font-medium hover:underline"
                                            >
                                                {`${formatNumber(
                                                    followers
                                                )} người`}
                                            </Link>
                                            <span>theo dõi</span>
                                        </span>
                                    </>
                                )}
                            </div>
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
