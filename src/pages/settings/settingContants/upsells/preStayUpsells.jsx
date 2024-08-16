import React from "react";
import { Button, Form } from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "./upsells.css";
import { BoxLoader, FullScreenLoader } from "../../../../helper/Loader";
import UpsellMessageModal from "./upsellMessageModal";

import { FaTimes, FaExternalLinkAlt } from "react-icons/fa";

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


const PreStayUpsells = ({setSection, settingsApiData, setSettingsApiData, currentSettingsData, setCurrentSettingsData, callGetSettingsApi, getSettingsLoading, callGetUpcomingMessagesApi, getUpcomingMessagesLoading, upcomingMessagesData}) => {


  const [setSettingsLoading, setSetSettingsLoading] = useState(false);
  const [cancelMessageLoading, setCancelMessageLoading] = useState("");
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config
  const [messageModalHeaderText, setMessageModalHeaderText] = useState("");
  const [messageModalTopText, setMessageModalTopText] = useState("");
  const [messageModalMainText, setMessageModalMainText] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);

  //const variables = {'guest_name':'Guest name', 'price_before_discount':'Price before discount', 'price_after_discount':'Price after discount', 'discount_percentage':'Discount percentage', 'absolute_discount':'Total discount amount', 'num_days_available':'Number of days available'};
  const variables = {'guest_name':'Guest name', 'discount_percentage':'Discount percentage', 'num_days_available':'Number of days available'};


  // Set a particular field in the current settings
  const setSetting = (key, value) => {

    // Only accept valid values for certain fields
    if (key === 'days_before_check_out' || key === 'days_before_check_in') {
      value = parseInt(value);
      if (value < 0 || value > 30) { return }
    } else if (key === 'discount_percentage') {
      value = parseInt(value);
      if (value < 0 || value > 100) { return }
    } else if (key === 'discount_absolute') {
      value = parseInt(value);
      if (value < 0) { return }
    } else if (key === 'number_of_nights_criteria') {
      value = parseInt(value);
      if (value < 1 || value > 30) { return }
    }

    setCurrentSettingsData({ ...currentSettingsData, [key]: value });
  }


  // Format date range
  // e.g. input startDate='2024-08-16', endDate='2024-08-18' => output 'Aug 16 - Aug 18'
  // e.g. input startDate='2024-08-16', endDate='2024-08-16' => output 'Aug 16'
  // e.g. input startDate='08-16-24', endDate='08-18-24' => output 'Aug 16 - Aug 18'
  const formatDateRange = (startDate, endDate) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
    const parseDate = (dateString) => {
      let year, month, day;
      if (dateString.includes('-')) {
        const parts = dateString.split('-').map(Number);
        if (parts[0] > 31) { // Assuming format is YYYY-MM-DD
          [year, month, day] = parts;
        } else { // Assuming format is MM-DD-YY
          [month, day, year] = parts;
          year += 2000; // Assuming 21st century for two-digit years
        }
      }
      return new Date(Date.UTC(year, month - 1, day));
    };
  
    const formatDate = (date, includeYear = false) => {
      const month = monthNames[date.getUTCMonth()];
      const day = date.getUTCDate();
      const year = date.getUTCFullYear();
      return includeYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
    };
  
    const start = parseDate(startDate);
    const end = parseDate(endDate);
  
    const startFormatted = formatDate(start, start.getUTCFullYear() !== end.getUTCFullYear());
    const endFormatted = formatDate(end, start.getUTCFullYear() !== end.getUTCFullYear());
  
    if (startFormatted === endFormatted) {
      return startFormatted;
    } else {
      return `${startFormatted} - ${endFormatted}`;
    }
  };


  // Format datetime
  // e.g. input datetime='2024-08-15 13:00' => output 'Aug 15, 1:00 PM'
  const formatDateTime = (datetime) => {
    const [datePart, timePart] = datetime.split(' ');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour, minute] = timePart.split(':').map(Number);
  
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
  
    const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' };
    return date.toLocaleDateString('en-US', options);
  };

  // Truncate a string to num_chars
  // e.g. input string='Hello, world!', num_chars=5 => output 'Hello...'
  // e.g. input string='Hello', num_chars=5 => output 'Hello'
  const truncateString = (string, num_chars) => {
    if (string.length > num_chars) {
      return string.slice(0, num_chars-3) + '...';
    } else {
      return string;
    }
  }


  // Handle click on a variable to insert it into the message textarea
  const insertVariableAtCursor = (variable) => {
    const textarea = document.getElementById('upsellMessage');
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, startPos);
    const textAfter = textarea.value.substring(endPos, textarea.value.length);
  
    const newText = textBefore + variable + textAfter;
    setSetting('upsell_message', newText);
  
    // Set the cursor position after the inserted variable
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = startPos + variable.length;
      textarea.focus();
    }, 0);
  };


  // Call the API to save the user's settings. This only handles default settings.
  // TODO: add support for saving different settings for different properties. Might want to change the backend API to just accept all the configs at once and save everything, instead of saving one at a time.
  const callSaveSettingsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setSetSettingsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { name:'default', settings:currentSettingsData, upsell_type:'pre_stay' };
      const response = await axios.put( `${baseUrl}/set_upsell_settings`, body_data, config );

      if (response.status === 200) {
        ToastHandle("Settings saved successfully", "success");
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      
    } finally {
      setSetSettingsLoading(false);
    }
  }


  // Call the API to cancel an upsell message
  const callCancelMessageApi = async (propertyName, guestKey) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setCancelMessageLoading(guestKey);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { property_name:propertyName, guest_key:guestKey, upsell_type:'pre_stay' };
      const response = await axios.put( `${baseUrl}/cancel_upcoming_message`, body_data, config );

      if (response.status === 200) {
        ToastHandle("Message cancelled successfully", "success");
        callGetUpcomingMessagesApi(false, 'pre_stay');
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle('Internal server error', "danger");
    } finally {
      setCancelMessageLoading("");
    }
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
      callCancelMessageApi(message.property_name, message.guest_key);
    }
  }


  // On save button click, call the API to save the settings. Once saved, refresh the upcoming messages, regenerated with the new settings
  const handleSaveSettings = async () => {
    await callSaveSettingsApi();
    callGetUpcomingMessagesApi(true, 'pre_stay');
  }


  // On page load, call the API to get the settings and any upcoming messages
  useEffect(() => {
    if (Object.keys(settingsApiData).length === 0) {
      callGetSettingsApi('pre_stay');
      callGetUpcomingMessagesApi(false, 'pre_stay');
    }
  }, []);



  return (
    <div className="upsells-settings">
      {getSettingsLoading ? <FullScreenLoader /> : null}
      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
        <h3>Pre Stay Gap Night</h3>
        <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
          <Button className="rounded-pill px-5 text-nowrap fs-14" onClick={handleSaveSettings} disabled={Object.keys(settingsApiData).length === 0}>
            Save Settings
          </Button>
          <select className="form-select rounded-pill border-primary text-white shadow-none fs-14 setting-tab-select mb-3 mb-md-0" style={{ backgroundColor: "#000212", backgroundImage: "" }} aria-label="Default select example">
            {Object.keys(settingsApiData).map((key, index) => (
              <option key={index} value={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>
      <a href="#" onClick={handleReturn} style={{ display:'inline-block', marginTop:"20px" }}>&lt; Upsells</a>
      <div style={{width:"90%", margin:"20px auto", textAlign:"center"}}>
        <p className="settings-label">HostBuddy can detect when you have vacant nights between two reservations. You can have a message send to the guest booked after vacant night, offering them an early check-in or a discount to extend their stay. You can customize the message and parameters.</p>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-4"/>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-5">Enable Pre Stay Upsells</label>
            <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.enabled} onChange={(e) => setSetting('enabled', e.target.checked)}/>
          </div>
          <p className="settings-label">You currently have pre-stay upsells {currentSettingsData.enabled ? <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span> : <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>}.</p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Number of Nights to Consider</label>
          <p className="settings-label">HostBuddy will send a message each time there are vacant nights equal to or less than this number.</p>
          <div className="d-flex align-items-center gap-1 mt-1">
            <input style={{width:'100px'}} type="number" className="form-control" value={currentSettingsData.number_of_nights_criteria} onChange={(e) => setSetting('number_of_nights_criteria', e.target.value)}/>
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
          <div className="row mt-1">
            <div className="col-lg-2 col-4">
              <input type="number" className="form-control" value={currentSettingsData.days_before_check_out} onChange={(e) => setSetting('days_before_check_out', e.target.value)}/>
            </div>
            <div className="col-lg-3 col-4" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label className="settings-label" style={{textAlign:"center", margin:"auto"}}>days before guest check-out, at</label>
            </div>
            <div className="col-lg-3 col-4">
              <input type="time" name="st" id="startTime" class="form-control" value={currentSettingsData.time_before_check_out} onChange={(e) => setSetting('time_before_check_out', e.target.value)}/>
            </div>
          </div>
          */}
          {/*
          <div className="row mt-3">
            <label className="fs-6">For reservations after a vacant night, send the message:</label>
          </div>
          */}
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
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Discount Amount</label>
          <p className="settings-label">The discount amount to offer in the upsell message.</p>
          <div className="d-flex flex-column gap-2 mt-1">
            <div className="d-flex align-items-center gap-2">
              <Form.Check type="radio" name="discount_type" label="Percentage:" checked={currentSettingsData.discount_type === 'percentage'} onChange={() => setSetting('discount_type', 'percentage')}/>
              <div className="d-flex align-items-center gap-1">
                <input type="number" className="form-control" style={{width: '100px'}} value={currentSettingsData.discount_percentage} onChange={(e) => setSetting('discount_percentage', e.target.value)} disabled={currentSettingsData.discount_type !== 'percentage'}/>
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
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(`[[${key}]]`)}>{variables[key]}</span>
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
            <textarea id="upsellMessage" className="form-control setting-textarea" value={currentSettingsData.upsell_message} onChange={(e) => setSetting('upsell_message', e.target.value)} />
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
        <p style={{marginTop:'10px'}} className="settings-label text-center">You currently have pre-stay upsells <span style={{color: 'rgb(0, 128, 0)'}}>enabled</span>. Your templated message will send at the scheduled time.</p>
      ) : (
        <p style={{marginTop:'10px'}} className="settings-label text-center">You currently have pre-stay upsells <span style={{color: 'rgb(215, 0, 0)'}}>not enabled</span>. These messages will not be sent.</p>
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

export default PreStayUpsells;
