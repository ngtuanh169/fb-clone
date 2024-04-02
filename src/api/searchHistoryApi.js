import axiosClient from "./axiosClient";

const searchHistoryApi = {
    add: (params) => {
        const url = "/search_history/add.php";
        return axiosClient.post(url, params);
    },

    get: (params) => {
        const url = "/search_history/get.php";
        return axiosClient.get(url, { params });
    },

    delete: (params) => {
        const url = "/search_history/delete.php";
        return axiosClient.post(url, params);
    },
};

export default searchHistoryApi;
