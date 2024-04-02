import { useState, useEffect } from "react";
import postsApi from "../../../api/postsApi";
import Stories from "../Components/Stories";
import InputBox from "../../../Components/InputBox";
import Posts from "../../../Components/Posts";
import PostsLoading from "../../../Components/PostsLoading";
function LayoutContent() {
    const [payload, setPayload] = useState({
        limit: 12,
        page: 1,
        orderBy: "DESC",
    });
    const [totalPage, setTotalPage] = useState(1);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [postsList, setPostsList] = useState([]);
    useEffect(() => {
        const get_posts = async () => {
            try {
                setLoading(true);
                const params = { ...payload, firstId, lastId };
                const res = await postsApi.getAll(params);
                if (res.success && res.count > 0 && res.data) {
                    const lengthArr = res.data.length;
                    setPostsList([...postsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    setLastId(res.data[lengthArr - 1].id);
                    payload.page == 1 && setFirstId(res.data[0].id);
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        payload.page <= totalPage && !loading && get_posts();
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
        <div className=" w-full max-w-[500px] sm:max-w-none sm:w-[500px] 2xl:w-[600px] min-h-screen ">
            <Stories />
            <InputBox postsList={postsList} setPostList={setPostsList} />
            {postsList.length > 0 &&
                postsList.map((item) => <Posts key={item.id} data={item} />)}
            {loading &&
                Array(2)
                    .fill(0)
                    .map((item, index) => <PostsLoading key={index} />)}
        </div>
    );
}

export default LayoutContent;
