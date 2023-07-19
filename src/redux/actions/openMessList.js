export const addMess = (data) => {
    const id = data.id ? data.id : new Date().getTime();
    return {
        type: "add_mess",
        payload: { id, ...data },
    };
};
export const updateMess = (data) => {
    //data is object
    return {
        type: "update_mess",
        payload: { ...data },
    };
};
export const removeMess = (id) => {
    return {
        type: "remove_mess",
        payload: { id },
    };
};
export const removeAll = () => {
    return {
        type: "remove_all",
    };
};
