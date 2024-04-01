// @flow
import { combineReducers } from "redux";
import { loginReducer } from "./auth/login/reducers";
import { registerReducer } from "./auth/register/reducers";
import { sendPasswordRestEmailReducer } from "./auth/forgotPassword/reducers";
export default (combineReducers({
    loginReducer,
    registerReducer,
    sendPasswordRestEmailReducer
  
}): any);
