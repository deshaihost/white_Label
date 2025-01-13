import React, { useEffect, useState } from "react";
import './NoWorkPlanModal.css'
import Modal from "react-bootstrap/Modal";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import { listIntegrationPropertiesActions } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { BoxLoader } from "../../../helper/Loader";
import { getSubscriptionStatus } from "../../../helper/Authorized";
import ToastHandle from "../../../helper/ToastMessage";
import axios from "axios";
import ReactDOM from 'react-dom';

function ImportPropertiesModal({ handleNoPlanClose, showNoPlan, setNewPropertiesAdded, userData }) {
  const { store, dispatch } = useSelectorUseDispatch();
  const integrationProperties = ["701 1st Ave", "701 2nd Ave", "701 3rd Ave"];
  const [loadingIntegrationProperties, setLoadingIntegrationProperties] = useState(false);
  const [hasCalledAPI, setHasCalledAPI] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const integrationPropertyList = store?.listIntegrationPropertiesReducer?.listIntegrationProperties?.data?.properties
  const integrationPropertiesLoading = store?.listIntegrationPropertiesReducer?.loading;

  const subscriptionData = getSubscriptionStatus(userData);
  const numPropertiesRemaining = subscriptionData.props_allowed - Object.keys(userData?.property_data || {}).length;
  const isOnTrial = subscriptionData.plan === 'trial';

  // Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');
  const [maxPropertiesSelected, setMaxPropertiesSelected] = useState(false);
  
  // Add feature flag to control property limits
  const ENABLE_PROPERTY_LIMITS = true; // Set this to false to disable property limits
  
  // Helper function to normalize strings
  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // When this modal is opened, call API to get the list of integration properties
  useEffect(() => {
      if (showNoPlan && !hasCalledAPI) {
        dispatch(listIntegrationPropertiesActions());
        setHasCalledAPI(true);
      }
  }, [showNoPlan]);

  // Check if user is at property limit when modal opens
  useEffect(() => {
    if (showNoPlan && isOnTrial && ENABLE_PROPERTY_LIMITS) {
      const currentPropertiesCount = Object.keys(userData?.property_data || {}).length;
      setMaxPropertiesSelected(currentPropertiesCount >= subscriptionData.props_allowed);
    }
  }, [showNoPlan]);

  const [checkBox, setCheckBox] = useState({});

  // When a property is selected, toggle it by adding or removing it from the checkBox object (along with its ID)
  const SelectItem = (selectedPropObj) => {
    const selectedPropId = selectedPropObj.id;
    const selectedPropName = selectedPropObj?.internal_name ? selectedPropObj.internal_name : selectedPropObj?.name;

    const newCheckBox = { ...checkBox };
    if (newCheckBox[selectedPropName]) { 
      delete newCheckBox[selectedPropName]; 
      if (ENABLE_PROPERTY_LIMITS && isOnTrial && maxPropertiesSelected && Object.keys(newCheckBox).length < numPropertiesRemaining) {
        setMaxPropertiesSelected(false);
      }
    }
    else { 
      if (ENABLE_PROPERTY_LIMITS && isOnTrial && Object.keys(newCheckBox).length >= numPropertiesRemaining) {
        setMaxPropertiesSelected(true);
        return;
      }
      newCheckBox[selectedPropName] = selectedPropId; 
      if (ENABLE_PROPERTY_LIMITS && isOnTrial && Object.keys(newCheckBox).length >= numPropertiesRemaining) {
        setMaxPropertiesSelected(true);
      }
    }
    setCheckBox(newCheckBox);
  };

  const executeImport = async () => {
    setImportLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Create a transformed version of the checkBox object, handling rooms specially
    const selectedProperties = Object.entries(checkBox).reduce((obj, [name, id]) => {
      // Find the original property data from integrationPropertyList
      const propertyData = integrationPropertyList.find(p => 
        (p.internal_name === name || p.name === name) && (p.id === id || p.room_id === id)
      );

      // For rooms, use room_id as the main id and add property_id under main_property_id. For regular properties, just use the id and name
      if (propertyData?.is_room) {
        obj[propertyData.room_id] = {name:name, type:'room', main_property_id:propertyData.id};
      } else {
        obj[id] = {name:name, type:'property'};
      }
      return obj;
    }, {});

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error if non-2xx returned
      };

      const jsonPayload = { integration_properties: selectedProperties };
      const response = await axios.post(`${baseUrl}/bulk_add_from_integration`, jsonPayload, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setNewPropertiesAdded(true);
        handleNoPlanClose("importPropertiesClose");
      } else {
        ToastHandle(response.data.error, "danger");
      }
    } catch (error) {
      ToastHandle("Error importing integration property", "danger");
    } finally {
      setImportLoading(false);
    }
  };

  // Add cleanup effect, to make sure the "max properties selected" message is removed when the modal is closed
  useEffect(() => {
    return () => {
      setMaxPropertiesSelected(false);
    };
  }, []);

  const handleClose = () => {
    if (!importLoading) {
      setMaxPropertiesSelected(false);
      handleNoPlanClose("importPropertiesClose");
    }
  };

  return (
    <>
      {ENABLE_PROPERTY_LIMITS && maxPropertiesSelected && ReactDOM.createPortal(
        <div style={{position: 'fixed', top: '10px', right: '10px', backgroundColor: 'rgb(0, 15, 40)', padding: '10px 20px', borderRadius: '8px', zIndex: 9999, boxShadow: '0 2px 10px rgba(0,0,0,0.3)', border: '1px solid rgb(0, 55, 120)'}}>
          <div style={{color: 'rgb(210, 140, 0)'}}>Max properties selected</div>
          <div style={{color:'white', fontSize:'14px'}}>Up to {subscriptionData?.props_allowed} properties can be added during trial.</div>
        </div>,
        document.body
      )}
      <Modal show={showNoPlan} size="md" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body>
          <h3 className="text-white text-center mb-4 fw-bold fs-4">Import Properties from PMS</h3>
          <hr />
          {!integrationPropertiesLoading ? (
            integrationPropertyList && integrationPropertyList.length > 0 ? (
              <>
                <div id="integrate_form1">
                  
                  {/* Search bar */}
                  <input type="text" placeholder="Search properties..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="form-control mb-3"/>

                  <div className="row form-design">
                    <div className="col-12 mt-3">
                      {integrationPropertyList
                        ?.filter((integrationPropObj) => {
                          const propName = integrationPropObj?.internal_name ? integrationPropObj.internal_name : integrationPropObj?.name;
                          return normalizeString(propName).includes(normalizeString(searchTerm));
                        })
                        .map((integrationPropObj, index) => {
                          const propName = integrationPropObj?.internal_name ? integrationPropObj.internal_name : integrationPropObj?.name;
                          const isDisabled = ENABLE_PROPERTY_LIMITS && isOnTrial && !checkBox.hasOwnProperty(propName) && Object.keys(checkBox).length >= numPropertiesRemaining;
                          return (
                            <div className="form-check custom_checkbox" key={index} onClick={() => { if (!isDisabled) SelectItem(integrationPropObj); }}>
                              <input className="form-check-input" type="checkbox" name="flexRadioDefault" id={`flexRadioDefault${index}`} value={propName} checked={checkBox?.hasOwnProperty(propName)} disabled={isDisabled} onChange={() => { }} />
                              <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                                {propName}
                              </label>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                  <div className="row form-design mt-1">
                    <div className="col-12 text-center">
                      {!importLoading ? (
                        <button className="btn btn-primary px-5" onClick={executeImport}>Import These Properties</button>
                      ) : (
                        <div>
                          <p style={{ color: 'white' }}>Importing. Please be patient, this may take a few minutes...</p>
                          <BoxLoader />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p style={{ color: 'white', textAlign: 'center' }}>Your PMS properties are not yet available for import. If you just connected your PMS, please allow up to 30 minutes for data sync to complete.</p>
            )
          ) : (
            <>
              <p style={{ color: 'white', textAlign: 'center' }}>Loading properties from your PMS...</p>
              <BoxLoader />
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ImportPropertiesModal;