import React from "react";
import Select, { components } from 'react-select';
import { Button, Form } from "react-bootstrap";
import customStyles from "../resources/selectStyles";
import {useState, useEffect, useRef} from "react";
import "../resources/upsells.css";
import { BoxLoader, FullScreenLoader } from "../../../../helper/Loader";
//import UpsellMessageModal from "../resources/upsellMessageModal";
//import ConversationTranscriptModal from "../resources/ConversationTranscriptModal";

//import { FaTimes, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";

import { formatDateRange, formatDateTime, truncateString, insertVariableAtCursor, setSetting, callSaveSettingsApi, callCancelMessageApi } from "../resources/upsellsFuncts";

/*
default_settings = {
  'enabled': false,
  'minutes_after_property_ready': 0,
  'upsell_message': "Hi [[guest_name]], the property is ready for you to check in! We're here if you need anything. Enjoy your stay!"
}
*/


const PropertyReadyMessage = ({setSection, settingsApiData, setSettingsApiData, localSettingsData, setLocalSettingsData, callGetSettingsApi, getSettingsLoading, callGetUpcomingMessagesApi, getUpcomingMessagesLoading, upcomingMessagesData, allPropertyNamesList}) => {

  const [setSettingsLoading, setSetSettingsLoading] = useState(false);
  const [cancelMessageLoading, setCancelMessageLoading] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config

  const [conversationModalData, setConversationModalData] = useState({});
  const [showConversationModal, setShowConversationModal] = useState(false);

  const [messageModalHeaderText, setMessageModalHeaderText] = useState("");
  const [messageModalTopText, setMessageModalTopText] = useState("");
  const [messageModalMainText, setMessageModalMainText] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  const currentSettingsData = localSettingsData?.[selectedConfig] || {};
  const setCurrentSettingsData = (newData) => {
    setLocalSettingsData({ ...localSettingsData, [selectedConfig]: newData });
  };

  //const variables = {'guest_name':'Guest name', 'price_before_discount':'Price before discount', 'price_after_discount':'Price after discount', 'discount_percentage':'Discount percentage', 'absolute_discount':'Total discount amount', 'num_days_available':'Number of days available'};
  const variables = {'guest_name':'Guest name'};

  const handleReturn = (e) => {
    e.preventDefault();
    setSection("index");
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

    setMessageModalMainText(newMessageModalContent);
    setMessageModalTopText(first_line);
    setMessageModalHeaderText(headerText);
    setShowMessageModal(true);
  }


  const handleOpenConversationModal = (message) => {
    setConversationModalData({'conversationId':message.conversation_id, 'propertyName':message.property_name});
    setShowConversationModal(true);
  }


  const handleCancelMessage = (message) => {
    const userConfirmed = window.confirm("Are you sure you want to cancel this message?");
    if (userConfirmed) {
      callCancelMessageApi(message.property_name, message.guest_key, 'property_ready', callGetUpcomingMessagesApi, setCancelMessageLoading);
    }
  }


  // On save button click, call the API to save the settings. Once saved, refresh the upcoming messages, regenerated with the new settings
  const handleSaveSettings = async () => {
    await callSaveSettingsApi(localSettingsData, 'property_ready');
    callGetUpcomingMessagesApi(true, 'property_ready');
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
      callGetSettingsApi('property_ready');
      callGetUpcomingMessagesApi(false, 'property_ready');
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
          <h3>Property Ready Message</h3>
          <a href="#" onClick={handleReturn} style={{ display:'inline-block', marginTop:"20px" }}>&lt; Smart Templates</a>
        </div>
        <div>
          <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
            <Button className="rounded-pill px-5 text-nowrap fs-14" onClick={handleSaveSettings} disabled={Object.keys(settingsApiData).length === 0}>
              Save Settings
            </Button>
            <select className="form-select rounded-pill border-primary text-white shadow-none fs-14 setting-tab-select mb-3 mb-md-0" style={{ backgroundColor: "#000212", backgroundImage: "" }} aria-label="Default select example" value={selectedConfig} onChange={handleConfigSelectChange}>
              {Object.keys(localSettingsData).map((key, index) => (
                <option key={index} value={key}>{key}</option>              
              ))}
              <option value="add">+ New Config</option>
            </select>
          </div>

          <div style={{marginTop:"10px"}}>
            {selectedConfig === "default" ? (
              <div style={{maxWidth:"400px"}}>
                <p style={{fontSize:"14px", textAlign:"center"}}>This is the default config. It applies to all properties that are not included in any other config.</p>
              </div>
            ) : (
              <>
                <p style={{fontSize:"14px", textAlign:"center"}}>Applies to these properties:</p>
                <div ref={selectRef}>
                  <Select className="custom-select property_Custom_Select" isMulti options={options} value={selectedOptions} onChange={handleChange} placeholder="Select properties..." components={{ ValueContainer, MultiValueContainer: () => null }} hideSelectedOptions={false} closeMenuOnSelect={false} styles={customStyles} menuIsOpen={menuIsOpen} onMenuOpen={() => setMenuIsOpen(true)} onMenuClose={() => setMenuIsOpen(false)}/>
                </div>
              </>
            )}
          </div>
          
        </div>
      </div>

      <div style={{width:"90%", margin:"20px auto", textAlign:"center"}}>
        <p className="settings-label">Using a cleaning management software integration, HostBuddy can recognize when a property is and ready for a guest, and send a message to the guest inviting them to come check in.</p>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-4"/>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-5">Enable Property Ready Messages</label>
            <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.enabled} onChange={(e) => setSetting('enabled', e.target.checked, currentSettingsData, setCurrentSettingsData)}/>
          </div>
          <p className="settings-label">You currently have property ready messages {currentSettingsData.enabled ? <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span> : <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>}.</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Request Timing</label>
          <p className="settings-label mb-2">When should HostBuddy send the message?</p>
          <div className="row mt-1">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input type="number" className="form-control" value={currentSettingsData.minutes_after_property_ready}
                onChange={(e) => setSetting('minutes_after_property_ready', e.target.value, currentSettingsData, setCurrentSettingsData)}
                style={{ width: '100px', marginRight: '10px' }}
              />
              <label className="settings-label" style={{ margin: 0 }}>
                minutes after the property is marked as ready
              </label>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <h3 className="available-variables-heading mt-5 text-center">Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
        <label className="fs-5">Variables</label>
        <p className="settings-label">Click to add custom variables to your request message. These variables will change to match the data for each reservation.</p>
          <div className="available-variables mt-3">
            {Object.keys(variables).map((key, index) => (
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(document.getElementById('upsellMessage'), `[[${key}]]`, currentSettingsData, setCurrentSettingsData)}>{variables[key]}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4 justify-content-center">
        <div className="col-lg-11">
          <div className="d-flex align-items-center justify-content-center gap-5">
            <label className="fs-5">Message</label>
          </div>
          <div className="d-flex justify-content-center">
            <textarea id="upsellMessage" className="form-control setting-textarea" value={currentSettingsData.upsell_message} onChange={(e) => setSetting('upsell_message', e.target.value, currentSettingsData, setCurrentSettingsData)} />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-12 text-center">
          <Button className="btn-primary fs-16 px-4 rounded-pill" onClick={handleSaveSettings} disabled={Object.keys(settingsApiData).length === 0}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyReadyMessage;
