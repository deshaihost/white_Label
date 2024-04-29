import { propertyInsightActionTypes } from "./constants";
// import { StateEmtpyActionTypes } from "../../stateEmpty/constants";

const GET_PROPERTY_BY_NAME_INITIAL_STATE = {
  getPropertybyName: [],
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
    // case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
    //     return GET_SESSION_ID_INITIAL_STATE;
    default:
      return state;
  }
};

export {
    getPropertyByNameReducer,

};
