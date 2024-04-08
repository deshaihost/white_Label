import { LogoutActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';

const LOGOUT_INITIAL_STATE = {
    logout: [],
    loading: false,
};


const logoutReducer = (
    state = LOGOUT_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case LogoutActionTypes.LOGOUT_LOADING:
            return {
                logout: state.logout,
                loading: true,
            };
        case LogoutActionTypes.LOGOUT_SUCCESS:
            return {
                logout: action.payload,
                loading: false,
            };
        case LogoutActionTypes.LOGOUT_ERROR:
            return {
                logout: action.payload,
                loading: false,
            };
        case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
            return LOGOUT_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    logoutReducer
}
