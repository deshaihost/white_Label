// @flow
import { MeetHostActionTypes } from './constants';

export const getSessionIdActions = (data) => ({
    type: MeetHostActionTypes.GET_SESSION_ID_FIRST,
    data,
});

export const chatBoxAIActions = (data) => ({
    type: MeetHostActionTypes.CHAT_BOX_AI_FIRST,
    data,
});

