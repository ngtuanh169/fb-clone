import { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../Hooks/useFormat";
import { ValueContext } from "../../index";
import Button from "../../../Button";
import CommentItem from "./CommentItem";
import PostInput from "../../PostsInput";
import { AiFillLike } from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
function Comment() {
    const context = useContext(ValueContext);
    const divRef = useRef();
    const [liked, setLiked] = useState(false);
    const [showInput, setShowInput] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [clientWidth, setClientWidth] = useState(0);
    const [commentList, setCommentList] = useState(0);
    const [maxList, setMaxList] = useState(5);
    useEffect(() => {
        divRef.current &&
            divRef.current.clientWidth &&
            setClientWidth(divRef.current.clientWidth);
    }, []);
    return (
        <div className="W-full flex flex-col p-2">
            <div className="flex flex-col w-full">
                <div className=" flex w-full ">
                    <div ref={divRef} className="flex flex-col w-max mr-2">
                        <Link to={"/profile/1"} className=" block w-max mb-1 ">
                            <img
                                style={{
                                    width: context.pagePhoto ? "32px" : "40px",
                                    height: context.pagePhoto ? "32px" : "40px",
                                }}
                                className=" rounded-full"
                                src={context.avatar}
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
                        <div className="flex flex-col w-full p-2 rounded-xl bg-slate-100">
                            <Link
                                className=" block w-max leading-[1] hover:underline"
                                to={"/profile/1"}
                            >
                                <span className=" font-medium text-[14px] ">
                                    {context.name}
                                </span>
                            </Link>
                            <span className="mt-1">
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
                            <div className="w-full px-2 mt-2">
                                <PostInput
                                    avatar={context.avatar}
                                    isFocus={isFocus}
                                    setIsFocus={setIsFocus}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full">
                {Array(commentList)
                    .fill(0)
                    .map((item, index) => (
                        <div key={index} className="flex">
                            <div
                                style={{ width: `${clientWidth}px` }}
                                className=" relative mr-2"
                            >
                                <div className=" absolute top-0 right-0 w-[50%] h-7 border-l-[2px] border-b-[2px] border-gray-200 rounded-bl-md"></div>
                                <div
                                    className={`w-[50%] h-full float-right border-l-[2px] ${
                                        index < maxList
                                            ? "border-gray-200"
                                            : "border-transparent"
                                    } `}
                                ></div>
                            </div>
                            <div className="flex-1">
                                <CommentItem
                                    avatar={context.avatar}
                                    name={context.name}
                                />
                            </div>
                        </div>
                    ))}
                {commentList < maxList && (
                    <div className="flex">
                        <div
                            style={{
                                width: context.pagePhoto ? "32px" : "40px",
                            }}
                            className=" relative mr-2"
                        >
                            <div className=" absolute top-0 right-0 w-[50%] h-[50%] border-l-[2px] border-b-[2px] border-gray-200 rounded-bl-md"></div>
                        </div>
                        <div className="flex items-center mt-2 w-max text-[14px] text-gray-700 cursor-pointer hover:underline">
                            <BsArrowReturnRight className="  " />
                            <span
                                className="ml-2 font-medium"
                                onClick={() => setCommentList(commentList + 3)}
                            >
                                {`Xem ${maxList - commentList} phản hồi`}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Comment;
