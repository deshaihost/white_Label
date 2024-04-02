  // @flow
  import { all } from "redux-saga/effects";
  import loginSaga from "./auth/login/saga";
  import registerSaga from "./auth/register/saga";
  import forgotPasswordSaga from "./auth/forgotPassword/saga";
  export default function* rootSaga(): any {
    yield all([
      loginSaga(),
      registerSaga(),
      forgotPasswordSaga()
    ]);
  }
