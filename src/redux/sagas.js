// @flow
import { all } from "redux-saga/effects";
import loginSaga from "./auth/login/saga";
import registerSaga from "./auth/register/saga";
import logoutSaga from "./auth/logout/saga";
import forgotPasswordSaga from "./auth/forgotPassword/saga";
import meetHostBuddySaga from "./pages/meetHostBuddy/saga";
import pagesApisSaga from "./pages/pagesApis/saga";
import addPropertiesSaga from "./pages/pagesApis/addProperties/saga";
export default function* rootSaga(): any {
  yield all([
    loginSaga(),
    registerSaga(),
    logoutSaga(),
    forgotPasswordSaga(),
    meetHostBuddySaga(),
    pagesApisSaga(),
    addPropertiesSaga()
  ]);
}
