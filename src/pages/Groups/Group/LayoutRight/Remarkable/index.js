import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScreenSize } from "../../../../../App";
import { GroupContext } from "../../GroupProvider";
import groupApi from "../../../../../api/groupApi";
import SkeletonLoading from "../../../../../Components/SkeletonLoading";
import MainCard from "../../../../../Components/MainCard";
import Posts from "../../../../../Components/Posts";
import Introduce from "../Components/Introduce";
import MediaFiles from "../Components/MediaFiles";
function Remarkable() {
    const { groupId } = useParams();
    const context = useContext(ScreenSize);
    const { groupData } = useContext(GroupContext);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({ limit: 10, page: 1, groupId });
    const [postsList, setPostsList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [firstId, setFirstId] = useState(0);
    const [lastId, setLastId] = useState(0);

    useEffect(() => {
        const getPostsList = async () => {
            try {
                setLoading(true);
                const params = { ...payload, firstId, lastId };
                const res = await groupApi.getPinnedPosts(params);
                if (res.success && res.count > 0) {
                    const length = res.data.length;
                    setTotalPage(Math.ceil(res.count / payload.limit));
                    payload.page === 1 && setFirstId(res.data[0].id);
                    setLastId(res.data[length - 1].id);
                    setPostsList([...postsList, ...res.data]);
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        !loading && groupId && payload.page <= totalPage && getPostsList();
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
        <div className="flex w-full">
            <div className="flex flex-col w-full mx-auto sm:w-[550px] xl:w-[600px]">
                {postsList.length > 0 &&
                    postsList.map((item) => {
                        const data = { ...item, id: item.postsId };
                        return (
                            <Posts
                                key={item.id}
                                data={data}
                                adminId={groupData.adminId}
                            />
                        );
                    })}
                {loading && (
                    <MainCard>
                        <div className="flex flex-col justify-between w-full h-[200px] p-4">
                            <div className="flex gap-2 w-full">
                                <div className="w-10 h-10">
                                    <SkeletonLoading circle />
                                </div>
                                <div className="flex flex-col gap-2 justify-around">
                                    <div className="w-[100px] h-[15px] rounded-md overflow-auto">
                                        <SkeletonLoading />
                                    </div>
                                    <div className="w-[80px] h-[10px] rounded-md overflow-auto">
                                        <SkeletonLoading />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full">
                                <div className="w-[50px] h-[10px] rounded-md overflow-auto">
                                    <SkeletonLoading />
                                </div>
                                <div className="w-[50px] h-[10px] rounded-md overflow-auto">
                                    <SkeletonLoading />
                                </div>
                                <div className="w-[50px] h-[10px] rounded-md overflow-auto">
                                    <SkeletonLoading />
                                </div>
                            </div>
                        </div>
                    </MainCard>
                )}
            </div>
            {context.width >= 1440 && (
                <div className="flex-1 flex flex-col ml-4">
                    <Introduce />
                    <MediaFiles />
                </div>
            )}
        </div>
    );
}

export default Remarkable;
