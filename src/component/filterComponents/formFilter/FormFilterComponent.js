import React, { useState } from 'react';
import './FormFilterComponent.css';
import { fromData } from './formData/formData';
import SelectDropComponent from './selectDropComponent/SelectDropComponent';

const FormFilterComponent = ({ onCancel }) => {
  // State to track which dropdown is currently open
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // Function to handle dropdown toggle
  const handleDropdownToggle = (dropdownId) => {
    // If the clicked dropdown is already open, close it
    // Otherwise, open the clicked dropdown (closing any other open one)
    setOpenDropdownId(openDropdownId === dropdownId ? null : dropdownId);
  };

  return (
    <div className="form-filter-container">
      <div className="form-filter-header">
        <h2 className="form-filter-title">Filter Form</h2>
      </div>
      <div className="form-filter-column">
        {fromData.map((fieldData) => (
          <div key={fieldData.id} className="form-filter-item">
            <SelectDropComponent 
              fieldData={fieldData} 
              isOpen={openDropdownId === fieldData.id}
              onToggle={() => handleDropdownToggle(fieldData.id)}
            />
          </div>
        ))}
      </div>
      <div className="form-filter-footer">
        <button className="reset-button">
          Reset
        </button>
        <div className="footer-right-buttons">
          <button className="cancel-button" onClick={onCancel}>
            Cancel
          </button>
          <button className="apply-button">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormFilterComponent;