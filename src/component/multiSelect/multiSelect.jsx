import React, { useState, useRef, useEffect } from 'react';
import Select, { components } from 'react-select';
import customStyles from './selectStyles';

const MultiSelect = ({
  options,
  selectedOptions,
  setSelectedOptions,
  placeholder = 'Select options...',
  selectAllText = 'Select all',
  width = '250px',
  customSelectStyles = null
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
        : placeholder;
    return (
      <components.ValueContainer {...props}>
        <div style={{
          color: selectedValues.length > 0 ? '#a6a9b2' : '#676A73',
          fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontVariationSettings: "'opsz' 14"
        }}>{displayText}</div>
        {children}
      </components.ValueContainer>
    );
  };

  // Custom Option with checkbox
  const Option = (props) => {
    const isSelected = props.isSelected;
    return (
      <components.Option {...props}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '4px',
            border: `2px solid ${isSelected ? '#3e88f7' : '#013280'}`,
            backgroundColor: isSelected ? '#3e88f7' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {isSelected && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span>{props.label}</span>
        </div>
      </components.Option>
    );
  };

  // Custom MenuList with Select All button at the top
  const MenuList = (props) => {
    const allSelected = selectedOptions.length === options.length;
    
    return (
      <components.MenuList {...props}>
        <div
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (allSelected) {
              setSelectedOptions([]);
            } else {
              setSelectedOptions(options);
            }
          }}
          style={{
            padding: '12px 16px',
            color: '#3e88f7',
            fontSize: '14px',
            fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontWeight: '600',
            fontVariationSettings: "'opsz' 14",
            borderBottom: '1px solid #013280',
            cursor: 'pointer',
            backgroundColor: '#0F1117',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#01255e'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0F1117'}
        >
          {allSelected ? 'Deselect all' : 'Select all'}
        </div>
        {props.children}
      </components.MenuList>
    );
  };

  const handleChange = (options) => {
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
            components={{ 
              ValueContainer, 
              MultiValueContainer: () => null,
              Option,
              MenuList
            }}
            hideSelectedOptions={false}
            closeMenuOnSelect={false}
            styles={customSelectStyles || customStyles(width)}
            menuIsOpen={menuIsOpen}
            onMenuClose={() => setMenuIsOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default MultiSelect;