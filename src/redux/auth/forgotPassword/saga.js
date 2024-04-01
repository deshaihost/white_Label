import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { ForgotPasswordActionTypes } from "./constants";
import { sendPasswordResetEmailEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";

function* sendPasswordRestEmailFunction(data) {
  try {
    yield put({
      type: ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_LOADING,
      payload: {},
    });
    const response = yield call(sendPasswordResetEmailEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
      yield put({
        type: ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_RESET,
        payload: {},
      });
    } else {
      yield put({
        type: ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_ERROR,
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

export function* acctionSendPasswordRestEmail(): any {
  yield takeEvery(ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_FIRST, sendPasswordRestEmailFunction);
}
export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* forgotPasswordSaga(): any {
  yield all([fork(acctionSendPasswordRestEmail), fork(acctionStateEmpty)]);
}

export default forgotPasswordSaga;
