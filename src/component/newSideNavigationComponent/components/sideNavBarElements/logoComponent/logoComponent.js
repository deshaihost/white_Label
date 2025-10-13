import PropTypes from "prop-types";
import React from "react";
import icon from "../sectionIndicatorComponent/navIcons/NewLogoCollapse.svg";
import useWhiteLabelBranding from "../../../../../helper/useWhiteLabelBranding";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    const { isWhiteLabel, brandName } = useWhiteLabelBranding();
    const { logo, fullLogo, loading } = useWhiteLabelLogos();
    
    // For collapsed navigation, show the small logo (40x40)
    if (onlyIcon) {
        // Use white label collapsed logo if available, otherwise use default
        const logoSrc = logo || icon;
        
        return (
            <div className="logo-container">
                <img 
                    className="logo-icon" 
                    alt={`${brandName} Icon`} 
                    src={logoSrc}
                    style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain'
                    }}
                />
            </div>
        );
    }
    
    // For expanded navigation, show branding text
    return (
        <div className="logo-container">
            <img 
                className="logo-icon" 
                alt={`${brandName} Icon`} 
                src={logo || icon}
                style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain'
                }}
            />
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