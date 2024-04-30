import { propertyInsightActionTypes } from "./constants";
import { StateEmtpyActionTypes } from "../../../stateEmpty/constants"; 
const GET_PROPERTY_BY_NAME_INITIAL_STATE = {
  getPropertybyName: [],
  loading: false,
};
const PROPERTY_GET_CONVERSATION_INITIAL_STATE = {
  propertyGetConversation: [],
  loading: false,
};


const getPropertyByNameReducer = (state = GET_PROPERTY_BY_NAME_INITIAL_STATE, action) => {
  switch (action.type) {
    case propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_LOADING:
      return {
        getPropertybyName: state.getPropertybyName,
        loading: true,
      };
    case propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_SUCCESS:
      return {
        getPropertybyName: action.payload,
        loading: false,
      };
    case propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_ERROR:
      return {
        getPropertybyName: action.payload,
        loading: false,
      };
    case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
        return GET_PROPERTY_BY_NAME_INITIAL_STATE;
    default:
      return state;
  }
};
const propertyGetConversationReducer = (state = PROPERTY_GET_CONVERSATION_INITIAL_STATE, action) => {
  switch (action.type) {
    case propertyInsightActionTypes.PROPERTY_GET_CONVERSATION_LOADING:
      return {
        propertyGetConversation: state.propertyGetConversation,
        loading: true,
      };
    case propertyInsightActionTypes.PROPERTY_GET_CONVERSATION_SUCCESS:
      return {
        propertyGetConversation: action.payload,
        loading: false,
      };
    case propertyInsightActionTypes.PROPERTY_GET_CONVERSATION_ERROR:
      return {
        propertyGetConversation: action.payload,
        loading: false,
      };
    // case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
    //     return GET_PROPERTY_BY_NAME_INITIAL_STATE;
    default:
      return state;
  }
};

export {
    getPropertyByNameReducer,
    propertyGetConversationReducer

};
