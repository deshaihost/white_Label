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

const LIST_INTEGRATION_PROPERTIES_INITIAL_STATE = {
  listIntegrationProperties: [],
  loading: false,
};

const DELETE_LIST_INTEGRATION_PROPERTIES_INITIAL_STATE = {
  deleteListIntegrationProperties: [],
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

const SUPPORTING_DOCUMENT_POST_INITIAL_STATE = {
  supportingDoc: [],
  loading: false,
};
const SUPPORTING_URL_POST_INITIAL_STATE = {
  supportingUrl: [],
  loading: false,
};
const TOGGLE_CHATBOT_ONOFF_PUT_INITIAL_STATE = {
  toggleChatBotOnOff: [],
  loading: false,
};

const COPY_EXISTING_PROPERTY_INITIAL_STATE = {
  copyExistingProperty: [],
  loading: false,
};

const REMOVE_SUPPORTING_DOCS_INITIAL_STATE = {
  removeSupportingDocs: [],
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

const listIntegrationPropertiesReducer = (state = LIST_INTEGRATION_PROPERTIES_INITIAL_STATE, action) => {
  switch (action.type) {
    case AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_LOADING:
      return {
        listIntegrationProperties: state.listIntegrationProperties,
        loading: true,
      };
    case AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_SUCCESS:
      return {
        listIntegrationProperties: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.LIST_INTEGRATION_PROPERTIES_ERROR:
      return {
        listIntegrationProperties: action.payload,
        loading: false,
      };
    // case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
    //     return GET_PROPERTY_BY_NAME_INITIAL_STATE;
    default:
      return state;
  }
};

const deleteListIntegrationPropertiesReducer = (
  state = DELETE_LIST_INTEGRATION_PROPERTIES_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_LOADING:
      return {
        deleteListIntegrationProperties: state.deleteListIntegrationProperties,
        loading: true,
      };
    case AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_SUCCESS:
      return {
        deleteListIntegrationProperties: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.DELETE_LIST_INTEGRATION_PROPERTIES_ERROR:
      return {
        deleteListIntegrationProperties: action.payload,
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
      return UPDATE_QUESTIONNAIRE_INITIAL_STATE;
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
const supportingDocumentPostReducer = (
  state = SUPPORTING_DOCUMENT_POST_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_LOADING:
      return {
        supportingDoc: state.supportingDoc,
        loading: true,
      };
    case AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_SUCCESS:
      return {
        supportingDoc: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.SUPPORTING_DOCUMENT_POST_ERROR:
      return {
        supportingDoc: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return SUPPORTING_DOCUMENT_POST_INITIAL_STATE;
    default:
      return state;
  }
};
const supportingUrlPostReducer = (
  state = SUPPORTING_URL_POST_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.SUPPORTING_URL_POST_LOADING:
      return {
        supportingUrl: state.supportingUrl,
        loading: true,
      };
    case AddPropertiesActionTypes.SUPPORTING_URL_POST_SUCCESS:
      return {
        supportingUrl: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.SUPPORTING_URL_POST_ERROR:
      return {
        supportingUrl: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return SUPPORTING_URL_POST_INITIAL_STATE;
    default:
      return state;
  }
};
const togglechatBotOnOffReducer = (
  state = TOGGLE_CHATBOT_ONOFF_PUT_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_LOADING:
      return {
        toggleChatBotOnOff: state.toggleChatBotOnOff,
        loading: true,
      };
    case AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_SUCCESS:
      return {
        toggleChatBotOnOff: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.TOGGLE_CHATBOT_ONOFF_PUT_ERROR:
      return {
        toggleChatBotOnOff: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return SUPPORTING_URL_POST_INITIAL_STATE;
    default:
      return state;
  }
};

const copyExistingPropertyReducer = (
  state = COPY_EXISTING_PROPERTY_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.COPY_EXITING_PROPERTY_LOADING:
      return {
        copyExistingProperty: state.copyExistingProperty,
        loading: true,
      };
    case AddPropertiesActionTypes.COPY_EXITING_PROPERTY_SUCCESS:
      return {
        copyExistingProperty: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.COPY_EXITING_PROPERTY_ERROR:
      return {
        copyExistingProperty: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return COPY_EXISTING_PROPERTY_INITIAL_STATE;
    default:
      return state;
  }
};

const removeSupportingDocsReducer = (
  state = REMOVE_SUPPORTING_DOCS_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_LOADING:
      return {
        removeSupportingDocs: state.removeSupportingDocs,
        loading: true,
      };
    case AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_SUCCESS:
      return {
        removeSupportingDocs: action.payload,
        loading: false,
      };
    case AddPropertiesActionTypes.REMOVE_SUPPORTING_DOCS_ERROR:
      return {
        removeSupportingDocs: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return REMOVE_SUPPORTING_DOCS_INITIAL_STATE;
    default:
      return state;
  }
};


export {
  postPropertiesReducer,
  getQuestionnaireReducer,
  gotoBillingPortalPostReducer,
  updateQuestionnaireReducer,
  listIntegrationPropertiesReducer,
  deleteListIntegrationPropertiesReducer,
  supportingDocumentPostReducer,
  supportingUrlPostReducer,
  togglechatBotOnOffReducer,
  copyExistingPropertyReducer,
  removeSupportingDocsReducer
};
