import React from "react";
import chevDownDefault from "./iconComponents/chevDownComponent/chevDownDefault" 
import "./sectionIndicator.css";
import PropTypes from "prop-types";

const SideNavItem2 = ({
    showTrailingIcon = true,
    showLeadingIcon = true,
    showCounter = false,
    counter = 0,
    isSelected,
    stateProp,
    size,
    label,
    component,
    onSelect,
    id,
    trailingIconRotate
}) => {
    return (
        <div
            className={`side-nav-item ${isSelected ? 'selected' : ''} ${stateProp || 'default'} ${size === 'sub' ? 'sub-item' : ''}`}
            onClick={onSelect}
        >
            {isSelected && <div className="selection-indicator" />}
            {showLeadingIcon && component && <div className="instance-node">{component}</div>}
            <div className="text-wrapper">{label}</div>
            {showCounter && counter > 0 && <div className="counter">{counter}</div>}
            {showTrailingIcon && (
                <div className={`trailing-icon ${trailingIconRotate ? 'rotated' : ''}`}>
                    <chevDownDefault className="instance-node" />
                </div>
            )}
        </div>
    );
};

SideNavItem2.propTypes = {
    showTrailingIcon: PropTypes.bool,
    showLeadingIcon: PropTypes.bool,
    showCounter: PropTypes.bool,
    counter: PropTypes.number,
    isSelected: PropTypes.bool,
    stateProp: PropTypes.oneOf(["hover", "default"]),
    size: PropTypes.oneOf(["primary", "sub"]),
    label: PropTypes.string,
    onSelect: PropTypes.func,
    id: PropTypes.number,
    trailingIconRotate: PropTypes.bool
};

export default SideNavItem2;