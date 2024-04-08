import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { LogoutActionTypes } from "./constants";
import { logoutEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";

function* logoutFunction(data) {
  try {
    yield put({
      type: LogoutActionTypes.LOGOUT_LOADING,
      payload: {},
    });
    const response = yield call(logoutEndPoint, data);
    if (response.status === 201) {
      yield put({
        type: LogoutActionTypes.LOGOUT_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: LogoutActionTypes.LOGOUT_SUCCESS,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: LogoutActionTypes.LOGOUT_ERROR,
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

export function* acctionlogout(): any {
  yield takeEvery(LogoutActionTypes.LOGOUT_FIRST, logoutFunction);
}
export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* logoutSaga(): any {
  yield all([fork(acctionlogout), fork(acctionStateEmpty)]);
}

export default logoutSaga;
