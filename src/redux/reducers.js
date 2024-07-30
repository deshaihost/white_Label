// @flow
import { combineReducers } from "redux";
import { loginReducer } from "./auth/login/reducers";
import { registerReducer } from "./auth/register/reducers";
import { sendPasswordRestEmailReducer } from "./auth/forgotPassword/reducers";
import {
  chatBoxAIReducer,
  getSessionIdReducer,
  messageFeedBackReducer
} from "./pages/meetHostBuddy/reducers";
import {
  getUserDataReducer,
  postcreateCheckoutSessionReducer,
  updateAccountInfoReducer,
  pmsIntegrationGetReducer,
  getCalryLinkReducer,
  removeIntegrationGetReducer,
  removeIntegrationReducer,
  updateAccountUpdatePasswordReducer,
  getActionItemsReducer,
  completeActionsItemsReducer
} from "./pages/pagesApis/reducers";
import {
  postPropertiesReducer,
  getQuestionnaireReducer,
  pullConversationDataReducer,
  gotoBillingPortalPostReducer,
  updateQuestionnaireReducer,
  listIntegrationPropertiesReducer,
  deleteListIntegrationPropertiesReducer,
  supportingDocumentPostReducer,
  supportingUrlPostReducer,
  togglechatBotOnOffReducer,
  copyExistingPropertyReducer,
  removeSupportingDocsReducer

} from "./pages/pagesApis/addProperties/reducers";
import { getPropertyByNameReducer, propertyGetConversationReducer } from "./pages/pagesApis/propertyInsight/reducers";
export default (combineReducers({
  loginReducer,
  registerReducer,
  sendPasswordRestEmailReducer,
  chatBoxAIReducer,
  getSessionIdReducer,
  getUserDataReducer,
  postcreateCheckoutSessionReducer,
  updateAccountInfoReducer,
  pmsIntegrationGetReducer,
  getCalryLinkReducer,
  removeIntegrationGetReducer,
  removeIntegrationReducer,
  postPropertiesReducer,
  getQuestionnaireReducer,
  pullConversationDataReducer,
  gotoBillingPortalPostReducer,
  updateQuestionnaireReducer,
  listIntegrationPropertiesReducer,
  deleteListIntegrationPropertiesReducer,
  supportingDocumentPostReducer,
  supportingUrlPostReducer,
  togglechatBotOnOffReducer,
  getPropertyByNameReducer,
  propertyGetConversationReducer,
  updateAccountUpdatePasswordReducer,
  getActionItemsReducer,
  completeActionsItemsReducer,
  copyExistingPropertyReducer,
  messageFeedBackReducer,
  removeSupportingDocsReducer
}): any);
