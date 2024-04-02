import { useContext, useEffect, useState } from "react";
import MainCard from "../../../../../../Components/MainCard";
import { GroupContext } from "../../../GroupProvider";
import postsApi from "../../../../../../api/postsApi";
import Posts from "../../../../../../Components/Posts";
import PostsLoading from "../../../../../../Components/PostsLoading";
function PostsId({ postsId, title = "" }) {
    const { groupData } = useContext(GroupContext);
    const [postsData, setPostsData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const res = await postsApi.getPostsById({ postsId });
                if (res.success && res.data) {
                    setPostsData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        postsId && getPosts();
    }, [postsId]);
    return (
        <div className="flex flex-col w-full">
            <div className="mb-4">
                <span className=" font-medium">{title}</span>
            </div>
            <div className="w-full max-w-[600px]">
                {!loading && postsData?.id && (
                    <Posts data={postsData} adminId={groupData.adminId} />
                )}
                {loading && <PostsLoading />}
            </div>
        </div>
    );
}

export default PostsId;
