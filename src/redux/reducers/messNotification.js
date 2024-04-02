const initState = [];

const messNotification = (state = initState, action) => {
    switch (action.type) {
        case "add_idList":
            return action.payload.idList;

        case "add_id":
            if (state.length > 0) {
                const check = state.findIndex((item) => {
                    return item === action.payload.id;
                });
                return check >= 0 ? state : [action.payload.id, ...state];
            }
            return [action.payload.id];

        case "delete_id":
            if (state.length > 0) {
                const newState = state.filter(
                    (item) => item !== action.payload.id
                );
                return newState;
            }
            return state;

        case "delete_all":
            return [];

        default:
            return state;
    }
};

export default messNotification;
