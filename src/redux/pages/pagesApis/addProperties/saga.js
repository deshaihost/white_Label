import { all, fork, put, takeEvery, call } from "redux-saga/effects";
import { AddPropertiesActionTypes } from "./constants";
import {
  postPropertiesEndPoint,
  getQuestionnaireEndPoint,
  pullConversationDataEndPoint,
  goToBillingPortalPostEndPoint,
  updateQuestionnaireEndPoint,
  listIntegrationPropertiesEndPoint,
  deleteListIntegrationPropertiesEndPoint,
  supportingDocumentPostEndPoint,
  supportingUrlPostEndPoint,
  toggleChatbotOnOffPutEndPoint,
  copyExistingPropertyEndPoint,
  removeSupportingDocsEndPoint
} from "./api";
import { StateEmtpyActionTypes } from "../../../stateEmpty/constants";


function* gotoBillingPortalPostFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_LOADING,
      payload: {},
    });
    const response = yield call(goToBillingPortalPostEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    console.log(error,'errorsaga')
    yield put({
      type: AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_ERROR,
      payload: error,
    });
  }
}

function* postPropertiesFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.POST_PROPERTIES_LOADING,
      payload: {},
    });
    const response = yield call(postPropertiesEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.POST_PROPERTIES_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.POST_PROPERTIES_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.POST_PROPERTIES_ERROR,
      payload: error,
    });
  }
}

function* supportingDocumentPostFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_LOADING,
      payload: {},
    });
    const response = yield call(supportingDocumentPostEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_ERROR,
      payload: error,
    });
  }
}
function* supportingUrlPostFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.SUPPORTING_URL_POST_LOADING,
      payload: {},
    });
    const response = yield call(supportingUrlPostEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.SUPPORTING_URL_POST_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.SUPPORTING_URL_POST_ERROR,
      payload: error,
    });
  }
}


function* getQuestionnaireFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.GET_QUESTIONNAIRE_LOADING,
      payload: {},
    });
    const response = yield call(getQuestionnaireEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.GET_QUESTIONNAIRE_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.GET_QUESTIONNAIRE_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.GET_QUESTIONNAIRE_ERROR,
      payload: error,
    });
  }
}

function* resetQuestionnaireStateFunction(data) {
  yield put({
    type: AddPropertiesActionTypes.GET_QUESTIONNAIRE_RESET,
    payload: {},
  });
}


function* pullConversationDataFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.PULL_CONVERSATION_DATA_LOADING,
      payload: {property_name: data.data},
    });
    const response = yield call(pullConversationDataEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.PULL_CONVERSATION_DATA_SUCCESS,
        payload: { data:response.data, status:response.status, property_name:data.data },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.PULL_CONVERSATION_DATA_ERROR,
        payload: { ...response.data, property_name: data.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.PULL_CONVERSATION_DATA_ERROR,
      payload: {error:error, property_name: data.data},
    });
  }
}

function* listIntegrationFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_LOADING,
      payload: {},
    });
    const response = yield call(listIntegrationPropertiesEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_ERROR,
      payload: error,
    });
  }
}

function* deleteListIntegrationFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_LOADING,
      payload: {},
    });
    const response = yield call(deleteListIntegrationPropertiesEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_ERROR,
      payload: error,
    });
  }
}

function* updateQuestionnaireFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_LOADING,
      payload: {},
    });
    const response = yield call(updateQuestionnaireEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_ERROR,
      payload: error,
    });
  }
}

function* toggleChatbotOnOffFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_LOADING,
      payload: {},
    });
    const response = yield call(toggleChatbotOnOffPutEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_ERROR,
      payload: error,
    });
  }
}

function* copyExistingPropertyFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.COPY_EXITING_PROPERTY_LOADING,
      payload: {},
    });
    const response = yield call(copyExistingPropertyEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.COPY_EXITING_PROPERTY_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.COPY_EXITING_PROPERTY_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.COPY_EXITING_PROPERTY_ERROR,
      payload: error,
    });
  }
}
function* removeSupportingDocsFunction(data) {
  try {
    yield put({
      type: AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_LOADING,
      payload: {},
    });
    const response = yield call(removeSupportingDocsEndPoint, data);
    if (response.status === 200) {
      yield put({
        type: AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_SUCCESS,
        payload: { data: response.data, status: response.status },
      });
    } else {
      yield put({
        type: AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_ERROR,
        payload: { ...response.data },
      });
    }
  } catch (error) {
    yield put({
      type: AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_ERROR,
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



export function* acctionPostProperties(): any {
  yield takeEvery(
    AddPropertiesActionTypes.POST_PROPERTIES_FIRST,
    postPropertiesFunction
  );
}

export function* acctionGetQuestionnaire(): any {
  yield takeEvery(
    AddPropertiesActionTypes.GET_QUESTIONNAIRE_FIRST,
    getQuestionnaireFunction
  );
}

export function* acctionResetQuestionnaireState(): any {
  yield takeEvery(
    AddPropertiesActionTypes.GET_QUESTIONNAIRE_RESET,
    resetQuestionnaireStateFunction
  );
}

export function* acctionPullConversationData(): any {
  yield takeEvery(
    AddPropertiesActionTypes.PULL_CONVERSATION_DATA_FIRST,
    pullConversationDataFunction
  );
}

export function* acctionListIntegrationProperties(): any {
  yield takeEvery(
    AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_FIRST,
    listIntegrationFunction
  );
}

export function* acctionDeleteListIntegration(): any {
  yield takeEvery(
    AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_FIRST,
    deleteListIntegrationFunction
  );
}

export function* acctionUpdateQuestionnaire(): any {
  yield takeEvery(
    AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_FIRST,
    updateQuestionnaireFunction
  );
}
export function* acctionGoToBillingPortalPost(): any {
  yield takeEvery(
    AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_FIRST,
    gotoBillingPortalPostFunction
  );
}
export function* acctionSupportingDocumentPost(): any {
  yield takeEvery(
    AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_FIRST,
    supportingDocumentPostFunction
  );
}
export function* acctionUrlDocumentPost(): any {
  yield takeEvery(
    AddPropertiesActionTypes.SUPPORTING_URL_POST_FIRST,
    supportingUrlPostFunction
  );
}

export function* acctionStateEmpty(): any {
  yield takeEvery(StateEmtpyActionTypes.STATE_EMPTY_FIRST, stateEmptyFunction);
}

export function* acctionToggleChatbotOnOff(): any {
  yield takeEvery(AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_FIRST, toggleChatbotOnOffFunction);
}
export function* acctionCopyExistingProperty(): any {
  yield takeEvery(AddPropertiesActionTypes.COPY_EXITING_PROPERTY_FIRST, copyExistingPropertyFunction);
}
export function* acctionRemoveSupportingDocs(): any {
  yield takeEvery(AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_FIRST, removeSupportingDocsFunction);
}



function* addPropertiesSaga(): any {
  yield all([
    fork(acctionStateEmpty),
    fork(acctionPostProperties),
    fork(acctionGetQuestionnaire),
    fork(acctionPullConversationData),
    fork(acctionGoToBillingPortalPost),
    fork(acctionUpdateQuestionnaire),
    fork(acctionListIntegrationProperties),
    fork(acctionDeleteListIntegration),
    fork(acctionSupportingDocumentPost),
    fork(acctionUrlDocumentPost),
    fork(acctionToggleChatbotOnOff),
    fork(acctionCopyExistingProperty),
    fork(acctionRemoveSupportingDocs)
  ]);
}

export default addPropertiesSaga;
