import React, { useState } from 'react';
import './SelectDropComponent.css';
import chevronDownIcon from '../icons/chevron-down-filter.svg';

const SelectDropComponent = ({ fieldData, isOpen, onToggle }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onToggle(); // Close the dropdown after selection
  };

  return (
    <div className="select-drop-container">
      <label className="select-label">{fieldData.label}</label>
      <div 
        className={`select-field ${isOpen ? 'focus' : ''}`} 
        onClick={onToggle}
      >
        <span className="select-value">
          {selectedOption ? selectedOption.value : fieldData.placeholder}
        </span>
        <img 
          src={chevronDownIcon} 
          alt="dropdown" 
          className={`chevron-icon ${isOpen ? 'rotate' : ''}`} 
        />
      </div>
      
      {isOpen && (
        <ul className="options-list">
          {fieldData.options.map((option) => (
            <li 
              key={option.id} 
              className={`option-item ${selectedOption && selectedOption.id === option.id ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(option)}
              tabIndex={0}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectDropComponent;