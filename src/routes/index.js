import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Videos from "../pages/Videos";
import Photo from "../pages/Photo";
import Marketplace from "../pages/Marketplace";
import Stories from "../pages/Stories";
import Groups from "../pages/Groups";
import Group from "../pages/Groups/Group";
import Friends from "../pages/Friends";
import FriendRequest from "../pages/Friends/FriendRequest";
import PeoPleSearch from "../pages/Search/PeopleSearch";
import PostsSearch from "../pages/Search/PostsSearch";
import GroupsSearch from "../pages/Search/GroupsSearch";
import PagesSearch from "../pages/Search/PagesSearch";
import Profile from "../pages/Profile";
import ProfileInformation from "../pages/Profile/ProfileInformation";
import ProfileFriends from "../pages/Profile/ProfileFriends";
import ProfilePhotos from "../pages/Profile/ProfilePhotos";
import ProfileVideos from "../pages/Profile/ProfileVideos";

const publicRoutes = [
    { path: "/login", component: Login, layout: null },
    { path: "/register", component: Register, layout: null },
];

const privateRoutes = [
    { path: "/", component: Home },
    { path: "/videos", component: Videos },
    { path: "/photo/:postsId/:fileId", component: Photo, layout: null },
    { path: "/marketplace", component: Marketplace },
    { path: "/stories/:id", component: Stories },
    { path: "/groups", component: Groups },
    { path: "/group/:groupId", component: Group },
    { path: "/group/:groupId/user/:userId", component: Group },
    { path: "/group/:groupId/postsNoti/:postsNoti", component: Group },
    { path: "/group/:groupId/:page", component: Group },
    { path: "/Friends", component: Friends },
    { path: "/Friends/request", component: FriendRequest },
    { path: "/search/people/:text", component: PeoPleSearch },
    { path: "/search/posts/:text", component: PostsSearch },
    { path: "/search/groups/:text", component: GroupsSearch },
    { path: "/search/pages/:text", component: PagesSearch },
    { path: "/profile/:userId", component: Profile },
    { path: "/profile/:userId/posts/:postsId", component: Profile },
    { path: "/profile/:userId/info", component: ProfileInformation },
    { path: "/profile/:userId/friends", component: ProfileFriends },
    { path: "/profile/:userId/photos", component: ProfilePhotos },
    { path: "/profile/:userId/videos", component: ProfileVideos },
];
export { publicRoutes, privateRoutes };
