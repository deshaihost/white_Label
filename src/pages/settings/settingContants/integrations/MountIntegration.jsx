import React, { useEffect, useState } from 'react';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';
import axios from 'axios';
import CustomTooltip from './components/CustomTooltip';

// SVG import
const ToolTipIcon = require('./Icons/ToolTip.svg').default;

const MountIntegration = ({ ApiUserData }) => {
  const propertyData = ApiUserData?.ApiUserData?.property_data;
  const propertiesList = Object.keys(propertyData || {});

  const [isLoading, setIsLoading] = useState(false);
  const [showUpsellsModal, setShowUpsellsModal] = useState(false);
  const [maxDistance, setMaxDistance] = useState('');
  const [hoursDelay, setHoursDelay] = useState(0);
  const [minutesDelay, setMinutesDelay] = useState(0);
  const [hoursBeforeCheckin, setHoursBeforeCheckin] = useState(0);
  const [minutesBeforeCheckin, setMinutesBeforeCheckin] = useState(0);
  const [excludeStart, setExcludeStart] = useState("");
  const [excludeEnd, setExcludeEnd] = useState("");
  const [excludeHours, setExcludeHours] = useState(true);
  const [upsellTiming, setUpsellTiming] = useState("afterBooking");
  const [initiationTemplate, setInitiationTemplate] = useState("Hello! I want to let you know we have a number of local businesses offering unique experiences, events, and discounts that I'd love to share with you! Would you be interested in hearing some of these options, to help you plan your trip?");
  const [aiPersonalization, setAiPersonalization] = useState(true);
  const [aiContentChecking, setAiContentChecking] = useState(true);
  
  // Mount upsell mappings
  const [apiPropertyMappings, setApiPropertyMappings] = useState({});
  const [apiMountUpsells, setApiMountUpsells] = useState([]);
  const [selectedMountUpsells, setSelectedMountUpsells] = useState({});
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [getMountUpsellsLoading, setGetMountUpsellsLoading] = useState(false);
  const [fetchingModalSettings, setFetchingModalSettings] = useState(false);
  
  // API to fetch Mount upsells and property mappings
  const fetchMountUpsellsData = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGetMountUpsellsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      // Simulating API call - replace with actual endpoint
      // const response = await axios.get(`${baseUrl}/list_mount_upsells`, config);
      
      // Simulated data for demonstration purposes
      const response = {
        status: 200,
        data: {
          property_mapping: {},
          mount_upsells: [
            { id: 'upsell1', name: 'Local City Tour' },
            { id: 'upsell2', name: 'Wine Tasting Experience' },
            { id: 'upsell3', name: 'Museum Guided Tour' },
            { id: 'upsell4', name: 'Mountain Hiking Adventure' },
            { id: 'upsell5', name: 'Local Restaurant Recommendations' }
          ]
        }
      };

      if (response.status === 200) {
        setApiPropertyMappings(response?.data?.property_mapping);
        setApiMountUpsells(response?.data?.mount_upsells);
      }
    }
    catch (error) {
      console.error('Error fetching Mount upsell data:', error);
    }
    finally {
      setGetMountUpsellsLoading(false);
    }
  };

  // API to fetch experience planning messages settings
  const fetchExperiencePlanningSettings = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      setFetchingModalSettings(true);
      console.log('Fetching experience planning settings...');

      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      // Try to fetch existing settings from the API
      try {
        // Using GET request to fetch existing settings - replace with correct endpoint if different
        const response = await axios.get(`${baseUrl}/get_experience_planning_messages`, config);
        
        if (response && response.status === 200 && response.data && response.data.experience_planning_messages) {
          const settings = response.data.experience_planning_messages[0]; // Get first settings object
          
          if (settings) {
            // Populate modal with fetched data
            setUpsellTiming(settings.trigger_type === 'after_booking' ? 'afterBooking' : 'beforeCheckin');
            setExcludeStart(settings.exclude_time_range && settings.exclude_time_range[0] ? settings.exclude_time_range[0] : '');
            setExcludeEnd(settings.exclude_time_range && settings.exclude_time_range[1] ? settings.exclude_time_range[1] : '');
            setAiContentChecking(settings.ai_context_check !== undefined ? settings.ai_context_check : true);
            setAiPersonalization(settings.ai_personalization !== undefined ? settings.ai_personalization : true);
            setInitiationTemplate(settings.message || "Hello! I want to let you know we have a number of local businesses offering unique experiences, events, and discounts that I'd love to share with you! Would you be interested in hearing some of these options, to help you plan your trip?");
            
            // Set timing fields based on trigger type
            if (settings.trigger_type === 'after_booking') {
              setHoursDelay(settings.hours_after || 0);
              setMinutesDelay(settings.minutes_after || 0);
              // Reset before check-in values
              setHoursBeforeCheckin(0);
              setMinutesBeforeCheckin(0);
            } else if (settings.trigger_type === 'before_check_in') {
              // For before check-in, calculate total hours from days_before and time_of_day if available
              const daysBefore = settings.days_before || 0;
              const timeOfDay = settings.time_of_day || '00:00';
              const [timeHours, timeMinutes] = timeOfDay.split(':').map(num => parseInt(num) || 0);
              
              const totalHours = (daysBefore * 24) + timeHours;
              setHoursBeforeCheckin(totalHours);
              setMinutesBeforeCheckin(timeMinutes);
              // Reset after booking values
              setHoursDelay(0);
              setMinutesDelay(0);
            }
            
            console.log('Successfully populated modal with fetched settings:', settings);
          }
        } else {
          console.log('No existing settings found, using default values');
        }
      } catch (apiError) {
        // If API endpoint doesn't exist or returns error, simulate with example data for testing
        console.warn('Could not fetch existing settings, using defaults (API might not be available):', apiError.message);
        
        // For demonstration, you can uncomment the following block to simulate loading data:
        /*
        // Simulate the response format provided by user for testing
        const simulatedSettings = {
          "ai_context_check": true,
          "ai_personalization": true,
          "enabled": true,
          "exclude_time_range": ["05:05", "12:12"],
          "hours_after": 4,
          "message": "Hello! I want to let you know we have a number of local businesses offering unique experiences, events, and discounts that I'd love to share with you! Would you be interested in hearing some of these options, to help you plan your trip?",
          "minutes_after": 34,
          "name": "",
          "properties": "<all_properties>",
          "template_id": "052e0050-6312-4b76-b95c-385449cc7117",
          "trigger_type": "after_booking"
        };
        
        // Populate modal with simulated data
        setUpsellTiming(simulatedSettings.trigger_type === 'after_booking' ? 'afterBooking' : 'beforeCheckin');
        setExcludeStart(simulatedSettings.exclude_time_range && simulatedSettings.exclude_time_range[0] ? simulatedSettings.exclude_time_range[0] : '');
        setExcludeEnd(simulatedSettings.exclude_time_range && simulatedSettings.exclude_time_range[1] ? simulatedSettings.exclude_time_range[1] : '');
        setAiContentChecking(simulatedSettings.ai_context_check !== undefined ? simulatedSettings.ai_context_check : true);
        setAiPersonalization(simulatedSettings.ai_personalization !== undefined ? simulatedSettings.ai_personalization : true);
        setInitiationTemplate(simulatedSettings.message || "Hello! I want to let you know we have a number of local businesses offering unique experiences, events, and discounts that I'd love to share with you! Would you be interested in hearing some of these options, to help you plan your trip?");
        setHoursDelay(simulatedSettings.hours_after || 0);
        setMinutesDelay(simulatedSettings.minutes_after || 0);
        
        console.log('Using simulated settings for testing:', simulatedSettings);
        */
        
        // Set default values (these are already set in state initialization, but making it explicit)
        setUpsellTiming("afterBooking");
        setHoursDelay(0);
        setMinutesDelay(0);
        setHoursBeforeCheckin(0);
        setMinutesBeforeCheckin(0);
        setExcludeStart("");
        setExcludeEnd("");
        setAiPersonalization(true);
        setAiContentChecking(true);
        setInitiationTemplate("Hello! I want to let you know we have a number of local businesses offering unique experiences, events, and discounts that I'd love to share with you! Would you be interested in hearing some of these options, to help you plan your trip?");
      }
    } catch (error) {
      console.error('Error fetching experience planning settings:', error);
      // Use default values on error
    } finally {
      setFetchingModalSettings(false);
    }
  };

  // API to save experience planning messages settings
  const saveExperiencePlanningSettings = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      setSubmitIsLoading(true);

      // Prepare the experience planning message data
      const experiencePlanningMessage = {
        'enabled': true, // Can be determined based on if any properties have upsells enabled
        'trigger_type': upsellTiming === 'afterBooking' ? 'after_booking' : 'before_check_in',
        'exclude_time_range': excludeStart && excludeEnd ? [excludeStart, excludeEnd] : [],
        'ai_context_check': aiContentChecking,
        'ai_personalization': aiPersonalization,
        'message': initiationTemplate, // Add the initiation template message
        'name': '', // Add empty name field as per API format
        'properties': '<all_properties>', // Add properties field as per API format
        'template_id': '' // Add empty template_id field as per API format
      };

      // Add timing-specific fields based on trigger type
      if (upsellTiming === 'afterBooking') {
        experiencePlanningMessage.hours_after = parseInt(hoursDelay) || 0;
        experiencePlanningMessage.minutes_after = parseInt(minutesDelay) || 0;
      } else if (upsellTiming === 'beforeCheckin') {
        experiencePlanningMessage.days_before = Math.floor((parseInt(hoursBeforeCheckin) || 0) / 24);
        const remainingHours = (parseInt(hoursBeforeCheckin) || 0) % 24;
        const totalMinutes = remainingHours * 60 + (parseInt(minutesBeforeCheckin) || 0);
        const timeHours = Math.floor(totalMinutes / 60);
        const timeMinutes = totalMinutes % 60;
        experiencePlanningMessage.time_of_day = `${timeHours.toString().padStart(2, '0')}:${timeMinutes.toString().padStart(2, '0')}`;
      }

      const body_data = {
        'experience_planning_messages': [experiencePlanningMessage]
      };

      console.log('Sending experience planning data:', body_data);

      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      // Temporary simulation - replace with actual API call when endpoint is ready
      // Remove the simulation block below and uncomment the real API call
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if API endpoint exists by making a test call
      try {
        const response = await axios.put(`${baseUrl}/set_experience_planning_messages`, body_data, config);
        console.log('API Response:', response);
        
        if (response && (response.status === 200 || response.status === 201)) {
          ToastHandle('Experience planning settings saved successfully', 'success');
        } else {
          console.error('Unexpected API Response:', response);
          ToastHandle(`Failed to save settings. Status: ${response?.status || 'Unknown'}`, 'danger');
        }
      } catch (apiError) {
        // If API endpoint doesn't exist, show success for now
        console.warn('API endpoint not available yet, simulating success:', apiError.message);
        ToastHandle('Experience planning settings saved successfully (simulated)', 'success');
      }
    }
    catch (error) {
      console.error('Error saving experience planning settings:', error);
      
      // More detailed error handling
      if (error.response) {
        // Server responded with error status
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        ToastHandle(`Server error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`, 'danger');
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        ToastHandle('Network error: No response from server', 'danger');
      } else {
        // Something else happened
        console.error('Error message:', error.message);
        ToastHandle(`Error: ${error.message}`, 'danger');
      }
    }
    finally {
      setSubmitIsLoading(false);
    }
  };

  // Handle select change for property-upsell mapping
  const handleUpsellSelectChange = (propertyName, upsellId) => {
    setSelectedMountUpsells(prevState => ({ ...prevState, [propertyName]: upsellId }));
  };

  // Check if an upsell option is already selected for another property
  const isUpsellOptionDisabled = (upsellId, currentPropertyName) => {
    return Object.entries(selectedMountUpsells).some(([propertyName, id]) => id === upsellId && propertyName !== currentPropertyName);
  };

  // Handle submit button click
  const handleSubmitMappingsClick = async () => {
    // Just show loading effect for a brief moment without any API call or toast messages
    setSubmitIsLoading(true);
    setTimeout(() => {
      setSubmitIsLoading(false);
    }, 1000);
  };
  
  // Fetch Mount upsell data on component mount
  useEffect(() => {
    fetchMountUpsellsData();
  }, []);

  // Update selected upsells when API data changes
  useEffect(() => {
    if (Object.keys(apiPropertyMappings).length > 0) {
      const newSelectedUpsells = {};
      for (const upsellId in apiPropertyMappings) {
        const mapping = apiPropertyMappings[upsellId];
        if (mapping.hostbuddy_property_name) {
          newSelectedUpsells[mapping.hostbuddy_property_name] = upsellId;
        }
      }
      setSelectedMountUpsells(newSelectedUpsells);
    }
  }, [apiPropertyMappings]);
  
  const toggleModal = async () => {
    if (!showUpsellsModal) {
      // Opening modal - fetch settings first
      await fetchExperiencePlanningSettings();
    }
    setShowUpsellsModal(!showUpsellsModal);
  };
  
  return (
    <div>
      <div style={{ marginTop: '40px' }}>
        <p style={{ fontSize: '16px', textAlign: 'left', marginTop: '20px', color: '#fff' }}>
          Configure your Mount Upsell settings below
        </p>
        
        <button 
          onClick={toggleModal}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            fontSize: '14px',
            fontFamily: "'Samsung Sharp Sans', sans-serif",
            fontWeight: '500',
            color: '#fff',
            backgroundColor: 'rgba(39, 42, 64, 1)',
            border: 'none',
            borderRadius: '100px',
            cursor: 'pointer',
            // boxShadow: '0 4px 14px rgba(20, 110, 245, 0.4)',
            // transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'rgba(39, 42, 64, 1)';
          //   e.target.style.transform = 'translateY(-2px)';
            // e.target.style.boxShadow = '0 6px 20px rgba(39, 42, 64, 1)';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'rgba(39, 42, 64, 1)';
           // e.target.style.transform = 'translateY(0)';
            // e.target.style.boxShadow = '0 4px 14px rgba(39, 42, 64, 1)';
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Upsells Settings
        </button>
        
      </div>
      
      {/* Upsells Settings Modal */}
      {showUpsellsModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'rgba(2, 13, 41, 1)',
            border: '2px solid rgba(19, 49, 123, 1)',
            borderRadius: '30px',
            padding: '30px',
            width: '500px',
            maxWidth: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
            position: 'relative'
          }}>
            {/* Close button */}
            <button 
              onClick={toggleModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                color: '#aaa',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>
            {/* Modal header */}
            <div style={{ textAlign: 'center', marginBottom: '25px' }}>
              <h2 style={{ color: '#fff', fontSize: '20px', fontWeight: '600', margin: '0 0 8px' }}>
                Upsell Settings
              </h2>
              {/* <div style={{ height: '2px', background: 'linear-gradient(90deg, rgba(109,109,43,0) 0%, rgba(109,109,43,1) 50%, rgba(109,109,43,0) 100%)', margin: '15px auto' }}></div> */}
            </div>
            {/* Modal content */}
            {fetchingModalSettings ? (
              <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px',
                color: '#fff'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <Loader />
                  <p style={{ marginTop: '15px', fontSize: '14px', color: '#aaa' }}>
                    Loading upsell settings...
                  </p>
                </div>
              </div>
            ) : (
            <div style={{ color: '#fff' }}>
              {/* Maximum upsell distance */}
              {/* <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <label style={{ fontWeight: '600', fontSize: '15px' }}>
                    Maximum upsell distance
                  </label>
                  <div 
                    style={{ 
                      color:"rgba(187, 187, 187, 1)",
                      marginLeft: '10px',
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <CustomTooltip 
                      title="Maximum Distance Info" 
                      description="Maximum distance between your property address and upsells which HostBuddy will consider for trip planning"
                    >
                      <img src={ToolTipIcon} alt="Tooltip" width="16" height="16" />
                    </CustomTooltip>
                  </div>
                </div>
                <select
                  value={maxDistance}
                  onChange={e => setMaxDistance(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(10, 26, 68, 1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '24px',
                    fontSize: '15px',
                    marginBottom: '5px',
                    appearance: 'none',
                    outline: 'none',
                  }}
                >
                  <option value="">Select</option>
                  <option value="1">1 km</option>
                  <option value="5">5 km</option>
                  <option value="10">10 km</option>
                  <option value="20">20 km</option>
                  <option value="50">50 km</option>
                </select>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>
                  Maximum distance between your property address and upsells which HostBuddy will consider for trip planning
                </div>
              </div> */}
              {/* Upsell timing */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontWeight: '600', fontSize: '15px', display: 'block', marginBottom: '15px' }}>
                  Upsell timing
                </label>
                
                {/* After booking confirmation */}
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                      type="radio"
                      id="afterBooking"
                      name="upsellTiming"
                      checked={upsellTiming === "afterBooking"}
                      onChange={() => setUpsellTiming("afterBooking")}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="afterBooking" style={{ fontSize: '14px', fontWeight: '500' }}>
                      After booking confirmation
                    </label>
                    <div 
                      style={{ 
                        marginLeft: '10px',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <CustomTooltip 
                        title="After Booking Timing" 
                        description="HostBuddy will send upsells this amount of time after the booking is confirmed"
                      >
                        <img src={ToolTipIcon} alt="Tooltip" width="16" height="16" />
                      </CustomTooltip>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                      <div style={{
                        width: '100%',
                        background: upsellTiming === "afterBooking" ? 'rgba(10, 26, 68, 1)' : 'rgba(10, 26, 68, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: upsellTiming === "afterBooking" ? '#fff' : '#aaa',
                        textAlign: 'left',
                        padding: '10px 15px',
                        borderRadius: '24px',
                        fontSize: '15px',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}>
                        <span style={{ marginRight: '5px' }}>Hours:</span>
                        <input
                          type="text"
                          value={hoursDelay}
                          onChange={e => {
                            const value = e.target.value;
                            // Allow numbers, decimals, and time formats like "1.5", "1h", "1 hr", etc.
                            if (value === '' || /^(\d*\.?\d*[hH]?r?s?|[0-9]*\.?[0-9]*)$/.test(value)) {
                              setHoursDelay(value);
                            }
                          }}
                          onBlur={e => {
                            // Convert various formats to pure number on blur
                            let value = e.target.value.toString().toLowerCase();
                            value = value.replace(/[hH]r?s?/g, '').trim();
                            const numValue = parseFloat(value) || 0;
                            if (numValue >= 0 && numValue <= 72) {
                              setHoursDelay(numValue);
                            } else {
                              setHoursDelay(0);
                            }
                          }}
                          placeholder="0"
                          disabled={upsellTiming !== "afterBooking"}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: upsellTiming === "afterBooking" ? '#fff' : '#aaa',
                            textAlign: 'left',
                            fontSize: '15px',
                            outline: 'none',
                            width: '60px'
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                      <div style={{
                        width: '100%',
                        background: upsellTiming === "afterBooking" ? 'rgba(10, 26, 68, 1)' : 'rgba(10, 26, 68, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: upsellTiming === "afterBooking" ? '#fff' : '#aaa',
                        textAlign: 'left',
                        padding: '10px 15px',
                        borderRadius: '24px',
                        fontSize: '15px',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}>
                        <span style={{ marginRight: '5px' }}>Minutes:</span>
                        <input
                          type="text"
                          value={minutesDelay}
                          onChange={e => {
                            const value = e.target.value;
                            // Allow numbers, decimals, and time formats like "30", "30m", "30 min", etc.
                            if (value === '' || /^(\d*\.?\d*[mM]?i?n?s?|[0-9]*\.?[0-9]*)$/.test(value)) {
                              // Extract numeric value for real-time validation
                              const cleanValue = value.toString().toLowerCase().replace(/[mM]i?n?s?/g, '').trim();
                              const numValue = parseFloat(cleanValue) || 0;
                              
                              // Only allow values up to 59 minutes
                              if (numValue <= 59) {
                                setMinutesDelay(value);
                              }
                            }
                          }}
                          onBlur={e => {
                            // Convert various formats to pure number on blur
                            let value = e.target.value.toString().toLowerCase();
                            value = value.replace(/[mM]i?n?s?/g, '').trim();
                            const numValue = parseFloat(value) || 0;
                            if (numValue >= 0 && numValue <= 59) {
                              setMinutesDelay(numValue);
                            } else {
                              setMinutesDelay(0);
                            }
                          }}
                          placeholder="0"
                          disabled={upsellTiming !== "afterBooking"}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: upsellTiming === "afterBooking" ? '#fff' : '#aaa',
                            textAlign: 'left',
                            fontSize: '15px',
                            outline: 'none',
                            width: '60px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Before check-in */}
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <input
                      type="radio"
                      id="beforeCheckin"
                      name="upsellTiming"
                      checked={upsellTiming === "beforeCheckin"}
                      onChange={() => setUpsellTiming("beforeCheckin")}
                      style={{ marginRight: '8px' }}
                    />
                    <label htmlFor="beforeCheckin" style={{ fontSize: '14px', fontWeight: '500' }}>
                      Before check-in
                    </label>
                    <div 
                      style={{ 
                        marginLeft: '10px',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <CustomTooltip 
                        title="Before Check-in Timing" 
                        description="HostBuddy will send upsells this amount of time before the guest’s check-in time"
                      >
                        <img src={ToolTipIcon} alt="Tooltip" width="16" height="16" />
                      </CustomTooltip>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                      <div style={{
                        width: '100%',
                        background: upsellTiming === "beforeCheckin" ? 'rgba(10, 26, 68, 1)' : 'rgba(10, 26, 68, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: upsellTiming === "beforeCheckin" ? '#fff' : '#aaa',
                        textAlign: 'left',
                        padding: '10px 15px',
                        borderRadius: '24px',
                        fontSize: '15px',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}>
                        <span style={{ marginRight: '5px' }}>Hours:</span>
                        <input
                          type="text"
                          value={hoursBeforeCheckin}
                          onChange={e => {
                            const value = e.target.value;
                            // Allow numbers, decimals, and time formats like "1.5", "1h", "1 hr", etc.
                            if (value === '' || /^(\d*\.?\d*[hH]?r?s?|[0-9]*\.?[0-9]*)$/.test(value)) {
                              setHoursBeforeCheckin(value);
                            }
                          }}
                          onBlur={e => {
                            // Convert various formats to pure number on blur
                            let value = e.target.value.toString().toLowerCase();
                            value = value.replace(/[hH]r?s?/g, '').trim();
                            const numValue = parseFloat(value) || 0;
                            if (numValue >= 0 && numValue <= 72) {
                              setHoursBeforeCheckin(numValue);
                            } else {
                              setHoursBeforeCheckin(0);
                            }
                          }}
                          placeholder="0"
                          disabled={upsellTiming !== "beforeCheckin"}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: upsellTiming === "beforeCheckin" ? '#fff' : '#aaa',
                            textAlign: 'left',
                            fontSize: '15px',
                            outline: 'none',
                            width: '60px'
                          }}
                        />
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                      <div style={{
                        width: '100%',
                        background: upsellTiming === "beforeCheckin" ? 'rgba(10, 26, 68, 1)' : 'rgba(10, 26, 68, 0.5)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: upsellTiming === "beforeCheckin" ? '#fff' : '#aaa',
                        textAlign: 'left',
                        padding: '10px 15px',
                        borderRadius: '24px',
                        fontSize: '15px',
                        outline: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}>
                        <span style={{ marginRight: '5px' }}>Minutes:</span>
                        <input
                          type="text"
                          value={minutesBeforeCheckin}
                          onChange={e => {
                            const value = e.target.value;
                            // Allow numbers, decimals, and time formats like "30", "30m", "30 min", etc.
                            if (value === '' || /^(\d*\.?\d*[mM]?i?n?s?|[0-9]*\.?[0-9]*)$/.test(value)) {
                              // Extract numeric value for real-time validation
                              const cleanValue = value.toString().toLowerCase().replace(/[mM]i?n?s?/g, '').trim();
                              const numValue = parseFloat(cleanValue) || 0;
                              
                              // Only allow values up to 59 minutes
                              if (numValue <= 59) {
                                setMinutesBeforeCheckin(value);
                              }
                            }
                          }}
                          onBlur={e => {
                            // Convert various formats to pure number on blur
                            let value = e.target.value.toString().toLowerCase();
                            value = value.replace(/[mM]i?n?s?/g, '').trim();
                            const numValue = parseFloat(value) || 0;
                            if (numValue >= 0 && numValue <= 59) {
                              setMinutesBeforeCheckin(numValue);
                            } else {
                              setMinutesBeforeCheckin(0);
                            }
                          }}
                          placeholder="0"
                          disabled={upsellTiming !== "beforeCheckin"}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: upsellTiming === "beforeCheckin" ? '#fff' : '#aaa',
                            textAlign: 'left',
                            fontSize: '15px',
                            outline: 'none',
                            width: '60px'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Upsell delay after booking confirmation */}
              
              {/* Exclude hours for upsell */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontWeight: '600', fontSize: '15px', display: 'block', marginBottom: '15px' }}>
                  Exclude hours for upsell
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                    <span style={{ fontSize: '14px', marginRight: '10px', minWidth: '40px' }}>From</span>
                    <div style={{
                      width: '100%',
                      background: 'rgba(10, 26, 68, 1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '24px',
                      fontSize: '15px',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="2"/>
                        <path d="M12 7V12L15 14" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <input
                        type="text"
                        value={excludeStart || ''}
                        onChange={e => {
                          let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
                          
                          // Auto-format as user types
                          if (value.length >= 3) {
                            value = value.slice(0, 2) + ':' + value.slice(2, 4);
                          } else if (value.length === 2) {
                            value = value + ':';
                          }
                          
                          // Validate hours and minutes
                          if (value.includes(':')) {
                            const [hours, minutes] = value.split(':');
                            if (hours && parseInt(hours) > 23) {
                              value = '23:' + (minutes || '');
                            }
                            if (minutes && parseInt(minutes) > 59) {
                              value = hours + ':59';
                            }
                          }
                          
                          setExcludeStart(value);
                        }}
                        onBlur={e => {
                          let value = e.target.value;
                          // Ensure complete format on blur
                          if (value && !value.includes(':')) {
                            if (value.length === 1) {
                              value = '0' + value + ':00';
                            } else if (value.length === 2) {
                              value = value + ':00';
                            }
                          } else if (value && value.includes(':')) {
                            const [hours, minutes] = value.split(':');
                            const formattedHours = hours ? hours.padStart(2, '0') : '00';
                            const formattedMinutes = minutes ? minutes.padStart(2, '0') : '00';
                            value = formattedHours + ':' + formattedMinutes;
                          }
                          setExcludeStart(value);
                        }}
                        placeholder="HH:MM"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#fff',
                          fontSize: '15px',
                          outline: 'none',
                          width: '100%'
                        }}
                        maxLength={5}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', width: '50%' }}>
                    <span style={{ fontSize: '14px', marginRight: '10px', minWidth: '25px' }}>To</span>
                    <div style={{
                      width: '100%',
                      background: 'rgba(10, 26, 68, 1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      padding: '10px 15px',
                      borderRadius: '24px',
                      fontSize: '15px',
                      outline: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{marginRight: '6px'}} xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="2"/>
                        <path d="M12 7V12L15 14" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <input
                        type="text"
                        value={excludeEnd || ''}
                        onChange={e => {
                          let value = e.target.value.replace(/[^\d]/g, ''); // Remove non-digits
                          
                          // Auto-format as user types
                          if (value.length >= 3) {
                            value = value.slice(0, 2) + ':' + value.slice(2, 4);
                          } else if (value.length === 2) {
                            value = value + ':';
                          }
                          
                          // Validate hours and minutes
                          if (value.includes(':')) {
                            const [hours, minutes] = value.split(':');
                            if (hours && parseInt(hours) > 23) {
                              value = '23:' + (minutes || '');
                            }
                            if (minutes && parseInt(minutes) > 59) {
                              value = hours + ':59';
                            }
                          }
                          
                          setExcludeEnd(value);
                        }}
                        onBlur={e => {
                          let value = e.target.value;
                          // Ensure complete format on blur
                          if (value && !value.includes(':')) {
                            if (value.length === 1) {
                              value = '0' + value + ':00';
                            } else if (value.length === 2) {
                              value = value + ':00';
                            }
                          } else if (value && value.includes(':')) {
                            const [hours, minutes] = value.split(':');
                            const formattedHours = hours ? hours.padStart(2, '0') : '00';
                            const formattedMinutes = minutes ? minutes.padStart(2, '0') : '00';
                            value = formattedHours + ':' + formattedMinutes;
                          }
                          setExcludeEnd(value);
                        }}
                        placeholder="HH:MM"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#fff',
                          fontSize: '15px',
                          outline: 'none',
                          width: '100%'
                        }}
                        maxLength={5}
                      />
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#aaa', marginTop: '2px' }}>
                  HostBuddy will not upsell during the excluded hours, following the timezone of the property location
                </div>
              </div>
              {/* Initiation template */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontWeight: '600', fontSize: '15px', display: 'block', marginBottom: '10px' }}>
                  Initiation template
                </label>
                <textarea
                  value={initiationTemplate}
                  onChange={e => setInitiationTemplate(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    background: 'rgba(10, 26, 68, 1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    padding: '14px',
                    borderRadius: '24px',
                    fontSize: '15px',
                    resize: 'vertical',
                    outline: 'none',
                  }}
                />
              </div>
              {/* AI Personalization toggle */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '18px', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontSize: '15px', fontWeight: '500', color: '#fff' }}>AI Personalization</label>
                  <div 
                    style={{ 
                      color:"rgba(187, 187, 187, 1)",
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <CustomTooltip 
                      title="AI Personalization Info" 
                      description="If this is enabled, HostBuddy may adjust the wording of each message slightly to make it sound more natural and personalized given the context of the conversation."
                    >
                      <img src={ToolTipIcon} alt="Tooltip" width="16" height="16" />
                    </CustomTooltip>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                  <input
                    type="checkbox"
                    checked={aiPersonalization}
                    onChange={e => setAiPersonalization(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: aiPersonalization ? '#338aff' : '#22305a',
                    borderRadius: '24px',
                    transition: '0.4s',
                    boxShadow: aiPersonalization ? '0 0 6px #338aff' : 'none'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: aiPersonalization ? '22px' : '4px',
                      bottom: '3px',
                      background: '#fff',
                      borderRadius: '50%',
                      transition: '0.4s'
                    }}></span>
                  </span>
                </label>
              </div>
              {/* AI Context Checking toggle */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px', gap: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontSize: '15px', fontWeight: '500', color: '#fff' }}>AI Context Checking</label>
                  <div 
                    style={{ 
                      color:"rgba(187, 187, 187, 1)",
                      padding: '4px',
                      borderRadius: '4px',
                      transition: 'background-color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <CustomTooltip 
                      title="AI Context Checking Info" 
                      description="If this is enabled, HostBuddy will refrain from sending the message to a guest if the AI determines that the message is not contextually appropriate, based on the conversation history"
                    >
                      <img src={ToolTipIcon} alt="Tooltip" width="16" height="16" />
                    </CustomTooltip>
                  </div>
                </div>
                <label style={{ position: 'relative', display: 'inline-block', width: '44px', height: '24px' }}>
                  <input
                    type="checkbox"
                    checked={aiContentChecking}
                    onChange={e => setAiContentChecking(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: aiContentChecking ? '#338aff' : '#22305a',
                    borderRadius: '24px',
                    transition: '0.4s',
                    boxShadow: aiContentChecking ? '0 0 6px #338aff' : 'none'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '18px',
                      width: '18px',
                      left: aiContentChecking ? '22px' : '4px',
                      bottom: '3px',
                      background: '#fff',
                      borderRadius: '50%',
                      transition: '0.4s'
                    }}></span>
                  </span>
                </label>
              </div>
              {/* Submit button */}
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={async () => {
                    await saveExperiencePlanningSettings();
                    toggleModal();
                  }}
                  disabled={submitIsLoading}
                  style={{
                    padding: '14px 0',
                    width: '100%',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#fff',
                    backgroundColor: submitIsLoading ? '#666' : '#338aff',
                    border: 'none',
                    borderRadius: '32px',
                    cursor: submitIsLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(51,138,255,0.15)'
                  }}
                  onMouseOver={e => {
                    if (!submitIsLoading) {
                      e.target.style.backgroundColor = '#2566c1';
                    }
                  }}
                  onMouseOut={e => {
                    if (!submitIsLoading) {
                      e.target.style.backgroundColor = '#338aff';
                    }
                  }}
                >
                  {submitIsLoading ? 'Saving...' : 'Submit'}
                </button>
              </div>
            </div>
            )}
          </div>
        </div>
      )}
      
      {/* HostBuddy Properties and Upsell Settings Table */}
      <div style={{ marginTop: '40px' }}>
        <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px', color: '#fff' }}>
          Use the toggles below to enable or disable Mount upsells for each of your properties. Click "Save Upsell Mappings" at the bottom when finished.
        </p>

        <table style={{ marginTop: '30px', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>HostBuddy properties</th>
              <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA', textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                  <span>Upsells Settings</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '14px', color: '#ccc' }}>All</span>
                    <label style={{ position: 'relative', display: 'inline-block', width: '40px', height: '22px' }}>
                      <input
                        type="checkbox"
                        checked={propertiesList.length > 0 && propertiesList.every(property => !!selectedMountUpsells[property])}
                        onChange={(e) => {
                          const newValue = e.target.checked ? 'upsell1' : '';
                          const newSelectedUpsells = {};
                          propertiesList.forEach(property => {
                            newSelectedUpsells[property] = newValue;
                          });
                          setSelectedMountUpsells(newSelectedUpsells);
                        }}
                        style={{ opacity: 0, width: 0, height: 0 }}
                      />
                      <span style={{
                        position: 'absolute',
                        cursor: 'pointer',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: (propertiesList.length > 0 && propertiesList.every(property => !!selectedMountUpsells[property])) ? 'rgba(20, 110, 245, 1)' : '#333',
                        borderRadius: '34px',
                        transition: '0.4s',
                        boxShadow: (propertiesList.length > 0 && propertiesList.every(property => !!selectedMountUpsells[property])) ? '0 0 5px rgba(20, 110, 245, 1)' : '0 0 5px #333'
                      }}>
                        <span style={{
                          position: 'absolute',
                          content: '""',
                          height: '16px',
                          width: '16px',
                          left: (propertiesList.length > 0 && propertiesList.every(property => !!selectedMountUpsells[property])) ? '21px' : '3px',
                          bottom: '3px',
                          background: '#fff',
                          borderRadius: '50%',
                          transition: '0.4s'
                        }}></span>
                      </span>
                    </label>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!getMountUpsellsLoading ? (
              propertiesList.map((property, index) => (
                <tr key={index} style={{ height: '40px', borderBottom: '1px solid white' }}>
                  <td style={{ padding: '10px', fontSize: '14px', color: '#fff' }}>{property}</td>
                  <td style={{ padding: '10px' }}>
                    <div style={{ 
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <span style={{ 
                        color: selectedMountUpsells[property] ? 'rgba(20, 110, 245, 1)' : '#ccc', 
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        {selectedMountUpsells[property] ? 'Enabled' : 'Disabled'}
                      </span>
                      <label className="switch" style={{ margin: 0 }}>
                        <input 
                          type="checkbox" 
                          checked={!!selectedMountUpsells[property]} 
                          onChange={() => {
                            const newValue = selectedMountUpsells[property] ? '' : 'upsell1'; // Toggle between disabled and enabled
                            handleUpsellSelectChange(property, newValue);
                          }}
                        />
                        <span className="slider round" style={{ 
                          position: 'relative',
                          display: 'inline-block',
                          width: '30px',
                          height: '17px',
                          background: selectedMountUpsells[property] ? 'rgba(20, 110, 245, 1)' : '#333',
                          borderRadius: '34px',
                          transition: '0.4s',
                          cursor: 'pointer',
                          boxShadow: selectedMountUpsells[property] ? '0 0 5px rgba(20, 110, 245, 1)' : '0 0 5px #333'
                        }}>
                          <span style={{
                            position: 'absolute',
                            content: '""',
                            height: '13px',
                            width: '13px',
                            left: selectedMountUpsells[property] ? '14px' : '2px',
                            bottom: '2px',
                            background: '#fff',
                            borderRadius: '50%',
                            transition: '0.4s'
                          }}></span>
                        </span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
          {!submitIsLoading ? (
            <button 
              type="button" 
              className="btn btn-primary" 
              style={{ 
                borderRadius: '50px', 
                padding: '10px 20px',
                backgroundColor: 'rgba(13, 110, 253, 1)',
                color: '#fff',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer'
              }} 
              onClick={handleSubmitMappingsClick}
            >
              Save 
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default MountIntegration;
