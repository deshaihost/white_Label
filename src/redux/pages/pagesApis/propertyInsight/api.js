import { APICore } from "../../../../helper/apiCore";
import * as URL from "../../../../helper/apiEndPoint";

const api = new APICore();

function getpropertyByNameDataEndPoint(params: any): any {
  const { data } = params;
  return api.get(`${URL.GET_PROPERTY_BY_NAME}${data?.propertyName}`);
}
function propertyGetConversationsEndPoint(params: any): any {
  const { data } = params;
  return api.get(
    `${URL.PROPERTY_GET_CONVERSATION}${data?.propertyName}/get_conversations`
  );
}

export { getpropertyByNameDataEndPoint, propertyGetConversationsEndPoint };
