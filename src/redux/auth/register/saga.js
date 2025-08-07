import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { RegisterActionTypes } from "./constants";
import { registerEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";

function* registerFunction(data) {
  try {
    yield put({
      type: RegisterActionTypes.REGISTER_LOADING,
      payload: {},
    });
    const response = yield call(registerEndPoint, data);
    if (response.status === 201) {
      yield put({
        type: RegisterActionTypes.REGISTER_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
      yield put({
        type: RegisterActionTypes.REGISTER_RESET,
        payload: {},
      });
    } else {
      yield put({
        type: RegisterActionTypes.REGISTER_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: RegisterActionTypes.REGISTER_ERROR,
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

export function* acctionRegister() {
  yield takeEvery(RegisterActionTypes.REGISTER_FIRST, registerFunction);
}
export function* acctionStateEmpty() {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* registerSaga() {
  yield all([fork(acctionRegister), fork(acctionStateEmpty)]);
}

export default registerSaga;

