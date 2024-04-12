import { APICore } from "../../../../helper/apiCore";
import * as URL from "../../../../helper/apiEndPoint";

const api = new APICore();

function testingApiEndPoint(params: any): any {
  const { data } = params;
  // return api.create(URL.TESTING_API);
}

function goToBillingPortalPostEndPoint(): any {
  return api.create(URL.GO_TO_BILLING_PORTAL);
}

function postPropertiesEndPoint(params: any): any {
  const { data } = params;
  return api.create(URL.POST_PROPERTIES, data);
}

function getQuestionnaireEndPoint(params: any): any {
  const { data } = params;
  return api.get(`${URL.GET_QUESTIONNAIRE}/${data}/get_questionnaire`);
}
function deleteListIntegrationPropertiesEndPoint(params: any): any {
  const { data } = params;
  return api.delete(`${URL.DELETE_INTEGRATION_PROPERTIES}/${data}`);
}

function updateQuestionnaireEndPoint(params: any): any {
  const { data } = params;
  return api.update(
    `${URL.UPDATE_QUESTIONNAIRE}/${data?.nameKey?.nameKey}/update_questionnaire`,
    data?.formeData
  );
}
function supportingDocumentPostEndPoint(params: any): any {
  const { data } = params;
  return api.create(
    `${URL.SUPPORTING_DOCUMENT}/${data?.supportingkeyName}/add_file`,
    data?.formData
  );
}
function supportingUrlPostEndPoint(params: any): any {
  const { data } = params;
  console.log(data?.data,'data+++')
  return api.create(
    `${URL.SUPPORTING_URL}/${data?.nameKey?.nameKey}/add_url`,
    data?.data
  );
}

export {
  testingApiEndPoint,
  postPropertiesEndPoint,
  getQuestionnaireEndPoint,
  goToBillingPortalPostEndPoint,
  updateQuestionnaireEndPoint,
  deleteListIntegrationPropertiesEndPoint,
  supportingDocumentPostEndPoint,
  supportingUrlPostEndPoint
};
