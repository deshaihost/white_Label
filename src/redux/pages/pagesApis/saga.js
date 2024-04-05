import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { PagesApisActionTypes } from "./constants";
import { getUserDataEndPoint ,postCreateCheckoutSessionEndPoint} from "./api";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";



function* getUserDataFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.GET_USER_DATA_LOADING,
      payload: {},
    });
    const response = yield call(getUserDataEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.GET_USER_DATA_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.GET_USER_DATA_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.GET_USER_DATA_ERROR,
      payload: error,
    });
  }
}
function* postCreateCheckoutSessionFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_LOADING,
      payload: {},
    });
    const response = yield call(postCreateCheckoutSessionEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_ERROR,
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
  yield takeEvery(PagesApisActionTypes.GET_USER_DATA_FIRST, getUserDataFunction);
}
export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}
export function* acctionCreateCheckoutSession(): any {
  yield takeEvery(PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_FIRST, postCreateCheckoutSessionFunction);
}

function* pagesApisSaga(): any {
  yield all([fork(acctionGetUserData), fork(acctionStateEmpty),fork(acctionCreateCheckoutSession)]);
}

export default pagesApisSaga;
