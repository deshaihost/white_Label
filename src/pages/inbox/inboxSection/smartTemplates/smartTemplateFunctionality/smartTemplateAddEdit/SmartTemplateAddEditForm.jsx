import React, { useState, useRef, useEffect } from "react";
import Select, { components } from 'react-select';
import customStyles from "../../../resources/selectStyles";
import TriggersTrargetsConditionsModel from "./TriggersTrargetsConditionsModel";
import { dataInput, createTypeToGuesttypeMapping } from "./SmartTemplateJson";

const SmartTemplateAddEditForm = ({addEditSmart, addEditClose, AllDataGetHndle, allPropertyNamesList}) => {
  const { type, smartTemplateData } = addEditSmart;
  const { triggers, targets, conditions } = dataInput;
  const edit = "Edit";
  const add = "Add";
  const triggerName = "Trigger";
  const targetsName = "Targets";
  const conditionsName = "Conditions";
  
  const [allData, setAllData] = useState({ modelShow: false, modelShowType: "", formData: [] });
  const [triggeredGuestNote, setTriggeredGuestNote] = useState("");

  const dataStructurePayload = smartTemplateData?.smartItem ? smartTemplateData?.smartItem : { name:'', is_enabled:false, message:'', properties:[], triggers:[], targets:[], conditions:[] }; // Data structure for just this one template. The structure for all templates is stored in the parent
  const [dataStructure, setDataStructure] = useState(dataStructurePayload);

  const nameMapping = createTypeToGuesttypeMapping();
  const variables = {'guest_name':'Guest name'};

  // Modal submit to add a new trigger/target/condition or edit an existing one
  const submitHndle = (getFormData) => {
    const { data, type, editAddTypeSubmitHndle, modelShowType, triggerFormData } = getFormData; // triggerFormData is the selected trigger/target/condition obj from the dataInput json
    const { typepAddEdit, editIndex } = editAddTypeSubmitHndle || {};
    const newTrigger = { type, data };
    const useTriggeredGuest = !!triggerFormData?.useTriggeredGuest; // useTriggeredGuest is a bool: true iff useTriggeredGuest string is present in triggerFormData
    useTriggeredGuest && setTriggeredGuestNote(triggerFormData?.useTriggeredGuest);
    
    if (modelShowType === triggerName) {
      setDataStructure((prevData) => {
        const updatedTargets = useTriggeredGuest ? [{ type: 'triggered_guest', data: {} }] : prevData.targets.filter(target => target.type !== 'triggered_guest');
        if (typepAddEdit === add) {
          return { ...prevData, triggers: [...prevData.triggers, newTrigger], targets: updatedTargets };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.triggers];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) { updatedTriggers[editIndex] = newTrigger; }
          return { ...prevData, triggers: updatedTriggers, targets: updatedTargets };
        }
      });
    } else if (modelShowType === targetsName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return { ...prevData, targets: [...prevData.targets, newTrigger] };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.targets];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) {
            updatedTriggers[editIndex] = newTrigger;
          }
          return { ...prevData, targets: updatedTriggers };
        }
      });
    } else if (modelShowType === conditionsName) {
      setDataStructure((prevData) => {
        if (typepAddEdit === add) {
          return { ...prevData, conditions: [...prevData.conditions, newTrigger] };
        } else if (typepAddEdit === edit) {
          const updatedTriggers = [...prevData.conditions];
          if (editIndex >= 0 && editIndex < updatedTriggers.length) { updatedTriggers[editIndex] = newTrigger; }
          return { ...prevData, conditions: updatedTriggers };
        }
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

  const handleTextAreaChange = (e) => {
    setDataStructure({ ...dataStructure, message: e.target.value });
  };



  // ------- Property multi select (TODO: move this to its own component & file) -------
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selectRef = useRef(null);

  const options = allPropertyNamesList.map((propertyName) => ({ value: propertyName, label: propertyName }));

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

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions); // Update the UI
    setDataStructure({ ...dataStructure, properties: selectedOptions.map((option) => option.value) }); // Update the data structure
  };

  const handleSelectAllClick = (e) => {
    e.preventDefault();
    setSelectedOptions(options); // Update the UI
    setDataStructure({ ...dataStructure, properties: allPropertyNamesList }); // Update the data structure
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
    <div className='smartTemplateAddEdit'>
      <div className="d-flex gap-3 flex-wrap align-items-center justify-content-between mb-3">
        <div>
          <h1>{type?.type} Smart Template</h1>
          <p onClick={addEditClose} className="text-primary" style={{cursor: "pointer"}}>&lt; Smart Templates </p>
        </div>

        <button className="bg_theme_btn mb-3" onClick={() => { AllDataGetHndle(dataStructure, type); addEditClose(); }}>Save</button>

      </div>

      <p style={{color:'#AAA', fontSize:'16px', textAlign:'left'}}>Smart Templates lets you create highly customized templated messages to suit your exact needs. Choose specific triggers, target recipients, and conditions to send to the right guests at the right time.</p>
      <hr className="bg-white opacity-100 my-4" style={{ height: "2px" , opacity:'75%'}} />

      <div className="nameAndEnableSection">
        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
          <p className="fs-5 fw-bold">Template Name</p>
          <input type="text" className="form-control mt-2" value={dataStructure?.name} onChange={(e) => {setDataStructure({ ...dataStructure, name: e.target.value });}}/>
        </div>

        <div className="enableSection">
          <p className="d-flex align-items-center gap-5">
            Enable
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" checked={dataStructure?.is_enabled} onChange={(e) => {setDataStructure({...dataStructure, is_enabled: e.target.checked});}} id="flexSwitchCheckChecked"/>
            </div>
          </p>
          <p className="fs-14 text-muted">
            You currently have this template <span className={dataStructure?.is_enabled ? "text-success" : "text-danger"}>{dataStructure?.is_enabled ? "enabled" : "disabled"}</span>
          </p>
        </div>

        <div ref={selectRef} className="propertySelectSection">
          <p style={{fontSize:"14px", textAlign:"center", marginBottom:'2px'}}>Applies to these properties:</p>
          <Select className="custom-select property_Custom_Select" isMulti options={options} value={selectedOptions} onChange={handleChange} placeholder="Select properties..." components={{ ValueContainer, MultiValueContainer: () => null }} hideSelectedOptions={false} closeMenuOnSelect={false} styles={customStyles} menuIsOpen={menuIsOpen} onMenuOpen={() => setMenuIsOpen(true)} onMenuClose={() => setMenuIsOpen(false)}/>
          <a href="#" className="clickableLink" onClick={handleSelectAllClick}>Select all</a>
        </div>
      </div>
      
      <div className="triggersSection">
        <p className="fs-5 fw-bold">Triggers</p>
        <p className="fs-14 mt-1 mb-3 text-muted">These are the events that will cause the message to be sent.</p>
        {dataStructure?.triggers?.length > 0 &&
          dataStructure?.triggers?.map((trigger, index) => {
            const { type } = trigger;
            return (
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <p className="fs-6">{nameMapping[type]}</p>
                    <div className="d-flex align-items-center gap-3">
                      <p className="text-danger mainCursor fs-6" onClick={() => handleRemove(index, triggerName)}>
                        Remove
                      </p>
                      <p className="text-primary mainCursor fs-6" onClick={() => setAllData({modelShow: true, modelShowType: triggerName, formData: triggers, editFormData: trigger, editIndex: index, typepAddEdit: edit })}>Edit</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {dataStructure?.triggers?.length < 1 && ( // For now, only one trigger can be added
          <button
            className="bg-none text-primary border-0 outline-0 mt-3 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
            onClick={() => setAllData({modelShow: true, modelShowType: triggerName, formData: triggers, typepAddEdit: add})}
          >
            <i className="bi bi-plus fs-3"></i> Add a Trigger
          </button>
        )}
      </div>

      <div className="targetsSection">
        <p className="fs-5 fw-bold">Targets</p>
        <p className="fs-14 mt-1 mb-3 text-muted">These are the guests that will receive the message. Your message will be sent to ALL of the target groups you select here, wherever the conditions are met.</p>
        {dataStructure?.targets?.length > 0 &&
          dataStructure?.targets?.map((targetsItem, index) => {
            const { type } = targetsItem;
            return (
              <div className="row">
                <div className={`col-12 ${type !== 'triggered_guest' ? 'col-lg-4' : ''}`}>
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    {type !== 'triggered_guest' ? (
                      <p className="fs-6">{nameMapping[type]}</p>
                    ) : (
                      <p className="fs-6">Triggered Guest - <span style={{fontSize:"1em", color:'#888', fontSize:'16px'}}>{triggeredGuestNote}</span></p>
                    )}
                    {type !== 'triggered_guest' && (
                      <div className="d-flex align-items-center gap-3">
                        <p className="text-danger mainCursor fs-6" onClick={() => handleRemove(index, targetsName)}>
                          Remove
                        </p>
                        <p className="text-primary mainCursor fs-6"
                          onClick={() => setAllData({ modelShow: true, modelShowType: targetsName, formData: targets, editFormData: targetsItem, editIndex: index, typepAddEdit: edit })}
                        >
                          Edit
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="bg-none text-primary border-0 outline-0 mt-3 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
            onClick={() => setAllData({ modelShow: true, modelShowType: targetsName, formData: targets, typepAddEdit: add })}
          >
            <i className="bi bi-plus fs-3 "></i> Add a Target
          </button>
      </div>

      <div className="conditionsSection">
        <p className="fs-5 fw-bold">Conditions</p>
        <p className="fs-14 mt-1 mb-3 text-muted">These are the conditions that ALL must be met in order for the message to be sent. If no conditions are added, then the message will be sent to all target guests whenever the trigger fires.</p>
        {dataStructure?.conditions?.length > 0 &&
          dataStructure?.conditions?.map((conditionsItem, index) => {
            const { type } = conditionsItem;
            return (
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex align-items-center justify-content-between gap-2 mt-2">
                    <p className="fs-6">{nameMapping[type]}</p>
                    <div className="d-flex align-items-center gap-3">
                      <p className="text-danger mainCursor fs-6" onClick={() => handleRemove(index, conditionsName)}>
                        Remove
                      </p>
                      <p className="text-primary mainCursor fs-6"
                        onClick={() => setAllData({modelShow: true, modelShowType: conditionsName, formData: conditions, editFormData: conditionsItem, editIndex: index, typepAddEdit: edit })}
                      >
                        Edit
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        <button
          className="bg-none text-primary border-0 outline-0 mt-3 fs-6 fw-bold px-2 mt-1 d-flex align-items-center"
          onClick={() => setAllData({ modelShow: true, modelShowType: conditionsName, formData: conditions, typepAddEdit: add })}
        >
          <i className="bi bi-plus fs-3 "></i> Add a Conditions
        </button>
      </div>

      <hr className="bg-white opacity-100" style={{height:"2px", marginTop:'50px', opacity:'75%'}} />
      
      <h3 className="available-variables-heading mt-5 text-center">Message</h3>

      <div className="d-flex flex-wrap flex-md-nowrap gap-2 align-items-center justify-content-between mt-5">
        <div className="available-variables-section">
          <label className="fs-5">Variables</label>
          <p className="settings-label">Click to add custom variables to your message. These variables will change to match the data for each reservation.</p>
          <div className="available-variables mt-3">
            {Object.keys(variables).map((key, index) => (
              <span key={index} className="variable" onClick={() => insertVariableAtCursor(document.getElementById('templateMessage'), `[[${key}]]`)}>{variables[key]}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="row mt-4 mb-5 justify-content-center">
        <div className="col-lg-11">
          <div className="d-flex align-items-center justify-content-center gap-5">
            <label className="fs-5">Message</label>
          </div>
          <div className="d-flex justify-content-center">
            <textarea id="templateMessage" className="form-control setting-textarea" value={dataStructure?.message} onChange={handleTextAreaChange} placeholder="Enter your message here..."/>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button className="bg_theme_btn mb-3" onClick={() => { AllDataGetHndle(dataStructure, type); addEditClose(); }}>Save Template</button>
      </div>

      <TriggersTrargetsConditionsModel show={allData} handleClose={() => setAllData({ modelShow: false, modelShowType: "" }) } submitHndle={submitHndle} />
    </div>
  );
};

export default SmartTemplateAddEditForm;
