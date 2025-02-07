import React, { useEffect } from "react";

const NoltWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.nolt.io/widgets.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      data-nolt="modal"
      href="https://hostbuddy-ai.nolt.io"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#007bff",
        color: "#fff",
        borderRadius: "9999px", // Pill shape via a large radius
        padding: "8px 16px",   // Reduced padding for smaller widget
        fontSize: "14px",       // Added fontSize for smaller text
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
