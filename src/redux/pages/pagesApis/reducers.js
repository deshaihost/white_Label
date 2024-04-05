import { PagesApisActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';

const GET_USER_DATA_INITIAL_STATE = {
    getUserData: [],
    loading: false,
};

const POST_CREATE_CHECKOUT_SESSION_INITIAL_STATE = {
    createCheckoutSessionUrl: [],
    loading: false,
};




const getUserDataReducer = (
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

export {
    getUserDataReducer,
    postcreateCheckoutSessionReducer
}
