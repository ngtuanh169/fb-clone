import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import groupApi from "../../../api/groupApi";
import MainCard from "../../../Components/MainCard";
import SkeletonLoading from "../../../Components/SkeletonLoading";
import Search from "..";
import Item from "./Item";
function GroupsSearch() {
    const { text } = useParams();
    const user = useSelector((state) => state.user);
    const [groupList, setGroupList] = useState([]);
    const [payload, setPayload] = useState({
        limit: 5,
        page: 1,
        groupName: text,
    });
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUsers = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await groupApi.getAll(params);
                if (res.success && res.count > 0 && res.data) {
                    setGroupList([...groupList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && payload.page <= totalPage && getUsers();
    }, [payload]);
    useEffect(() => {
        if (text.trim() && text.trim() !== payload.groupName) {
            setTotalPage(1);
            setGroupList([]);
            setPayload({ ...payload, page: 1, groupName: text });
        }
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
        <Search>
            <div className="flex flex-col items-center w-full mt-8">
                {groupList.length > 0 &&
                    groupList.map((item) => <Item key={item.id} data={item} />)}
                {groupList.length == 0 && !loading && (
                    <span className="mx-auto my-5 font-medium text-gray-500">
                        Không có kết quả trùng khớp
                    </span>
                )}
                {loading &&
                    Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <div className="w-full md:w-[680px]">
                                <MainCard>
                                    <div className="flex w-full p-4">
                                        <div className="w-[60px] h-[60px] rounded-lg overflow-hidden">
                                            <SkeletonLoading />
                                        </div>
                                        <div className="grow flex flex-col gap-2 ml-4">
                                            <div className="w-[200px] h-[30px] rounded overflow-hidden">
                                                <SkeletonLoading />
                                            </div>
                                            <div className="w-[150px] h-[25px] rounded overflow-hidden">
                                                <SkeletonLoading />
                                            </div>
                                        </div>
                                    </div>
                                </MainCard>
                            </div>
                        ))}
            </div>
        </Search>
    );
}

export default GroupsSearch;
