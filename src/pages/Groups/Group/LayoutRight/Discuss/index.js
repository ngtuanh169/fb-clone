import { useState, useRef, useContext } from "react";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../../App";
import InputBox from "../../../../../Components/InputBox";
import Button from "../../../../../Components/Button";
import Posts from "../../../../../Components/Posts";
import FilterPostsGruop from "../../../../../Components/Modal/FilterPostsGruop";
import PinnedPosts from "../Components/PinnedPosts";
import PostsId from "../Components/PostsId";
import Introduce from "../Components/Introduce";
import MediaFiles from "../Components/MediaFiles";
import { BsCaretDownFill } from "react-icons/bs";
import avatar from "../../../../../assets/images/avatar/avatar.jpg";
import { useParams } from "react-router-dom";
function Discuss() {
    const modalList = [
        {
            id: 1,
            name: "Nổi bật nhất",
            des: "Hiện thị bài viết nổi bật với lượt tương tác cao nhất",
        },
        {
            id: 2,
            name: "Bài viết mới",
            des: "Hiện thị bài viết gần đây đầu tiên",
        },
    ];
    const context = useContext(ScreenSize);
    const { postsNoti, newPostsSee } = useParams();
    const modalRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(modalList[0]);
    useClickOutSide(modalRef, () => setShowModal(false));
    return (
        <div className="flex">
            <div className="flex flex-col w-full mx-auto sm:w-[550px] xl:w-[600px]">
                <InputBox />
                <div className="">
                    <PinnedPosts />
                </div>
                {postsNoti && (
                    <div className="w-full">
                        <PostsId postsId={postsNoti} title={"Từ thông báo"} />
                    </div>
                )}
                {newPostsSee && (
                    <div className="w-full">
                        <PostsId postsId={newPostsSee} title={"Mới xem"} />
                    </div>
                )}
                <div ref={modalRef} className=" relative  px-2 pb-2">
                    <Button
                        _className={"flex items-center"}
                        onClick={() => setShowModal(!showModal)}
                    >
                        <span className=" font-medium mr-2 ">
                            {currentModal.name}
                        </span>
                        <BsCaretDownFill className="h-3 w-3" />
                    </Button>
                    {showModal && (
                        <div className=" absolute top-[85%] left-[2px]">
                            <FilterPostsGruop
                                modalList={modalList}
                                currentModal={currentModal}
                                setCurrentModal={setCurrentModal}
                                closeModal={() => setShowModal(false)}
                            />
                        </div>
                    )}
                </div>
                <div className="">
                    <Posts
                        userId={1}
                        avatar={avatar}
                        name={"Nguyen Tu Anh"}
                        time={1680840924949}
                        group={true}
                        adGroup={true}
                        groupId={1}
                        groupMember={true}
                        iconClose={false}
                    />
                </div>
            </div>
            {context.width >= 1440 && (
                <div className="flex-1 flex flex-col ml-4">
                    <Introduce />
                    <MediaFiles />
                </div>
            )}
        </div>
    );
}

export default Discuss;
