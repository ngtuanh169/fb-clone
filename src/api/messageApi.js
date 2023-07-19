import axiosClient from "./axiosClient";
const messageApi = {
    addMessage: (params) => {
        const url = "/message/add.php";
        return axiosClient.post(url, params);
    },
};
export default messageApi;
