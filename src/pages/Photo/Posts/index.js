import MainCard from "../../../Components/MainCard";
import PostTime from "./PostsTime";
import PostsContent from "./PostsContent";
import PostsReact from "./PostReact";
function Posts({
    userId,
    avatar,
    name,
    time,
    group = false,
    groupId = "",
    groupName = "",
    adGroup = false,
    groupMember = false,
    iconClose = false,
}) {
    return (
        <div className="flex flex-col w-full h-full bg-white p-2">
            <PostTime
                userId={userId}
                avatar={avatar}
                name={name}
                time={time}
                group={group}
                groupId={groupId}
                groupName={groupName}
                adGroup={adGroup}
                groupMember={groupMember}
                iconClose={iconClose}
            />
            <PostsContent />
            <PostsReact
                userId={userId}
                avatar={avatar}
                name={name}
                time={time}
            />
        </div>
    );
}

export default Posts;
