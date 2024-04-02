// @flow
import { RegisterActionTypes } from './constants';
import { StateEmtpyActionTypes } from '../../stateEmpty/constants';
export const registerActions = (data) => ({
    type: RegisterActionTypes.REGISTER_FIRST,
    data,
});

