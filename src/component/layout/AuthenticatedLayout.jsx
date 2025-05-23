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

  // Calculate the current effective sidebar width
  const effectiveSidebarWidth = sidebarClicked 
    ? (sidebarOpen ? sidebarWidth : 64) 
    : 64;

  return (
    <div className="authenticated-layout" style={{ 
      display: "flex",
      height: "100%",
      width: "100%" 
    }}>
      {/* NavBarContainer is fixed positioned, so doesn't affect layout flow */}
      {authData && <NavBarContainer />}
      
      {/* Main content area - takes up the remaining space */}
      <div style={{ 
        width: `calc(100% - ${effectiveSidebarWidth}px)`, 
        marginLeft: `${effectiveSidebarWidth}px`,
        height: "100%",
        overflow: "auto",
        transition: "margin-left 0.3s ease-in-out, width 0.3s ease-in-out",
        boxSizing: "border-box" // Ensure padding is included in width calculation
      }}>
        
        {/* Bread Crumbs */}

      
        {children}
      </div>
    </div>
  );
};

export default AuthenticatedLayout;