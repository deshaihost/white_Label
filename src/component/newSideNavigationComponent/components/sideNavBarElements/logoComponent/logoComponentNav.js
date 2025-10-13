import PropTypes from "prop-types";
import React from "react";
import logoHeading from "../../NavBarIcons/1_Expanded_Nav_Icon.svg";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
  const { fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
  
  // Don't render anything while loading
  if (loading) {
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
        <div style={{ width: "134px", height: "34px" }}></div>
      </div>
    );
  }

  // Determine which logo to use
  let logoSrc;
  if (isHostBuddyDomain) {
    // Use local HostBuddy full logo for hostbuddy.ai domain
    logoSrc = logoHeading;
  } else if (fullLogo) {
    // Use fetched white label full logo for other domains
    logoSrc = fullLogo;
  } else {
    // Don't show any logo if not loaded and not hostbuddy domain
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
        <div style={{ width: "134px", height: "34px" }}></div>
      </div>
    );
  }
  
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
          objectFit: "fill",
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
