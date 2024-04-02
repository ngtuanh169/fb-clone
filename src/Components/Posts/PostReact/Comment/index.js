import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    formatAvatar,
    formatNumber,
    formatTimestamp,
} from "../../../../Hooks/useFormat";
import commentApi from "../../../../api/commentApi";
import { ValueContext } from "../../index";
import LoadingCircleLine from "../../../LoadingCircleLine";
import Button from "../../../Button";
import CommentItem from "./CommentItem";
import PostInput from "../../PostsInput";
import UsersLiked from "./Components/UsersLiked";
import { AiFillLike } from "react-icons/ai";
import { BsArrowReturnRight } from "react-icons/bs";
function Comment({ data }) {
    const { adminId } = useContext(ValueContext);
    const [liked, setLiked] = useState(data.liked);
    const [showInput, setShowInput] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [maxList, setMaxList] = useState(data.countFeedback);
    const [commentList, setCommentList] = useState([]);
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        orderBy: "ASC",
        parentId: data.id,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [countLikes, setCountLikes] = useState(data.countLikes);
    const [showModal, setShowModal] = useState(false);

    const getComments = async (payload, commentList = []) => {
        try {
            setLoading(true);
            const res = await commentApi.getCommentsChild(payload);
            if (res.success && res.count > 0) {
                const newArray =
                    payload.orderBy == "ASC"
                        ? commentList.filter((item) => !item?.fake)
                        : commentList;
                setPayload({ ...payload, page: payload.page + 1 });
                setMaxList(res.count);
                setCommentList([...newArray, ...res.data]);
                setTotalPage(Math.ceil(res.count / payload.limit));
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const likeComment = async (commentId) => {
        try {
            setLoading1(true);
            setLiked(true);
            setCountLikes((prev) => prev + 1);
            const params = new FormData();
            params.append("commentId", commentId);
            const res = await commentApi.likeComment(params);
            setTimeout(() => {
                setLoading1(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };
    const unlikeComment = async (commentId) => {
        try {
            setLoading1(true);
            setLiked(false);
            setCountLikes((prev) => prev - 1);
            const params = new FormData();
            params.append("commentId", commentId);
            const res = await commentApi.unlikeComment(params);
            setTimeout(() => {
                setLoading1(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {showModal && (
                <UsersLiked
                    commentId={data.id}
                    countLikes={countLikes}
                    setCountLikes={setCountLikes}
                    closeModal={() => setShowModal(false)}
                />
            )}
            <div className=" relative flex flex-col w-full z-10">
                {(maxList > 0 || showInput) && (
                    <div className=" absolute top-0 left-0 flex justify-end w-10 h-full z-10">
                        <div className="w-[20px] h-full border-l-2 border-gray-200"></div>
                    </div>
                )}
                <div className="flex w-full">
                    <div className="flex flex-col w-10 h-full pb-2 bg-white z-20">
                        <div className="h-full w-10 border rounded-full overflow-hidden">
                            <img
                                src={formatAvatar(data.userAvt, data.userSx)}
                                alt=""
                            />
                        </div>
                        <div className="flex-1"></div>
                    </div>
                    <div
                        style={{
                            maxWidth: "calc(100% - 40px)",
                        }}
                        className="grow flex pl-2"
                    >
                        <div className="grow-0 max-w-full flex flex-col ">
                            <div className="flex flex-col max-w-full py-2 px-3 rounded-2xl bg-[#f0f2f5]">
                                <div className="flex items-center gap-2 max-w-full">
                                    <Link
                                        to={"/"}
                                        className=" text-[14px] font-medium hover:underline"
                                    >
                                        <span>{data.userName}</span>
                                    </Link>
                                    {adminId == data.userId && (
                                        <span
                                            className="p-1 rounded-md text-[13px] font-normal leading-[13px] text-blue-500
                                            bg-blue-100"
                                        >
                                            Quản trị viên
                                        </span>
                                    )}
                                </div>
                                <div className="max-w-full">
                                    <span className=" font-normal text-[15px] break-words">
                                        {data.content}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 max-w-full px-3 mt-1">
                                <Button
                                    _className={` ${
                                        liked ? "text-blue-600" : ""
                                    } hover:underline`}
                                    onClick={() =>
                                        liked
                                            ? !loading1 &&
                                              unlikeComment(data.id)
                                            : !loading1 && likeComment(data.id)
                                    }
                                >
                                    <span className="text-[13px] font-semibold  ">
                                        Thích
                                    </span>
                                </Button>
                                <Button
                                    _className={"hover:underline"}
                                    onClick={() => {
                                        setShowInput(true);
                                        setIsFocus(true);
                                    }}
                                >
                                    <span className="text-[13px] font-semibold ">
                                        Phản hồi
                                    </span>
                                </Button>
                                <span className="text-[13px] ">
                                    {formatTimestamp(data.createdAt)}
                                </span>
                                {countLikes > 0 && (
                                    <Button
                                        _className={`flex justify-between items-center p-[1px] rounded-full
                                        drop-shadow-shadow012 hover:bg-gray-100`}
                                        onClick={() => setShowModal(true)}
                                    >
                                        <span
                                            className="flex items-center justify-center h-5 w-5 mr-1 rounded-full
                                            bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300"
                                        >
                                            <AiFillLike className="text-white text-[11px]" />
                                        </span>
                                        <span className="text-[13px]">
                                            {formatNumber(countLikes)}
                                        </span>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {commentList.length > 0 &&
                    commentList.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex w-full ${
                                index == maxList - 1 && !showInput
                                    ? "bg-white z-20"
                                    : ""
                            } `}
                        >
                            <div className=" relative w-10 h-10">
                                <div
                                    className="absolute top-0 right-0 w-[50%] h-[70%] border-l-[2px] border-b-[2px] border-gray-200
                                        rounded-bl-md"
                                ></div>
                            </div>
                            <div
                                key={index}
                                style={{ maxWidth: "calc(100% - 40px)" }}
                                className="grow"
                            >
                                <CommentItem data={item} />
                            </div>
                        </div>
                    ))}
                {maxList - (payload.page - 1) * payload.limit > 0 && (
                    <div
                        className={`flex w-full ${
                            showInput ? "" : "bg-white z-20"
                        }`}
                    >
                        <div className=" relative w-10 mr-2">
                            <div className=" absolute top-0 right-0 w-[50%] h-[50%] border-l-[2px] border-b-[2px] border-gray-200 rounded-bl-md"></div>
                        </div>
                        <Button
                            _className="flex items-center gap-2 mt-2 w-max text-[14px] text-gray-700 hover:underline"
                            onClick={() =>
                                !loading &&
                                payload.page <= totalPage &&
                                getComments(payload, commentList)
                            }
                        >
                            <BsArrowReturnRight className="  " />
                            <span className="font-medium">
                                {`Xem ${
                                    maxList - (payload.page - 1) * payload.limit
                                } phản hồi`}
                            </span>
                            {loading && (
                                <span className="block w-5 h-5">
                                    <LoadingCircleLine />
                                </span>
                            )}
                        </Button>
                    </div>
                )}
                {showInput && (
                    <div className="flex w-full bg-white z-20 ">
                        <div className=" relative w-10 h-10 ">
                            <div
                                className=" absolute top-0 right-0 w-[50%] h-[70%] border-l-[2px] border-b-[2px]
                                  border-gray-200 rounded-bl-md"
                            ></div>
                        </div>
                        <div
                            style={{ maxWidth: "calc(100% - 40px)" }}
                            className=" grow w-full px-2 mt-2"
                        >
                            <PostInput
                                isFocus={isFocus}
                                setIsFocus={setIsFocus}
                                parentId={data.id}
                                commentsList={commentList}
                                setCommentsList={setCommentList}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Comment;
