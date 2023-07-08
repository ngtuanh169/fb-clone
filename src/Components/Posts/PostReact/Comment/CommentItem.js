import { useState, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../Hooks/useFormat";
import { ValueContext } from "../../index";
import like from "../../../../assets/images/imgIcon/like.png";
import { AiFillLike } from "react-icons/ai";
function CommentInput({ avatar, name }) {
    const context = useContext(ValueContext);
    const [liked, setLiked] = useState(false);
    return (
        <div className="W-full flex p-2">
            <div className=" flex">
                <Link to={"/profile/1"}>
                    <img
                        style={{
                            width: context.pagePhoto ? "32px" : "40px",
                            height: context.pagePhoto ? "32px" : "40px",
                        }}
                        className="h-[40px] w-[40px] rounded-full mr-2"
                        src={avatar}
                        alt=""
                    />
                </Link>
                <div className="flex-1 flex flex-col">
                    <div className="flex flex-col p-2 rounded-xl bg-slate-100">
                        <Link
                            to={"/profile/1"}
                            className="block w-max leading-[1] hover:underline"
                        >
                            <span className=" font-medium text-[14px] ">
                                {name}
                            </span>
                        </Link>
                        <span className=" mt-1">
                            Cái này lúc còn cùi thi up từ từ đừng nhanh quá nó
                            dễ max
                        </span>
                    </div>
                    <div className=" relative flex px-2">
                        <span
                            className={`text-[14px] font-medium mr-3 ${
                                liked ? "text-blue-600" : ""
                            } cursor-pointer hover:underline`}
                            onClick={() => setLiked(!liked)}
                        >
                            Thích
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
                            {/* <img
                                className="h-5 w-5 object-cover object-center"
                                src={like}
                                alt=""
                            /> */}
                            <span className="ml-1 text-[13px] text-gray-600">
                                {formatNumber(1231)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentInput;
