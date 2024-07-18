import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pullConversationDataActions } from "../../../../../redux/actions";
import Loader, {BoxLoader} from "../../../../../helper/Loader";
import "../questionnaire.css";


const HostBuddyKnowledgeBase = ({apiPropertyData, questionnaireData}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const apiPullConversationsData = store?.pullConversationDataReducer?.loadingProperties; // list of properties that are currently being pulled

  const [integrationPlatform, setIntegrationPlatform] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [formHasData, setFormHasData] = useState(false);

  // When apiPropertyData populates, get relevant data from it
  useEffect(() => {
    if (apiPropertyData) {
      setIntegrationPlatform(apiPropertyData?.integration?.platform);
      setDocuments(Object.keys(apiPropertyData?.supporting_doc_items?.file_data || {}));
    }
  }, [apiPropertyData]);

  // When questionnaireData loads from API, figure out if it's been populated with any data at all
  useEffect(() => {
    if (apiQuestionnaireData) {
      let foundFormData = false;
      for (const sectionName of Object.keys(apiQuestionnaireData?.questionnaire ?? {})) {
        if (foundFormData) break;
        for (const subsecName of Object.keys(apiQuestionnaireData?.questionnaire[sectionName] ?? {})) {
          if (foundFormData) break;
          for (const question of (apiQuestionnaireData?.questionnaire[sectionName][subsecName] ?? [])) {
            if ((question.response_text && (typeof question.response_text === 'string' || Array.isArray(question.response_text)) && question.response_text.length > 0) ||
                ('response_option' in question && question.response_option) ||
                ('response_options' in question && question.response_options?.length > 0)) {
              foundFormData = true;
              break;
            }
          }
        }
      }
      setFormHasData(foundFormData);
    }
  }, [apiQuestionnaireData]);

  const handlePullConversationsClick = () => {
    dispatch(pullConversationDataActions(apiPropertyData?.property_name));
  };
      

  return (
    <div className="form-design text-white hostbuddy-knowledge-base">
      <h3>HostBuddy Knowledge Base</h3>
      <div className="knowledge-base-content">
        {integrationPlatform && (<h5 className="pms-connected-text">{integrationPlatform.charAt(0).toUpperCase() + integrationPlatform.slice(1)} Connected</h5>)}
        <h4 style={{marginTop:"0"}}>PMS Integration</h4>
        {integrationPlatform ? (
          <>
            <h5 className="text-confirmed">Property details and availability</h5>
            <h5 className="text-confirmed">Guest and Reservation Data</h5>
            {apiPropertyData?.supporting_doc_items?.conversation_data ? (
              <h5 className="text-neutral">Past Conversations <small className="text-negative">(not used)</small></h5>
            ) : (
              ((!apiPullConversationsData || !apiPullConversationsData.includes(apiPropertyData?.property_name)) ? (
                <h5 className="text-negative">Past conversations not pulled <span onClick={handlePullConversationsClick}>(Pull from PMS)</span></h5>
              ) : (
                <>
                  <div className="loader-text-container">
                    <BoxLoader />
                    <h5 className="text-negative">Past conversations being pulled (this may take a few minutes...)</h5>
                  </div>
                </>
              ))
            )}
          </>
        ) : (
          <>
            <h5 className="text-negative">Property not linked to PMS</h5>
            {!apiPullConversationsData || !apiPullConversationsData.includes(apiPropertyData?.property_name) ? (
              <button className="text-negative" onClick={handlePullConversationsClick}>Pull Conversations</button>
            ) : (
              <Loader />
            )}
          </>
        )}
        <h4>Property Documents</h4>
        {documents.length > 0 ? (
          <>
            {documents.map((doc_name, index) => (
              <h5 className="text-confirmed" key={index}>{doc_name}</h5>
            ))}
          </>
        ) : (
          <h5 className="text-negative">No documents uploaded</h5>
        )}
        <h4>Property Profile</h4>
        {formHasData ? (
          <h5 className="text-confirmed">Data entered</h5>
        ) : (
          <h5 className="text-negative">No data entered</h5>
        )}
      </div>
    </div>
  );




};

export default HostBuddyKnowledgeBase;