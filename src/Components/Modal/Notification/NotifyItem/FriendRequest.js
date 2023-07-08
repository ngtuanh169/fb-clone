import { Link } from "react-router-dom";
import Button from "../../../Button";
import { formatTime } from "../../../../Hooks/useFormat";
function FriendRequest({ data, closeModal = () => {}, newNoti }) {
    return (
        <div className="flex p-2 pr-5 rounded-md ">
            <div className=" ">
                <div className="relative w-max">
                    <Link to={"/"} onClick={closeModal}>
                        <img
                            className="w-14 h-14 rounded-full border border-gray-500"
                            src={data.avt}
                            alt=""
                        />
                    </Link>
                    <i className=" absolute bottom-[-5px] right-[-5px] block h-7 w-7 bg-urlIcons4 bg-szIcons4 bg-userIcon4"></i>
                </div>
            </div>
            <div className="flex-1 flex flex-col ml-3 leading-[1.333]">
                <span className=" text-[15px] text-gray-600 line-clamp-3">
                    <Link
                        className=" font-semibold hover:underline "
                        to={"/"}
                        onClick={closeModal}
                    >
                        {data.userName}
                    </Link>{" "}
                    đã gửi cho bạn lời mời kết bạn.
                </span>
                <span
                    className={`text-[13px] ${
                        newNoti ? "text-blue-500" : "text-gray-600"
                    }`}
                >
                    {formatTime(+data.time)}
                </span>
                <div className="flex mt-1">
                    <Button
                        _className={
                            "flex justify-center items-center w-[108px] h-9 bg-blue-600 rounded-md hover:bg-blue-700"
                        }
                    >
                        <span className="text-[15px] text-white font-medium">
                            Xác nhận
                        </span>
                    </Button>
                    <Button
                        _className={
                            "flex justify-center items-center w-[108px] h-9 ml-3 bg-gray-300 rounded-md hover:bg-gray-400"
                        }
                    >
                        <span className="text-[15px] font-medium">Xóa</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FriendRequest;
