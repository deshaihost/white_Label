import PropTypes from "prop-types";
import React from "react";
import icon from "../sectionIndicatorComponent/navIcons/NewLogoCollapse.svg";
import useWhiteLabelBranding from "../../../../../helper/useWhiteLabelBranding";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    const { isWhiteLabel, brandName } = useWhiteLabelBranding();
    
    console.log('🟠 Logo component rendering:', { type, colour, onlyIcon, isWhiteLabel, brandName });
    
    // For collapsed navigation, always show just the HostBuddy icon
    if (onlyIcon) {
        console.log('🟠 Logo: Rendering only icon (collapsed state)');
        return (
            <div className="logo-container">
                <img className="logo-icon" alt="HostBuddy" src={icon} />
            </div>
        );
    }
    
    // For expanded navigation, show branding text
    console.log('🟠 Logo: Rendering with text (expanded state)');
    return (
        <div className="logo-container">
            <img className="logo-icon" alt={`${brandName} Icon`} src={icon} />
            <span className="logo-text">{brandName} AI</span>
        </div>
    );
};

Logo.propTypes = {
    type: PropTypes.oneOf(["icon"]),
    colour: PropTypes.oneOf(["default"]),
    onlyIcon: PropTypes.bool,
};
export default Logo;