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

export const updateAccountPasswordActions = (data) => ({
    type: PagesApisActionTypes.UPDATE_ACCOUNT_UPDATE_PASSWORD_FIRST,
    data,
});

export const getPMSIntegrationActions = (data) => ({
    type: PagesApisActionTypes.PMS_INTEGRATION_GET_FIRST,
    data,
});

// export const addPMSIntegrationActions = (data) => ({
//     type: PagesApisActionTypes.PMS_INTEGRATION_ADD_FIRST,
//     data,
// });

export const getCalryLinkActions = (data) => ({
    type: PagesApisActionTypes.GET_CALRY_LINK_FIRST,
    data,
});

export const getRemoveIntegrationActions = (data) => ({
    type: PagesApisActionTypes.REMOVE_INTEGRATION_LIST_GET_FIRST,
    data,
});

export const removeIntegrationActions = (data) => ({
    type: PagesApisActionTypes.REMOVE_INTEGRATION_FIRST,
    data,
});




