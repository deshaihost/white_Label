import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../../helper/Loader";
import "../questionnaire.css";


const HostBuddyKnowledgeBase = ({apiPropertyData, questionnaireData}) => {
  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;

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
          </>
        ) : (
          <h5 className="text-negative">Property not linked to PMS</h5>
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