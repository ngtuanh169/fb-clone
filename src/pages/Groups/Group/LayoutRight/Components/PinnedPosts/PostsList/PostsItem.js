import { Link, useParams } from "react-router-dom";
import {
    formatTime,
    formatNumberK,
    formatAvatar,
} from "../../../../../../../Hooks/useFormat";
import Button from "../../../../../../../Components/Button";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import like from "../../../../../../../assets/images/imgIcon/icon-like.png";
import noLike from "../../../../../../../assets/images/imgIcon/noLike.png";
import img from "../../../../../../../assets/images/avatar/avatar.jpg";
function PostsItem({ data }) {
    const { groupId } = useParams();
    return (
        <div
            style={{ boxShadow: " 0 0 10px #ccc" }}
            className="w-[250px] sm:w-[300px] rounded-lg overflow-hidden"
        >
            <Link
                to={`/group/${groupId}/remarkable`}
                className="flex flex-col w-full h-[350px]  hover:bg-gray-100"
            >
                <div className="flex p-3">
                    <div className="">
                        <img
                            className="w-10 h-10 rounded-full border"
                            src={formatAvatar(data.userAvt, data.userSx)}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col ml-2 leading-[1]">
                        <div className="pb-1">
                            <span className=" font-semibold">
                                {data.userName}
                            </span>
                        </div>
                        <span className="text-[13px]">
                            {formatTime(data.createdAt)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full h-[310px] overflow-hidden ">
                    <div className=" px-3 ">
                        <span className="line-clamp-1">{data.content}</span>
                    </div>
                    <div className="flex-1 w-full">
                        <img
                            className="w-full h-full object-cover"
                            src={img}
                            alt=""
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center px-3">
                    <div className="flex justify-between items-center h-[40px] py-2 border-b">
                        {data.countLikes > 0 && (
                            <div className="flex items-center">
                                <span
                                    className=" flex justify-between items-center h-5 w-5 
                                        bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300 rounded-full "
                                >
                                    <AiFillLike className="text-[13px] text-white m-auto " />
                                </span>
                                <span className="ml-1 text-[13px]">
                                    {formatNumberK(data.countLikes)}
                                </span>
                            </div>
                        )}
                        {data.countComments > 0 && (
                            <div className="">
                                <span className="text-[13px]">
                                    {formatNumberK(data.countComments > 0)}
                                </span>
                                <span className="ml-1 text-[13px]">
                                    bình luận
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 justify-between py-1 ">
                        <div className="w-1/2">
                            <Button
                                _className={`w-full h-[32px] flex items-center justify-center rounded-md `}
                            >
                                <img
                                    className="w-[15px] h-[15px]"
                                    src={data.liked ? like : noLike}
                                />
                                <span
                                    className={`ml-1 text-[13px] font-medium ${
                                        data.liked ? "text-blue-500" : ""
                                    }`}
                                >
                                    Thích
                                </span>
                            </Button>
                        </div>
                        <div className="w-1/2">
                            <Button
                                _className={
                                    "w-full h-[32px] flex items-center justify-center rounded-md "
                                }
                            >
                                <FaRegCommentDots />
                                <span className="ml-1 text-[13px] font-medium">
                                    Bình luận
                                </span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostsItem;
