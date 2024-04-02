import axiosClient from "./axiosClient";

const groupApi = {
    create: (params) => {
        const url = "/groups/create.php";
        return axiosClient.post(url, params);
    },

    getInfoMember: (params) => {
        const url = "/groups/get_info_member.php";
        return axiosClient.get(url, { params });
    },

    get: (params) => {
        const url = "/groups/get.php";
        return axiosClient.get(url, { params });
    },

    getAll: (params) => {
        const url = "/groups/get_all.php";
        return axiosClient.get(url, { params });
    },

    getGroupInfo: (params) => {
        const url = "/groups/get_group_info.php";
        return axiosClient.get(url, { params });
    },

    getMembersNearYou: (params) => {
        const url = "/groups/get_members_near_you.php";
        return axiosClient.get(url, { params });
    },

    getMembersInGroup: (params) => {
        const url = "/groups/get_members_in_group.php";
        return axiosClient.get(url, { params });
    },

    requestJoinGroup: (params) => {
        const url = "/groups/add_request_join_group.php";
        return axiosClient.post(url, params);
    },

    countRequestsJoinGroup: (params) => {
        const url = "/groups/admin/count_requests_join_group.php";
        return axiosClient.get(url, { params });
    },

    getRequestsJoinGroup: (params) => {
        const url = "/groups/admin/get_requests_join_group.php";
        return axiosClient.get(url, { params });
    },

    cancelRequestJoinGroupByAdmin: (params) => {
        const url = "/groups/admin/cancel_request_join_group.php";
        return axiosClient.post(url, params);
    },

    acceptRequestJoinGroupByAdmin: (params) => {
        const url = "/groups/admin/accept_request_join_group.php";
        return axiosClient.post(url, params);
    },

    acceptRequestsByAdmin: (params) => {
        const url = "/groups/admin/accept_requests.php";
        return axiosClient.get(url, { params });
    },

    cancelRequestsByAdmin: (params) => {
        const url = "/groups/admin/cancel_requests.php";
        return axiosClient.get(url, { params });
    },

    cancelRequestJoinGroup: (params) => {
        const url = "/groups/cancel_request_join_group.php";
        return axiosClient.post(url, params);
    },

    getSenderInfoInvitation: (params) => {
        const url = "/invitation_join_group/get_sender_info.php";
        return axiosClient.get(url, { params });
    },

    getActivityInGroup: (params) => {
        const url = "/groups/get_activity_in_group.php";
        return axiosClient.get(url, { params });
    },
    outGroup: (params) => {
        const url = "/groups/out_group.php";
        return axiosClient.post(url, params);
    },

    pinGroupPosts: (params) => {
        const url = "/groups/admin/pin_group_posts.php";
        return axiosClient.post(url, params);
    },

    unpinGroupPosts: (params) => {
        const url = "/groups/admin/unpin_group_posts.php";
        return axiosClient.post(url, params);
    },

    checkPinned: (params) => {
        const url = "/groups/admin/check_pinned.php";
        return axiosClient.get(url, { params });
    },

    getPinnedPosts: (params) => {
        const url = "/groups/get_pinned_posts.php";
        return axiosClient.get(url, { params });
    },

    deleteMember: (params) => {
        const url = "/groups/admin/delete_member.php";
        return axiosClient.post(url, params);
    },

    unpostsDeleteMember: (params) => {
        const url = "/groups/admin/unposts_and_delete_member.php";
        return axiosClient.post(url, params);
    },
};

export default groupApi;
