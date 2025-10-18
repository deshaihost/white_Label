import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import logoHeading from "../../NavBarIcons/1_Expanded_Nav_Icon.svg";
import { useWhiteLabelLogos } from "../../../../../helper/WhiteLabelLogoContext";
import "./logoComponent.css";

export const Logo = ({ type, colour, onlyIcon }) => {
  const { fullLogo, loading, isHostBuddyDomain } = useWhiteLabelLogos();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Determine which logo to use
  const logoSrc = isHostBuddyDomain ? logoHeading : (fullLogo || logoHeading);
  
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
          opacity: (loading || !imageLoaded) ? 0 : 1,
          transition: 'opacity 0.2s ease-in-out'
        }}
        loading="eager"
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
