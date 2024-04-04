// @flow
import { RegisterActionTypes } from './constants';
export const registerActions = (data) => ({
    type: RegisterActionTypes.REGISTER_FIRST,
    data,
});

