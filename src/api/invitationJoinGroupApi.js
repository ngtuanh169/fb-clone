import axiosClient from "./axiosClient";

const invitationJoinGroupApi = {
    add: (params) => {
        const url = "/invitation_join_group/add.php";
        return axiosClient.post(url, params);
    },

    accept: (params) => {
        const url = "/invitation_join_group/accept.php";
        return axiosClient.post(url, params);
    },

    cancel: (params) => {
        const url = "/invitation_join_group/cancel.php";
        return axiosClient.post(url, params);
    },
};

export default invitationJoinGroupApi;
