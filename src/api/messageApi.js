import axiosClient from "./axiosClient";
const messageApi = {
    countMessage: (params) => {
        const url = "/message/count_message.php";
        return axiosClient.get(url, { params });
    },
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
