import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SideItemComponent from "../sideItemComponent/Side-item-component";
import { Logo } from "./logoComponent/logoComponent";
import CollapsedNavbar from "../CollapsedNavbar";
import Authorized, { logOut } from "../../../../helper/Authorized";
import { setAuthorization } from "../../../../helper/apiCore";
import { getGcsToken } from "../../../../pages/gcs/gcs_functionality";
import "./NavBarContainer.css";

// Global style for the component
const navBarFontStyle = {
  fontFamily: "DM Sans, Helvetica",
};

function NavBarContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarClicked, setSidebarClicked] = useState(true); // Track if sidebar state was set by a click
  const [navbarHoverTimer, setNavbarHoverTimer] = useState(null);
  const [messagingActiveTab, setMessagingActiveTab] = useState(null); // Track which messaging tab is active, null means no selection
  
  // Debug: Log the current messagingActiveTab value
  useEffect(() => {
    console.log('MessagingActiveTab changed to:', messagingActiveTab);
  }, [messagingActiveTab]);
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

  // Update sidebar state with information about whether it was from a click or hover
  const updateSidebarState = (open, clicked) => {
    setSidebarOpen(open);
    setSidebarClicked(clicked);

    // Dispatch an event to notify other components about the sidebar state
    const event = new CustomEvent("sidebarStateChanged", {
      detail: {
        open,
        width: open ? 200 : 56,
        clicked,
      },
    });
    document.dispatchEvent(event);
  };

  // Handle mouse enter to temporarily expand the sidebar
  const handleMouseEnter = () => {
    if (navbarHoverTimer) {
      clearTimeout(navbarHoverTimer);
      setNavbarHoverTimer(null);
    }

    // Only apply hover effect if the sidebar isn't already open by clicking
    if (!sidebarOpen) {
      updateSidebarState(true, false); // Open by hover, not click
    }
  };

  // Handle mouse leave - only collapse if it was expanded by hovering
  const handleMouseLeave = () => {
    // Only collapse if the sidebar was opened by hover (not clicked)
    if (sidebarOpen && !sidebarClicked) {
      const timer = setTimeout(() => {
        updateSidebarState(false, false); // Close by hover ending, not click
      }, 300);
      setNavbarHoverTimer(timer);
    }
  };

  // Cleanup the timer on unmount
  useEffect(() => {
    return () => {
      if (navbarHoverTimer) {
        clearTimeout(navbarHoverTimer);
      }
    };
  }, [navbarHoverTimer]);  // Reset messaging tab when navigating away from inbox section
  useEffect(() => {
    if (!location.pathname.startsWith("/inbox")) {
      console.log('Clearing messaging tab because navigated away from inbox to:', location.pathname);
      setMessagingActiveTab(null);
    } else {
      console.log('On inbox path:', location.pathname, 'Current messaging tab:', messagingActiveTab);
    }
  }, [location.pathname, messagingActiveTab]);

  // List of paths that should show portal navigation
  const protectedPaths = [
    "/dashboard",
    "/statistics",
    "/properties",
    "/test-property",
    "/workbench",
    "/property-insight",
    "/subscription",
    "/setting",
    "/add-property",
    "/edit-property",
    "/guided-setup",
    "/inbox",
    "/action-item",
    "/getstarted",
    "/journey",
    "/gcs-users",
    "/gcs-settings",
  ];
  const isInGcsPortal =
    location.pathname.startsWith("/gcs-users") ||
    location.pathname.startsWith("/gcs-settings");

  // Check if current path should show portal navigation
  const isProtectedPath = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // List of paths that should show portal navigation based on login status
  const conditionalPaths = ["/getstarted", "/smart-templates"];
  // Check if current path should show portal navigation based on login status
  const isConditionalPath = conditionalPaths.includes(location.pathname); // Navigation handling functions
  const handleNavigation = (path, state) => {
    // Special case for ai-preferences - redirect content but keep URL
    if (
      path === "/setting/ai-preferences" ||
      path === "/gcs-settings/ai-preferences"
    ) {
      navigate("/inbox/preferences", {
        state: {
          ...(state || {}),
          activeComponent: 2, // The index for preferences component
          originalPath: path, // Store the original path
        },
      });
    } else if (state) {
      navigate(path, { state });
    } else {
      navigate(path);
    }
    handleNavLinkClick();
  };
  // Handle showing specific message interface component
  const handleMessageTabSelect = (index) => {
    console.log('User explicitly selected messaging tab:', index);
    setMessagingActiveTab(index);

    // Maps to the same URL structure as InboxIndex.jsx uses
    const urlSection = [
      "",
      "smart-templates",
      "preferences",
      "upsells",
      "review-removal",
    ][index];

    if (urlSection === "") {
      navigate("/inbox", { state: { activeComponent: index } });
    } else {
      navigate(`/inbox/${urlSection}`, { state: { activeComponent: index } });
    }
  };

  // Function to reset messaging tab selection
  const resetMessagingSelection = () => {
    console.log('Resetting messaging selection to -1');
    setMessagingActiveTab(-1);
  };

  // Enhanced functions that can be passed to SideItemComponent
  const getNavigationProps = () => {
    return {
      isProtectedPath,      isConditionalPath,
      token,
      isInGcsPortal,
      gcsToken,
      handleNavigation,
      logoutHandle,
      handlebackToUsersClick,
      messagingActiveTab,
      handleMessageTabSelect,
      resetMessagingSelection,
      expanded,
      setExpanded,
      handleNavLinkClick,
      handleToggle,
      handleToggleLogin,
      loginIcon,
      // Add new props for sidebar state control
      sidebarOpen,
      sidebarClicked,
      onCollapse: () => updateSidebarState(false, true), // Collapse via click
    };
  };

  // Add state update function that can be called from outside components
  useEffect(() => {
    // Create a function that can be called by other components to get sidebar state
    window.getSidebarState = () => ({
      open: sidebarOpen,
      width: sidebarOpen ? 240 : 64,
      clicked: sidebarClicked,
    });

    return () => {
      // Clean up
      delete window.getSidebarState;
    };
  }, [sidebarOpen, sidebarClicked]);

  // Handle explicit click to expand the sidebar
  const handleExpandClick = (isFromClick = true) => {
    updateSidebarState(true, isFromClick); // Open via explicit click or hover based on parameter
  };  return (    <div
      className={`navbar-main-container ${sidebarClicked ? 'expanded-by-click' : ''}`}
      style={{
        position: "fixed",
        backgroundColor: sidebarOpen ? "rgba(23, 25, 31, 1)" : "transparent",        top: 0,
        left: 0,
        zIndex: 1000,paddingTop: sidebarOpen ? "16px" : "0px",
        paddingBottom: sidebarOpen ? "16px" : "0px",
        paddingRight: sidebarOpen ? "8px" : "0px",
        paddingLeft: sidebarOpen ? "8px" : "0px",
        borderRight: "1px solid   #24262E",
        // width: "200px",
        fontFamily: "DM Sans, Helvetica",
      }}
    >      <style>
        {`
          @media (min-width: 1600px) {
            .navbar-main-container {
              // width: 240px !important;
            }
            .navbar-container-1600 {
              width: 224px !important;
            }
          }
        `}
      </style>
      
      {sidebarOpen ? (        <div
          className="navbar-container-1600"
          style={{
            backgroundColor: "rgba(23, 25, 31, 1)",
            width: "184px",
            overflowY: "auto",
            boxSizing: "border-box",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            transition: "transform 0.3s ease-in-out",
            transform: "translateX(0)",
            // boxShadow: "4px 0px 10px rgba(0, 0, 0, 0.1)",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            fontFamily: "DM Sans, Helvetica !important",
          }}
          onScroll={(e) => e.stopPropagation()}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
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
          <SideItemComponent
            onCollapse={() => updateSidebarState(false, true)}
            navigationProps={getNavigationProps()}
          />
        </div>
      ) : (        <div
          className="navbar-collapsed-container"
          style={{
            position: "relative",
            // backgroundColor: "rgba(23, 25, 31, 1)",
            overflowY: "auto",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
            boxShadow: "2px 0px 5px rgba(0, 0, 0, 0.1)",
            fontFamily: "DM Sans, Helvetica !important",
          }}
        >
          <CollapsedNavbar
            isOpen={!sidebarOpen}
            onExpand={handleExpandClick}
            navigationProps={getNavigationProps()}
          />
        </div>
      )}
    </div>
  );
}

export default NavBarContainer;
