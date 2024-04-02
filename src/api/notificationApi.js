import axiosClient from "./axiosClient";

const notificationApi = {
    count: (params) => {
        const url = "/notification/count.php";
        return axiosClient.get(url, { params });
    },

    countNotifyUnread: (params) => {
        const url = "/notification/countUnread.php";
        return axiosClient.get(url, { params });
    },

    get: (params) => {
        const url = "/notification/get.php";
        return axiosClient.get(url, { params });
    },

    getNotifyUnread: (params) => {
        const url = "/notification/getNotifyUnread.php";
        return axiosClient.get(url, { params });
    },
};

export default notificationApi;
