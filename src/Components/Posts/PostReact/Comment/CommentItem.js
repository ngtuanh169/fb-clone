import { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
    formatAvatar,
    formatNumber,
    formatTimestamp,
} from "../../../../Hooks/useFormat";
import commentApi from "../../../../api/commentApi";
import { ValueContext } from "../../index";
import UsersLiked from "./Components/UsersLiked";
import Button from "../../../Button";
import { AiFillLike } from "react-icons/ai";
function CommentItem({ data = {} }) {
    const { groupId } = useParams();
    const { adminId } = useContext(ValueContext);
    const [liked, setLiked] = useState(data.liked);
    const [countLikes, setCountLikes] = useState(data.countLikes);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const likeComment = async (commentId) => {
        try {
            setLoading(true);
            setLiked(true);
            setCountLikes((prev) => prev + 1);
            const params = new FormData();
            params.append("commentId", commentId);
            const res = await commentApi.likeComment(params);
            setTimeout(() => {
                setLoading(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };
    const unlikeComment = async (commentId) => {
        try {
            setLoading(true);
            setLiked(false);
            setCountLikes((prev) => prev - 1);
            const params = new FormData();
            params.append("commentId", commentId);
            const res = await commentApi.unlikeComment(params);
            setTimeout(() => {
                setLoading(false);
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
            <div className="W-full">
                <div className=" flex w-full pt-2">
                    <div className="w-6 h-6">
                        <Link
                            to={
                                groupId
                                    ? `/group/${groupId}/user/${data.userId}`
                                    : `/profile/${data.userId}`
                            }
                            className="w-full h-full"
                        >
                            <img
                                className=" h-full w-full rounded-full "
                                src={formatAvatar(data.userAvt, data.userSx)}
                                alt=""
                            />
                        </Link>
                    </div>
                    <div
                        style={{
                            maxWidth: "calc(100% - 24px)",
                        }}
                        className="grow-0 flex flex-col pl-2"
                    >
                        <div className="flex flex-col p-2 rounded-xl bg-slate-100">
                            <div className="flex items-center gap-2 w-max-full">
                                <Link
                                    to={
                                        groupId
                                            ? `/group/${groupId}/user/${data.userId}`
                                            : `/profile/${data.userId}`
                                    }
                                    className="block leading-[1] hover:underline"
                                >
                                    <span className=" font-semibold text-[13px] ">
                                        {data.userName}
                                    </span>
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
                            <span className=" mt-1 font-normal break-words ">
                                {data.content}
                            </span>
                        </div>
                        <div className=" flex flex-wrap px-2 mt-1">
                            <span
                                className={`text-[13px] font-semibold mr-3 ${
                                    liked ? "text-blue-600" : ""
                                } cursor-pointer hover:underline`}
                                onClick={() =>
                                    liked
                                        ? !loading && unlikeComment(data.id)
                                        : !loading && likeComment(data.id)
                                }
                            >
                                Thích
                            </span>
                            <span className="mr-3 text-[13px] text-gray-500">
                                {formatTimestamp(data.createdAt)}
                            </span>
                            {countLikes > 0 && (
                                <Button
                                    _className="flex justify-between items-center p-[1px] rounded-full 
                                    drop-shadow-shadow012 hover:bg-gray-100"
                                    onClick={() => setShowModal(true)}
                                >
                                    <span
                                        className="flex justify-between items-center h-5 w-5 rounded-full
                                    bg-gradient-to-t from-blue-700 via-blue-600 to-blue-300  "
                                    >
                                        <AiFillLike className=" text-[11px] text-white m-auto" />
                                    </span>
                                    <span className="ml-1 text-[13px] text-gray-600">
                                        {formatNumber(countLikes)}
                                    </span>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CommentItem;
