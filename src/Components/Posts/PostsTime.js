import { useContext } from "react";
import { Link } from "react-router-dom";
import { formatTime } from "../../Hooks/useFormat";
import Button from "../Button";
import { ValueContext } from "./index";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { HiLockClosed, HiUserGroup } from "react-icons/hi";
import { BsFillCaretRightFill } from "react-icons/bs";
function PostTime({ status = 1 }) {
    const context = useContext(ValueContext);

    return (
        <div className="flex justify-between p-2">
            <div className="flex">
                <img
                    className="w-[40px] h-[40px] rounded-full"
                    src={context.avatar}
                    alt=""
                />
                <div className="flex flex-col ml-2 leading-[1]">
                    <div className="flex items-center">
                        <Link
                            to={
                                context.groupId
                                    ? context.groupMember
                                        ? `/group/${context.groupId}/user/${context.userId}`
                                        : `/group/:groupId/post/2`
                                    : "/profile"
                            }
                        >
                            <span className="text-[15px] font-semibold hover:underline">
                                {context.name}
                            </span>
                        </Link>
                        {context.groupName && (
                            <>
                                <BsFillCaretRightFill className="mx-1" />
                                <Link
                                    to={`/group/${context.groupId}`}
                                    className="flex-1 text-[15px] font-semibold line-clamp-1 hover:underline"
                                >
                                    {context.groupName}
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="flex items-center mt-1">
                        {context.adGroup && (
                            <span className="p-1 mr-2 rounded-md text-[13px] text-blue-500 bg-blue-100">
                                Quản trị viên
                            </span>
                        )}
                        <span className=" text-xs">
                            {formatTime(context.time)}
                        </span>
                        {!context.group && (
                            <Button
                                _className={
                                    "flex justify-center items-center h-5 w-5 ml-2 rounded-full hover:bg-hover "
                                }
                            >
                                {+status === 0 && (
                                    <GiWorld className="  text-[14px] text-gray-500" />
                                )}
                                {+status === 1 && (
                                    <HiLockClosed className="  text-[14px] text-gray-500" />
                                )}
                            </Button>
                        )}
                        {context.group && (
                            <Button
                                _className={
                                    "flex justify-center items-center h-5 w-5 ml-2 rounded-full cursor-default "
                                }
                                hoverText={`Thành viên nhóm ${context.groupName}`}
                            >
                                <HiUserGroup className="text-[14px] text-gray-500" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <Button _className="h-[36px] w-[36px] rounded-full text-[20px] text-gray-500 cursor-default ">
                    <BiDotsHorizontalRounded className=" mx-auto" />
                </Button>
                {/* {!context.iconClose && !context.showModal && (
                    <Button _className=" h-[36px] w-[36px] rounded-full text-2xl text-gray-500 hover:bg-hover">
                        <MdClose className=" mx-auto" />
                    </Button>
                )} */}
            </div>
        </div>
    );
}

export default PostTime;
