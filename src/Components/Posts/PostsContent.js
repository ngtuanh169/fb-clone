import { useContext } from "react";
import { Link } from "react-router-dom";
import { ValueContext } from "./";
import Video from "../Video";
import { formatAvatar } from "../../Hooks/useFormat";
import img from "../../assets/images/avatar/avatar.jpg";
function PostsContent() {
    const { postsData, pagePhoto } = useContext(ValueContext);
    return (
        <>
            <div className=" w-full p-2 pt-0">
                <span className="block text-[14px] lg:text-[15px] min-h-[50px] px-2">
                    {postsData.content}
                </span>
            </div>
            {!pagePhoto && (
                <div className="w-full border border-gray-300 ">
                    <Link to={`/photo/${postsData.id}/3`}>
                        {/* <Video /> */}
                        <img
                            className="w-full max-h-[300px] object-cover"
                            src={img}
                            alt=""
                        />
                    </Link>
                </div>
            )}
        </>
    );
}

export default PostsContent;
