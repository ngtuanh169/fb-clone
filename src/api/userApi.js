import axiosClient from "./axiosClient";

const userApi = {
    getInfo: (params) => {
        const url = "/user/getInfo.php";
        return axiosClient.get(url, { params });
    },
    getFollowersByUserId: (params) => {
        const url = "/user/getFollowersByUserId.php";
        return axiosClient.get(url, { params });
    },
    getUsersNotFriend: (params) => {
        const url = "/user/getUsersNotFriend.php";
        return axiosClient.get(url, { params });
    },
    getUserInArray: (params) => {
        const url = "/user/get_users_in_array.php";
        return axiosClient.get(url, { params });
    },
    searchUser: (params) => {
        const url = "/user/searchUser.php";
        return axiosClient.get(url, { params });
    },
    changeAvatar: (params) => {
        const url = "/user/change_avatar.php";
        return axiosClient.post(url, params);
    },
    getFiles: (params) => {
        const url = "/user/get_files.php";
        return axiosClient.get(url, { params });
    },
};

export default userApi;
