// @flow
import { PagesApisActionTypes } from './constants';

export const getUserDataActions = (data) => ({
    type: PagesApisActionTypes.GET_USER_DATA_FIRST,
    data,
});



