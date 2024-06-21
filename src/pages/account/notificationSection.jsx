import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import "./account.css";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";

// Location & Time Zone Section of account page
const AccountNotificationSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const time_zone_name = userDataGet?.user_region?.time_zone_name;
  
  // Get the user's contact information from the API response, but only take emails/phones with confirmed=true
  let user_contact_options = Object.entries(userDataGet?.contact_information || {}).reduce((acc, [key, value]) => {
    acc[key] = Object.entries(value).reduce((acc2, [key2, value2]) => {
      if (!('last_confirmation_sent' in value2)) { // contact is defined to be confirmed if and only if this key is not present
        acc2[key2] = value2;
      }
      return acc2;
    }, {});
    return acc;
  }, {});

  // Add the user account's primary email address to the email addresses in contact_options
if (userDataGet?.email) {
  user_contact_options = {
    ...user_contact_options,
    email: {
      ...user_contact_options.email,
      [userDataGet?.email]: {}
    }
  };
}
  
  const [updateNotifSettingsApi, setUpdateNotifSettingsApi] = useState(false);
  const [recipients, setRecipients] = useState([{ firstName: '', channel: '', RecipientAddress: '', timing: '', time: '' }]);


  const callUpdateNotifSettingsApi = async (settingsData) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = {...settingsData};
    setUpdateNotifSettingsApi(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.put( `${baseUrl}/set_notification_settings`, dataToSend, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setUpdateNotifSettingsApi(false);
      return response.status;
    }
    catch (error) { ToastHandle(error, "danger"); }
    finally { setUpdateNotifSettingsApi(false); }
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate that all fields are filled out for each recipient
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      if (
        !recipient.firstName || !recipient.channel || !recipient.RecipientAddress || !recipient.timing ||
        (recipient.timing === 'daily' && !recipient.time))
      {
        ToastHandle('Fields missing for one or more recipients. Please fill all fields or remove the recipient.', 'danger');
        return;
      }
    }

    // Structure the data to be sent to the API
    // {'notification_settings': { 'action_items': {
    //      'immediate': {<email_or_sms#>: {'type':'<email_or_sms>', 'name':<firstName>}, ...},
    //      'hourly': {<email_or_sms#>: {'type':'<email_or_sms>', 'name':<firstName>}, ...},
    //      'daily': {<email_or_sms#>: {'type':'<email_or_sms>', 'time_of_day':'<HH:MM>', 'name':<firstName>}, ...} }}}
    let notificationSettings = {
      'notification_settings': {
        'action_items': {
          'immediate': {}, 'hourly': {}, 'daily': {}
        }
      }
    };
    recipients.forEach((recipient, index) => {
      let recipientData = { 'type': recipient.channel, 'name': recipient.firstName };
      if (recipient.timing === 'daily') { recipientData['time_of_day'] = recipient.time; }
      notificationSettings.notification_settings.action_items[recipient.timing][recipient.RecipientAddress] = recipientData;
    });

    // Call the API to update the notification settings
    const apiResponseCode = await callUpdateNotifSettingsApi(notificationSettings);
    if (apiResponseCode === 200) {
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions()); // Update our record of user data with the new region data we just added to the database
    }
  };


  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newRecipients = [...recipients];
    newRecipients[index][name] = value;
    setRecipients(newRecipients);
  };


  const addRecipient = () => {
    setRecipients([...recipients, { firstName: '', channel: '', RecipientAddress: '', timing: '', time: '' }]);
  };


  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };


  // Fetch user data on page load, to populate "userDataGet"
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);


  // when userDataGet populates, update the state of the form fields and the phone/email options
  useEffect(() => {

    // Update the state of the form fields
    if (userDataGet?.notification_settings) {
      let newRecipients = [];
      const actionItems = userDataGet.notification_settings.action_items;
      for (let timing in actionItems) {
        for (let recipient in actionItems[timing]) {
          let newRecipient = {
            firstName: actionItems[timing][recipient].name,
            channel: actionItems[timing][recipient].type,
            RecipientAddress: recipient,
            timing: timing,
            time: actionItems[timing][recipient].time_of_day ? actionItems[timing][recipient].time_of_day : ''
          };
          newRecipients.push(newRecipient);
        }
      }
      setRecipients(newRecipients);
    }

  }, [userDataGet]);


  /*
  // When the user's email address is populated from the API call, re-render the page so the email address select shows the right options
  useEffect(() => {
    if (user_email_addr) { setRecipients([...recipients]); }
  }, [user_email_addr]);
  */


  return (
    <div className="account-content location-section">
      <h3>Notification Settings</h3>
      <p style={{marginLeft:"10px"}}>If your contact information is not showing up here, add it in the "User Information" section and make sure it is confirmed.</p>
      {!time_zone_name && <p style={{marginLeft:"10px"}}><span className="warning-text">You have not set a time zone for your account.</span> Set your time zone in "Location / Region Settings" in order to use daily notifications.</p>}

      <form action="">

        <hr className="in-section-divider" />
        <h4>Action Items</h4>
        <p style={{marginLeft:"10px"}}>Get notifications when HostBuddy detects a new action item for the host in a guest conversation. Receive your notifications immediately, or get them all at the end of the hour or at a certain time of day.</p>
        

        {recipients.length === 0 && <p><span className="grey-text">No recipients added. This notification will not be sent.</span></p>}
        {recipients.map((recipient, index) => (
          <div className="recipient" key={index}>
            <div className="row">
              <div className="col input_group">
                <label htmlFor={`FirstName${index}`}>Recipient First Name</label>
                <input type="text" id={`FirstName${index}`} name="firstName" className="form-control" value={recipient.firstName} onChange={e => handleInputChange(e, index)} />
              </div>

              <div className="col input_group">
                <label htmlFor={`Channel${index}`}>Channel</label>
                <select id={`Channel${index}`} name="channel" className="form-control" value={recipient.channel} onChange={e => handleInputChange(e, index)}>
                  <option value="">-- Please select --</option>
                  <option value="email">Email</option>
                </select>
              </div>

              {recipient.channel && (
                <div className="col input_group">
                  <label htmlFor={`RecipientAddress${index}`}>{recipient.channel === 'email' ? 'Email Address' : 'Phone Number'}</label>
                  <select id={`RecipientAddress${index}`} name="RecipientAddress" className="form-control" value={recipient.RecipientAddress} onChange={e => handleInputChange(e, index)}>
                    <option value="">-- Please select --</option>
                    {recipient.channel === 'email' ? (
                      Object.keys(user_contact_options.email).map(email => (
                        <option key={email} value={email}>{email}</option>
                      ))
                    ) : (
                      Object.keys(user_contact_options.phone).map(phone => (
                        <option key={phone} value={phone}>{phone}</option>
                      ))
                    )}
                  </select>
                </div>
              )}
            </div>

            <div className="row" style={{marginTop:'20px'}}>
              <div className="col input_group">
                <label htmlFor={`Timing${index}`}>Timing</label>
                <select id={`Timing${index}`} name="timing" className="form-control" value={recipient.timing} onChange={e => handleInputChange(e, index)}>
                  <option value="">-- Please select --</option>
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily" disabled={!time_zone_name}>Daily</option>
                </select>
              </div>
              <div className="col input_group">
                <label htmlFor={`Time${index}`}>Receive Notification At:</label>
                {recipient.timing === 'daily' ? (
                  <input type="time" id={`Time${index}`} name="time" className="form-control" value={recipient.time} onChange={e => handleInputChange(e, index)} />
                ) : (
                  <input type="text" id={`Time${index}`} name="time" className="form-control disabled-input" value={recipient.timing === 'hourly' ? 'Hourly, On The Hour' : recipient.timing === 'immediate' ? 'Immediately' : '[Please select Timing first]'} disabled />
                )}
              </div>
            </div>

            <span className="d-flex justify-content-center">
              <Link to="#" style={{marginTop:'20px', color:'red', textAlign:'center'}} className="text-link" onClick={() => removeRecipient(index)}>Remove Recipient</Link>
            </span>

          </div>
        ))}

        <span className="d-flex justify-content-center" style={{ marginTop:'20px', marginBottom:'20px' }}>
          <Link to="#" className="text-link" onClick={addRecipient}>{recipients.length === 0 ? "+ Add A Notifications Recipient" : "+ Add Another Recipient"}</Link>
        </span>

        <div className="row">
          <div className="col text-center">
            <button type="submit" className="bg_theme_btn update_user_info" onClick={(event) => handleSubmit(event)}>
              {!updateNotifSettingsApi ? <>Update</> : <Loader />}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AccountNotificationSection;
