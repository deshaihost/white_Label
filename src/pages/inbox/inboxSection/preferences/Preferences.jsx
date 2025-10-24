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
import { useSelector } from "react-redux";
import { getSubscriptionStatus } from '../../../../helper/Authorized';
import { useNavigate } from "react-router-dom";

/*
default_settings = {
    'emergency_contact_instructions': '',
    'message_signature': '- HostBuddy, our friendly AI assistant',
    'message_signature_enabled': False,
    'defer_behavior': 'defer to team',   // 1) 'contact host' - tell the guest to contact the host at their personal number or some other channel; 2) 'defer to team' - "will check with team and get back to you later"; 3) 'defer to host' - "the host will get back to you"; 4) 'embody host' - "I don't have that information right now / am not able to do that right now, will check and get back to you later"; 5) 'do not respond'
    'reveal_ai': 'only if asked',   // 'only if asked' or 'never'
    'language': 'guest_language',  // 'guest_language' for HB to respond in whichever language the guest is speaking, OR the name of whichever language HB should always use
    'stop_responding_on_negative_sentiment': False,
    'match_host_tone': False,
    'min_message_delay_minutes': 0, // int, 0-8
    'max_message_delay_minutes': 0,  // int, 0-8
    'convo_closing': 'can_close',  // 'can_close' or 'always_respond'
    'tone_instructions': '',  // optional instructions for customizing tone
}
*/


const AdvancedSettingsIndex = ({allPropertyNamesList}) => {

  const navigate = useNavigate();
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

  // Add a new state to track the language input value separately
  const [languageInputValue, setLanguageInputValue] = useState('');

  // Initialize the language input value when settings are loaded
  useEffect(() => {
    if (currentSettingsData && currentSettingsData.language && currentSettingsData.language !== 'guest_language') {
      setLanguageInputValue(currentSettingsData.language);
    }
  }, [currentSettingsData?.language]);

  // Set a particular field in the current settings
  const setSetting = (key, value) => {
    if (key === 'min_message_delay_minutes' || key === 'max_message_delay_minutes') {
      value = parseInt(value);
      if (value < 0 || value > 720) {
        return
      }
    } else if (key === 'tone_instructions' && value.length > 1000) {
      value = value.substring(0, 1000);
    } else if (key === 'message_signature' && value.length > 500) {
      value = value.substring(0, 500);
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
    // If custom language is selected but no language is specified, show a warning and abort
    if (localSettingsData[selectedConfig]?.language !== undefined && 
        localSettingsData[selectedConfig]?.language !== 'guest_language' &&
        (!localSettingsData[selectedConfig]?.language || localSettingsData[selectedConfig]?.language.trim() === '')) {
      ToastHandle("Please enter a language", "danger");
      return;
    }
    
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

  const handleUpgradeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '/setting/subscription';
  };

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

  const options = allPropertyNamesList ? allPropertyNamesList.map((propertyName) => ({ value:propertyName, label:propertyName })) : null;

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

  const store = useSelector((state) => state);
  const userData = store?.getUserDataReducer?.getUserData?.data?.user;
  const planRaw = getSubscriptionStatus(userData).plan || '';
  const plan = planRaw.toLowerCase();
  console.log('DEBUG planRaw:', planRaw, 'plan:', plan, 'userData:', userData);
  const isDelayEditable = plan.includes('elite') || plan.includes('ultimate') || plan.includes('trial');
  const isToneEditable = plan.includes('elite') || plan.includes('ultimate') || plan.includes('trial');

  return (
    <div className="setting_index_tab_grid text-white setting_tab_data p-3" style={{ margin: "40px 60px "}}>
      <div className="conversation-settings-inbox">
        {getSettingsLoading ? <FullScreenLoader /> : null}

        <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-start justify-content-between">
          <div>
            <h3>Conversation Settings</h3>
          </div>
          <div>
            <div className={`d-flex flex-wrap flex-md-nowrap gap-4 align-items-center ${!options ? 'justify-content-end' : ''}`}>
              <Button 
                className="btn-primary save-settings-btn" 
                style={{ 
                  padding: '10px 24px', 
                  borderRadius: '5px', 
                  backgroundColor: '#3e88f7', 
                  borderColor: '#3e88f7', 
                  borderWidth: '1px', 
                  borderStyle: 'solid', 
                  whiteSpace: 'nowrap',
                  fontSize: '15px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: '600',
                  fontVariationSettings: "'opsz' 14"
                }} 
                onClick={handleSaveSettings} 
                disabled={Object.keys(settingsApiData).length === 0}
              >
                Save Settings
              </Button>
            
              {options && (
                <select 
                  className="form-select text-white shadow-none setting-tab-select mb-3 mb-md-0" 
                  style={{ 
                    backgroundColor: "#0F1117", 
                    backgroundImage: "",
                    border: "1px solid #013280",
                    borderRadius: "8px",
                    padding: "10px 24px",
                    fontSize: "15px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: "600",
                    minWidth: "140px"
                  }} 
                  aria-label="Default select example" 
                  value={selectedConfig} 
                  onChange={handleConfigSelectChange}
                >
                  {Object.keys(localSettingsData).map((key, index) => (
                    <option key={index} value={key}>{key}</option>              
                  ))}
                  <option value="add">+ New Config</option>
                </select>
              )}
            </div>

            <div style={{marginTop:"10px"}}>
              {(selectedConfig === "default") || !options ? (
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

        {/* <hr style={{ backgroundColor: 'white', height: '2px', border: 'none' }} className="mt-4"/> */}

        <div style={{ borderTop: '1px solid #013280', marginBottom: '40px' }} className="mt-4"></div>

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
            <input 
              className="form-control direct-contact-input" 
              placeholder="ex. John Doe, (888-123-4567)" 
              value={currentSettingsData.emergency_contact_instructions} 
              onChange={(e) => setSetting('emergency_contact_instructions', e.target.value)}
              style={{
                backgroundColor: '#0F1117',
                border: '1px solid #013280',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '15px',
                fontFamily: "'DM Sans', sans-serif",
                fontVariationSettings: "'opsz' 14"
              }}
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <div className="d-flex align-items-center gap-5 mt-4">
              <label className="fs-5">Use Signature</label>
              <div className="d-flex align-items-center gap-2">
                <Form.Check type="switch" id="custom-switch" className="custom-switch" checked={currentSettingsData.message_signature_enabled} onChange={(e) => setSetting('message_signature_enabled', e.target.checked)}/>
                <span className="switch-label" style={{color:currentSettingsData.message_signature_enabled ? 'rgb(0, 180, 0)' : '#888'}}>
                  {currentSettingsData.message_signature_enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <p className="settings-label">If enabled, HostBuddy will append this to the end of each of its messages.</p>
            <textarea 
              className="form-control setting-textarea signature-textarea" 
              placeholder="" 
              rows={1} 
              value={currentSettingsData.message_signature} 
              onChange={(e) => setSetting('message_signature', e.target.value)} 
              disabled={!currentSettingsData.message_signature_enabled} 
              maxLength={500}
              style={{
                backgroundColor: '#0F1117',
                border: '1px solid #013280',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '15px',
                fontFamily: "'DM Sans', sans-serif",
                fontVariationSettings: "'opsz' 14"
              }}
            />
            {/* <small className="text-muted">{(currentSettingsData.message_signature?.length || 0)}/500 characters</small> */}
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <label className="fs-5">Conversation Closing</label>
            <p className="settings-label mb-2">Can HostBuddy choose not to respond if it determines that a conversation is at its natural end?</p>
            <Form.Check type="radio" aria-label="radio1" name="group2" label="Yes, HostBuddy can let conversations close when appropriate" value="can_close" checked={!currentSettingsData?.convo_closing || currentSettingsData.convo_closing === 'can_close'} onChange={(e) => setSetting('convo_closing', e.target.value)}/>
            <Form.Check type="radio" aria-label="radio2" name="group2" label="No, HostBuddy should always be the last to respond" value="always_respond" checked={currentSettingsData?.convo_closing === 'always_respond'} onChange={(e) => setSetting('convo_closing', e.target.value)}/>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <label className="fs-5">AI Transparency</label>
            <p className="settings-label mb-2">Can HostBuddy communicate that it is an AI assistant?</p>
            <Form.Check type="radio" aria-label="radio1" name="group3" label="Only if directly asked" value="only if asked" checked={currentSettingsData.reveal_ai === 'only if asked'} onChange={(e) => setSetting('reveal_ai', e.target.value)}/>
            <Form.Check type="radio" aria-label="radio2" name="group3" label="Never" value="never" checked={currentSettingsData.reveal_ai === 'never'} onChange={(e) => setSetting('reveal_ai', e.target.value)}/>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <label className="fs-5">Language</label>
            <p className="settings-label mb-2">What language should HostBuddy use when responding to guests?</p>
            <Form.Check 
              type="radio" 
              aria-label="radio1" 
              name="group4" 
              label="Whichever language the guest is using" 
              value="guest_language" 
              checked={currentSettingsData.language === undefined || currentSettingsData.language === 'guest_language'} 
              onChange={(e) => setSetting('language', e.target.value)}
            />
            <div className="d-flex align-items-center gap-2">
              <Form.Check 
                type="radio" 
                aria-label="radio2" 
                name="group4" 
                label="Always respond in:" 
                value="specific_language" 
                checked={currentSettingsData.language !== undefined && currentSettingsData.language !== 'guest_language'} 
                onChange={() => {
                  setSetting('language', languageInputValue || '');
                }}
              />
              <input 
                className="form-control language-input" 
                placeholder="ex. English" 
                value={languageInputValue}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setLanguageInputValue(newValue);
                  
                  // Only update the setting if the specific language option is selected
                  if (currentSettingsData.language !== undefined && currentSettingsData.language !== 'guest_language') {
                    setSetting('language', newValue);
                  }
                }}
                onClick={() => {
                  // Auto-select the specific language option when clicking on the input
                  if (currentSettingsData.language === undefined || currentSettingsData.language === 'guest_language') {
                    setSetting('language', languageInputValue || '');
                  }
                }}
                style={{
                  width: '300px',
                  backgroundColor: '#0F1117',
                  border: '1px solid #013280',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: 'white',
                  fontSize: '15px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontVariationSettings: "'opsz' 14",
                  opacity: currentSettingsData.language === undefined || currentSettingsData.language === 'guest_language' ? 0.6 : 1
                }}
              />
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <div className="d-flex align-items-center gap-5">
              <label className="fs-5">Stop Responding When Sentiment Turns Negative</label>
              <div className="d-flex align-items-center gap-2">
                <Form.Check type="switch" id="negative-sentiment-switch" className="custom-switch" checked={currentSettingsData?.stop_responding_on_negative_sentiment} onChange={(e) => setSetting('stop_responding_on_negative_sentiment', e.target.checked)}/>
                <span className="switch-label" style={{color: currentSettingsData?.stop_responding_on_negative_sentiment ? 'rgb(0, 180, 0)' : '#888'}}>
                  {currentSettingsData?.stop_responding_on_negative_sentiment ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
            <p className="settings-label mb-2">If enabled, HostBuddy will stop responding to a guest and let you take over if their sentiment turns negative. An action item will be generated when this happens - make sure you have <a href='https://userguide.hostbuddy.ai/settings/notifications' target='_blank' style={{color:'#146ef5', fontSize:'14px'}}>notifications set up</a> so you're alerted! If HostBuddy stops responding to a guest, you can re-enable responses on the Inbox page.</p>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <div className="d-flex align-items-center gap-2">
              { !isDelayEditable && (
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle', position:'relative', top:'2px'}}><g clipPath="url(#clip0_4408_17872)"><path d="M5.625 5.625V7.5H11.875V5.625C11.875 3.89844 10.4766 2.5 8.75 2.5C7.02344 2.5 5.625 3.89844 5.625 5.625ZM3.125 7.5V5.625C3.125 2.51953 5.64453 0 8.75 0C11.8555 0 14.375 2.51953 14.375 5.625V7.5H15C16.3789 7.5 17.5 8.62109 17.5 10V17.5C17.5 18.8789 16.3789 20 15 20H2.5C1.12109 20 0 18.8789 0 17.5V10C0 8.62109 1.12109 7.5 2.5 7.5H3.125Z" fill="#FF9F00"/></g><defs><clipPath id="clip0_4408_17872"><rect width="17.5" height="20" fill="white"/></clipPath></defs></svg>
              )}
              <label className="fs-5 mb-0">Message Delay</label>
              { !isDelayEditable && (
                <span style={{color:'#5498FF', fontWeight:'bold', fontSize:'17px', cursor:'pointer', marginLeft:'6px'}} onClick={handleUpgradeClick}>Upgrade</span>
              )}
            </div>
            <p className="settings-label mb-2">HostBuddy will delay its response to guests by a (random) number of minutes within this range. To have HostBuddy simply respond as quickly as possible, set min and max delay to 0.</p>
            <div className="row">
              <div className="col-lg-3">
                <label className="fs-6">Min. Delay</label>
                <input 
                  type="number" 
                  className="form-control delay-input" 
                  placeholder="0 mins" 
                  value={currentSettingsData.min_message_delay_minutes} 
                  onChange={(e) => setSetting('min_message_delay_minutes', e.target.value)} 
                  disabled={!isDelayEditable}
                  style={{
                    backgroundColor: '#0F1117',
                    border: '1px solid #013280',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontVariationSettings: "'opsz' 14"
                  }}
                />
              </div>
              <div className="col-lg-3">
                <label className="fs-6">Max. Delay</label>
                <input 
                  type="number" 
                  className="form-control delay-input" 
                  placeholder="0 mins" 
                  value={currentSettingsData.max_message_delay_minutes} 
                  onChange={(e) => setSetting('max_message_delay_minutes', e.target.value)} 
                  disabled={!isDelayEditable}
                  style={{
                    backgroundColor: '#0F1117',
                    border: '1px solid #013280',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: "'DM Sans', sans-serif",
                    fontVariationSettings: "'opsz' 14"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-lg-11">
            <div className="d-flex align-items-center gap-2 mt-4">
              { !isToneEditable && (
                <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'6px', display:'inline-block', verticalAlign:'middle', position:'relative', top:'2px'}}><g clipPath="url(#clip0_4408_17872)"><path d="M5.625 5.625V7.5H11.875V5.625C11.875 3.89844 10.4766 2.5 8.75 2.5C7.02344 2.5 5.625 3.89844 5.625 5.625ZM3.125 7.5V5.625C3.125 2.51953 5.64453 0 8.75 0C11.8555 0 14.375 2.51953 14.375 5.625V7.5H15C16.3789 7.5 17.5 8.62109 17.5 10V17.5C17.5 18.8789 16.3789 20 15 20H2.5C1.12109 20 0 18.8789 0 17.5V10C0 8.62109 1.12109 7.5 2.5 7.5H3.125Z" fill="#FF9F00"/></g><defs><clipPath id="clip0_4408_17872"><rect width="17.5" height="20" fill="white"/></clipPath></defs></svg>
              )}
              <label className="fs-5 mb-0">Customize Tone</label>
              { !isToneEditable && (
                <span style={{color:'#5498FF', fontWeight:'bold', fontSize:'17px', cursor:'pointer', marginLeft:'6px'}} onClick={handleUpgradeClick}>Upgrade</span>
              )}
            </div>
            <p className="settings-label">You can customize HostBuddy's responses by adding some instructions here to direct HostBuddy's tone. Make sure to test after you make changes here!</p>
            <p className="settings-label">HostBuddy is already optimized for friendly, hospitable conversation, so this is completely optional.</p>
            <textarea 
              className="form-control setting-textarea tone-textarea" 
              placeholder="(Optional) Add instructions to direct HostBuddy's tone..." 
              rows={1} 
              value={currentSettingsData.tone_instructions || ''} 
              onChange={(e) => setSetting('tone_instructions', e.target.value)} 
              maxLength={1000} 
              disabled={!isToneEditable}
              style={{
                backgroundColor: '#0F1117',
                border: '1px solid #013280',
                borderRadius: '8px',
                padding: '12px 16px',
                color: 'white',
                fontSize: '15px',
                fontFamily: "'DM Sans', sans-serif",
                fontVariationSettings: "'opsz' 14"
              }}
            />
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
      <SettingsCalender scheduleData={localSettingsData?.[selectedConfig]?.schedules} setScheduleData={setScheduleData} showSchedule={showScheduleModal} setShowSchedule={setShowScheduleModal}/>
    </div>
  );
};

export default AdvancedSettingsIndex;
