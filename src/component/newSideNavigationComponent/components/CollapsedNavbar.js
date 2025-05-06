import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashBoardDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/dashboardComponent/dashboard";
import GetStarted from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/getStartedComponent/getStarted";
import HomeSmileScreenDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/homeSimileComponent/homeSimile";
import ActionDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/ActionComponent/action";
import MessageDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/messagingComponent/messaging";
import InsightComponent from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/insightComponent/insight";
import SettingsDefault from "./sideNavBarElements/sectionIndicatorComponent/iconComponents/settingsComponent/settings";

import SideNavItem2 from "./sideNavBarElements/sectionIndicatorComponent/section";
import chevronLeftDouble from "./sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-left-double.svg";
import chevronRightDouble from "./sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-right-double.svg";
import helpIcon from "./sideNavBarElements/sectionIndicatorComponent/navIcons/help-circle.svg";
import logoutIcon from "./sideNavBarElements/sectionIndicatorComponent/navIcons/logout_icon.svg";
import "./CollapsedNavbar.css";
import Logo from "../components/sideNavBarElements/logoComponent/logoComponent";
const icons = [
  {id:0 , component: <Logo colour="default" type="icon" />, label: "Logo"},
  { id: 1, component: <GetStarted />, label: "Get Started" },
  { id: 2, component: <DashBoardDefault />, label: "Dashboard" },
  { id: 3, component: <HomeSmileScreenDefault />, label: "Properties" },
  { id: 4, component: <ActionDefault />, label: "Action Items" },
  { id: 5, component: <MessageDefault />, label: "Messaging" },
  { id: 6, component: <InsightComponent />, label: "Insights" },
  { id: 7, component: <SettingsDefault />, label: "Settings" },
];

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
    handleMessageTabSelect
  } = navigationProps;

  // Set selected based on current path
  useEffect(() => {
    // Map paths to IDs based on navigation structure
    const pathToIdMap = {
      '/getstarted': 1,
      '/dashboard': 2,
      '/properties': 3,
      '/action-item': 4,
      '/inbox': 5,
      '/statistics': 6,
      '/setting': 7,
      '/gcs-settings': 7
    };
    
    // Find the ID that matches the current path
    const currentPath = Object.keys(pathToIdMap).find(path => 
      location.pathname.startsWith(path)
    );
    
    if (currentPath) {
      setSelected(pathToIdMap[currentPath]);
    }
  }, [location.pathname]);

  // Handle mouse enter event to expand the navbar after a short delay
  const handleMouseEnter = () => {
    const timer = setTimeout(() => {
      onExpand();
    }, 100); // 300ms delay before expanding
    setHoverTimer(timer);
  };

  // Handle mouse leave event to cancel the expansion if the user moves away quickly
  const handleMouseLeave = () => {
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
      switch(iconId) {
        case 1: // Get Started
          handleNavigation('/getstarted');
          break;
        case 2: // Dashboard
          handleNavigation('/dashboard');
          break;
        case 3: // Properties
          handleNavigation('/properties');
          break;
        case 4: // Action Items
          handleNavigation('/action-item');
          break;
        case 5: // Messaging
          handleNavigation('/inbox');
          break;
        case 6: // Insights
          handleNavigation('/statistics');
          break;
        case 7: // Settings
          handleNavigation(isInGcsPortal ? '/gcs-settings' : '/setting');
          break;
        default:
          break;
      }
    }
  };

  const handleHelpClick = () => {
    window.open("https://userguide.hostbuddy.ai/quick-start/getting-started", "_blank");
  };

  const handleBackClick = (e) => {
    if (gcsToken && handlebackToUsersClick) {
      handlebackToUsersClick(e);
    } else {
      onExpand();
    }
  };

  // Filter icons based on user state
  const filteredIcons = icons.filter(icon => {
    // Always show the logo
    if (icon.id === 0) return true;
    
    // In protected paths or logged in conditional paths
    if (isProtectedPath || (isConditionalPath && token)) {
      // For GCS portal, only show certain items
      if (isInGcsPortal) {
        return [0, 7].includes(icon.id); // Only Logo and Settings
      }
      // Regular portal navigation
      return true;
    }
    // For non-protected paths, don't show the navigation items
    return false;
  });

  return (
    <div
      className={`collapsed-navbar${isOpen ? " open" : ""}`}
      style={{ display: isOpen ? "flex" : "none" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="collapsed-navbar-icons">
        {filteredIcons.map((icon) => (
          <div
            key={icon.id}
            className={`collapsed-navbar-icon${selected === icon.id ? " selected" : ""}`}
            title={icon.label}
            onClick={() => icon.id === 0 ? null : handleIconClick(icon.id)}
            style={{ position: "relative" }}
          >
            {selected === icon.id && (
              <div className="collapsed-selection-indicator" />
            )}
            {icon.component}
          </div>
        ))}
      </div>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          {/* Logout Icon - placed above Help & Support */}
          <div 
            style={{ 
              marginBottom: 8, 
              cursor: 'pointer',
              backgroundColor: '#000000',
              borderRadius: '4px',
              padding: '4px',
              display: 'flex',
              justifyContent: 'center'
            }} 
            onClick={logoutHandle}
            title="Log Out"
          >
            <img src={logoutIcon} alt="Log Out" style={{ width: 24, height: 24 }} />
          </div>
          
          <div 
            style={{ marginBottom: 8, cursor: 'pointer' }} 
            onClick={handleHelpClick}
            title="Help & Support"
          >
            <img src={helpIcon} alt="Help & Support" style={{ width: 24, height: 24 }} />
          </div>
          <button 
            className="collapsed-navbar-expand" 
            onClick={handleBackClick} 
            title={gcsToken ? "Back to Users" : "Expand"} 
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img src={gcsToken ? chevronLeftDouble : chevronRightDouble} alt="" style={{ width: 24, height: 24 }} />
          </button>
          
          {isInGcsPortal && (
            <div 
              style={{ marginTop: 8, cursor: 'pointer', fontSize: '12px', color: 'white' }} 
              onClick={logoutHandle}
              title="Log Out"
            >
              Log Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollapsedNavbar;
