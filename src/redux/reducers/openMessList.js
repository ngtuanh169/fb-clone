const initState = [];

const openMessList = (state = initState, action) => {
    switch (action.type) {
        case "add_mess":
            if (state.length > 0) {
                const checkIndex = state.findIndex(
                    (item) => item.id === action.payload.id
                );
                console.log(checkIndex);
                if (checkIndex != 0) {
                    const newSate = state.filter(
                        (item) => item.id !== action.payload.id
                    );
                    return [
                        {
                            id: action.payload.id,
                            avt: action.payload.avt,
                            name: action.payload.name,
                        },
                        ...newSate,
                    ];
                }
                return state;
            }
            return [
                {
                    id: action.payload.id,
                    avt: action.payload.avt,
                    name: action.payload.name,
                },
                ...state,
            ];
        case "remove_mess":
            const newSate = state.filter(
                (item) => item.id !== action.payload.id
            );
            return newSate;

        default:
            return state;
    }
};

export default openMessList;
