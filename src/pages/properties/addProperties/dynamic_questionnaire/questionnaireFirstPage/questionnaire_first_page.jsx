import React, { useEffect, useState } from "react";
import BasicInformationForm from "../BasicInformationForm/BasicInformationForm";
import IntegrationsForm from "./integrationsForm";
import DocumentForm from "./documentForm";
import HostBuddyKnowledgeBase from "./knowledgeBase/hbKnowledgeBase";
import AutoFillButtons from "./autoFillButtons";
import Loader from "../../../../../helper/Loader";
import "../questionnaire.css";

// Code for the first page of the questionnaire
const QuestionnaireFirstPage = ({handleSaveAndNext, triggeredSaveLoading, property_name, apiPropertyData, setApiPropertyData, getPropertyDataFromAPI}) => {

  const [showCopyExistingPropModal, setShowCopyExistingPropModal] = useState(false);
  const [showAutoFillModal, setShowAutoFillModal] = useState(false);

  const handleAutoFillModalClose = (autoFillApiLoading) => {
    if (!autoFillApiLoading) {
      setShowAutoFillModal(false);
    };
  };

  return (
    <div className="form-design questionnaire-first-page">

      {/* Property name & thumbnail image fields */}
      <BasicInformationForm property_name={property_name} />
      <div style={{ marginBottom: '70px' }}></div> {/* Spacer */}

      {/* PMS Integration & document stuff */}
      <IntegrationsForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
      <div style={{ marginBottom: '40px' }}></div> {/* Spacer */}
      
      <DocumentForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
      <div style={{ marginBottom: '70px' }}></div> {/* Spacer */}

      {/* HostBuddy Knowledge Base */}
      <HostBuddyKnowledgeBase apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI} property_name={property_name}/>
      <div style={{ marginBottom: '90px' }}></div> {/* Spacer */}
      

      <AutoFillButtons property_name={property_name} apiPropertyData={apiPropertyData} />
      {/* Removed Save buttons - now in fixed footer */}
    </div>
  );
};

export default QuestionnaireFirstPage;