import { useState, useContext, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { formatAvatar, formatTime } from "../../Hooks/useFormat";
import { useClickOutSide } from "../../Hooks/useClickOutSide";
import Button from "../Button";
import People from "../Modal/People";
import ModalTool from "./Components/ModalTool";
import { ValueContext } from "./index";
import { GiWorld } from "react-icons/gi";
import {
    HiLockClosed,
    HiUserGroup,
    HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { BsDot } from "react-icons/bs";
import img from "../../assets/images/banner/banner.png";
function PostTime() {
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const { postsData, adminId } = useContext(ValueContext);
    const { groupId } = useParams();
    const [showIcon, setShowIcon] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalTool, setShowModalTool] = useState(false);
    useClickOutSide(divRef, () => setShowModalTool(false));
    useEffect(() => {
        if (postsData.userId === user.userId || user.userId === adminId) {
            setShowIcon(true);
        }
    }, []);
    return (
        <>
            {showModal && postsData.tagFriends?.length > 0 && (
                <People
                    users={postsData.tagFriends}
                    closeModal={() => setShowModal(false)}
                />
            )}
            <div className="flex justify-between w-full p-2">
                <div className="flex">
                    {postsData.groupId > 0 && !groupId ? (
                        <div className=" relative">
                            <Link to={`/group/${postsData.groupId}`}>
                                <img
                                    className="w-9 h-9 object-cover object-center rounded-md border"
                                    src={
                                        postsData.groupBanner
                                            ? postsData.groupBanner
                                            : img
                                    }
                                    alt="image"
                                />
                            </Link>
                            <Link
                                className="absolute right-[-4px] bottom-[-4px] w-[25px] h-[25px]"
                                to={`/group/${postsData.groupId}/user/${postsData.userId}`}
                            >
                                <img
                                    className=" w-full h-full object-cover object-center rounded-full border border-white"
                                    src={formatAvatar(
                                        postsData.userAvt,
                                        postsData.userSx
                                    )}
                                    alt=""
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className=" relative">
                            <Link
                                to={
                                    groupId
                                        ? `/group/${postsData.groupId}/user/${postsData.userId}`
                                        : `/profile/${postsData.userId}`
                                }
                            >
                                <img
                                    className="w-[40px] h-[40px] rounded-full border"
                                    src={formatAvatar(
                                        postsData.userAvt,
                                        postsData.userSx
                                    )}
                                    alt=""
                                />
                            </Link>
                            {postsData.statusLogin && (
                                <span
                                    className=" absolute block bottom-[1px] right-[1px] w-[10px] h-[10px]
                                 bg-green-500 rounded-full border-2 border-white"
                                ></span>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col ml-2 leading-[1]">
                        <div className="flex items-center">
                            {postsData.groupId > 0 && !groupId ? (
                                <Link to={`/group/${postsData.groupId}`}>
                                    <span className="text-[15px] font-semibold hover:underline">
                                        {postsData.groupName}
                                    </span>
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to={
                                            groupId
                                                ? `/group/${postsData.groupId}/user/${postsData.userId}`
                                                : `/profile/${postsData.userId}`
                                        }
                                    >
                                        <span className="text-[15px] font-semibold hover:underline">
                                            {postsData.userName}
                                        </span>
                                    </Link>
                                    {postsData.tagFriends?.length > 0 && (
                                        <>
                                            <span className=" mx-1 font-normal text-[14px] text-gray-500">
                                                cùng với
                                            </span>
                                            <span
                                                className="text-[15px] font-semibold cursor-pointer"
                                                onClick={() =>
                                                    setShowModal(true)
                                                }
                                            >
                                                {`${postsData.tagFriends.length} người khác`}
                                            </span>
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="flex items-center mt-1">
                            {postsData.groupId > 0 && !groupId && (
                                <>
                                    <Link
                                        to={`/group/${postsData.groupId}/user/${postsData.userId}`}
                                    >
                                        <span className="text-[13px] font-semibold text-gray-600 hover:underline">
                                            {postsData.userName}
                                        </span>
                                    </Link>
                                    <span className="text-[11px] text-gray-500">
                                        <BsDot />
                                    </span>
                                </>
                            )}
                            {adminId == postsData.userId && (
                                <>
                                    <span className="p-1 rounded-md text-[13px] font-normal leading-[13px] text-[#0866ff] bg-[#ebf5ff]">
                                        Quản trị viên
                                    </span>
                                    <span className="text-[11px] text-gray-500">
                                        <BsDot />
                                    </span>
                                </>
                            )}
                            <span className=" text-xs">
                                {formatTime(postsData.createdAt)}
                            </span>
                            <span className="text-[11px] text-gray-500">
                                <BsDot />
                            </span>
                            {groupId ? (
                                <HiUserGroup className=" text-[14px] text-gray-600 " />
                            ) : (
                                <span className="text-[14px] text-gray-500">
                                    {postsData.status == 0 && <GiWorld />}
                                    {postsData.status == 1 && <HiLockClosed />}
                                </span>
                            )}
                            {postsData.group && (
                                <Button
                                    _className={
                                        "flex justify-center items-center h-5 w-5 ml-2 rounded-full cursor-default "
                                    }
                                    hoverText={`Thành viên nhóm ${postsData.groupName}`}
                                >
                                    <HiUserGroup className="text-[14px] text-gray-500" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div ref={divRef} className=" relative w-max h-max z-20">
                    {showIcon && (
                        <Button
                            _className={`flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-200`}
                            onClick={() => setShowModalTool(!showModalTool)}
                        >
                            <HiOutlineDotsHorizontal className="text-[20px]" />
                        </Button>
                    )}
                    {showModalTool && (
                        <div className=" absolute top-[100%] right-0">
                            <ModalTool
                                closeModal={() => setShowModalTool(false)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default PostTime;
