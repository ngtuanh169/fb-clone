import axiosClient from "./axiosClient";

const commentApi = {
    add: (params) => {
        const url = "/comment/add.php";
        return axiosClient.post(url, params);
    },

    get: (params) => {
        const url = "/comment/get.php";
        return axiosClient.get(url, { params });
    },

    getCommentsChild: (params) => {
        const url = "/comment/get_by_parent_id.php";
        return axiosClient.get(url, { params });
    },

    likeComment: (params) => {
        const url = "/comment/like_comment.php";
        return axiosClient.post(url, params);
    },

    unlikeComment: (params) => {
        const url = "/comment/unlike_comment.php";
        return axiosClient.post(url, params);
    },

    getUsersLiked: (params) => {
        const url = "/comment/get_users_liked.php";
        return axiosClient.get(url, { params });
    },
};

export default commentApi;
