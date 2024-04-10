import { APICore } from "../../../../helper/apiCore";
import * as URL from "../../../../helper/apiEndPoint";

const api = new APICore();

function testingApiEndPoint(params: any): any {
  const { data } = params;
  return api.create(URL.TESTING_API);
}

function goToBillingPortalPostEndPoint(): any {
  return api.create(URL.GO_TO_BILLING_PORTAL);
}

function postPropertiesEndPoint(params: any): any {
  const { data } = params;
  console.log(data, "datadatadata");
  return api.create(URL.POST_PROPERTIES, data);
}

function getQuestionnaireEndPoint(params: any): any {
  const { data } = params;
  return api.get(`${URL.GET_QUESTIONNAIRE}/${data}/get_questionnaire`, data);
}

export {
  testingApiEndPoint,
  postPropertiesEndPoint,
  getQuestionnaireEndPoint,
  goToBillingPortalPostEndPoint,
};
