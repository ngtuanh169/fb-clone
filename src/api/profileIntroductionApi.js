import axiosClient from "./axiosClient";
const profileIntroductionApi = {
    add: (params) => {
        const url = "/profile_introduction/add.php";
        return axiosClient.post(url, params);
    },
    get: (params) => {
        const url = "/profile_introduction/get.php";
        return axiosClient.get(url, { params });
    },
};

export default profileIntroductionApi;
