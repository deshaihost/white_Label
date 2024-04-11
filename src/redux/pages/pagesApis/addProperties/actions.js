// @flow
import { AddPropertiesActionTypes } from './constants';

export const testingApiActions = (data) => ({
    type: AddPropertiesActionTypes.TESTING_API_FIRST,
    data,
});
export const goToBillingportalPostActions = (data) => ({
    type: AddPropertiesActionTypes.GO_TO_BILLING_PORTAL_POST_FIRST,
    data,
});

export const postPropertiesActions = (data) => ({
    type: AddPropertiesActionTypes.POST_PROPERTIES_FIRST,
    data,
});

export const getQuestionnaireActions = (data) => ({
    type: AddPropertiesActionTypes.GET_QUESTIONNAIRE_FIRST,
    data,
});

export const updateQuestionnaireActions = (data) => ({
    type: AddPropertiesActionTypes.UPDATE_QUESTIONNAIRE_FIRST,
    data,
});







