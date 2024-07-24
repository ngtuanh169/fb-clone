import { useEffect, useState } from "react";
import { createContext } from "react";
import Modal from "../Modal";
import MainCard from "../MainCard";
import Button from "../Button";
import PostTime from "./PostsTime";
import PostsContent from "./PostsContent";
import PostsTools from "./PostsTools";
import PostsReact from "./PostReact";
import PostInput from "./PostsInput";

import { MdOutlineClose } from "react-icons/md";
import { BiHide } from "react-icons/bi";
export const ValueContext = createContext();
function Posts({
    data = {},
    adminId = 0,
    groupMember = false,
    iconClose = false,
    pagePhoto = false,
    pageProfile = false,
    postsList = [],
    setPostsList = () => {},
}) {
    const [postsData, setPostsData] = useState(data);
    const [isFocus, setIsFocus] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [commentsList, setCommentsList] = useState([]);
    const [hidePosts, setHidePosts] = useState(false);
    const valueContext = {
        postsData,
        setHidePosts,
        setPostsData,
        commentsList,
        setCommentsList,
        adminId,
        groupMember,
        iconClose,
        pagePhoto,
        pageProfile,
        showModal,
        setShowModal,
        postsList,
        setPostsList,
    };
    useEffect(() => {
        setCommentsList([]);
    }, [showModal]);
    useEffect(() => {
        setPostsData(data);
    }, [data.id]);
    return (
        <ValueContext.Provider value={valueContext}>
            {pagePhoto ? (
                <div className="w-full h-screen ">
                    <div className="px-2 pt-2">
                        <PostTime />
                    </div>
                    <PostsContent />
                    <div className="px-2 ">
                        <PostsTools setIsFocus={setIsFocus} />
                    </div>
                    <div className="px-2 pt-2">
                        <PostsReact />
                    </div>
                    <div className="px-2 py-2">
                        <PostInput
                            isFocus={isFocus}
                            setIsFocus={setIsFocus}
                            commentsList={commentsList}
                            setCommentsList={setCommentsList}
                        />
                    </div>
                </div>
            ) : (
                <MainCard>
                    {hidePosts ? (
                        <div className="flex justify-between items-center gap-4 w-full p-4">
                            <div className="">
                                <BiHide className="text-[20px]" />
                            </div>
                            <div className="flex flex-col grow">
                                <span className=" font-medium">Đã ẩn</span>
                                <span className="  text-[11px] text-gray-500 font-medium">
                                    Việc ẩn bài viết giúp Facebook cá nhân hóa
                                    Bảng feed của bạn.
                                </span>
                            </div>
                            <div className="">
                                <Button
                                    _className={
                                        "w-max p-2 bg-gray-200 rounded-md hover:bg-gray-300"
                                    }
                                    onClick={() => setHidePosts(false)}
                                >
                                    <span className=" font-medium">
                                        Hoàn tác
                                    </span>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full">
                            <div className="px-2 pt-2">
                                <PostTime />
                            </div>
                            <PostsContent />
                            <div className="px-2 ">
                                <PostsTools setIsFocus={setIsFocus} />
                            </div>
                        </div>
                    )}
                </MainCard>
            )}
            {showModal && (
                <Modal closeModal={() => setShowModal(false)}>
                    <div
                        className=" w-full sm:w-[500px] md:w-[700px] m-auto px-1"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div
                            className="flex flex-col w-full h-[680px] max-h-[80vh] md:max-h-[95vh]
                            rounded-lg bg-white shadow-lg shadow-gray-300 overflow-hidden"
                        >
                            <div
                                style={{ boxShadow: "0 .5px 0 #ccc" }}
                                className=" relative flex items-center justify-center w-full h-[60px] border-b "
                            >
                                <span className=" font-bold text-[20px]">{`Bài viết của ${data.userName}`}</span>
                                <div className=" absolute top-0 right-2 flex items-center h-full">
                                    <Button
                                        _className={
                                            "flex items-center justify-center h-9 w-9 bg-gray-200 rounded-full hover:bg-gray-300"
                                        }
                                        onClick={() => setShowModal(false)}
                                    >
                                        <MdOutlineClose className="text-[20px]" />
                                    </Button>
                                </div>
                            </div>
                            <div
                                className="w-full flex flex-col flex-1 overflow-x-hidden
                                    scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
                            >
                                <div className="px-2 pt-2">
                                    <PostTime />
                                </div>
                                <PostsContent />
                                <div className="px-2 ">
                                    <PostsTools setIsFocus={setIsFocus} />
                                </div>
                                <div className="px-2 pt-2">
                                    <PostsReact />
                                </div>
                            </div>
                            <div className=" w-full px-2 py-2 border-t">
                                <PostInput
                                    isFocus={isFocus}
                                    setIsFocus={setIsFocus}
                                    commentsList={commentsList}
                                    setCommentsList={setCommentsList}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </ValueContext.Provider>
    );
}

export default Posts;
