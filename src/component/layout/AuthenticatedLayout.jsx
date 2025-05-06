import React, { useState, useEffect } from "react";
import NavBarContainer from "../newSideNavigationComponent/components/sideNavBarElements/NavBarContainer";
import Authorized from "../../helper/Authorized";

// This layout component renders the NavBarContainer for authenticated users
// and wraps the children components
const AuthenticatedLayout = ({ children }) => {
  const authData = Authorized();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Listen for changes in the sidebar state
  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setSidebarWidth(event.detail.width);
      setSidebarOpen(event.detail.open);
    };
    
    // Add event listener for sidebar state changes
    document.addEventListener("sidebarStateChanged", handleSidebarStateChange);
    
    // Initial sidebar state check
    if (window.getSidebarState) {
      const state = window.getSidebarState();
      setSidebarWidth(state.width);
      setSidebarOpen(state.open);
    }
    
    return () => {
      document.removeEventListener("sidebarStateChanged", handleSidebarStateChange);
    };
  }, []);

  return (
    <div className="authenticated-layout" style={{ 
      display: "flex", 
      flexDirection: "column", 
      width: "100%" 
    }}>
      {authData && <NavBarContainer />}
      <div style={{ 
        width: "100%", 
        minHeight: "100vh", 
        overflow: "auto",
        // When sidebar is open, it's an overlay so no margin needed
        // When sidebar is collapsed, add margin equal to collapsed width (64px)
        marginLeft: sidebarOpen ? "64px" : "64px",
        transition: "margin-left 0.3s ease-in-out"
      }}>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;