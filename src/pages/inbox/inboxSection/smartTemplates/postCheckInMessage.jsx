import React from "react";
import Select, { components } from 'react-select';
import { Button, Form } from "react-bootstrap";
import customStyles from "../resources/selectStyles";
import {useState, useEffect, useRef} from "react";
import "../resources/upsells.css";
import { BoxLoader, FullScreenLoader } from "../../../../helper/Loader";
import UpsellMessageModal from "../resources/upsellMessageModal";
import ConversationTranscriptModal from "../resources/ConversationTranscriptModal";

import { FaTimes, FaExternalLinkAlt, FaFileAlt } from "react-icons/fa";

import { formatDateRange, formatDateTime, truncateString, insertVariableAtCursor, setSetting, callSaveSettingsApi, callCancelMessageApi } from "../resources/upsellsFuncts";

const PostCheckInMessages = ({setSection, settingsApiData, setSettingsApiData, localSettingsData, setLocalSettingsData, callGetSettingsApi, getSettingsLoading, callGetUpcomingMessagesApi, getUpcomingMessagesLoading, upcomingMessagesData, allPropertyNamesList}) => {

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

  const variables = {'guest_name':'Guest name'};

  const handleReturn = (e) => {
    e.preventDefault();
    setSection("index");
  }

  const handleOpenMessageModal = (message) => {
    const headerText = `Message for ${message.guest_first_name} (${formatDateRange(message.guest_check_in, message.guest_check_out)}) at ${formatDateTime(message.time_to_send)}`;
    const newMessageModalContent = message.message
    let first_line = `At ${message.property_name}`;
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
      callCancelMessageApi(message.property_name, message.guest_key, 'check_in_message', callGetUpcomingMessagesApi, setCancelMessageLoading);
    }
  }

  // On save button click, call the API to save the settings. Once saved, refresh the upcoming messages, regenerated with the new settings
  const handleSaveSettings = async () => {
    await callSaveSettingsApi(localSettingsData, 'check_in_message');
    callGetUpcomingMessagesApi(true, 'check_in_message');
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
      callGetSettingsApi('check_in_message');
      callGetUpcomingMessagesApi(false, 'check_in_message');
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
          <h3>Post-Check-In Check-In Message</h3>
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
        <p className="settings-label">HostBuddy will detect whether or not your guest has messaged you since they've checked in. If they haven't, you can send a message to the guest to check in on them and ensure everything is going well. You can customize the message and the criteria for when it is sent.</p>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-4"/>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-5">Enable Post-Check-In Messages</label>
            <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.enabled} onChange={(e) => setSetting('enabled', e.target.checked, currentSettingsData, setCurrentSettingsData)}/>
          </div>
          <p className="settings-label">You currently have post-check-in check-in messages {currentSettingsData.enabled ? <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span> : <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>}.</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Sentiment Criteria</label>
          <p className="settings-label">Should HostBuddy send the message for all stays, or only if the sentiment was detected to be positive or neutral?</p>
          <div className="d-flex align-items-center gap-1 mt-1">
            <select style={{width:'430px'}} className="form-control" value={currentSettingsData.criteria} onChange={(e) => setSetting('criteria', e.target.value, currentSettingsData, setCurrentSettingsData)}>
              <option value="always">For all stays</option>
              <option value="neutral">Only if the guest's sentiment is neutral or positive</option>
              <option value="positive">Only if the guest's sentiment is positive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Message Timing</label>
          <p className="settings-label mb-2">When should HostBuddy send the message?</p>
          <div className="row mt-1">
            <div style={{width: '100px'}}>
              <input type="number" className="form-control" value={currentSettingsData.hours_after_check_in} onChange={(e) => setSetting('hours_after_check_in', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
            <div className="col-lg-4 col-4" style={{ display: 'flex', alignItems: 'center' }}>
              <label className="settings-label">hours after scheduled guest check-in</label>
            </div>
          </div>
          {/* <p className="settings-label mt-2">Note: The message will only be sent if the guest hasn't sent any messages since check-in.</p> */}
        </div>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <h3 className="available-variables-heading mt-5 text-center">Check-In Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
          <label className="fs-5">Variables</label>
          <p className="settings-label">Click to add custom variables to your check-in message. These variables will change to match the data for each reservation.</p>
          <div className="available-variables mt-3">
            {Object.keys(variables).map((key, index) => (
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(document.getElementById('checkInMessage'), `[[${key}]]`, currentSettingsData, setCurrentSettingsData)}>{variables[key]}</span>
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
            <textarea id="checkInMessage" className="form-control setting-textarea" value={currentSettingsData.check_in_message} onChange={(e) => setSetting('check_in_message', e.target.value, currentSettingsData, setCurrentSettingsData)} />
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

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <h3 className="available-variables-heading mt-5 text-center">Upcoming Messages</h3>
      <p className="settings-label text-center">Showing the next 20.</p>
      {currentSettingsData.enabled ? (
        <p style={{marginTop:'10px'}} className="settings-label text-center">You currently have post-check-in messages <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span>. Your templated message will send at the scheduled time for {currentSettingsData.criteria==='always' ? 'all guests' : currentSettingsData.criteria==='neutral' ? 'guests with neutral or positive sentiment' : 'guests with positive sentiment'}, if they haven't sent any messages since check-in.</p>
      ) : (
        <p style={{marginTop:'10px'}} className="settings-label text-center">You currently have post-check-in messages <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>. These messages will not be sent.</p>
      )}

      <div className="col-12 mt-4">
        <div className="upcoming-messages">
          <table className="table">
            <thead>
              <tr>
                <th>Scheduled Send Time</th>
                <th>Property</th>
                <th>Guest</th>
                <th>Sentiment</th>
                <th>Action</th>
              </tr>
            </thead>
            {!getUpcomingMessagesLoading ? (
              upcomingMessagesData && upcomingMessagesData.length > 0 ? (
                <tbody>
                  {upcomingMessagesData.slice(0, 20).map((message, index) => ( // only show the first 20
                    <tr key={index}>
                      <td>{formatDateTime(message.time_to_send)}</td>
                      <td>{truncateString(message.property_name, 25)}</td>
                      <td>{`${truncateString(message.guest_first_name, 13)} (${formatDateRange(message.guest_check_in, message.guest_check_out)})`}</td>
                      <td style={{ 
                        color: message.sentiment === 'positive' ? 'rgb(0, 128, 0)' : 
                              message.sentiment === 'negative' ? 'rgb(225, 0, 0)' : 
                              'rgb(178, 178, 178)'
                      }}>
                        {['positive', 'negative', 'neutral'].includes(message.sentiment) && (
                          message.sentiment
                        )}
                      </td>
                      <td>
                        {cancelMessageLoading !== message.guest_key ? (
                          <>
                            <FaFileAlt style={{ marginRight:'2px', cursor:'pointer' }} onClick={() => handleOpenConversationModal(message)} />
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
                    <td colSpan="5" className="text-center">No upcoming messages</td>
                  </tr>
                </tbody>
              )
            ) : (
              <tbody>
                <tr>
                  <td colSpan="5" className="text-center">
                    <BoxLoader />
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </div>
      <ConversationTranscriptModal handleClose={() => setShowConversationModal(false)} show={showConversationModal} modalData={conversationModalData}/>
      <UpsellMessageModal headerText={messageModalHeaderText} bodyTopText={messageModalTopText} bodyMainText={messageModalMainText} show={showMessageModal} handleClose={() => setShowMessageModal(false)} />
    </div>
  );
};

export default PostCheckInMessages;
