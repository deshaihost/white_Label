import PropTypes from "prop-types";
import React from "react";
import icon from "../sectionIndicatorComponent/navIcons/NewLogoCollapse.svg";
import useWhiteLabelBranding from "../../../../../helper/useWhiteLabelBranding";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    const { isWhiteLabel, brandName } = useWhiteLabelBranding();
    
    return (
        <div className="logo-container">
            <img className="logo-icon" alt={`${brandName} Icon`} src={icon} />
            {!onlyIcon && <span className="logo-text">{brandName} AI</span>}
        </div>
    );
};

Logo.propTypes = {
    type: PropTypes.oneOf(["icon"]),
    colour: PropTypes.oneOf(["default"]),
    onlyIcon: PropTypes.bool,
};
export default Logo;