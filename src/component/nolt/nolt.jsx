import React, { useEffect } from "react";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

const NoltWidget = () => {
  const { isHostBuddyDomain } = useWhiteLabelCss();
  
  // Check if running on localhost
  const currentHostname = window.location.hostname;
  const isLocalHost = currentHostname === 'localhost' || currentHostname === '127.0.0.1';
  
  // Determine if widget should be shown (HostBuddy domain or localhost)
  const shouldShowWidget = isHostBuddyDomain || isLocalHost;

  useEffect(() => {
    // Only load Nolt script on HostBuddy domain or localhost
    if (!shouldShowWidget) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.nolt.io/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [shouldShowWidget]);

  // Only render on HostBuddy domain or localhost
  if (!shouldShowWidget) {
    return null;
  }

  return (
    <a
      data-nolt="modal"
      href="https://hostbuddy-ai.nolt.io"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#003f99",
        color: "#fff",
        borderRadius: "9999px", // Pill shape via a large radius
        padding: "8px 16px",   // Reduced padding for smaller widget
        fontSize: "13px",       // Added fontSize for smaller text
        textDecoration: "none",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(255,255,255,0.3)"
      }}
    >
      🚀 Product Roadmap
    </a>
  );
};

export default NoltWidget;
