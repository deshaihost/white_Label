import React, { useState, useEffect } from "react";
import NavBarContainer from "../newSideNavigationComponent/components/sideNavBarElements/NavBarContainer";
import Authorized from "../../helper/Authorized";

// This layout component renders the NavBarContainer for authenticated users
// and wraps the children components
const AuthenticatedLayout = ({ children }) => {
  const authData = Authorized();  // Initialize with responsive width based on screen size
  const getInitialSidebarWidth = () => {
    return window.innerWidth >= 1600 ? 240 : 200;
  };
  
  const [sidebarWidth, setSidebarWidth] = useState(getInitialSidebarWidth());
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
    };    // Handle window resize to update sidebar width responsively
    const handleResize = () => {
      const newWidth = window.innerWidth >= 1600 ? 240 : 200;
      setSidebarWidth(newWidth);
    };
    
    // Add event listener for sidebar state changes
    document.addEventListener("sidebarStateChanged", handleSidebarStateChange);
    window.addEventListener("resize", handleResize);
    
    // Initial sidebar state check
    if (window.getSidebarState) {
      const state = window.getSidebarState();
      setSidebarWidth(state.width);
      setSidebarOpen(state.open);
      setSidebarClicked(state.clicked !== undefined ? state.clicked : state.open);
    }
    
    return () => {
      document.removeEventListener("sidebarStateChanged", handleSidebarStateChange);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // Calculate the current effective sidebar width
  const effectiveSidebarWidth = sidebarClicked 
    ? (sidebarOpen ? sidebarWidth : 56) 
    : 56;
  // Get responsive width for main content calculation based on sidebar state
  const getResponsiveContentWidth = () => {
    const screenWidth = window.innerWidth;
    
    // If sidebar is collapsed (not clicked or not open), use collapsed width
    if (!sidebarClicked || !sidebarOpen) {
      return 'calc(100% - 56px)';
    }
    
    // If sidebar is expanded, use responsive width based on screen size
    if (screenWidth >= 1600) {
      return 'calc(100% - 240px)';
    } else {
      return 'calc(100% - 200px)';
    }
  };

  const getResponsiveMarginLeft = () => {
    const screenWidth = window.innerWidth;
    
    // If sidebar is collapsed (not clicked or not open), use collapsed margin
    if (!sidebarClicked || !sidebarOpen) {
      return '56px';
    }
    
    // If sidebar is expanded, use responsive margin based on screen size
    if (screenWidth >= 1600) {
      return '240px';
    } else {
      return '200px';
    }
  };

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
        width: getResponsiveContentWidth(),
        marginLeft: getResponsiveMarginLeft(),
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