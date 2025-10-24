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

import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

import { formatDateRange, formatDateTime, truncateString, insertVariableAtCursor, setSetting, callSaveSettingsApi, callCancelMessageApi } from "../resources/upsellsFuncts";

/*
default_settings = {
  'enabled': false,
  'min_number_of_nights_criteria': 1,
  'number_of_nights_criteria': 1,  // max
  'send_to_which_reservation': 'both before first', // 'before', 'after', 'both before first', 'both after first'
  'days_before_check_out': 1,
  'time_before_check_out': '12:00',
  'days_before_check_in': 1,
  'time_before_check_in': '12:00',
  'discount_type': 'percentage', // 'percentage', 'absolute'
  'discount_percentage': 10,
  'discount_absolute': 10,
  'upsell_message': "Hi [[guest_name]], we have [[num_days_available]] that opened up right [[before_or_after]] your reservation. If you're interested, I'd like to offer these nights to you at a [[discount_percentage]]% discount. Let me know if you'd like to add these nights to your stay!"
}
*/


const PreStayUpsells = ({setSection, settingsApiData, setSettingsApiData, localSettingsData, setLocalSettingsData, callGetSettingsApi, getSettingsLoading, callGetUpcomingMessagesApi, getUpcomingMessagesLoading, upcomingMessagesData, allPropertyNamesList}) => {


  const [cancelMessageLoading, setCancelMessageLoading] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config
  const [messageModalHeaderText, setMessageModalHeaderText] = useState("");
  const [messageModalTopText, setMessageModalTopText] = useState("");
  const [messageModalMainText, setMessageModalMainText] = useState("");
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

  // Determine whether / how to show absolute discount, based on the PMS & the availability of currency
  const userData = JSON.parse(sessionStorage.getItem("userData")); // assumes that getUserDataActions has been dispatched at some point this session, which populates this session storage item
  const userPMS = userData?.calry_integrations ? Object.keys(userData.calry_integrations)[0] || null : null;

  const allowDiscountByAmount = (!userPMS || ['ownerrez', 'guesty', 'hostfully', 'hostify', 'hostaway'].includes(userPMS?.toLowerCase())); // these PMSs provide price data for each night (in availability), so we can work with prices here
  const currency = localSettingsData?.default?.currency;

  //const variables = {'guest_name':'Guest name', 'price_before_discount':'Price before discount', 'price_after_discount':'Price after discount', 'discount_percentage':'Discount percentage', 'absolute_discount':'Total discount amount', 'num_days_available':'Number of days available'};
  const variables = {
    'guest_name': {label: 'Guest name', example: 'John'},
    'discount_percentage': {label: 'Discount percentage', example: '30'},
    'num_days_available': {label: 'Number of nights available', example: '2'}
  };
  if (allowDiscountByAmount && currency) {
    variables['total_discount_amount'] = {label: `Total discount amount (${currency})`, example: '150 USD'};
    variables['total_before_discount'] = {label: `Total price before discount (${currency})`, example: '500 USD'};
    variables['total_after_discount'] = {label: `Total price after discount (${currency})`, example: '350 USD'};
  }


  const handleReturn = (e) => {
    e.preventDefault();
    setSection("index");
  }


  const handleOpenMessageModal = (message) => {
    const headerText = `Message for ${message.guest_first_name} (${formatDateRange(message.guest_check_in, message.guest_check_out)}) at ${formatDateTime(message.time_to_send)}`;
    const newMessageModalContent = message.message
    const first_line = `At ${message.property_name}, vacant night(s) ${formatDateRange(message.start_date, message.end_date)}`;

    setMessageModalMainText(newMessageModalContent);
    setMessageModalTopText(first_line);
    setMessageModalHeaderText(headerText);
    setShowMessageModal(true);
  }


  const handleCancelMessage = (message) => {
    const userConfirmed = window.confirm("Are you sure you want to cancel this message?");
    if (userConfirmed) {
      callCancelMessageApi(message.property_name, message.guest_key, 'pre_stay', callGetUpcomingMessagesApi, setCancelMessageLoading);
    }
  }


  // On save button click, call the API to save the settings. Once saved, refresh the upcoming messages, regenerated with the new settings
  const handleSaveSettings = async () => {
    await callSaveSettingsApi(localSettingsData, 'pre_stay');
    callGetUpcomingMessagesApi(true, 'pre_stay');
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
      callGetSettingsApi('pre_stay');
      callGetUpcomingMessagesApi(false, 'pre_stay');
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
          <h3>Pre Stay Gap Night</h3>
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
                padding: '10px 24px'
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
            <select 
              className="form-select text-white shadow-none fs-14 mb-3 mb-md-0" 
              style={{ 
                backgroundColor: "#0F1117", 
                borderColor: '#013280',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '8px',
                padding: '10px 24px',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '15px',
                fontWeight: '600',
                fontVariationSettings: "'opsz' 14",
                minWidth: '140px',
                cursor: 'pointer'
              }} 
              aria-label="Configuration select" 
              value={selectedConfig} 
              onChange={handleConfigSelectChange}
            >
              {Object.keys(localSettingsData).map((key, index) => (
                <option key={index} value={key} style={{ textTransform: 'capitalize' }}>{key}</option>              
              ))}
              <option value="add">+ New Configuration</option>
            </select>
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
          HostBuddy will detect when there's a vacant night between two reservations. You'll send a message to the guest booked after the vacant night with a gap night upsell offer, customizable by you, with AI personalization if you enable it. If they're interested, HostBuddy will automatically acknowledge and prompt you to manually extend their stay.
        </p>
      </div>

      {/* <div style={{width:"90%", margin:"20px 0"}}>
        <p className="settings-label">HostBuddy can detect when you have vacant nights between two reservations. You can have a message send to the guest booked after vacant night, offering them an early check-in or a discount to extend their stay. You can customize the message and parameters.</p>
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
            Enable Pre Stay Upsells
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
          You currently have pre-stay upsells {currentSettingsData.enabled ? 'enabled' : 'not enabled'}.
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
            Number of Nights to Consider
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
            HostBuddy will send a message each time there is a number of consecutive vacant nights between these values. Remove the maximum to allow HostBuddy to send messages to guests touching any open availability.
          </p>
          <div className="d-flex align-items-center gap-3 mt-1">
            <div className="d-flex align-items-center gap-2">
              <label className="settings-label">Min:</label>
              <input style={{width:'100px'}} type="number" className="form-control" value={currentSettingsData.min_number_of_nights_criteria || 1} onChange={(e) => setSetting('min_number_of_nights_criteria', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
            <div className="d-flex align-items-center gap-2">
              <label className="settings-label">Max:</label>
              <input style={{width:'100px'}} type="number" className="form-control" value={currentSettingsData.number_of_nights_criteria} onChange={(e) => setSetting('number_of_nights_criteria', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Upsell Timing</label>
          <p className="settings-label mb-2">When should HostBuddy send the upsell message?</p>
          <div className="row mt-1">
            <div className="col-lg-2 col-4">
              <input type="number" className="form-control" value={currentSettingsData.days_before_check_in} onChange={(e) => setSetting('days_before_check_in', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
            <div className="col-lg-3 col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label className="settings-label" style={{textAlign:"center", margin:"auto"}}>days before guest check-in, at</label>
            </div>
            <div className="col-lg-3 col-4">
              <input type="time" name="st" id="startTime" class="form-control" value={currentSettingsData.time_before_check_in} onChange={(e) => setSetting('time_before_check_in', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Discount Amount</label>
          <p className="settings-label">The discount amount to offer in the upsell message.</p>
          <div className="d-flex flex-column gap-2 mt-1">
            <div className="d-flex align-items-center gap-2">
              <Form.Check type="radio" name="discount_type" label="Percentage:" checked={currentSettingsData.discount_type === 'percentage'} onChange={() => setSetting('discount_type', 'percentage', currentSettingsData, setCurrentSettingsData)}/>
              <div className="d-flex align-items-center gap-1">
                <input type="number" className="form-control" style={{width: '100px'}} value={currentSettingsData.discount_percentage} onChange={(e) => setSetting('discount_percentage', e.target.value, currentSettingsData, setCurrentSettingsData)} disabled={currentSettingsData.discount_type !== 'percentage'}/>
                <label className="fs-6">%</label>
              </div>
            </div>
            {allowDiscountByAmount && currency && (
              <div className="d-flex align-items-center gap-2">
                <Form.Check type="radio" name="discount_type" label="Absolute:" checked={currentSettingsData.discount_type === 'absolute'} onChange={() => setSetting('discount_type', 'absolute', currentSettingsData, setCurrentSettingsData)}/>
                <input type="number" className="form-control" style={{width: '100px'}} value={currentSettingsData.discount_absolute} onChange={(e) => setSetting('discount_absolute', e.target.value, currentSettingsData, setCurrentSettingsData)} disabled={currentSettingsData.discount_type !== 'absolute'}/>
                <label className="fs-6">{currency || ''} per night</label>
              </div>
            )}
          </div>
        </div>
      </div>

      <h3 className="available-variables-heading mt-5 text-center">Upsell Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
        <label className="fs-5">Variables</label>
        <p className="settings-label">Click to add custom variables to your upsell message. These variables will change to match the data for each reservation.</p>
          <div className="available-variables mt-3" style={{width:'90%', margin:'0 auto'}}>
            {Object.keys(variables).map((key, index) => (
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(document.getElementById('upsellMessage'), `[[${key}]]`, currentSettingsData, setCurrentSettingsData)}>
                <div className="variable-label">{variables[key].label}</div>
                <div className="variable-example">e.g. "{variables[key].example}"</div>
              </span>
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

      <div className="ai-context-appropriate-section" style={{padding:'10px 50px', borderColor: '#013280', borderRadius: '8px', borderWidth: '1px', borderStyle: 'solid'}}>
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

      <div className="row mt-5">
        <div className="col-lg-12">
          <Button className="btn-primary fs-16 px-4" style={{ borderRadius: '10px' }} onClick={handleSaveSettings} disabled={Object.keys(settingsApiData).length === 0}>
            Save Upsells
          </Button>
        </div>
      </div>

      <h3 className="available-variables-heading mt-5">Upcoming Messages</h3>
      <p className="settings-label">Preview Scheduled</p>
      {!currentSettingsData.enabled ? (
        <p className="settings-label" style={{ color: '#a6a9b2', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', fontVariationSettings: "'opsz' 14" }}>
          Pre-stay upsells are currently off. Enable them to see upcoming messages.
        </p>
      ) : upcomingMessagesData && upcomingMessagesData.length > 0 ? (
        <p className="settings-label" style={{ color: '#a6a9b2', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', fontVariationSettings: "'opsz' 14" }}>
          You currently have {upcomingMessagesData.length} upcoming upsell messages. These messages will all show up here.
        </p>
      ) : (
        <p className="settings-label" style={{ color: '#a6a9b2', fontSize: '14px', fontFamily: "'DM Sans', sans-serif", marginBottom: '24px', fontVariationSettings: "'opsz' 14" }}>
          You currently have zero upcoming upsell messages. These messages will all show up here.
        </p>
      )}

      <div className="col-12 mt-4">
        <div className="upcoming-messages">
          <table className="table">
            <thead>
              <tr>
                <th>Sending at</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Vacant night</th>
                {/* <th>Status</th> tbh there's no need for this, since current implementation only shows "waiting to send" messages to the user */}
                <th>Action</th>
              </tr>
            </thead>
            {!getUpcomingMessagesLoading ? (
              upcomingMessagesData && upcomingMessagesData.length > 0 ? (
                <tbody>
                  {upcomingMessagesData.slice(0, 10).map((message, index) => ( // only show the first 20
                    <tr key={index}>
                      <td>{formatDateTime(message.time_to_send)}</td>
                      <td>{truncateString(message.property_name, 25)}</td>
                      <td>{`${truncateString(message.guest_first_name, 13)} (${formatDateRange(message.guest_check_in, message.guest_check_out)})`}</td>
                      <td>{formatDateRange(message.start_date, message.end_date)}</td>
                      {/* <td>Waiting to send</td> We could get the actual status of the message (message.status). But current implementation only shows messages with status "scheduled" */}
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
                  ))}
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
      <UpsellMessageModal headerText={messageModalHeaderText} bodyTopText={messageModalTopText} bodyMainText={messageModalMainText} show={showMessageModal} handleClose={() => setShowMessageModal(false)} ai_personalization={currentSettingsData.ai_personalization}/>
    </div>
  );
};

export default PreStayUpsells;
