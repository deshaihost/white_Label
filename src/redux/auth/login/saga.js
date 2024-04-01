import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { LoginActionTypes } from "./constants";
import { loginEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";
import { APICore, setAuthorization } from "../../../helper/apiCore";

const api = new APICore();

function* loginFunction(data) {
  try {
    yield put({
      type: LoginActionTypes.LOGIN_LOADING,
      payload: {},
    });
    const response = yield call(loginEndPoint, data);
    if (response.status === 200) {
      let access_token = response?.data?.access_token;
      let refresh_token = response?.data?.refresh_token;
      const user = {
        data: "userData",
        id: 1,
        password: "test",
        lastName: "User",
        role: "userRole",
        token: access_token,
        refreshToken: refresh_token,
      };
      api.setLoggedInUser(user);
      setAuthorization(user["token"]);
      yield put({
        type: LoginActionTypes.LOGIN_SUCCESS,
        payload: { ...response.data, status: response.status },
      });
      yield put({
        type: LoginActionTypes.LOGIN_RESET,
        payload: {},
      });
    } else {
      alert("*");
      yield put({
        type: LoginActionTypes.LOGIN_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error, "errorerror");

    yield put({
      type: LoginActionTypes.LOGIN_ERROR,
      payload: error,
    });
  }
}

function* stateEmptyFunction() {
  yield put({
    type: StateEmtpyActionTypes.STATE_EMPTY_SUCCESS,
    payload: {},
  });
}

export function* acctionLogin(): any {
  yield takeEvery(LoginActionTypes.LOGIN_FIRST, loginFunction);
}

export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* loginSaga(): any {
  yield all([fork(acctionLogin), fork(acctionStateEmpty)]);
}

export default loginSaga;
