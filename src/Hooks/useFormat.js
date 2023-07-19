import avt1 from "../assets/images/avatar/avatar_nam.jpg";
import avt2 from "../assets/images/avatar/avatar_nu.jpg";
import banner from "../assets/images/banner/banner.png";
export const formatNumber = (number) => {
    const _number = +number;
    return _number
        .toString()
        .split(/(?=(?:\d{3})+(?:\.|$))/g)
        .join(".");
};
export const formatNumberK = (number) => {
    const _number = +number;
    const arr = _number.toString().split(/(?=(?:\d{3})+(?:\.|$))/g);
    let checkNumber = "";
    if (arr.length === 2) {
        checkNumber = arr[1].charAt(0);
        return arr[0].length > 1
            ? `${arr[0]}K`
            : `${arr[0]},${+checkNumber === 0 ? "" : checkNumber}K`;
    }
    if (arr.length === 3) {
        checkNumber = arr[1].charAt(0);
        return arr[0].length > 1
            ? `${arr[0]} triệu`
            : `${arr[0]}${+checkNumber === 0 ? "" : `,${checkNumber}`} triệu`;
    }
    if (arr.length === 4) {
        checkNumber = arr[1].charAt(0);
        return arr[0].length > 1
            ? `${arr[0]} tỉ`
            : `${arr[0]}${+checkNumber === 0 ? "" : `,${checkNumber}`} tỉ`;
    }
    return _number;
};
export const formatTime = (time) => {
    if (!time) {
        return undefined;
    }
    const ojDateTime = new Date(+time);
    const day = ojDateTime.getDate();
    const month = ojDateTime.getMonth() + 1;
    const fullYear = ojDateTime.getFullYear();

    const fullTime = new Date(time).getTime();
    const timeNow = new Date().getTime();

    const seconds = Math.floor((timeNow - fullTime) / 1000);
    if (seconds < 60) {
        return "vừa xong";
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} phút trước`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} giờ trước`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} ngày trước`;
    }
    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${day} tháng ${month}`;
    }
    return `${day} tháng ${month}, ${fullYear}`;
};
export const formatTimeMess = (time) => {
    if (!time) {
        return undefined;
    }
    const today = new Date().getDate();
    const ojDateTime = new Date(+time);
    const hours = ojDateTime.getHours();
    const minutes = ojDateTime.getMinutes();
    const day = ojDateTime.getDate();
    const month = ojDateTime.getMonth() + 1;
    const fullYear = ojDateTime.getFullYear();

    if (today === day) {
        return `${hours}:${minutes}`;
    } else {
        return `${hours}:${minutes} ${day} Tháng ${month}, ${fullYear}`;
    }
};
export const formatFullDate = (time) => {
    if (!time) {
        return undefined;
    }

    const ojDateTime = new Date(+time);
    const day = ojDateTime.getDate();
    const month = ojDateTime.getMonth() + 1;
    const fullYear = ojDateTime.getFullYear();

    return `${day} tháng ${month} năm ${fullYear}`;
};
export const formatTimestamp = (time) => {
    if (!time) {
        return undefined;
    }
    const timestamp = time.trim();
    const DateObj = new Date(timestamp);
    const fullTime = DateObj.getTime();
    const timeNow = new Date().getTime();
    const seconds = Math.floor((timeNow - fullTime) / 1000);
    const day = DateObj.getDate();
    const month = DateObj.getMonth();
    const year = DateObj.getFullYear();
    if (seconds < 60) {
        return seconds < 10 ? "vừa xong" : `${seconds} giây trước`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} phút trước`;
    }
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} giờ trước`;
    }
    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} ngày trước`;
    }
    return ` ngày ${day}/${month}/${year}`;
};
export const formatAvatar = (avt, sx) => {
    if (!avt) {
        return +sx === 1 ? avt1 : avt2;
    }

    return avt;
};
export const formatBanner = (img) => {
    if (!img) {
        return banner;
    }

    return img;
};
