import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashBoardDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/dashboardComponent/dashboard";
import GetStarted from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/getStartedComponent/getStarted";
import HomeSmileScreenDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/homeSimileComponent/homeSimile";
import ActionDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/ActionComponent/action";
import MessageDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/messagingComponent/messaging";
import InsightComponent from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/insightComponent/insight";
import SettingsDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/settingsComponent/settings";
import GcsUserdata from "./sideItemComponent/gcsData";

import SideNavItem2 from "./sideNavBarElements/sectionIndicatorComponent/section";
import chevronLeftDouble from "./sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-left-double.svg";
import chevronRightDouble from "./sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-right-double.svg";
import helpIcon from "./sideNavBarElements/sectionIndicatorComponent/navIcons/help-circle.svg";
import logoutIcon from "./NavBarIcons/NewLogOut.svg";
import "./CollapsedNavbar.css";
import Logo from "../components/sideNavBarElements/logoComponent/logoComponent";
const icons = [
  { id: 0, component: <Logo colour="default" type="icon" onlyIcon={true} />, label: "HostBuddy" },
  { id: 1, component: <GetStarted />, label: "Get Started" },
  { id: 2, component: <DashBoardDefault />, label: "Dashboard" },
  { id: 3, component: <HomeSmileScreenDefault />, label: "Properties" },
  { id: 4, component: <ActionDefault />, label: "Action Items" },
  { id: 5, component: <MessageDefault />, label: "Messaging" },
  { id: 6, component: <InsightComponent />, label: "Insights" },
  { id: 7, component: <SettingsDefault />, label: "Settings" },
];

// Function to detect if device is mobile (consistent with NavBarContainer)
const isMobileDevice = () => {
  const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const isMobileWidth = screenWidth <= 768;
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  return isMobileWidth || (isMobileUserAgent && isTouchDevice);
};

const CollapsedNavbar = ({ isOpen, onExpand, navigationProps = {} }) => {
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const [hoverTimer, setHoverTimer] = useState(null);

  const {
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
  } = navigationProps;

  // Set selected based on current path
  useEffect(() => {
    // Map paths to IDs based on navigation structure
    const pathToIdMap = {
      "/getstarted": 1,
      "/dashboard": 2,
      "/properties": 3,
      "/action-item": 4,
      "/inbox": 5,
      "/statistics": 6,
      "/setting": 7,
      "/gcs-settings": 7,
    };

    // Find the ID that matches the current path
    const currentPath = Object.keys(pathToIdMap).find((path) =>
      location.pathname.startsWith(path)
    );

    if (currentPath) {
      setSelected(pathToIdMap[currentPath]);
    }
  }, [location.pathname]);
  // Handle mouse enter event for icons to expand the navbar after a short delay
  const handleIconMouseEnter = () => {
    // Don't trigger hover behavior on mobile devices
    if (isMobileDevice()) {
      return;
    }
    
    // Clear any existing hover timer
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }

    // Add a small delay before expanding
    const timer = setTimeout(() => {
      // Pass false to indicate this is a hover, not a click
      if (onExpand) onExpand(false);
    }, 100);

    setHoverTimer(timer);
  };

  // Handle mouse leave event for icons to cancel the expansion if the user moves away quickly
  const handleIconMouseLeave = () => {
    // Don't trigger hover behavior on mobile devices
    if (isMobileDevice()) {
      return;
    }
    if (hoverTimer) {
      clearTimeout(hoverTimer);
      setHoverTimer(null);
    }
  };

  // Cleanup the timer on unmount
  useEffect(() => {
    return () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer);
      }
    };
  }, [hoverTimer]);

  // Handle icon click with navigation
  const handleIconClick = (iconId) => {
    setSelected(iconId);

    if (handleNavigation) {
      switch (iconId) {
        case 1: // Get Started
          handleNavigation("/getstarted");
          break;
        case 2: // Dashboard or All Accounts (in GCS Portal)
          if (isInGcsPortal) {
            handleNavigation("/gcs-users");
          } else {
            handleNavigation("/dashboard");
          }
          break;
        case 3: // Properties
          handleNavigation("/properties");
          break;
        case 4: // Action Items
          handleNavigation("/action-item");
          break;
        case 5: // Messaging
          handleNavigation("/inbox");
          break;
        case 6: // Insights
          handleNavigation("/statistics");
          break;
        case 7: // Settings
          handleNavigation(isInGcsPortal ? "/gcs-settings" : "/setting");
          break;
        default:
          break;
      }
    }
  };

  const handleHelpClick = () => {
    window.open(
      "https://userguide.hostbuddy.ai/quick-start/getting-started",
      "_blank"
    );
  };

  const handleBackClick = (e) => {
    // Always expand the sidebar when clicked
    onExpand(true); // Explicitly pass true to indicate click
  };

  // When the user clicks the expand button
  const handleExpandClick = () => {
    // Explicitly set this as a clicked expansion, not a hover
    if (onExpand) {
      onExpand(true); // Pass true to indicate this was a click, not hover
    }
  };

  // Create appropriate icons array based on whether we're in GCS portal or not
  const gcsDataWithLogo = [
    {
      id: 0,
      component: <Logo colour="default" type="icon" onlyIcon={true} />,
      label: "HostBuddy",
    },
    ...GcsUserdata,
  ];

  const iconsToRender = isInGcsPortal ? gcsDataWithLogo : icons;

  // Filter icons based on user state
  const filteredIcons = iconsToRender.filter((icon) => {
    // Always show the logo
    if (icon.id === 0) return true;

    // In protected paths or logged in conditional paths
    if (isProtectedPath || (isConditionalPath && token)) {
      return true;
    }
    // For non-protected paths, don't show the navigation items
    return false;
  });

  // Check if an icon should have hover functionality
  const shouldHaveHover = (iconId) => {
    // Only these specific navigation icons should trigger navbar opening on hover
    // 1=Get Started, 2=Dashboard, 3=Properties, 4=Action Items, 5=Messaging, 6=Insights, 7=Settings
    return [1, 2, 3, 4, 5, 6, 7].includes(iconId);
  };  return (
    <div
      className={`collapsed-navbar${isOpen ? " open" : ""}`}
      style={{ 
        display: isOpen ? "flex" : "none", 
        transition: "all 200ms ease-in-out"
      }}
    >
      {" "}      <div 
        className="collapsed-navbar-hover-area"
        onMouseEnter={handleIconMouseEnter}
        onMouseLeave={handleIconMouseLeave}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          transition: "all 200ms ease-in-out"
        }}
      >
        <div className="collapsed-navbar-icons">          {filteredIcons.map((icon) => (
            <div
              key={icon.id}
              className={`collapsed-navbar-icon${
                selected === icon.id ? " selected" : ""
              }`}
              data-icon-id={icon.id}
              title={icon.label}
              onClick={() => (icon.id === 0 ? null : handleIconClick(icon.id))}
              style={{
                position: "relative",
                marginBottom: icon.id === 0 ? "16px" : "0px",
              }}
            >
              {selected === icon.id && (
                <div className="collapsed-selection-indicator" />
              )}
              {icon.component}
            </div>
          ))}</div>
        {/* Adding a flexible spacer to push utility icons to the bottom */}
        <div style={{ flex: 1 }}></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            {/* Logout Icon - placed above Help & Support */}
            <div
              style={{
                // marginBottom: 8,
                cursor: "pointer",
                // backgroundColor: '#000000',
                borderRadius: "4px",
                padding: "4px",
                display: "flex",
                justifyContent: "center",
              }}
              onClick={logoutHandle}
              title="Log Out"
            >
              <img
                src={logoutIcon}
                alt="Log Out"
                style={{ width: 24, height: 24 }}
              />
            </div>            <div
              style={{ padding:"8px", cursor: "pointer" }}
              onClick={handleHelpClick}
              title="Help & Support"
            >
              <img
                src={helpIcon}
                alt="Help & Support"
                style={{ width: 24, height: 24 }}
              />
            </div>
          </div>
        </div>
      </div>      {/* Expand button outside the hover area */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          }}
        >
          <button
            className="collapsed-navbar-expand"
            onClick={handleBackClick}
            title="Expand"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <img
              src={chevronRightDouble}
              alt="Expand"
              style={{ width: 24, height: 24 }}
            />
          </button>

          {/* {isInGcsPortal && (
            <div 
              style={{ marginTop: 8, cursor: 'pointer', fontSize: '12px', color: 'white' }} 
              onClick={logoutHandle}
              title="Log Out"
            >
              Log Out
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CollapsedNavbar;
