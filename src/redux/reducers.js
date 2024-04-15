// @flow
import { combineReducers } from "redux";
import { loginReducer } from "./auth/login/reducers";
import { registerReducer } from "./auth/register/reducers";
import { sendPasswordRestEmailReducer } from "./auth/forgotPassword/reducers";
import {
  chatBoxAIReducer,
  getSessionIdReducer,
} from "./pages/meetHostBuddy/reducers";
import {
  getUserDataReducer,
  postcreateCheckoutSessionReducer,
  updateAccountInfoReducer,
  pmsIntegrationGetReducer,
  pmsIntegrationAddReducer,
  removeIntegrationGetReducer,
  removeIntegrationReducer,
  
} from "./pages/pagesApis/reducers";
import {
  postPropertiesReducer,
  getQuestionnaireReducer,
  gotoBillingPortalPostReducer,
  updateQuestionnaireReducer,
  deleteListIntegrationPropertiesReducer,
  supportingDocumentPostReducer,
  supportingUrlPostReducer,
  togglechatBotOnOffReducer
} from "./pages/pagesApis/addProperties/reducers";
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
  pmsIntegrationAddReducer,
  removeIntegrationGetReducer,
  removeIntegrationReducer,
  postPropertiesReducer,
  getQuestionnaireReducer,
  gotoBillingPortalPostReducer,
  updateQuestionnaireReducer,
  deleteListIntegrationPropertiesReducer,
  supportingDocumentPostReducer,
  supportingUrlPostReducer,
  togglechatBotOnOffReducer
}): any);
