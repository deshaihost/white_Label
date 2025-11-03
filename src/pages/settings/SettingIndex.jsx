import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../redux/actions";
import "./SettingIndex.css";
import SettingSideBarIndex from "./settingSideBar/SettingSideBarIndex";
import AdvancedSettingsIndex from "./settingContants/advancedSettings/AdvancedSettingsIndex";
import UpsellsIndex from './settingContants/upsells/upsells';
import SubscriptionIndex from "./settingContants/subscription/SubscriptionIndex";
import IntegrationsIndex from "./settingContants/integrations/IntegrationsIndex";
import UsersTab from './settingContants/users/usersTab';
import { Helmet } from "react-helmet";
import UserInformationSection from "../account/userInformationSection";
import AccountContactSection from "../account/contactSection";
import AccountRegionSection from "../account/regionSection";
import DangerZone from '../account/dangerZone';
import AccountNotificationSection from "../account/notificationSection";
import MessagingChannels from "./settingContants/messagingChannels/messagingChannels";
import ActionitemsSettings from "./settingContants/actionItems/actionItemSettings";
import WhiteLabelRegistration from "./settingContants/whiteLabel/WhiteLabelRegistration";
import RegistrationPageNewDesign from "./settingContants/whiteLabel/RegistrationPageNewDesign";
import WhiteLabelBranding from "./settingContants/whiteLabel/WhiteLabelBranding";
import WhiteLabelFeatureSelection from "./settingContants/whiteLabel/WhiteLabelFeatureSelection";
import { Link, useParams } from "react-router-dom";
import HostDaddy from '../../component/hostDaddy/hostDaddy';
import PMSSettings from "../account/pmsSettings";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

const SettingIndex = () => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { section, subsec } = useParams();
  const [interFaceSettings, setInterFaceSettings] = useState(section || "account");
  const [userData, setUserData] = useState({});

  const interFaceTypes = { 
    account: "account", 
    contact: "contact", 
    notifications: "notifications", 
    conversationSettings: "ai-preferences", 
    integrations: "integrations", 
    users: "users", 
    upsells: "upsells", 
    subscription: "subscription", 
    messagingChannels: "messaging-channels",
    actionItems: "action-items",
    whiteLabelRegistration: "white-label-registration",
    whiteLabelRegistrationNew: "white-label-registration-new",
    whiteLabelBranding: "white-label-branding",
    whiteLabelFeatureSelection: "white-label-feature-selection"
  };

  const ApiUserData = store?.getUserDataReducer?.getUserData?.data?.user;
  const isAdmin = store?.getUserDataReducer?.getUserData?.data?.user?.is_hb_admin;

  const refreshUserData = () => {
    // dispatch(stateEmptyActions());
    dispatch(getUserDataActions(false));
  };

  // Get the path param (if passed) and set the active tab
  useEffect(() => {
    if (section) {
      setInterFaceSettings(section);
    }
  }, [section]);

  // On page load, get user data
  useEffect(() => {
    dispatch(getUserDataActions(false));
  }, []);

  // Make sure we rerender whenever user data is updated
  useEffect(() => {
    setUserData(ApiUserData);
  }, [ApiUserData]);

  return (
    <div className="account-main">
      <Helmet>
        <title>Settings - HostBuddy AI</title>
      </Helmet>
      <div className="container">
        <div className="banner-heading" style={{margin:"0"}}>
          {/* <h2>My HostBuddy</h2> */}
        </div>
        <div className="row">
          <div className="col-lg-12 col-xl-12 col-xxl-12">
            <div className="setting_index_tab_grid text-white blur-background-top-right">
              <div className="setting_tab_title">
                {/* SettingSideBarIndex component rendering has been disabled 
                <SettingSideBarIndex interFaceTypes={interFaceTypes} changeHndl={setInterFaceSettings} activeTab={interFaceSettings} isAdmin={isAdmin}/>
                */}
                {/* <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Link to="/dashboard" className="text-link">
                    &lt; Dashboard
                  </Link>
                </div> */}
              </div>
              <div 
                className="setting_tab_data p-3" 
                style={{ 
                  borderRadius: "20px",
                  background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117'
                }}
              >
                <div className="setting_tab_data_inner">
                  {interFaceTypes?.account === interFaceSettings && (
                    <>
                      <div className="account-page-header">
                        <h1 style={{ 
                          color: !cssLoading && cssConfig?.css_data?.text?.primary ? cssConfig.css_data.text.primary : 'white', 
                          fontSize: '28px', 
                          fontFamily: "'DM Sans', sans-serif", 
                          fontWeight: '700', 
                          fontVariationSettings: "'opsz' 14", 
                          marginBottom: '8px' 
                        }}>
                          Account Settings
                        </h1>
                        <p style={{ 
                          color: !cssLoading && cssConfig?.css_data?.text?.secondary ? cssConfig.css_data.text.secondary : '#a6a9b2', 
                          fontSize: '14px', 
                          fontFamily: "'DM Sans', sans-serif", 
                          fontWeight: '400', 
                          fontVariationSettings: "'opsz' 14", 
                          marginBottom: '40px' 
                        }}>
                          Manage your personal information, location, and account security
                        </p>
                      </div>
                      <UserInformationSection ApiUserData={userData} refreshUserData={refreshUserData} />
                      <AccountRegionSection ApiUserData={userData} refreshUserData={refreshUserData} />
                      <PMSSettings ApiUserData={userData} />
                      <DangerZone />
                    </>
                  )}
                  {interFaceTypes?.contact === interFaceSettings && (
                    <AccountContactSection />
                  )}
                  {interFaceTypes?.notifications === interFaceSettings && (
                    <AccountNotificationSection />
                  )}
                  {(interFaceSettings === "ai-preferences" || interFaceSettings === "conversation-preferences") && (
                    <AdvancedSettingsIndex />
                  )}
                  {interFaceTypes?.upsells === interFaceSettings && (
                    <UpsellsIndex />
                  )}
                  {interFaceTypes?.integrations === interFaceSettings && (
                    <IntegrationsIndex ApiUserData={userData} />
                  )}
                  {interFaceTypes?.subscription === interFaceSettings && (
                    <SubscriptionIndex />
                  )}
                  {interFaceTypes?.users === interFaceSettings && (
                    <UsersTab userData={userData}/>
                  )}
                  {interFaceTypes?.messagingChannels === interFaceSettings && (
                    <MessagingChannels ApiUserData={userData} refreshUserData={refreshUserData} subsec={subsec}/>
                  )}
                  {interFaceTypes?.actionItems === interFaceSettings && (
                    <ActionitemsSettings />
                  )}
                  {interFaceTypes?.whiteLabelRegistration === interFaceSettings && (
                    <WhiteLabelRegistration />
                  )}
                  {interFaceTypes?.whiteLabelRegistrationNew === interFaceSettings && (
                    <RegistrationPageNewDesign />
                  )}
                  {interFaceTypes?.whiteLabelBranding === interFaceSettings && (
                    <WhiteLabelBranding />
                  )}
                  {interFaceTypes?.whiteLabelFeatureSelection === interFaceSettings && (
                    <WhiteLabelFeatureSelection />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HostDaddy />
    </div>
  );
};

export default SettingIndex;
