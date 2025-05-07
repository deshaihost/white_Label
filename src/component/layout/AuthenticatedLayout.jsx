import React, { useState, useEffect } from "react";
import NavBarContainer from "../newSideNavigationComponent/components/sideNavBarElements/NavBarContainer";
import Authorized from "../../helper/Authorized";

// This layout component renders the NavBarContainer for authenticated users
// and wraps the children components
const AuthenticatedLayout = ({ children }) => {
  const authData = Authorized();
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarClicked, setSidebarClicked] = useState(true); // Track if sidebar was clicked vs hovered

  // Listen for changes in the sidebar state
  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setSidebarWidth(event.detail.width);
      setSidebarOpen(event.detail.open);
      // If clicked property is present in the event, update sidebarClicked state
      if (event.detail.clicked !== undefined) {
        setSidebarClicked(event.detail.clicked);
      }
    };
    
    // Add event listener for sidebar state changes
    document.addEventListener("sidebarStateChanged", handleSidebarStateChange);
    
    // Initial sidebar state check
    if (window.getSidebarState) {
      const state = window.getSidebarState();
      setSidebarWidth(state.width);
      setSidebarOpen(state.open);
      setSidebarClicked(state.clicked !== undefined ? state.clicked : state.open);
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
        // Only adjust margin if sidebar was clicked open, otherwise keep at 64px
        marginLeft: (sidebarOpen && sidebarClicked) ? `${sidebarWidth}px` : "64px",
        transition: "margin-left 0.3s ease-in-out"
      }}>
        {children}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;