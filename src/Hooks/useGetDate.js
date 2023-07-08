import { useState, useEffect } from "react";
export const useGetDate = (month) => {
    const currentYear = new Date().getFullYear();

    const yearList = Array(20)
        .fill(0)
        .map((item, index) => currentYear - index);

    const monthList = Array(12)
        .fill(0)
        .map((item, index) => index + 1);

    const dayList = Array(month === 2 ? 28 : 30)
        .fill(0)
        .map((item, index) => index + 1);

    useEffect(() => {
        if (month === 2 && filter.day > 28) {
            setFilter({ ...filter, day: 28 });
        }
    }, [month]);
};
