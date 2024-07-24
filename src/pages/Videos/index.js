import { useEffect, useState } from "react";
import postsApi from "../../api/postsApi";
import SubLayoutLeft from "../../Components/SubLayoutLeft";
import SearchSubLayout from "../../Components/Modal/SearchSubLayout";
import Posts from "../../Components/Posts";
import PostsLoading from "../../Components/PostsLoading";
function Videos() {
    const [postsList, setPostsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({ page: 1, limit: 10, text: "" });
    const [totalPages, setTotalPages] = useState(1);
    const [text, setText] = useState("");
    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const res = await postsApi.getPostsVideo({
                    ...payload,
                });
                setTimeout(() => {
                    if (res.success) {
                        setPostsList([...postsList, ...res.data]);
                        setTotalPages(Math.ceil(res.count / payload.limit));
                    }
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.log(error);
            }
        };
        totalPages >= payload.page && !loading && getPosts();
    }, [payload]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (text.trim() !== payload.text) {
                setPostsList([]);
                setTotalPages(1);
                setPayload({ ...payload, page: 1, text: text.trim() });
            }
        }, 500);
        return () => clearTimeout(timeId);
    }, [text]);

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
        <div className="flex">
            <div className="flex flex-col lg:flex-row w-full">
                <div className="">
                    <SubLayoutLeft name={"Watch"}>
                        <div className="mb-2 lg:mb-0">
                            <SearchSubLayout
                                nameInput="Tìm kiếm video"
                                text={text}
                                setText={setText}
                            />
                        </div>
                    </SubLayoutLeft>
                </div>
                <div className="flex-1 pt-5  ">
                    <div className="w-full sm:w-[550px] lg:w-[820px] mx-auto ">
                        {!loading && postsList.length === 0 && (
                            <span className=" block text-center font-medium text-gray-500">
                                Không tìm thấy bài viết phù hợp
                            </span>
                        )}
                        {postsList.length > 0 &&
                            postsList.map((item) => (
                                <Posts key={item.id} data={item} />
                            ))}
                        {loading && <PostsLoading />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Videos;
