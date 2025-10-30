import React, { useState, useRef, useEffect } from "react";
import Select, { components } from 'react-select';
import customStyles from "../../../resources/selectStyles";
import TriggersTrargetsConditionsModel from "./TriggersTrargetsConditionsModel";
import { dataInput, minutDataInput, createTypeToGuesttypeMapping, getUseTriggeredGuestFromTemplate, describeTemplate } from "./SmartTemplateJson";
import Loader from "../../../../../../helper/Loader";
import { v4 as uuidv4 } from 'uuid';
import { getSubscriptionStatus } from '../../../../../../helper/Authorized';
import { useWhiteLabelCss } from "../../../../../../helper/WhiteLabelCssContext";

import MultiSelect from "../../../../../../component/multiSelect/multiSelect";

// Lazy load the InboxUpgrade component to avoid circular dependency
const InboxUpgrade = React.lazy(() => import("../../../inbox/mildeSection/inbox_Upgrade/InboxUpgrade.js"));

const SmartTemplateAddEditForm = ({addEditSmart, addEditClose, handleSaveTemplate, allPropertyNamesList, saveTemplateLoading, handleDeleteTemplate, deleteTemplateLoading, hasCleaningManagementIntegration, minut_user_id, userData, smartAllData}) => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  const { type, smartTemplateData } = addEditSmart;
  
  const { triggers, conditions } = dataInput;
  const { minutTriggers, minutConditions } = minutDataInput;
  const edit = "Edit";
  const add = "Add";
  const triggerName = "Trigger";
  const targetsName = "Targets";
  const conditionsName = "Conditions";
  const followUpConditionsName = "Follow-Up Conditions";
  
  const dataStructurePayload = smartTemplateData?.smartItem ? smartTemplateData?.smartItem : { id:uuidv4(), name:'', enabled:false, message:'', properties:[], triggers:[], targets:[], conditions:[], follow_ups: [], ai_context_check_instructions:'', ai_personalization_instructions:'' }; // Data structure for just this one template. The structure for all templates is stored in the parent

  const [allData, setAllData] = useState({ modelShow: false, modelShowType: "", formData: [] });
  const [dataStructure, setDataStructure] = useState(dataStructurePayload);
  const [templateDescription, setTemplateDesctiption] = useState(describeTemplate(dataStructure));
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const triggeredGuestNote = getUseTriggeredGuestFromTemplate(dataStructure); // Get the note for the triggered guest

  const nameMapping = createTypeToGuesttypeMapping();
  const variables = {'guest_name':'Guest name', 'property_name':'Property Name', 'city':'City', 'reservation_start_date':'Reservation Start Date', 'reservation_end_date':'Reservation End Date'}

  // Whenever the data structure changes, update the description
  /*
  useEffect(() => {
    setTemplateDesctiption(describeTemplate(dataStructure));
  }, [dataStructure]);
  */

  
  // State to manage follow-up visibility
  const [showFollowUps, setShowFollowUps] = useState(dataStructure?.follow_ups?.length > 0);

  // New UI state for "Customize..." expansions
  const [showContextCustomize, setShowContextCustomize] = useState(!!dataStructurePayload.ai_context_check_instructions);
  const [showPersonalizeCustomize, setShowPersonalizeCustomize] = useState(!!dataStructurePayload.ai_personalization_instructions);

  // Check subscription limits for enabling templates
  const checkSubscriptionLimits = (isEnabling) => {
    if (!isEnabling) return true; // No restrictions for disabling
    
    const enabledCount = smartAllData ? smartAllData.filter(template => template.enabled && template.id !== dataStructure.id).length : 0;
    const { plan } = getSubscriptionStatus(userData);
    const subscriptionPlan = (plan || '').toLowerCase();
    
    if (subscriptionPlan.includes('pro')) {
      if (enabledCount >= 2) {
        setShowUpgradeModal(true);
        return false;
      }
    } else if (subscriptionPlan.includes('elite')) {
      if (enabledCount >= 5) {
        setShowUpgradeModal(true);
        return false;
      }
    } else if (subscriptionPlan.includes('ultimate')) {
      // No restrictions for ultimate plan
    } else {
      // Default to pro plan restrictions
      if (enabledCount >= 2) {
        setShowUpgradeModal(true);
        return false;
      }
    }
    
    return true;
  };

  // Handle enable toggle with subscription check
  const handleEnableToggle = (e) => {
    const isEnabling = e.target.checked;
    
    // Check subscription limits before enabling
    if (!checkSubscriptionLimits(isEnabling)) {
      return; // Don't proceed if limits are exceeded
    }
    
    setDataStructure({...dataStructure, enabled: isEnabling});
  };

  // Modal submit to add a new trigger/target/condition or edit an existing one
  const submitHndle = (getFormData) => {
    const { data, type, editAddTypeSubmitHndle, modelShowType, triggerFormData } = getFormData; // triggerFormData is the selected trigger/target/condition obj from the dataInput json
    const { typepAddEdit, editIndex } = editAddTypeSubmitHndle || {};
    const newItem = { type, data };
    
    // Update the data structure based on the modal type
    if (modelShowType === triggerName) {
      setDataStructure((prevData) => {
        // const updatedTargets = useTriggeredGuest ? [{ type: 'triggered_guest', data: {} }] : prevData.targets.filter(target => target.type !== 'triggered_guest');
        const updatedTargets = []; // targets no longer used
        if (typepAddEdit === add) {
          return { ...prevData, triggers: [...prevData.triggers, newItem], targets: updatedTargets };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.triggers];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) { updatedTriggers[editIndex] = newItem; }
          return { ...prevData, triggers: updatedTriggers, targets: updatedTargets };
        }
      });
    } else if (modelShowType === targetsName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return { ...prevData, targets: [...prevData.targets, newItem] };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.targets];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) {
            updatedTriggers[editIndex] = newItem;
          }
          return { ...prevData, targets: updatedTriggers };
        }
      });
    } else if (modelShowType === conditionsName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return { ...prevData, conditions: [...prevData.conditions, newItem] };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.conditions];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) { updatedTriggers[editIndex] = newItem; }
          return { ...prevData, conditions: updatedTriggers };
        }
      });
    } else if (modelShowType === followUpConditionsName) {
      const { followUpIndex } = editAddTypeSubmitHndle; // Get the index of the follow-up
      setDataStructure((prevData) => {
        const updatedFollowUps = [...prevData.follow_ups];
        if (typepAddEdit === add) {
          updatedFollowUps[followUpIndex].conditions.push(newItem);
        } else if (typepAddEdit === edit) {
          updatedFollowUps[followUpIndex].conditions[editIndex] = newItem;
        }
        return { ...prevData, follow_ups: updatedFollowUps };
      });
    }
  };

  const handleRemove = (index, type) => {
    if (type === triggerName) {
      setDataStructure((prevData) => ({ ...prevData, triggers: prevData.triggers.filter((_, id) => id !== index), targets: prevData.targets.filter(target => target.type !== 'triggered_guest') }));
    } else if (type === targetsName) {
      setDataStructure((prevData) => ({ ...prevData, targets: prevData.targets.filter((_, id) => id !== index) }));
    } else if (type === conditionsName) {
      setDataStructure((prevData) => ({ ...prevData, conditions: prevData.conditions.filter((_, id) => id !== index) }));
    } else if (type === followUpConditionsName) {
      setDataStructure((prevData) => ({
        ...prevData,
        follow_up_conditions: (prevData.follow_up_conditions || []).filter(
          (_, id) => id !== index
        ),
      }));
    }
  };

  // For inserting variables into the message textarea
  const insertVariableAtCursor = (textarea, variable) => {
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const textBefore = textarea.value.substring(0, startPos);
    const textAfter = textarea.value.substring(endPos, textarea.value.length);
  
    const newText = textBefore + variable + textAfter;
    setDataStructure({ ...dataStructure, message: newText });
  
    // Set the cursor position after the inserted variable
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = startPos + variable.length;
      textarea.focus();
    }, 0);
  };

  const handleTextAreaChange = (e, field) => {
    setDataStructure({ ...dataStructure, [field]: e.target.value });
  };

  // ------- Property multi select (TODO: move this to its own component & file) -------
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = allPropertyNamesList.map((propertyName) => ({ value: propertyName, label: propertyName }));
  
  // Create dynamic styles with white label dropdown and hover colors
  const getDynamicMultiSelectStyles = () => {
    const dropdownBgColor = cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.dropdown || 'var(--white-label-background-dropdown, #0F1117)');
    const hoverColor = cssLoading ? '#01255e' : (cssConfig?.css_data?.background?.hover || 'var(--white-label-background-hover, #01255e)');
    const borderPrimaryColor = cssLoading ? '#013280' : (cssConfig?.css_data?.borders?.primary || '#013280');
    
    return {
      control: (provided, state) => ({
        ...provided,
        border: `1px solid ${state.isFocused ? '#3e88f7' : borderPrimaryColor}`,
        borderRadius: '8px',
        color: '#a6a9b2',
        fontSize: '16px',
        fontWeight: '400',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14",
        backgroundColor: dropdownBgColor,
        display: 'flex',
        overflowX: 'auto',
        width: '250px',
        padding: '6px 12px',
        boxShadow: state.isFocused ? '0 0 0 1px rgba(62, 136, 247, 0.5)' : 'none',
        transition: 'all 0.2s',
        '&:hover': {
          borderColor: '#3e88f7'
        }
      }),
      menu: (provided) => ({
        ...provided,
        backgroundColor: dropdownBgColor,
        border: `2px solid ${borderPrimaryColor}`,
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(30, 75, 158, 0.2)',
        marginTop: '8px',
        overflow: 'hidden'
      }),
      menuList: (provided) => ({
        ...provided,
        maxHeight: '450px',
        padding: '0',
        backgroundColor: dropdownBgColor
      }),
      option: (provided, state) => ({
        ...provided,
        fontSize: '15px',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14",
        padding: '12px 16px',
        color: '#fff',
        backgroundColor: state.isFocused || state.isSelected ? hoverColor : 'transparent',
        transition: 'background-color 0.2s',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        '&:hover': {
          backgroundColor: hoverColor,
        },
      }),
      singleValue: (provided) => ({
        ...provided,
        color: '#a6a9b2',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14"
      }),
      multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#3e88f7',
        borderRadius: '6px',
        color: '#fff',
        display: 'inline-flex',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14"
      }),
      multiValueLabel: (provided) => ({
        ...provided,
        color: '#fff',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14"
      }),
      multiValueRemove: (provided) => ({
        ...provided,
        color: '#fff',
        ':hover': {
          backgroundColor: '#5a9bff',
          color: '#fff',
        }
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#676A73',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14"
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        color: '#a6a9b2',
        '&:hover': {
          color: '#3e88f7'
        }
      }),
      indicatorSeparator: () => ({
        display: 'none'
      }),
      input: (provided) => ({
        ...provided,
        color: '#fff',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontVariationSettings: "'opsz' 14"
      }),
      valueContainer: (provided) => ({
        ...provided,
        padding: '0'
      })
    };
  };

  // When the data structure populates, update the selected options
  useEffect(() => {
    const selectedOptions = dataStructure?.properties?.map((property) => ({ value: property, label: property }));
    setSelectedOptions(selectedOptions);
  }, [dataStructure]);

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to delete this template?");
    if (confirmed) {
      handleDeleteTemplate(dataStructure.id);
    }
  };
  // -------------------------------------

  // Handle adding a new follow-up
  const handleAddFollowUp = () => {
  // First ensure follow_ups is an array
  const currentFollowUps = Array.isArray(dataStructure.follow_ups) ? 
    dataStructure.follow_ups : [];
    
  // Create new follow-up
  const newFollowUp = {
    message: '',
    conditions: [],
    after_mins: '30', // Add a default value
  };
  
  // Update state without the setTimeout delay
  setDataStructure({
    ...dataStructure,
    follow_ups: [...currentFollowUps, newFollowUp]
  });
  
  // Then show the follow-ups section
  setShowFollowUps(true);
};

  // Handle removing a follow-up
  const handleRemoveFollowUp = (index) => {
    const confirmed = window.confirm("Are you sure you want to remove this follow-up message?");
    if (confirmed) {
      const updatedFollowUps = dataStructure.follow_ups.filter((_, idx) => idx !== index);
      setDataStructure({ ...dataStructure, follow_ups: updatedFollowUps });
      if (updatedFollowUps?.length === 0) {
        setShowFollowUps(false);
      }
    }
  };

  // Handle follow-up message change
  const handleFollowUpMessageChange = (index, value) => {
    const updatedFollowUps = [...dataStructure.follow_ups];
    updatedFollowUps[index].message = value;
    setDataStructure({ ...dataStructure, follow_ups: updatedFollowUps });
  };

  // Handle follow-up delay change
  const handleFollowUpDelayChange = (index, value) => {
    const updatedFollowUps = [...dataStructure.follow_ups];
    updatedFollowUps[index].after_mins = value;
    setDataStructure({ ...dataStructure, follow_ups: updatedFollowUps });
  };

  return (
    <div className='smartTemplateAddEdit' style={{ maxWidth: '1400px', margin: '0 auto', padding: '48px' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '32px' }}>
        <button 
          onClick={addEditClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#3e88f7',
            fontSize: '15px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '600',
            fontVariationSettings: "'opsz' 14",
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            marginBottom: '16px',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <span>&larr;</span> Back to Smart Templates
        </button>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{
              color: 'white',
              fontSize: '40px',
              fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: '700',
              fontVariationSettings: "'opsz' 14",
              marginBottom: '8px'
            }}>
              {type?.type} Smart Template
            </h1>
            <p style={{
              color: '#3e88f7',
              fontSize: '16px',
              fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: '600',
              fontVariationSettings: "'opsz' 14",
              margin: '0'
            }}>
              Smart Template
            </p>
          </div>
          
          <div className="d-flex align-items-center gap-3">
            {!saveTemplateLoading ? (
              <button className="bg_theme_btn" onClick={() => { handleSaveTemplate(dataStructure); }}>Save</button>
            ) : (
              <Loader />
            )}
            {!deleteTemplateLoading ? (
              <a href="#" className="clickableLink" style={{ 
                color: '#ef4444', 
                fontSize: '15px',
                fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                fontWeight: '600',
                fontVariationSettings: "'opsz' 14",
                textDecoration: 'none'
              }} onClick={handleDeleteClick}>Delete Template</a>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: '#a6a9b2',
        fontSize: '15px',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontWeight: '400',
        fontVariationSettings: "'opsz' 14",
        lineHeight: '1.6',
        marginBottom: '32px'
      }}>
        Smart Templates lets you create highly customized templated messages to suit your exact needs. Choose specific triggers, target recipients, and conditions, and use AI to analyze context to send to the right guests at the right time.
      </p>
      
      {/* Divider */}
      <div style={{ borderTop: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`, marginBottom: "32px" }}></div>

      {/* Enable Toggle Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        paddingBottom: '24px',
        borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary ? `${cssConfig.css_data.borders.primary}66` : 'rgba(1, 50, 128, 0.4)'}`
      }}>
        <div>
          <h3 style={{
            color: 'white',
            fontSize: '18px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '700',
            fontVariationSettings: "'opsz' 14",
            marginBottom: '4px'
          }}>
            Enable Template
          </h3>
          <p style={{
            color: dataStructure?.enabled ? '#10b981' : '#ef4444',
            fontSize: '14px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '400',
            fontVariationSettings: "'opsz' 14",
            margin: '0'
          }}>
            You currently have this template {dataStructure?.enabled ? 'enabled' : 'disabled'}
          </p>
        </div>
        <button
          onClick={handleEnableToggle}
          style={{
            width: '56px',
            height: '28px',
            borderRadius: '9999px',
            position: 'relative',
            backgroundColor: dataStructure?.enabled ? '#3e88f7' : '#676a73',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: dataStructure?.enabled ? '0 0 12px rgba(62, 136, 247, 0.4)' : 'none'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '2px',
            width: '24px',
            height: '24px',
            backgroundColor: 'white',
            borderRadius: '50%',
            transition: 'transform 0.3s',
            transform: dataStructure?.enabled ? 'translateX(28px)' : 'translateX(2px)'
          }}></div>
        </button>
      </div>

      {/* Template Name and Properties */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '32px' }}>
        <div>
          <label style={{
            color: 'white',
            fontSize: '18px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '700',
            fontVariationSettings: "'opsz' 14",
            marginBottom: '12px',
            display: 'block'
          }}>
            Template Name
          </label>
          <input 
            type="text" 
            value={dataStructure?.name} 
            onChange={(e) => {setDataStructure({ ...dataStructure, name: e.target.value });}}
            placeholder="Enter template name"
            style={{
              width: '100%',
              backgroundColor: cssLoading ? 'var(--white-label-background-secondary, #17191F)' : (cssConfig?.css_data?.background?.input || 'var(--white-label-background-input, #17191F)'),
              border: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`,
              borderRadius: '8px',
              padding: '14px 20px',
              color: 'white',
              fontSize: '16px',
              fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: '400',
              fontVariationSettings: "'opsz' 14",
              outline: 'none',
              transition: 'all 0.2s'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3e88f7';
              e.target.style.boxShadow = '0 0 0 1px rgba(62, 136, 247, 0.5)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = cssConfig?.css_data?.borders?.primary || '#013280';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div className="propertySelectSection">
          <label style={{
            color: 'white',
            fontSize: '18px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '700',
            fontVariationSettings: "'opsz' 14",
            marginBottom: '12px',
            display: 'block'
          }}>
            Applies to these properties
          </label>
          <MultiSelect
            options={options}
            selectedOptions={selectedOptions}
            setSelectedOptions={(options) => {
              setSelectedOptions(options);
              setDataStructure({ ...dataStructure, properties: options.map((option) => option.value) });
            }}
            placeholder="Select properties..."
            selectAllText="Select all"
            customSelectStyles={getDynamicMultiSelectStyles()}
            dropdownBgColor={cssLoading ? '#0F1117' : (cssConfig?.css_data?.background?.dropdown || '#0F1117')}
            hoverBgColor={cssLoading ? '#01255e' : (cssConfig?.css_data?.background?.hover || '#01255e')}
          />
        </div>
      </div>
      
      {/* Send When Section */}
      <div style={{
        marginBottom: '32px',
        paddingBottom: '32px',
        borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary ? `${cssConfig.css_data.borders.primary}66` : 'rgba(1, 50, 128, 0.4)'}`
      }}>
        <label style={{
          color: 'white',
          fontSize: '18px',
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: '700',
          fontVariationSettings: "'opsz' 14",
          marginBottom: '8px',
          display: 'block'
        }}>
          Send When...
        </label>
        <p style={{
          color: '#a6a9b2',
          fontSize: '14px',
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: '400',
          fontVariationSettings: "'opsz' 14",
          marginBottom: '16px'
        }}>
          This controls when the message will be sent to the guest.
        </p>
        {dataStructure?.triggers?.length > 0 &&
          dataStructure?.triggers?.map((trigger, index) => {
            const { type } = trigger;
            return (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '8px'
              }}>
                <div style={{
                  flex: '1',
                  backgroundColor: 'var(--white-label-background-secondary, #17191F)',
                  border: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`,
                  borderRadius: '8px',
                  padding: '12px 16px',
                  color: 'white',
                  fontSize: '15px',
                  fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                  fontWeight: '400',
                  fontVariationSettings: "'opsz' 14",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span>{nameMapping[type].guesttype}</span>
                  <button 
                    onClick={() => handleRemove(index, triggerName)}
                    style={{
                      color: '#ef4444',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      padding: '0',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                    onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    ×
                  </button>
                </div>
                <button 
                  onClick={() => setAllData({modelShow:true, modelShowType:triggerName, formData:triggers, minutFormData:minutTriggers, editFormData:trigger, editIndex:index, typepAddEdit:edit })}
                  style={{
                    color: '#98bffa',
                    fontSize: '15px',
                    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontWeight: '600',
                    fontVariationSettings: "'opsz' 14",
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#3e88f7'}
                  onMouseOut={(e) => e.currentTarget.style.color = '#98bffa'}
                >
                  Change Event
                </button>
              </div>
            );
          })}
        {dataStructure?.triggers?.length < 1 && (
          <button
            onClick={() => setAllData({modelShow:true, modelShowType:triggerName, formData:triggers, minutFormData:minutTriggers, typepAddEdit:add})}
            style={{
              color: '#98bffa',
              fontSize: '15px',
              fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontWeight: '600',
              fontVariationSettings: "'opsz' 14",
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              marginTop: '8px',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#3e88f7'}
            onMouseOut={(e) => e.currentTarget.style.color = '#98bffa'}
          >
            + Add an Event
          </button>
        )}
      </div>

      {/* Send If Section */}
      <div style={{
        marginBottom: '32px',
        paddingBottom: '32px',
        borderBottom: `1px solid ${cssConfig?.css_data?.borders?.primary ? `${cssConfig.css_data.borders.primary}66` : 'rgba(1, 50, 128, 0.4)'}`
      }}>
        <label style={{
          color: 'white',
          fontSize: '18px',
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: '700',
          fontVariationSettings: "'opsz' 14",
          marginBottom: '8px',
          display: 'block'
        }}>
          Send If...
        </label>
        <p style={{
          color: '#a6a9b2',
          fontSize: '14px',
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontWeight: '400',
          fontVariationSettings: "'opsz' 14",
          marginBottom: '16px'
        }}>
          Add conditions to restrict message sending. Templated message will only be sent if all these conditions are met for the message to be sent to them.
        </p>
        {dataStructure?.conditions?.length > 0 && (
          <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {dataStructure?.conditions?.map((conditionsItem, index) => {
              const { type } = conditionsItem;
              return (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div style={{
                    flex: '1',
                    backgroundColor: 'var(--white-label-background-secondary, #17191F)',
                    border: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`,
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: 'white',
                    fontSize: '15px',
                    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    fontWeight: '400',
                    fontVariationSettings: "'opsz' 14",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>{nameMapping[type].guesttype}</span>
                    <button 
                      onClick={() => handleRemove(index, conditionsName)}
                      style={{
                        color: '#ef4444',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '0',
                        transition: 'opacity 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
                      onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                    >
                      ×
                    </button>
                  </div>
                  <button 
                    onClick={() => setAllData({modelShow:true, modelShowType:conditionsName, formData:conditions, minutFormData:minutConditions, editFormData:conditionsItem, editIndex:index, typepAddEdit:edit })}
                    style={{
                      color: '#98bffa',
                      fontSize: '15px',
                      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                      fontWeight: '600',
                      fontVariationSettings: "'opsz' 14",
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#3e88f7'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#98bffa'}
                  >
                    Edit
                  </button>
                </div>
              );
            })}
          </div>
        )}
        <button
          onClick={() => setAllData({ modelShow:true, modelShowType:conditionsName, formData:conditions, minutFormData:minutConditions, typepAddEdit:add })}
          style={{
            color: '#98bffa',
            fontSize: '15px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '600',
            fontVariationSettings: "'opsz' 14",
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0',
            marginTop: '8px',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#3e88f7'}
          onMouseOut={(e) => e.currentTarget.style.color = '#98bffa'}
        >
          + Add a Condition
        </button>
      </div>

      {/* Divider before Message Section */}
      <div style={{ borderTop: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'}`, marginTop: "32px", marginBottom: "32px" }}></div>
      
      <h3 style={{
        color: 'white',
        fontSize: '24px',
        fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontWeight: '700',
        fontVariationSettings: "'opsz' 14",
        textAlign: 'center',
        marginTop: '40px',
        marginBottom: '32px'
      }}>
        Message
      </h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 justify-content-between mt-5">
        <div className="available-variables-section" style={{justifyContent:'left'}}>
          <label className="fs-5">Variables</label>
          <p className="settings-label">Click to add custom variables to your message. These variables will change to match the data for each reservation.</p>
          <div className="available-variables mt-3">
            {Object.keys(variables).map((key, index) => (
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(document.getElementById('templateMessage'), `[[${key}]]`)}>{variables[key]}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 mb-5">
        <label className="fs-5">Message</label>
        <textarea 
          id="templateMessage" 
          className="form-control setting-textarea" 
          value={dataStructure?.message} 
          onChange={(e) => handleTextAreaChange(e, 'message')} 
          placeholder="Enter your message here..."
          style={{
            border: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`
          }}
        />
        {!showFollowUps && (
          <button style={{ background: 'none', border: 'none', color: '#146ef5', cursor: 'pointer', margin: '5px auto 0 auto' }} onClick={handleAddFollowUp}>
            Follow-up...
          </button>
        )}
      </div>

      {showFollowUps && dataStructure.follow_ups.map((followUp, index) => (
        <div className="followUp px-5 py-4" key={index}>
          <label className="fs-5">Follow-Up Message {index + 1}</label>
          <textarea 
            id={`followUpMessage${index}`} 
            className="form-control setting-textarea" 
            value={followUp.message} 
            onChange={(e) => handleFollowUpMessageChange(index, e.target.value)} 
            placeholder="Enter your follow-up message here..."
            style={{
              border: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`
            }}
          />

          <div className="d-flex align-items-center mb-3 mt-3">
            <span className="fs-6 me-2">Send this follow-up</span>
            <input 
              type="number" 
              className="form-control" 
              style={{ 
                width: '80px',
                border: `1px solid ${cssConfig?.css_data?.borders?.primary || '#013280'} !important`
              }} 
              value={followUp.after_mins} 
              onChange={(e) => handleFollowUpDelayChange(index, e.target.value)} 
            />
            <span className="fs-6 ms-2">minutes after the previous message.</span>
          </div>

          <p className="fs-5 mt-5">Only follow up if...</p>
          {followUp?.conditions?.length > 0 ? (
            followUp.conditions.map((conditionItem, conditionIndex) => {
              const { type } = conditionItem;
              return (
                <div className="col-lg-4 ms-3" key={conditionIndex}>
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <p className="fs-6">{nameMapping[type]?.guesttype}</p>
                    <div className="d-flex align-items-center gap-3">
                      <p
                        className="text-danger mainCursor fs-6"
                        onClick={() => { // Remove condition
                          const updatedFollowUps = [...dataStructure.follow_ups];
                          updatedFollowUps[index].conditions = updatedFollowUps[index].conditions.filter((_, idx) => idx !== conditionIndex);
                          setDataStructure({ ...dataStructure, follow_ups: updatedFollowUps });
                        }}
                      >
                        Remove
                      </p>
                      <p className="text-primary mainCursor fs-6"
                        onClick={() => setAllData({modelShow:true, modelShowType:followUpConditionsName, formData:conditions, minutFormData:minutConditions, editFormData:conditionItem, editIndex:conditionIndex, typepAddEdit:edit, followUpIndex:index})}
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="fs-6 text-muted">No conditions set. This message will be always sent at the specified time after the first message, regardless of any conditions or guest response.</p>
          )}

          <button
            className="bg-none text-primary border-0 outline-0 mt-3 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
            onClick={() => setAllData({ modelShow:true, modelShowType:followUpConditionsName, formData:conditions, minutFormData:minutConditions, typepAddEdit:add, followUpIndex:index })}
          >
            <i className="bi bi-plus fs-3"></i> {followUp?.conditions?.length > 0 ? "Add another follow-up condition" : "Add a condition for following up"}
          </button>

          <button className="btn btn-link text-danger mt-3" onClick={() => handleRemoveFollowUp(index)}>
            Remove this follow-up
          </button>
        </div>
      ))}

      {showFollowUps && dataStructure?.follow_ups?.length < 3 && (
        <button style={{ background: 'none', border: 'none', color: '#146ef5', cursor: 'pointer', margin: '5px auto 0 auto' }} onClick={handleAddFollowUp}>
          Add another follow-up...
        </button>
      )}

      <hr className="bg-white opacity-100" style={{height:"2px", marginTop:'50px', opacity:'75%'}} />

      <div className="ai-context-appropriate-section">
        <p className="d-flex align-items-center gap-5">
          Enable AI Context Checking
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={dataStructure?.ai_context_check || false} onChange={(e) => {setDataStructure({...dataStructure, ai_context_check:e.target.checked});}} id="flexSwitchCheckChecked"/>
          </div>
        </p>
        <p className="fs-14 text-muted">
          You currently have AI context checking <span className={dataStructure?.ai_context_check ? "text-success" : "text-danger"}>{dataStructure?.ai_context_check ? "enabled" : "disabled"}</span>.
        </p>
        <p className="fs-14 text-muted">
          If this is enabled, HostBuddy will refrain from sending the message to a guest if the AI determines that the message is not contextually appropriate, based on the conversation history.
        </p>

        {dataStructure?.ai_context_check && !showContextCustomize && (
          <button
            className="btn btn-link p-0"
            style={{ color: '#146ef5' }}
            onClick={() => setShowContextCustomize(true)}
          >
            Customize...
          </button>
        )}
        {dataStructure?.ai_context_check && showContextCustomize && (
          <div className="mt-3">
            <label className="fs-6">(Optional) Add custom instructions to guide the AI context checking</label>
            <textarea
              className="form-control setting-textarea"
              placeholder="Type instructions to guide the AI..."
              value={dataStructure?.ai_context_check_instructions || ''}
              onChange={(e) => setDataStructure({ ...dataStructure, ai_context_check_instructions: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="ai-context-appropriate-section">
        <p className="d-flex align-items-center gap-5">
          Enable AI Personalization
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" checked={dataStructure?.ai_personalization || false} onChange={(e) => {setDataStructure({...dataStructure, ai_personalization:e.target.checked});}} id="flexSwitchCheckChecked"/>
          </div>
        </p>
        <p className="fs-14 text-muted">
          You currently have AI personalization <span className={dataStructure?.ai_personalization ? "text-success" : "text-danger"}>{dataStructure?.ai_personalization ? "enabled" : "disabled"}</span>.
        </p>
        <p className="fs-14 text-muted">
          If this is enabled, HostBuddy may adjust the wording of each message slightly to make it sound more natural and personalized given the context of the conversation.
        </p>

        {dataStructure?.ai_personalization && !showPersonalizeCustomize && (
          <button
            className="btn btn-link p-0"
            style={{ color: '#146ef5' }}
            onClick={() => setShowPersonalizeCustomize(true)}
          >
            Customize...
          </button>
        )}
        {dataStructure?.ai_personalization && showPersonalizeCustomize && (
          <div className="mt-3">
            <label className="fs-6">(Optional) Add custom instructions to guide the AI personalization</label>
            <textarea
              className="form-control setting-textarea"
              placeholder="Type instructions to guide the AI..."
              value={dataStructure?.ai_personalization_instructions || ''}
              onChange={(e) => setDataStructure({ ...dataStructure, ai_personalization_instructions: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-5">
        {!saveTemplateLoading ? (
          <button className="bg_theme_btn mb-3" onClick={() => { handleSaveTemplate(dataStructure)}}>Save Template</button>
        ) : (
          <Loader />
        )}
      </div>

      <TriggersTrargetsConditionsModel show={allData} handleClose={() => setAllData({ modelShow: false, modelShowType: "" }) } submitHndle={submitHndle} hasCleaningManagementIntegration={hasCleaningManagementIntegration} minut_user_id={minut_user_id}/>
      <React.Suspense fallback={<div>Loading...</div>}>
        <InboxUpgrade show={showUpgradeModal} handleClose={() => setShowUpgradeModal(false)} />
      </React.Suspense>
    </div>
  );
};

export default SmartTemplateAddEditForm;
