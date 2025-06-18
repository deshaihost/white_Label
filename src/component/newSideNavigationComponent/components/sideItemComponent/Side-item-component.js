import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNavItem2 from "../sideNavBarElements/sectionIndicatorComponent/section";
import { data } from "./data";
import GcsUserdata from "./gcsData";
import helpIcon from "../sideNavBarElements/sectionIndicatorComponent/navIcons/help-circle.svg";
import Logo from "../../components/sideNavBarElements/logoComponent/logoComponentNav";
import "../../components/sideNavBarElements/logoComponent/logoComponent.css";
import { is_gcs_subaccount_user } from "../../../../pages/gcs/gcs_functionality";

function SideItemComponent({ onCollapse, navigationProps = {} }) {
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [settingsActiveTab, setSettingsActiveTab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isProtectedPath,
    isConditionalPath,
    token,
    isInGcsPortal,
    gcsToken,
    handleNavigation,
    logoutHandle,
    handlebackToUsersClick,
    messagingActiveTab, // New prop from NavBarContainer
    handleMessageTabSelect, // New function from NavBarContainer
  } = navigationProps;

  // Set selected ID and expand dropdowns based on current path
  useEffect(() => {
    // Map paths to IDs based on your navigation structure
    const pathToIdMap = {
      "/getstarted": 1,
      "/dashboard": 2,
      "/properties": 3,
      "/action-item": 4,
      "/inbox": 5,
      "/setting": 7,
    };

    // Find the ID that matches the current path
    const currentPath = Object.keys(pathToIdMap).find((path) =>
      location.pathname.startsWith(path)
    );

    if (currentPath) {
      setSelectedId(pathToIdMap[currentPath]);      // Auto-expand Messaging dropdown when in inbox section
      if (currentPath === "/inbox") {
        setExpandedId(5); // 5 is the ID for Messaging
        
        // Special case: Check if this is actually AI Preferences from settings
        // (when AI Preferences redirects to /inbox/preferences)
        if (location.pathname === "/inbox/preferences" && location.state?.originalPath) {
          const originalPath = location.state.originalPath;
          if (originalPath === "/setting/ai-preferences" || originalPath === "/gcs-settings/ai-preferences") {
            // This is actually settings AI preferences, not messaging preferences
            setSelectedId(7); // Set Settings as selected
            setExpandedId(7); // Expand Settings dropdown
            setSettingsActiveTab(74); // Set AI Preferences as active in settings
            return; // Exit early to avoid setting messaging active tab
          }
        }
      }

      // Auto-expand Settings dropdown when in settings section
      if (currentPath === "/setting") {
        setExpandedId(7); // 7 is the ID for Settings        // Map settings section from URL to tab ID
        const settingsPathToId = {
          account: 71,
          contact: 72,
          notifications: 73,
          "ai-preferences": 74,
          "action-items": 75,
          integrations: 76,
          users: 77,
          subscription: 78,
        };

        // Extract the settings section from URL path
        const settingsSection = location.pathname.split("/")[2];

        // Set the active settings tab based on URL path
        if (settingsSection && settingsPathToId[settingsSection]) {
          setSettingsActiveTab(settingsPathToId[settingsSection]);
        } else {
          // Default to Account tab if no specific section
          setSettingsActiveTab(71);
        }
      }
    }
  }, [location.pathname, location.state]);

  const toggleDropdown = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };
  const renderItem = (item) => {
    const isExpanded = expandedId === item.id;
    const isDropdownParentExpanded = item.HasdropDown === "yes" && isExpanded && selectedId === item.id;

    return (
      <div key={item.id} style={{ width: "100%" }}>
        <SideNavItem2
          id={item.id}
          label={
            item.label === "HostBuddy AI" ? (
              <strong>{item.label}</strong>
            ) : (
              item.label
            )
          }
          size="primary"
          stateProp="default"
          component={item.component}
          isSelected={selectedId === item.id}
          isDropdownParentExpanded={isDropdownParentExpanded}
          onSelect={() => {
            // Don't set selected ID or navigate for HostBuddy AI label
            if (item.label === "HostBuddy AI") {
              return; // Do nothing for HostBuddy AI label
            }

            setSelectedId(item.id);

            // Special handling for Master Account Settings in GCS Portal
            if (isInGcsPortal && item.label === "Master Account Settings") {
              toggleDropdown(item.id);
              handleNavigation("/gcs-settings");
              return; // Don't navigate when clicking on Master Account Settings
            }

            // Special handling for Messaging - only show dropdown
            if (item.label === "Messaging") {
              toggleDropdown(item.id);
              return; // Don't navigate when clicking on Messaging
            }

            // Special handling for Settings - only show dropdown
            if (item.label === "Settings") {
              toggleDropdown(item.id);
              return; // Don't navigate when clicking on Settings
            }

            if (item.HasdropDown === "yes") {
              toggleDropdown(item.id);
            } else {
              setExpandedId(null); // close any open dropdown if clicking a non-dropdown item
            }

            // Handle navigation based on item ID
            if (handleNavigation) {
              if (isInGcsPortal) {
                // Special navigation for GCS Portal
                if (item.label === "All Accounts") {
                  handleNavigation("/gcs-users");
                  return;
                } else if (item.label === "Master Account Settings") {
                  handleNavigation("/gcs-settings");
                  return;
                }
              }

              // Regular navigation for non-GCS portal
              switch (item.id) {
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
                // No case for Messaging (5) as it only toggles dropdown
                case 6: // Insights
                  handleNavigation("/statistics");
                  break;
                case 7: // Settings
                  handleNavigation(
                    isInGcsPortal ? "/gcs-settings" : "/setting"
                  );
                  break;
                default:
                  break;
              }
            }
          }}
          showTrailingIcon={item.HasdropDown === "yes"}
          trailingIconRotate={isExpanded}
          counter={item.counter}
          showCounter={!!item.counter}
        />

        {item.HasdropDown === "yes" && isExpanded && (
          <div className="dropdown-items">
            {item.id === 5
              ? // Special rendering for Messaging dropdown using InBoxHeader approach
                item.dropdownItems.map((dropdownItem, index) => (
                  <SideNavItem2
                    key={dropdownItem.id}
                    id={dropdownItem.id}
                    label={dropdownItem.label}
                    size="sub"
                    stateProp="default"
                    isSelected={messagingActiveTab === index}
                    onSelect={() => handleMessageTabSelect(index)}
                    showLeadingIcon={false}
                    showTrailingIcon={false}
                    counter={dropdownItem.counter}
                    showCounter={!!dropdownItem.counter}
                  />
                ))
              : item.id === 7
              ? // Special rendering for Settings dropdown to handle active state
                item.dropdownItems.map((dropdownItem) => (
                  <SideNavItem2
                    key={dropdownItem.id}
                    id={dropdownItem.id}
                    label={dropdownItem.label}
                    size="sub"
                    stateProp="default"
                    isSelected={settingsActiveTab === dropdownItem.id}
                    onSelect={() => {
                      setSelectedId(7); // Keep parent Settings selected
                      setSettingsActiveTab(dropdownItem.id); // Track which settings tab is active
                      // Handle dropdown item navigation
                      if (handleNavigation) {                        // Map settings dropdown items to their corresponding routes
                        const settingsMap = isInGcsPortal
                          ? {
                              71: "/gcs-settings/account", // Account
                              72: "/gcs-settings/contact", // Contacts
                              73: "/gcs-settings/notifications", // Notifications
                              74: "/gcs-settings/ai-preferences", // AI Preferences
                              75: "/gcs-settings/action-items", // Action Items
                              76: "/gcs-settings/integrations", // Integrations
                              77: "/gcs-settings/users", // Users
                              78: "/gcs-settings/subscription", // Subscription
                            }
                          : {
                              71: "/setting/account", // Account
                              72: "/setting/contact", // Contacts
                              73: "/setting/notifications", // Notifications
                              74: "/setting/ai-preferences", // AI Preferences
                              75: "/setting/action-items", // Action Items
                              76: "/setting/integrations", // Integrations
                              77: "/setting/users", // Users
                              78: "/setting/subscription", // Subscription
                            };

                        if (settingsMap[dropdownItem.id]) {
                          handleNavigation(settingsMap[dropdownItem.id]);
                        }
                      }
                    }}
                    showLeadingIcon={false}
                    showTrailingIcon={false}
                    counter={dropdownItem.counter}
                    showCounter={!!dropdownItem.counter}
                  />
                ))
              : // Regular dropdown items rendering
                item.dropdownItems.map((dropdownItem) => (
                  <SideNavItem2
                    key={dropdownItem.id}
                    id={dropdownItem.id}
                    label={dropdownItem.label}
                    size="sub"
                    stateProp="default"
                    isSelected={selectedId === dropdownItem.id}
                    onSelect={() => {
                      setSelectedId(dropdownItem.id);

                      // Handle dropdown item navigation
                      if (handleNavigation) {
                        // Add handling for other dropdowns if needed
                      }
                    }}
                    showLeadingIcon={false}
                    showTrailingIcon={false}
                    counter={dropdownItem.counter}
                    showCounter={!!dropdownItem.counter}
                  />
                ))}
          </div>
        )}
      </div>
    );
  };

  // Filter items based on user authentication and path
  const filteredData = isInGcsPortal
    ? GcsUserdata
    : data.filter((item) => {
        // Skip the HostBuddy AI icon (id: 0)
        if (item.id === 0) return false;

        // In protected paths or logged in conditional paths
        if (isProtectedPath || (isConditionalPath && token)) {
          // Regular portal navigation
          return true;
        }
        // For non-protected paths, don't show the navigation items
        return false;
      });

  return (
    <div
      className="side-nav"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ paddingBottom: "16px" }}>
        <Logo colour="default" type="icon" />
      </div>{" "}
      <div style={{ flex: 1 }}>
        {filteredData.map((item) => renderItem(item))}
      </div>{" "}
      {/* Back to users button - only shown when viewing a subaccount */}
      {is_gcs_subaccount_user() && (
        <div
          style={{
            width: "100%",
            marginBottom: "4px",
            backgroundColor: "black",
            borderRadius: "4px",
          }}
        >
          <SideNavItem2
            label={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0 16px",
                }}
              >
                {" "}
                <span style={{ padding: "23px" }}>Back to users</span>
                <img
                  src={
                    require("../sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-left-double.svg")
                      .default
                  }
                  alt="Back to users"
                  style={{
                    width: "20px",
                    height: "20px",
                    flexShrink: 0,
                  }}
                />
              </div>
            }
            size="primary"
            stateProp="default"
            showLeadingIcon={false}
            showTrailingIcon={false}
            onSelect={() => navigate("/gcs-users")}
            style={{
              backgroundColor: "#000000",
              borderRadius: "4px",
            }}
          />
        </div>
      )}
      {/* Logout button - placed above Help & Support with icon on right side */}
      <div
        style={{
          width: "100%",
          marginBottom: "4px",
          backgroundColor: "black",
          borderRadius: "4px",
        }}
      >
        {" "}
        <SideNavItem2
          label="Log Out"
          size="primary"
          stateProp="default"
          component={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <img
                src={require("../NavBarIcons/NewLogOut.svg").default}
                alt="Log Out"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "0",
                  verticalAlign: "middle",
                }}
              />
            </div>
          }
          showLeadingIcon={true}
          showTrailingIcon={false}
          onSelect={logoutHandle}
          style={{
            backgroundColor: "#000000",
            borderRadius: "4px",
          }}
        />
      </div>
      <div style={{ width: "100%"  }}>
        <SideNavItem2
          label="Help & Support"
          size="primary"
          stateProp="default"
          component={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <img
                src={helpIcon}
                alt="Help & Support"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "0",
                  verticalAlign: "middle",
                }}
              />
            </div>
          }
          showLeadingIcon={true}
          showTrailingIcon={false}
          onSelect={() => {
            if (handleNavigation) {
              // Navigate to help documentation
              window.open(
                "https://userguide.hostbuddy.ai/quick-start/welcome-to-hostbuddy",
                "_blank"
              );
            }
          }}
        />
      </div>
      <div style={{ width: "100%", marginBottom: "24px" }}>
        <SideNavItem2
          label="Collapse Menu"
          size="primary"
          stateProp="default"
          component={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                padding: "0",
              }}
            >
              <img
                src={
                  require("../sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-left-double.svg")
                    .default
                }
                alt="Collapse"
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "0",
                  verticalAlign: "middle",
                }}
              />
            </div>
          }
          showLeadingIcon={true}
          showTrailingIcon={false}
          onSelect={onCollapse}
        />
      </div>
    </div>
  );
}

export default SideItemComponent;
