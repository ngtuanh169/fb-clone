import axiosClient from "./axiosClient";
const authApi = {
    register: (params) => {
        const url = "/auth/register.php";
        return axiosClient.post(url, params);
    },
    login: (params) => {
        const url = "/auth/login.php";
        return axiosClient.post(url, params);
    },
    getMe: () => {
        const url = "/auth/getMe.php";
        return axiosClient.get(url);
    },
    refreshToken: () => {
        const url = "/auth/refreshToken.php";
        return axiosClient.get(url);
    },
};

export default authApi;
