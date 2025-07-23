import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Loader from '../../../../helper/Loader';
import ConnectToWhatsApp from './connectWhatsAppButton';
import ConnectToTurno from "./connectTurnoButton";
import ConnectToMinut from './connectMinutButton';
import ConnectToTidy from './connectTidyButton';
import ConnectToNotion from './connectNotionButton';
import ConnectToMount from './connectMountButton';
import TurnoIntegration from './TurnoIntegration';
import MinutIntegration from './MinutIntegration';
import MountIntegration from './MountIntegration';
import ConnectToHostfullyGuidebooks from './connectHostfullyGuidebooksButton';
import HostfullyGuidebooksIntegration from './HostfullyGuidebooksIntegration';
import NotionIntegration from './notionIntegration';
import WhatsappIntegration from './whatsappIntegration';
import ConnectToOpenPhone from './connectOpenPhoneButton';
import OpenPhoneIntegration from './OpenPhoneIntegration';
import { getSubscriptionStatus } from '../../../../helper/Authorized';
import LockIcon from '../../../inbox/inboxSection/preferences/icons/lock.svg';
import InboxUpgrade from '../../../account/inbox_Upgrade/InboxUpgrade';
import './Integrations.css';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';

// SVG imports
const SlackSvg = require('./Icons/Slack.svg').default;
const TurnoLogoSvg = require('./Icons/Turno Logo.svg').default;
const TidyLogoSvg = require('./Icons/Tidy Logo.svg').default;
const MountLogoBlackSvg = require('./Icons/Mount Logo black.svg').default;
const NotionLogoSvg = require('./Icons/Notion Logo.svg').default;

const IntegrationsIndex = (ApiUserData) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const turnoUserId = Boolean(ApiUserData?.ApiUserData?.turno_user_id);
  const minutUserId = Boolean(ApiUserData?.ApiUserData?.minut_user_id);
  const tidyUserId = Boolean(ApiUserData?.ApiUserData?.tidy_user_id);
  const roomzaUserId = Boolean(ApiUserData?.ApiUserData?.roomza_user_id);
  const hostfullyGuidebooksUserId = Boolean(ApiUserData?.ApiUserData?.hostfully_guidebooks_user_id);
  const notionUserId = Boolean(ApiUserData?.ApiUserData?.notion_user_id);
  const whatsappPhoneNumber = ApiUserData?.ApiUserData?.whatsapp_phone_number;
  const openphoneNumber = ApiUserData?.ApiUserData?.openphone_numbers;

  // Determine user's subscription plan
  const subscriptionPlan = getSubscriptionStatus(ApiUserData?.ApiUserData).plan || '';
  const isProPlan = subscriptionPlan.toLowerCase().includes('pro');

  // Upgrade popup state
  const [showUpgradePopup, setShowUpgradePopup] = useState(false);
  const [mountActive, setMountActive] = useState(false);

  // Helper to render a disabled tile prompting the user to upgrade
  const renderUpgradeTile = (logoSrc, altText, description = 'Available on HostBuddy Elite', imgStyle = {}) => (
    <div className="partner-tile">
      <img className="partner-logo" alt={altText} src={logoSrc} style={imgStyle} />
      <p>{description}</p>
      <Link to="/setting/subscription" className="btn btn-primary" style={{ borderRadius: '50px', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
        <img src={LockIcon} alt="Lock" style={{ width: '16px', height: '16px' }} />
        Upgrade to unlock
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
  if (mountActive) connectedIntegrations.push('Mount');

  // Tab state for top-level tabs
  const [mainTab, setMainTab] = useState('Communication channels');
  const mainTabs = ['Communication channels', 'Third-party apps', 'Webhooks'];
  
  // Filter integrations based on mainTab
  const getFilteredIntegrations = (tab) => {
    if (tab === 'Communication channels') {
      return connectedIntegrations.filter(integration => 
        integration === 'WhatsApp' || integration === 'OpenPhone'
      );
    } else if (tab === 'Third-party apps') {
      return connectedIntegrations.filter(integration => 
        ['Turno', 'Minut', 'Tidy', 'Roomza', 'Hostfully Guidebooks', 'Notion', 'Mount'].includes(integration)
      );
    }
    return [];
  };
  
  // State for selected integration tab
  const filteredIntegrations = getFilteredIntegrations(mainTab);
  const [selectedIntegration, setSelectedIntegration] = useState(filteredIntegrations[0] || '');

  // --- Webhook integrations from user data ---
  const [webhooks, setWebhooks] = useState(ApiUserData?.ApiUserData?.contact_information?.webhook || {});
  useEffect(() => {
    setWebhooks(ApiUserData?.ApiUserData?.contact_information?.webhook || {});
  }, [ApiUserData]);

  // Add Webhook state
  const [showAddWebhook, setShowAddWebhook] = useState(false);
  const [newWebhookName, setNewWebhookName] = useState('');
  const [newWebhookUrl, setNewWebhookUrl] = useState('');
  const [addingWebhook, setAddingWebhook] = useState(false);
  const [addWebhookError, setAddWebhookError] = useState('');

  // Slack integration state
  const [slackOauthCode, setSlackOauthCode] = useState("");
  
  // If this is a redirect from Slack OAuth, get the code from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (code) { setSlackOauthCode(code); }
  }, [location]);
  
  // Update selected integration when main tab changes or mountActive state changes
  useEffect(() => {
    const filteredIntegrations = getFilteredIntegrations(mainTab);
    setSelectedIntegration(filteredIntegrations[0] || '');
  }, [mainTab, mountActive]);

  // Complete Slack OAuth API
  const completeSlackOauthAPI = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { code };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.post(`${baseUrl}/complete_slack_oauth`, dataToSend, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setSlackOauthCode(""); // reset the slackOauthCode state
        dispatch(getUserDataActions(false)); // update our data from the API
        if (typeof refreshUserData === 'function') refreshUserData();
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.status;
    } catch (error) {
      ToastHandle("Unable to complete Slack OAuth", "danger");
    }
  };

  // If we have a Slack OAuth code, complete the OAuth process
  useEffect(() => {
    if (slackOauthCode) {
      completeSlackOauthAPI(slackOauthCode);
    }
  }, [slackOauthCode]);

  // Helper to refresh user data (if available from props)
  const refreshUserData = ApiUserData?.refreshUserData;

  // Handle upgrade popup close
  const handleUpgradePopupClose = () => {
    setShowUpgradePopup(false);
  };

  // Handle Slack button click for pro users
  const handleSlackButtonClick = (e) => {
    if (isProPlan) {
      e.preventDefault();
      setShowUpgradePopup(true);
    }
  };

  // Handle Add Webhook button click for pro users
  const handleAddWebhookClick = (e) => {
    if (isProPlan) {
      e.preventDefault();
      setShowUpgradePopup(true);
    } else {
      setShowAddWebhook(true);
    }
  };
  
  // Handle Mount toggle change
  const handleMountToggleChange = () => {
    const newActiveState = !mountActive;
    setMountActive(newActiveState);
    // If Mount becomes active, select it in the third-party apps tab
    if (newActiveState && mainTab === 'Third-party apps') {
      setSelectedIntegration('Mount');
    }
    // You can add API call here to update the status on the backend
  };

  // Add webhook API logic (mirroring contactSection.jsx)
  const addWebhook = async () => {
    setAddingWebhook(true);
    setAddWebhookError('');
    if (!newWebhookName || !newWebhookUrl) {
      setAddWebhookError('Please fill all fields');
      setAddingWebhook(false);
      return;
    }
    if (!newWebhookUrl.startsWith('https://')) {
      setAddWebhookError('URL must start with https://');
      setAddingWebhook(false);
      return;
    }
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const dataToSend = { 'contact_info': { [newWebhookUrl]: { name: newWebhookName, type: 'webhook' } } };
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      const response = await axios.post(`${baseUrl}/add_contact`, dataToSend, config);
      if (response.status === 200) {
        setShowAddWebhook(false);
        setNewWebhookName('');
        setNewWebhookUrl('');
        setWebhooks(prev => ({
          ...prev,
          [newWebhookUrl]: { name: newWebhookName, type: 'webhook' }
        }));
        if (typeof refreshUserData === 'function') refreshUserData();
      } else {
        setAddWebhookError(response?.data?.error || 'Failed to add webhook');
      }
    } catch (error) {
      setAddWebhookError('Error adding webhook');
    } finally {
      setAddingWebhook(false);
    }
  };

  // Add webhook delete logic
  const handleDeleteWebhook = async (url) => {
    if (!window.confirm("Are you sure you want to delete this webhook?")) return;
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const params = new URLSearchParams({ contact_type: 'webhook', contact_information: url }).toString();
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      const response = await axios.delete(`${baseUrl}/delete_contact?${params}`, config);
      if (response.status === 200) {
        setWebhooks(prev => {
          const updated = { ...prev };
          delete updated[url];
          return updated;
        });
        if (typeof refreshUserData === 'function') refreshUserData();
      } else {
        alert(response?.data?.error || 'Failed to delete webhook');
      }
    } catch (error) {
      alert('Error deleting webhook');
    }
  };

  // Slack delete handler
  const handleDeleteSlack = async (name) => {
    if (!window.confirm("Are you sure you want to delete this Slack account?")) return;
    // TODO: Call your delete API here if needed
    // For now, just remove from local state
    const slackAccounts = { ...(ApiUserData?.ApiUserData?.contact_information?.slack || {}) };
    delete slackAccounts[name];
    // If you want to update the backend, add API call here
    // Optionally, update the parent or refresh user data
    // setSlackAccounts(slackAccounts); // If you use local state
    if (typeof refreshUserData === 'function') refreshUserData();
  };

  // Prepare connected integrations section based on mainTab
  let connectedIntegrationsSection = null;
  if (mainTab !== 'Webhooks') {
    const filteredIntegrations = getFilteredIntegrations(mainTab);
    connectedIntegrationsSection = (
      <>
        <h4 className="connected-title">Connected integrations</h4>
        {filteredIntegrations.length > 0 ? (
          <>
            <div className="integrations-tabs">
              {filteredIntegrations.map((integration) => (
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

            {selectedIntegration === 'Mount' && (
              <MountIntegration ApiUserData={ApiUserData} />
            )}

            {selectedIntegration === 'WhatsApp' && (
              <WhatsappIntegration />
            )}

            {selectedIntegration === 'OpenPhone' && (
              <OpenPhoneIntegration ApiUserData={ApiUserData} />
            )}
          </>
        ) : (
          <p className="no-integrations-message">
            No integrations connected yet. Connect to an integration above to get started.
          </p>
        )}
      </>
    );
  }

  return (
    <div className='settings-integrations'>
        <style>{`
          /* Toggle switch styles */
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .switch input:checked + .slider:before {
            transform: translateX(13px);
          }
          
          .switch input:focus + .slider {
            box-shadow: 0 0 1px #146ef5;
          }
        `}</style>
        <h3 className="mb-4">Integrations</h3>
      {/* Main Tab Bar */}
      <div className="main-tabs-bar">
       
        {mainTabs.map(tab => (
          <button
            key={tab}
            className={`main-tab-btn${mainTab === tab ? ' active' : ''}`}
            onClick={() => setMainTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>
        {/* <h3 className="mb-4">Integrations</h3> */}
        <div className="tiles-container">
          {/* Render tiles based on mainTab */}
          {mainTab === 'Communication channels' && (
            <>
              {/* Whatsapp */}
              {!whatsappPhoneNumber && (
                isProPlan ? renderUpgradeTile('https://hostbuddylb.com/partners/WhatsApp_logo.svg', 'WhatsApp Logo', 'Connect your WhatsApp Business Account to view your WhatsApp conversations in your inbox, and let HostBuddy automatically respond to your guests over WhatsApp.', { width: '152px', height: '50px' }) : <ConnectToWhatsApp />
              )}
              {/* OpenPhone */}
              {!openphoneNumber && (
                isProPlan ? renderUpgradeTile(require('./Icons/OpenPhone-Blue.png'), 'OpenPhone Logo', 'Connect your OpenPhone Account to view your OpenPhone conversations in your inbox, and let HostBuddy automatically respond to your guests over OpenPhone.', { 
                  width: '153px', 
                  height: '36px',
                  mixBlendMode: 'multiply',
                  backgroundColor: 'transparent' 
                }) : <ConnectToOpenPhone />
              )}
              {/* Slack */}
              {isProPlan ? 
                renderUpgradeTile(SlackSvg, 'Slack Logo', 'Connect your Slack account to allow HostBuddy to send action item notifications to your Slack channels. Reply to guests directly through Slack from your instruction.', { width: '82px', height: '50px' }) 
                : 
                <div className="partner-tile" style={{ cursor: 'pointer' }} onClick={() => window.location.href = '/setting/contact'}>
                  <img className="partner-logo" alt="Slack Logo" src={SlackSvg} style={{ width: '83px', height: '50px' }} />
                  <p>Connect your Slack account to allow HostBuddy to send action item notifications to your Slack channels. Reply to guests directly through Slack from your instruction.</p>
                </div>
              }
             
            </>
          )}
          {mainTab === 'Third-party apps' && (
            <>
              {/* Turno */}
              {!turnoUserId && (
                isProPlan ? renderUpgradeTile(TurnoLogoSvg, 'Turno Logo', 'Connecting your Turno account lets you use "Property Ready" in Smart Templates, so you can send messages to guests when their unit is ready for check-in.') : <ConnectToTurno />
              )}
              {/* Minut */}
              {!minutUserId && (
                isProPlan ? renderUpgradeTile('https://storage.googleapis.com/frontend_media/partners/minut_logo_text.svg', 'Minut Logo', 'Connect with Minut’s insights platform to automate and personalize guest messaging for noise or occupancy events. streamline your operations, keep your property protected, and enhance guest experience.') : <ConnectToMinut />
              )}
              {/* Tidy */}
              {!tidyUserId && (
                isProPlan ? renderUpgradeTile(TidyLogoSvg, 'Tidy Logo', "HostBuddy's groundbreaking partnership with Tidy allows you to completely automate the handling of early check-in / late check-out requests based on the real-time cleaning status of your properties. Contact us to get access!") : <ConnectToTidy />
              )}
              {/* Hostfully Guidebooks */}
              {!hostfullyGuidebooksUserId && (
                isProPlan ? renderUpgradeTile('https://storage.googleapis.com/frontend_media/partners/hostfully_circle.svg', 'Hostfully Guidebooks Logo', 'Connect to Hostfully Guidebooks to allow HostBuddy to provide your guests with accurate, up-to-date information about your property and local recommendations directly from your Hostfully Guidebooks.', { width: '50px', height: '50px' }) : <ConnectToHostfullyGuidebooks />
              )}
              {/* Mount */}
              <div className="partner-tile">
                <img className="partner-logo" alt="Mount Logo" src={MountLogoBlackSvg} style={{ maxWidth: '150px', height: 'auto' }} />
                <p>Activate Mount Upsells to automatically provide your guests with a trip planning concierge! When activated, HostBuddy will guide your guests through the trip planning process, based on upsells in your area</p>
                <div style={{ 
                  background: 'rgba(6, 9, 26, 1)',
                  border: '1px solid rgba(37, 39, 54, 1)',
                  borderRadius: '100px',
                  width: '267px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  boxSizing: 'border-box',
                  margin: '0 auto',
                }}>
                  <span style={{ color: mountActive ? 'rgb(20, 110, 245)' : '#bdbdbd', fontWeight: '700' }}>{mountActive ? 'Active' : 'Not active'}</span>
                  <label className="switch" style={{ margin: 0 }}>
                    <input 
                      type="checkbox" 
                      checked={mountActive} 
                      onChange={handleMountToggleChange}
                    />
                    <span className="slider round" style={{ 
                      position: 'relative',
                      top:"4px",
                      display: 'inline-block',
                      width: '30px',
                      height: '17px',
                      background: mountActive ? 'rgb(20, 110, 245)' : 'black',
                      borderRadius: '34px',
                      transition: '0.4s',
                      cursor: 'pointer',
                      // boxShadow: mountActive ? '0 0 5px rgb(20, 110, 245)' : '0 0 5px #eee'
                    }}>
                      <span style={{
                        position: 'absolute',
                        content: '""',
                        height: '13px',
                        width: '13px',
                        left: mountActive ? '14px' : '2px',
                        bottom: '2px',
                        background: '#fff',
                        borderRadius: '50%',
                        transition: '0.4s'
                      }}></span>
                    </span>
                  </label>
                </div>
              </div>
              {/* Notion */}
              {!notionUserId && (
                isProPlan ? renderUpgradeTile(NotionLogoSvg, 'Notion Logo', 'Connect with Notion to let HostBuddy reference your documents and databases when responding to guests, allowing you to easily keep HostBuddy\'s knowledge base up to date in real time. (Coming soon)') : <ConnectToNotion />
              )}
            </>
          )}
          {mainTab === 'Webhooks' && (
            <>
              <div style={{ width: '100%', marginTop: '20px' }}>
                <h4 className="fs-14 mb-4 mt-5 d-flex align-items-center">
                  {isProPlan && (
                    <img src={LockIcon} alt="lock" style={{ width: '14px', marginRight: '6px' }} />
                  )}
                  Webhook Endpoints
                </h4>
                {/* Webhook Table with headers */}
                <div className="table-responsive">
                  <table className="table">
                    <colgroup>
                      <col style={{ width: '25%' }} />
                      <col style={{ width: '35%' }} />
                      <col style={{ width: '20%' }} />
                      <col style={{ width: '20%' }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th className="fs-14 text-white">Name</th>
                        <th className="fs-14 text-white">Endpoint</th>
                        <th className="fs-14 text-white">Status</th>
                        <th className="fs-14 text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(webhooks).map(([url, details]) => (
                        <tr key={url}>
                          <td><h6 className="fs-14 text-white m-0">{details.name || url}</h6></td>
                          <td><h6 className="fs-14 text-white m-0" style={{ wordBreak: 'break-all' }}>{url}</h6></td>
                          <td><h6 className="fs-14 grey-text m-0">Confirmed</h6></td>
                          <td>
                            <Link to="#" style={{ color: "red", fontSize: "1rem", lineHeight: '1.2', margin: '0' }} className="text-link" onClick={() => handleDeleteWebhook(url)}>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Add Webhook Form */}
                {showAddWebhook ? (
                  <div className="recipient" style={{ marginBottom: '18px' }}>
                    <div className="row">
                      <div className="col input_group">
                        <label htmlFor="webhookName">Name</label>
                        <input type="text" id="webhookName" name="name" className="form-control" value={newWebhookName} onChange={e => setNewWebhookName(e.target.value)} />
                      </div>
                      <div className="col input_group">
                        <label htmlFor="webhookUrl">Webhook URL</label>
                        <input type="text" id="webhookUrl" name="url" className="form-control" placeholder="https://example.com/webhook" value={newWebhookUrl} onChange={e => setNewWebhookUrl(e.target.value)} />
                      </div>
                    </div>
                    {addWebhookError && <div style={{ color: 'red', marginTop: '8px' }}>{addWebhookError}</div>}
                    <span className="d-flex justify-content-center">
                      {!addingWebhook ? (
                        <Link to="#" className="text-link" style={{ marginTop: '20px', textAlign: 'center' }} onClick={addWebhook}>
                          Submit
                        </Link>
                      ) : (
                        <Loader />
                      )}
                    </span>
                  </div>
                ) : (
                  <span className="d-flex justify-content-center" style={{ marginTop: '10px', marginBottom: '18px' }}>
                    <Link to="#" className="text-link" onClick={handleAddWebhookClick}>
                      + Add Webhook
                    </Link>
                  </span>
                )}
                {Object.keys(webhooks).length === 0 && (
                  <div style={{ color: '#fff', padding: '16px' }}>No webhooks connected yet.</div>
                )}
              </div>
              {/* Slack Accounts Section - Commented out as requested */}
              {/*
              <div style={{ marginTop: '40px', width: '100%' }}>
                <h4 className="fs-14 mb-4 mt-5" style={{ color: 'white' }}>Slack Accounts</h4>
                {(() => {
                  const slackAccounts = ApiUserData?.ApiUserData?.contact_information?.slack || {};
                  const hasSlack = Object.keys(slackAccounts).length > 0;
                  if (hasSlack) {
                    return (
                      <div className="table-responsive">
                        <table className="table">
                          <colgroup>
                            <col style={{ width: '40%' }} />
                            <col style={{ width: '30%' }} />
                            <col style={{ width: '30%' }} />
                          </colgroup>
                          <thead>
                            <tr>
                              <th className="fs-14 text-white">Name</th>
                              <th className="fs-14 text-white">Status</th>
                              <th className="fs-14 text-white">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(slackAccounts).map(([name, details]) => (
                              <tr key={name}>
                                <td>
                                  <h6 className="fs-14 text-white m-0">{name}</h6>
                                </td>
                                <td>
                                  <h6 className="fs-14 grey-text m-0">Confirmed</h6>
                                </td>
                                <td>
                                  <a
                                    href="#"
                                    style={{ color: "red", fontSize: "1rem", lineHeight: '1.2', margin: '0' }}
                                    className="text-link"
                                    onClick={() => handleDeleteSlack(name)}
                                  >
                                    Delete
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  } else {
                    return (
                      <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <Link
                          to={isProPlan ? "#" : "/setting/contact"}
                          className="text-link"
                          style={{ 
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#ffffff',
                            color: '#333333',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            border: '2px solid #e0e0e0',
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onClick={handleSlackButtonClick}
                          onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#f8f9fa';
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                          }}
                          onMouseOut={(e) => {
                            e.target.style.backgroundColor = '#ffffff';
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.8 122.8" style={{ width: '24px', height: '24px', marginRight: '8px' }}>
                            <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path>
                            <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path>
                            <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path>
                            <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path>
                          </svg>
                        Add  Slack
                        </Link>
                      </div>
                    );
                  }
                })()}
              </div>
              */}

              {/* Slack Integration UI (OAuth loader) - Also commented out */}
              {/*
              <div className="recipient" style={{ marginTop: '20px' }}>
                {slackOauthCode ? (
                  <div className="slack-container">
                    <p>We're adding HostBuddy AI to your Slack account. Please wait...</p>
                    <Loader />
                  </div>
                ) : null}
              </div>
              */}
            </>
          )}
        </div>
      </div>

      <div className="connected-integrations-section">
    
        {connectedIntegrationsSection}
      </div>

      {/* Upgrade Popup Modal */}
      {showUpgradePopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={handleUpgradePopupClose}
        >
          <div 
            style={{
           
              borderRadius: '8px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <InboxUpgrade onClose={handleUpgradePopupClose} />
          </div>
        </div>
      )}
    </div>
  );
};

export default IntegrationsIndex;
