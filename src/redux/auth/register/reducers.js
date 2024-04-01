import { RegisterActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';
const REGISTER_INITIAL_STATE = {
    register: [],
    loading: false,
};


const registerReducer = (
    state = REGISTER_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case RegisterActionTypes.REGISTER_LOADING:
            return {
                register: state.register,
                loading: true,
            };
        case RegisterActionTypes.REGISTER_SUCCESS:
            return {
                register: action.payload,
                loading: false,
            };
        case RegisterActionTypes.REGISTER_ERROR:
            return {
                register: action?.payload,
                loading: false,
            };
        case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
            return REGISTER_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    registerReducer
}
