import { useState, useRef, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useClickOutSide } from "../../../../../Hooks/useClickOutSide";
import { ScreenSize } from "../../../../../App";
import { GroupContext } from "../../GroupProvider";
import postsApi from "../../../../../api/postsApi";
import InputBox from "../../../../../Components/InputBox";
import Button from "../../../../../Components/Button";
import Posts from "../../../../../Components/Posts";
import PostsLoading from "../../../../../Components/PostsLoading";
import FilterPostsGruop from "../../../../../Components/Modal/FilterPostsGruop";
import PinnedPosts from "../Components/PinnedPosts";
import PostsId from "../Components/PostsId";
import Introduce from "../Components/Introduce";
import MediaFiles from "../Components/MediaFiles";
import { BsCaretDownFill, BsShieldLockFill } from "react-icons/bs";
function Discuss() {
    const modalList = [
        {
            id: 1,
            name: "Nổi bật nhất",
            des: "Hiện thị bài viết nổi bật với lượt tương tác cao nhất",
            orderBy: "HOT",
        },
        {
            id: 2,
            name: "Bài viết mới",
            des: "Hiện thị bài viết gần đây đầu tiên",
            orderBy: "DESC",
        },
    ];
    const context = useContext(ScreenSize);
    const { groupData } = useContext(GroupContext);
    const { postsNoti } = useParams();
    const modalRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const [currentModal, setCurrentModal] = useState(modalList[0]);

    const [postsList, setPostsList] = useState([]);
    const [payload, setPayload] = useState({
        limit: 3,
        page: 1,
        groupId: groupData.id,
        orderBy: modalList[0].orderBy,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    useClickOutSide(modalRef, () => setShowModal(false));
    useEffect(() => {
        const getPostsList = async () => {
            try {
                setLoading(true);
                const params = { ...payload, firstId, lastId };
                const res = await postsApi.getAll(params);
                if (res.success && res.count > 0) {
                    const length = res.data.length;
                    setPostsList([...postsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    payload.page == 1 && setFirstId(res.data[0].id);
                    setLastId(res.data[length - 1].id);
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        groupData.id && !loading && payload.page <= totalPage && getPostsList();
    }, [payload]);

    useEffect(() => {
        if (currentModal.orderBy !== payload.orderBy) {
            setPostsList([]);
            setTotalPage(1);
            setFirstId(0);
            setLastId(0);
            setPayload({ ...payload, page: 1, orderBy: currentModal.orderBy });
        }
    }, [currentModal.id]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight;
            const offsetHeight = document.documentElement.offsetHeight;
            const scrollTop = document.documentElement.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading && setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        !loading && window.addEventListener("scroll", handleScroll);
        return () =>
            !loading && window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    return (
        <>
            {groupData.status == 1 && !groupData.checkJoined ? (
                <div className="w-full p-2">
                    <div
                        className="flex flex-col items-center justify-center max-w-full w-[590px] h-[370px] 
                        mx-auto bg-white text-gray-500 rounded-lg"
                    >
                        <span>
                            <BsShieldLockFill className="text-[80px] " />
                        </span>
                        <span className="mt-2 font-bold text-[20px]">
                            Đây là nhóm riêng tư
                        </span>
                        <span className="mt-2 text-center">
                            Hãy tham gia nhóm này để xem hoặc cùng thảo luận
                            nhé.
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex">
                    <div className="flex flex-col w-full mx-auto sm:w-[550px] xl:w-[600px]">
                        {groupData.checkJoined && (
                            <InputBox
                                postsList={postsList}
                                setPostList={setPostsList}
                            />
                        )}
                        <div className="">
                            <PinnedPosts />
                        </div>
                        {postsNoti && (
                            <div className="w-full">
                                <PostsId
                                    postsId={postsNoti}
                                    title={"Từ thông báo"}
                                />
                            </div>
                        )}
                        <div
                            ref={modalRef}
                            className=" relative w-max px-2 pb-2 z-10"
                        >
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
                            {postsList.length > 0 &&
                                postsList.map((item, index) => (
                                    <Posts
                                        key={index}
                                        data={item}
                                        adminId={groupData.adminId}
                                        postsList={postsList}
                                        setPostsList={setPostsList}
                                    />
                                ))}
                            {loading && <PostsLoading />}
                            {!loading && postsList.length == 0 && (
                                <div className="w-full text-center">
                                    <span className=" font-bold text-[20px] text-gray-500">
                                        Không có bài đăng nào
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    {context.width >= 1440 && (
                        <div className="flex-1 flex flex-col ml-4">
                            <Introduce />
                            <MediaFiles />
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Discuss;
