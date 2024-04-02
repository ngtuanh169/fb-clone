// import { useState, useEffect } from "react";
// export const useGetDate = (month) => {
//     const currentYear = new Date().getFullYear();

//     const yearList = Array(20)
//         .fill(0)
//         .map((item, index) => currentYear - index);

//     const monthList = Array(12)
//         .fill(0)
//         .map((item, index) => index + 1);

//     const dayList = Array(month === 2 ? 28 : 30)
//         .fill(0)
//         .map((item, index) => index + 1);

//     useEffect(() => {
//         if (month === 2 && filter.day > 28) {
//             setFilter({ ...filter, day: 28 });
//         }
//     }, [month]);
// };

export const getTimestamp = () => {
    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
