import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import stories from "./stories";
import user from "./user";
import statusMessage from "./statusMessage";
import messNotification from "./messNotification";
import conversationsList from "./conversationsList";

// const userPersistConfig = {
//     key: "user",
//     storage,
// };
const rootReducer = combineReducers({
    stories,
    user,
    statusMessage,
    messNotification,
    conversationsList,
    // user: persistReducer(userPersistConfig, user),
});

export default rootReducer;
