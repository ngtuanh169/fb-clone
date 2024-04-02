import { useContext } from "react";
import { PostsContext } from "../../PostsProvider";
import TagFriend from "../../../../TagFriend";
function TaggedFriends() {
    const { taggedFriends, setTaggedFriends } = useContext(PostsContext);
    const handleDeleteTag = (id) => {
        const newArray = taggedFriends.filter((item) => item.id !== id);
        setTaggedFriends(newArray);
    };
    return (
        <>
            <div className="w-full">
                <span className="text-[13px] text-gray-500 font-medium  ">
                    ĐÃ GẮN THẺ
                </span>
            </div>
            <div
                className="flex flex-wrap gap-1 w-full max-h-[450px] p-3 mt-3 rounded-lg border border-gray-400
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-thumb-rounded-full"
            >
                {taggedFriends.length > 0 &&
                    taggedFriends.map((item) => (
                        <TagFriend
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            onClick={() => handleDeleteTag(item.id)}
                        />
                    ))}
            </div>
        </>
    );
}

export default TaggedFriends;
