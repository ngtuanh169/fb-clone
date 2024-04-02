import axiosClient from "./axiosClient";

const postsApi = {
    add: (params) => {
        const url = "/posts/add.php";
        return axiosClient.post(url, params);
    },

    getAll: (params) => {
        const url = "/posts/get_all.php";
        return axiosClient.get(url, { params });
    },

    getPostsById: (params) => {
        const url = "/posts/get_posts_by_id.php";
        return axiosClient.get(url, { params });
    },

    getByUserId: (params) => {
        const url = "/posts/get_by_user_id.php";
        return axiosClient.get(url, { params });
    },

    getPostsGroupByUserId: (params) => {
        const url = "/posts/get_posts_group_by_user_id.php";
        return axiosClient.get(url, { params });
    },
    likePosts: (params) => {
        const url = "/posts/like_posts.php";
        return axiosClient.post(url, params);
    },
    unlikePosts: (params) => {
        const url = "/posts/unlike_posts.php";
        return axiosClient.post(url, params);
    },

    getUsersLiked: (params) => {
        const url = "/posts/get_users_liked.php";
        return axiosClient.get(url, { params });
    },

    unposts: (params) => {
        const url = "/posts/unposts.php";
        return axiosClient.post(url, params);
    },
};

export default postsApi;
