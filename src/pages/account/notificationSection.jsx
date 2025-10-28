import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./account.css";
import "./notifications.css";
import ToastHandle from "../../helper/ToastMessage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, stateEmptyActions } from "../../redux/actions";
import { Tooltip } from "react-tooltip";
import { getSubscriptionStatus } from "../../helper/Authorized";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

import MultiSelect from "../../component/multiSelect/multiSelect";
import MultiCategorySelect, { fetchCategoriesFromAPI } from "../../component/multiSelect/actionItemCategoriesMultiSelect";

// Icon Components
const BellIcon = () => (
  <svg className="notifications-bell-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const UserPlusIcon = () => (
  <svg className="notifications-form-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
  </svg>
);

const Trash2Icon = () => (
  <svg className="notifications-delete-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg className={className || "notifications-dropdown-icon"} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const CheckIcon = () => (
  <svg className="notifications-dropdown-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XIcon = () => (
  <svg className="notifications-tag-remove-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Single Select Dropdown Component
const SingleSelectDropdown = ({ value, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="notifications-dropdown-wrapper">
      {isOpen && <div className="notifications-dropdown-overlay" onClick={() => setIsOpen(false)} />}
      <button
        type="button"
        className={`notifications-dropdown-button ${!value ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDownIcon className={`notifications-dropdown-icon ${isOpen ? 'open' : ''}`} />
      </button>
      {isOpen && (
        <div className="notifications-dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className="notifications-dropdown-item"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              <span>{option.label}</span>
              {value === option.value && <CheckIcon />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Multi Select Dropdown Component
const MultiSelectDropdown = ({ selectedValues, onChange, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const allSelected = selectedValues.length === options.length && options.length > 0;

  const handleToggleItem = (value) => {
    const isSelected = selectedValues.some(v => v.value === value);
    if (isSelected) {
      onChange(selectedValues.filter(v => v.value !== value));
    } else {
      const option = options.find(opt => opt.value === value);
      if (option) {
        onChange([...selectedValues, option]);
      }
    }
  };

  const handleSelectAll = () => {
    if (allSelected) {
      onChange([]);
    } else {
      onChange(options);
    }
  };

  const handleRemoveTag = (e, value) => {
    e.stopPropagation();
    onChange(selectedValues.filter(v => v.value !== value));
  };

  return (
    <div className="notifications-dropdown-wrapper">
      {isOpen && <div className="notifications-dropdown-overlay" onClick={() => setIsOpen(false)} />}
      <div
        className={`notifications-multiselect-tags ${selectedValues.length === 0 ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length === 0 ? (
          <span>{placeholder}</span>
        ) : (
          selectedValues.map((item) => (
            <div key={item.value} className="notifications-tag-chip">
              <span>{item.label}</span>
              <button
                type="button"
                className="notifications-tag-remove"
                onClick={(e) => handleRemoveTag(e, item.value)}
              >
                <XIcon />
              </button>
            </div>
          ))
        )}
      </div>
      {isOpen && (
        <div className="notifications-multiselect-menu">
          <div className="notifications-multiselect-select-all" onClick={handleSelectAll}>
            {allSelected ? 'Deselect All' : 'Select All'}
          </div>
          {options.map((option) => {
            const isSelected = selectedValues.some(v => v.value === option.value);
            return (
              <div
                key={option.value}
                className="notifications-multiselect-item"
                onClick={() => handleToggleItem(option.value)}
              >
                <div className={`notifications-multiselect-checkbox ${isSelected ? 'checked' : ''}`}>
                  {isSelected && <CheckIcon />}
                </div>
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Location & Time Zone Section of account page
const AccountNotificationSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const propertyNamesList = Object.keys(userDataGet?.property_data || {});

  // White label CSS context for dynamic styling
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();

  // Define categoryNamesList and categoryOptions
  const categoryNamesList = Object.keys(userDataGet?.category_data || {});
  const categoryOptions = categoryNamesList.map((category) => ({ value: category, label: category }));

  const time_zone_name = userDataGet?.user_region?.time_zone_name;

  // Get user subscription plan
  const subscriptionPlan = getSubscriptionStatus(userDataGet).plan || '';
  const isMountPlan = subscriptionPlan?.toLowerCase().includes("mount");

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

  const propertyOptions = propertyNamesList.map((property) => ({ value: property, label: property }));

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

      const response = await axios.put(`${baseUrl}/set_notifications_settings`, dataToSend, config);

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

    if (!isMountPlan) {
      // Use available categories in this priority: 1) categoryOptions, 2) apiCategories
      if (categoryOptions && categoryOptions.length > 0) {
        setSelectedCategories(categoryOptions); // Use categories from Redux
      } else if (apiCategories.length > 0) {
        setSelectedCategories(apiCategories); // Use categories from API
      } else {
        // If no categories available yet, fetch them
        fetchCategoriesIfNeeded();
        setSelectedCategories([]);
      }
    } else {
      setSelectedCategories([]);
    }

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
    if (!isMountPlan && (!selectedCategories || selectedCategories.length === 0)) {
      ToastHandle("Please select at least one category", "danger");
      return;
    }

    if (!selectedProperties || selectedProperties.length === 0) {
      ToastHandle("Please select at least one property", "danger");
      return;
    }

    // Before adding the new recipient, assign categories from selectedCategories
    if (!isMountPlan) {
      newRecipient.categories = selectedCategories.map((option) => option.value);
    } else {
      newRecipient.categories = []; // Set empty array for Mount plan
    }
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

    if (!isMountPlan) {
      // Handle categories based on availability
      if (recipientToEdit.categories && recipientToEdit.categories.length > 0) {
        // Use the categories from the recipient
        setSelectedCategories(
          recipientToEdit.categories.map((category) => ({
            value: category,
            label: category
          }))
        );
      } else {
        // For null/empty categories, leave selection empty
        setSelectedCategories([]);
      }
    } else {
      setSelectedCategories([]);
    }

    setSelectedProperties(
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

  // Add state to track whether categories have been fetched from API
  const [apiCategories, setApiCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(false);

  // Fetch categories from API if needed
  const fetchCategoriesIfNeeded = async () => {
    if (fetchingCategories || apiCategories.length > 0 || (categoryOptions && categoryOptions.length > 0)) {
      return;
    }

    setFetchingCategories(true);
    try {
      const categories = await fetchCategoriesFromAPI();
      if (categories && categories.length > 0) {
        const formattedCategories = categories.map(cat => ({
          value: cat.name,
          label: cat.name
        }));
        setApiCategories(formattedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setFetchingCategories(false);
    }
  };

  // Load categories on component mount
  useEffect(() => {
    fetchCategoriesIfNeeded();
  }, []);

  // When categories are loaded from API, automatically select them all if creating a new recipient
  useEffect(() => {
    if (!isMountPlan &&
      apiCategories.length > 0 &&
      Object.keys(newRecipient).length > 0 &&
      selectedCategories.length === 0 &&
      editingRecipientIndex === null) { // Only auto-select for new recipients, not when editing
      setSelectedCategories(apiCategories);
    }
  }, [apiCategories, newRecipient, isMountPlan, editingRecipientIndex]);

  return (
    <div className="notifications-container">
      {/* Page Header */}
      <div className="notifications-page-header">
        <BellIcon />
        <h1 className="notifications-page-title">Notification Settings</h1>
      </div>

      {/* Info Banner */}
      <div className="notifications-info-banner">
        <span className="notifications-info-banner-icon">💡</span>
        <p className="notifications-info-banner-text">
          If your contact information is not showing up here, add it in the{" "}
          <Link to="/setting/contact" className="notifications-info-banner-link">
            Contact
          </Link>{" "}
          section and make sure it is confirmed.
        </p>
      </div>

      {/* Time Zone Warning */}
      {!time_zone_name && (
        <div className="notifications-info-banner" style={{ borderColor: '#f87171' }}>
          <span className="notifications-info-banner-icon">⚠️</span>
          <p className="notifications-info-banner-text">
            <span className="notifications-warning-text">You have not set a time zone for your account.</span> Set your time zone in "Region" Settings in order to use daily notifications.
          </p>
        </div>
      )}

      {/* Action Items Section */}
      <div className="notifications-section">
        <h2 className="notifications-section-title">Action Items</h2>
        <p className="notifications-section-description">
          Get notifications when HostBuddy detects a new action item for the host in a guest conversation. Receive your notifications immediately, or get them all at the end of the hour, or at a certain time each day.
        </p>

        {/* Empty State */}
        {recipients.length === 0 && Object.keys(newRecipient || {}).length === 0 && (
          <p className="notifications-empty-state">
            No recipients added. This notification will not be sent.
          </p>
        )}

        {/* Recipients Table */}
        {recipients.length > 0 && (
          <div className="notifications-table-container">
            <table className="notifications-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Method</th>
                  <th>Contact</th>
                  <th>Timing</th>
                  <th>Categories</th>
                  <th>Properties</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient, index) => (
                  <tr key={index}>
                    <td className="notifications-table-name">{recipient.firstName}</td>
                    <td>
                      <span className="notifications-method-badge">
                        {recipient.channel}
                      </span>
                    </td>
                    <td className="notifications-table-secondary">{recipient.RecipientAddress}</td>
                    <td className="notifications-table-name">
                      {recipient.timing === "daily"
                        ? `${recipient.timing}, ${convertTimeTo12HourFormat(recipient.time_of_day)}`
                        : recipient.timing}
                    </td>
                    <td className="notifications-table-secondary">
                      {recipient.categories && recipient.categories.length > 0 ? (
                        <span
                          className="notifications-tooltip-trigger"
                          data-tooltip-id={`categories-tooltip-${index}`}
                          data-tooltip-content={recipient.categories.join(", ")}
                        >
                          {`${recipient.categories.length} categories`}
                        </span>
                      ) : (
                        "All categories"
                      )}
                      <Tooltip id={`categories-tooltip-${index}`} place="top" effect="solid" />
                    </td>
                    <td className="notifications-table-secondary">
                      {recipient.properties && recipient.properties.length > 0 ? (
                        <span
                          className="notifications-tooltip-trigger"
                          data-tooltip-id={`properties-tooltip-${index}`}
                          data-tooltip-content={recipient.properties.join(", ")}
                        >
                          {`${recipient.properties.length} properties`}
                        </span>
                      ) : (
                        "All properties"
                      )}
                      <Tooltip id={`properties-tooltip-${index}`} place="top" effect="solid" />
                    </td>
                    <td>
                      <div className="notifications-manage-actions">
                        <button
                          type="button"
                          className="notifications-delete-btn"
                          onClick={() => removeRecipient(index)}
                          title="Delete"
                        >
                          <Trash2Icon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add Recipient Button */}
        {Object.keys(newRecipient || {}).length === 0 && (
          <div className="notifications-add-btn-container">
            <button
              type="button"
              className="notifications-add-btn"
              onClick={showNewRecipientFields}
            >
              <UserPlusIcon />
              <span>{recipients.length === 0 ? 'Add Recipient' : 'Add Another Recipient'}</span>
            </button>
          </div>
        )}

        {/* Add Recipient Form */}
        {Object.keys(newRecipient || {}).length > 0 && (
          <div className="notifications-add-form">
            <div className="notifications-form-header">
              <UserPlusIcon />
              <h3 className="notifications-form-title">
                {editingRecipientIndex !== null ? 'Edit Recipient' : 'Add Recipient'}
              </h3>
            </div>

            {/* Recipient Name Input */}
            <div className="notifications-form-grid-full">
              <div className="notifications-input-group">
                <label className="notifications-input-label" htmlFor="firstName">
                  Recipient Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="notifications-input"
                  placeholder="Enter recipient name"
                  value={newRecipient.firstName || ''}
                  onChange={handleInputChange}
                  style={{
                    backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                  }}
                />
              </div>
            </div>

            {/* Channel and Contact Row */}
            <div className="notifications-form-grid">
              <div className="notifications-input-group">
                <label className="notifications-input-label" htmlFor="channel">
                  Channel
                </label>
                <SingleSelectDropdown
                  value={newRecipient.channel || ''}
                  onChange={(value) => handleInputChange({ target: { name: 'channel', value } })}
                  options={[
                    { value: 'email', label: 'Email' },
                    { value: 'sms', label: 'Text message (SMS)' },
                    { value: 'slack', label: 'Slack' },
                    { value: 'whatsapp', label: 'WhatsApp' },
                    { value: 'webhook', label: 'Webhook' }
                  ]}
                  placeholder="Select channel"
                />
              </div>

              {newRecipient.channel && (
                <div className="notifications-input-group">
                  <label className="notifications-input-label" htmlFor="RecipientAddress">
                    {getLabel(newRecipient.channel)}
                  </label>
                  <select
                    id="RecipientAddress"
                    name="RecipientAddress"
                    className="notifications-input"
                    value={newRecipient.RecipientAddress || ''}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                    }}
                  >
                    <option value="">-- Please select --</option>
                    {renderOptions()}
                  </select>
                </div>
              )}
            </div>

            {/* Timing and Time Row */}
            <div className="notifications-form-grid">
              <div className="notifications-input-group">
                <label className="notifications-input-label" htmlFor="timing">
                  Timing
                </label>
                <SingleSelectDropdown
                  value={newRecipient.timing || ''}
                  onChange={(value) => handleInputChange({ target: { name: 'timing', value } })}
                  options={[
                    { value: 'immediate', label: 'Immediate' },
                    { value: 'hourly', label: 'Hourly' },
                    ...(time_zone_name ? [{ value: 'daily', label: 'Daily' }] : [])
                  ]}
                  placeholder="Select timing"
                />
              </div>

              <div className="notifications-input-group">
                <label className="notifications-input-label" htmlFor="time">
                  Receive Notification At
                </label>
                {newRecipient.timing === 'daily' ? (
                  <input
                    type="time"
                    id="time"
                    name="time"
                    className="notifications-input"
                    value={newRecipient.time || ''}
                    onChange={handleInputChange}
                    style={{
                      backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                    }}
                  />
                ) : (
                  <input
                    type="text"
                    id="time"
                    className="notifications-input"
                    value={
                      newRecipient.timing === 'hourly'
                        ? 'Hourly, On The Hour'
                        : newRecipient.timing === 'immediate'
                        ? 'Immediately'
                        : '[Please select Timing first]'
                    }
                    disabled
                    style={{
                      backgroundColor: cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #0F1117)')
                    }}
                  />
                )}
              </div>
            </div>

            {/* Categories and Properties Row */}
            <div className="notifications-form-grid">
              {!isMountPlan && (
                <div className="notifications-input-group">
                  <label className="notifications-input-label" htmlFor="categories">
                    Categories
                  </label>
                  <MultiSelectDropdown
                    selectedValues={selectedCategories}
                    onChange={setSelectedCategories}
                    options={categoryOptions.length > 0 ? categoryOptions : apiCategories}
                    placeholder="Select categories..."
                  />
                </div>
              )}

              <div className="notifications-input-group">
                <label className="notifications-input-label" htmlFor="properties">
                  Properties
                </label>
                <MultiSelectDropdown
                  selectedValues={selectedProperties}
                  onChange={setSelectedProperties}
                  options={propertyOptions}
                  placeholder="Select properties..."
                />
              </div>
            </div>

            {/* SMS Consent Checkbox */}
            {newRecipient.channel === 'sms' && (
              <div className="notifications-consent-container">
                <div className="notifications-consent-checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="consent_checked"
                    name="consent_checked"
                    className="notifications-consent-checkbox-input"
                    checked={newRecipient.consent_checked || false}
                    onChange={handleInputChange}
                  />
                  <div className="notifications-consent-checkbox-custom">
                    <div className="notifications-consent-checkbox-inner"></div>
                  </div>
                </div>
                <label htmlFor="consent_checked" className="notifications-consent-label">
                  I consent to receiving account notifications for "Action Items" via text message (SMS), at the selected phone number, at the specified timing.
                </label>
              </div>
            )}

            {/* Form Actions */}
            <div className="notifications-form-actions">
              <button
                type="button"
                className="notifications-cancel-btn"
                onClick={() => {
                  setNewRecipient({});
                  setSelectedCategories([]);
                  setSelectedProperties([]);
                  setEditingRecipientIndex(null);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="notifications-submit-btn"
                onClick={addRecipient}
                disabled={consent_bad}
              >
                {editingRecipientIndex !== null ? 'Update Recipient' : 'Add Recipient'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountNotificationSection;