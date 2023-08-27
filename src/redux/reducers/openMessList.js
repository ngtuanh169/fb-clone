const initState = [];

const openMessList = (state = initState, action) => {
    switch (action.type) {
        case "add_mess":
            if (state.length > 0) {
                if (action.payload.conversationsId) {
                    const newArray = state.filter(
                        (item) =>
                            item.conversationsId !==
                            action.payload.conversationsId
                    );
                    return [
                        {
                            ...action.payload,
                        },
                        ...newArray,
                    ];
                } else {
                    const newArray = state.filter(
                        (item) => item.id !== action.payload.id
                    );
                    return [
                        {
                            ...action.payload,
                        },
                        ...newArray,
                    ];
                }
            }
            return [
                {
                    id: action.payload.id,
                    userId: action.payload.userId,
                    othersId: action.payload.othersId,
                    othersAvt: action.payload.othersAvt,
                    othersName: action.payload.othersName,
                    othersSx: action.payload.othersSx,
                    conversationsId: action.payload.conversationsId,
                },
            ];
        case "update_mess":
            const checkIndex = state.findIndex(
                (item) => item.id === action.payload.id
            );
            if (checkIndex >= 0) {
                const newSate = [...state];
                newSate[checkIndex] = {
                    ...newSate[checkIndex],
                    ...action.payload,
                };
                return newSate;
            }
            return state;
        case "add_text_mess_list":
            const check = state.findIndex(
                (item) =>
                    item.conversationsId === action.payload.conversationsId
            );
            if (check >= 0) {
                const newSate = [...state];
                if (newSate[check]?.textMessList) {
                    newSate[check].textMessList = [
                        ...newSate[check].textMessList,
                        ...action.payload.data,
                    ];
                    return newSate;
                }
                newSate[check].textMessList = [...action.payload.data];
                return newSate;
            }
            return state;
        // case "add_mess_text":
        //     const checkMess = state.findIndex(
        //         (item) =>
        //             item.conversationsId === action.payload.conversationsId
        //     );
        //     if (checkMess >= 0) {
        //         const newSate = [...state];
        //         newSate[checkMess].listText = [
        //             action.payload.data,
        //             ...newSate[checkMess].listText,
        //         ];
        //         return newSate;
        //     }
        //     return state;
        case "remove_mess":
            const newSate = state.filter(
                (item) => item.id !== action.payload.id
            );
            return newSate;
        case "remove_all":
            return [];

        default:
            return state;
    }
};

export default openMessList;
