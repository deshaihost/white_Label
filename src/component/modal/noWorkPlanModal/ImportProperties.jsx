import React, { useEffect, useState } from "react";
import './NoWorkPlanModal.css'
import Modal from "react-bootstrap/Modal";
import { useSelectorUseDispatch } from "../../../helper/Authorized";
import { listIntegrationPropertiesActions } from "../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { BoxLoader } from "../../../helper/Loader";
import ToastHandle from "../../../helper/ToastMessage";
import axios from "axios";


function ImportPropertiesModal({ handleNoPlanClose, showNoPlan, setNewPropertiesAdded }) {
  const { store, dispatch } = useSelectorUseDispatch();
  const integrationProperties = ["701 1st Ave", "701 2nd Ave", "701 3rd Ave"];
  const [loadingIntegrationProperties, setLoadingIntegrationProperties] = useState(false);
  const [hasCalledAPI, setHasCalledAPI] = useState(false);
  const [importLoading, setImportLoading] = useState(false);
  const integrationPropertyList = store?.listIntegrationPropertiesReducer?.listIntegrationProperties?.data?.properties
  const integrationPropertiesLoading = store?.listIntegrationPropertiesReducer?.loading;

  // Add state for the search term
  const [searchTerm, setSearchTerm] = useState('');

  // Helper function to normalize strings
  const normalizeString = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  // When this modal is opened, call API to get the list of integration properties
  useEffect(() => {
      if (showNoPlan && !hasCalledAPI) {
        dispatch(listIntegrationPropertiesActions());
        setHasCalledAPI(true);
      }
  }, [showNoPlan]);

  const [checkBox, setCheckBox] = useState({});

  // When a property is selected, toggle it by adding or removing it from the checkBox object (along with its ID)
  const SelectItem = (selectedPropObj) => {
    const selectedPropId = selectedPropObj.id;
    const selectedPropName = selectedPropObj?.internal_name ? selectedPropObj.internal_name : selectedPropObj?.name;

    const newCheckBox = { ...checkBox };
    if (newCheckBox[selectedPropName]) { delete newCheckBox[selectedPropName]; }
    else { newCheckBox[selectedPropName] = selectedPropId; }
    setCheckBox(newCheckBox);
  };

  const executeImport = async () => {
    setImportLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Create a flipped version of the checkBox object, to match the format expected by the API
    const selectedProperties = Object.entries(checkBox).reduce((obj, [name, id]) => {
      obj[id] = name;
      return obj;
    }, {});

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error if non-2xx returned
      };

      const jsonPayload = { integration_properties: selectedProperties, };
      const response = await axios.post( `${baseUrl}/bulk_add_from_integration`, jsonPayload, config );

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

  
  return (
    <Modal show={showNoPlan} size="md" onHide={() => { if (!importLoading) { handleNoPlanClose("importPropertiesClose"); } }} aria-labelledby="contained-modal-title-vcenter" centered>
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
                        return (
                          <div className="form-check custom_checkbox" key={index} onClick={() => { SelectItem(integrationPropObj); }}>
                            <input className="form-check-input" type="checkbox" name="flexRadioDefault" id={`flexRadioDefault${index}`} value={propName} checked={checkBox?.hasOwnProperty(propName)} onChange={() => { SelectItem(integrationPropObj); }} />
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
  );
}

export default ImportPropertiesModal;