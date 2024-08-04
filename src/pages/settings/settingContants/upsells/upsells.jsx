import React from "react";
import { Button, Form } from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "./upsells.css";

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


const UpsellsIndex = () => {


  const [getSettingsLoading, setGetSettingsLoading] = useState(false);
  const [setSettingsLoading, setSetSettingsLoading] = useState(false);
  const [settingsApiData, setSettingsApiData] = useState({}); // Data retrieved directly from the API, for all settings config
  const [currentSettingsData, setCurrentSettingsData] = useState({}); // Live data for what is currently on the UI, for only the selected config
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config

  const variables = {'guest_name':'Guest name', 'price_before_discount':'Price before discount', 'price_after_discount':'Price after discount', 'discount_percentage':'Discount percentage', 'absolute_discount':'Total discount amount', 'num_days_available':'Number of days available', 'before_or_after':'Before or after'};


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


  // Call the API to get all the user's settings
  const callGetSettingsApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetSettingsLoading(true);
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
  
      const response = await axios.get( `${baseUrl}/get_vacant_night_settings`, config );
  
      if (response.status === 200) {
        setGetSettingsLoading(false);
        setSettingsApiData(response?.data?.vacant_night_settings);
        setCurrentSettingsData(response?.data?.vacant_night_settings?.default);
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle("An error occurred", "danger");
    } finally {
      setGetSettingsLoading(false);
    }
  }


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

      const response = await axios.put( `${baseUrl}/set_vacant_night_settings`, { name:'default', settings:currentSettingsData }, config );

      if (response.status === 200) {
        ToastHandle("Settings saved successfully", "success");
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle("An error occurred", "danger");
    } finally {
      setSetSettingsLoading(false);
    }
  }


  // On save button click, call the API to save the settings
  const handleSaveSettings = () => {
    callSaveSettingsApi();
  }


  // On page load, call the API to get the settings
  useEffect(() => {
    if (Object.keys(settingsApiData).length === 0) {
      callGetSettingsApi();
    }
  }, []);



  return (
    <div className="upsells-settings">
      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
        <h3>Vacant Night Upsells</h3>
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

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-5">Enable Vacant Night Upsells</label>
            <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.enabled} onChange={(e) => setSetting('enabled', e.target.checked)}/>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Number of Nights to Consider</label>
          <p className="settings-label">The maximum number of consecutive vacant nights that will trigger an upsell message.</p>
          <div className="d-flex align-items-center gap-1 mt-1">
            <input style={{width:'100px'}} type="number" className="form-control" value={currentSettingsData.number_of_nights_criteria} onChange={(e) => setSetting('number_of_nights_criteria', e.target.value)}/>
          </div>
        </div>
      </div>
      
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

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Upsell Timing</label>
          <p className="settings-label mb-2">When should HostBuddy send the upsell message when there is a vacant night?</p>
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
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11 col-12">
          <label className="fs-5">Discount Amount</label>
          <p className="settings-label">The discount amount to offer in the upsell message.</p>
          <div className="d-flex flex-column gap-2 mt-1">
            <div className="d-flex align-items-center gap-2">
              <Form.Check type="radio" name="discount_type" label="Use percentage:" checked={currentSettingsData.discount_type === 'percentage'} onChange={() => setSetting('discount_type', 'percentage')}/>
              <div className="d-flex align-items-center gap-1">
                <input type="number" className="form-control" style={{width: '100px'}} value={currentSettingsData.discount_percentage} onChange={(e) => setSetting('discount_percentage', e.target.value)} disabled={currentSettingsData.discount_type !== 'percentage'}/>
                <label className="fs-6">%</label>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Form.Check type="radio" name="discount_type" label="Use absolute discount:" checked={currentSettingsData.discount_type === 'absolute'} onChange={() => setSetting('discount_type', 'absolute')}/>
              <input type="number" className="form-control" style={{width: '100px'}} value={currentSettingsData.discount_absolute} onChange={(e) => setSetting('discount_absolute', e.target.value)} disabled={currentSettingsData.discount_type !== 'absolute'}/>
              <label className="fs-6">per night</label>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <h3 className="available-variables-heading mt-5 text-center">Upsell Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
        <label className="fs-5">Available Variables</label>
        <p className="settings-label">Use these to make sure your message is fully tailored to each reservation. Click to add to your upsell message.</p>
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
    </div>
  );
};

export default UpsellsIndex;
