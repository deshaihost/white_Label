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
    }
];

export default GcsUserdata;
