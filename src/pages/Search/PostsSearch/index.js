import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import postsApi from "../../../api/postsApi";
import Posts from "../../../Components/Posts";
import PostsLoading from "../../../Components/PostsLoading";
import Search from "..";
function PostsSearch() {
    const { text } = useParams();
    const [payload, setPayload] = useState({
        text,
        page: 1,
        limit: 5,
        orderBy: "HOT",
    });
    const [totalPage, setTotalPage] = useState(1);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);
    const [loading, setLoading] = useState(false);
    const [postsList, setPostsList] = useState([]);
    console.log(postsList);
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
        <Search>
            <div className="flex flex-col items-center w-full mt-8">
                {postsList.length === 0 && !loading && (
                    <div className="w-full sm:w-[600px] text-center">
                        <span className=" font-medium text-gray-500">
                            Không có kết quả trùng khớp
                        </span>
                    </div>
                )}
                {postsList.length > 0 &&
                    postsList.map((item) => (
                        <div key={item.id} className="w-full sm:w-[600px]">
                            <Posts data={item} />
                        </div>
                    ))}
                {loading && (
                    <div className="w-full sm:w-[600px]">
                        <PostsLoading />
                    </div>
                )}
            </div>
        </Search>
    );
}

export default PostsSearch;
