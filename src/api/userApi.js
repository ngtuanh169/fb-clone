import axiosClient from "./axiosClient";

const userApi = {
    getInfo: (params) => {
        const url = "/user/getInfo.php";
        return axiosClient.get(url, { params });
    },
    searchUser: (params) => {
        const url = "/user/searchUser.php";
        return axiosClient.get(url, { params });
    },
};

export default userApi;
