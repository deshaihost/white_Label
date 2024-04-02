import { ForgotPasswordActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';

const SEND_PASSWORD_REST_EMAIL_INITIAL_STATE = {
    sendPasswordRestEmail: [],
    loading: false,
};


const sendPasswordRestEmailReducer = (
    state = SEND_PASSWORD_REST_EMAIL_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_LOADING:
            return {
                sendPasswordRestEmail: state.sendPasswordRestEmail,
                loading: true,
            };
        case ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_SUCCESS:
            return {
                sendPasswordRestEmail: action.payload,
                loading: false,
            };
        case ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_ERROR:
            return {
                sendPasswordRestEmail: action.payload,
                loading: false,
            };
        case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
            return SEND_PASSWORD_REST_EMAIL_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    sendPasswordRestEmailReducer,
}
