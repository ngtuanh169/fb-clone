import CommentPost from "./CommentPost";
import FriendRequest from "./FriendRequest";
import ResFriendRequest from "./ResFriendRequest";
import LikedPost from "./LikedPost";
import RequestJoinGroup from "./RequestJoinGroup";
import InvitationJoinGroup from "./InvitationJoinGroup";
function NotifyItem({ data, closeModal = () => {} }) {
    let Comp = null;
    switch (data.type) {
        case "friendRequest":
            Comp = FriendRequest;
            break;
        case "resFriendRequest":
            Comp = ResFriendRequest;
            break;
        case "invitationJoinGroup":
            Comp = InvitationJoinGroup;
            break;
        case "likePost":
            Comp = LikedPost;
            break;
        case "commentPost":
            Comp = CommentPost;
            break;
        case "requestJoinGroup":
            Comp = RequestJoinGroup;
            break;
    }

    return (
        <>
            {Comp !== null && (
                <div className="py-1 rounded-md ">
                    <Comp data={data} closeModal={closeModal} />
                </div>
            )}
        </>
    );
}

export default NotifyItem;
