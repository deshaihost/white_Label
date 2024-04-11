import { AddPropertiesActionTypes } from "./constants";
import { StateEmtpyActionTypes } from "../../../stateEmpty/constants";

const POST_PROPERTIES_INITIAL_STATE = {
  postProperties: [],
  loading: false,
};
const GET_QUESTIONNAIRE_INITIAL_STATE = {
  getQuestionnaire: [],
  loading: false,
};
const UPDATE_QUESTIONNAIRE_INITIAL_STATE = {
  updateQuestionnaire: [],
  loading: false,
};
const GO_TO_BILLING_PORTAL_POST_INITIAL_STATE = {
  gotoBillingPortal: [],
  loading: false,
};

const postPropertiesReducer = (
  state = POST_PROPERTIES_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.POST_PROPERTIES_LOADING:
      return {
        postProperties: state.postProperties,
        loading: true,
      };
    case AddPropertiesActionTypes.POST_PROPERTIES_SUCCESS:
      return {
        postProperties: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.POST_PROPERTIES_ERROR:
      return {
        postProperties: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return POST_PROPERTIES_INITIAL_STATE;
    default:
      return state;
  }
};
const getQuestionnaireReducer = (
  state = GET_QUESTIONNAIRE_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.GET_QUESTIONNAIRE_LOADING:
      return {
        getQuestionnaire: state.getQuestionnaire,
        loading: true,
      };
    case AddPropertiesActionTypes.GET_QUESTIONNAIRE_SUCCESS:
      return {
        getQuestionnaire: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.GET_QUESTIONNAIRE_ERROR:
      return {
        getQuestionnaire: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return POST_PROPERTIES_INITIAL_STATE;
    default:
      return state;
  }
};
const updateQuestionnaireReducer = (
  state = UPDATE_QUESTIONNAIRE_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_LOADING:
      return {
        updateQuestionnaire: state.updateQuestionnaire,
        loading: true,
      };
    case AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_SUCCESS:
      return {
        updateQuestionnaire: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_ERROR:
      return {
        updateQuestionnaire: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return POST_PROPERTIES_INITIAL_STATE;
    default:
      return state;
  }
};
const gotoBillingPortalPostReducer = (
  state = GO_TO_BILLING_PORTAL_POST_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_LOADING:
      return {
        gotoBillingPortal: state.gotoBillingPortal,
        loading: true,
      };
    case AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_SUCCESS:
      return {
        gotoBillingPortal: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_ERROR:
      return {
        gotoBillingPortal: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return POST_PROPERTIES_INITIAL_STATE;
    default:
      return state;
  }
};

export {
  postPropertiesReducer,
  getQuestionnaireReducer,
  gotoBillingPortalPostReducer,
  updateQuestionnaireReducer
};
