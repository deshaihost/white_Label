import React from "react";
import Select, { components } from 'react-select';
import customStyles from "../resources/selectStyles";
import { Button, Form } from "react-bootstrap";
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
  'number_of_nights_criteria': 1,
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


const PostStayUpsells = ({setSection, settingsApiData, setSettingsApiData, localSettingsData, setLocalSettingsData, callGetSettingsApi, getSettingsLoading, callGetUpcomingMessagesApi, getUpcomingMessagesLoading, upcomingMessagesData, allPropertyNamesList}) => {

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

  //const variables = {'guest_name':'Guest name', 'price_before_discount':'Price before discount', 'price_after_discount':'Price after discount', 'discount_percentage':'Discount percentage', 'absolute_discount':'Total discount amount', 'num_days_available':'Number of days available', 'before_or_after':'Before or after'};
  const variables = {'guest_name':'Guest name', 'discount_percentage':'Discount percentage', 'num_days_available':'Number of days available'};

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
      callCancelMessageApi(message.property_name, message.guest_key, 'post_stay', callGetUpcomingMessagesApi, setCancelMessageLoading);
    }
  }

  // On save button click, call the API to save the settings. Once saved, refresh the upcoming messages, regenerated with the new settings
  const handleSaveSettings = async () => {
    await callSaveSettingsApi(localSettingsData, 'post_stay');
    callGetUpcomingMessagesApi(true, 'post_stay');
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
      callGetSettingsApi('post_stay');
      callGetUpcomingMessagesApi(false, 'post_stay');
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
          <h3>Post Stay Gap Night</h3>
          <a href="#" onClick={handleReturn} style={{ display:'inline-block', marginTop:"20px" }}>&lt; Upsells</a>
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
        <p className="settings-label">HostBuddy can detect when you have vacant nights between two reservations. You can have a message send to the guest booked before vacant night, offering them a late check-out or a discount to extend their stay. You can customize the message and parameters.</p>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-4"/>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-5">Enable Post Stay Upsells</label>
            <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.enabled} onChange={(e) => setSetting('enabled', e.target.checked, currentSettingsData, setCurrentSettingsData)}/>
          </div>
          <p className="settings-label">You currently have post-stay upsells {currentSettingsData.enabled ? <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span> : <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>}.</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Number of Nights to Consider</label>
          <p className="settings-label">HostBuddy will send a message each time there are this many consecutive vacant nights or fewer.</p>
          <div className="d-flex align-items-center gap-1 mt-1">
            <input style={{width:'100px'}} type="number" className="form-control" value={currentSettingsData.number_of_nights_criteria} onChange={(e) => setSetting('number_of_nights_criteria', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
          </div>
        </div>
      </div>
      
      {/*
      <div className="row mt-5">
        <div className="col-lg-12">
          <label className="fs-5">Upsell Behavior</label>
          <p className="settings-label">Vacant nights are present between two reservations. Should HostBuddy send the offer to the reservation before or after the vacant night? (If you choose "Both", HostBuddy will only send the second offer if the first is declined).</p>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-12">
          <Form.Check type="radio" aria-label="radio 1" name="group1" label="Send to the reservation before" value="before" checked={currentSettingsData.send_to_which_reservation === 'before'} onChange={(e) => setSetting('send_to_which_reservation', e.target.value)}/>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-12">
          <Form.Check type="radio" aria-label="radio 2" name="group1" label="Send to the reservation after" value="after" checked={currentSettingsData.send_to_which_reservation === 'after'} onChange={(e) => setSetting('send_to_which_reservation', e.target.value)}/>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-12">
          <Form.Check type="radio" aria-label="radio 3" name="group1" label="Both: Send to the reservation before first" value="both before first" checked={currentSettingsData.send_to_which_reservation === 'both before first'} onChange={(e) => setSetting('send_to_which_reservation', e.target.value)}/>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-12">
          <Form.Check type="radio" aria-label="radio 4" name="group1" label="Both: Send to the reservation after first" value="both after first" checked={currentSettingsData.send_to_which_reservation === 'both after first'} onChange={(e) => setSetting('send_to_which_reservation', e.target.value)}/>
        </div>
      </div>
      */}

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Upsell Timing</label>
          <p className="settings-label mb-2">When should HostBuddy send the upsell message?</p>
          {/*
          <div className="row">
            <label className="fs-6 mt-1">For reservations before a vacant night, send the message:</label>
          </div>
          */}
          <div className="row mt-1">
            <div className="col-lg-2 col-4">
              <input type="number" className="form-control" value={currentSettingsData.days_before_check_out} onChange={(e) => setSetting('days_before_check_out', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
            <div className="col-lg-3 col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label className="settings-label" style={{textAlign:"center", margin:"auto"}}>days before guest check-out, at</label>
            </div>
            <div className="col-lg-3 col-4">
              <input type="time" name="st" id="startTime" class="form-control" value={currentSettingsData.time_before_check_out} onChange={(e) => setSetting('time_before_check_out', e.target.value, currentSettingsData, setCurrentSettingsData)}/>
            </div>
          </div>
          {/*
          <div className="row mt-3">
            <label className="fs-6">For reservations after a vacant night, send the message:</label>
          </div>
          <div className="row mt-1">
            <div className="col-lg-2 col-4">
              <input type="number" className="form-control" value={currentSettingsData.days_before_check_in} onChange={(e) => setSetting('days_before_check_in', e.target.value)}/>
            </div>
            <div className="col-lg-3 col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label className="settings-label" style={{textAlign:"center", margin:"auto"}}>days before guest check-in, at</label>
            </div>
            <div className="col-lg-3 col-4">
              <input type="time" name="st" id="startTime" class="form-control" value={currentSettingsData.time_before_check_in} onChange={(e) => setSetting('time_before_check_in', e.target.value)}/>
            </div>
          </div>
          */}
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
            {/*
            <div className="d-flex align-items-center gap-2">
              <Form.Check type="radio" name="discount_type" label="Use absolute discount:" checked={currentSettingsData.discount_type === 'absolute'} onChange={() => setSetting('discount_type', 'absolute')}/>
              <input type="number" className="form-control" style={{width: '100px'}} value={currentSettingsData.discount_absolute} onChange={(e) => setSetting('discount_absolute', e.target.value)} disabled={currentSettingsData.discount_type !== 'absolute'}/>
              <label className="fs-6">per night</label>
            </div>
            */}
          </div>
        </div>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <h3 className="available-variables-heading mt-5 text-center">Upsell Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
        <label className="fs-5">Variables</label>
        <p className="settings-label">Click to add custom variables to your upsell message. These variables will change to match the data for each reservation.</p>
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

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <h3 className="available-variables-heading mt-5 text-center">Upcoming Messages</h3>
      <p className="settings-label text-center">Showing the next 10</p>
      {currentSettingsData.enabled ? (
        <p style={{marginTop:'10px'}} className="settings-label text-center">You currently have post-stay upsells <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span>. Your templated message will send at the scheduled time.</p>
      ) : (
        <p style={{marginTop:'10px'}} className="settings-label text-center">You currently have post-stay upsells <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>. These messages will not be sent.</p>
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
      <UpsellMessageModal headerText={messageModalHeaderText} bodyTopText={messageModalTopText} bodyMainText={messageModalMainText} show={showMessageModal} handleClose={() => setShowMessageModal(false)} />
    </div>
  );
};

export default PostStayUpsells;
