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
import ConnectToOpenPhone from './connectOpenPhoneButton';
import OpenPhoneIntegration from './OpenPhoneIntegration';
import { getSubscriptionStatus } from '../../../../helper/Authorized';
import LockIcon from './Icons/Integartion_lock.svg';
import './Integrations.css';

const IntegrationsIndex = (ApiUserData) => {
  const turnoUserId = Boolean(ApiUserData?.ApiUserData?.turno_user_id);
  const minutUserId = Boolean(ApiUserData?.ApiUserData?.minut_user_id);
  const tidyUserId = Boolean(ApiUserData?.ApiUserData?.tidy_user_id);
  const hostfullyGuidebooksUserId = Boolean(ApiUserData?.ApiUserData?.hostfully_guidebooks_user_id);
  const notionUserId = Boolean(ApiUserData?.ApiUserData?.notion_user_id);
  const whatsappPhoneNumber = ApiUserData?.ApiUserData?.whatsapp_phone_number;
  const openphoneNumber = ApiUserData?.ApiUserData?.openphone_numbers;

  // Determine user's subscription plan
  const subscriptionPlan = getSubscriptionStatus(ApiUserData?.ApiUserData).plan || '';
  const isProPlan = subscriptionPlan.toLowerCase().includes('pro');

  // Helper to render a disabled tile prompting the user to upgrade
  const renderUpgradeTile = (logoSrc, altText, description = 'Available on HostBuddy Elite', imgStyle = {}) => (
    <div className="partner-tile">
      <img className="partner-logo" alt={altText} src={logoSrc} style={imgStyle} />
      <p>{description}</p>
      <Link to="/setting/subscription" className="btn btn-primary" style={{ borderRadius: '50px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <img src={LockIcon} alt="Lock" style={{ width: '16px', height: '16px' }} />
        Upgrade
      </Link>
    </div>
  );

  // Identify connected integrations
  const connectedIntegrations = [];
  if (turnoUserId) connectedIntegrations.push('Turno');
  if (minutUserId) connectedIntegrations.push('Minut');
  if (tidyUserId) connectedIntegrations.push('Tidy');
  if (hostfullyGuidebooksUserId) connectedIntegrations.push('Hostfully Guidebooks');
  if (notionUserId) connectedIntegrations.push('Notion');
  if (whatsappPhoneNumber) connectedIntegrations.push('WhatsApp');
  if (openphoneNumber) connectedIntegrations.push('OpenPhone');

  // State for selected integration tab
  const [selectedIntegration, setSelectedIntegration] = useState(connectedIntegrations[0] || '');

  return (
    <div className='settings-integrations'>
      <div>
        <h3 className="mb-4">Integrations</h3>
        <div className="tiles-container">
          {/* Whatsapp */}
          {!whatsappPhoneNumber && (
            isProPlan ? renderUpgradeTile('https://hostbuddylb.com/partners/WhatsApp_logo.svg', 'WhatsApp Logo', 'Connect your WhatsApp Business Account to view your WhatsApp conversations in your inbox, and let HostBuddy automatically respond to your guests over WhatsApp.') : <ConnectToWhatsApp />
          )}
          {/* Turno */}
          {!turnoUserId && (
            isProPlan ? renderUpgradeTile('https://storage.googleapis.com/frontend_media/partners/turno-logo-with-text.webp', 'Turno Logo', 'Connecting your Turno account lets you use \"Property Ready\" in Smart Templates, so you can send messages to guests when their unit is ready for check-in.') : <ConnectToTurno />
          )}
          {/* Minut */}
          {!minutUserId && (
            isProPlan ? renderUpgradeTile('https://storage.googleapis.com/frontend_media/partners/minut_logo_text.svg', 'Minut Logo', 'Connect with Minut’s insights platform to automate and personalize guest messaging for noise or occupancy events. streamline your operations, keep your property protected, and enhance guest experience.') : <ConnectToMinut />
          )}
          {/* Tidy */}
          {!tidyUserId && (
            isProPlan ? renderUpgradeTile('https://hostbuddylb.com/partners/tidy_logo_black_text.svg', 'Tidy Logo', "HostBuddy's groundbreaking partnership with Tidy allows you to completely automate the handling of early check-in / late check-out requests based on the real-time cleaning status of your properties. Contact us to get access!") : <ConnectToTidy />
          )}
          {/* Hostfully Guidebooks */}
          {!hostfullyGuidebooksUserId && (
            isProPlan ? renderUpgradeTile('https://storage.googleapis.com/frontend_media/partners/hostfully_circle.svg', 'Hostfully Guidebooks Logo', 'Connect to Hostfully Guidebooks to allow HostBuddy to provide your guests with accurate, up-to-date information about your property and local recommendations directly from your Hostfully Guidebooks.', { width: '50px', height: '50px' }) : <ConnectToHostfullyGuidebooks />
          )}
          {/* OpenPhone */}
          {!openphoneNumber && (
            isProPlan ? renderUpgradeTile('https://hostbuddylb.com/partners/openphone_logo.webp', 'OpenPhone Logo', 'Connect your OpenPhone Account to view your OpenPhone conversations in your inbox, and let HostBuddy automatically respond to your guests over OpenPhone.') : <ConnectToOpenPhone />
          )}
          {/* Notion */}
          {!notionUserId && (
            isProPlan ? renderUpgradeTile('https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png', 'Notion Logo', 'Connect with Notion to let HostBuddy reference your documents and databases when responding to guests, allowing you to easily keep HostBuddy\'s knowledge base up to date in real time. (Coming soon)') : <ConnectToNotion />
          )}
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

            {selectedIntegration === 'OpenPhone' && (
              <OpenPhoneIntegration ApiUserData={ApiUserData} />
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
