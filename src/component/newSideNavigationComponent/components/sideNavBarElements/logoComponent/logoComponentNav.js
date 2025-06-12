import PropTypes from "prop-types";
import React from "react";
import logoHeading from "../../NavBarIcons/Logo_heading.svg";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
    return (        <div className="logo-container" style={{
            width: "184px",
            height: "33.65px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
           
        }}>            <img 
                className="logo-icon" 
                alt="HostBuddy Logo" 
                src={logoHeading}
                style={{
                    height: "100%",
                    width: "auto",
                    objectFit: "contain"
                }}
            />
        </div>
    );
};

// Logo.propTypes = {
//     type: PropTypes.oneOf(["icon"]),
//     colour: PropTypes.oneOf(["default"]),
//     onlyIcon: PropTypes.bool,
// };
export default Logo;