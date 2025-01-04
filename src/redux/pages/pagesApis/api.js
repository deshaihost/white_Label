import { APICore } from "../../../helper/apiCore";
import * as URL from "../../../helper/apiEndPoint";

const api = new APICore();

function getUserDataEndPoint(params: any): any {
  const { data } = params;
  const queryParam = data?.include_property_data !== undefined 
    ? `?include_property_data=${data.include_property_data}` 
    : '';
  return api.get(`${URL.GET_USER_DATA}${queryParam}`);
}

function postCreateCheckoutSessionEndPoint(params: any): any {
  const { data } = params;
  return api.create(URL.POST_CREATE_CHECKOUT_SESSION, data);
}

function updateAccountInfoEndPoint(params: any): any {
  const { data } = params;
  return api.update(URL.UPDATE_ACCOUNT_INFO, data);
}
function updateAccountUpdatePasswordEndPoint(params: any): any {
  const { data } = params;
  return api.create(URL.UPDATE_ACCOUNT_UPDATE_PASSWORD, data);
}

function PMSintegrationEndPoint(params: any): any {
  return api.get(URL.GET_SUPPORTED_INTEGRATIONS);
}

function putCompleteActionItemEndPoint(params: any): any {
  const { data } = params;
  return api.update(URL.COMPLETE_ACTIONS_ITEMS, data);
}

function getCalryLinkEndPoint(params: any): any {
  const { data } = params;
  return api.get(`${URL.GET_CALRY_LINK}integration_platform=${data?.platform}`);
}

function getActionsItemsEndPoint(params: any): any {
  const { data } = params;
  const queryParam = data?.limit !== undefined ? `?limit=${data.limit}` : '';
  return api.get(`${URL.GET_ACTIONS_ITEMS}${queryParam}`);
}

function removeIntegrationListGetEndPoint(params: any): any {
  
  return api.get(URL.GET_AVAIL_INTEGRATIONS);
}

function removeIntegrationEndPoint(params: any): any {
  const { data } = params;
  return api.delete(URL.REMOVE_INTEGRATION, data);
}

export {
  getUserDataEndPoint,
  postCreateCheckoutSessionEndPoint,
  updateAccountInfoEndPoint,
  PMSintegrationEndPoint,
  getCalryLinkEndPoint,
  removeIntegrationListGetEndPoint,
  removeIntegrationEndPoint,
  updateAccountUpdatePasswordEndPoint,
  getActionsItemsEndPoint,
  putCompleteActionItemEndPoint
};
