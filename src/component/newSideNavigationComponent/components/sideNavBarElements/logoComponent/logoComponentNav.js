import PropTypes from "prop-types";
import React from "react";
import icon from "../sectionIndicatorComponent/navIcons/logoDefault.svg";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    return (
        <div className="logo-container">
            <img className="logo-icon" alt="HostBuddy Icon" src={icon} />
        {!onlyIcon && <span className="logo-text">HostBuddy AI</span>}
        </div>
    );
};

// Logo.propTypes = {
//     type: PropTypes.oneOf(["icon"]),
//     colour: PropTypes.oneOf(["default"]),
//     onlyIcon: PropTypes.bool,
// };
export default Logo;