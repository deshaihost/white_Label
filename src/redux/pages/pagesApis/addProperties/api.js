import { APICore } from "../../../../helper/apiCore";
import * as URL from "../../../../helper/apiEndPoint";

const api = new APICore();



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

function pullConversationDataEndPoint(params: any): any {
  const { data } = params;
  return api.create(`${URL.PULL_CONVERSATION_DATA}/${data}/pull_conversation_history`, {});
}

function listIntegrationPropertiesEndPoint(params: any): any {
  return api.get(`${URL.LIST_INTEGRATION_PROPERTIES}`);
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
  const formData = data?.formData;
  // return
  return api.create(
    `${URL.SUPPORTING_DOCUMENT}/${data?.supportingkeyName}/add_file`,
    formData
  );
}
function supportingUrlPostEndPoint(params: any): any {
  const { data } = params;
  return api.create(
    `${URL.SUPPORTING_URL}/${data?.nameKey?.nameKey}/add_url`,
    data?.data
  );
}

function toggleChatbotOnOffPutEndPoint(params: any): any {
  const { data } = params;
  return api.update(URL.TOGGLE_CHATBOT, data);
}

function copyExistingPropertyEndPoint(params: any): any {
  const { data } = params;
  return api.update(`${URL.COPY_QUESTIONNAIRE}/${data?.newPropertyNm}/copy_questionnaire`,{
    source_property_name:data?.oldPropertyNm
} );
}

function removeSupportingDocsEndPoint(params: any): any {
  const { data } = params;
  return api.delete(`${URL.REMOVE_SUPPORTING_DOCS}/${data?.newPropertyNm}/delete_file?file_name=${data?.doc_name}`);
}

export {
  postPropertiesEndPoint,
  getQuestionnaireEndPoint,
  pullConversationDataEndPoint,
  goToBillingPortalPostEndPoint,
  updateQuestionnaireEndPoint,
  listIntegrationPropertiesEndPoint,
  deleteListIntegrationPropertiesEndPoint,
  supportingDocumentPostEndPoint,
  supportingUrlPostEndPoint,
  toggleChatbotOnOffPutEndPoint,
  copyExistingPropertyEndPoint,
  removeSupportingDocsEndPoint
};
