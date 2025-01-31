import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./account.css";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";
import { Tooltip } from "react-tooltip";

import MultiSelect from "../../component/multiSelect/multiSelect";

// Location & Time Zone Section of account page
const AccountNotificationSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const propertyNamesList = Object.keys(userDataGet?.property_data || {});
  const time_zone_name = userDataGet?.user_region?.time_zone_name;

  // Initialize user_contact_options with all possible contact channels set to empty objects
  let all_possible_contact_channels = ["email", "sms", "slack", "whatsapp", "webhook"];
  let user_contact_options = all_possible_contact_channels.reduce(
    (acc, channel) => {
      acc[channel] = {};
      return acc;
    },
    {}
  );

  // Populate user_contact_options with the user's contact information from the API response, but only take emails/phones with confirmed=true
  Object.entries(userDataGet?.contact_information || {}).forEach(
    ([key, value]) => {
      if (all_possible_contact_channels.includes(key)) {
        user_contact_options[key] = Object.entries(value).reduce(
          (acc, [key2, value2]) => {
            if (!("last_confirmation_sent" in value2)) { // contact is defined to be confirmed if and only if this key is not present
              acc[key2] = value2;
            }
            return acc;
          },
          {}
        );
      }
    }
  );

  // Add the user account's primary email address to the email addresses in contact_options
  if (userDataGet?.email) {
    user_contact_options = {
      ...user_contact_options,
      email: { ...user_contact_options.email, [userDataGet?.email]: {} },
    };
  }

  const [updateNotifSettingsApiLoading, setUpdateNotifSettingsApiLoading] = useState(false);
  const [recipients, setRecipients] = useState([]); // Populates as: [{ firstName:'...', channel:'...', RecipientAddress:'...', timing:'...', time:'...' }, ...]
  const [newRecipient, setNewRecipient] = useState({});
  const [triggerApiUpdate, setTriggerApiUpdate] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [editingRecipientIndex, setEditingRecipientIndex] = useState(null);

  const categoryOptions = [
    { value:'CLEANLINESS', label:'Cleanliness' },
    { value:'MAINTENANCE', label:'Maintenance' },
    { value:'RESERVATION CHANGES', label:'Reservation Changes' },
    { value:'GUEST REQUESTS', label:'Guest Requests' },
    { value:'OTHER', label:'Other' }
  ];

  const propertyOptions = propertyNamesList.map((property) => ({ value:property, label:property }));

  const consent_bad = newRecipient.channel === "sms" && !newRecipient.consent_checked;

  const callUpdateNotifSettingsApiNew = async (settingsData) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { ...settingsData };
    setUpdateNotifSettingsApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }, // don't throw an error for non-2xx responses
      };

      const response = await axios.put( `${baseUrl}/set_notifications_settings`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.status;
    } catch (error) {
      ToastHandle(error, "danger");
    } finally {
      setUpdateNotifSettingsApiLoading(false);
    }
  };

  // For the NEW logic. Old logic uses the notification settings in the user data
  const callGetNotificationSettingsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }, // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_notification_settings`, config);

      if (response.status === 200) {
        // Map API field names to component field names
        const mappedSettings = response.data.notification_settings.map(setting => ({
          firstName: setting.name,
          channel: setting.type,
          RecipientAddress: setting.address,
          timing: setting.timing,
          time_of_day: setting.time_of_day,
          categories: setting.categories || [],
          properties: setting.properties || []  // Add properties to mapping
        }));
        setRecipients(mappedSettings);
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
    } catch (error) {
      ToastHandle('An error occurred retrieving your current settings.', "danger");
    }
  };

  const showNewRecipientFields = () => {
    setNewRecipient({ firstName: "", channel: "", RecipientAddress: "", timing: "", time: "", consent_checked: false });
    setSelectedCategories(categoryOptions); // Populate with all category options by default
    setSelectedProperties(propertyOptions); // Populate with all property options by default
    setEditingRecipientIndex(null);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    const updatedNewRecipient = { ...newRecipient, [name]: inputValue };
    setNewRecipient(updatedNewRecipient);
  };

  const handleCategoriesChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
  };

  const updateDataToApiNew = async (data) => {
    // Structure the data to be sent to the API (much simpler)
    // [{'type':'<email_or_sms>', 'name':<firstName>, 'categories':[<category1>, <category2>, ...], 'timing':'<immediate/hourly/daily>', 'time_of_day':'<HH:MM>', ...}, ...]

    const notification_settings = recipients.map(recipient => ({
      for: 'action_items',
      type: recipient.channel,
      name: recipient.firstName,
      categories: recipient.categories || [],
      properties: recipient.properties || [], // Add properties to API payload
      timing: recipient.timing,
      address: recipient.RecipientAddress,
      ...(recipient.timing === 'daily' && { time_of_day: recipient.time || recipient.time_of_day })
    }));

    const apiResponseCode = await callUpdateNotifSettingsApiNew({ notification_settings });

    if (apiResponseCode === 200) {
      callGetNotificationSettingsApi();
    }
  };

  const addRecipient = async () => {
    // Validate that all fields are filled out for each recipient
    if (
      !newRecipient.firstName ||
      !newRecipient.channel ||
      !newRecipient.RecipientAddress ||
      !newRecipient.timing ||
      (newRecipient.timing === "daily" && !newRecipient.time)
    ) {
      ToastHandle("Please fill all fields for recipient", "danger");
      return;
    }

    // Validate categories and properties
    if (!selectedCategories || selectedCategories.length === 0) {
      ToastHandle("Please select at least one category", "danger");
      return;
    }

    if (!selectedProperties || selectedProperties.length === 0) {
      ToastHandle("Please select at least one property", "danger");
      return;
    }

    // Before adding the new recipient, assign categories from selectedCategories
    newRecipient.categories = selectedCategories.map((option) => option.value);
    newRecipient.properties = selectedProperties.map((option) => option.value); // Add properties

    // Convert time field to time_of_day for API consistency
    if (newRecipient.timing === 'daily') {
      newRecipient.time_of_day = newRecipient.time;
    }

    if (editingRecipientIndex !== null) {
      const updatedRecipients = [...recipients];
      updatedRecipients[editingRecipientIndex] = newRecipient;
      setRecipients(updatedRecipients);
      setEditingRecipientIndex(null);
    } else {
      setRecipients([...recipients, newRecipient]);
    }

    // Add the new recipient and clear form fields
    setNewRecipient({});
    setSelectedCategories([]);
    setSelectedProperties([]);
    setTriggerApiUpdate(true);
  };

  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
    setTriggerApiUpdate(true);
  };

  const editRecipient = (index) => {
    const recipientToEdit = recipients[index];
    setNewRecipient(recipientToEdit);
    setSelectedCategories(
      recipientToEdit.categories.map((category) =>
        categoryOptions.find((option) => option.value === category)
      )
    );
    setSelectedProperties(  // Add properties handling for edit
      recipientToEdit.properties?.map((property) =>
        propertyOptions.find((option) => option.value === property)
      ) || propertyOptions
    );
    setEditingRecipientIndex(index);
  };

  function getLabel(channel) {
    switch (channel) {
      case "email": return "Email Address";
      case "sms": return "Phone Number";
      case "slack": return "Slack Channel";
      case "whatsapp": return "WhatsApp Number";
      case "webhook": return "Webhook URL";
      default: return "Contact Information";
    }
  }

  const renderOptions = () => {
    if (newRecipient.channel === "email") {
      return Object.keys(user_contact_options.email).map((email_addr) => (
        <option key={email_addr} value={email_addr}>
          {email_addr}
        </option>
      ));
    } else if (newRecipient.channel === "sms") {
      return Object.keys(user_contact_options.sms).map((phone_num) => (
        <option key={phone_num} value={phone_num}>
          {phone_num}
        </option>
      ));
    } else if (newRecipient.channel === "slack") {
      return Object.keys(user_contact_options.slack).map((slack_id) => {
        const channel_name = user_contact_options.slack[slack_id].channel;
        return (
          <option
            key={slack_id}
            value={slack_id}
          >{`${slack_id} ${channel_name}`}</option>
        );
      });
    } else if (newRecipient.channel === "whatsapp") {
      return Object.keys(user_contact_options.whatsapp).map((phone_num) => (
        <option key={phone_num} value={phone_num}>
          {phone_num}
        </option>
      ));
    } else if (newRecipient.channel === "webhook") {
      return Object.keys(user_contact_options.webhook).map((webhook_url) => (
        <option key={webhook_url} value={webhook_url}>
          {webhook_url}
        </option>
      ));
    }
  };

  // When triggerApiUpdate is set, update the data to the API
  useEffect(() => {
    if (triggerApiUpdate) {
      updateDataToApiNew();
      setTriggerApiUpdate(false);
    }
  }, [triggerApiUpdate]);

  // Fetch user data on page load, to populate "userDataGet"
  useEffect(() => {
    dispatch(getUserDataActions(false));
    callGetNotificationSettingsApi();
  }, []);

  /*
  // When the user's email address is populated from the API call, re-render the page so the email address select shows the right options
  useEffect(() => {
    if (user_email_addr) { setRecipients([...recipients]); }
  }, [user_email_addr]);
  */

  function convertTimeTo12HourFormat(time) {
    if (!time) { return ""; }
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const convertedHour = hour % 12 || 12;

    return `${convertedHour}:${minutes.padStart(2, "0")} ${ampm}`;
  }

  return (
    <div className="account-content location-section">
      <h3 className="mb-4">Notification Settings</h3>
      <p style={{ marginLeft: "10px" }} className="fs-14">
        If your contact information is not showing up here, add it in the "Contact" section and make sure it is confirmed.
      </p>
      {!time_zone_name && (
        <p className="fs-14" style={{ marginLeft: "10px" }}>
          <span className="warning-text">You have not set a time zone for your account.</span> Set your time zone in "Region" Settings in order to use daily notifications.
        </p>
      )}

      <form action="">
        <hr className="in-section-divider" />
        <h5 className="mb-2">Action Items</h5>
        <p style={{ marginLeft: "10px" }} className="fs-14">Get notifications when HostBuddy detects a new action item for the host in a guest conversation. Receive your notifications immediately, or get them all at the end of the hour, or at a certain time each day.</p>

        {recipients.length === 0 && (
          <p style={{ marginLeft: "10px" }} className="fs-14">
            <span className="grey-text">No recipients added. This notification will not be sent.</span>
          </p>
        )}
        <table className="table">
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={index}>
                <td><h6 className="fs-14">{recipient.firstName}</h6></td>
                <td><h6 className="fs-14">{recipient.channel}</h6></td>
                <td><h6 className="fs-14">{recipient.RecipientAddress}</h6></td>
                <td>
                  <h6 className="fs-14">
                    {recipient.timing === "daily" ? `${recipient.timing}, ${convertTimeTo12HourFormat(recipient.time_of_day)}` : recipient.timing}
                  </h6>
                </td>
                <td>
                  <h6 className="fs-14">
                    {recipient.categories.length ? (
                      <span data-tooltip-id={`categories-tooltip-${index}`} data-tooltip-content={recipient.categories.join(", ")}>
                        {`${recipient.categories.length} categories`}
                      </span>
                    ) : (
                      "All categories"
                    )}
                  </h6>
                  <Tooltip id={`categories-tooltip-${index}`} place="top" effect="solid" />
                </td>
                <td>
                  <h6 className="fs-14">
                    {recipient.properties?.length ? (
                      <span data-tooltip-id={`properties-tooltip-${index}`} data-tooltip-content={recipient.properties.join(", ")}>
                        {`${recipient.properties.length} properties`}
                      </span>
                    ) : (
                      "All properties"
                    )}
                  </h6>
                  <Tooltip id={`properties-tooltip-${index}`} place="top" effect="solid" />
                </td>
                <td>
                  <div style={{ display:'flex', alignItems:'center' }}>
                    <h6 style={{marginRight:'10px'}} className="clickable-text fs-14" onClick={() => editRecipient(index)}>
                      Edit
                    </h6>
                    <h6 style={{color:'red'}} className="clickable-text fs-14" onClick={() => removeRecipient(index)}>
                      Remove
                    </h6>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {Object.keys(newRecipient || {}).length > 0 && (
          <div className="recipient fs-14" key="recipientInput">
            <div className="row">
              <div className="col input_group">
                <label htmlFor="FirstName">Recipient First Name</label>
                <input type="text" id="FirstName" name="firstName" className="form-control" value={newRecipient.firstName} onChange={(e) => handleInputChange(e)}/>
              </div>

              <div className="col input_group">
                <label htmlFor="Channel">Channel</label>
                <select id="Channel" name="channel" className="form-control" value={newRecipient.channel} onChange={(e) => handleInputChange(e)}>
                  <option value="">-- Please select --</option>
                  <option value="email">Email</option>
                  <option value="sms">Text message (SMS)</option>
                  <option value="slack">Slack</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="webhook">Webhook</option>
                </select>
              </div>

              {newRecipient.channel && (
                <div className="col input_group">
                  <label htmlFor="RecipientAddress">
                    {getLabel(newRecipient.channel)}
                  </label>
                  <select id={"RecipientAddress"} name="RecipientAddress" className="form-control" value={newRecipient.RecipientAddress} onChange={(e) => handleInputChange(e)}>
                    <option value="">-- Please select --</option>
                    {renderOptions()}
                  </select>
                </div>
              )}
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col input_group">
                <label htmlFor="Timing">Timing</label>
                <select id="Timing" name="timing" className="form-control" value={newRecipient.timing} onChange={(e) => handleInputChange(e)}>
                  <option value="">-- Please select --</option>
                  <option value="immediate">Immediate</option>
                  <option value="hourly">Hourly</option>
                  <option value="daily" disabled={!time_zone_name}>
                    Daily
                  </option>
                </select>
              </div>
              <div className="col input_group">
                <label htmlFor={"Time"}>Receive Notification At:</label>
                {newRecipient.timing === "daily" ? (
                  <input type="time" id="Time" name="time" className="form-control" value={newRecipient.time} onChange={(e) => handleInputChange(e)}/>
                ) : (
                  <input type="text" id="Time" name="time" className="form-control disabled-input" value={newRecipient.timing === "hourly" ? "Hourly, On The Hour" : newRecipient.timing === "immediate" ? "Immediately" : "[Please select Timing first]"} disabled/>
                )}
              </div>
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col input_group">
                <label htmlFor="Categories" >Categories</label>
                <MultiSelect id="Categories" options={categoryOptions} selectedOptions={selectedCategories} setSelectedOptions={setSelectedCategories} placeholder="Select categories..."/>
              </div>

              <div className="col input_group">
                <label htmlFor="Properties" >Properties</label>
                <MultiSelect id="Properties" options={propertyOptions} selectedOptions={selectedProperties} setSelectedOptions={setSelectedProperties} placeholder="Select properties..."/>
              </div>
            </div>

            {newRecipient.channel === "sms" && (
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="checkbox-container">
                  <input className="form-check-input" type="checkbox" id="Consent" name="consent_checked" value={newRecipient.consent_checked} onChange={(e) => handleInputChange(e)} style={{ width: "32px" }}/>
                  <label htmlFor={"Consent"}>I consent to receiving account notifications for "Action Items" via text message (SMS), at the selected phone number, at the specified timing.</label>
                </div>
              </div>
            )}

            <span className="d-flex justify-content-center">
              <Link to="#" className="text-link"
                style={{ marginTop: "20px", textAlign: "center", pointerEvents: consent_bad ? "none" : "auto", opacity: consent_bad ? "0.5" : "1" }}
                onClick={() => {
                  if (!consent_bad) { addRecipient(); }
                }}
              >
                {editingRecipientIndex !== null ? "Update" : "Submit"}
              </Link>
            </span>
          </div>
        )}

        {Object.keys(newRecipient || {}).length === 0 && (
          <span className="d-flex justify-content-center" style={{ marginTop: "20px", marginBottom: "20px" }}>
            <Link to="#" className="text-link" onClick={showNewRecipientFields}>
              {recipients.length === 0 ? "+ Add A Notifications Recipient" : "+ Add Another Recipient"}
            </Link>
          </span>
        )}
      </form>
    </div>
  );
};

export default AccountNotificationSection;