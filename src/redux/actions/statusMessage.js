export const addStatusMess = (data) => {
    const id = new Date().getTime();
    return {
        type: "addStatusMess",
        payload: { id, ...data },
    };
};
export const deleteStatusMess = (id) => {
    return {
        type: "deleteStatusMess",
        payload: id,
    };
};
