const initState = [];

const messNotification = (state = initState, action) => {
    switch (action.type) {
        case "add_id":
            if (state.length > 0) {
                const check = state.findIndex((item) => {
                    return item === action.payload.id;
                });
                return check >= 0 ? state : [...state, action.payload.id];
            }
            return [action.payload.id];
        case "add_idList":
            return action.payload.idList;
        case "delete_all":
            return [];
        default:
            return state;
    }
};

export default messNotification;
