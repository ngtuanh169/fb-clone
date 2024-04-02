import { useState, useContext } from "react";
import { useSelector } from "react-redux";
import { ValueContext } from "./index";
import { formatNumberK } from "../../Hooks/useFormat";
import { SocketContext } from "../../Socket";
import postsApi from "../../api/postsApi";
import Button from "../../Components/Button";
import UsersLiked from "./Components/UsersLiked";
import { FaRegCommentDots } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import iconNoLike from "../../assets/images/imgIcon/noLike.png";
import like from "../../assets/images/imgIcon/like.png";
import iconLike from "../../assets/images/imgIcon/icon-like.png";
function PostsTools({ setIsFocus }) {
    const user = useSelector((state) => state.user);
    const socketContext = useContext(SocketContext);
    const { postsData, setPostsData, showModal, setShowModal, pagePhoto } =
        useContext(ValueContext);
    const [modalUsersLiked, setModalUsersLiked] = useState(false);
    const likePosts = async () => {
        try {
            setPostsData({
                ...postsData,
                countLikes: postsData.countLikes + 1,
                liked: true,
            });
            const params = { postsId: postsData.id };
            const res = await postsApi.likePosts(params);
            if (res.success && res.data) {
                const sendData = {
                    ...res.data,
                    senderId: user.userId,
                    senderName: `${user.fName} ${user.lName}`,
                    senderAvt: user.avatar,
                    senderSx: user.sx,
                };
                socketContext && socketContext.send(JSON.stringify(sendData));
            }
        } catch (error) {
            console.log(error);
        }
    };
    const unlikePosts = async () => {
        try {
            setPostsData({
                ...postsData,
                countLikes: postsData.countLikes - 1,
                liked: false,
            });
            const params = { postsId: postsData.id };
            const res = await postsApi.unlikePosts(params);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            {modalUsersLiked && (
                <UsersLiked closeModal={() => setModalUsersLiked(false)} />
            )}
            <div className="w-full flex justify-between p-2 border-b border-gray-300">
                <div className="flex items-center">
                    {postsData.countLikes > 0 && (
                        <span
                            className={`flex items-center gap-1 cursor-pointer hover:underline`}
                            onClick={() => setModalUsersLiked(!modalUsersLiked)}
                        >
                            <img
                                className="h-[18px] w-[18px] object-cover object-center"
                                src={like}
                                alt=""
                            />
                            {postsData.liked ? (
                                <span className="flex gap-1 font-normal">
                                    {postsData.countLikes > 1 ? (
                                        <>
                                            <span>Bạn, và</span>
                                            <span className=" text-[15px] text-[#65676b]">
                                                {formatNumberK(
                                                    postsData.countLikes - 1
                                                )}
                                            </span>
                                            <span>người khác</span>
                                        </>
                                    ) : (
                                        <span className="ml-1 text-[15px] text-[#65676b]">
                                            {`${user.fName} ${user.lName}`}
                                        </span>
                                    )}
                                </span>
                            ) : (
                                <span className="ml-1 text-[15px] text-[#65676b]">
                                    {formatNumberK(postsData.countLikes)}
                                </span>
                            )}
                        </span>
                    )}
                </div>
                {postsData.countComments > 0 && (
                    <Button
                        onClick={() =>
                            !showModal && !pagePhoto && setShowModal(true)
                        }
                    >
                        <span className=" text-[15px] text-[#65676b] hover:underline">
                            {formatNumberK(postsData.countComments)} bình luận
                        </span>
                    </Button>
                )}
            </div>
            <div className=" w-full h-[44px] px-2 py-1 flex border-b border-gray-300">
                <div className="w-1/3  ">
                    <Button
                        _className={
                            "relative group w-full h-full flex justify-center items-center rounded hover:bg-hover"
                        }
                        onClick={() =>
                            postsData.liked ? unlikePosts() : likePosts()
                        }
                    >
                        <span
                            className={`flex items-center text-[15px] font-semibold ${
                                postsData.liked
                                    ? "text-blue-500"
                                    : "text-[#65676b]"
                            } `}
                        >
                            {postsData.liked ? (
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
                            !showModal && !pagePhoto && setShowModal(true);
                            setIsFocus && setIsFocus(true);
                        }}
                    >
                        <span className="flex items-center text-[15px] font-semibold text-[#65676b]">
                            <FaRegCommentDots className="mr-1 text-xl  " />
                            Bình luận
                        </span>
                    </Button>
                </div>
                <div className="w-1/3 ">
                    <Button
                        _className={
                            "w-full h-full flex justify-center items-center rounded cursor-not-allowed hover:bg-hover"
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
