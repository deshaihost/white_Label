import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../../../helper/Loader';
import ConnectToTurno from "./connectTurnoButton";
import ConnectToMinut from './connectMinutButton';
import ConnectToTidy from './connectTidyButton';
import TurnoIntegration from './TurnoIntegration';
import MinutIntegration from './MinutIntegration';
import ConnectToHostfullyGuidebooks from './connectHostfullyGuidebooksButton';
import HostfullyGuidebooksIntegration from './HostfullyGuidebooksIntegration';
import './Integrations.css';

const IntegrationsIndex = (ApiUserData) => {
  const turnoUserId = Boolean(ApiUserData?.ApiUserData?.turno_user_id);
  const minutUserId = Boolean(ApiUserData?.ApiUserData?.minut_user_id);
  const tidyUserId = Boolean(ApiUserData?.ApiUserData?.tidy_user_id);
  const hostfullyGuidebooksUserId = Boolean(ApiUserData?.ApiUserData?.hostfully_guidebooks_user_id);
  
  // Only show the Hostfully Guidebooks section if the user's PMS is Hostfully
  //const pms_name = ApiUserData?.ApiUserData?.calry_integrations ? Object.keys(ApiUserData.ApiUserData.calry_integrations)[0] : undefined;
  //const isHostfully = pms_name === 'hostfully';

  // Identify connected integrations
  const connectedIntegrations = [];
  if (turnoUserId) connectedIntegrations.push('Turno');
  if (minutUserId) connectedIntegrations.push('Minut');
  if (tidyUserId) connectedIntegrations.push('Tidy');
  if (hostfullyGuidebooksUserId) connectedIntegrations.push('Hostfully Guidebooks');

  // State for selected integration tab
  const [selectedIntegration, setSelectedIntegration] = useState(connectedIntegrations[0] || '');

  return (
    <div className='settings-integrations'>
      <div>
        <h3 className="mb-4">Integrations</h3>
        <div className="tiles-container">
          {!turnoUserId && <ConnectToTurno />}
          {!minutUserId && <ConnectToMinut />}
          {!tidyUserId && <ConnectToTidy />}
          {!hostfullyGuidebooksUserId && <ConnectToHostfullyGuidebooks />}
        </div>
      </div>

      <div className="connected-integrations-section">
        <h4 className="connected-title">Connected integrations</h4>
        {connectedIntegrations.length > 0 ? (
          <>
            {/* Render tabs for connected integrations */}
            <div className="integrations-tabs">
              {connectedIntegrations.map((integration) => (
                <button key={integration} className={`tab-button ${selectedIntegration === integration ? 'active' : ''}`} onClick={() => setSelectedIntegration(integration)}>
                  {integration}
                </button>
              ))}
            </div>

            {/* Display functionality based on selected tab */}
            {selectedIntegration === 'Turno' && (
              <TurnoIntegration ApiUserData={ApiUserData} />
            )}

            {selectedIntegration === 'Minut' && (
              <MinutIntegration ApiUserData={ApiUserData} />
            )}

            {selectedIntegration === 'Tidy' && (
              <div>
                <h3 style={{marginTop:'40px'}}>Connected to Tidy!</h3>
              </div>
            )}

            {selectedIntegration === 'Hostfully Guidebooks' && (
              <HostfullyGuidebooksIntegration ApiUserData={ApiUserData} />
            )}

            {/* Add similar blocks for additional integrations */}
          </>
        ) : (
          <p className="no-integrations-message">
            No integrations connected yet. Connect to an integration above to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default IntegrationsIndex;
