import React, { useState, useRef, useEffect } from 'react';
import './DropdownComponent.css';

const DropdownComponent = ({ 
  options = [
    { id: 1, label: 'Item' },
    { id: 2, label: 'Item' },
    { id: 3, label: 'Item' }
  ],
  placeholder = 'Select an option',
  onSelect,
  defaultValue,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setHoveredIndex(-1);
  };

  const handleOptionSelect = (option, index) => {
    setSelectedOption(option);
    setIsOpen(false);
    setHoveredIndex(-1);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>
      <div 
        className={`dropdown-trigger ${isOpen ? 'dropdown-trigger--active' : ''}`}
        onClick={handleToggle}
      >
        <span className="dropdown-trigger__text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg 
          className={`dropdown-trigger__icon ${isOpen ? 'dropdown-trigger__icon--rotated' : ''}`}
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">          {options.map((option, index) => (            <div
              key={option.id}
              className={`dropdown-option ${
                selectedOption?.id === option.id ? 'dropdown-option--selected' : ''
              } ${
                hoveredIndex === index ? 'dropdown-option--hovered' : ''
              }`}
              onClick={() => handleOptionSelect(option, index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {(selectedOption?.id === option.id || hoveredIndex === index) && (
                <div className="dropdown-option__selection-indicator" />
              )}
              <span className="dropdown-option__label">{option.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
