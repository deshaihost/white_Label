import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import "./account.css";
import "./contacts.css";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";
import InboxUpgrade from "./inbox_Upgrade/InboxUpgrade";
import { getSubscriptionStatus } from "../../helper/Authorized";
import LockIcon from "../inbox/inboxSection/preferences/icons/lock.svg";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

// Location & Time Zone Section of account page
const AccountContactSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const { cssConfig, cssLoading } = useWhiteLabelCss();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  
  const [confCodeSending, setConfCodeSending] = useState(false);
  const [codeConfirming, setCodeConfirming] = useState(false);
  const [newContactAdding, setNewContactAdding] = useState(false);
  const [contacts, setContacts] = useState([{ type:'', name:'', address:'', confirmed:false }]); // All prev added contacts from the API. Populated on page load in the UseEffect
  const [confirmationCode, setConfirmationCode] = useState(""); // This is the user's input for confirmation code
  const [codeSentFor, setCodeSentFor] = useState(""); // This is the contact that the code was sent for, if any
  const [slackOauthCode, setSlackOauthCode] = useState(""); // Code received from Slack OAuth as part of the OAuth flow
  const [showUpgradePopup, setShowUpgradePopup] = useState(false); // Controls the InboxUpgrade popup

  // Determine if the user has a Pro plan
  const subscriptionData = getSubscriptionStatus(userDataGet);
  const isProPlanUser = subscriptionData.plan && subscriptionData.plan.toLowerCase().includes('pro');

  // Define the different sections of contact information. Will need to manually update this as we add new contact types
  const contact_sections = {'email':{'title':'Email Addresses', 'singular':'Email Address'}, 'sms':{'title':'Phone Numbers', 'singular':'Phone Number'}, 'whatsapp':{'title':'WhatsApp Contacts', 'singular':'WhatsApp Number'}, 'slack':{'title':'Slack Accounts', 'singular':'Slack Account'}, 'webhook':{'title':'Webhook Endpoints','singular':'Webhook URL'}};
  const initialState = Object.keys(contact_sections).reduce((acc, key) => {
    acc[key] = {};
    return acc;
  }, {});
  const [newContacts, setNewContacts] = useState(initialState);


  const addNewContact = async (contact_type, contact_name, contact_address) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { 'contact_info':{ [contact_address]:{ name:contact_name, type:contact_type } } };
    setNewContactAdding(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/add_contact`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setNewContactAdding(false);
      return response.status;
    }
    catch (error) { ToastHandle(error, "danger"); }
    finally { setNewContactAdding(false); }
  }

  // Send confirmation code to the user's address, which they then need to go confirm
  const callSendCodeAPI = async (contact_type, contact_address) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { contact_type, contact_information:contact_address };
    setConfCodeSending(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/send_contact_confirmation`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setConfCodeSending(false);
      return response.status;
    }
    catch (error) { ToastHandle("Unable to send confirmation code", "danger"); }
    finally { setConfCodeSending(false); }
  }

  const completeOauthAPI = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { code };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/complete_slack_oauth`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setSlackOauthCode(""); // reset the slackOauthCode state
        dispatch(getUserDataActions(false)); // update our data from the API
      }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.status;
    }
    catch (error) { ToastHandle("Unable to complete Slack OAuth", "danger"); }
  }

  // Submit the confirmation code to the API to complete confirmation
  const callConfirmContactAPI = async (contact_type, contact_address, confirmation_code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { contact_type, contact_information:contact_address, confirmation_code };
    setCodeConfirming(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        //validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/confirm_contact`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setCodeConfirming(false);
      return response.status;
    }
    catch (error) { ToastHandle("Unable to confirm contact", "danger"); }
    finally { setCodeConfirming(false); }
  }

  const callDeleteContactAPI = async (contact_type, contact_address) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const params = new URLSearchParams({ contact_type, contact_information: contact_address }).toString();

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.delete(`${baseUrl}/delete_contact?${params}`, config);

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.status;
    }
    catch (error) { ToastHandle("Unable to delete contact", "danger"); }
  }

  const handleInputChange = (event, section) => {
    const { name, type, checked, value } = event.target;
    const isCheckbox = type === 'checkbox';
    const updatedNewContacts = {...newContacts};

    // Validate phone number format for SMS and WhatsApp: only allow user to enter numbers and "+"
    if ((section === 'sms' || section === 'whatsapp') && name === 'address' && !value.match(/^[0-9+]*$/)) {
      return;
    }

    updatedNewContacts[section][name] = isCheckbox ? checked : value;
    setNewContacts(updatedNewContacts);
  };

  const showAddFields = (section) => {
    // Check if user has HostBuddy Pro plan and is trying to add WhatsApp, Slack, or Webhook
    const subscription_data = getSubscriptionStatus(userDataGet);
    const isProPlan = subscription_data.plan && subscription_data.plan.toLowerCase().includes('pro');
    
    if (isProPlan && (section === 'whatsapp' || section === 'slack' || section === 'webhook')) {
      setShowUpgradePopup(true);
      return;
    }

    let updatedNewContacts;
    if (section === 'sms') {
      updatedNewContacts = { ...newContacts, [section]: { type: '', name: '', address: '', confirmed: false, consent_checked: false } };
    } else {
      updatedNewContacts = { ...newContacts, [section]:{ type:'', name:'', address:'', confirmed:false }};
    }
    setNewContacts(updatedNewContacts);
  };

  const addContact = async (name, type, address) => {
    if (type === 'sms' || type === 'whatsapp') { address = address.replace(/[^\d+]/g, ''); } // remove all non-numeric characters except "+"
    else if (type === 'webhook' && !address.startsWith('https://')) {
      ToastHandle('URL must start with https://', "danger");
      return;
    }

    if (!name || !address) { ToastHandle("Please fill all fields", "danger"); }
    else if ((type === 'sms' || type === 'whatsapp') && !address.match(/^\+[0-9]{1,3}[0-9]{10}$/)) {
      ToastHandle('Please enter a valid phone number, starting with "+" and including country code.', "danger");
      return;
    }
    else {
      const responseCode = await addNewContact(type, name, address);
      if (responseCode === 200) {
        dispatch(getUserDataActions(false)); // update our data from the API
        setNewContacts(initialState); // reset the newContacts state
      }
    }
  };

  const removeContact = async (index) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this contact?");
    if (!isConfirmed) { return; }
    const responseCode = await callDeleteContactAPI(contacts[index].type, contacts[index].address);
    if (responseCode === 200) {
      dispatch(getUserDataActions(false)); // update our data from the API
    }
  };

  // Send the code to the user's address, which they then need to go confirm
  const sendConfirmationCode = async (index) => {
    setCodeSentFor(contacts[index].address);
    const responseCode = await callSendCodeAPI(contacts[index].type, contacts[index].address);
    if (responseCode != 200) { setCodeSentFor(""); }
  };

  // Submit the confirmation code to the API to complete confirmation
  const submitConfirmationCode = async (index) => {
    const responseCode = await callConfirmContactAPI(contacts[index].type, contacts[index].address, confirmationCode);
    if (responseCode === 200) {
      setCodeSentFor(""); // reset the codeSentFor state
      setConfirmationCode(""); // reset the confirmation code input
      dispatch(getUserDataActions(false)); // update our data from the API
    }
  };

  // Fetch user data on page load, to populate "userDataGet"
  useEffect(() => {
    dispatch(getUserDataActions(false));
  }, []);

  // when userDataGet populates, populate the previous contacts data
  useEffect(() => {
    if (userDataGet) {
      let updatedContacts = [];
      updatedContacts.push({ type:'email', name:'Primary Email', address:userDataGet.email, confirmed:true }); // Add the user's primary email address first

      if (userDataGet?.contact_information) {
        for (let contactType in userDataGet.contact_information) {
          for (let contact in userDataGet.contact_information[contactType]) {
            let isConfirmed = true;
            if ("last_confirmation_sent" in userDataGet.contact_information[contactType][contact]) { isConfirmed = false; }
            let contact_name = userDataGet.contact_information[contactType][contact].name;
            updatedContacts.push({ type:contactType, name:contact_name, address:contact, confirmed:isConfirmed });
          }
        }
      }
      setContacts(updatedContacts);
    }
  }, [userDataGet]);

  // If this is a redirect from Slack OAuth, get the code from the URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
    if (code) { setSlackOauthCode(code); }
  }, [location]);

  // If we have a Slack OAuth code (and therefore user is in the process of authorizing Slack), call the API to complete the OAuth
  // Also show the Add Contact form for Slack, where a loader will be displayed
  useEffect(() => {
    if (slackOauthCode) {
      setNewContacts({ slack:{ name:'', address:'' } });
      completeOauthAPI(slackOauthCode);
    }
  }, [slackOauthCode]);


  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '48px 32px' }}>
      <h1 className="contacts-page-title">
        Contact Information
      </h1>
      <p className="contacts-page-subtitle">
        Manage your notification channels and integrations
      </p>

      {/* InboxUpgrade Popup */}
      {showUpgradePopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto'
          }}>
            <button
              onClick={() => setShowUpgradePopup(false)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#fff',
                cursor: 'pointer',
                zIndex: 10000
              }}
            >
              ×
            </button>
            <InboxUpgrade onClose={() => setShowUpgradePopup(false)} />
          </div>
        </div>
      )}

      {/* Communication Methods Section */}
      <div style={{ marginBottom: '40px' }}>
        <div className="section-divider" style={{ marginBottom: '24px' }}>
          <div className="section-divider-line"></div>
          <span className="section-divider-text">Communication Methods</span>
          <div className="section-divider-line"></div>
        </div>

      <form action="">

        {Object.keys(contact_sections).map((section, index) => {
          // Separate communication methods from integrations
          const isCommunicationMethod = ['email', 'sms', 'whatsapp'].includes(section);
          const isIntegration = ['slack', 'webhook'].includes(section);
          
          // Skip if not communication method (integrations handled separately)
          if (!isCommunicationMethod) return null;
          
          return (
          <React.Fragment key={section}>
            {/* Section Card */}
            <div className="account-section-card contact-section" style={{ marginBottom: '32px' }}>
              <div className="section-header-with-icon">
                {section === 'email' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                )}
                {section === 'sms' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                )}
                {section === 'whatsapp' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                )}
                <h3 style={{
                  cursor: isProPlanUser && section === 'whatsapp' ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (isProPlanUser && section === 'whatsapp') {
                    setShowUpgradePopup(true);
                  }
                }}>
                  {isProPlanUser && section === 'whatsapp' && (
                    <img src={LockIcon} alt="lock" className="pro-feature-lock" />
                  )}
                  {contact_sections[section].title}
                </h3>
              </div>

            {/* Existing contact information */}
            {contacts.filter(contact => contact.type === section).length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                {contacts.map((contact, contactIndex) => (
                  contact.type === section && (
                    <div key={contactIndex} className="contact-list-item">
                      <div className="contact-list-item-left">
                        <span className="contact-item-name">{contact.name}</span>
                        <span className="contact-item-address">{contact.address}</span>
                      </div>
                      <div className="contact-list-item-right">
                        {!contact.confirmed && codeSentFor !== contact.address && (
                          <button
                            onClick={() => sendConfirmationCode(contactIndex)}
                            className="contact-action-button"
                          >
                            Send Code
                          </button>
                        )}
                        {!contact.confirmed && codeSentFor === contact.address && (
                          <div className="verification-code-container">
                            <span className="verification-code-label">Enter Code</span>
                            <input
                              type="text"
                              className="verification-code-input"
                              value={confirmationCode}
                              onChange={e => setConfirmationCode(e.target.value)}
                              placeholder="Code"
                              style={{
                                backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                              }}
                            />
                            <button
                              onClick={() => submitConfirmationCode(contactIndex)}
                              className="contact-action-button"
                            >
                              {codeConfirming ? <Loader /> : 'Submit'}
                            </button>
                          </div>
                        )}
                        <span className={contact.confirmed ? 'contact-status-confirmed' : 'contact-status-unconfirmed'}>
                          {contact.confirmed ? 'Confirmed' : 'Not Confirmed'}
                        </span>
                        {contact.name !== 'Primary Email' && (
                          <button
                            onClick={() => removeContact(contactIndex)}
                            className="contact-delete-button"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {/* Add new contact information, within a given section */}
            {Object.keys(newContacts[section] || {}).length > 0 && (
              <div 
                className="add-contact-form"
                style={{
                  backgroundColor: cssLoading ? '#17191f' : (cssConfig?.css_data?.background?.primary || 'var(--white-label-background-primary, #17191f)')
                }}
              >
                <div className="add-contact-form-grid">
                  <div>
                    <label className="add-contact-form-label">Name</label>
                    <input
                      type="text"
                      className="add-contact-form-input"
                      value={newContacts?.[section]?.name || ''}
                      onChange={e => handleInputChange(e, section)}
                      name="name"
                      style={{
                        backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                      }}
                    />
                  </div>
                  <div>
                    <label className="add-contact-form-label">{contact_sections[section].singular}</label>
                    <input
                      type={section === 'email' ? 'email' : section === 'sms' || section === 'whatsapp' ? 'tel' : 'text'}
                      className="add-contact-form-input"
                      value={newContacts?.[section]?.address || ''}
                      onChange={e => handleInputChange(e, section)}
                      name="address"
                      placeholder={section === 'email' ? 'example@domain.com' : section === 'sms' || section === 'whatsapp' ? '+12345678901' : ''}
                      style={{
                        backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                      }}
                    />
                  </div>
                </div>
                
                {section === 'sms' && (
                  <div className="consent-checkbox-container">
                    <button
                      type="button"
                      onClick={() => {
                        const updatedNewContacts = {...newContacts};
                        updatedNewContacts[section].consent_checked = !updatedNewContacts[section].consent_checked;
                        setNewContacts(updatedNewContacts);
                      }}
                      className={`consent-checkbox-button ${newContacts?.[section]?.consent_checked ? 'checked' : ''}`}
                    >
                      {newContacts?.[section]?.consent_checked && (
                        <div className="consent-checkbox-inner" />
                      )}
                    </button>
                    <label className="consent-checkbox-label">
                      I consent to receive a one-time verification code at this number.
                    </label>
                  </div>
                )}

                <div className="add-contact-form-buttons">
                  <button
                    type="button"
                    onClick={() => {
                      setNewContacts(initialState);
                    }}
                    className="add-contact-cancel-button"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => addContact(newContacts?.[section]?.name, section, newContacts?.[section]?.address)}
                    disabled={
                      !newContacts?.[section]?.name || 
                      !newContacts?.[section]?.address ||
                      (section === 'sms' && !newContacts?.[section]?.consent_checked)
                    }
                    className="add-contact-submit-button"
                  >
                    {newContactAdding ? <Loader /> : 'Submit'}
                  </button>
                </div>
              </div>
            )}

            {/* Add new contact information button for this section */}
            {Object.keys(newContacts[section] || {}).length === 0 && (
              <button
                type="button"
                onClick={() => showAddFields(section)}
                className="add-contact-button"
              >
                <span className="add-contact-button-icon">+</span>
                Add {contact_sections[section].singular}
              </button>
            )}
          </div>
          </React.Fragment>
        )}
        )}

      </form>
      </div>

      {/* Integrations Section */}
      <div style={{ marginBottom: '40px' }}>
        <div className="section-divider" style={{ marginBottom: '24px' }}>
          <div className="section-divider-line"></div>
          <span className="section-divider-text">Integrations</span>
          <div className="section-divider-line"></div>
        </div>

        {/* Slack Accounts */}
        {Object.keys(contact_sections).map((section) => {
          if (section !== 'slack' && section !== 'webhook') return null;
          
          return (
            <React.Fragment key={section}>
              <div className="account-section-card contact-section" style={{ marginBottom: '32px' }}>
                <div className="section-header-with-icon">
                  {section === 'slack' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="16" height="16" x="6" y="4" rx="2"></rect>
                      <path d="M2 10h4"></path>
                      <path d="M2 14h4"></path>
                      <path d="M18 10h4"></path>
                      <path d="M18 14h4"></path>
                    </svg>
                  )}
                  {section === 'webhook' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  )}
                  <h3 style={{
                    cursor: isProPlanUser && (section === 'slack' || section === 'webhook') ? 'pointer' : 'default'
                  }}
                  onClick={() => {
                    if (isProPlanUser && (section === 'slack' || section === 'webhook')) {
                      setShowUpgradePopup(true);
                    }
                  }}>
                    {isProPlanUser && (section === 'slack' || section === 'webhook') && (
                      <img src={LockIcon} alt="lock" className="pro-feature-lock" />
                    )}
                    {contact_sections[section].title}
                  </h3>
                </div>

                {section === 'slack' && (
                  <>
                    <p className="slack-integration-description">
                      Click the button below to add HostBuddy AI to your Slack account.
                    </p>
                    {slackOauthCode ? (
                      <div style={{ textAlign: 'center', padding: '20px' }}>
                        <p style={{ color: 'white', marginBottom: '20px' }}>We're adding HostBuddy AI to your Slack account. Please wait...</p>
                        <Loader />
                      </div>
                    ) : (
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <a 
                          href="https://slack.com/oauth/v2/authorize?scope=incoming-webhook%2Cchannels%3Aread%2Cchat%3Awrite&amp;redirect_uri=https%3A%2F%2Fhostbuddy.ai%2Fsetting%2Fcontact&amp;client_id=6640565127554.7377267101792"
                          className="slack-add-button"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 54 54" fill="none">
                            <path d="M11.3 33.8c0 3.1-2.5 5.6-5.6 5.6S.1 36.9.1 33.8s2.5-5.6 5.6-5.6h5.6v5.6zm2.8 0c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6v14c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6v-14z" fill="#E01E5A"/>
                            <path d="M19.7 11.3c-3.1 0-5.6-2.5-5.6-5.6S16.6.1 19.7.1s5.6 2.5 5.6 5.6v5.6h-5.6zm0 2.8c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6h-14c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6h14z" fill="#36C5F0"/>
                            <path d="M42.2 19.7c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6-2.5 5.6-5.6 5.6h-5.6v-5.6zm-2.8 0c0 3.1-2.5 5.6-5.6 5.6s-5.6-2.5-5.6-5.6v-14c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6v14z" fill="#2EB67D"/>
                            <path d="M33.8 42.2c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6-5.6-2.5-5.6-5.6v-5.6h5.6zm0-2.8c-3.1 0-5.6-2.5-5.6-5.6s2.5-5.6 5.6-5.6h14c3.1 0 5.6 2.5 5.6 5.6s-2.5 5.6-5.6 5.6h-14z" fill="#ECB22E"/>
                          </svg>
                          Add to Slack
                        </a>
                      </div>
                    )}
                  </>
                )}

                {section === 'webhook' && (
                  <>
                    {/* Existing Webhooks List */}
                    {contacts.filter(contact => contact.type === section).length > 0 && (
                      <div style={{ marginBottom: '24px' }}>
                        {contacts.map((contact, contactIndex) => (
                          contact.type === section && (
                            <div key={contactIndex} className="contact-list-item">
                              <div className="contact-list-item-left">
                                <span className="contact-item-name">{contact.name}</span>
                                <span className="contact-item-address">{contact.address}</span>
                              </div>
                              <button
                                onClick={() => removeContact(contactIndex)}
                                className="contact-delete-button"
                              >
                                Delete
                              </button>
                            </div>
                          )
                        ))}
                      </div>
                    )}

                    {/* Add Webhook Form */}
                    {Object.keys(newContacts[section] || {}).length > 0 && (
                      <div className="add-contact-form">
                        <div className="add-contact-form-grid">
                          <div>
                            <label className="add-contact-form-label">Name</label>
                            <input
                              type="text"
                              className="add-contact-form-input"
                              value={newContacts?.[section]?.name || ''}
                              onChange={e => handleInputChange(e, section)}
                              name="name"
                              style={{
                                backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                              }}
                            />
                          </div>
                          <div>
                            <label className="add-contact-form-label">{contact_sections[section].singular}</label>
                            <input
                              type="text"
                              className="add-contact-form-input"
                              value={newContacts?.[section]?.address || ''}
                              onChange={e => handleInputChange(e, section)}
                              name="address"
                              placeholder="https://example.com/webhook"
                              style={{
                                backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                              }}
                            />
                          </div>
                        </div>
                        <div className="webhook-form-submit">
                          <button
                            type="button"
                            onClick={() => addContact(newContacts?.[section]?.name, section, newContacts?.[section]?.address)}
                            disabled={!newContacts?.[section]?.name || !newContacts?.[section]?.address}
                            className="webhook-submit-button"
                          >
                            {newContactAdding ? <Loader /> : 'Submit'}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Add Webhook Button */}
                    {Object.keys(newContacts[section] || {}).length === 0 && (
                      <button
                        type="button"
                        onClick={() => showAddFields(section)}
                        className="add-contact-button"
                      >
                        <span className="add-contact-button-icon">+</span>
                        Add {contact_sections[section].singular}
                      </button>
                    )}
                  </>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AccountContactSection;
