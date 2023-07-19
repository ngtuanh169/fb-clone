const initState = [];
const statusMessage = (state = initState, action) => {
    switch (action.type) {
        case "addStatusMess":
            return [action.payload, ...state];
        case "deleteStatusMess":
            const newArray = state.filter((item) => item.id !== action.payload);
            return newArray;
        default:
            return state;
    }
};
export default statusMessage;
