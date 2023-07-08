import { useState } from "react";
import { formatNumberK } from "../../../../Hooks/useFormat";
import Button from "../../../../Components/Button";
import { AiTwotoneLike, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
function PostReactTop({ setIsFocus }) {
    const [isLike, setIsLike] = useState(false);
    return (
        <>
            <div className="w-full flex justify-between p-2 border-b border-gray-300">
                <div className="flex items-center">
                    <span
                        className=" flex justify-between items-center h-5 w-5
                            bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300 rounded-full "
                    >
                        <AiFillLike className=" text-[13px] text-white m-auto" />
                    </span>
                    <span className="ml-1 text-[15px] text-[#65676b]">
                        {formatNumberK(17199)}
                    </span>
                </div>
                <Button>
                    <span className="text-[15px] text-[#65676b] hover:underline">
                        {formatNumberK(119)} bình luận
                    </span>
                </Button>
            </div>
            <div className="w-full h-[40px] px-2 py-1 flex border-b border-gray-300">
                <div className="w-1/3  ">
                    <Button
                        _className={
                            "w-full h-full flex justify-center items-center rounded hover:bg-hover"
                        }
                        onClick={() => setIsLike(!isLike)}
                    >
                        <span className="flex items-center text-base font-semibold text-[#65676b]">
                            {isLike ? (
                                <AiTwotoneLike className="mr-1 text-xl text-blue-500" />
                            ) : (
                                <AiOutlineLike className="mr-1 text-xl " />
                            )}
                            Thích
                        </span>
                    </Button>
                </div>
                <div className="w-1/3  ">
                    <Button
                        _className={
                            "w-full h-full flex justify-center items-center rounded hover:bg-hover"
                        }
                        onClick={() => setIsFocus && setIsFocus(true)}
                    >
                        <span className="flex items-center text-base font-semibold text-[#65676b]">
                            <FaRegCommentDots className="mr-1 text-xl  " />
                            Bình luận
                        </span>
                    </Button>
                </div>
                <div className="w-1/3  ">
                    <Button
                        _className={
                            "w-full h-full flex justify-center items-center rounded hover:bg-hover"
                        }
                    >
                        <span className="flex items-center text-base font-semibold text-[#65676b]">
                            <RiShareForwardLine className="mr-1 text-xl " />
                            Chia sẻ
                        </span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default PostReactTop;
