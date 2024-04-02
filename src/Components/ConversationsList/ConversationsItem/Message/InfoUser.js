import { useState, useEffect } from "react";
import { formatAvatar } from "../../../../Hooks/useFormat";
import friendsApi from "../../../../api/friendsApi";
import Loading from "../../../Loading";
import SkeletonLoading from "../../../SkeletonLoading";

import { useSelector } from "react-redux";
function InfoUser({ data = {} }) {
    const user = useSelector((state) => state.user);
    const [isFriend, setIsFriend] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const checkFriend = async () => {
            try {
                setLoading(true);
                const res = await friendsApi.checkFriend({
                    userId: user.userId,
                    othersId: data.othersId,
                });
                res.isFriend && setIsFriend(true);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        data.conversationsId && checkFriend();
    }, [data.conversationsId]);
    return (
        <div className="flex flex-col items-center w-full mt-5 mb-1">
            <div className=" h-[60px] w-[60px]">
                <img
                    className=" w-full h-full rounded-full boder"
                    src={formatAvatar(data.othersAvt, data.othersSx)}
                    alt=""
                />
            </div>
            <div className="">
                <span className=" font-medium">{data.othersName}</span>
            </div>
            <div className="">
                <span className="text-[13px]">Facebook</span>
            </div>

            {loading ? (
                <div className="mt-1 w-[150px] h-[12px] rounded overflow-hidden">
                    <SkeletonLoading />
                </div>
            ) : (
                <div className="">
                    <span className="text-[13px]">
                        {isFriend
                            ? "Các bạn là bạn bè trên Facebook"
                            : "Các bạn không phải là bạn bè trên Facebook"}
                    </span>
                </div>
            )}
            {loading ? (
                <div className="mt-1 w-[100px] h-[12px] rounded overflow-hidden">
                    <SkeletonLoading />
                </div>
            ) : (
                <div className="">
                    <span className="text-[13px]">Sống tại Hà Nội</span>
                </div>
            )}
        </div>
    );
}

export default InfoUser;
