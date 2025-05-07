import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SideItemComponent from "../sideItemComponent/Side-item-component";
import { Logo } from "./logoComponent/logoComponent";
import CollapsedNavbar from "../CollapsedNavbar";
import Authorized, { logOut } from "../../../../helper/Authorized";
import { setAuthorization } from "../../../../helper/apiCore";
import { getGcsToken } from "../../../../pages/gcs/gcs_functionality";

// Global style for the component 
const navBarFontStyle = {
  fontFamily: "DM Sans, Helvetica"
};

function NavBarContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [navbarHoverTimer, setNavbarHoverTimer] = useState(null);
  const [messagingActiveTab, setMessagingActiveTab] = useState(0); // Track which messaging tab is active
  const location = useLocation();
  const navigate = useNavigate();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : {};
  const gcsToken = getGcsToken();
  
  // State from UserNavBar
  const [loginIcon, setLoginIcon] = useState(false);
  const [expanded, setExpanded] = useState(false);
  
  // UserNavBar functionality
  const handleToggle = () => {
    setExpanded(!expanded);
    setLoginIcon(false);
  };

  const handleNavLinkClick = () => {
    setExpanded(false);
  };

  const logoutHandle = async (e) => {
    e.preventDefault();
    logOut();
    navigate("/login");
  };

  const handlebackToUsersClick = (e) => {
    e.preventDefault();
    setExpanded(false);
    setAuthorization(gcsToken);
    navigate("/gcs-users");
  };

  const handleToggleLogin = () => {
    setLoginIcon(!loginIcon);
    setExpanded(false);
  };

  // Handle mouse leave to close the expanded navbar with a slight delay
  const handleMouseLeave = () => {
    const timer = setTimeout(() => {
      setSidebarOpen(false);
    }, 300); // 300ms delay before collapsing
    setNavbarHoverTimer(timer);
  };

  // Handle mouse enter to cancel closing if user moves back quickly
  const handleMouseEnter = () => {
    if (navbarHoverTimer) {
      clearTimeout(navbarHoverTimer);
      setNavbarHoverTimer(null);
    }
  };

  // Cleanup the timer on unmount
  useEffect(() => {
    return () => {
      if (navbarHoverTimer) {
        clearTimeout(navbarHoverTimer);
      }
    };
  }, [navbarHoverTimer]);

  // Determine which messaging tab is active based on URL
  useEffect(() => {
    if (location.pathname.startsWith('/inbox/smart-templates')) {
      setMessagingActiveTab(1);
    } else if (location.pathname.startsWith('/inbox/preferences')) {
      setMessagingActiveTab(2);
    } else if (location.pathname.startsWith('/inbox/upsells')) {
      setMessagingActiveTab(3);
    } else if (location.pathname.startsWith('/inbox')) {
      setMessagingActiveTab(0);
    }
  }, [location.pathname]);

  // List of paths that should show portal navigation
  const protectedPaths = ["/dashboard", "/statistics", "/properties", "/test-property", "/workbench", "/property-insight", "/subscription", "/setting", "/add-property", "/edit-property", "/guided-setup", "/inbox", "/action-item", "/getstarted", "/journey", "/gcs-users", '/gcs-settings'];
  const isInGcsPortal = ["/gcs-users", '/gcs-settings'].includes(location.pathname);

  // Check if current path should show portal navigation
  const isProtectedPath = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of paths that should show portal navigation based on login status
  const conditionalPaths = ["/getstarted", "/smart-templates"];

  // Check if current path should show portal navigation based on login status
  const isConditionalPath = conditionalPaths.includes(location.pathname);

  // Navigation handling functions
  const handleNavigation = (path, state) => {
    if (state) {
      navigate(path, { state });
    } else {
      navigate(path);
    }
    handleNavLinkClick();
  };

  // Handle showing specific message interface component
  const handleMessageTabSelect = (index) => {
    setMessagingActiveTab(index);
    
    // Maps to the same URL structure as InboxIndex.jsx uses
    const urlSection = ["", "smart-templates", "preferences", "upsells", "review-removal"][index];
    
    if (urlSection === "") {
      navigate('/inbox', { state: { activeComponent: index } });
    } else {
      navigate(`/inbox/${urlSection}`, { state: { activeComponent: index } });
    }
  };

  // Enhanced functions that can be passed to SideItemComponent
  const getNavigationProps = () => {
    return {
      isProtectedPath,
      isConditionalPath,
      token,
      isInGcsPortal,
      gcsToken,
      handleNavigation,
      logoutHandle,
      handlebackToUsersClick,
      messagingActiveTab,
      handleMessageTabSelect,
      expanded,
      setExpanded,
      handleNavLinkClick,
      handleToggle,
      handleToggleLogin,
      loginIcon
    };
  };

  // Add state update function that can be called from outside components
  useEffect(() => {
    // Create a function that can be called by other components to get sidebar state
    window.getSidebarState = () => ({ 
      open: sidebarOpen, 
      width: sidebarOpen ? 240 : 64,
      clicked: true // Default to true for initial state
    });
    
    // Dispatch an event when the sidebar state changes
    const event = new CustomEvent("sidebarStateChanged", { 
      detail: { 
        open: sidebarOpen, 
        width: sidebarOpen ? 240 : 64,
        clicked: true // This is a clicked state change, not hover
      } 
    });
    document.dispatchEvent(event);
    
    return () => {
      // Clean up
      delete window.getSidebarState;
    };
  }, [sidebarOpen]);

  // Handle mouse hover separately from click events
  const handleSidebarHover = (isHovered) => {
    if (isHovered) {
      // When hovering, don't set clicked state
      const event = new CustomEvent("sidebarStateChanged", { 
        detail: { 
          open: true, 
          width: 240,
          clicked: false // This is a hover state change, not a click
        } 
      });
      document.dispatchEvent(event);
    } else if (!sidebarOpen) {
      // When hover ends and sidebar wasn't explicitly opened, collapse back
      const event = new CustomEvent("sidebarStateChanged", { 
        detail: { 
          open: false, 
          width: 64,
          clicked: false // This is a hover state ending, not a click
        } 
      });
      document.dispatchEvent(event);
    }
  };

  // Handle explicit click to expand the sidebar
  const handleExpandClick = (isClicked) => {
    setSidebarOpen(true);
    // Create a custom event with clicked state explicitly set to true
    const event = new CustomEvent("sidebarStateChanged", { 
      detail: { 
        open: true, 
        width: 240,
        clicked: true // This is a clicked action, force it to true
      } 
    });
    document.dispatchEvent(event);
  };

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      height: "100vh",
      zIndex: 1000,
      fontFamily: "DM Sans, Helvetica"
    }}>
      {sidebarOpen ? (
        <div
          style={{
            backgroundColor: "rgba(23, 25, 31, 1)",
            width: "240px",
            height: "100vh", // Maintain full height by default
            maxHeight: "100vh", // Constraint for scrolling when content exceeds viewport
            overflowY: "auto",
            padding: "16px",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease-in-out",
            transform: "translateX(0)",
            boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
            fontFamily: "DM Sans, Helvetica !important",
          }}
          onScroll={(e) => e.stopPropagation()}
          onMouseLeave={() => {
            handleMouseLeave();
            handleSidebarHover(false);
          }}
          onMouseEnter={() => {
            handleMouseEnter();
            handleSidebarHover(true);
          }}
        >
          <style>
            {`
              div::-webkit-scrollbar {
                display: none;
              }
              
              /* Apply font family to all text elements in the navbar */
              .navbar-container-wrapper, 
              .navbar-container-wrapper * {
                font-family: "DM Sans", Helvetica;
              }
            `}
          </style>
          {/* <Logo colour="default" type="icon" /> */}
          <SideItemComponent onCollapse={() => {
            setSidebarOpen(false);
            // When explicitly collapsed, update with clicked state
            const event = new CustomEvent("sidebarStateChanged", { 
              detail: { 
                open: false, 
                width: 64,
                clicked: true // This is a click action
              } 
            });
            document.dispatchEvent(event);
          }} navigationProps={getNavigationProps()} />
        </div>
      ) : (
        <div style={{
          position: "relative",
          backgroundColor: "rgba(23, 25, 31, 1)",
          height: "100vh", // Maintain full height by default
          maxHeight: "100vh", // Constraint for scrolling when content exceeds viewport
          overflowY: "auto",
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
          fontFamily: "DM Sans, Helvetica !important"
        }}>
          <CollapsedNavbar 
            isOpen={!sidebarOpen} 
            onExpand={() => {
              // When expand icon is clicked, explicitly set sidebarOpen and dispatch event
              setSidebarOpen(true);
              
              // Use setTimeout to ensure state change happens after render
              setTimeout(() => {
                const event = new CustomEvent("sidebarStateChanged", { 
                  detail: { 
                    open: true, 
                    width: 240,
                    clicked: true // Force this to true for clicks
                  } 
                });
                document.dispatchEvent(event);
              }, 0);
            }} 
            navigationProps={getNavigationProps()} 
          />
        </div>
      )}
    </div>
  );
}

export default NavBarContainer;
