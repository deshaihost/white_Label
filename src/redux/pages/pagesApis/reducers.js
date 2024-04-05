import { PagesApisActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';

const GET_USER_DATA_INITIAL_STATE = {
    getUserData: [],
    loading: false,
};




const getSessionIdReducer = (
    state = GET_USER_DATA_INITIAL_STATE,
    action
) => {
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

export {
    getSessionIdReducer
}
