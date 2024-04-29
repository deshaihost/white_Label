import { propertyInsightActionTypes } from './constants';

export const getPropertyInsightByNameActions = (data) => ({
    type: propertyInsightActionTypes.GET_PROPERTY_INSIGHT_BY_NAME_FIRST,
    data
});