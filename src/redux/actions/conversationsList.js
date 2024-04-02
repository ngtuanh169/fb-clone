export const addConversations = (conversationsId, othersId) => {
    return {
        type: "addConversations",
        payload: { conversationsId, othersId },
    };
};

export const addInfo = (conversationsId, othersName, othersAvt, othersSx) => {
    return {
        type: "addInfo",
        payload: { conversationsId, othersName, othersAvt, othersSx },
    };
};

export const closeConversations = (conversationsId) => {
    return {
        type: "closeConversations",
        payload: { conversationsId },
    };
};
export const closeAll = () => {
    return {
        type: "closeAll",
        payload: {},
    };
};
