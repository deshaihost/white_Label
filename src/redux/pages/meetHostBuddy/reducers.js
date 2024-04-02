import { MeetHostActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';

const CHAT_BOX_AI_INITIAL_STATE = {
    chatBoxAI: [],
    loading: false,
};
const GET_SESSION_ID_INITIAL_STATE = {
    sessionId: [],
    loading: false,
};


const chatBoxAIReducer = (
    state = CHAT_BOX_AI_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case MeetHostActionTypes.CHAT_BOX_AI_LOADING:
            return {
                chatBoxAI: state.chatBoxAI,
                loading: true,
            };
        case MeetHostActionTypes.CHAT_BOX_AI_SUCCESS:
            return {
                chatBoxAI: action.payload,
                loading: false,
            };
        case MeetHostActionTypes.CHAT_BOX_AI_ERROR:
            return {
                chatBoxAI: action.payload,
                loading: false,
            };
        case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
            return CHAT_BOX_AI_INITIAL_STATE;
        default:
            return state;
    }
};

const getSessionIdReducer = (
    state = GET_SESSION_ID_INITIAL_STATE,
    action
) => {
    switch (action.type) {
        case MeetHostActionTypes.GET_SESSION_ID_LOADING:
            return {
                sessionId: state.sessionId,
                loading: true,
            };
        case MeetHostActionTypes.GET_SESSION_ID_SUCCESS:
            return {
                sessionId: action.payload,
                loading: false,
            };
        case MeetHostActionTypes.GET_SESSION_ID_ERROR:
            return {
                sessionId: action.payload,
                loading: false,
            };
        // case StateEmtpyActionTypes.STATE_EMPTY_SUCCESS:
        //     return GET_SESSION_ID_INITIAL_STATE;
        default:
            return state;
    }
};

export {
    chatBoxAIReducer,
    getSessionIdReducer
}
