import { useContext } from "react";
import { PostsContext } from "../../PostsProvider";
import TagFriend from "../../../../TagFriend";
function TaggedFriends() {
    const context = useContext(PostsContext);
    const handleDeleteTag = (id) => {
        const user = context.taggedFriends.filter((item) => item.id === id);
        const newArray = context.taggedFriends.filter((item) => item.id !== id);
        context.setTaggedFriends(newArray);
        context.setFriendsList([...context.friendsList, ...user]);
    };
    return (
        <>
            <div className="w-full">
                <span className="text-[13px] text-gray-500 font-medium  ">
                    ĐÃ GẮN THẺ
                </span>
            </div>
            <div
                className="flex flex-wrap w-full max-h-[450px] p-3 mt-3 rounded-lg border border-gray-400
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
            >
                {context.taggedFriends.length > 0 &&
                    context.taggedFriends.map((item) => (
                        <TagFriend
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            onClick={handleDeleteTag}
                        />
                    ))}
            </div>
        </>
    );
}

export default TaggedFriends;
