import { combineReducers } from "redux";
import authReducer from "./auth";
import currentUserReducer from "./currentUser";
import channelReducers from "./channel";

export default combineReducers({
    authReducer, currentUserReducer , channelReducers
});