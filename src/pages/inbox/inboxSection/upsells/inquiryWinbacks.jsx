import React from "react";
import Select, { components } from 'react-select';
import { Button, Form } from "react-bootstrap";
import customStyles from "../resources/selectStyles";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "../resources/upsells.css";
import { BoxLoader, FullScreenLoader } from "../../../../helper/Loader";
import UpsellMessageModal from "../resources/upsellMessageModal";
import { useWhiteLabelCss } from "../../../../helper/WhiteLabelCssContext";

import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

import { formatDateRange, formatDateTime, truncateString, insertVariableAtCursor, setSetting, callSaveSettingsApi, callCancelMessageApi } from "../resources/upsellsFuncts";

/*
default_settings = {
  'enabled': false,
  'days_after_last_message': 1,
  'hours_after_last_message': 0,
  'upsell_message': "Hi [[guest_name]], we still have availability in [[city]] from [[date_range]]. We'd love to host you!",
}
*/


const InquiryWinbacks = ({setSection, settingsApiData, setSettingsApiData, localSettingsData, setLocalSettingsData, callGetSettingsApi, getSettingsLoading, callGetUpcomingMessagesApi, getUpcomingMessagesLoading, upcomingMessagesData, allPropertyNamesList}) => {

  const { cssConfig, cssLoading } = useWhiteLabelCss();

  const [setSettingsLoading, setSetSettingsLoading] = useState(false);
  const [cancelMessageLoading, setCancelMessageLoading] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config
  const [messageModalHeaderText, setMessageModalHeaderText] = useState("");
  const [messageModalTopText, setMessageModalTopText] = useState("");
  const [messageModalMainText, setMessageModalMainText] = useState("");
  const [statusAndJustificationText, setStatusAndJustificationText] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const currentSettingsData = localSettingsData?.[selectedConfig] || {};
  const setCurrentSettingsData = (newData) => {
    setLocalSettingsData({ ...localSettingsData, [selectedConfig]: newData });
  };

  // Interpret ai_personalization as true if not present
  if (currentSettingsData.ai_personalization === undefined) {
    currentSettingsData.ai_personalization = true;
  }

  const [showPersonalizeCustomize, setShowPersonalizeCustomize] = useState(!!currentSettingsData.ai_personalization_instructions);

  const total_hours_after = parseInt(currentSettingsData?.days_after_last_message || 0) * 24 + parseInt(currentSettingsData?.hours_after_last_message || 0);

  //const variables = {'guest_name':'Guest name', 'price_before_discount':'Price before discount', 'price_after_discount':'Price after discount', 'discount_percentage':'Discount percentage', 'absolute_discount':'Total discount amount', 'num_days_available':'Number of days available'};
  const variables = {'guest_name':'Guest name', 'city':'City', 'date_range':'Inquiry date range', 'property_name':'Property name'};


  const handleReturn = (e) => {
    e.preventDefault();
    setSection("index");
  }

  // e.g.: "not_sendable" -> "Not Sendable"
  const readableStatus = (status) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }


  const handleOpenMessageModal = (message) => {
    const headerText = `Message for ${message.guest_first_name} (${formatDateRange(message.guest_check_in, message.guest_check_out)}) at ${formatDateTime(message.time_to_send)}`;
    const newMessageModalContent = message.message
    let first_line = "";

    if ('start_date' in message && 'end_date' in message) { 
      first_line = `At ${message.property_name}, vacant night(s) ${formatDateRange(message.start_date, message.end_date)}`;
    } else {
      first_line = `At ${message.property_name}`;
    }

    if (message?.status && message?.justification) {
      setStatusAndJustificationText(`Status: ${readableStatus(message.status)} - ${message.justification}`);
    } else {
      setStatusAndJustificationText("");
    }

    setMessageModalMainText(newMessageModalContent);
    setMessageModalTopText(first_line);
    setMessageModalHeaderText(headerText);
    setShowMessageModal(true);
  }


  const handleCancelMessage = (message) => {
    const userConfirmed = window.confirm("Are you sure you want to cancel this message?");
    if (userConfirmed) {
      callCancelMessageApi(message.property_name, message.guest_key, 'inquiry_winback', callGetUpcomingMessagesApi, setCancelMessageLoading);
    }
  }


  // On save button click, call the API to save the settings. Once saved, refresh the upcoming messages, regenerated with the new settings
  const handleSaveSettings = async () => {
    await callSaveSettingsApi(localSettingsData, 'inquiry_winback');
    callGetUpcomingMessagesApi(true, 'inquiry_winback');
  }

  const handleConfigSelectChange = (e) => {
    if (e.target.value === "add") {
      const newConfigName = window.prompt("Enter a name for the new config");
      if (newConfigName) {
        setLocalSettingsData({ ...localSettingsData, [newConfigName]:settingsApiData.default }); // warning: this is creating a shallow copy of settingsApiData.default
        setSelectedConfig(newConfigName);
      }
    } else {
      setSelectedConfig(e.target.value);
      const selectedProperties = localSettingsData[e.target.value]?.properties || [];
      const selectedOptions = selectedProperties.map((propertyName) => ({ value: propertyName, label: propertyName }));
      setSelectedOptions(selectedOptions);
    }
  }

  // On page load, call the API to get the settings and any upcoming messages
  useEffect(() => {
    if (Object.keys(settingsApiData).length === 0) {
      callGetSettingsApi('inquiry_winback');
      callGetUpcomingMessagesApi(false, 'inquiry_winback');
    }
  }, []);


  // ------- Property multi select -------
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selectRef = useRef(null);

  const options = allPropertyNamesList.map((propertyName) => ({ value: propertyName, label: propertyName }));

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
    if (selectedConfig !== "default") { // should always be true, but just to be sure
      const selectedProperties = selected.map((property) => property.value);
      const newSettings = { ...localSettingsData[selectedConfig], properties:selectedProperties };
      setCurrentSettingsData(newSettings);
    }
  };

  // Custom ValueContainer to display the number of selected properties
  const ValueContainer = ({ children, ...props }) => {
    const { getValue, selectProps } = props;
    const selectedValues = getValue();
    const displayText = selectedValues.length > 0 ? `${selectedValues.length} propert${selectedValues.length === 1 ? 'y' : 'ies'}` : '';

    return (
      <components.ValueContainer {...props}>
        <div>{displayText}</div>
        {children}
      </components.ValueContainer>
    );
  };

  // Handle clicks outside the select component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setMenuIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectRef]);

  const handleMouseDown = (event) => {
    if (selectRef.current && selectRef.current.contains(event.target)) {
      setMenuIsOpen(true);
    }
  };

  const handleMouseUp = (event) => {
    if (selectRef.current && selectRef.current.contains(event.target)) {
      setMenuIsOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  // -------------------------------------



  return (
    <div className="upsells-settings">
      {getSettingsLoading ? <FullScreenLoader /> : null}
      
      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-start justify-content-between">
        <div>
          <h3>Inquiry Follow-Ups</h3>
          {/* <a href="#" onClick={handleReturn} style={{ display:'inline-block', marginTop:"20px" }}>&lt; Upsells</a> */}
        </div>
        <div>
          <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
            <Button 
              className="text-nowrap fs-14" 
              style={{
                backgroundColor: '#3e88f7',
                borderColor: '#3e88f7',
                borderRadius: '5px',
                borderWidth: '1px',
                borderStyle: 'solid',
                padding: '8px 24px'
              }}
              onClick={handleSaveSettings} 
              disabled={Object.keys(settingsApiData).length === 0}
            >
              Save Upsell
            </Button>
            <Button 
              className="text-nowrap fs-14" 
              style={{
                backgroundColor: '#0F1117',
                borderColor: '#013280',
                borderRadius: '5px',
                borderWidth: '1px',
                borderStyle: 'solid',
                padding: '8px 24px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                fontVariationSettings: "'opsz' 14"
              }}
              onClick={() => setSection('index')}
            >
              Back
            </Button>
            <Select
              className="text-white shadow-none fs-14 mb-3 mb-md-0"
              value={
                selectedConfig === "add"
                  ? { value: "add", label: "+ New Configuration" }
                  : { value: selectedConfig, label: selectedConfig }
              }
              onChange={(selectedOption) => {
                if (selectedOption.value === "add") {
                  setMessageModalHeaderText("Add new configuration");
                  setMessageModalTopText("Create a new configuration with unique settings for different property groups or scenarios");
                  setMessageModalMainText("");
                  setShowMessageModal(true);
                  setStatusAndJustificationText("Please provide a name for the new configuration");
                } else {
                  setSelectedConfig(selectedOption.value);
                }
              }}
              options={[
                ...Object.keys(localSettingsData).map((key) => ({
                  value: key,
                  label: key,
                })),
                { value: "add", label: "+ New Configuration" },
              ]}
              styles={{
                control: (base, state) => ({
                  ...base,
                  backgroundColor: cssLoading ? "#0F1117" : cssConfig?.css_data?.background?.dropdown || "#0F1117",
                  borderColor: '#013280',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: '8px',
                  padding: '2px 16px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  fontWeight: '600',
                  fontVariationSettings: "'opsz' 14",
                  minWidth: '140px',
                  cursor: 'pointer',
                  boxShadow: 'none',
                  '&:hover': {
                    borderColor: '#013280',
                  },
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: cssLoading ? "#0F1117" : cssConfig?.css_data?.background?.dropdown || "#0F1117",
                  borderColor: '#013280',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  borderRadius: '8px',
                  marginTop: '4px',
                }),
                menuList: (base) => ({
                  ...base,
                  padding: '4px',
                }),
                option: (base, state) => ({
                  ...base,
                  backgroundColor: state.isFocused || state.isSelected
                    ? (cssLoading ? "#01255e" : cssConfig?.css_data?.background?.hover || "#01255e")
                    : 'transparent',
                  color: '#fff',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  '&:hover': {
                    backgroundColor: cssLoading ? "#01255e" : cssConfig?.css_data?.background?.hover || "#01255e",
                  },
                }),
                singleValue: (base) => ({
                  ...base,
                  color: '#fff',
                  textTransform: 'capitalize',
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: '#fff',
                }),
                indicatorSeparator: () => ({
                  display: 'none',
                }),
              }}
            />
          </div>

          <div style={{marginTop:"10px"}}>
            {selectedConfig === "default" ? (
              <div style={{maxWidth:"400px"}}>
                {/* <p style={{fontSize:"14px", textAlign:"center"}}>This is the default config. It applies to all properties that are not included in any other config.</p> */}
              </div>
            ) : (
              <>
                {/* <p style={{fontSize:"14px", textAlign:"center"}}>Applies to these properties:</p> */}
                <div ref={selectRef}>
                  <Select className="custom-select property_Custom_Select" isMulti options={options} value={selectedOptions} onChange={handleChange} placeholder="Select properties..." components={{ ValueContainer, MultiValueContainer: () => null }} hideSelectedOptions={false} closeMenuOnSelect={false} styles={customStyles} menuIsOpen={menuIsOpen} onMenuOpen={() => setMenuIsOpen(true)} onMenuClose={() => setMenuIsOpen(false)}/>
                </div>
              </>
            )}
          </div>
          
        </div>
      </div>

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <p 
          style={{ 
            color: '#a6a9b2', 
            fontSize: '16px', 
            fontFamily: "'DM Sans', sans-serif", 
            fontWeight: '400',
            lineHeight: '1.6',
            maxWidth: '900px',
            fontVariationSettings: "'opsz' 14"
          }}
        >
          HostBuddy can follow up with guests that inquired about your properties, but didn't book, if those dates are still available. You can choose not to send messages to guests who have given a firm pass on your property.
        </p>
      </div>

      {/* <div style={{width:"90%", margin:"20px auto", textAlign:"center"}}>
        <p className="settings-label">HostBuddy can follow up with guests that inquired about your properties, but didn't book, if those dates are still available. You can choose not to send messages to guests who have given a firm pass on your property.</p>
      </div> */}

      <div style={{ borderTop: '1px solid #013280', marginBottom: '40px' }}></div>

      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <h3 
            style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontFamily: "'DM Sans', sans-serif", 
              fontWeight: '700',
              margin: 0,
              fontVariationSettings: "'opsz' 14"
            }}
          >
            Enable Inquiry Follow-Ups
          </h3>
          <button
            onClick={(e) => {
              e.preventDefault();
              setSetting('enabled', !currentSettingsData.enabled, currentSettingsData, setCurrentSettingsData);
            }}
            style={{
              position: 'relative',
              width: '44px',
              height: '24px',
              borderRadius: '9999px',
              backgroundColor: currentSettingsData.enabled ? '#3e88f7' : '#013280',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              flexShrink: 0
            }}
          >
            <div 
              style={{
                position: 'absolute',
                top: '2px',
                left: currentSettingsData.enabled ? '22px' : '2px',
                width: '20px',
                height: '20px',
                backgroundColor: 'white',
                borderRadius: '50%',
                transition: 'left 0.3s'
              }}
            />
          </button>
        </div>
        <p 
          style={{ 
            fontSize: '14px', 
            fontFamily: "'DM Sans', sans-serif", 
            fontWeight: '400',
            color: currentSettingsData.enabled ? '#4ade80' : '#ef4444',
            margin: 0,
            fontVariationSettings: "'opsz' 14"
          }}
        >
          You currently have inquiry follow-ups {currentSettingsData.enabled ? 'enabled' : 'not enabled'}.
        </p>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <h3 
            style={{ 
              color: 'white', 
              fontSize: '18px', 
              fontFamily: "'DM Sans', sans-serif", 
              fontWeight: '700',
              marginBottom: '16px',
              fontVariationSettings: "'opsz' 14"
            }}
          >
            Message Timing
          </h3>
          <p 
            style={{ 
              color: '#a6a9b2', 
              fontSize: '14px', 
              fontFamily: "'DM Sans', sans-serif", 
              fontWeight: '400',
              marginBottom: '24px',
              fontVariationSettings: "'opsz' 14"
            }}
          >
            How long should HostBuddy wait before following up?
          </p>
          <div className="row mt-1">
            <div className="col-lg-2 col-3">
              <input type="number" className="form-control" value={currentSettingsData.days_after_last_message} onChange={(e) => setSetting('days_after_last_message', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
            <div className="col-lg-2 col-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label className="settings-label" style={{textAlign:"center", margin:"auto"}}>days, and</label>
            </div>
            <div className="col-lg-2 col-3">
              <input type="number" className="form-control" value={currentSettingsData.hours_after_last_message} onChange={(e) => setSetting('hours_after_last_message', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
            <div className="col-lg-3 col-3" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label className="settings-label" style={{textAlign:"center", margin:"auto"}}>hours after the last message ({total_hours_after} hours total)</label>
            </div>
          </div>
        </div>
      </div>

      <h3 className="available-variables-heading mt-5 text-center">Winback Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
        <label className="fs-5">Variables</label>
        <p className="settings-label">Preview Scheduled</p>
          <div className="available-variables mt-3">
            {Object.keys(variables).map((key, index) => (
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(document.getElementById('upsellMessage'), `[[${key}]]`, currentSettingsData, setCurrentSettingsData)}>{variables[key]}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '10px 0' }}>
        <div className="d-flex align-items-center justify-content-center gap-5">
          <label className="fs-5">Message</label>
        </div>
        <textarea
          id="upsellMessage"
          className="form-control setting-textarea"
          style={{ width: '100%', boxSizing: 'border-box' }}
          value={currentSettingsData.upsell_message}
          onChange={(e) => setSetting('upsell_message', e.target.value, currentSettingsData, setCurrentSettingsData)}
        />
      </div>

      <div className="ai-context-appropriate-section" style={{padding:'10px 50px', borderColor: cssConfig?.css_data?.borders?.primary || '#013280', borderRadius: '8px', borderWidth: '1px', borderStyle: 'solid'}}>
        <div className="d-flex align-items-start justify-content-between">
          <div className="flex-grow-1">
            <div style={{ display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '12px' }}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setSetting('ai_personalization', !currentSettingsData?.ai_personalization, currentSettingsData, setCurrentSettingsData);
                }}
                style={{
                  position: 'relative',
                  width: '44px',
                  height: '24px',
                  borderRadius: '9999px',
                  backgroundColor: currentSettingsData?.ai_personalization ? '#3e88f7' : '#013280',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  flexShrink: 0,
                  marginTop: '2px'
                }}
              >
                <div 
                  style={{
                    position: 'absolute',
                    top: '2px',
                    left: currentSettingsData?.ai_personalization ? '22px' : '2px',
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: 'left 0.3s'
                  }}
                />
              </button>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", fontWeight: '600', marginBottom: '4px', fontVariationSettings: "'opsz' 14" }}>
                  Enable AI Personalization
                </p>
                <p style={{ 
                  fontSize: '12px', 
                  fontFamily: "'DM Sans', sans-serif", 
                  fontWeight: '400',
                  color: currentSettingsData?.ai_personalization ? '#4ade80' : '#a6a9b2',
                  marginBottom: '8px',
                  fontVariationSettings: "'opsz' 14"
                }}>
                  You currently have AI personalization {currentSettingsData?.ai_personalization ? 'enabled' : 'disabled'}.
                </p>
                <p style={{ color: '#a6a9b2', fontSize: '12px', fontFamily: "'DM Sans', sans-serif", fontWeight: '400', margin: 0, fontVariationSettings: "'opsz' 14" }}>
                  If this is enabled, HostBuddy may adjust the wording of each message slightly to make it sound more natural and personalized given the context of the conversation.
                </p>
              </div>
            </div>
          </div>
          {currentSettingsData?.ai_personalization && !showPersonalizeCustomize && (
            <button
              className="btn btn-link"
              style={{ color: 'rgb(20, 110, 245)', borderColor: '#013280', padding: '8px 16px', borderRadius: '10px' }}
              onClick={() => setShowPersonalizeCustomize(true)}
            >
              Customize
            </button>
          )}
        </div>
        {currentSettingsData?.ai_personalization && showPersonalizeCustomize && (
          <div className="mt-3">
            <label className="fs-6">(Optional) Add custom instructions to guide the AI personalization</label>
            <textarea
              className="form-control setting-textarea"
              placeholder="Type instructions to guide the AI..."
              value={currentSettingsData?.ai_personalization_instructions || ''}
              onChange={(e) => setSetting('ai_personalization_instructions', e.target.value, currentSettingsData, setCurrentSettingsData)}
            />
          </div>
        )}
      </div>

      <div className="mb-10 mt-5">
        <button
          onClick={handleSaveSettings}
          className="px-6 py-2.5 bg-[#3e88f7] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#74A9F7] transition-colors"
          style={{ fontVariationSettings: "'opsz' 14", backgroundColor: '#3e88f7', borderRadius: '10px', padding: '10px 24px', border: 'none', cursor: 'pointer', fontSize: '15px', fontFamily: "'DM Sans', sans-serif", fontWeight: '600' }}
          disabled={Object.keys(settingsApiData).length === 0}
        >
          Save Settings
        </button>
      </div>

      <h3 className="available-variables-heading mt-5">Upcoming Messages</h3>
      <p className="settings-label">Preview Scheduled</p>
      {!currentSettingsData.enabled ? (
        <p className="settings-label" style={{ color: '#a6a9b2', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', fontVariationSettings: "'opsz' 14" }}>
          Inquiry follow-ups are currently off. Enable them to see upcoming messages.
        </p>
      ) : upcomingMessagesData && upcomingMessagesData.length > 0 ? (
        <p className="settings-label" style={{ color: '#a6a9b2', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', fontVariationSettings: "'opsz' 14" }}>
          You currently have {upcomingMessagesData.length} upcoming inquiry follow-up messages. These messages will all show up here.
        </p>
      ) : (
        <p className="settings-label" style={{ color: '#a6a9b2', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', fontVariationSettings: "'opsz' 14" }}>
          You currently have zero upcoming inquiry follow-up messages. These messages will all show up here.
        </p>
      )}

      <div className="col-12 mt-4">
        <div className="upcoming-messages">
          <table className="table">
            <thead>
              <tr>
                <th>Scheduled Send Time</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {!getUpcomingMessagesLoading ? (
              upcomingMessagesData && upcomingMessagesData.length > 0 ? (
                <tbody>
                  {upcomingMessagesData.slice(0, 10).map((message, index) => { // only show the first 20
                    const { status, time_to_send, property_name, guest_first_name, guest_check_in, guest_check_out } = message;
                    let status_readable = "";
                    if (status) { status_readable = readableStatus(status); }
                    
                    return (
                      <tr key={index}>
                        <td>{formatDateTime(time_to_send)}</td>
                        <td>{truncateString(property_name, 25)}</td>
                        <td>{`${truncateString(guest_first_name, 13)} (${formatDateRange(guest_check_in, guest_check_out)})`}</td>
                        <td>{status_readable}</td>
                        <td>
                          {cancelMessageLoading !== message.guest_key ? (
                            <>
                              <FaExternalLinkAlt style={{ marginRight:'10px', marginLeft:'10px', cursor:'pointer' }} onClick={() => handleOpenMessageModal(message)} />
                              <FaTimes style={{ color:'red', cursor:'pointer' }} onClick={() => handleCancelMessage(message)} />
                            </>
                            ) : (
                              <BoxLoader />
                            )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">No upcoming messages</td>
                  </tr>
                </tbody>
              )
            ) : (
              <tbody>
                <tr>
                  <td colSpan="6" className="text-center">
                    <BoxLoader />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <UpsellMessageModal headerText={messageModalHeaderText} bodyTopText={messageModalTopText} bodyMainText={messageModalMainText} bodyBottomText={statusAndJustificationText} show={showMessageModal} handleClose={() => setShowMessageModal(false)} ai_personalization={currentSettingsData.ai_personalization}/>
    </div>
  );
};

export default InquiryWinbacks;
