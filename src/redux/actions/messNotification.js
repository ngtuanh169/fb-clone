export const add_id = (id) => {
    return {
        type: "add_id",
        payload: { id },
    };
};

export const add_idList = (idList) => {
    return {
        type: "add_idList",
        payload: { idList },
    };
};
export const delete_id = (id) => {
    return {
        type: "delete_id",
        payload: { id },
    };
};
export const delete_all = () => {
    return {
        type: "delete_all",
        payload: {},
    };
};
