import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatAvatar } from "../../../../Hooks/useFormat";
import searchHistoryApi from "../../../../api/searchHistoryApi";
import SkeletonLoading from "../../../../Components/SkeletonLoading";
import LoadingCircleLine from "../../../../Components/LoadingCircleLine";
import Button from "../../../../Components/Button";
import { TfiTime } from "react-icons/tfi";
import { MdClose } from "react-icons/md";
function SearchHistory({ text = "", closeModal = () => {} }) {
    const user = useSelector((state) => state.user);
    const [payload, setPayload] = useState({ limit: 8, page: 1 });
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingId, setLoadingId] = useState(0);
    useEffect(() => {
        const getSearchData = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await searchHistoryApi.get(params);
                if (res.success && res.data) {
                    setSearchData([...res.data]);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && getSearchData();
    }, []);
    const addSearchHistory = async (text = "", userId1 = "") => {
        try {
            const params = new FormData();
            params.append("userId", user.userId);
            params.append("content", text);
            params.append("userId1", userId1);
            const res = await searchHistoryApi.add(params);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
    const deleteSearchHistory = async (id) => {
        try {
            setLoadingId(id);
            const params = new FormData();
            params.append("id", id);
            const res = await searchHistoryApi.delete(params);
            if (res.success) {
                const newArr = searchData.filter((item) => item.id !== id);
                setSearchData(newArr);
            }
            setLoadingId(0);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full flex flex-col pt-1 px-2 pb-2">
            <div className="flex justify-between items-center w-full px-1">
                <span className=" font-semibold">Gần đây</span>
                <Button
                    _className={
                        " text-blue-500 py-1 px-2 rounded-md hover:bg-hover"
                    }
                >
                    {searchData.length > 0 && <span>Chỉnh sửa</span>}
                </Button>
            </div>
            {searchData.length == 0 && !loading && (
                <span className=" mx-auto my-3 font-medium text-gray-500">
                    Không có lịch sử tìm kiếm
                </span>
            )}
            <div className="w-full">
                {searchData.length > 0 &&
                    searchData.map((item) => (
                        <div
                            key={item.id}
                            className=" relative rounded-md overflow-hidden hover:bg-gray-200"
                        >
                            <Link
                                to={
                                    item?.userId
                                        ? `/profile/${item.userId}`
                                        : `/search/people/${item.content}`
                                }
                                className="flex justify-between items-center w-full p-2"
                                onClick={() => {
                                    addSearchHistory(item.content, item.userId);
                                    closeModal();
                                }}
                            >
                                <div className="flex items-center h-full">
                                    <div className=" w-[40px] h-[40px] rounded-full mr-2 overflow-hidden">
                                        {item?.userId ? (
                                            <img
                                                className=" h-full w-full object-cover object-center"
                                                src={formatAvatar(
                                                    item.avatar,
                                                    item.sx
                                                )}
                                                alt=""
                                            />
                                        ) : (
                                            <span className="flex items-center justify-center w-full h-full bg-gray-200">
                                                <TfiTime className="w-[25px] h-[25px] text-gray-500" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className=" font-medium">
                                            {item?.userId
                                                ? item.name
                                                : item.content}
                                        </span>
                                        {item?.checkFriend && (
                                            <span className=" text-[13px] text-gray-500">
                                                Bạn bè
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            <div className=" absolute flex items-center h-full top-0 right-0">
                                <Button
                                    _className={
                                        "flex items-center justify-center w-[25px] h-[25px] mr-2 rounded-full hover:bg-gray-300"
                                    }
                                    cursorDefault={loadingId == item.id}
                                    onClick={() =>
                                        loadingId !== item.id &&
                                        deleteSearchHistory(item.id)
                                    }
                                >
                                    {loadingId == item.id ? (
                                        <span className="block w-5 h-5">
                                            <LoadingCircleLine />
                                        </span>
                                    ) : (
                                        <MdClose />
                                    )}
                                </Button>
                            </div>
                        </div>
                    ))}
                {loading &&
                    Array(3)
                        .fill(0)
                        .map((item, index) => (
                            <div
                                key={item.id}
                                className="flex items-center w-full h-[58px] p-2 overflow-hidden"
                            >
                                <div className=" h-10 w-10 mr-2">
                                    <SkeletonLoading circle />
                                </div>
                                <div className="grow flex flex-col ">
                                    <div className="w-[150px] h-[25px] rounded overflow-hidden">
                                        <SkeletonLoading />
                                    </div>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    );
}

export default SearchHistory;
