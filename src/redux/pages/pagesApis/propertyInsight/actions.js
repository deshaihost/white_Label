import { propertyInsightActionTypes } from './constants';

export const getPropertyInsightByNameActions = (data) => ({
    type: propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_FIRST,
    data
});

export const PropertyGetConversationsActions = (data) => ({
    type: propertyInsightActionTypes.PROPERTY_GET_CONVERSATION_FIRST,
    data
});