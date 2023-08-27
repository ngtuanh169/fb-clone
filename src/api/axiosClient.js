import axios from "axios";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import authApi from "./authApi";

// Set up default config for http requests here
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        // "content-type": "application/json",
        "content-type": "multipart/form-data",
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers["Access_token"] = accessToken;
    }
    if (config.url === "/auth/refreshToken.php") {
        config.headers["Refresh_token"] = localStorage.getItem("refreshToken");
    }
    return config;
});
axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    async (error) => {
        if (
            error.response.status === 401 &&
            error.config.url !== "/auth/refreshToken.php"
        ) {
            const res = await authApi.refreshToken();
            localStorage.setItem("accessToken", res);
            return axiosClient(error.config);
        }
        if (
            error.response.status === 403 ||
            (error.response.status === 401 &&
                error.config.url === "/auth/refreshToken.php")
        ) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
        throw error;
    }
);
export default axiosClient;
