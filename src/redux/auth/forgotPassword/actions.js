// @flow
import { ForgotPasswordActionTypes } from './constants';

export const sendPasswordRestEmailActions = (data) => ({
    type: ForgotPasswordActionTypes.SEND_PASSWORD_REST_EMAIL_FIRST,
    data,
});

