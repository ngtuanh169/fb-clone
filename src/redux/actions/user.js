export const addUser = (data) => {
    return {
        type: "add",
        payload: data,
    };
};
export const deleteUser = () => {
    return {
        type: "delete",
        payload: {},
    };
};
