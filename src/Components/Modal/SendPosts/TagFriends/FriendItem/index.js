import { useContext } from "react";
import { PostsContext } from "../../PostsProvider";
function FriendItem({ id, name, avt }) {
    const context = useContext(PostsContext);
    return (
        <div
            className="flex items-center w-full p-2 ml-2 rounded-lg cursor-pointer hover:bg-gray-200"
            onClick={() => context.addTag({ id, name, avt })}
        >
            <img className=" h-10 w-10 rounded-full border" src={avt} alt="" />
            <span className=" ml-2 font-medium">{name}</span>
        </div>
    );
}

export default FriendItem;
