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
};
export default conversationsApi;
