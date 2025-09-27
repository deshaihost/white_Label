import { APICore } from "../../../../helper/apiCore";
import * as URL from "../../../../helper/apiEndPoint";

const api = new APICore();



function goToBillingPortalPostEndPoint() {
  return api.create(URL.GO_TO_BILLING_PORTAL);
}

function postPropertiesEndPoint(params) {
  const { data } = params;
  return api.create(URL.POST_PROPERTIES, data);
}

function getQuestionnaireEndPoint(params) {
  const { data } = params;
  return api.get(`${URL.GET_QUESTIONNAIRE}/${data}/get_questionnaire`);
}

function pullConversationDataEndPoint(params) {
  const { data } = params;
  return api.create(`${URL.PULL_CONVERSATION_DATA}/${data}/pull_conversation_history`, {});
}

function listIntegrationPropertiesEndPoint(params) {
  return api.get(`${URL.LIST_INTEGRATION_PROPERTIES}`);
}

function deleteListIntegrationPropertiesEndPoint(params) {
  const { data } = params;
  return api.delete(`${URL.DELETE_INTEGRATION_PROPERTIES}/${data}`);
}

function updateQuestionnaireEndPoint(params) {
  const { data } = params;
  return api.update(
    `${URL.UPDATE_QUESTIONNAIRE}/${data?.nameKey?.nameKey}/update_questionnaire`,
    data?.formeData
  );
}
function supportingDocumentPostEndPoint(params) {
  const { data } = params;
  const formData = data?.formData;
  // return
  return api.create(
    `${URL.SUPPORTING_DOCUMENT}/${data?.supportingkeyName}/add_file`,
    formData
  );
}
function supportingUrlPostEndPoint(params) {
  const { data } = params;
  return api.create(
    `${URL.SUPPORTING_URL}/${data?.nameKey?.nameKey}/add_url`,
    data?.data
  );
}

function toggleChatbotOnOffPutEndPoint(params) {
  const { data } = params;
  return api.update(URL.TOGGLE_CHATBOT, data);
}

function copyExistingPropertyEndPoint(params) {
  const { data } = params;
  return api.update(`${URL.COPY_QUESTIONNAIRE}/${data?.newPropertyNm}/copy_questionnaire`,{
    source_property_name:data?.oldPropertyNm
} );
}

function removeSupportingDocsEndPoint(params) {
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

