import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { propertyInsightActionTypes } from "./constants";
import { getpropertyByNameDataEndPoint } from "./api";
import { StateEmtpyActionTypes } from "../../../stateEmpty/constants";

function* getPropertyByNameFunction(data) {
  try {
    yield put({
      type: propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_LOADING,
      payload: {},
    });
    const response = yield call(getpropertyByNameDataEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_ERROR,
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

export function* acctionGetPropertyInsightByName(): any {
  yield takeEvery(
    propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_FIRST,
    getPropertyByNameFunction
  );
}
export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

function* propertyInsightSaga(): any {
  yield all([fork(acctionGetPropertyInsightByName), fork(acctionStateEmpty)]);
}

export default propertyInsightSaga;
