import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { pullConversationDataActions } from "../../../../../../redux/actions"; // From old logic, where pull conversation history was triggered manually
import KnowledgeBaseSourcesModal from "./knowledgeBaseSourcesModal";
import "../../questionnaire.css";


const HostBuddyKnowledgeBase = ({apiPropertyData, setApiPropertyData, getPropertyDataFromAPI, property_name, forceShowDataAdded}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const apiPullConversationsData = store?.pullConversationDataReducer?.loadingProperties; // list of properties that are currently being pulled
  const apiPullConversationsDataSuccess = store?.pullConversationDataReducer?.successfulProperties; // list of properties that have been successfully pulled

  const [integrationPlatform, setIntegrationPlatform] = useState(null);
  const [integrationData, setIntegrationData] = useState({});
  const [documents, setDocuments] = useState({});
  const [formHasData, setFormHasData] = useState(false);
  const [pullConversationsSuccess, setPullConversationsSuccess] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [integration_data_key, setIntegrationDataKey] = useState("");
  const [propertyName, setPropertyName] = useState("");

  // When apiPullConversationsDataSuccess fires, update pullConversationsSuccess if the property is in the list
  useEffect(() => {
    if (apiPullConversationsDataSuccess && apiPullConversationsDataSuccess.includes(apiPropertyData?.property_name)) {
      setPullConversationsSuccess(true);
    }
  }, [apiPullConversationsDataSuccess]);

  // When conversation data is successfully pulled, call getPropertyDataFromAPI so that the "past conversations" option populates in the auto-fill modal
  useEffect(() => {
    if (pullConversationsSuccess) {
      getPropertyDataFromAPI(property_name);
    }
  }, [pullConversationsSuccess]);

  // When apiPropertyData populates, get relevant data from it
  useEffect(() => {
    if (apiPropertyData) {
      setPropertyName(apiPropertyData.property_name);
      setIntegrationPlatform(apiPropertyData?.integration?.platform);

      // Check if integration data should be used for the knowledge base
      const integrationDataToSet = {};
      const integrationDataKeys = Object.keys(apiPropertyData?.supporting_doc_items?.integration_data || {}); // should be only one - i'm doing this to get whatever it is
      if (integrationDataKeys.length > 0) {
        const firstKey = integrationDataKeys[0];
        const integration_ufkb_val = apiPropertyData?.supporting_doc_items?.integration_data[firstKey]?.use_for_knowledge_base;
        if (integration_ufkb_val === undefined || integration_ufkb_val === true) { // if the key is not present, assume true
          integrationDataToSet['integration_data'] = {'use_for_knowledge_base': true};
        } else {
          integrationDataToSet['integration_data'] = {'use_for_knowledge_base': false};
        }
        setIntegrationDataKey(firstKey);
      } else {
        integrationDataToSet['integration_data'] = {'use_for_knowledge_base': true};
      }

      // Add hidden reservation stages to integration data
      const integrationHiddenResStages = apiPropertyData?.supporting_doc_items?.integration_data?.[integration_data_key]?.hide_for_reservations
      if (!integrationDataToSet['integration_data'].hasOwnProperty('hide_for_reservations')) {
        integrationDataToSet['integration_data']['hide_for_reservations'] = [];
      }
      integrationDataToSet['integration_data']['hide_for_reservations'] = integrationHiddenResStages || [];

      // Check if guest data should be used for the knowledge base
      const guest_ufkb_val = apiPropertyData?.supporting_doc_items?.guest_data?.use_for_knowledge_base
      if (guest_ufkb_val === undefined || guest_ufkb_val === true) {
        integrationDataToSet['guest_data'] = {'use_for_knowledge_base': true};
      } else {
        integrationDataToSet['guest_data'] = {'use_for_knowledge_base': false};
      }

      // Check if conversation data should be used for the knowledge base, and how many months
      const convo_months = apiPropertyData?.supporting_doc_items?.conversation_data?.knowledge_base_months
      const convoHiddenResStages = apiPropertyData?.supporting_doc_items?.conversation_data?.hide_for_reservations
      if (convo_months && convo_months > 0) {
        integrationDataToSet['conversation_data'] = {'use_for_knowledge_base':true, 'months':convo_months};
      } else {
        integrationDataToSet['conversation_data'] = {'use_for_knowledge_base':false, 'months':0};
      }
      if (!integrationDataToSet['conversation_data'].hasOwnProperty('hide_for_reservations')) {
        integrationDataToSet['conversation_data']['hide_for_reservations'] = [];
      }
      integrationDataToSet['conversation_data']['hide_for_reservations'] = convoHiddenResStages || [];

      // Retrieve "availability" usage, default true if undefined
      let availabilityUsage = apiPropertyData?.supporting_doc_items?.availability?.use_for_knowledge_base;
      if (availabilityUsage === undefined) availabilityUsage = true;
      integrationDataToSet["availability_data"] = { use_for_knowledge_base: availabilityUsage };

      setIntegrationData(integrationDataToSet);

      // Populate information about whether each document is used for the knowledge base
      setDocuments(Object.keys(apiPropertyData?.supporting_doc_items?.file_data || {}).reduce((acc, fileName) => { // { "Doc_1_name": { use_for_knowledge_base: true }, ... }
        acc[fileName] = {
          use_for_knowledge_base: !(apiPropertyData?.supporting_doc_items?.file_data[fileName]?.use_for_knowledge_base === false),
          hide_for_reservations: apiPropertyData?.supporting_doc_items?.file_data[fileName]?.hide_for_reservations || []
        };
        return acc;
      }, {}));
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

  /* Old logic, where pull conversation history was triggered manually
  const handlePullConversationsClick = () => {
    dispatch(pullConversationDataActions(apiPropertyData?.property_name));
  };
  */
      
  //const integration_categories = {'Property details and availability':'integration_data', 'Guest and reservation data':'guest_data', 'Past conversations':'conversation_data'}
  let integration_categories = {};
  let availability_label = 'Property availability';
  if (integrationPlatform && ['ownerrez', 'guesty', 'hostfully', 'hostify', 'hostaway'].includes(integrationPlatform.toLowerCase())) {
    availability_label = 'Property availability and pricing';
    integration_categories = {'PMS property details':'integration_data', [availability_label]:'availability_data', 'Guest and reservation data':'guest_data', 'Past conversations':'conversation_data'}
  } else {
    integration_categories = {'PMS property details':'integration_data', [availability_label]:'availability_data', 'Guest and reservation data':'guest_data', 'Past conversations':'conversation_data'}
  }

  const convo_data_has_been_pulled = (pullConversationsSuccess || apiPropertyData?.supporting_doc_items?.conversation_data)
    const integrationPlatformFormatted = integrationPlatform
    ? integrationPlatform === "ownerrez" ? "OwnerRez"
      : integrationPlatform.charAt(0).toUpperCase() + integrationPlatform.slice(1)
    : null;

  // Assemble data structure to pass to the modal, indicating which sources are present and whether they're selected for use
  const sourceDataForModal = { 'PMS Integration': {}, 'Property Documents': {}, 'Property Profile': {} };
  if (integrationPlatform) {
    sourceDataForModal['PMS Integration'] = {
      'integration_data': {'label':'PMS property details', 'id':'integration_data', 'use_for_knowledge_base':integrationData['integration_data']?.use_for_knowledge_base, 'hidden_res_stages':integrationData['integration_data']?.hide_for_reservations || []},
      'availability_data': {'label':availability_label, 'id':'availability_data', 'use_for_knowledge_base':integrationData["availability_data"]?.use_for_knowledge_base}, // use_for_knowledge_base true if integration_data is present
      'guest_data': {'label':'Guest and reservation data', 'id':'guest_data', 'use_for_knowledge_base':integrationData['guest_data']?.use_for_knowledge_base}
    }
    if (convo_data_has_been_pulled) {
      //sourceDataForModal['PMS Integration']['conversation_data'] = {'label':'Past conversations', 'id':'conversation_data', 'use_for_knowledge_base':integrationData['conversation_data']?.use_for_knowledge_base, 'months':integrationData['conversation_data']?.months, 'hidden_res_stages':integrationData['conversation_data']?.hide_for_reservations || ['INQUIRY/PAST']}
      sourceDataForModal['PMS Integration']['conversation_data'] = {'label':'Past conversations', 'id':'conversation_data', 'use_for_knowledge_base':integrationData['conversation_data']?.use_for_knowledge_base, 'months':integrationData['conversation_data']?.months, 'hidden_res_stages':integrationData['conversation_data']?.hide_for_reservations || []}
    }
  }
  Object.keys(documents).forEach(docName => {
    sourceDataForModal['Property Documents'][docName] = {'label':docName, 'id':docName, 'use_for_knowledge_base':documents[docName]?.use_for_knowledge_base, 'hidden_res_stages':documents[docName]?.hide_for_reservations || []}
  });
  sourceDataForModal['Property Profile'] = {'Property Profile': {'label':'Property Profile', 'id':'Property Profile', 'use_for_knowledge_base':true}}

  return (
    <div className="form-design text-white hostbuddy-knowledge-base">
      <h3>HostBuddy Knowledge Base</h3>
      <div className="knowledge-base-content blur-background-top-right">
        {integrationPlatform && (<h5 className="pms-connected-text">{integrationPlatformFormatted} Connected</h5>)}
        <h4 style={{marginTop:"0"}}>PMS Integration</h4>
        {integrationPlatform ? (
          <>
            {Object.keys(integration_categories).map((section, index) => (
              !((section === 'Past conversations' && !convo_data_has_been_pulled)) && (
                ((integrationData[integration_categories[section]]?.use_for_knowledge_base) ? (
                  (integrationData[integration_categories[section]]?.months ? (
                    <h5 className="text-confirmed" key={index}>{section} <small style={{color:'#AAA'}}>(last {integrationData[integration_categories[section]]?.months} months)</small></h5>
                  ) : (
                    <h5 className="text-confirmed" key={index}>{section}</h5>
                  ))
                ) : (
                  <h5 className="text-neutral" key={index}>{section} <small className="text-negative">(not used)</small></h5>
                ))
              )
            ))}

            {/*
            {(!convo_data_has_been_pulled) && (
              ((!apiPullConversationsData || !apiPullConversationsData.includes(apiPropertyData?.property_name)) ? (
                <h5 className="text-negative">Past conversations not pulled <span onClick={handlePullConversationsClick}>(Pull from PMS)</span></h5>
              ) : (
                <>
                  <div className="loader-text-container">
                    <BoxLoader />
                    <h5 className="text-negative">Past conversations being pulled (this may take a minute or two...)</h5>
                  </div>
                </>
              ))
            )}
            */}
          </>
        ) : (
          <h5 className="text-negative">Property not linked to PMS</h5>
        )}

        <h4>Property Documents</h4>
        {Object.keys(documents).length > 0 ? (
          <>
            {Object.keys(documents).map((doc_name, index) => (
              (documents[doc_name].use_for_knowledge_base ? (
                <h5 className="text-confirmed" key={index}>{doc_name}</h5>
              ) : (
                <h5 className="text-neutral" key={index}>{doc_name} <small className="text-negative">(not used)</small></h5>
              ))
            ))}
          </>
        ) : (
          <h5 className="text-negative">No documents uploaded</h5>
        )}

        <h4>Property Profile</h4>
        {formHasData || forceShowDataAdded ? (
          <h5 className="text-confirmed">Data entered</h5>
        ) : (
          <h5 className="text-negative">No data entered</h5>
        )}

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button style={{maxWidth:"150px"}} className="shadow-none border-0 mt-3 font-weight-bold underline-btn" onClick={() => setShowManageModal(true)}>
            Manage
          </button>
        </div>
      </div>
      <KnowledgeBaseSourcesModal show={showManageModal} handleClose={() => setShowManageModal(false)} propertyName={propertyName} sources={sourceDataForModal} integrationDataKey={integration_data_key} setApiPropertyData={setApiPropertyData} availability_label={availability_label}/>
    </div>
  );




};

export default HostBuddyKnowledgeBase;