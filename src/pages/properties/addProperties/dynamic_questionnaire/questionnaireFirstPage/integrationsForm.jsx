import React, { useEffect, useState } from "react";
import { useSelectorUseDispatch } from "../../../../../helper/Authorized";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader, { BoxLoader } from "../../../../../helper/Loader";

import axios from "axios";

const IntegrationsForm = ({ property_name, apiPropertyData, getPropertyDataFromAPI }) => {
  const { store, dispatch } = useSelectorUseDispatch();

  const [prevLinkedIntegration, setPrevLinkedIntegration] = useState(null);

  // list_integration_properties API Logic ------------------------------------------------------------------------------------------

  const [selectedIntegrationPropertyId, setSelectedIntegrationPropertyId] = useState(null); // User-selected integration property
  const [linkIsLoading, setLinkIsLoading] = useState(false);
  const [unlinkIsLoading, setUnlinkIsLoading] = useState(false);
  const [integrationPropertyList, setIntegrationPropertiesList] = useState([]);
  const [integrationPropertiesLoading, setIntegrationPropertiesLoading] = useState(true);
  const [listIntegrationPropertiesHasBeenCalled, setListIntegrationPropertiesHasBeenCalled] = useState(false);

  //const integrationPropertyList = store?.listIntegrationPropertiesReducer?.listIntegrationProperties?.data?.properties; // array of integration_property objects; each with "name" and "id" properties
  //const integrationPropertiesLoading = store?.listIntegrationPropertiesReducer?.loading;

  const callListIntegrationPropertiesAPI = async () => {
    setIntegrationPropertiesLoading(true);
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

        const response = await axios.get(`${baseUrl}/list_integration_properties`, config);

        if (response.status === 200) {
          setIntegrationPropertiesList(response.data.properties); //list of dicts with "name" and "id" properties
        } else {  }
      }
    } catch (error) {  }
    finally { setIntegrationPropertiesLoading(false); }
  };

  // On page load, call the list_integration_properties API.
  useEffect(() => {
    if (!listIntegrationPropertiesHasBeenCalled) {
      if (!apiPropertyData.hasOwnProperty('calry_property_id')) { // if the property is not already linked
        callListIntegrationPropertiesAPI();
        setListIntegrationPropertiesHasBeenCalled(true);
      }
    }
  }, [apiPropertyData]);

  // -------------------------------------------------------------------------------------------------------------------------------

  // When apiPropertyData populates (from parent), update prevLinkedIntegration
  useEffect(() => {
    if (apiPropertyData) {
      setPrevLinkedIntegration(apiPropertyData?.integration?.integration_property_name);
    }
  }, [apiPropertyData]);

  const link_integration = async (e, propertyName, integrationPropertyId) => {
    e.preventDefault();
    setLinkIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    // Get the integrationPropertyName from the integrationPropertyId
    const selectedIntegrationProperty = integrationPropertyList.find((property) => property.id === integrationPropertyId);
    const integrationPropertyName = selectedIntegrationProperty?.name;

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };

        const jsonPayload = { platform_property_id: integrationPropertyId, platform_property_name: integrationPropertyName };
        const response = await axios.post(`${baseUrl}/properties/${propertyName}/link_to_integration`, jsonPayload, config);

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          getPropertyDataFromAPI(propertyName);
        } else {
          ToastHandle(response?.data?.error, "danger");
        }
      } else {
        alert("No Token");
      }
    } catch (error) {
      console.error("Error linking integration:", error);
      ToastHandle("Error linking integration", "danger");
    } finally {
      setLinkIsLoading(false);
    }
  };

  const unlink_integration = async (e, propertyName) => {
    e.preventDefault();

    // Browser onfirmation dialog
    const isConfirmed = window.confirm("Are you sure you want to unlink this integration?");
    if (!isConfirmed) { return; }

    setUnlinkIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY},
        };
        const response = await axios.delete(`${baseUrl}/properties/${propertyName}/unlink_from_integration`, config);

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          getPropertyDataFromAPI(propertyName);
        } else { ToastHandle(response.data.error, "danger"); }
      }
    } catch (error) {
      console.error("Error unlinking integration:", error);
      ToastHandle("Error unlinking integration", "danger");
    } finally {
      setUnlinkIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-12 form-design">
            <form>
              <h1 className="text-white mb-3 fs-4 fw-bold">PMS Integration</h1>
              {apiPropertyData != null ? (
                prevLinkedIntegration ? ( // If already linked to an integration property: show the name of the linked integration property and option to unlink
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '10px' }}>
                      <p style={{ color: "white", margin: 0 }}>
                        Linked to PMS property: {prevLinkedIntegration}
                      </p>
                      {unlinkIsLoading ? (
                        <>
                          <p style={{ color: "white", marginLeft: '10px' }} >
                            Unlinking...
                          </p>
                          <BoxLoader />
                        </>
                      ) : (
                        <button style={{ background:'none', color:'#AAA', border:'none', marginTop:'5px', cursor:'pointer', textDecoration:'underline', width:'auto', padding:'0' }} onClick={(e) => unlink_integration(e, property_name)}>
                          (Unlink)
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  // If not linked to n integration property: show a select with the list of integration properties (pulled from the backend API)
                  <>
                    {!integrationPropertiesLoading ? (
                      <>
                        <div className="col-12 mt-4 ">
                          {/* Vertical spacer */}
                        </div>
                        <div class="property_select">
                          {integrationPropertyList?.length > 0 ? (
                            <select id="integration_property_select" style={{ marginTop: "20px", width: "70%" }} class="form-select form-control" onChange={(e) => setSelectedIntegrationPropertyId( e.target.value )} >
                              <option value="" disabled selected>Click to select property...</option>
                              {integrationPropertyList?.map((property) => {
                                return (
                                  <option key={property.id} value={property.id}>
                                    {property.name}
                                  </option>
                                );
                              })}
                            </select>
                          ) : (
                            <div style={{ color: "white", marginTop: "20px", wordWrap: "break-word", width: "100%" }}>
                              User account does not have a PMS integration. Connect your account to a PMS from the Properties page.
                            </div>
                          )}
                        </div>
                        <div className="col-12 mt-4 ">
                          {integrationPropertyList?.length > 0 &&
                            (linkIsLoading ? (
                              <>
                                <p style={{ color: "white", marginTop: "20px" }}> Linking... </p>
                                <BoxLoader />
                              </>
                            ) : (
                              <button className="LinkPMSButton" style={{maxWidth:'300px'}} onClick={(e) => link_integration( e, property_name, selectedIntegrationPropertyId )} >
                                Link To This Property
                              </button>
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-12 mt-4 "> </div> {/* Vertical spacer */}
                        <p style={{ color: "white", marginTop: "20px" }}>
                          Loading PMS properties...
                        </p>
                        <BoxLoader />
                      </>
                    )}
                  </>
                )
              ) : (
                <>
                  <div className="col-12 mt-4 "> </div> {/* Vertical spacer */}
                  <p style={{ color: "white", marginTop: "20px" }}>Loading PMS integration information...</p>
                  {/* <BoxLoader /> */}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationsForm;
