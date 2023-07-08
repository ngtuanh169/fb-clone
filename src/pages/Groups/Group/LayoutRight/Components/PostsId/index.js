import MainCard from "../../../../../../Components/MainCard";
import Posts from "../../../../../../Components/Posts";
import avatar from "../../../../../../assets/images/avatar/avatar.jpg";
function PostsId({ postsId, title = "" }) {
    return (
        <div className="flex flex-col w-full">
            <div className="mb-4">
                <span className=" font-medium">{title}</span>
            </div>
            <div className="w-[600px]">
                <Posts
                    userId={1}
                    groupId="2"
                    groupMember={true}
                    avatar={avatar}
                    name={"Nguyễn Tú Anh"}
                    time={1671894600425}
                />
            </div>
        </div>
    );
}

export default PostsId;
