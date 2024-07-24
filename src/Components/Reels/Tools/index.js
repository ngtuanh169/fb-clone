import { useState } from "react";
import { useSelector } from "react-redux";
import { formatNumberK } from "../../../Hooks/useFormat";
import postsApi from "../../../api/postsApi";
import Button from "../../Button";
function Tools({ data = {}, setData = () => {} }) {
    const user = useSelector((state) => state.user);
    const [liked, setLiked] = useState(data.liked);
    const [loading, setLoading] = useState(false);
    const handleLike = async (postsId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("postsId", postsId);
            const res = await postsApi.likePosts(params);
            if (res.success) {
                setLiked(true);
                setData({
                    ...data,
                    liked: true,
                    countLikes: data.countLikes + 1,
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    const handleUnlike = async (postsId) => {
        try {
            setLoading(true);
            const params = new FormData();
            params.append("postsId", postsId);
            const res = await postsApi.unlikePosts(params);
            if (res.success) {
                setLiked(false);
                setData({
                    ...data,
                    liked: false,
                    countLikes: data.countLikes - 1,
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            className="w-max flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
        >
            <div className="flex flex-col text-center">
                {liked ? (
                    <Button
                        _className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-700"
                        onClick={() => !loading && handleUnlike(data.id)}
                    >
                        <i className=" bg-urlToolIcons bg-szToolIcons bg-likeReels w-5 h-5" />
                    </Button>
                ) : (
                    <Button
                        onClick={() => !loading && handleLike(data.id)}
                        _className={
                            "flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-200"
                        }
                    >
                        <i className=" bg-urlToolIcons bg-szToolIcons bg-noLikeReels w-5 h-5 z-20" />
                    </Button>
                )}
                <span className="text-[13px] text-white font-medium">
                    {formatNumberK(data?.countLikes ? data.countLikes : 0)}
                </span>
            </div>
            <div className="group flex flex-col text-center">
                <Button
                    _className={
                        "flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-200"
                    }
                >
                    <i className=" bg-urlToolIcons bg-szToolIcons bg-commentReels w-5 h-5 z-20" />
                </Button>
                <span className="text-[13px] text-white font-medium">
                    {formatNumberK(
                        data?.countComments ? data.countComments : 0
                    )}
                </span>
            </div>
            <div className="group flex flex-col text-center">
                <Button
                    _className={
                        "flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 hover:bg-gray-200"
                    }
                >
                    <i className=" bg-urlToolIcons bg-szToolIcons bg-shareReels w-5 h-5 z-20" />
                </Button>
                <span className="text-[13px] text-white font-medium">
                    {formatNumberK(0)}
                </span>
            </div>
        </div>
    );
}

export default Tools;
