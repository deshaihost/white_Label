import React, { useEffect, useState } from 'react';
import "./SettingIndex.css";
import SettingSideBarIndex from "./settingSideBar/SettingSideBarIndex";
import AdvancedSettingsIndex from "./settingContants/advancedSettings/AdvancedSettingsIndex";
import UpsellsIndex from './settingContants/upsells/upsells';
import SubscriptionIndex from "./settingContants/subscription/SubscriptionIndex";
import { Helmet } from "react-helmet";
import SideBar from "../../component/sideBar/SideBar";
import UserInformationSection from "../account/userInformationSection";
import AccountContactSection from "../account/contactSection";
import AccountRegionSection from "../account/regionSection";
import AccountNotificationSection from "../account/notificationSection";
import { Link, useParams } from "react-router-dom";

const SettingIndex = () => {
  const { section } = useParams();
  const [interFaceSettings, setInterFaceSettings] = useState("account");

  const interFaceTypes = { account:"account", contact:"contact", notifications:"notifications", conversationSettings:"conversation-preferences", upsells:"upsells", subscription:"subscription" };

  // Get the path param (if passed) and set the active tab
  useEffect(() => {
    if (section) {
      setInterFaceSettings(section);
    }
  }, [section]);

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
            <div className="setting_index_tab_grid text-white">
              <div className="setting_tab_title">
                <SettingSideBarIndex interFaceTypes={interFaceTypes} changeHndl={setInterFaceSettings} activeTab={interFaceSettings}/>
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <Link to="/dashboard" className="text-link">
                    &lt; Dashboard
                  </Link>
                </div>
              </div>
              <div className="setting_tab_data border border-primary p-3 " style={{ borderRadius: "20px" }}>
                <div className="setting_tab_data_inner">
                  {interFaceTypes?.account === interFaceSettings && (
                    <>
                      <UserInformationSection />
                      <AccountRegionSection />
                    </>
                  )}
                  {interFaceTypes?.contact === interFaceSettings && (
                    <AccountContactSection />
                  )}
                  {interFaceTypes?.notifications === interFaceSettings && (
                    <AccountNotificationSection />
                  )}
                  {interFaceTypes?.conversationSettings === interFaceSettings && (
                    <AdvancedSettingsIndex />
                  )}
                  {interFaceTypes?.upsells === interFaceSettings && (
                    <UpsellsIndex />
                  )}
                  {interFaceTypes?.subscription === interFaceSettings && (
                    <SubscriptionIndex />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingIndex;
