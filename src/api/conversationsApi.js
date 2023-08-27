import axiosClient from "./axiosClient";
const conversationsApi = {
    add: (params) => {
        const url = "/conversations/add.php";
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = "/conversations/get.php";
        return axiosClient.get(url, { params });
    },
    unwatched: (params) => {
        const url = "/conversations/unwatched.php";
        return axiosClient.get(url, { params });
    },
    updateUnwatched: (params) => {
        const url = "/conversations/updateUnwatched.php";
        return axiosClient.post(url, params);
    },
    updateWatchedById: (params) => {
        const url = "/conversations/updateWatchedById.php";
        return axiosClient.post(url, params);
    },
};
export default conversationsApi;
