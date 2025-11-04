import React, { useState, useRef, useEffect } from "react";
import "./DropdownComponent.css";

const DropdownComponent = ({
  options = [
    { id: 1, label: "Item" },
    { id: 2, label: "Item" },
    { id: 3, label: "Item" },
  ],
  placeholder = "Select an option",
  onSelect,
  onOpen,
  defaultValue,
  className = "",
  isLoading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [pressedIndex, setPressedIndex] = useState(-1);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };  }, []);
  
  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    setHoveredIndex(-1);

    // Call onOpen callback when opening the dropdown
    if (newIsOpen && onOpen) {
      onOpen();
    }
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

  const handleMouseDown = (index) => {
    setPressedIndex(index);
  };

  const handleMouseUp = () => {
    setPressedIndex(-1);
  };

  return (
    <div className={`dropdown-component-container ${className}`} ref={dropdownRef}>
      <div
        className={`dropdown-component-trigger ${
          isOpen ? "dropdown-component-trigger--active" : ""
        }`}
        onClick={handleToggle}
      >
        <span className="dropdown-component-trigger__text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`dropdown-component-trigger__icon ${
            isOpen ? "dropdown-component-trigger__icon--rotated" : ""
          }`}
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
        <div
          className="dropdown-component-menu"
          style={{
            backgroundColor: "#2B2E36",
            border: "1px solid rgba(189, 193, 201, 0.15)",
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 99999,
            marginTop: "4px",
            borderRadius: "6px",
            boxShadow: "0px 8px 12px 0px rgba(15, 17, 23, 0.4)",
            minHeight: "40px",
            maxHeight: "200px",
            width: "100%",
            opacity: 1,
            visibility: "visible",
            display: "block",
            overflowY: "auto",
          }}        >
          {options && options.length > 0 && !isLoading ? (
            options.map((option, index) => (
              <div
                key={option.id}
                className={`dropdown-component-option ${
                  selectedOption?.id === option.id
                    ? "dropdown-component-option--selected"
                    : ""
                } ${hoveredIndex === index ? "dropdown-component-option--hovered" : ""} ${
                  pressedIndex === index ? "dropdown-component-option--pressed" : ""
                }`}                style={{
                  paddingLeft: "20px", // Add extra left padding for selection indicator
                }}                onClick={() => handleOptionSelect(option, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={() => handleMouseDown(index)}
                onMouseUp={handleMouseUp}
              >                {(selectedOption?.id === option.id ||
                  hoveredIndex === index) && (
                  <div 
                    className="dropdown-component-option__selection-indicator"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "14px",
                      backgroundColor: "#3E88F7",
                      borderRadius: "0px 2px 2px 0px",
                      opacity: 1,
                    }}
                  />
                )}
                <span className="dropdown-component-option__label">{option.label}</span>
              </div>
            ))
          ) : isLoading ? (
            <div
              style={{
                padding: "10px",
                color: "#D0D3DB",
                backgroundColor: "transparent",
                textAlign: "center",
              }}
            >
              Loading...
            </div>
          ) : (
            <div
              style={{
                padding: "10px",
                color: "#D0D3DB",
                backgroundColor: "transparent",
              }}
            >
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
