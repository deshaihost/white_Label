// @flow
import { LoginActionTypes } from './constants';

export const loginActions = (data) => ({
    type: LoginActionTypes.LOGIN_FIRST,
    data,
});


