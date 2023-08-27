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
export const addTextMessList = (conversationsId, data) => {
    //data is array
    return {
        type: "add_text_mess_list",
        payload: { conversationsId, data },
    };
};
export const addMessText = (data, conversationsId) => {
    //data is object
    return {
        type: "add_mess_text",
        payload: { conversationsId, data },
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
