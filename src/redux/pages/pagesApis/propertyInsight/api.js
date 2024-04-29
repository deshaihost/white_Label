import { APICore } from "../../../../helper/apiCore";
import * as URL from "../../../../helper/apiEndPoint";

const api = new APICore();

function getpropertyByNameDataEndPoint(params: any): any {
  const { data } = params;
  return api.get(`${URL.GET_PROPERTY_BY_NAME}${data?.propertyName}`);
}

export { getpropertyByNameDataEndPoint };
