import BasicInformationForm from "../BasicInformationForm/BasicInformationForm";
import IntegrationsForm from "./integrationsForm";
import DocumentForm from "./documentForm";
import HostBuddyKnowledgeBase from "./hbKnowledgeBase";
import CopyExistingPropertyModel from "./CopyExistingPropertyModel";
import AutoFillModal from "./autoFillModal";
import React, { useEffect, useState } from "react";
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
      

      {/* Auto fill and copy from existing options */}
      <div className="d-flex justify-content-center w-100">
        <div className="buttons-container d-flex flex-column align-items-center w-100">
          <button className="btn btn-primary auto-fill-btn w-100" onClick={() => { setShowAutoFillModal(true); }}>Auto-Fill Property Details</button>
          <button className="shadow-none border-0 mt-3 font-weight-bold underline-btn w-100" onClick={() => { setShowCopyExistingPropModal(true); }}>
            Copy Data From Other Property
          </button>
        </div>
      </div>
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

      <AutoFillModal show={showAutoFillModal} handleClose={handleAutoFillModalClose} apiPropertyData={apiPropertyData} />
      <CopyExistingPropertyModel show={showCopyExistingPropModal} curr_property_name={property_name} handleClose={() => setShowCopyExistingPropModal(false)} />
    </div>
  );




};

export default QuestionnaireFirstPage;