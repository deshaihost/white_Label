import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import ConnectToTurno from "./connectTurnoButton";
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import axios from 'axios';

const IntegrationsIndex = (ApiUserData) => {
  const turnoUserId = Boolean(ApiUserData?.ApiUserData?.turno_user_id);
  const propertyData = ApiUserData?.ApiUserData?.property_data;
  const propertiesList = Object.keys(propertyData || {});

  const [apiPropertyMappings, setApiPropertyMappings] = useState({});
  const [apiTurnoProperties, setApiTurnoProperties] = useState([]);
  const [selectedTurnoProperties, setSelectedTurnoProperties] = useState({});
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [getTurnoDataIsLoading, setGetTurnoDataIsLoading] = useState(false);


  const callGetTurnoPropsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetTurnoDataIsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.get(`${baseUrl}/list_turno_properties`, config);

      console.log('response', response);

      if (response.status === 200) {
        setApiPropertyMappings(response?.data?.property_mapping);
        setApiTurnoProperties(response?.data?.turno_properties);
      }
    }
    catch (error) { }
    finally {
      setGetTurnoDataIsLoading(false);
    }
  };


  const callSaveMappingApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const property_mapping = {};

    for (const propertyName in selectedTurnoProperties) {
      const turnoId = selectedTurnoProperties[propertyName];
      if (turnoId) {
        const turnoProperty = apiTurnoProperties.find(prop => prop.id === turnoId);
        if (turnoProperty) {
          property_mapping[turnoId] = {'turno_alias': turnoProperty.alias, 'hostbuddy_property_name': propertyName};
        }
      }
    }

    const body_data = { 'property_mapping': property_mapping };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.post(`${baseUrl}/save_turno_property_mapping`, body_data, config);

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


  // On page load: if user has a Turno integration, get the property mappings
  useEffect(() => {
    if (turnoUserId) {
      callGetTurnoPropsApi();
    }
  }, [turnoUserId]);


  // Update the property mappings based on the API response
  useEffect(() => {
    if (Object.keys(apiPropertyMappings).length > 0) {
      const newSelectedTurnoProperties = {};
      for (const turnoId in apiPropertyMappings) {
        const mapping = apiPropertyMappings[turnoId];
        if (mapping.hostbuddy_property_name) {
          newSelectedTurnoProperties[mapping.hostbuddy_property_name] = turnoId;
        }
      }
      setSelectedTurnoProperties(newSelectedTurnoProperties);
    }
  }, [apiPropertyMappings]);


  const handleSelectChange = (propertyName, turnoId) => {
    setSelectedTurnoProperties(prevState => ({ ...prevState, [propertyName]: turnoId}));
  };


  const isOptionDisabled = (turnoId, currentPropertyName) => {
    return Object.entries(selectedTurnoProperties).some(([propertyName, id]) => id === turnoId && propertyName !== currentPropertyName);
  };


  const handleSubmitClick = async () => {
    setSubmitIsLoading(true);
    await callSaveMappingApi();
    setSubmitIsLoading(false);
  }


  return (
    <div className='settings-integrations'>
      <div>
        <h3 className="mb-4">Integrations</h3>
        {!turnoUserId ? (
          <ConnectToTurno />
        ) : (
          <p>Connected to Turno</p>
        )}
      </div>

      <p style={{fontSize:'14px', textAlign:'center', width:'80%', margin:'40px auto auto'}}>
        Use the table below to link your HostBuddy properties to the corresponding Turno properties. Click "Submit" at the bottom when finished.
      </p>

      <table style={{ marginTop:'50px', width:'100%', borderCollapse:'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>HostBuddy properties</th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>Turno properties</th>
          </tr>
        </thead>
        <tbody>
          {!getTurnoDataIsLoading ? (
            propertiesList.map((property, index) => (
              <tr key={index} style={{ height: '40px', borderBottom: '1px solid white' }}>
                <td style={{ padding: '10px', fontSize: '14px' }}>{property}</td>
                <td style={{ padding: '10px' }}>
                  <select value={selectedTurnoProperties[property] || ''} onChange={(e) => handleSelectChange(property, e.target.value)} style={{ width:'100%'}} className={`form-control ${!selectedTurnoProperties[property] ? 'grey-text' : ''}`}>
                    <option value="">[None selected]</option>
                    {apiTurnoProperties.map((turnoProperty) => (
                      <option key={turnoProperty.id} value={turnoProperty.id} disabled={isOptionDisabled(turnoProperty.id, property)}>
                        {turnoProperty.alias}
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

      <div style={{display:'flex', justifyContent:'center', marginTop:'40px'}}>
        {!submitIsLoading ? (
          <button type="button" className="btn btn-primary" style={{borderRadius:'50px', padding:'10px 20px'}} onClick={handleSubmitClick}>
            Submit
          </button>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default IntegrationsIndex;
