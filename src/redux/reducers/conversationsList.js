/*
    initState = [
        {
            conversationsId:12, 
            othersId:2,
            othersName:Nguyen Tu Anh, 
            othersAvt:'', 
            othersSx:1,
            
        }
    ]
*/
const initState = [];

const conversationsList = (state = initState, action) => {
    switch (action.type) {
        case "addConversations":
            if (state.length > 0) {
                const checkIndex = state.findIndex(
                    (item) =>
                        item.conversationsId === action.payload.conversationsId
                );
                if (checkIndex >= 0) {
                    const newState = state.filter(
                        (item) =>
                            item.conversationsId !==
                            action.payload.conversationsId
                    );
                    return [state[checkIndex], ...newState];
                }
                return [
                    {
                        conversationsId: action.payload.conversationsId,
                        othersId: action.payload.othersId,
                    },
                    ...state,
                ];
            }
            return [
                {
                    conversationsId: action.payload.conversationsId,
                    othersId: action.payload.othersId,
                },
            ];

        case "addInfo":
            if (state.length <= 0) {
                return state;
            }
            const newArray = state.map((item) => item);
            const checkIndex = newArray.findIndex(
                (item) =>
                    item.conversationsId === action.payload.conversationsId
            );
            if (checkIndex >= 0) {
                newArray[checkIndex] = {
                    ...newArray[checkIndex],
                    othersName: action.payload.othersName,
                    othersAvt: action.payload.othersAvt,
                    othersSx: action.payload.othersSx,
                };
                return newArray;
            }
            return state;

        case "closeConversations":
            const newState = state.filter(
                (item) =>
                    item.conversationsId !== action.payload.conversationsId
            );
            return newState;

        case "closeAll":
            return [];
        default:
            return state;
    }
};
export default conversationsList;
