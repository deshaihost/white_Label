import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { MeetHostActionTypes } from "./constants";
import { chatBoxAIEndPoint,getSeccionIdEndPoint,messageFeedBackEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";

function* chatBoxAIFunction(data) {
  try {
    yield put({
      type: MeetHostActionTypes.CHAT_BOX_AI_LOADING,
      payload: {},
    });
    const response = yield call(chatBoxAIEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: MeetHostActionTypes.CHAT_BOX_AI_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
      yield put({
        type: MeetHostActionTypes.CHAT_BOX_AI_RESET,
        payload: {},
      });
    } else {
      yield put({
        type: MeetHostActionTypes.CHAT_BOX_AI_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: MeetHostActionTypes.CHAT_BOX_AI_ERROR,
      payload: error,
    });
  }
}

function* getSessionIdFunction(data) {
  try {
    yield put({
      type: MeetHostActionTypes.GET_SESSION_ID_LOADING,
      payload: {},
    });
    const response = yield call(getSeccionIdEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: MeetHostActionTypes.GET_SESSION_ID_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
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

function* messageFeedBackFunction(data) {
  try {
    yield put({
      type: MeetHostActionTypes.MESSAGE_FEEDBACK_LOADING,
      payload: {},
    });
    const response = yield call(messageFeedBackEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: MeetHostActionTypes.MESSAGE_FEEDBACK_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: MeetHostActionTypes.MESSAGE_FEEDBACK_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: MeetHostActionTypes.MESSAGE_FEEDBACK_ERROR,
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

export function* acctionChatBoxAI(): any {
  yield takeEvery(MeetHostActionTypes.CHAT_BOX_AI_FIRST, chatBoxAIFunction);
}
export function* acctionGetSessionId(): any {
  yield takeEvery(MeetHostActionTypes.GET_SESSION_ID_FIRST, getSessionIdFunction);
}
export function* acctionMeesageFeedBack(): any {
  yield takeEvery(MeetHostActionTypes.MESSAGE_FEEDBACK_FIRST, messageFeedBackFunction);
}


export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* meetHostBuddySaga(): any {
  yield all([fork(acctionChatBoxAI),fork(acctionGetSessionId), fork(acctionStateEmpty),fork(acctionMeesageFeedBack)]);
}

export default meetHostBuddySaga;
