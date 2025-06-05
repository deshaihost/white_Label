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
    <div className={`dropdown-container ${className}`} ref={dropdownRef}>
      <div
        className={`dropdown-trigger ${
          isOpen ? "dropdown-trigger--active" : ""
        }`}
        onClick={handleToggle}
      >
        <span className="dropdown-trigger__text">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          className={`dropdown-trigger__icon ${
            isOpen ? "dropdown-trigger__icon--rotated" : ""
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
          className="dropdown-menu"
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
                className={`dropdown-option ${
                  selectedOption?.id === option.id
                    ? "dropdown-option--selected"
                    : ""
                } ${hoveredIndex === index ? "dropdown-option--hovered" : ""}`}                style={{
                  padding: "10px 12px",
                  paddingLeft: "20px", // Add extra left padding for selection indicator
                  color: "#D0D3DB",
                  cursor: "pointer",
                  backgroundColor:
                    pressedIndex === index
                      ? "#001330"
                      : selectedOption?.id === option.id
                      ? "#01255E"
                      : hoveredIndex === index
                      ? "#013280"
                      : "transparent",
                  borderRadius: "4px",
                  margin: "2px 0",
                  fontSize: "14px",
                  transition: "background-color 0.15s ease",
                  position: "relative", // Ensure relative positioning for absolute selection indicator
                }}                onClick={() => handleOptionSelect(option, index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onMouseDown={() => handleMouseDown(index)}
                onMouseUp={handleMouseUp}
              >                {(selectedOption?.id === option.id ||
                  hoveredIndex === index) && (
                  <div 
                    className="dropdown-option__selection-indicator"
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
                <span className="dropdown-option__label">{option.label}</span>
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
