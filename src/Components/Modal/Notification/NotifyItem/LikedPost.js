import { Link } from "react-router-dom";
import { formatTime } from "../../../../Hooks/useFormat";
import { AiFillLike } from "react-icons/ai";
import Button from "../../../Button";
function LikedPost({ data, closeModal = () => {}, newNoti }) {
    return (
        <Button
            to={
                data.groupId
                    ? `/group/${data.groupId}/postsNoti/${data.postsId}`
                    : `/profile/${data.userId}/posts/${data.postsId}`
            }
            _className="flex p-2 pr-5 rounded-md hover:bg-hover"
            onClick={closeModal}
        >
            <div className="">
                <div className=" relative">
                    <img
                        className="w-14 h-14 rounded-full border border-gray-500"
                        src={data.avt}
                        alt=""
                    />
                    <span
                        className=" absolute bottom-[-5px] right-[-5px] flex justify-between items-center h-7 w-7
                         bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300 rounded-full "
                    >
                        <AiFillLike className=" text-[17px] text-white m-auto" />
                    </span>
                </div>
            </div>
            <div className="flex-1 ml-3 leading-[1.333]">
                <span className=" text-[15px] text-gray-600 line-clamp-3 text-ellipsis">
                    <strong className=" font-semibold">{data.userName}</strong>{" "}
                    đã thích bài viết của bạn
                    {data.groupId && (
                        <>
                            <span className="ml-1">trong</span>
                            <strong className="mx-1 font-semibold">
                                {data.groupName}
                            </strong>
                        </>
                    )}
                    : Tặng ngẫu nhiên 50 bạn 20 lượng , 1 bạn may mắn nhất 7tr
                    xu
                </span>
                <span
                    className={`text-[13px] ${
                        newNoti ? "text-blue-500" : "text-gray-600"
                    }`}
                >
                    {formatTime(+data.time)}
                </span>
            </div>
        </Button>
    );
}

export default LikedPost;
