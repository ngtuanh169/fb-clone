import { useState, useContext } from "react";
import { ValueContext } from "./index";
import { formatNumberK } from "../../Hooks/useFormat";
import Button from "../../Components/Button";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import iconNoLike from "../../assets/images/imgIcon/noLike.png";
import like from "../../assets/images/imgIcon/like.png";
import iconLike from "../../assets/images/imgIcon/icon-like.png";
function PostsTools({ setIsFocus }) {
    const context = useContext(ValueContext);
    const [isLike, setIsLike] = useState(false);

    return (
        <>
            <div className="w-full flex justify-between p-2 border-b border-gray-300">
                <div className="flex items-center">
                    <img
                        className="h-[18px] w-[18px] object-cover object-center"
                        src={like}
                        alt=""
                    />
                    <span className="ml-1 text-[15px] text-[#65676b]">
                        {formatNumberK(17199)}
                    </span>
                </div>
                <Button
                    onClick={() =>
                        !context.showModal &&
                        !context.pagePhoto &&
                        context.setShowModal(true)
                    }
                >
                    <span className=" text-[15px] text-[#65676b] hover:underline">
                        {formatNumberK(119)} bình luận
                    </span>
                </Button>
            </div>
            <div className=" w-full h-[44px] px-2 py-1 flex border-b border-gray-300">
                <div className="w-1/3  ">
                    <Button
                        _className={
                            "relative group w-full h-full flex justify-center items-center rounded hover:bg-hover"
                        }
                        onClick={() => setIsLike(!isLike)}
                    >
                        <span
                            className={`flex items-center text-[15px] font-semibold ${
                                isLike ? "text-blue-500" : "text-[#65676b]"
                            } `}
                        >
                            {isLike ? (
                                <img
                                    className=" h-4 w-4 mr-1 object-contain animate-postsIcon"
                                    src={iconLike}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className=" h-4 w-4 mr-1 object-contain"
                                    src={iconNoLike}
                                    alt=""
                                />
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
                        onClick={() => {
                            !context.showModal &&
                                !context.pagePhoto &&
                                context.setShowModal(true);
                            setIsFocus && setIsFocus(true);
                        }}
                    >
                        <span className="flex items-center text-[15px] font-semibold text-[#65676b]">
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
                        <span className="flex items-center text-[15px] font-semibold text-[#65676b]">
                            <RiShareForwardLine className="mr-1 text-xl " />
                            Chia sẻ
                        </span>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default PostsTools;
