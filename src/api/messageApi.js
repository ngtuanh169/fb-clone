import axiosClient from "./axiosClient";
const messageApi = {
    addMessage: (params) => {
        const url = "/message/add.php";
        return axiosClient.post(url, params);
    },
    getMessage: (params) => {
        const url = "/message/get.php";
        return axiosClient.get(url, { params });
    },
    updateWatched: (params) => {
        const url = "/message/updateWatched.php";
        return axiosClient.post(url, params);
    },
};
export default messageApi;
