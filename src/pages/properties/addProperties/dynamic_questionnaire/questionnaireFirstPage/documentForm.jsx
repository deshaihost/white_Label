import React, { useEffect, useState } from "react";
import { useSelectorUseDispatch } from "../../../../../helper/Authorized";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader, { BoxLoader } from "../../../../../helper/Loader";
import { stateEmptyActions } from "../../../../../redux/actions";
import DochideForReservationsModel from "./DochideForReservationsModel";

import axios from "axios";
import PopupModal from "./PopupModal";

import "../questionnaire.css";

const DocumentForm = ({ property_name, apiPropertyData, getPropertyDataFromAPI }) => {
  const { store, dispatch } = useSelectorUseDispatch();

  const [showPreviousDoc, setShowPreviousDoc] = useState(false);
  const [showDocHideForResrv, setDocHideForResrv] = useState(false);
  const [prevUploadedDoc, setPrevUploadedDoc] = useState([]);
  const [hideForReservation, setHideForReservatin] = useState([]);
  const [docUploadIsLoading, setdocUploadIsLoading] = useState(false);
  const [showDocUploadFields, setShowDocUploadFields] = useState(false);
  const [propertyDataFromApi, setPropertyDataFromApi] = useState(apiPropertyData);


  const supportingStatus = store?.supportingDocumentPostReducer?.supportingDoc?.status
  const supportingUrlMessage = store?.supportingDocumentPostReducer?.supportingDoc?.data?.error

  const [file, setFile] = useState(null);
  const [getDocApiCall, setGetDocApiCall] = useState(false);

  // update propertyDataFromApi and prevUploadedDoc with data from parent, which is fetched when the questionnaire page loads
  useEffect(() => {
    setPropertyDataFromApi(apiPropertyData);
    if (apiPropertyData && apiPropertyData.supporting_doc_items) {
      const fileData = apiPropertyData.supporting_doc_items.file_data;
      const integrationData = apiPropertyData.supporting_doc_items.integration_data;
      const allSupportingDocData = { ...fileData, ...integrationData };
      if (allSupportingDocData) {
        const uploadedDocs = Object.keys(allSupportingDocData);
        setPrevUploadedDoc(uploadedDocs);
        setHideForReservatin(allSupportingDocData);
      }
    }
  }, [apiPropertyData]);

  const documentUploadMainHndle = async (resrData) => {
    if (!file) { ToastHandle("No file uploaded", "danger"); return; }

    setdocUploadIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    let payload = new FormData();

    payload.append("file", file);
    payload.append("hide_for_reservations", JSON.stringify(resrData)); // JSON-style string representing the array of strings, per backend requirement

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, "Content-Type": "multipart/form-data" },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/properties/${property_name}/add_file`, payload, config );

      if (response.status === 200) {
        ToastHandle("File uploaded successfully", "success");
        setDocHideForResrv(false);
        getPropertyDataFromAPI(property_name); // to refresh the knowledge base window and the options in auto fill
      } else if (response.status === 413) {
        window.alert("File size is too large (max 5MB). We're working on support for processing large files - but in the meantime, you can upload this information by converting the file (or copying the text) into a .txt file!");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
    } catch (error) {
      ToastHandle("Sorry, we were unable to process that file.", "danger");
    }
    finally { setdocUploadIsLoading(false); }
  };


  const documentUploadHandle = () => {
    if (file) { setDocHideForResrv(true); }
    else { ToastHandle("No file uploaded", "danger"); }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    // Check file size - 15MB in bytes
    if (file && file.size > 15 * 1024 * 1024) {
      window.alert("File size is too large (max 5MB). We're working on support for processing large files - but in the meantime, you can upload this information by converting the file (or copying the text) into a .txt file!");
      return;
    }
    
    documentUploadHandle();
  };

  // Call the get property API to get the list of previously uploaded documents, and the name of any previously linked integration property
  /*
  const getPropertyDataFromAPI = async (propertyName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {Authorization: `Bearer ${token}`, "X-API-Key": API_KEY},
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };
        const response = await axios.get(`${baseUrl}/properties/${propertyName}`, config);

        if (response.status === 200) {
          const propertyData = response.data.property;
          setPropertyDataFromApi(propertyData);

          if (propertyData && propertyData.supporting_doc_items) {
            const fileData = propertyData.supporting_doc_items.file_data;
            const integrationData = propertyData.supporting_doc_items.integration_data;
            const allSupportingDocData = { ...fileData, ...integrationData };
            if (allSupportingDocData) {
              const uploadedDocs = Object.keys(allSupportingDocData);
              setPrevUploadedDoc(uploadedDocs);
              setHideForReservatin(allSupportingDocData);
            }
          }
        } else {  }
      } else {  }
    } catch (error) {  }
  };
  */

  // After deleting a document, call GET property to refresh the list
  const deleteResAfterPreviousDocCall = () => {
    getPropertyDataFromAPI(property_name);
  };

  const handleShowPopUp = () => {
    setShowPreviousDoc(true);
  };

  useEffect(() => {
    if (supportingStatus === 404) {
      ToastHandle(supportingUrlMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (supportingStatus === 400) {
      ToastHandle(supportingUrlMessage, "danger");
      dispatch(stateEmptyActions());
    }
  }, [supportingStatus]);

  // Call GET property when the user uploads a new document, to refresh the list
  useEffect(() => {
    if (getDocApiCall) {
      getPropertyDataFromAPI(property_name);
      setGetDocApiCall(false);
    }
  }, [getDocApiCall]);

  return (
    <>
      <form className="document-form">
        <h2 className="modern-section-heading">Property Documents</h2>

        <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button 
            type="button"
            className="modern-text-link" 
            style={{ 
              fontSize: '14px', 
              background: 'none', 
              border: 'none', 
              padding: 0,
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={handleShowPopUp}
          >
            <svg width="16" height="16" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill="#3e88f7" d="M11.6875 2H2.125V18H14.875V5H11.6875V2ZM2.125 0H12.75L17 4V18C17 18.5304 16.7761 19.0391 16.3776 19.4142C15.9791 19.7893 15.4386 20 14.875 20H2.125C1.56141 20 1.02091 19.7893 0.622398 19.4142C0.223883 19.0391 0 18.5304 0 18V2C0 1.46957 0.223883 0.960859 0.622398 0.585786C1.02091 0.210714 1.56141 0 2.125 0ZM4.25 9H12.75V11H4.25V9ZM4.25 13H12.75V15H4.25V13Z"></path>
            </svg>
            View Uploaded Documents
          </button>

          {showDocUploadFields ? (
            <div style={{ marginTop: '8px' }}>
              <label className="modern-label" style={{ marginBottom: '8px' }}>
                Documents <span style={{ color: '#676a73', fontSize: '12px' }}>(.txt, .docx, .pdf supported)</span>
              </label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <input 
                    type="file" 
                    id="fileInput" 
                    className="modern-input" 
                    accept=".txt,.docx,.pdf"
                    style={{ fontSize: '13px', padding: '10px 12px' }}
                    onChange={(e) => setFile(e.target.files[0])} 
                  />
                </div>
                <div>
                  {!docUploadIsLoading ? (
                    <button 
                      className="modern-btn-primary" 
                      style={{ height: '42px', whiteSpace: 'nowrap' }}
                      onClick={(e) => handleSubmitForm(e)}
                    >
                      Upload
                    </button>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: "white", fontSize: '13px', fontFamily: "'DM Sans', sans-serif" }}>
                        Submitting...
                      </span>
                      <BoxLoader />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <button 
              type="button"
              className="modern-text-link" 
              style={{ 
                fontSize: '14px', 
                background: 'none', 
                border: 'none', 
                padding: 0,
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onClick={() => setShowDocUploadFields(true)}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8H8M8 8V14M8 8V2M8 8H2" stroke="#3e88f7" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              + Upload New Document
            </button>
          )}
        </div>

      </form>
      <DochideForReservationsModel show={showDocHideForResrv} setShow={setDocHideForResrv} documentUploadMainHndle={documentUploadMainHndle} btnLoading={docUploadIsLoading}/>
      {showPreviousDoc && (
        <PopupModal show={showPreviousDoc} setShow={setShowPreviousDoc} prevUploadedDoc={prevUploadedDoc} supportingDocsObj={hideForReservation} deleteResAfterPreviousDocCall={deleteResAfterPreviousDocCall} property_name={property_name}/>
      )}
    </>
  );
};

export default DocumentForm;
