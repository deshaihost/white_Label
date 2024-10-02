import React from "react";
import Select, { components } from 'react-select';
import customStyles from "../resources/selectStyles";
import { Button, Form } from "react-bootstrap";
import {useState, useEffect, useRef} from "react";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "./Preferences.css";
import "./SettingIndex.css";
import SettingsCalender from "./settingsCalendar";
import { FullScreenLoader } from "../../../../helper/Loader";

/*
default_settings = {
    'emergency_contact_instructions': '',
    'message_signature': '- HostBuddy, our friendly AI assistant',
    'message_signature_enabled': False,
    'defer_behavior': 'defer to team',   // 1) 'contact host' - tell the guest to contact the host at their personal number or some other channel; 2) 'defer to team' - “will check with team and get back to you later”; 3) 'defer to host' - “the host will get back to you”; 4) 'embody host' - “I don’t have that information right now / am not able to do that right now, will check and get back to you later”; 5) 'do not respond'
    'reveal_ai': 'only if asked',   // 'only if asked' or 'never'
    'match_host_tone': False,
    'min_message_delay_minutes': 0, // int, 0-7
    'max_message_delay_minutes': 0  // int, 0-7
}
*/


const AdvancedSettingsIndex = ({allPropertyNamesList}) => {

  const [getSettingsLoading, setGetSettingsLoading] = useState(false);
  const [setSettingsLoading, setSetSettingsLoading] = useState(false);
  const [settingsApiData, setSettingsApiData] = useState({}); // Data retrieved directly from the API, for all settings configs
  const [localSettingsData, setLocalSettingsData] = useState({}); // Live data for what is currently on the UI, for all settings configs
  const [selectedConfig, setSelectedConfig] = useState("default"); // The currently selected config. All users have a "default" config

  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const currentSettingsData = localSettingsData?.[selectedConfig] || {};
  const setCurrentSettingsData = (newData) => {
    setLocalSettingsData({ ...localSettingsData, [selectedConfig]: newData });
  };

  // Set a particular field in the current settings
  const setSetting = (key, value) => {
    if (key === 'min_message_delay_minutes' || key === 'max_message_delay_minutes') {
      value = parseInt(value);
      if (value < 0 || value > 7) {
        return
      }
    }
    setCurrentSettingsData({ ...currentSettingsData, [key]: value });
  }

  // For each config - if there is no schedule data, initialize it with a default schedule.
  // Then set this data in the state.
  const initializeScheduleData = async (apiData) => {
    const dailySchedules = {monday: ['00:00', '23:59'], tuesday: ['00:00', '23:59'], wednesday: ['00:00', '23:59'], thursday: ['00:00', '23:59'], friday: ['00:00', '23:59'], saturday: ['00:00', '23:59'], sunday: ['00:00', '23:59']};
  
    const scheduleDataToSet = {};
  
    for (const key in apiData) {
      if (key !== 'default' && !apiData[key].hasOwnProperty('schedules')) {
        apiData[key]['schedules'] = structuredClone(dailySchedules);
      }
    }
  
    setSettingsApiData(apiData);
    setLocalSettingsData(apiData);
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
        initializeScheduleData(response?.data?.conversation_settings);
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

      const response = await axios.put( `${baseUrl}/set_all_conversation_settings`, { settings:localSettingsData }, config );

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

  const handleConfigSelectChange = (e) => {
    if (e.target.value === "add") {
      const newConfigName = window.prompt("Enter a name for the new config");
      if (newConfigName) {
        const dailySchedules = {monday: ['00:00', '23:59'], tuesday: ['00:00', '23:59'], wednesday: ['00:00', '23:59'], thursday: ['00:00', '23:59'], friday: ['00:00', '23:59'], saturday: ['00:00', '23:59'], sunday: ['00:00', '23:59']};
        let newConfigSettings = { ...structuredClone(settingsApiData.default), schedules: { ...dailySchedules } };
        setLocalSettingsData({ ...localSettingsData, [newConfigName]:newConfigSettings });
        setSelectedConfig(newConfigName);
      }
    } else {
      setSelectedConfig(e.target.value);
      const selectedProperties = localSettingsData[e.target.value]?.properties || [];
      const selectedOptions = selectedProperties.map((propertyName) => ({ value: propertyName, label: propertyName }));
      setSelectedOptions(selectedOptions);
    }
  }

  const handleScheduleClick = (event) => {
    event.preventDefault();
    setShowScheduleModal(true);
  }

  // Given a new schedule object (from the modal): set it as the schedule for the currently selected config
  const setScheduleData = (newScheduleData) => {
    const newSettings = { ...localSettingsData[selectedConfig], schedules:newScheduleData };
    setCurrentSettingsData(newSettings);
  }

  // On page load, call the API to get the settings
  useEffect(() => {
    if (Object.keys(settingsApiData).length === 0) {
      callGetSettingsApi();
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
    <div className="setting_index_tab_grid text-white setting_tab_data border border-primary p-3" style={{ borderRadius: "20px", margin: "20px"}}>
      <div className="conversation-settings-inbox">
        {getSettingsLoading ? <FullScreenLoader /> : null}

        <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-start justify-content-between">
          <div>
            <h3>Conversation Settings</h3>
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
                  <a href="#" style={{marginTop:'10px', fontSize:'16px', display:'block', textAlign:'center'}} onClick={handleScheduleClick}>Configure Timing</a>
                </>
              )}
            </div>
            
          </div>
        </div>

        <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-4"/>

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
            <label className="fs-5">Defer Behavior</label>
            <p className="settings-label">How should HostBuddy respond when it's not able to resolve the guest's issue?</p>
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
            <label className="fs-5">Direct Contact</label>
            <p className="settings-label mb-2">If added, HostBuddy will provide this information to guests in the event of an emergency requiring immediate attention</p>
            <input className="form-control" placeholder="ex. John Doe, (888-123-4567)" value={currentSettingsData.emergency_contact_instructions} onChange={(e) => setSetting('emergency_contact_instructions', e.target.value)}/>
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
            <label className="fs-5">AI Transparency</label>
            <p className="settings-label mb-2">Can HostBuddy communicate that it is an AI assistant?</p>
            <Form.Check type="radio" aria-label="radio1" name="group2" label="Only if directly asked" value="only if asked" checked={currentSettingsData.reveal_ai === 'only if asked'} onChange={(e) => setSetting('reveal_ai', e.target.value)}/>
            <Form.Check type="radio" aria-label="radio2" name="group2" label="Never" value="never" checked={currentSettingsData.reveal_ai === 'never'} onChange={(e) => setSetting('reveal_ai', e.target.value)}/>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <label className="fs-5">Message Delay</label>
            <p className="settings-label mb-2">HostBuddy will delay its response to guests by a (random) number of minutes within this range. To have HostBuddy simply respond as quickly as possible, set min and max delay to 0. Max allowed is 7 minutes.</p>
            <div className="row">
              <div className="col-lg-2">
                <label className="fs-6">Min. Delay</label>
                <input type="number" className="form-control" placeholder="0 mins" value={currentSettingsData.min_message_delay_minutes} onChange={(e) => setSetting('min_message_delay_minutes', e.target.value)}/>
              </div>
              <div className="col-lg-2">
                <label className="fs-6">Max. Delay</label>
                <input type="number" className="form-control" placeholder="0 mins" value={currentSettingsData.max_message_delay_minutes} onChange={(e) => setSetting('max_message_delay_minutes', e.target.value)}/>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12 text-center">
            <Button className="btn-primary fs-16 px-4 rounded-pill" onClick={handleSaveSettings} disabled={Object.keys(settingsApiData).length === 0}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
      <SettingsCalender scheduleData={localSettingsData?.[selectedConfig]?.schedules} setScheduleData={setScheduleData} showSchedule={showScheduleModal} setShowSchedule={setShowScheduleModal}/>
    </div>
  );
};

export default AdvancedSettingsIndex;
