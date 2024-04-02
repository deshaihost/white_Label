// @flow
import { combineReducers } from "redux";
import { loginReducer } from "./auth/login/reducers";
import { registerReducer } from "./auth/register/reducers";
import { sendPasswordRestEmailReducer } from "./auth/forgotPassword/reducers";
import { chatBoxAIReducer,getSessionIdReducer } from "./pages/meetHostBuddy/reducers";
export default (combineReducers({
    loginReducer,
    registerReducer,
    sendPasswordRestEmailReducer,
    chatBoxAIReducer,
    getSessionIdReducer
  
}): any);
