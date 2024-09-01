import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./account.css";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";
import { set } from "react-hook-form";

// Location & Time Zone Section of account page
const AccountNotificationSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const allPropertyName =
    createPropertiesName !== undefined ? createPropertiesName : [];
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const time_zone_name = userDataGet?.user_region?.time_zone_name;

  // Initialize user_contact_options with all possible contact channels set to empty objects
  let all_possible_contact_channels = ["email", "sms", "slack"];
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
            if (!("last_confirmation_sent" in value2)) {
              // contact is defined to be confirmed if and only if this key is not present
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

  const [updateNotifSettingsApi, setUpdateNotifSettingsApi] = useState(false);
  const [recipients, setRecipients] = useState([]); // Populates as: [{ firstName:'...', channel:'...', RecipientAddress:'...', timing:'...', time:'...' }, ...]
  const [newRecipient, setNewRecipient] = useState({});
  const [triggerApiUpdate, setTriggerApiUpdate] = useState(false);

  const consent_bad =
    newRecipient.channel === "sms" && !newRecipient.consent_checked;

  const callUpdateNotifSettingsApi = async (settingsData) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { ...settingsData };
    setUpdateNotifSettingsApi(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }, // don't throw an error for non-2xx responses
      };

      const response = await axios.put(
        `${baseUrl}/set_notification_settings`,
        dataToSend,
        config
      );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      setUpdateNotifSettingsApi(false);
      return response.status;
    } catch (error) {
      ToastHandle(error, "danger");
    } finally {
      setUpdateNotifSettingsApi(false);
    }
  };

  const showNewRecipientFields = () => {
    setNewRecipient({
      firstName: "",
      channel: "",
      RecipientAddress: "",
      timing: "",
      time: "",
      consent_checked: false,
    });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    const updatedNewRecipient = { ...newRecipient, [name]: inputValue };
    setNewRecipient(updatedNewRecipient);
  };

  const updateDataToApi = async (data) => {
    // Structure the data to be sent to the API
    // {'notification_settings': { 'action_items': {
    //      'immediate': {<email_or_sms#>: {'type':'<email_or_sms>', 'name':<firstName>}, ...},
    //      'hourly': {<email_or_sms#>: {'type':'<email_or_sms>', 'name':<firstName>}, ...},
    //      'daily': {<email_or_sms#>: {'type':'<email_or_sms>', 'time_of_day':'<HH:MM>', 'name':<firstName>}, ...} }}}
    let notificationSettings = {
      notification_settings: {
        action_items: {
          immediate: {},
          hourly: {},
          daily: {},
        },
      },
    };
    recipients.forEach((recipient, index) => {
      let recipientData = {
        type: recipient.channel,
        name: recipient.firstName,
      };
      if (recipient.timing === "daily") {
        recipientData["time_of_day"] = recipient.time;
      }
      notificationSettings.notification_settings.action_items[recipient.timing][
        recipient.RecipientAddress
      ] = recipientData;
    });

    // Call the API to update the notification settings
    const apiResponseCode = await callUpdateNotifSettingsApi(
      notificationSettings
    );
    if (apiResponseCode === 200) {
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions()); // Update our record of user data with the new region data we just added to the database
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

    // Add the new recipient, and clear the new recipient form fields
    setRecipients([...recipients, newRecipient]);
    setNewRecipient({});

    // Update to API
    setTriggerApiUpdate(true);
  };

  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
    setTriggerApiUpdate(true);
  };

  function getLabel(channel) {
    switch (channel) {
      case "email":
        return "Email Address";
      case "sms":
        return "Phone Number";
      case "slack":
        return "Slack Channel";
      default:
        return "Contact Information";
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
    }
  };

  // When triggerApiUpdate is set, update the data to the API
  useEffect(() => {
    if (triggerApiUpdate) {
      updateDataToApi();
      setTriggerApiUpdate(false);
    }
  }, [triggerApiUpdate]);

  // Fetch user data on page load, to populate "userDataGet"
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  // when userDataGet populates, update the state of the form fields and the phone/email options
  useEffect(() => {
    // Update the state of the form fields
    if (userDataGet?.notification_settings) {
      let newRecipients = [];
      const actionItems = userDataGet.notification_settings?.action_items;
      if (actionItems) {
        for (let timing in actionItems) {
          for (let recipient in actionItems[timing]) {
            let newRecipient = {
              firstName: actionItems[timing][recipient].name,
              channel: actionItems[timing][recipient].type,
              RecipientAddress: recipient,
              timing: timing,
              time: actionItems[timing][recipient].time_of_day
                ? actionItems[timing][recipient].time_of_day
                : "",
            };
            newRecipients.push(newRecipient);
          }
        }
        setRecipients(newRecipients);
      }
    }
  }, [userDataGet]);

  /*
  // When the user's email address is populated from the API call, re-render the page so the email address select shows the right options
  useEffect(() => {
    if (user_email_addr) { setRecipients([...recipients]); }
  }, [user_email_addr]);
  */

  function convertTimeTo12HourFormat(time) {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const convertedHour = hour % 12 || 12;

    return `${convertedHour}:${minutes.padStart(2, "0")} ${ampm}`;
  }
  // category section

  const categorySection = [
    "Maintenance",
    "Guest",
    "Requests",
    "Cleanliness",
    "Reservation Changes",
  ];

  // category section

  // property search handle
  const [dropDownSearch, setDropDownSearch] = useState("");

  const categoryGetSearchFun = categorySection?.filter((category) => {
    const inputValue = dropDownSearch.toLowerCase();
    return category.toLowerCase().includes(inputValue);
  });
  const propertyGetSearchFun = allPropertyName?.filter((propertyName) => {
    const inputValue = dropDownSearch.toLowerCase();
    return propertyName.toLowerCase().includes(inputValue);
  });

  // property search handle
  const [dropDownShow, setDropDownShow] = useState({
    inputArow: false,
    categoryShow: false,
  });

  useEffect(() => {
    dispatch(getUserDataActions());
    // dispatch(getActionItemsActions());
  }, []);

  return (
    <div className="account-content location-section">
      <h3 className="mb-4">Notification Settings</h3>
      <p style={{ marginLeft: "10px" }} className="fs-14">
        If your contact information is not showing up here, add it in the
        "Contact" section and make sure it is confirmed.
      </p>
      {!time_zone_name && (
        <p className="fs-14" style={{ marginLeft: "10px" }}>
          <span className="warning-text">
            You have not set a time zone for your account.
          </span>{" "}
          Set your time zone in "Region" Settings in order to use daily
          notifications.
        </p>
      )}

      <form action="">
        <hr className="in-section-divider" />
        <h5 className="mb-2">Action Items</h5>
        <p style={{ marginLeft: "10px" }} className="fs-14">
          Get notifications when HostBuddy detects a new action item for the
          host in a guest conversation. Receive your notifications immediately,
          or get them all at the end of the hour, or at a certain time each day.
        </p>

        {recipients.length === 0 && (
          <p style={{ marginLeft: "10px" }} className="fs-14">
            <span className="grey-text">
              No recipients added. This notification will not be sent.
            </span>
          </p>
        )}
        <table className="table">
          <tbody>
            {recipients.map((recipient, index) => (
              <tr key={index}>
                <td>
                  <h6 className="fs-14">{recipient.firstName}</h6>
                </td>
                <td>
                  <h6 className="fs-14">{recipient.channel}</h6>
                </td>
                <td>
                  <h6 className="fs-14">{recipient.RecipientAddress}</h6>
                </td>
                <td>
                  <h6 className="fs-14">
                    {recipient.timing === "daily"
                      ? `${recipient.timing}, ${convertTimeTo12HourFormat(
                          recipient.time
                        )}`
                      : recipient.timing}
                  </h6>
                </td>
                <td>
                  <h6
                    style={{ color: "red" }}
                    className="clickable-text fs-14"
                    onClick={() => removeRecipient(index)}
                  >
                    Remove
                  </h6>
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
                <input
                  type="text"
                  id="FirstName"
                  name="firstName"
                  className="form-control"
                  value={newRecipient.firstName}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>

              <div className="col input_group">
                <label htmlFor={"Channel"}>Channel</label>
                <select
                  id={"Channel"}
                  name="channel"
                  className="form-control"
                  value={newRecipient.channel}
                  onChange={(e) => handleInputChange(e)}
                >
                  <option value="">-- Please select --</option>
                  <option value="email">Email</option>
                  <option value="sms">Text message (SMS)</option>
                  <option value="slack">Slack</option>
                </select>
              </div>

              {newRecipient.channel && (
                <div className="col input_group">
                  <label htmlFor={"RecipientAddress"}>
                    {getLabel(newRecipient.channel)}
                  </label>
                  <select
                    id={"RecipientAddress"}
                    name="RecipientAddress"
                    className="form-control"
                    value={newRecipient.RecipientAddress}
                    onChange={(e) => handleInputChange(e)}
                  >
                    <option value="">-- Please select --</option>
                    {renderOptions()}
                  </select>
                </div>
              )}
            </div>

            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col input_group">
                <label htmlFor={"Timing"}>Timing</label>
                <select
                  id={"Timing"}
                  name="timing"
                  className="form-control"
                  value={newRecipient.timing}
                  onChange={(e) => handleInputChange(e)}
                >
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
                  <input
                    type="time"
                    id={"Time"}
                    name="time"
                    className="form-control"
                    value={newRecipient.time}
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <input
                    type="text"
                    id={"Time"}
                    name="time"
                    className="form-control disabled-input"
                    value={
                      newRecipient.timing === "hourly"
                        ? "Hourly, On The Hour"
                        : newRecipient.timing === "immediate"
                        ? "Immediately"
                        : "[Please select Timing first]"
                    }
                    disabled
                  />
                )}
              </div>
            </div>
            <div className="row" style={{ marginTop: "20px" }}>
              <div className="col multiselector item-select">
                <div className="multiinputfirst">
                  <input
                    type="text"
                    value="Properties"
                    onClick={() =>
                      setDropDownShow({ inputArow: !dropDownShow?.inputArow })
                    }
                  />
                  <div
                    className="pro-icon1"
                    onClick={() =>
                      setDropDownShow({ inputArow: !dropDownShow?.inputArow })
                    }
                  >
                    {dropDownShow?.inputArow ? (
                      <i class="bi bi-x-lg"></i>
                    ) : (
                      <i class="bi bi-chevron-down"></i>
                    )}
                  </div>
                </div>
                {dropDownShow?.inputArow && (
                  <>
                    <div className="search-option">
                      <div className="search-multi">
                        <input
                          type="search"
                          id="multi-search"
                          onChange={(e) => setDropDownSearch(e.target.value)}
                        />
                        <div className="search-icon">
                          <i class="bi bi-search"></i>
                        </div>
                      </div>
                      <div className="multioption">
                        <ul>
                          <ul>
                            {propertyGetSearchFun?.map((property) => {
                              return (
                                <li>
                                  <input type="checkbox" />
                                  {property}
                                </li>
                              );
                            })}
                          </ul>
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col multiselector item-select">
                <div className="multiinputfirst">
                  <input
                    type="text"
                    value="Category"
                    onClick={() =>
                      setDropDownShow({
                        categoryShow: !dropDownShow?.categoryShow,
                      })
                    }
                  />
                  <div
                    className="pro-icon1"
                    onClick={() =>
                      setDropDownShow({
                        categoryShow: !dropDownShow?.categoryShow,
                      })
                    }
                  >
                    {dropDownShow?.categoryShow ? (
                      <i class="bi bi-x-lg"></i>
                    ) : (
                      <i class="bi bi-chevron-down"></i>
                    )}
                  </div>
                </div>
                {dropDownShow?.categoryShow && (
                  <>
                    <div className="search-option">
                      <div className="search-multi">
                        <input
                          type="search"
                          id="multi-search"
                          onChange={(e) => setDropDownSearch(e.target.value)}
                        />
                        <div className="search-icon">
                          <i class="bi bi-search"></i>
                        </div>
                      </div>
                      <div className="multioption">
                        <ul>
                          {categoryGetSearchFun?.map((items) => {
                            return (
                              <li>
                                <input type="checkbox" />
                                {items}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {newRecipient.channel === "sms" && (
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="checkbox-container">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={"Consent"}
                    name="consent_checked"
                    value={newRecipient.consent_checked}
                    onChange={(e) => handleInputChange(e)}
                    style={{ width: "32px" }}
                  />
                  <label htmlFor={"Consent"}>
                    I consent to receiving account notifications for "Action
                    Items" via text message (SMS), at the selected phone number,
                    at the specified timing.
                  </label>
                </div>
              </div>
            )}

            <span className="d-flex justify-content-center">
              <Link
                to="#"
                className="text-link"
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  pointerEvents: consent_bad ? "none" : "auto", // Disables pointer events if consent_checked is false for SMS
                  opacity: consent_bad ? "0.5" : "1", // Change opacity to appear not clickable if consent_checked is false for SMS
                }}
                onClick={() => {
                  if (!consent_bad) {
                    addRecipient();
                  }
                }}
              >
                Submit
              </Link>
            </span>
          </div>
        )}

        {Object.keys(newRecipient || {}).length === 0 && (
          <span
            className="d-flex justify-content-center"
            style={{ marginTop: "20px", marginBottom: "20px" }}
          >
            <Link to="#" className="text-link" onClick={showNewRecipientFields}>
              {recipients.length === 0
                ? "+ Add A Notifications Recipient"
                : "+ Add Another Recipient"}
            </Link>
          </span>
        )}
      </form>
    </div>
  );
};

export default AccountNotificationSection;
