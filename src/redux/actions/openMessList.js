export const addMess = (id, avt, name) => {
    return {
        type: "add_mess",
        payload: { id, avt, name },
    };
};

export const removeMess = (id) => {
    return {
        type: "remove_mess",
        payload: { id },
    };
};
