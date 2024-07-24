import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import postsApi from "../../api/postsApi";
import LoadingCircleLine from "../../Components/LoadingCircleLine";
import File from "./File";
import Posts from "../../Components/Posts";
import img from "../../assets/images/avatar/avatar.jpg";
import video from "../../assets/videos/video1.mp4";
function Photo() {
    const { postsId } = useParams();
    const [postData, setPostData] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getPosts = async () => {
            try {
                setLoading(true);
                const res = await postsApi.getPostsById({ postsId });
                if (res.success) {
                    setPostData(res.data);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && postsId && getPosts();
    }, [postsId]);
    // console.log(postData.files);
    return (
        <div className="flex flex-col lg:flex-row w-screen h-screen overflow-hidden">
            <div className="lg:flex-1 lg:h-screen h-[40vh] bg-black">
                {loading ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <div className="w-5 h-5">
                            <LoadingCircleLine />
                        </div>
                    </div>
                ) : (
                    <File files={postData.files} />
                )}
            </div>
            <div className="w-full h-[60vh] lg:w-[360px] lg:h-screen bg-white group  ">
                <div
                    className="w-full flex-1 h-full scrollbar-thin scrollbar-thumb-transparent scrollbar-thumb-rounded-full
                    group-hover:scrollbar-thumb-gray-400"
                >
                    {loading ? (
                        <div className="w-full mt-2">
                            <div className="w-5 h-5 mx-auto">
                                <LoadingCircleLine />
                            </div>
                        </div>
                    ) : (
                        <Posts data={postData} pagePhoto={true} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default Photo;
