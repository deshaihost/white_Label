import PropTypes from "prop-types";
import React from "react";
import logoHeading from "../../NavBarIcons/1_Expanded_Nav_Icon.svg";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
  const { fullLogo, loading } = useWhiteLabelLogos();
  
  // Use white label full logo if available, otherwise use default
  const logoSrc = fullLogo || logoHeading;
  
  return (
    <div
      className="logo-container"
      style={{
        width: "184px",
        height: "34px",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <img
        className="logo-icon"
        alt="Logo"
        src={logoSrc}
        style={{
          width: "134px",
          height: "34px",
          objectFit: "contain",
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
