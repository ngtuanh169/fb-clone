import { useState, useContext } from "react";
import { PostsContext } from "../../PostsProvider";
import TagFriends from "../../TagFriends";
import Text from "./Text";
import AddFiles from "./AddFiles";
function Content({
    addImg = false,
    setCurrentComp = () => {},
    loading = false,
}) {
    const { fileList, taggedFriends, setFriendsList } =
        useContext(PostsContext);
    const [showAddImg, setShowAddImg] = useState(addImg);

    return (
        <div className="w-full">
            <div className="a w-full max-w-[370px] sm:max-w-[500px] scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full">
                <Text />
                {showAddImg && (
                    <AddFiles
                        setShowAddImg={setShowAddImg}
                        setCurrentComp={setCurrentComp}
                        loading={loading}
                    />
                )}
            </div>
            <div className="flex items-center mt-2 p-3 border rounded-md">
                <span className=" font-medium mr-1">
                    Thêm vào bài viết của bạn:
                </span>
                <span
                    className={`flex justify-center items-center w-[40px] h-[40px] rounded-full ml-3 text-green-500 text-xl cursor-pointer ${
                        fileList.length > 0 || showAddImg ? "bg-slate-200" : ""
                    } hover:bg-slate-200`}
                    onClick={() => setShowAddImg(!showAddImg)}
                >
                    <img
                        className="h-6 w-6"
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/a6OjkIIE-R0.png"
                        alt=""
                    />
                </span>
                <span
                    className={`flex justify-center items-center w-[40px] h-[40px] rounded-full ml-2
                     text-blue-500 text-xl cursor-pointer ${
                         taggedFriends.length > 0 ? "bg-blue-100" : ""
                     } hover:bg-blue-200 `}
                    onClick={() => {
                        setFriendsList([]);
                        setCurrentComp({ Comp: TagFriends });
                    }}
                >
                    <img
                        className="h-6 w-6"
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yC/r/MqTJr_DM3Jg.png"
                        alt=""
                    />
                </span>
                <span
                    className="flex justify-center items-center w-[40px] h-[40px] rounded-full ml-2
                     text-yellow-500 text-xl cursor-not-allowed "
                >
                    <img
                        className="h-6 w-6"
                        src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/yMDS19UDsWe.png"
                        alt=""
                    />
                </span>
            </div>
        </div>
    );
}

export default Content;
