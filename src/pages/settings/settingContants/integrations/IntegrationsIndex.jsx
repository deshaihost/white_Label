import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Loader from '../../../../helper/Loader';
import ConnectToWhatsApp from './connectWhatsAppButton';
import ConnectToTurno from "./connectTurnoButton";
import ConnectToMinut from './connectMinutButton';
import ConnectToTidy from './connectTidyButton';
import ConnectToNotion from './connectNotionButton';
import TurnoIntegration from './TurnoIntegration';
import MinutIntegration from './MinutIntegration';
import ConnectToHostfullyGuidebooks from './connectHostfullyGuidebooksButton';
import HostfullyGuidebooksIntegration from './HostfullyGuidebooksIntegration';
import NotionIntegration from './notionIntegration';
import WhatsappIntegration from './whatsappIntegration';
import './Integrations.css';

const IntegrationsIndex = (ApiUserData) => {
  const turnoUserId = Boolean(ApiUserData?.ApiUserData?.turno_user_id);
  const minutUserId = Boolean(ApiUserData?.ApiUserData?.minut_user_id);
  const tidyUserId = Boolean(ApiUserData?.ApiUserData?.tidy_user_id);
  const hostfullyGuidebooksUserId = Boolean(ApiUserData?.ApiUserData?.hostfully_guidebooks_user_id);
  const notionUserId = Boolean(ApiUserData?.ApiUserData?.notion_user_id);
  const whatsappPhoneNumber = ApiUserData?.ApiUserData?.whatsapp_phone_number;

  // Identify connected integrations
  const connectedIntegrations = [];
  if (turnoUserId) connectedIntegrations.push('Turno');
  if (minutUserId) connectedIntegrations.push('Minut');
  if (tidyUserId) connectedIntegrations.push('Tidy');
  if (hostfullyGuidebooksUserId) connectedIntegrations.push('Hostfully Guidebooks');
  if (notionUserId) connectedIntegrations.push('Notion');
  if (whatsappPhoneNumber) connectedIntegrations.push('WhatsApp');

  // State for selected integration tab
  const [selectedIntegration, setSelectedIntegration] = useState(connectedIntegrations[0] || '');

  return (
    <div className='settings-integrations'>
      <div>
        <h3 className="mb-4">Integrations</h3>
        <div className="tiles-container">
          {!whatsappPhoneNumber && <ConnectToWhatsApp />}
          {!turnoUserId && <ConnectToTurno />}
          {!minutUserId && <ConnectToMinut />}
          {!tidyUserId && <ConnectToTidy />}
          {!hostfullyGuidebooksUserId && <ConnectToHostfullyGuidebooks />}
          {!notionUserId && <ConnectToNotion />}
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

            {selectedIntegration === 'Notion' && (
              <NotionIntegration ApiUserData={ApiUserData} />
            )}

            {selectedIntegration === 'WhatsApp' && (
              <WhatsappIntegration />
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
