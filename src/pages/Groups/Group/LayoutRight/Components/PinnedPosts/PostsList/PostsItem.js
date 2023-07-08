import { Link } from "react-router-dom";
import {
    formatTime,
    formatNumberK,
} from "../../../../../../../Hooks/useFormat";
import Button from "../../../../../../../Components/Button";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
function PostsItem({ data }) {
    return (
        <div
            style={{ boxShadow: " 0 0 10px #ccc" }}
            className="rounded-lg overflow-hidden"
        >
            <Link
                to={"/"}
                className="flex flex-col w-full h-[350px]  hover:bg-gray-100"
            >
                <div className="flex p-3">
                    <div className="">
                        <Link to={"/profile"}>
                            <img
                                className="w-10 h-10 rounded-full border"
                                src={data.avt}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div className="flex flex-col ml-2 leading-[1]">
                        <div className="pb-1">
                            <Link to={"/profile"} className="hover:underline">
                                <span className=" font-semibold">
                                    {data.name}
                                </span>
                            </Link>
                        </div>
                        <span className="text-[13px]">
                            {formatTime(data.time)}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col w-full h-[310px] overflow-hidden ">
                    <div className=" px-3">
                        <span className={`${data.image ? "line-clamp-1" : ""}`}>
                            {data.text}
                        </span>
                    </div>
                    {data.image && (
                        <div className="flex-1 w-full">
                            <img
                                className="w-full h-full object-cover"
                                src={data.image}
                                alt=""
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col px-3">
                    <div className="flex justify-between py-2 border-b">
                        <div className="flex items-center">
                            <span
                                className=" flex justify-between items-center h-5 w-5 
                                bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300 rounded-full "
                            >
                                <AiFillLike className="text-[13px] text-white m-auto " />
                            </span>
                            <span className="ml-1 text-[13px]">
                                {formatNumberK(data.likes)}
                            </span>
                        </div>
                        <div className="">
                            <span className="text-[13px]">
                                {formatNumberK(data.likes)}
                            </span>
                            <span className="ml-1 text-[13px]">bình luận</span>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-between py-1 ">
                        <div className="w-1/2">
                            <Button
                                _className={
                                    "w-full h-[32px] flex items-center justify-center rounded-md hover:bg-hover"
                                }
                            >
                                <AiOutlineLike />
                                <span className="ml-1 text-[13px]">Thích</span>
                            </Button>
                        </div>
                        <div className="w-1/2">
                            <Button
                                _className={
                                    "w-full h-[32px] flex items-center justify-center rounded-md hover:bg-hover"
                                }
                            >
                                <FaRegCommentDots />
                                <span className="ml-1 text-[13px]">
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
