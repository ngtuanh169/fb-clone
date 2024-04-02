import axiosClient from "./axiosClient";

const userIntroductionApi = {
    update: (params) => {
        const url = "/user_introduction/update.php";
        return axiosClient.post(url, params);
    },
};

export default userIntroductionApi;
