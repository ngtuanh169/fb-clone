import CommentPost from "./CommentPost";
import FriendRequest from "./FriendRequest";
import LikedPost from "./LikedPost";
import RequestJoinGroup from "./RequestJoinGroup";
function NotifyItem({ data, closeModal = () => {} }) {
    let Comp = CommentPost;
    switch (data.type) {
        case "friendRequest":
            Comp = FriendRequest;
            break;
        case "likePost":
            Comp = LikedPost;
            break;
        case "commentPost":
            Comp = CommentPost;
            break;
        case "RequestJoinGroup":
            Comp = RequestJoinGroup;
            break;
    }

    return (
        <div className="py-1 rounded-md ">
            <Comp data={data} closeModal={closeModal} />
        </div>
    );
}

export default NotifyItem;
