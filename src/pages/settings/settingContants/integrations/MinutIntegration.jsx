import React, { useEffect, useState } from 'react';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import axios from 'axios';

const MinutIntegration = ({ ApiUserData }) => {
  const propertyData = ApiUserData?.ApiUserData?.property_data;
  const propertiesList = Object.keys(propertyData || {});

  const [apiPropertyMappings, setApiPropertyMappings] = useState({});
  const [apiMinutProperties, setApiMinutProperties] = useState([]);
  const [selectedMinutProperties, setSelectedMinutProperties] = useState({});
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [getMinutDataIsLoading, setGetMinutDataIsLoading] = useState(false);

  const callGetMinutPropsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetMinutDataIsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: status => status >= 200 && status < 500
      };

      const response = await axios.get(`${baseUrl}/list_minut_properties`, config);

      if (response.status === 200) {
        setApiPropertyMappings(response?.data?.property_mapping);
        setApiMinutProperties(response?.data?.minut_properties);
      }
    } catch (error) {
      // Handle error if needed
    } finally {
      setGetMinutDataIsLoading(false);
    }
  };

  const callSaveMappingApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const property_mapping = {};

    for (const propertyName in selectedMinutProperties) {
      const minutId = selectedMinutProperties[propertyName];
      if (minutId) {
        const minutProperty = apiMinutProperties.find(prop => prop.id === minutId);
        if (minutProperty) {
          property_mapping[minutId] = { 'minut_name':minutProperty.name, 'hostbuddy_property_name':propertyName };
        }
      }
    }

    const body_data = { 'property_mapping': property_mapping };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: status => status >= 200 && status < 500
      };

      const response = await axios.post(`${baseUrl}/save_minut_property_mapping`, body_data, config);

      if (response.status === 200) {
        ToastHandle('Property mappings saved successfully', 'success');
      } else {
        ToastHandle(response.data?.error || 'An error occurred', 'danger');
      }
    } catch (error) {
      ToastHandle('An error occurred.', 'danger');
    }
  };

  useEffect(() => {
    callGetMinutPropsApi();
  }, []);

  useEffect(() => {
    if (Object.keys(apiPropertyMappings).length > 0) {
      const newSelectedMinutProperties = {};
      for (const minutId in apiPropertyMappings) {
        const mapping = apiPropertyMappings[minutId];
        if (mapping.hostbuddy_property_name) {
          newSelectedMinutProperties[mapping.hostbuddy_property_name] = minutId;
        }
      }
      setSelectedMinutProperties(newSelectedMinutProperties);
    }
  }, [apiPropertyMappings]);

  const handleSelectChange = (propertyName, minutId) => {
    setSelectedMinutProperties(prevState => ({ ...prevState, [propertyName]: minutId }));
  };

  const isOptionDisabled = (minutId, currentPropertyName) => {
    return Object.entries(selectedMinutProperties).some(([propertyName, id]) => id === minutId && propertyName !== currentPropertyName);
  };

  const handleSubmitClick = async () => {
    setSubmitIsLoading(true);
    await callSaveMappingApi();
    setSubmitIsLoading(false);
  };

  return (
    <div>
      <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px' }}>
        Use the table below to link your HostBuddy properties to the corresponding Minut properties. Click "Submit" at the bottom when finished.
      </p>

      <table style={{ marginTop: '50px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>HostBuddy properties</th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Minut properties</th>
          </tr>
        </thead>
        <tbody>
          {!getMinutDataIsLoading ? (
            propertiesList.map((property, index) => (
              <tr key={index} style={{ height: '40px', borderBottom: '1px solid white' }}>
                <td style={{ padding: '10px', fontSize: '14px' }}>{property}</td>
                <td style={{ padding: '10px' }}>
                  <select
                    value={selectedMinutProperties[property] || ''}
                    onChange={(e) => handleSelectChange(property, e.target.value)}
                    style={{ width: '100%' }}
                    className={`form-control ${!selectedMinutProperties[property] ? 'grey-text' : ''}`}
                  >
                    <option value="">[None selected]</option>
                    {apiMinutProperties.map((minutProperty) => (
                      <option key={minutProperty.id} value={minutProperty.id} disabled={isOptionDisabled(minutProperty.id, property)}>
                        {minutProperty.name}
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

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
        {!submitIsLoading ? (
          <button type="button" className="btn btn-primary" style={{ borderRadius: '50px', padding: '10px 20px' }} onClick={handleSubmitClick}>
            Submit
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default MinutIntegration;
