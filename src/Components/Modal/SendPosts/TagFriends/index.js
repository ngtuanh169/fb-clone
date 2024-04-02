import { useState, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PostsContext } from "../PostsProvider";
import friendsApi from "../../../../api/friendsApi";
import SkeletonLoading from "../../../SkeletonLoading";
import Button from "../../../Button";
import Title from "./Title";
import FriendItem from "./FriendItem";
import TaggedFriends from "./TaggedFriends";
import { HiOutlineSearch } from "react-icons/hi";
function TagFriends({ setCurrentComp = () => {} }) {
    const user = useSelector((state) => state.user);
    const divRef = useRef();
    const { friendsList, setFriendsList, taggedFriends } =
        useContext(PostsContext);
    const [payload, setPayload] = useState({ limit: 10, page: 1, text: "" });
    const [totalPage, setTotalPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        const getFriends = async () => {
            try {
                setLoading(true);
                const params = { ...payload, userId: user.userId };
                const res = await friendsApi.getFriends(params);
                if (res.success && res.count > 0) {
                    setFriendsList([...friendsList, ...res.data]);
                    setTotalPage(Math.ceil(res.count / payload.limit));
                } else {
                    setTotalPage(0);
                }
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        user.userId && payload.page <= totalPage && getFriends();
    }, [payload]);

    useEffect(() => {
        const timeId = setTimeout(() => {
            if (searchText.trim() !== payload.text && !loading) {
                setPayload({ ...payload, page: 1, text: searchText.trim() });
                setFriendsList([]);
                setTotalPage(1);
            }
        }, 1000);
        return () => clearTimeout(timeId);
    }, [searchText]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = divRef.current.scrollHeight;
            const offsetHeight = divRef.current.offsetHeight;
            const scrollTop = divRef.current.scrollTop;
            if (scrollHeight - 2 < offsetHeight + scrollTop) {
                !loading && setPayload({ ...payload, page: payload.page + 1 });
            }
        };
        !loading &&
            divRef.current &&
            divRef.current.addEventListener("scroll", handleScroll);
        return () =>
            !loading &&
            divRef.current &&
            divRef.current.removeEventListener("scroll", handleScroll);
    }, [loading, divRef.current]);
    return (
        <div className="flex flex-col w-[370px] sm:w-[500px]">
            <Title setCurrentComp={setCurrentComp} />
            <div className=" flex-1 flex flex-col w-full ">
                <div className="flex w-full h-9 px-4 mt-4">
                    <div className=" flex w-full h-9 pl-1 pr-2 bg-gray-200 rounded-full ">
                        <label
                            htmlFor="searchInput"
                            className=" flex items-center justify-center w-[26px]"
                        >
                            <HiOutlineSearch className="text-[16px]" />
                        </label>
                        <input
                            className=" flex-1 bg-transparent outline-none"
                            type="text"
                            id="searchInput"
                            placeholder="Tìm kiếm bạn bè"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => setCurrentComp(undefined)}>
                        <span className=" text-blue-500 font-medium px-3">
                            Xong
                        </span>
                    </Button>
                </div>
                <div
                    ref={divRef}
                    className="a h-[350px] flex flex-col w-full mt-3 overflow-x-hidden
                    scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full "
                >
                    {taggedFriends.length > 0 && (
                        <div className="flex flex-col w-full px-4 pb-4">
                            <TaggedFriends />
                        </div>
                    )}
                    <span className=" text-[13px] text-gray-500 font-medium px-4 ">
                        {searchText ? "TÌM KIẾM" : "GỢI Ý"}
                    </span>
                    <div className="flex flex-col w-full mt-2">
                        {friendsList.length > 0 &&
                            friendsList.map((item) => (
                                <FriendItem key={item.id} data={item} />
                            ))}
                        {loading &&
                            Array(3)
                                .fill(0)
                                .map((item, index) => (
                                    <div className="flex items-center w-full p-2 ml-2 ">
                                        <div className="h-10 w-10">
                                            <SkeletonLoading circle />
                                        </div>
                                        <div className="w-[150px] h-[25px] ml-2 rounded overflow-hidden">
                                            <SkeletonLoading circle />
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TagFriends;
