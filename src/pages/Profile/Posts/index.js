import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import postsApi from "../../../api/postsApi";
import Posts from "../../../Components/Posts";
import LoadingCircleLine from "../../../Components/LoadingCircleLine";
function PostsId() {
    const { postsId } = useParams();
    const [postsData, setPostsData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const res = await postsApi.getPostsById({ postsId });
                if (res.success) {
                    setPostsData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        postsId > 0 && getPosts();
    }, [postsId]);
    return (
        <div className="w-full max-w-[500px] sm:max-w-none sm:w-[500px] md:w-[600px] mt-4 mx-auto">
            {loading ? (
                <div className="w-5 h-5 mx-auto">
                    <LoadingCircleLine />
                </div>
            ) : (
                <div className="w-full h-full">
                    {postsData.id > 0 && <Posts data={postsData} />}
                </div>
            )}
        </div>
    );
}

export default PostsId;
