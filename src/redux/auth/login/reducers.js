import { LoginActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';

const LOGIN_INITIAL_STATE = {
    login: [],
    loading: false,
};


const loginReducer = (
    state = LOGIN_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case LoginActionTypes.LOGIN_LOADING:
            return {
                login: state.login,
                loading: true,
            };
        case LoginActionTypes.LOGIN_SUCCESS:
            return {
                login: action.payload,
                loading: false,
            };
        case LoginActionTypes.LOGIN_ERROR:
            return {
                login: action.payload,
                loading: false,
            };
        case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
            return LOGIN_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    loginReducer,
}
