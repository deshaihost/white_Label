import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ToastHandle from "../../../../../../helper/ToastMessage";
import Loader from "../../../../../../helper/Loader";
import KnowledgeBasePencil from "./knowledgeBasePencil";
import ResStageModal from "./resStageModal";
import "../../questionnaire.css";


const HostBuddyKnowledgeBase = ({apiPropertyData, setApiPropertyData, getPropertyDataFromAPI, property_name, forceShowDataAdded}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const apiPullConversationsData = store?.pullConversationDataReducer?.loadingProperties;
  const apiPullConversationsDataSuccess = store?.pullConversationDataReducer?.successfulProperties;

  const [integrationPlatform, setIntegrationPlatform] = useState(null);
  const [integrationData, setIntegrationData] = useState({});
  const [documents, setDocuments] = useState({});
  const [formHasData, setFormHasData] = useState(false);
  const [pullConversationsSuccess, setPullConversationsSuccess] = useState(false);
  const [integration_data_key, setIntegrationDataKey] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  
  // Reservation stage modal state
  const [resStageModalData, setResStageModalData] = useState({show:false});
  
  // Local state for user selections (before saving)
  const [localKbSelections, setLocalKbSelections] = useState({});

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

  // When apiPropertyData populates, get relevant data from it and initialize local state
  useEffect(() => {
    if (apiPropertyData) {
      setPropertyName(apiPropertyData.property_name);
      setIntegrationPlatform(apiPropertyData?.integration?.platform);

      // Check if integration data should be used for the knowledge base
      const integrationDataToSet = {};
      const integrationDataKeys = Object.keys(apiPropertyData?.supporting_doc_items?.integration_data || {});
      if (integrationDataKeys.length > 0) {
        const firstKey = integrationDataKeys[0];
        const integration_ufkb_val = apiPropertyData?.supporting_doc_items?.integration_data[firstKey]?.use_for_knowledge_base;
        if (integration_ufkb_val === undefined || integration_ufkb_val === true) {
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
      const conversationDataExists = pullConversationsSuccess || apiPropertyData?.supporting_doc_items?.conversation_data;
      
      // Default to true (6 months) if conversation data exists and hasn't been explicitly set
      // Only set to false if explicitly set to 0 or false
      if (conversationDataExists) {
        if (convo_months !== undefined && convo_months !== null) {
          // User has explicitly set the months value
          integrationDataToSet['conversation_data'] = {
            'use_for_knowledge_base': convo_months > 0,
            'months': convo_months > 0 ? convo_months : 0
          };
        } else {
          // Default to enabled with 6 months if not explicitly set
          integrationDataToSet['conversation_data'] = {
            'use_for_knowledge_base': true,
            'months': 6
          };
        }
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
      const docsData = Object.keys(apiPropertyData?.supporting_doc_items?.file_data || {}).reduce((acc, fileName) => {
        acc[fileName] = {
          use_for_knowledge_base: !(apiPropertyData?.supporting_doc_items?.file_data[fileName]?.use_for_knowledge_base === false),
          hide_for_reservations: apiPropertyData?.supporting_doc_items?.file_data[fileName]?.hide_for_reservations || []
        };
        return acc;
      }, {});
      setDocuments(docsData);
      
      // Initialize local KB selections from API data
      const localSelections = {};
      
      // PMS Integration sources - populate if property is connected to PMS
      if (integrationPlatform) {
        localSelections['integration_data'] = {
          use_for_knowledge_base: integrationDataToSet['integration_data']?.use_for_knowledge_base,
          hide_for_reservations: integrationDataToSet['integration_data']?.hide_for_reservations || []
        };
        localSelections['guest_data'] = {
          use_for_knowledge_base: integrationDataToSet['guest_data']?.use_for_knowledge_base
        };
        localSelections['availability_data'] = {
          use_for_knowledge_base: integrationDataToSet["availability_data"]?.use_for_knowledge_base
        };
        localSelections['conversation_data'] = {
          use_for_knowledge_base: integrationDataToSet['conversation_data']?.use_for_knowledge_base,
          months: integrationDataToSet['conversation_data']?.months,
          hide_for_reservations: integrationDataToSet['conversation_data']?.hide_for_reservations || []
        };
      }
      
      // Documents
      Object.keys(docsData).forEach(fileName => {
        localSelections[fileName] = {
          use_for_knowledge_base: docsData[fileName]?.use_for_knowledge_base,
          hide_for_reservations: docsData[fileName]?.hide_for_reservations || []
        };
      });
      
      // Property Profile (always true)
      localSelections['property_profile'] = { use_for_knowledge_base: true };
      
      setLocalKbSelections(localSelections);
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
  
  // Toggle checkbox for a source
  const handleToggleSource = (sourceId) => {
    setLocalKbSelections(prev => ({
      ...prev,
      [sourceId]: {
        ...prev[sourceId],
        use_for_knowledge_base: !prev[sourceId]?.use_for_knowledge_base
      }
    }));
  };
  
  // Open reservation stage modal for a source
  const handleEditReservationStages = (sourceId) => {
    const hiddenStages = localKbSelections[sourceId]?.hide_for_reservations || [];
    
    // Determine section based on sourceId
    // If sourceId is a document name (in documents object), section is 'Property Documents'
    // Otherwise it's a PMS Integration source
    const section = documents.hasOwnProperty(sourceId) ? 'Property Documents' : 'PMS Integration';
    
    setResStageModalData({
      show: true,
      section: section,
      sourceId: sourceId,
      hiddenResStages: hiddenStages
    });
  };
  
  // Update reservation stages from modal
  const handleUpdateReservationStages = (section, sourceId, resStagesArray) => {
    setLocalKbSelections(prev => ({
      ...prev,
      [sourceId]: {
        ...prev[sourceId],
        hide_for_reservations: resStagesArray
      }
    }));
  };
  
  // Check if a source has modified reservation phases
  const hasModifiedReservationPhases = (sourceId) => {
    const hiddenStages = localKbSelections[sourceId]?.hide_for_reservations || [];
    return hiddenStages.length > 0;
  };
  
  // Save all knowledge base selections to API
  const handleSaveKnowledgeBase = async () => {
    setApiLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      // Construct the JSON body
      const json_body = { 'docs_to_use': {} };
      
      if (localKbSelections['integration_data']) {
        json_body['docs_to_use']['integration_data'] = {
          [integration_data_key]: {
            use: localKbSelections['integration_data'].use_for_knowledge_base,
            hidden_res_stages: localKbSelections['integration_data'].hide_for_reservations || []
          }
        };
        json_body['docs_to_use']['guest_data'] = localKbSelections['guest_data']?.use_for_knowledge_base;
        
        if (localKbSelections['conversation_data']) {
          json_body['docs_to_use']['conversation_data'] = {
            num_months_to_use: localKbSelections['conversation_data'].use_for_knowledge_base ? 6 : 0,
            hidden_res_stages: localKbSelections['conversation_data'].hide_for_reservations || []
          };
        }
        
        if (localKbSelections["availability_data"]) {
          json_body["docs_to_use"]["availability"] = localKbSelections["availability_data"].use_for_knowledge_base;
        }
      }
      
      // Add file data
      const fileData = {};
      Object.keys(documents).forEach(fileName => {
        if (localKbSelections[fileName]) {
          fileData[fileName] = {
            use: localKbSelections[fileName].use_for_knowledge_base,
            hidden_res_stages: localKbSelections[fileName].hide_for_reservations || []
          };
        }
      });
      if (Object.keys(fileData).length > 0) {
        json_body['docs_to_use']['file_data'] = fileData;
      }
      
      // Property profile is always true
      json_body['docs_to_use']['questionnaire'] = true;

      const response = await axios.put(`${baseUrl}/properties/${propertyName}/set_knowledge_base`, json_body, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        getPropertyDataFromAPI(propertyName);
      } else { 
        ToastHandle(response?.data?.error, "danger"); 
      }
    } catch (error) { 
      ToastHandle("Sorry, an error occurred", "danger"); 
    }
    finally { 
      setApiLoading(false); 
    }
  };
  const convo_data_has_been_pulled = (pullConversationsSuccess || apiPropertyData?.supporting_doc_items?.conversation_data);
  const integrationPlatformFormatted = integrationPlatform
    ? integrationPlatform === "ownerrez" ? "OwnerRez"
      : integrationPlatform.charAt(0).toUpperCase() + integrationPlatform.slice(1)
    : null;

  // Define integration categories
  let integration_categories = {};
  let availability_label = 'Property availability';
  if (integrationPlatform && ['ownerrez', 'guesty', 'hostfully', 'hostify', 'hostaway'].includes(integrationPlatform.toLowerCase())) {
    availability_label = 'Property availability and pricing';
    integration_categories = {'PMS property details':'integration_data', [availability_label]:'availability_data', 'Guest and reservation data':'guest_data', 'Past conversations':'conversation_data'}
  } else {
    integration_categories = {'PMS property details':'integration_data', [availability_label]:'availability_data', 'Guest and reservation data':'guest_data', 'Past conversations':'conversation_data'}
  }

  return (
    <div className="text-white hostbuddy-knowledge-base">
      <h3>HostBuddy Knowledge Base</h3>
      <div className="knowledge-base-content">
        {integrationPlatform && (
          <h5 className="pms-connected-text">{integrationPlatformFormatted} Connected</h5>
        )}
        
        <h4 style={{marginTop:"0"}}>PMS Integration</h4>
        {integrationPlatform ? (
          <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {Object.keys(integration_categories).map((section, index) => {
              const sourceId = integration_categories[section];
              // Skip past conversations if not pulled
              if (section === 'Past conversations' && !convo_data_has_been_pulled) return null;
              
              const isChecked = localKbSelections[sourceId]?.use_for_knowledge_base;
              const hasModifiedPhases = hasModifiedReservationPhases(sourceId);
              const showPencil = !['guest_data', 'availability_data'].includes(sourceId);
              
              return (
                <div key={index} className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#0F1117] transition-all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px' }}>
                  <button
                    onClick={() => handleToggleSource(sourceId)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      textDecoration: 'none'
                    }}
                  >
                    <div 
                      className={`modern-checkbox ${isChecked ? 'checked' : ''}`}
                      style={{ flexShrink: 0 }}
                    >
                      {isChecked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: isChecked ? 'white' : '#676a73',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      {section}
                      {section === 'Past conversations' && <span style={{ color: '#676a73' }}> (last 6 months)</span>}
                    </span>
                  </button>
                  {showPencil && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                      {hasModifiedPhases && (
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#FB923C',
                          boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)'
                        }} />
                      )}
                      <KnowledgeBasePencil 
                        handlePencilIconClick={() => handleEditReservationStages(sourceId)} 
                        someResStageIsHidden={hasModifiedPhases} 
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <h5 className="text-negative" style={{ marginLeft: '16px' }}>Property not linked to PMS</h5>
        )}

        <h4>Property Documents</h4>
        {Object.keys(documents).length > 0 ? (
          <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
            {Object.keys(documents).map((doc_name, index) => {
              const isChecked = localKbSelections[doc_name]?.use_for_knowledge_base;
              const hasModifiedPhases = hasModifiedReservationPhases(doc_name);
              
              return (
                <div key={index} className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-[#0F1117] transition-all" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px' }}>
                  <button
                    onClick={() => handleToggleSource(doc_name)}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      textAlign: 'left',
                      textDecoration: 'none'
                    }}
                  >
                    <div 
                      className={`modern-checkbox ${isChecked ? 'checked' : ''}`}
                      style={{ flexShrink: 0 }}
                    >
                      {isChecked && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ 
                      fontSize: '14px', 
                      color: isChecked ? 'white' : '#676a73',
                      fontFamily: 'DM Sans, sans-serif'
                    }}>
                      {doc_name}
                    </span>
                  </button>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
                    {hasModifiedPhases && (
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#FB923C',
                        boxShadow: '0 0 4px rgba(251, 146, 60, 0.4)'
                      }} />
                    )}
                    <KnowledgeBasePencil 
                      handlePencilIconClick={() => handleEditReservationStages(doc_name)} 
                      someResStageIsHidden={hasModifiedPhases} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h5 className="text-negative" style={{ marginLeft: '16px' }}>No documents uploaded</h5>
        )}

        <h4>Property Profile</h4>
        <div className="space-y-3" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="w-full flex items-center justify-between px-4 py-2 rounded-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '8px', opacity: 0.7 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
              <div className="modern-checkbox checked" style={{ flexShrink: 0 }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span style={{ 
                fontSize: '14px', 
                color: 'white',
                fontFamily: 'DM Sans, sans-serif'
              }}>
                {formHasData || forceShowDataAdded ? 'Data entered' : 'No data entered'}
              </span>
            </div>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', marginTop: '32px'}}>
          {!apiLoading ? (
            <button 
              className="modern-btn-primary" 
              style={{minWidth:"150px"}}
              onClick={handleSaveKnowledgeBase}
            >
              Save
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </div>
      
      <ResStageModal 
        modalData={resStageModalData} 
        setModalData={setResStageModalData} 
        handleModalSubmit={handleUpdateReservationStages} 
        fileName={resStageModalData.sourceId} 
        propertyName={propertyName} 
      />
    </div>
  );
};

export default HostBuddyKnowledgeBase;