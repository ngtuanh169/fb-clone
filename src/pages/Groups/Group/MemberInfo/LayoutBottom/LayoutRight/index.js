import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import postsApi from "../../../../../../api/postsApi";
import { GroupContext } from "../../../GroupProvider";
import MainCard from "../../../../../../Components/MainCard";
import Posts from "../../../../../../Components/Posts";
import PostsLoading from "../../../../../../Components/PostsLoading";
function LayoutRight() {
    const { groupId, userId } = useParams();
    const { groupData } = useContext(GroupContext);
    const [postsList, setPostsList] = useState([]);
    const [payload, setPayload] = useState({
        limit: 6,
        page: 1,
        groupId,
        userId,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const params = { ...payload, lastId };
                const res = await postsApi.getPostsGroupByUserId(params);
                if (res.success && res.count && res.data) {
                    const length = res.data.length;
                    setPostsList([...postsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setLastId(res.data[length - 1].id);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        userId > 0 && !loading && payload.page <= totalPage && getPosts();
    }, [payload]);

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
        <div className="flex flex-col w-full">
            <div className="w-full">
                <MainCard>
                    <span className="block p-2 text-[18px] font-bold">
                        Bài viết trong nhóm
                    </span>
                </MainCard>
            </div>
            {postsList.length > 0 &&
                postsList.map((item) => (
                    <Posts
                        key={item.id}
                        data={item}
                        adminId={groupData.adminId}
                    />
                ))}
            {loading && <PostsLoading />}
            {!loading && postsList.length == 0 && (
                <span className=" mx-auto mb-4 font-bold text-[20px] text-gray-500">
                    Không có bài viết nào
                </span>
            )}
        </div>
    );
}

export default LayoutRight;
