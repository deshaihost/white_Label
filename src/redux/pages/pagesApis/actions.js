// @flow
import { PagesApisActionTypes } from './constants';

export const getUserDataActions = (data) => ({
    type: PagesApisActionTypes.GET_USER_DATA_FIRST,
    data,
});

export const postCreateCheckoutSessionActions = (data) => ({
    type: PagesApisActionTypes.POST_CREATE_CHECKOUT_SESSION_FIRST,
    data,
});

export const updateAccountInfoActions = (data) => ({
    type: PagesApisActionTypes.UPDATE_ACCOUNT_INFO_FIRST,
    data,
});



