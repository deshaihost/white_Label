import React, { useState, useRef, useEffect } from 'react';
import Select, { components } from 'react-select';
import customStyles from './selectStyles';

const MultiSelect = ({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder = 'Select options...',
  selectAllText = 'Select all',
  width = '250px'
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Custom ValueContainer to display the number of selected options
  const ValueContainer = ({ children, ...props }) => {
    const { getValue } = props;
    const selectedValues = getValue();
    const displayText =
      selectedValues.length > 0
        ? `${selectedValues.length} item${selectedValues.length === 1 ? '' : 's'} selected`
        : '';
    return (
      <components.ValueContainer {...props}>
        <div>{displayText}</div>
        {children}\
        
      </components.ValueContainer>
    );
  };

  const handleChange = (options) => {
    setSelectedOptions(options);
  };

  const handleSelectAllClick = (e) => {
    e.preventDefault();
    setSelectedOptions(options);
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
  }, []);

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

  return (
    <>
      <div className="select-and-button" style={{width:width}}>
        <div ref={selectRef} className="select-wrapper" style={{ width:width }}>
          <Select
            className="custom-select"
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            placeholder={placeholder}
            components={{ ValueContainer, MultiValueContainer: () => null }}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            styles={customStyles(width)}
            menuIsOpen={menuIsOpen}
            onMenuClose={() => setMenuIsOpen(false)}
          />
        </div>
        <a href="#" className="clickableLink" onClick={handleSelectAllClick} style={{fontSize:'14px', margin:'2px auto 0 auto', display:'block', textAlign:'center'}}>
          {selectAllText}
        </a>
      </div>
    </>
  );
};

export default MultiSelect;