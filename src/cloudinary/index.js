import axios from "axios";

export const uploadFile = async (file) => {
    const type = file.type.split("/")[0];
    const time = new Date().getTime();
    const api = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/${type}/upload`;
    const params = new FormData();
    params.append("file", file);
    params.append("public_id", `/${type}/${time}`);
    params.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
    params.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PERSET);
    const res = await axios.post(api, params);
    return res.data;
};

export const uploadProfile = async (file, avatar = false) => {
    const time = new Date().getTime();
    const api = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`;
    const params = new FormData();
    params.append("file", file);
    params.append("public_id", `/${avatar ? "avatar" : "banner"}/${time}`);
    params.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
    params.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PERSET);
    const res = await axios.post(api, params);
    return res.data;
};

export const deleteVideo = async (signature = "", timestamp = "") => {
    const api = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/video/destroy`;
    const params = new FormData();
    // params.append("file", file);
    params.append("public_id", `/video/1712485285194`);
    params.append("api_key", process.env.REACT_APP_CLOUD_API_KEY);
    // params.append("upload_preset", process.env.REACT_APP_CLOUD_UPLOAD_PERSET);
    params.append("signature", signature);
    params.append("timestamp", timestamp);
    const res = await axios.post(api, params);
    return res.data;
};
