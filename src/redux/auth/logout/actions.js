import { LogoutActionTypes } from './constants';

export const logoutActions = (data) => ({
    type: LogoutActionTypes.LOGOUT_FIRST,
    data,
});

