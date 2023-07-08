import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMess } from "../../../../../redux/actions/openMessList";
import { formatTime } from "../../../../../Hooks/useFormat";
import { ScreenSize } from "../../../../../App";
import Button from "../../../../../Components/Button";
import { BsMessenger } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";
function Member({
    id,
    avt,
    name,
    admin = false,
    address,
    isFriend = false,
    time,
    hideButton = false,
}) {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const context = useContext(ScreenSize);
    return (
        <div className="flex justify-between pt-3">
            <div className="flex h-full">
                <div className="">
                    <img
                        className="h-[60px] w-[60px] rounded-full border"
                        src={avt}
                        alt=""
                    />
                </div>
                <div className="flex flex-col justify-between ml-2 ">
                    <Link
                        to={`/group/${groupId}/user/${id}`}
                        className=" hover:underline"
                    >
                        <span className=" font-medium">{name}</span>
                    </Link>
                    {admin && (
                        <span className="w-max p-1  rounded bg-blue-100  text-blue-500 text-[13px] leading-[1]">
                            Quản trị viên
                        </span>
                    )}
                    {time && (
                        <span className=" text-[13px] font-medium text-gray-500">
                            Đã tham gia {formatTime(time)}
                        </span>
                    )}
                    <span className=" text-[13px]">{address}</span>
                </div>
            </div>
            {!hideButton && (
                <div className="my-auto">
                    {isFriend ? (
                        <Button
                            _className={
                                "flex items-center p-2 rounded-md sm:bg-gray-200 sm:hover:bg-gray-300"
                            }
                            onClick={() => dispatch(addMess(id, avt, name))}
                        >
                            <BsMessenger className=" text-gray-600 sm:text-gray-700 mr-1 sm:mr-0" />
                            {context.width >= 640 && (
                                <span className=" ml-1 font-medium">
                                    Nhắn tin
                                </span>
                            )}
                        </Button>
                    ) : (
                        <Button
                            _className={
                                "flex items-center p-2 rounded-md sm:bg-gray-200 sm:hover:bg-gray-300"
                            }
                        >
                            <FaUserPlus className=" text-[20px] text-gray-600 sm:text-gray-700" />
                            {context.width >= 640 && (
                                <span className=" ml-2 font-medium">
                                    Thêm bạn bè
                                </span>
                            )}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Member;
