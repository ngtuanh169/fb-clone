import { useState, useContext, useEffect } from "react";
import Button from "../../../Button";
import { PostsContext } from "../PostsProvider";
import Title from "./Title";
import FriendItem from "./FriendItem";
import TaggedFriends from "./TaggedFriends";
import { HiOutlineSearch } from "react-icons/hi";
import avt from "../../../../assets/images/avatar/avatar.jpg";
function TagFriends({ setCurrentComp = () => {} }) {
    const context = useContext(PostsContext);
    const friendsList = [
        { id: 1, name: "Nguyễn Tú Anh", avt },
        { id: 2, name: "Nguyễn Văn Long", avt },
        { id: 3, name: "Tạ Hoàng Anh", avt },
        { id: 4, name: "Nguyễn Tú Anh", avt },
        { id: 5, name: "Nguyễn Thị Hải", avt },
        { id: 6, name: "Nguyễn Tuấn Anh", avt },
        { id: 7, name: "Nguyễn Thị Huyền", avt },
        { id: 8, name: "Nguyễn Hương Lan", avt },
        { id: 9, name: "Nguyễn Sơn", avt },
        { id: 10, name: "Nguyễn Minh Thanh", avt },
        { id: 11, name: "Nguyễn Tú Anh", avt },
    ];
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
        context.setFriendsList(friendsList);
    }, []);
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
                    className="a h-[350px] flex flex-col w-full mt-3 overflow-x-hidden
                    scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full "
                >
                    {context.taggedFriends.length > 0 && (
                        <div className="flex flex-col w-full px-4 pb-4">
                            <TaggedFriends />
                        </div>
                    )}
                    <span className=" text-[13px] text-gray-500 font-medium px-4 ">
                        {searchText ? "TÌM KIẾM" : "GỢI Ý"}
                    </span>
                    <div className="flex flex-col w-full mt-2">
                        {context.friendsList.length > 0 &&
                            context.friendsList.map((item) => (
                                <FriendItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    avt={item.avt}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TagFriends;
