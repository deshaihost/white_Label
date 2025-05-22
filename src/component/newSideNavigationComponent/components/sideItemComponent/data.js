import ActionDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/ActionComponent/action";
import DashBoardDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/dashboardComponent/dashboard";
import GetStarted from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/getStartedComponent/getStarted";
import HomeSmileScreenDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/homeSimileComponent/homeSimile";
import InsightComponent from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/insightComponent/insight";
import MessageDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/messagingComponent/messaging";
import SettingsDefault from "../sideNavBarElements/sectionIndicatorComponent/iconComponents/settingsComponent/settings";
import Logo from "../../components/sideNavBarElements/logoComponent/logoComponent";
export const data = [
    {
        id: 0,
        label: "HostBuddy AI",
        component : <Logo colour="default" type="icon"  />,
        HasdropDown: "no"
    },

    {
        id: 1,
        label: "Get Started",
        component: <GetStarted/>,
        HasdropDown: "no"
    },

    {
        id: 2,
        label: "Dashboard",
        component: <DashBoardDefault/>,
        HasdropDown: "no",
        
    },
    {
        id: 3,
        label: "Properties",
        component: <HomeSmileScreenDefault/>,
        HasdropDown: "no"
    },
    {
        id: 4,
        label: "Action Items",
        component: <ActionDefault />,
        HasdropDown: "no"
    },
    {
        id: 5,
        label: "Messaging",
        component: <MessageDefault/>,
        HasdropDown: "yes",
        dropdownItems: [
            { id: 51, label: "Inbox", HasdropDown: "no" },
            { id: 52, label: "Smart Templates", HasdropDown: "no" },
            { id: 53, label: "Preferences", HasdropDown: "no" } ,
            {id: 54, label: "Upsells", HasdropDown: "no" }
        ]
    },
    {
        id: 6,
        label: "Insights",
        component: <InsightComponent/>,
        HasdropDown: "no"
    },
    {        id: 7,
        label: "Settings",
        component: <SettingsDefault/>,
        HasdropDown: "yes",
        dropdownItems: [
            { id: 71, label: "Account", HasdropDown: "no" },
            { id: 72, label: "Contact", HasdropDown: "no" },
            { id: 73, label: "Notifications", HasdropDown: "no" },
            { id: 74, label: "AI Preferences", HasdropDown: "no" } ,
            { id: 75, label: "Integration", HasdropDown: "no" } ,
            { id: 76, label: "Users", HasdropDown: "no" } ,
            { id: 77, label: "Subscription", HasdropDown: "no" } 
        ]
    }
]
