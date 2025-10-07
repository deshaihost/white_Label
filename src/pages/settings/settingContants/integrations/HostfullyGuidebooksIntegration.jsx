import React, { useEffect, useState } from 'react';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import axios from 'axios';

const HostfullyGuidebooksIntegration = ({ ApiUserData }) => {
  const propertyData = ApiUserData?.ApiUserData?.property_data;
  const propertiesList = Object.keys(propertyData || {});

  const [apiPropertyMappings, setApiPropertyMappings] = useState({});
  const [apiHostfullyProperties, setApiHostfullyProperties] = useState([]);
  const [selectedHostfullyProperties, setSelectedHostfullyProperties] = useState({});
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [getHostfullyDataIsLoading, setGetHostfullyDataIsLoading] = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const callGetHostfullyPropsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetHostfullyDataIsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.get(`${baseUrl}/list_hostfully_guidebooks_properties`, config);
      console.log('list_hostfully_guidebooks_properties Response:', response);

      if (response.status === 200) {
        setApiPropertyMappings(response?.data?.property_mapping);
        setApiHostfullyProperties(response?.data?.hostfully_guidebooks_properties);
      }
    }
    catch (error) { }
    finally {
      setGetHostfullyDataIsLoading(false);
    }
  };

  const callSaveMappingApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const property_mapping = {};

    for (const propertyName in selectedHostfullyProperties) {
      const hostfullyId = selectedHostfullyProperties[propertyName];
      if (hostfullyId) {
        const hostfullyProperty = apiHostfullyProperties.find(prop => prop.id === hostfullyId);
        if (hostfullyProperty) {
          property_mapping[hostfullyId] = { 'hostfully_guidebooks_alias': hostfullyProperty.alias, 'hostbuddy_property_name': propertyName };
        }
      }
    }

    const body_data = { 'property_mapping': property_mapping };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.post(`${baseUrl}/save_hostfully_guidebooks_property_mapping`, body_data, config);
      console.log('save_hostfully_guidebooks_property_mapping Response:', response);

      if (response.status === 200) {
        ToastHandle('Property mappings saved successfully', 'success');
      } else {
        ToastHandle(response.data?.error || 'An error occurred', 'danger');
      }
    }
    catch (error) {
      ToastHandle('An error occurred.', 'danger');
    }
  };

  // On component mount: get the property mappings
  useEffect(() => {
    callGetHostfullyPropsApi();
  }, []);

  // Update the property mappings based on the API response
  useEffect(() => {
    if (Object.keys(apiPropertyMappings).length > 0) {
      const newSelectedHostfullyProperties = {};
      for (const hostfullyId in apiPropertyMappings) {
        const mapping = apiPropertyMappings[hostfullyId];
        if (mapping.hostbuddy_property_name) {
          newSelectedHostfullyProperties[mapping.hostbuddy_property_name] = hostfullyId;
        }
      }
      setSelectedHostfullyProperties(newSelectedHostfullyProperties);
    }
  }, [apiPropertyMappings]);

  const handleSelectChange = (propertyName, hostfullyId) => {
    setSelectedHostfullyProperties(prevState => ({ ...prevState, [propertyName]: hostfullyId }));
  };

  const isOptionDisabled = (hostfullyId, currentPropertyName) => {
    return Object.entries(selectedHostfullyProperties).some(([propertyName, id]) => id === hostfullyId && propertyName !== currentPropertyName);
  };

  const handleSubmitClick = async () => {
    setSubmitIsLoading(true);
    await callSaveMappingApi();
    setSubmitIsLoading(false);
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.delete(`${baseUrl}/disconnect_hostfully_guidebooks_integration`, config);
      
      if (response.status === 200) {
        setApiPropertyMappings({});
        setSelectedHostfullyProperties({});
        setShowDisconnectModal(false);
        ToastHandle('Hostfully Guidebooks integration disconnected successfully', 'success');
      } else {
        ToastHandle(response.data?.error || 'Failed to disconnect Hostfully Guidebooks integration', 'danger');
      }
    } catch (error) {
      console.error('Network error:', error);
      ToastHandle('Network error disconnecting Hostfully Guidebooks integration', 'danger');
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div>
      <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px' }}>
        Use the table below to link your HostBuddy properties to the corresponding Hostfully Guidebooks properties. Click "Submit" at the bottom when finished.
      </p>

      <table style={{ marginTop: '50px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>HostBuddy properties</th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Hostfully Guidebooks properties</th>
          </tr>
        </thead>
        <tbody>
          {!getHostfullyDataIsLoading ? (
            propertiesList.map((property, index) => (
              <tr key={index} style={{ height: '40px', borderBottom: '1px solid white' }}>
                <td style={{ padding: '10px', fontSize: '14px' }}>{property}</td>
                <td style={{ padding: '10px' }}>
                  <select value={selectedHostfullyProperties[property] || ''} onChange={(e) => handleSelectChange(property, e.target.value)} style={{ width: '100%' }} className={`form-control ${!selectedHostfullyProperties[property] ? 'grey-text' : ''}`}>
                    <option value="">[None selected]</option>
                    {apiHostfullyProperties.map((hostfullyProperty) => (
                      <option key={hostfullyProperty.id} value={hostfullyProperty.id} disabled={isOptionDisabled(hostfullyProperty.id, property)}>
                        {hostfullyProperty.alias}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <Loader />
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
        <div style={{ flex: 1 }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
          {!submitIsLoading ? (
            <button type="button" className="btn btn-primary" style={{ borderRadius: '50px', padding: '10px 20px' }} onClick={handleSubmitClick}>
              Submit
            </button>
          ) : (
            <Loader />
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {Object.keys(apiPropertyMappings).length > 0 && (
            <button
              onClick={() => setShowDisconnectModal(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Disconnect Integration
            </button>
          )}
        </div>
      </div>

      {/* Disconnect Confirmation Modal */}
      {showDisconnectModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: "#0f1a36", color: "#fff" }}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDisconnectModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to disconnect the integration{" "}
                <strong>Hostfully Guidebooks</strong>?<br />
                This action will remove all property mappings and you'll need to reconfigure them if you reconnect.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDisconnectModal(false)}
                  disabled={isDisconnecting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                >
                  {isDisconnecting ? "Disconnecting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostfullyGuidebooksIntegration;
