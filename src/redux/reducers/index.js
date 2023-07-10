import { combineReducers } from "redux";

import openMessList from "./openMessList";
import stories from "./stories";

const rootReducer = combineReducers({
    openMessList,
    stories,
});

export default rootReducer;
