import React from "react";
import { Button, Form } from "react-bootstrap";
import {useState, useEffect} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "./AdvancedSettings.css";

/*
default_settings = {
    'emergency_contact_instructions': '',
    'message_signature': '- HostBuddy, our friendly AI assistant',
    'message_signature_enabled': False,
    'defer_behavior': 'defer to team',   // 1) 'contact host' - tell the guest to contact the host at their personal number or some other channel; 2) 'defer to team' - “will check with team and get back to you later”; 3) 'defer to host' - “the host will get back to you”; 4) 'embody host' - “I don’t have that information right now / am not able to do that right now, will check and get back to you later”; 5) 'do not respond'
    'reveal_ai': 'only if asked',   // 'only if asked' or 'never'
    'match_host_tone': False
}
*/


const AdvancedSettingsIndex = () => {


  const [getSettingsLoading, setGetSettingsLoading] = useState(false);
  const [setSettingsLoading, setSetSettingsLoading] = useState(false);
  const [settingsApiData, setSettingsApiData] = useState({}); // Data retrieved directly from the API, for all settings config
  const [currentSettingsData, setCurrentSettingsData] = useState({}); // Live data for what is currently on the UI, for only the selected config
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config


  // Set a particular field in the current settings
  const setSetting = (key, value) => {
    setCurrentSettingsData({ ...currentSettingsData, [key]: value });
  }


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
  
      const response = await axios.get( `${baseUrl}/get_conversation_settings`, config );
  
      if (response.status === 200) {
        setGetSettingsLoading(false);
        setSettingsApiData(response?.data?.conversation_settings);
        setCurrentSettingsData(response?.data?.conversation_settings?.default);
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

      const response = await axios.put( `${baseUrl}/set_conversation_settings`, { name:'default', settings:currentSettingsData }, config );

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
    callGetSettingsApi();
  }, []);



  return (
    <div className="conversation-settings">
      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between">
        <h3>Conversation Settings</h3>
        <div className="d-flex flex-wrap flex-md-nowrap gap-4 align-items-center">
          <Button className="rounded-pill px-5 text-nowrap fs-14" onClick={handleSaveSettings}>
            Save Settings
          </Button>
          <select className="form-select rounded-pill border-primary text-white shadow-none fs-14 setting-tab-select mb-3 mb-md-0" style={{ backgroundColor: "#000212", backgroundImage: "" }} aria-label="Default select example">
            {Object.keys(settingsApiData).map((key, index) => (
              <option key={index} value={key}>{key}</option>
            ))}
          </select>
        </div>
      </div>

      {/* TODO - support different settings for different properties
      <div className="row mt-4">
        <div className="col-lg-4">
          <label className="mb-1 fs-6">Name</label>
          <input className="form-control border-white fs-14" placeholder="Default setting"/>
        </div>
        <div className="col-lg-4">
          <label className="mb-1 fs-6">Properties</label>
          <select className="form-control rounded-pill border-white shadow-none fs-14 setting-tab-select" style={{ backgroundColor: "#000212", backgroundImage: "" }} aria-label="Default select example">
            <option selected>Default Setting</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
      */}

      <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-5"/>

      <div className="row mt-4">
        <div className="col-lg-8">
          {/*
          <div className="d-flex align-items-center gap-5 mb-1">
            <label className="fs-6">Mirror Host Tone</label>
            <Form.Check type="switch" id="custom-switch" checked/>
          </div>
          <p className="fs-12">HostBuddy will use past conversations to mirror the tone of the host</p>
          */}
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="">
            <label className="fs-5">Defer Behavior</label>
            <p className="settings-label">How should HostBuddy respond when it's not able to resolve the guest's issue?</p>
          </div>
        </div>
      </div>

      <div className="row mt-2">
        <div className="col-lg-3">
          <Form.Check type="radio" aria-label="radio 1" name="group1" label="Defer to host" value="defer to host" checked={currentSettingsData.defer_behavior === 'defer to host'} onChange={(e) => setSetting('defer_behavior', e.target.value)}/>
        </div>
        <div className="col-lg-8">
          <p className="fs-12 text-muted">Ex. "...the host will assist once they're back online..."</p>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-3">
        <Form.Check type="radio" aria-label="radio 2" name="group1" label="Defer to team" value="defer to team" checked={currentSettingsData.defer_behavior === 'defer to team'} onChange={(e) => setSetting('defer_behavior', e.target.value)}/>
        </div>
        <div className="col-lg-8">
          <p className="fs-12 text-muted">Ex. "...I'll have to check with the team..."</p>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-3">
          <Form.Check type="radio" aria-label="radio 3" name="group1" label="Embody host" value="embody host" checked={currentSettingsData.defer_behavior === 'embody host'} onChange={(e) => setSetting('defer_behavior', e.target.value)}/>
        </div>
        <div className="col-lg-8">
          <p className="fs-12 text-muted">Ex. "...I will check and get back to you..."</p>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-3">
          <Form.Check type="radio" aria-label="radio 4" name="group1" label="Share direct contact" value="contact host" checked={currentSettingsData.defer_behavior === 'contact host'} onChange={(e) => setSetting('defer_behavior', e.target.value)}/>
        </div>
        <div className="col-lg-8">
          <p className="fs-12 text-muted">Ex. "...please contact the host at..."</p>
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-lg-3">
          <Form.Check type="radio" aria-label="radio 4" name="group1" label="Do not respond" value="do not respond" checked={currentSettingsData.defer_behavior === 'do not respond'} onChange={(e) => setSetting('defer_behavior', e.target.value)}/>
        </div>
      </div>      

      <div className="row mt-5">
        <div className="col-lg-11">
          <div className="">
            <label className="fs-5">Direct Contact</label>
            <p className="settings-label mb-2">If added, HostBuddy will provide this information to guests in the event of an emergency requiring immediate attention</p>
            <input className="form-control" placeholder="ex. John Doe, (888-123-4567)" value={currentSettingsData.emergency_contact_instructions} onChange={(e) => setSetting('emergency_contact_instructions', e.target.value)}/>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11">
          <div className="d-flex align-items-center gap-5 mt-4">
          <label className="fs-5">Use Signature</label>
          <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.message_signature_enabled} onChange={(e) => setSetting('message_signature_enabled', e.target.checked)}/>
        </div>
        <p className="settings-label">If enabled, HostBuddy will append this to the end of each of its messages.</p>
        <textarea className="form-control setting-textarea" placeholder="" rows={1} value={currentSettingsData.message_signature} onChange={(e) => setSetting('message_signature', e.target.value)} disabled={!currentSettingsData.message_signature_enabled}/>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-lg-11">
          <label className="fs-5">Al Transparency</label>
          <p className="settings-label mb-2">Can HostBuddy communicate that it is an AI assistant?</p>
          <div className="">
            <Form.Check type="radio" aria-label="radio1" name="group2" label="Only if directly asked" value="only if asked" checked={currentSettingsData.reveal_ai === 'only if asked'} onChange={(e) => setSetting('reveal_ai', e.target.value)}/>
          </div>
          <div className="">
            <Form.Check type="radio" aria-label="radio2" name="group2" label="Never" value="never" checked={currentSettingsData.reveal_ai === 'never'} onChange={(e) => setSetting('reveal_ai', e.target.value)}/>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-12 text-center">
          <Button className="btn-primary fs-16 px-4 rounded-pill" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsIndex;
