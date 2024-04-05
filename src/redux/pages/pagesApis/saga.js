import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { MeetHostActionTypes } from "./constants";
import { getUserDataEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";



function* getUserDataFunction(data) {
  try {
    yield put({
      type: MeetHostActionTypes.GET_SESSION_ID_LOADING,
      payload: {},
    });
    const response = yield call(getUserDataEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: MeetHostActionTypes.GET_SESSION_ID_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
      // yield put({
      //   type: MeetHostActionTypes.CHAT_BOX_AI_RESET,
      //   payload: {},
      // });
    } else {
      yield put({
        type: MeetHostActionTypes.GET_SESSION_ID_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: MeetHostActionTypes.GET_SESSION_ID_ERROR,
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


export function* acctionGetUserData(): any {
  yield takeEvery(MeetHostActionTypes.GET_SESSION_ID_FIRST, getUserDataFunction);
}
export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* pagesApisSaga(): any {
  yield all([fork(acctionGetUserData), fork(acctionStateEmpty)]);
}

export default pagesApisSaga;
