import PropTypes from "prop-types";
import React from "react";
import icon from "../sectionIndicatorComponent/navIcons/NewLogoCollapse.svg";
import useWhiteLabelBranding from "../../../../../helper/useWhiteLabelBranding";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    const { isWhiteLabel, brandName } = useWhiteLabelBranding();
    const { logo, fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
    
    // For collapsed navigation, show the small logo (40x40)
    if (onlyIcon) {
        // Don't render anything while loading
        if (loading) {
            return (
                <div className="logo-container">
                    <div style={{ width: '40px', height: '40px' }}></div>
                </div>
            );
        }

        // Determine which logo to use
        let logoSrc;
        if (isHostBuddyDomain) {
            // Use local HostBuddy logo for hostbuddy.ai domain
            logoSrc = icon;
        } else if (logo) {
            // Use fetched white label logo for other domains
            logoSrc = logo;
        } else {
            // Don't show any logo if not loaded and not hostbuddy domain
            return (
                <div className="logo-container">
                    <div style={{ width: '40px', height: '40px' }}></div>
                </div>
            );
        }
        
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
    // Don't render while loading
    if (loading) {
        return (
            <div className="logo-container">
                <div style={{ width: '40px', height: '40px' }}></div>
            </div>
        );
    }

    // Determine which logo to use
    let logoSrc;
    if (isHostBuddyDomain) {
        logoSrc = icon;
    } else if (logo) {
        logoSrc = logo;
    } else {
        return (
            <div className="logo-container">
                <div style={{ width: '40px', height: '40px' }}></div>
            </div>
        );
    }

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