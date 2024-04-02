import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../../PostsProvider";
import { formatAvatar } from "../../../../../Hooks/useFormat";
import { AiOutlineCheck } from "react-icons/ai";
import Button from "../../../../Button";
function FriendItem({ data = {} }) {
    const { addTag, taggedFriends } = useContext(PostsContext);
    const [taged, setTaged] = useState(false);
    useEffect(() => {
        const id = taggedFriends.findIndex((item) => item.id == data.id);
        setTaged(id >= 0);
    }, [data.id, taggedFriends]);
    return (
        <Button
            _className="flex items-center justify-between w-full p-2 ml-2 rounded-lg hover:bg-gray-200"
            cursorDefault={taged}
            onClick={() =>
                !taged &&
                addTag({
                    id: data.id,
                    name: data.userName,
                })
            }
        >
            <div className="flex items-center">
                <img
                    className=" h-10 w-10 rounded-full border"
                    src={formatAvatar(data.userAvt, data.userSx)}
                    alt=""
                />
                <span className=" ml-2 font-medium line-clamp-2">
                    {data.userName}
                </span>
            </div>
            {taged && (
                <span className="px-2 text-blue-500">
                    <AiOutlineCheck />
                </span>
            )}
        </Button>
    );
}

export default FriendItem;
