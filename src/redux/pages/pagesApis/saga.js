import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { PagesApisActionTypes } from "./constants";
import {
  getUserDataEndPoint,
  postCreateCheckoutSessionEndPoint,
  updateAccountInfoEndPoint,
  PMSintegrationEndPoint,
  getCalryLinkEndPoint,
  removeIntegrationListGetEndPoint,
  removeIntegrationEndPoint,
  updateAccountUpdatePasswordEndPoint
} from "./api";
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

function* updateAccountInfoFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.UPDATE_ACCOUNT_INFO_LOADING,
      payload: {},
    });
    const response = yield call(updateAccountInfoEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.UPDATE_ACCOUNT_INFO_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.UPDATE_ACCOUNT_INFO_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.UPDATE_ACCOUNT_INFO_ERROR,
      payload: error,
    });
  }
}

function* updateAccountUpdatePasswordFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_LOADING,
      payload: {},
    });
    const response = yield call(updateAccountUpdatePasswordEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_ERROR,
      payload: error,
    });
  }
}

function* pmsIntegrationGetFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.PMS_INTEGRATION_GET_LOADING,
      payload: {},
    });
    const response = yield call(PMSintegrationEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.PMS_INTEGRATION_GET_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.PMS_INTEGRATION_GET_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.PMS_INTEGRATION_GET_ERROR,
      payload: error,
    });
  }
}

// function* pmsIntegrationAddFunction(data) {
//   try {
//     yield put({
//       type: PagesApisActionTypes.PMS_INTEGRATION_ADD_LOADING,
//       payload: {},
//     });
//     const response = yield call(PMSintegrationAddEndPoint, data);
//     if (response.status === 200) {
//       yield put({
//         type: PagesApisActionTypes.PMS_INTEGRATION_ADD_SUCCESS,
//         payload: { data: response.data, status: response.status },
//       });
//     } else {
//       yield put({
//         type: PagesApisActionTypes.PMS_INTEGRATION_ADD_ERROR,
//         payload: { ...response.data },
//       });
//     }
//   } catch (error) {
//     yield put({
//       type: PagesApisActionTypes.PMS_INTEGRATION_ADD_ERROR,
//       payload: error,
//     });
//   }
// }

function* getCalryLinkFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.GET_CALRY_LINK_LOADING,
      payload: {},
    });
    const response = yield call(getCalryLinkEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.GET_CALRY_LINK_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.GET_CALRY_LINK_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.GET_CALRY_LINK_ERROR,
      payload: error,
    });
  }
}
function* removeIntegrationGetFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_LOADING,
      payload: {},
    });
    const response = yield call(removeIntegrationListGetEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_ERROR,
      payload: error,
    });
  }
}

function* removeIntegrationFunction(data) {
  try {
    yield put({
      type: PagesApisActionTypes.REMOVE_INTEGRATION_LOADING,
      payload: {},
    });
    const response = yield call(removeIntegrationEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: PagesApisActionTypes.REMOVE_INTEGRATION_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: PagesApisActionTypes.REMOVE_INTEGRATION_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: PagesApisActionTypes.REMOVE_INTEGRATION_ERROR,
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
  yield takeEvery(
    PagesApisActionTypes.GET_USER_DATA_FIRST,
    getUserDataFunction
  );
}
export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}
export function* acctionCreateCheckoutSession(): any {
  yield takeEvery(
    PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_FIRST,
    postCreateCheckoutSessionFunction
  );
}
export function* acctionUpdateAccountInfo(): any {
  yield takeEvery(
    PagesApisActionTypes.UPDATE_ACCOUNT_INFO_FIRST,
    updateAccountInfoFunction
  );
}
export function* acctionUpdateAccountUpdatePassword(): any {
  yield takeEvery(
    PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_FIRST,
    updateAccountUpdatePasswordFunction
  );
}
export function* acctionPMSIntegrationGet(): any {
  yield takeEvery(
    PagesApisActionTypes.PMS_INTEGRATION_GET_FIRST,
    pmsIntegrationGetFunction
  );
}

// export function* acctionPMSIntegrationAdd(): any {
//   yield takeEvery(
//     PagesApisActionTypes.PMS_INTEGRATION_ADD_FIRST,
//     pmsIntegrationAddFunction
//   );
// }
export function* acctionGetCalryLink(): any {
  yield takeEvery(
    PagesApisActionTypes.GET_CALRY_LINK_FIRST,
    getCalryLinkFunction
  );
}
export function* acctionRemoveIntegrationGet(): any {
  yield takeEvery(
    PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_FIRST,
    removeIntegrationGetFunction
  );
}
export function* acctionRemoveIntegration(): any {
  yield takeEvery(
    PagesApisActionTypes.REMOVE_INTEGRATION_FIRST,
    removeIntegrationFunction
  );
}



function* pagesApisSaga(): any {
  yield all([
    fork(acctionGetUserData),
    fork(acctionStateEmpty),
    fork(acctionCreateCheckoutSession),
    fork(acctionUpdateAccountInfo),
    fork(acctionPMSIntegrationGet),
    fork(acctionGetCalryLink),
    fork(acctionRemoveIntegrationGet),
    fork(acctionRemoveIntegration),
    fork(acctionUpdateAccountUpdatePassword)
  ]);
}

export default pagesApisSaga;
