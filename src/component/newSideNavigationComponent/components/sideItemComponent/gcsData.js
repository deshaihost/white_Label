import ActionDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/ActionComponent/action";
import DashBoardDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/dashboardComponent/dashboard";
import GetStarted from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/getStartedComponent/getStarted";
import HomeSmileScreenDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/homeSimileComponent/homeSimile";
import InsightComponent from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/insightComponent/insight";
import MessageDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/messagingComponent/messaging";
import SettingsDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/settingsComponent/settings";
import Logo from "../../components/sideNavBarElements/logoComponent/logoComponent";

// Define a simple custom component for users icon (since svg doesn't exist)
const UsersIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

// Define a custom component for White Label icon (tag/label with sparkle)
const WhiteLabelIcon = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px' }}>
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tag/Label shape */}
      <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="7" r="1.5" fill="white"/>
      {/* Sparkle effect */}
      <path d="M16 2L17 4L19 5L17 6L16 8L15 6L13 5L15 4L16 2Z" fill="white" opacity="0.9"/>
    </svg>
  </div>
);

const GcsUserdata = [
    {
        id: 1,
        label: "All Accounts",
        component: <UsersIcon />,
        HasdropDown: "no"
    },
    {
        id: 7,
        label: "Master Account Settings",
        component: <SettingsDefault/>,
        HasdropDown: "yes",
        dropdownItems: [
            { id: 71, label: "Account", HasdropDown: "no" },
            { id: 72, label: "Contact", HasdropDown: "no" },
            { id: 73, label: "Notifications", HasdropDown: "no" },
            { id: 75, label: "Integration", HasdropDown: "no" } ,
            { id: 76, label: "Users", HasdropDown: "no" } ,
            { id: 77, label: "Subscription", HasdropDown: "no" }
        ]
    },
    {
        id: 8,
        label: "White Label",
        component: <WhiteLabelIcon/>,
        HasdropDown: "yes",
        dropdownItems: [
            { id: 81, label: "Domain Registration", HasdropDown: "no" },
            { id: 82, label: "Branding", HasdropDown: "no" },
            { id: 83, label: "Feature Selection", HasdropDown: "no" }
        ]
    }
];

export default GcsUserdata;
