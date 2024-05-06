import { PagesApisActionTypes } from "./constants";
import { StateEmtpyActionTypes } from "../../stateEmpty/constants";

const GET_USER_DATA_INITIAL_STATE = {
  getUserData: [],
  loading: false,
};

const POST_CREATE_CHECKOUT_SESSION_INITIAL_STATE = {
  createCheckoutSessionUrl: [],
  loading: false,
};

const UPDATE_ACCOUNT_INFO_INITIAL_STATE = {
  updateAccountInof: [],
  loading: false,
};
const UPDATE_ACCOUNT_UPDATE_PASSWORD_INITIAL_STATE = {
  updateAccountUpdatePassword: [],
  loading: false,
};

const PMS_INTEGRATION_GET_INITIAL_STATE = {
  pmsIntegrationData: [],
  loading: false,
};

// const PMS_INTEGRATION_ADD_INITIAL_STATE = {
//   pmsIntegrationDataAdd: [],
//   loading: false,
// };

const GET_CALRY_LINK_INITIAL_STATE = {
  getCalryLing: [],
  loading: false,
};

const REMOVE_INTEGRATION_LIST_GET_INITIAL_STATE = {
  removeIntegrationGet: [],
  loading: false,
};

const REMOVE_INTEGRATION_INITIAL_STATE = {
  removeIntegration: [],
  loading: false,
};

const getUserDataReducer = (state = GET_USER_DATA_INITIAL_STATE, action) => {
  switch (action.type) {
    case PagesApisActionTypes.GET_USER_DATA_LOADING:
      return {
        getUserData: state.getUserData,
        loading: true,
      };
    case PagesApisActionTypes.GET_USER_DATA_SUCCESS:
      return {
        getUserData: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.GET_USER_DATA_ERROR:
      return {
        getUserData: action.payload,
        loading: false,
      };
    // case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
    //     return GET_SESSION_ID_INITIAL_STATE;
    default:
      return state;
  }
};
const postcreateCheckoutSessionReducer = (
  state = POST_CREATE_CHECKOUT_SESSION_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_LOADING:
      return {
        createCheckoutSessionUrl: state.createCheckoutSessionUrl,
        loading: true,
      };
    case PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_SUCCESS:
      return {
        createCheckoutSessionUrl: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_ERROR:
      return {
        createCheckoutSessionUrl: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return POST_CREATE_CHECKOUT_SESSION_INITIAL_STATE;
    default:
      return state;
  }
};

const updateAccountInfoReducer = (
  state = UPDATE_ACCOUNT_INFO_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.UPDATE_ACCOUNT_INFO_LOADING:
      return {
        updateAccountInof: state.updateAccountInof,
        loading: true,
      };
    case PagesApisActionTypes.UPDATE_ACCOUNT_INFO_SUCCESS:
      return {
        updateAccountInof: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.UPDATE_ACCOUNT_INFO_ERROR:
      return {
        updateAccountInof: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return UPDATE_ACCOUNT_INFO_INITIAL_STATE;
    default:
      return state;
  }
};
const updateAccountUpdatePasswordReducer = (
  state = UPDATE_ACCOUNT_UPDATE_PASSWORD_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_LOADING:
      return {
        updateAccountUpdatePassword: state.updateAccountUpdatePassword,
        loading: true,
      };
    case PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_SUCCESS:
      return {
        updateAccountUpdatePassword: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_ERROR:
      return {
        updateAccountUpdatePassword: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return UPDATE_ACCOUNT_UPDATE_PASSWORD_INITIAL_STATE;
    default:
      return state;
  }
};

const pmsIntegrationGetReducer = (
  state = PMS_INTEGRATION_GET_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.PMS_INTEGRATION_GET_LOADING:
      return {
        pmsIntegrationData: state.pmsIntegrationData,
        loading: true,
      };
    case PagesApisActionTypes.PMS_INTEGRATION_GET_SUCCESS:
      return {
        pmsIntegrationData: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.PMS_INTEGRATION_GET_ERROR:
      return {
        pmsIntegrationData: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return UPDATE_ACCOUNT_INFO_INITIAL_STATE;
    default:
      return state;
  }
};

// const pmsIntegrationAddReducer = (
//   state = PMS_INTEGRATION_ADD_INITIAL_STATE,
//   action
// ) => {
//   switch (action.type) {
//     case PagesApisActionTypes.PMS_INTEGRATION_ADD_LOADING:
//       return {
//         pmsIntegrationDataAdd: state.pmsIntegrationDataAdd,
//         loading: true,
//       };
//     case PagesApisActionTypes.PMS_INTEGRATION_ADD_SUCCESS:
//       return {
//         pmsIntegrationDataAdd: action.payload,
//         loading: false,
//       };
//     case PagesApisActionTypes.PMS_INTEGRATION_ADD_ERROR:
//       return {
//         pmsIntegrationDataAdd: action.payload,
//         loading: false,
//       };
//     case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
//       return PMS_INTEGRATION_ADD_INITIAL_STATE;
//     default:
//       return state;
//   }
// };

const getCalryLinkReducer = (
  state = GET_CALRY_LINK_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.GET_CALRY_LINK_LOADING:
      return {
        getCalryLing: state.getCalryLing,
        loading: true,
      };
    case PagesApisActionTypes.GET_CALRY_LINK_SUCCESS:
      return {
        getCalryLing: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.GET_CALRY_LINK_ERROR:
      return {
        getCalryLing: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return GET_CALRY_LINK_INITIAL_STATE;
    default:
      return state;
  }
};

const removeIntegrationGetReducer = (
  state = REMOVE_INTEGRATION_LIST_GET_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_LOADING:
      return {
        removeIntegrationGet: state.removeIntegrationGet,
        loading: true,
      };
    case PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_SUCCESS:
      return {
        removeIntegrationGet: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_ERROR:
      return {
        removeIntegrationGet: action.payload,
        loading: false,
      };
    //   case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
    //     return PMS_INTEGRATION_ADD_INITIAL_STATE;
    default:
      return state;
  }
};
const removeIntegrationReducer = (
  state = REMOVE_INTEGRATION_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case PagesApisActionTypes.REMOVE_INTEGRATION_LOADING:
      return {
        removeIntegration: state.removeIntegration,
        loading: true,
      };
    case PagesApisActionTypes.REMOVE_INTEGRATION_SUCCESS:
      return {
        removeIntegration: action.payload,
        loading: false,
      };
    case PagesApisActionTypes.REMOVE_INTEGRATION_ERROR:
      return {
        removeIntegration: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
      return REMOVE_INTEGRATION_INITIAL_STATE;
    default:
      return state;
  }
};

export {
  getUserDataReducer,
  postcreateCheckoutSessionReducer,
  updateAccountInfoReducer,
  pmsIntegrationGetReducer,
  getCalryLinkReducer,
  removeIntegrationGetReducer,
  removeIntegrationReducer,
  updateAccountUpdatePasswordReducer
};
