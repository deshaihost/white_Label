import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SideNavItem2 from "../sideNavBarElements/sectionIndicatorComponent/section";
import { data } from "./data";
import GcsUserdata from "./gcsData";
import { useFeatureAccess } from "../../../../helper/useFeatureAccess";
import helpIcon from "../sideNavBarElements/sectionIndicatorComponent/navIcons/help-circle.svg";
import Logo from "../../components/sideNavBarElements/logoComponent/logoComponentNav";
import NewLogOutSvg from "../NavBarIcons/NewLogOut.svg";
import ChevronLeftDoubleSvg from "../sideNavBarElements/sectionIndicatorComponent/navIcons/chevron-left-double.svg";
import "../../components/sideNavBarElements/logoComponent/logoComponent.css";
import { is_gcs_subaccount_user } from "../../../../pages/gcs/gcs_functionality";

function SideItemComponent({ onCollapse, navigationProps = {} }) {
  const [selectedId, setSelectedId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [settingsActiveTab, setSettingsActiveTab] = useState(null);
  const [whiteLabelActiveTab, setWhiteLabelActiveTab] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { isFeatureEnabled, isHostBuddyDomain } = useFeatureAccess();

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
    // Using an array of tuples to ensure order - more specific paths are checked first
    const pathToIdArray = [
      ["/gcs-settings/white-label", 8], // White Label (must be before general gcs-settings)
      ["/getstarted", 1],
      ["/dashboard", 2],
      ["/properties", 3],
      ["/action-item", 4],
      ["/inbox", 5],
      ["/webhook-logs", 7], // Webhook Logs (treat as part of settings/integrations)
      ["/setting", 7],
      ["/gcs-settings", 7], // GCS settings (general, checked after white-label)
    ];

    // Find the ID that matches the current path (checks in order)
    let currentPath = null;
    let selectedPathId = null;
    
    for (const [path, id] of pathToIdArray) {
      if (location.pathname.startsWith(path)) {
        currentPath = path;
        selectedPathId = id;
        break; // Stop at first match
      }
    }

    if (currentPath) {
      setSelectedId(selectedPathId);
      console.log('🔍 Path matched:', currentPath, 'Setting selectedId to:', selectedPathId);
      // Auto-expand Messaging dropdown when in inbox section
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

      // Auto-expand White Label dropdown when in white label section
      // If we matched the white-label path, we're definitely in GCS portal
      if (location.pathname.startsWith("/gcs-settings/white-label")) {
        console.log('✅ WHITE LABEL CHECK: Setting selectedId to 8, expandedId to 8');
        setSelectedId(8); // 8 is the ID for White Label (CRITICAL: This must stick!)
        setExpandedId(8); // Expand White Label dropdown
        
        // Map white label section from URL to tab ID
        const whiteLabelPathToId = {
          "white-label-registration": 81,
          "white-label-branding": 82,
          "white-label-feature-selection": 83,
        };

        // Extract the white label section from URL path
        const whiteLabelSection = location.pathname.split("/")[2];

        // Set the active white label tab based on URL path
        if (whiteLabelSection && whiteLabelPathToId[whiteLabelSection]) {
          setWhiteLabelActiveTab(whiteLabelPathToId[whiteLabelSection]);
        }
        return; // Exit early to prevent settings logic from running
      }

      // Auto-expand Settings dropdown when in settings section
      // Only run this if we're NOT in white label section
      if ((currentPath === "/setting" || currentPath === "/gcs-settings" || currentPath === "/webhook-logs") && !location.pathname.startsWith("/gcs-settings/white-label")) {
        console.log('⚙️ SETTINGS CHECK: Running settings logic');
        setExpandedId(7); // 7 is the ID for Settings        // Map settings section from URL to tab ID based on portal type
        const settingsPathToId = isInGcsPortal
          ? {
              account: 71,
              contact: 72,
              notifications: 73,
              integrations: 75,
              users: 76,
              subscription: 77,
            }
          : {
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
        } else if (location.pathname === "/webhook-logs") {
          // Webhook logs page - highlight Integrations tab
          setSettingsActiveTab(isInGcsPortal ? 75 : 76);
        } else {
          // Default to Account tab if no specific section
          setSettingsActiveTab(71);
        }
      }
    }
  }, [location.pathname, location.state, isInGcsPortal]);

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

            // Special handling for White Label - only show dropdown
            if (item.label === "White Label") {
              toggleDropdown(item.id);
              return; // Don't navigate when clicking on White Label
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
          <div className="dropdown-items">            {item.id === 5
              ? // Special rendering for Messaging dropdown using InBoxHeader approach
                item.dropdownItems.map((dropdownItem, index) => (
                  <SideNavItem2
                    key={dropdownItem.id}
                    id={dropdownItem.id}
                    label={dropdownItem.label}
                    size="sub"
                    stateProp="default"
                    isSelected={messagingActiveTab === index && messagingActiveTab !== null}
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
                              75: "/gcs-settings/integrations", // Integrations
                              76: "/gcs-settings/users", // Users
                              77: "/gcs-settings/subscription", // Subscription
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
              : item.id === 8
              ? // Special rendering for White Label dropdown to handle active state
                item.dropdownItems.map((dropdownItem) => (
                  <SideNavItem2
                    key={dropdownItem.id}
                    id={dropdownItem.id}
                    label={dropdownItem.label}
                    size="sub"
                    stateProp="default"
                    isSelected={whiteLabelActiveTab === dropdownItem.id}
                    onSelect={() => {
                      setSelectedId(8); // Keep parent White Label selected
                      setWhiteLabelActiveTab(dropdownItem.id); // Track which white label tab is active
                      // Handle dropdown item navigation
                      if (handleNavigation) {
                        // Map white label dropdown items to their corresponding routes
                        const whiteLabelMap = {
                          81: "/gcs-settings/white-label-registration", // Domain Registration
                          82: "/gcs-settings/white-label-branding", // Branding
                          83: "/gcs-settings/white-label-feature-selection", // Feature Selection
                        };

                        if (whiteLabelMap[dropdownItem.id]) {
                          handleNavigation(whiteLabelMap[dropdownItem.id]);
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

  // Apply feature-based filtering for white label domains
  // Map of navigation item IDs to feature IDs (array of feature IDs)
  const itemToFeatureMap = {
    3: ['properties'],           // Properties
    4: ['action-items'],         // Action Items
    5: ['messaging-inbox'],      // Messaging (parent)
    51: ['messaging-inbox'],     // Inbox (sub-item)
    52: ['smart-templates'],     // Smart Templates (sub-item)
    53: ['messaging-inbox'],     // Preferences (sub-item) - tied to messaging
    54: ['upsells'],             // Upsells (sub-item)
    6: ['insights'],             // Insights
    75: ['action-item-settings'], // Action Items Settings (in Settings dropdown)
    76: ['integrations'],        // Integrations (in Settings dropdown)
  };

  // Filter navigation items based on feature settings
  const featureFilteredData = filteredData.map(item => {
    // Check if this item should be filtered based on features
    const featureIds = itemToFeatureMap[item.id];
    
    // If item has feature mappings, check if ANY of the features are enabled
    if (featureIds && Array.isArray(featureIds)) {
      const anyEnabled = featureIds.some(featureId => isFeatureEnabled(featureId));
      
      if (!anyEnabled) {
        return null; // Filter out this item if NONE of its features are enabled
      }
    }

    // If item has dropdown items, filter those as well
    if (item.dropdownItems && item.dropdownItems.length > 0) {
      const filteredDropdownItems = item.dropdownItems.filter(dropdownItem => {
        const dropdownFeatureIds = itemToFeatureMap[dropdownItem.id];
        
        // If dropdown item has feature mappings, check if ANY of the features are enabled
        if (dropdownFeatureIds && Array.isArray(dropdownFeatureIds)) {
          const anyEnabled = dropdownFeatureIds.some(featureId => isFeatureEnabled(featureId));
          
          if (!anyEnabled) {
            return false;
          }
        }
        
        return true;
      });

      // If all dropdown items are filtered out, hide the parent item too
      if (filteredDropdownItems.length === 0) {
        return null;
      }

      // Return item with filtered dropdown items
      return {
        ...item,
        dropdownItems: filteredDropdownItems
      };
    }

    return item;
  }).filter(item => item !== null); // Remove null items

  // Debug: Log current state
  console.log('📊 RENDER STATE:', { 
    pathname: location.pathname, 
    selectedId, 
    expandedId, 
    isInGcsPortal,
    whiteLabelActiveTab 
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
      <div style={{ 
        paddingBottom: "16px" }}>
        <Logo colour="default" type="icon" />
      </div>{" "}
      <div style={{ flex: 1 }}>
        {featureFilteredData.map((item) => renderItem(item))}
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
                  src={ChevronLeftDoubleSvg}
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
          backgroundColor: "rgb(23, 25, 31)",
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
                src={NewLogOutSvg}
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
                src={ChevronLeftDoubleSvg}
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
