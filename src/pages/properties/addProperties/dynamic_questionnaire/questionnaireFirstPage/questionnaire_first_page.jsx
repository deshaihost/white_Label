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
      <div className="row">
        <div className="col-6">
        <IntegrationsForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
        </div>

        <div className="col-6">
        <DocumentForm property_name={property_name} apiPropertyData={apiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
        </div>
      </div>
      <div style={{ marginBottom: '70px' }}></div> {/* Spacer */}

      {/* HostBuddy Knowledge Base */}
      <HostBuddyKnowledgeBase apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI} property_name={property_name}/>
      <div style={{ marginBottom: '90px' }}></div> {/* Spacer */}
      

      <AutoFillButtons property_name={property_name} apiPropertyData={apiPropertyData} />
      <div style={{ marginBottom: '80px' }}></div> {/* Spacer */}

      {/* Prev and Next buttons */}
      <div className="d-flex justify-content-around my-5">
        {triggeredSaveLoading ? (
          <Loader />
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => handleSaveAndNext(true)}>
              Save & Exit
            </button>
            <button className="border_theme_btn previous" onClick={() => handleSaveAndNext()}>
              Save & Next &gt;
            </button>
          </>
        )}
      </div>

      {apiPropertyData?.calry_property_id && (
        <p className="text-muted fs-14 text-center mt-4 mb-4">
          Property ID: {apiPropertyData.calry_property_id}
        </p>
      )}
    </div>
  );
};

export default QuestionnaireFirstPage;