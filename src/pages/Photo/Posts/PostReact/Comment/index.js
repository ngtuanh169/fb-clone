import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../../Hooks/useFormat";
import CommentItem from "./CommentItem";
import PostInput from "../PostInput";
import { AiFillLike } from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
function Comment({ avatar, name }) {
    const divRef = useRef();
    const [liked, setLiked] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [clientWidth, setClientWidth] = useState(0);
    useEffect(() => {
        divRef.current &&
            divRef.current.clientWidth &&
            setClientWidth(divRef.current.clientWidth);
    }, []);
    return (
        <div className="W-full flex flex-col p-2">
            <div className="flex flex-col">
                <div className=" flex  ">
                    <div ref={divRef} className="flex flex-col mr-2">
                        <Link to={"/"} className=" block mb-1 ">
                            <img
                                className="h-[32px] w-[32px] rounded-full"
                                src={avatar}
                                alt=""
                            />
                        </Link>
                        <div className="flex-1">
                            <div className="flex h-full">
                                <div className="w-[50%]"></div>
                                <div className="w-[50%] border-l-[2px] border-gray-200"></div>
                            </div>
                        </div>
                    </div>
                    <div className=" flex-1 flex flex-col">
                        <div className="flex flex-col p-2 rounded-xl bg-slate-100">
                            <Link
                                className=" leading-[1] hover:underline"
                                to={"/"}
                            >
                                <span className=" font-medium text-[14px] ">
                                    {name}
                                </span>
                            </Link>
                            <span className="">
                                Cái này lúc còn cùi thi up từ từ đừng nhanh quá
                                nó dễ max
                            </span>
                        </div>
                        <div className=" relative flex px-2">
                            <span
                                className={`text-[14px] font-medium mr-3 ${
                                    liked ? "text-blue-600" : ""
                                } cursor-pointer hover:underline`}
                                onClick={() => {
                                    setLiked(!liked);
                                }}
                            >
                                Thích
                            </span>
                            <span
                                className="text-[14px] font-medium mr-3 cursor-pointer hover:underline"
                                onClick={() => {
                                    setShowInput(true);
                                    setIsFocus(true);
                                }}
                            >
                                Phản hồi
                            </span>
                            <span className="text-[13px] text-gray-500">
                                5 phút
                            </span>
                            <div
                                className="absolute bottom-[4px] right-[20px] flex justify-between items-center
                                bg-white p-[2px] rounded-full drop-shadow-shadow012"
                            >
                                <span
                                    className="flex justify-between items-center h-5 w-5 rounded-full
                                    bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300  "
                                >
                                    <AiFillLike className=" text-[11px] text-white m-auto" />
                                </span>
                                <span className="ml-1 text-[13px] text-gray-600">
                                    {formatNumber(1)}
                                </span>
                            </div>
                        </div>
                        {showInput && (
                            <div className="px-2 mt-2">
                                <PostInput
                                    avatar={avatar}
                                    isFocus={isFocus}
                                    setIsFocus={setIsFocus}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full">
                {Array(2)
                    .fill(0)
                    .map((item, index) => (
                        <div key={index} className="flex">
                            <div
                                style={{ width: `${clientWidth}px` }}
                                className=" relative mr-2"
                            >
                                <div className=" absolute top-0 right-0 w-[50%] h-7 border-l border-b-[2px] border-gray-200 rounded-bl-md"></div>
                                <div className="w-[50%] h-full float-right border-l-[2px] border-gray-200"></div>
                            </div>
                            <div className="flex-1">
                                <CommentItem avatar={avatar} name={name} />
                            </div>
                        </div>
                    ))}

                <div className="flex">
                    <div className=" relative w-10 mr-2">
                        <div className=" absolute top-0 right-0 w-[50%] h-[50%] border-l-[2px] border-b-[2px] border-gray-200 rounded-bl-md"></div>
                    </div>
                    <div className="flex items-center mt-2 w-max text-[14px] text-gray-700 cursor-pointer hover:underline">
                        <BsArrowReturnRight className="  " />
                        <span className="ml-2 font-medium">
                            Xem 10 phản hồi
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
