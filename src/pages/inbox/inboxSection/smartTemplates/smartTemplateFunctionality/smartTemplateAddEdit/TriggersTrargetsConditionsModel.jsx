import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import toasthandle from "../../../../../../helper/ToastMessage";
import { useWhiteLabelCss } from "../../../../../../helper/WhiteLabelCssContext";

const TriggersTrargetsConditionsModel = (props) => {
  const { show, handleClose, submitHndle, hasCleaningManagementIntegration, minut_user_id } = props;
  const { modelShow, modelShowType, formData, minutFormData, editFormData, typepAddEdit, editIndex, followUpIndex } = show;

  // White Label CSS Context for secondary background color
  const cssContext = useWhiteLabelCss();

  const [selectGet, setSelectGet] = useState({}); // Selected trigger/target/condition obj from the dataInput json
  const [inputDataGet, setInputDataGet] = useState({});
  const [label, setLabel] = useState("");
  const [labelLine2, setLabelLine2] = useState("");
  const [isMinutData, setIsMinutData] = useState(false);

  const selectInterface = "selectInterface";
  const selecter = "selecter";
  const inputValue = "inputValue";
  const inputShow = selectGet?.formDataConvert ? selectGet?.formDataConvert : selectGet;
  const { type, inputFiled } = inputShow || {};
  const month1to31 = "month1to31";

  const typeToTileMapping = {'Trigger':'Send When', 'Target':'Send To', 'Conditions':'Send If', 'Follow-Up Conditions':'Follow-Up Condition'};
  const typeToMinutBtnMapping = {'Trigger':'triggers', 'Conditions':'conditions', 'Follow-Up Conditions':'conditions'};

  const dataToUse = isMinutData ? minutFormData : formData;

  // Filter the data based on whether it's for follow-up conditions or not
  const filteredData = dataToUse?.filter(item => {
    if (modelShowType === 'Follow-Up Conditions') {
      // For follow-ups, show all conditions including followUpOnly ones
      return true;
    } else if (modelShowType === 'Conditions') {
      // For regular conditions, hide followUpOnly ones
      return !item?.followUpOnly;
    }
    // For other types (triggers etc), show everything
    return true;
  });

  const OnchangeHndle = (e, typeForm, onlyUsed) => {
    const { name, value } = e.target;
    if (typeForm === selectInterface) {
      const currentFormData = isMinutData ? minutFormData : formData;
      const formDataFilter = currentFormData?.filter((item) => item?.type === value);
      const formDataConvert = formDataFilter?.[0] || {}; // Select the first item by default
      setSelectGet(formDataConvert);
      setLabel(formDataConvert?.label || ""); // Set label dynamically if present
      setLabelLine2(formDataConvert?.labelLine2 || ""); // Set labelLine2 dynamically if present

      // Initialize inputDataGet with default values from formDataConvert.inputFiled
      const defaultInputData = {};
      formDataConvert.inputFiled?.forEach((inputFile) => {
        const { payloadType, defaultVal, type } = inputFile;
        if (defaultVal !== undefined) {
          defaultInputData[payloadType] = defaultVal;
        } else if (type === "multiSelecter") {
          defaultInputData[payloadType] = []; // Empty array for multi-select
        } else {
          defaultInputData[payloadType] = ""; // Empty string for other types
        }
      });
      setInputDataGet(defaultInputData);
    } else if (typeForm === inputValue) {
      if (onlyUsed === month1to31) {
        if (value === "" || (value >= 1 && value <= 31)) {
          setInputDataGet({ ...inputDataGet, [name]: value });
        }
      } else {
        setInputDataGet({ ...inputDataGet, [name]: value });
      }
    } else if (typeForm === selecter) {
      setInputDataGet({ ...inputDataGet, [name]: value });
    }
  };

  const closeHndleModel = () => {
    handleClose();
    setSelectGet({});
    setInputDataGet({});
    setLabel(""); // Reset label when modal is closed
    setLabelLine2(""); // Reset labelLine2 when modal is closed
    setIsMinutData(false); // Reset isMinutData when modal is closed
  };

  const onSubmitHndle = () => {
    // Validate required fields before submitting
    if (!type) {
      toasthandle("Please select a trigger type before confirming.", "danger");
      return;
    }

    // Check if all required input fields are filled
    const requiredFields = inputFiled?.filter(field => !field.optional) || [];
    const emptyRequiredFields = requiredFields.filter(field => {
      // Skip validation for fields that should be disabled based on another field's value
      if (field.disableIf) {
        const disableConditionValue = inputDataGet[field.disableIf];
        // If the condition field is true/checked, this field is disabled and should not be validated
        if (disableConditionValue === true) {
          return false; // Don't mark as empty/required since it's disabled
        }
      }
      
      const value = inputDataGet[field.payloadType];
      // For checkbox fields, false is a valid value (unchecked state), not empty
      if (field.type === "checkbox") {
        return false; // Checkboxes are never required to be checked
      }
      
      if (field.type === "multiSelecter") {
        return !value || value.length === 0;
      }
      
      // For number fields, allow 0 as a valid value
      if (field.type === "number") {
        return value === null || value === undefined || value === "";
      }
      return !value || value === "";
    });

    if (emptyRequiredFields.length > 0) {
      // Helper function to safely get field names
      const getFieldName = (field) => {
        const { inputLabel, payloadType } = field;
        if (typeof inputLabel === 'string') {
          return inputLabel;
        }
        if (Array.isArray(inputLabel)) {
          return payloadType || 'Unknown field'; // Use payloadType as fallback for array labels
        }
        if (typeof inputLabel === 'object' && inputLabel !== null) {
          return inputLabel.label || inputLabel.text || payloadType || 'Unknown field';
        }
        return payloadType || 'Unknown field';
      };
      
      const missingFieldNames = emptyRequiredFields.map(field => getFieldName(field)).join(", ");
      toasthandle(`Please fill the following required field(s): ${missingFieldNames}`, "danger");
      return;
    }

    console.log("Submitting trigger data:", { type:type, data:inputDataGet }); // <-- Add this line
    const editAddTypeSubmitHndle = { typepAddEdit, editIndex, followUpIndex };
    
    // Show success message and remind user to save
    toasthandle("Condition added successfully! Please save the template.", "success");
    
    submitHndle({ type:type, data:inputDataGet, editAddTypeSubmitHndle, modelShowType, triggerFormData:selectGet });
    closeHndleModel();
    setIsMinutData(false); // Reset isMinutData when modal is closed after confirm
  };

  // edit functionality
  const editTypeForm = editFormData?.type;

  useEffect(() => {
    const currentFormData = isMinutData ? minutFormData : formData;
    const formDataFilter = currentFormData?.filter((item) => item?.type === editTypeForm);
    const formDataConvert = formDataFilter?.[0] || {};
    setLabel(formDataConvert?.label || ""); // Set label when editing if present
    setLabelLine2(formDataConvert?.labelLine2 || ""); // Set labelLine2 when editing if present
    setSelectGet(formDataConvert);

    if (editFormData?.data) {
      setInputDataGet(editFormData?.data);
    } else {
      // Initialize inputDataGet with default values
      const defaultInputData = {};
      formDataConvert.inputFiled?.forEach((inputFile) => {
        const { payloadType, defaultVal, type } = inputFile;
        if (defaultVal !== undefined) {
          defaultInputData[payloadType] = defaultVal;
        } else if (type === "multiSelecter") {
          defaultInputData[payloadType] = []; // Empty array for multi-select
        } else {
          defaultInputData[payloadType] = ""; // Empty string for other types
        }
      });
      setInputDataGet(defaultInputData);
    }
  }, [editFormData, formData, isMinutData]);

  const renderFormInput = (input, index) => {
    const { type, inputLabel, payloadType, defaultVal, min, max, disableIf, onlyUsed } = input;
    
    // Helper function to safely render label text
    const getLabelText = (label) => {
      if (typeof label === 'string') {
        return label;
      }
      if (Array.isArray(label)) {
        return ''; // Don't render array labels directly as text
      }
      if (typeof label === 'object' && label !== null) {
        return label.label || label.text || ''; // Try common object properties
      }
      return '';
    };
    
    // Check if this field should be disabled based on another field
    const isDisabled = disableIf && inputDataGet[disableIf] === true;

    // Common styles for disabled fields - add visual masking effect
    const disabledStyle = isDisabled ? {
      opacity: 0.5,
      pointerEvents: 'none',
      backgroundColor: '#333',
      position: 'relative'
    } : {};

    switch (type) {
      case "number":
        return (
          <div key={index} className="mb-3">
            <label className="form-label">{getLabelText(inputLabel)}</label>
            <input
              type={type}
              className="form-control"
              value={inputDataGet[payloadType] ?? ""}
              name={payloadType}
              onChange={(e) => OnchangeHndle(e, inputValue, onlyUsed)}
              min={min}
              max={max}
              disabled={isDisabled}
              style={isDisabled ? disabledStyle : {}}
            />
          </div>
        );

      case "time":
        return (
          <div key={index} className="mb-3" style={isDisabled ? { position: 'relative' } : {}}>
            <label className="form-label" style={isDisabled ? { opacity: 0.6 } : {}}>
              {getLabelText(inputLabel)}
            </label>
            <input
              type="time"
              className="form-control"
              value={inputDataGet[payloadType] ?? ""}
              name={payloadType}
              onChange={(e) => OnchangeHndle(e, inputValue, onlyUsed)}
              min={min}
              max={max}
              disabled={isDisabled}
              style={disabledStyle}
            />
            {isDisabled && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                zIndex: 1
              }}></div>
            )}
          </div>
        );
        
      case "select":
        return (
          <div key={index} className="mb-3">
            <label className="form-label">{getLabelText(inputLabel)}</label>
            <select
              aria-label="Default select example"
              className="bg-dark form-select form-control text-white"
              name={payloadType}
              value={inputDataGet[payloadType] || ""}
              onChange={(e) => OnchangeHndle(e, selecter)}
              disabled={isDisabled}
            >
              {inputLabel?.map((item) => {
                const { value, label, selectLabel } = item;
                const displayLabel = label || selectLabel;
                return (
                  <option value={value} key={value} disabled={value === ""}>
                    {displayLabel}
                  </option>
                );
              })}
            </select>
          </div>
        );
        
      case "multiSelecter":
        return (
          <div key={index} className="mb-3">
            <label className="form-label">{getLabelText(inputLabel)}</label>
            <Multiselect
              className="multiselect_option"
              displayValue="label"
              options={inputLabel}
              selectedValues={
                (inputDataGet[payloadType] || []).map(value => { // Convert the selected values to the format expected by the Multiselect component
                  const label = inputLabel.find(item => item.value === value)?.label || value;
                  return { label, value };
                })
              }
              onRemove={(selectedList) => {
                const valuesList = selectedList.map(item => item.value);
                setInputDataGet({ ...inputDataGet, [payloadType]: valuesList });
              }}
              onSelect={(selectedList) => { // Extract just the values from the selected items in the Multiselect format
                const valuesList = selectedList.map(item => item.value);
                setInputDataGet({ ...inputDataGet, [payloadType]: valuesList });
              }}
            />
          </div>
        );
        
      case "checkbox":
        return (
          <div key={index} className="mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={`checkbox-${payloadType}`}
                checked={inputDataGet[payloadType] || false}
                onChange={(e) => {
                  setInputDataGet({
                    ...inputDataGet,
                    [payloadType]: e.target.checked
                  });
                }}
                disabled={isDisabled}
              />
              <label className="form-check-label" htmlFor={`checkbox-${payloadType}`}>
                {getLabelText(inputLabel)}
              </label>
            </div>
          </div>
        );
        
      case "date":
        return (
          <div key={index} className="mb-3" style={isDisabled ? { position: 'relative' } : {}}>
            <label className="form-label" style={isDisabled ? { opacity: 0.6 } : {}}>
              {getLabelText(inputLabel)}
            </label>
            <input
              type="date"
              className="form-control"
              value={inputDataGet[payloadType] || ""}
              onChange={(e) => {
                setInputDataGet({
                  ...inputDataGet,
                  [payloadType]: e.target.value
                });
              }}
              disabled={isDisabled}
              style={disabledStyle}
            />
            {isDisabled && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                zIndex: 1
              }}></div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Modal 
      show={modelShow} 
      size="lg" 
      onHide={closeHndleModel} 
      aria-labelledby="contained-modal-title-vcenter" 
      centered
      className="send-if-modal"
    >
      <Modal.Header closeButton>
        {/* <h5 className="modal-title">{typepAddEdit} New {modelShowType}</h5> */}
        <h5 className="modal-title">{typeToTileMapping?.[modelShowType]}</h5>
      </Modal.Header>
      <Modal.Body 
        className="send-if-modal-body"
        style={{
          backgroundColor: cssContext?.cssConfig ? 'var(--white-label-background-secondary)' : undefined,
        }}
      >
        <div className="addition_des">
          <div className='item-select my-3'>
            <select aria-label="Default select example" className="bg-dark form-control form-select text-white" value={selectGet?.type || ""} onChange={(e) => OnchangeHndle(e, selectInterface)}>
              {filteredData?.map((item) => {
                const { type, guesttype } = item;
                return (
                  <option value={type} disabled={type === ""} key={type}>
                    {guesttype}
                  </option>
                );
              })}
            </select>
          </div>
          {minut_user_id && (
            <div style={{ display:'flex', justifyContent:'center' }}>
              <button onClick={() => setIsMinutData(!isMinutData)} style={{background:'none', border:'none', color:'#146ef5', cursor:'pointer', margin:'0 auto'}}>
                {isMinutData ? `Standard ${typeToMinutBtnMapping?.[modelShowType]}...` : `Minut ${typeToMinutBtnMapping?.[modelShowType]}...`}
              </button>
            </div>
          )}

          {/* Render the label dynamically if it exists */}
          {label && <p className="trigger-label">{label}</p>}
          {labelLine2 && <p className="trigger-label">{labelLine2}</p>}

          <hr className="bg-primary my-4" style={{ height: "2px" }} />

          <>
            {inputFiled?.map((inputFile, index) => renderFormInput(inputFile, index))}
          </>
        </div>

        {!hasCleaningManagementIntegration && (type === 'cleaning_complete') && (
          <p className="settings-label" style={{marginTop:'10px', color:'rgb(255, 165, 0)', fontSize:'16px', textAlign:'center'}}>This event requires a supported cleaning management software integration. <Link to="/setting/integrations">Click here</Link> to set one up.</p>
        )}

        {inputFiled?.length > 0 ? (
          <>
            <div className="text-center mt-3 gap-3 addition_des_button modal_addition_des_button d-flex md:flex-wrap">
              <button type="submit" className="bg_theme_btn mb-3" onClick={closeHndleModel}>
                Cancel
              </button>
              <button type="submit" className="bg_theme_btn mb-3" onClick={onSubmitHndle} disabled={!hasCleaningManagementIntegration && (type === 'cleaning_complete')}>
                Confirm
              </button>
            </div>
          </>
        ) : (
          <div className="text-center mt-3 addition_des_button modal_addition_des_button">
            <button type="submit" className="bg_theme_btn mb-3" onClick={closeHndleModel}>
              Close
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TriggersTrargetsConditionsModel;
