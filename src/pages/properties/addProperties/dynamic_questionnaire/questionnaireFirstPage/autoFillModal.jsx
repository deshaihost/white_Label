import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import "../questionnaire.css";
import Loader, { BoxLoader } from "../../../../../helper/Loader";
import { getQuestionnaireActions } from "../../../../../redux/actions";

const AutoFillModal = ({ handleClose, show, apiPropertyData }) => {
  const dispatch = useDispatch();

  const [integrationSources, setIntegrationSources] = useState([]);
  const [fileSources, setFileSources] = useState([]);
  const [conversationDataSources, setConversationDataSources] = useState([]);
  const [allSources, setAllSources] = useState([]);
  const [selectedSources, setSelectedSources] = useState(allSources.map(source => source.id)); // all selected by default
  const [propertyName, setPropertyName] = useState(null);
  const [autoFillApiLoading, setAutoFillApiLoading] = useState(false);

  // When apiPropertyData populates (from parent), populate the sources
  useEffect(() => {
    if (apiPropertyData) {
      const allIntegrationSources = Object.keys(apiPropertyData.supporting_doc_items?.integration_data || {}); // should just be one if an integration is linked, or none otherwise
      const allFileSources = Object.keys(apiPropertyData?.supporting_doc_items?.file_data || {});
      const allConversationDataSources = (apiPropertyData?.supporting_doc_items?.conversation_data?.months && Object.keys(apiPropertyData.supporting_doc_items.conversation_data.months).length > 0) ? ["Conversation history"] : [];
      const allSourcesFound = [...allIntegrationSources, ...allConversationDataSources, ...allFileSources];
      setAllSources(allSourcesFound.map(source => ({
        id: source,
        name: allIntegrationSources.includes(source) ? source.charAt(0).toUpperCase() + source.slice(1).replace(/_/g, ' ') : source // for integration sources, capitalize the first letter and replace underscores with spaces (in the user-facing label only)
      })));
      setFileSources(allFileSources);
      setIntegrationSources(allIntegrationSources);
      setConversationDataSources(allConversationDataSources);
      setSelectedSources(allSourcesFound);
      setPropertyName(apiPropertyData.property_name);
    }
  }, [apiPropertyData]);

  const handleCheckboxChange = (sourceId, isChecked) => {
    setSelectedSources(prev => {
      if (!isChecked) {
        return prev.filter(id => id !== sourceId);
      } else {
        return [...prev, sourceId];
      }
    });
  };

  const closeHndle = () => {
    handleClose(autoFillApiLoading);
  };

  const callAutoFillApi = async () => {
    setAutoFillApiLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };
        const json_body = {
          'docs_to_use': {
            'integration_data': integrationSources.filter(source => selectedSources.includes(source)),
            'file_data': fileSources.filter(source => selectedSources.includes(source)),
            'conversation_data': conversationDataSources.filter(source => selectedSources.includes(source))
          }
        };
        const response = await axios.post(`${baseUrl}/properties/${propertyName}/auto_fill_questionnaire`, json_body, config);

        if (response.status === 200) {
          ToastHandle("Auto-fill completed successfully", "success");
          dispatch(getQuestionnaireActions(propertyName)); // GET the updated questionnaire - mainly so that it populates in the "HostBuddy Knowledge Base" section
          closeHndle(false);
        } else { ToastHandle(response?.data?.error, "danger"); }
      }
    } catch (error) { ToastHandle("An error occurred during auto-fill", "danger"); }
    finally { setAutoFillApiLoading(false); }
  };

  return (
    <Modal show={show} size="lg" onHide={() => closeHndle(autoFillApiLoading)} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Auto-Fill Property Details</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="auto-fill-modal text-white">
          <div>
            <div className="text-center">
              <p>You can auto-fill the property details form using the information in the PMS, and from any uploaded documents. This can make HostBuddy's knowledge base easier to visualize and manage.</p>
              <p>If you have entered any data into the form, auto-fill will try to preserve that information while adding any new details. It may take about a minute to complete.</p>
              {allSources.length > 0 ? (
                <p style={{marginBottom:'20px'}}>Choose the sources you want to use for auto-fill:</p>
              ) : (
                <p>To use auto-fill, link this property to a PMS listing or upload a document.</p>
              )}
            </div>

            {allSources.length > 0 && (
              <div className="sources-container">
                {allSources.map(source => (
                  <div key={source.id}>
                    <input className="form-check-input" type="checkbox" value={source.id} id={source.id} checked={selectedSources.includes(source.id)} onChange={(e) => handleCheckboxChange(source.id, e.target.checked)}/>
                    <label className="form-check-label" htmlFor={source.id}>
                      {source.name}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {!autoFillApiLoading ? (
              allSources.length > 0 && selectedSources.length > 0 && (
                <div className="text-center">
                  <button className="mw-auto btn btn-primary text-white border border-primary rounded-pill px-5 mt-3" onClick={() => callAutoFillApi()}>
                    Start Auto-Fill
                  </button>
                </div>
              )) : (
              <div className="text-center">
                <p>Auto-fill in progress. Please be patient, this may take about a minute...</p>
                <Loader />
              </div>
            )}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AutoFillModal;
