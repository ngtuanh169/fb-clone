import axiosClient from "./axiosClient";

const friendsApi = {
    checkFriend: (params) => {
        const url = "/friends/check_friend.php";
        return axiosClient.get(url, { params });
    },

    unfriend: (params) => {
        const url = "/friends/unfriend.php";
        return axiosClient.post(url, params);
    },

    count_friends: (params) => {
        const url = "/friends/count_friends.php";
        return axiosClient.get(url, { params });
    },

    getFriends: (params) => {
        const url = "/friends/get.php";
        return axiosClient.get(url, { params });
    },

    getFriendsRecent: (params) => {
        const url = "/friends/friends_recent.php";
        return axiosClient.get(url, { params });
    },

    getFriendsCurrentCity: (params) => {
        const url = "/friends/get_friends_current_city.php";
        return axiosClient.get(url, { params });
    },

    addFriend: (params) => {
        const url = "/friend_request/add.php";
        return axiosClient.post(url, params);
    },

    acceptFriendRequest: (params) => {
        const url = "/friend_request/accept.php";
        return axiosClient.post(url, params);
    },

    cancelFriendRequest: (params) => {
        const url = "/friend_request/cancel.php";
        return axiosClient.post(url, params);
    },

    getFriendRequest: (params) => {
        const url = "/friend_request/get.php";
        return axiosClient.get(url, { params });
    },

    countFriendsRequest: (params) => {
        const url = "/friend_request/count.php";
        return axiosClient.get(url, { params });
    },
    getFriendsNotInGroup: (params) => {
        const url = "/friends/get_friends_not_in_group.php";
        return axiosClient.get(url, { params });
    },
};
export default friendsApi;
