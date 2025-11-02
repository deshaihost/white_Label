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

  const callListIntegrationPropertiesAPI = async () => {
    setIntegrationPropertiesLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/list_integration_properties`, config);

      if (response.status === 200) {
        // Ensure property IDs are stored as strings
        const propertiesWithStringIds = response.data.properties.map(property => ({
          ...property,
          id: property.id.toString() // Ensure ID is a string
        }));
        setIntegrationPropertiesList(propertiesWithStringIds);
      } else {  }
    } catch (error) {  }
    finally { setIntegrationPropertiesLoading(false); }
  };

  // On page load, call the list_integration_properties API.
  useEffect(() => {
    if (apiPropertyData) {
      if (!listIntegrationPropertiesHasBeenCalled) {
        if (!apiPropertyData.hasOwnProperty('calry_property_id')) { // if the property is not already linked
          callListIntegrationPropertiesAPI();
          setListIntegrationPropertiesHasBeenCalled(true);
        }
      }
    }
  }, [apiPropertyData]);

  // -------------------------------------------------------------------------------------------------------------------------------

  // Sender API Logic ------------------------------------------------------------------------------------------
  const [senders, setSenders] = useState([]);
  const [selectedSenderId, setSelectedSenderId] = useState(null);
  const [selectedSenderName, setSelectedSenderName] = useState(null);
  const [sendersLoading, setSendersLoading] = useState(false);
  const [setSenderLoading, setSetSenderLoading] = useState(false);
  const [sendersDropdownOpen, setSendersDropdownOpen] = useState(false);

  const callGetSendersApi = async () => {
    setSendersLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; },
        params: { property_name }
      };

      const response = await axios.get(`${baseUrl}/get_available_senders_for_property`, config);

      if (response.status === 200) {
        setSenders(response.data.senders || []);
      } else {
        ToastHandle(response?.data?.error || "Failed to fetch senders", "danger");
      }
    } catch (error) {
      console.error("Error fetching senders:", error);
      ToastHandle("Error fetching available senders", "danger");
    } finally {
      setSendersLoading(false);
    }
  };

  const callSetSenderApi = async (senderId, senderName) => {
    setSetSenderLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const jsonPayload = {
        property_name,
        sender_id: senderId,
        sender_name: senderName
      };
      
      const response = await axios.post(`${baseUrl}/set_sender_for_property`, jsonPayload, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        getPropertyDataFromAPI(property_name);
      } else {
        ToastHandle(response?.data?.error || "Failed to set sender", "danger");
      }
    } catch (error) {
      console.error("Error setting sender:", error);
      ToastHandle("Error setting sender", "danger");
    } finally {
      setSetSenderLoading(false);
    }
  };

  // When dropdown is opened for the first time, fetch senders
  const handleSendersDropdownClick = () => {
    if (!sendersDropdownOpen && senders.length === 0 && !sendersLoading) {
      callGetSendersApi();
    }
    setSendersDropdownOpen(true);
  };

  // When apiPropertyData populates (from parent), update prevLinkedIntegration
  useEffect(() => {
    if (apiPropertyData) {
      setPrevLinkedIntegration(apiPropertyData?.integration?.integration_property_name);
      
      // Set the current sender if available in property data
      if (apiPropertyData.sender_name_airbnb) {
        setSelectedSenderName(apiPropertyData.sender_name_airbnb);
      } else {
        setSelectedSenderName(null);
      }
      
      if (apiPropertyData.sender_id_airbnb) {
        setSelectedSenderId(apiPropertyData.sender_id_airbnb);
      } else {
        setSelectedSenderId("LISTING_OWNER"); // Listing Owner is the default when no sender is explicitly set
      }
    }
  }, [apiPropertyData]);

  const link_integration = async (e, propertyName, integrationPropertyId) => {
    e.preventDefault();
    
    // Ensure we're working with a string ID
    if (!integrationPropertyId) return;
    const propertyIdString = integrationPropertyId.toString();
    
    setLinkIsLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Get the integrationPropertyName from the integrationPropertyId
    const selectedIntegrationProperty = integrationPropertyList.find((property) => property.id === propertyIdString);
    const integrationPropertyName = selectedIntegrationProperty?.internal_name ? selectedIntegrationProperty.internal_name : selectedIntegrationProperty?.name;
    console.log("Linking to integration property:", integrationPropertyList)

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const jsonPayload = {platform_property_id:propertyIdString, platform_property_name:integrationPropertyName};
      
      const response = await axios.post(`${baseUrl}/properties/${propertyName}/link_to_integration`, jsonPayload, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        getPropertyDataFromAPI(propertyName);
      } else {
        ToastHandle(response?.data?.error, "danger");
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

    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
      };
      const response = await axios.delete(`${baseUrl}/properties/${propertyName}/unlink_from_integration`, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        getPropertyDataFromAPI(propertyName);
      } else { ToastHandle(response.data.error, "danger"); }
    } catch (error) {
      console.error("Error unlinking integration:", error);
      ToastHandle("Error unlinking integration", "danger");
    } finally {
      setUnlinkIsLoading(false);
    }
  };

  const handleSenderChange = (e) => {
    const value = e.target.value;
    
    if (value === "LISTING_OWNER") {
      setSelectedSenderId("LISTING_OWNER");
      setSelectedSenderName(null);
      callSetSenderApi("LISTING_OWNER", null);
    } else {
      const sender = senders.find(s => s.id === value);
      if (sender) {
        setSelectedSenderId(sender.id);
        setSelectedSenderName(sender.name);
        callSetSenderApi(sender.id, sender.name);
      }
    }
  };

  return (
    <>
      <div>
        <div className="row">
          <div className="col-12 form-design">
            <form>
              <h2 className="modern-section-heading">PMS Integration</h2>
              {apiPropertyData != null ? (
                prevLinkedIntegration ? ( // If already linked to an integration property: show the name of the linked integration property and option to unlink
                  <>
                    <div className="modern-card" style={{ padding: '16px' }}>
                      <p style={{ color: "#a6a9b2", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", marginBottom: '8px' }}>
                        Linked to {apiPropertyData?.integration?.platform || 'PMS'} property: <span style={{ color: 'white', fontWeight: 600 }}>{prevLinkedIntegration}</span>
                      </p>
                      {unlinkIsLoading ? (
                        <>
                          <p style={{ color: "white", fontSize: "13px", marginTop: '8px' }}>
                            Unlinking...
                          </p>
                          <BoxLoader />
                        </>
                      ) : (
                        <button 
                          className="modern-text-link" 
                          style={{ fontSize: '13px', fontWeight: 600, marginTop: '4px', background: 'none', border: 'none', padding: 0, textTransform: 'uppercase', display: 'inline-block', width: 'auto' }} 
                          onClick={(e) => unlink_integration(e, property_name)}
                        >
                          UNLINK
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  // If not linked to n integration property: show a select with the list of integration properties (pulled from the backend API)
                  <>
                    {!integrationPropertiesLoading ? (
                      <>
                        <div className="modern-card-highlighted" style={{ padding: '16px', border: '2px solid #d4183d', boxShadow: '0 0 15px rgba(212, 24, 61, 0.2)' }}>
                          {integrationPropertyList?.length > 0 ? (
                            <>
                              <select 
                                id="integration_property_select" 
                                className="modern-input" 
                                style={{ marginBottom: '16px' }}
                                onChange={(e) => setSelectedIntegrationPropertyId(e.target.value.toString())}
                                defaultValue=""
                              >
                                <option value="" disabled>Click to select property...</option>
                                {integrationPropertyList?.map((property) => {
                                  return (
                                    <option key={property.id} value={property.id}>
                                      {property?.internal_name ? property.internal_name : property?.name}
                                    </option>
                                  );
                                })}
                              </select>
                              {linkIsLoading ? (
                                <>
                                  <p style={{ color: "white", fontSize: "13px" }}> Linking... </p>
                                  <BoxLoader />
                                </>
                              ) : (
                                <button 
                                  className="modern-btn-primary" 
                                  style={{ width: '100%' }} 
                                  onClick={(e) => link_integration(e, property_name, selectedIntegrationPropertyId)} 
                                  disabled={!selectedIntegrationPropertyId}
                                >
                                  Link To This Property
                                </button>
                              )}
                            </>
                          ) : (
                            <div style={{ color: "white", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
                              User account does not have a PMS integration. Connect your account to a PMS from the Properties page.
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ marginTop: '16px' }}>
                          <p style={{ color: "white", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>
                            Loading PMS properties...
                          </p>
                          <BoxLoader />
                        </div>
                      </>
                    )}
                  </>
                )
              ) : (
                <>
                  <div style={{ marginTop: '16px' }}>
                    <p style={{ color: "white", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>Loading PMS integration information...</p>
                  </div>
                </>
              )}

              {/* Sender Selection */}
              {apiPropertyData?.calry_property_id && apiPropertyData?.integration?.platform === 'hospitable' && (
                <div style={{ marginTop: "24px" }}>
                  <label className="modern-label" style={{ marginBottom: '8px', display: 'block' }}>
                    Message Sender (Airbnb)
                  </label>
                  <select 
                    id="sender_select" 
                    className="modern-input" 
                    onChange={handleSenderChange}
                    onClick={handleSendersDropdownClick}
                    value={selectedSenderId || "LISTING_OWNER"} // Listing Owner is the default if none explicitly set
                  >
                    {senders.length === 0 ? (
                      <>
                        {/* Ensure the current value is present as an option before senders are fetched */}
                        {selectedSenderId && !["PRIMARY_HOST", "LISTING_OWNER"].includes(selectedSenderId) ? ( // "primary_host" is the legacy label, which we might receive from the backend. It means "Listing Owner"
                          <option value={selectedSenderId}>
                            {selectedSenderName || selectedSenderId}
                          </option>
                        ) : null}
                        <option value="LISTING_OWNER">Listing Owner (Default)</option>
                        {sendersLoading && (
                          <option value="" disabled>Loading senders...</option>
                        )}
                      </>
                    ) : (
                      <>
                        <option value="LISTING_OWNER">Listing Owner (Default)</option>
                        {senders.map(sender => (
                          <option key={sender.id} value={sender.id}>
                            {sender.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  
                  {setSenderLoading && (
                    <div style={{ marginTop: "10px" }}>
                      <p style={{ color: "white", fontSize: "13px", fontFamily: "'DM Sans', sans-serif" }}>Updating sender...</p>
                      <BoxLoader />
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default IntegrationsForm;
