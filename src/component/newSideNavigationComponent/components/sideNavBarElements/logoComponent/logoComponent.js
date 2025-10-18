import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import icon from "../sectionIndicatorComponent/navIcons/NewLogoCollapse.svg";
import useWhiteLabelBranding from "../../../../../helper/useWhiteLabelBranding";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    const { isWhiteLabel, brandName } = useWhiteLabelBranding();
    const { logo, fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
    const [imageLoaded, setImageLoaded] = useState(false);
    
    // Determine which logo to use
    const logoSrc = isHostBuddyDomain ? icon : (logo || icon);
    
    // Preload image when logo URL changes
    useEffect(() => {
        if (logoSrc) {
            setImageLoaded(false);
            const img = new Image();
            img.onload = () => setImageLoaded(true);
            img.onerror = () => setImageLoaded(true); // Show even on error
            img.src = logoSrc;
        }
    }, [logoSrc]);
    
    // For collapsed navigation, show the small logo (40x40)
    if (onlyIcon) {
        return (
            <div className="logo-container">
                <img 
                    className="logo-icon" 
                    alt={`${brandName} Icon`} 
                    src={logoSrc}
                    style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        opacity: (loading || !imageLoaded) ? 0 : 1,
                        transition: 'opacity 0.2s ease-in-out'
                    }}
                    loading="eager"
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
                src={logoSrc}
                style={{
                    width: '40px',
                    height: '40px',
                    objectFit: 'contain',
                    opacity: (loading || !imageLoaded) ? 0 : 1,
                    transition: 'opacity 0.2s ease-in-out'
                }}
                loading="eager"
            />
            <span className="logo-text" style={{
                opacity: (loading || !imageLoaded) ? 0 : 1,
                transition: 'opacity 0.2s ease-in-out'
            }}>
                {brandName} AI
            </span>
        </div>
    );
};

Logo.propTypes = {
    type: PropTypes.oneOf(["icon"]),
    colour: PropTypes.oneOf(["default"]),
    onlyIcon: PropTypes.bool,
};
export default Logo;