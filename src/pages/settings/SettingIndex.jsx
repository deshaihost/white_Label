import React, { useState } from "react";
import './SettingIndex.css'
import SettingSideBarIndex from "./settingSideBar/SettingSideBarIndex";
import AdvancedSettingsIndex from "./settingContants/advancedSettings/AdvancedSettingsIndex";
import SubscriptionIndex from "./settingContants/subscription/SubscriptionIndex";
import { Helmet } from "react-helmet";
import SideBar from "../../component/sideBar/SideBar";
import UserInformationSection from "../account/userInformationSection";
import AccountContactSection from "../account/contactSection";
import AccountRegionSection from "../account/regionSection";
import AccountNotificationSection from "../account/notificationSection";
const SettingIndex = () => {
  const [interFaceSettings, setInterFaceSettings] = useState("account");
  const interFaceTypes = {
    account: "account",
    contact: "contact",
    notification: "notification",
    advancedSettings: "advancedSettings",
    subscription: "subscription",
  };
  return (
    <div className="account-main">
      <Helmet>
        <title>Setting - HostBuddy AI</title>
      </Helmet>
      <div className="container">
        <div className="banner-heading">
          <h2>My HostBuddy</h2>
        </div>
        <div className="row">
          <div className="col-lg-2 col-xl-2  col-xxl-2">
            <SideBar />
          </div>
          <div className="col-lg-10 col-xl-10 col-xxl-10">
            <div className="setting_index_tab_grid text-white">
              <div className="setting_tab_title">
                {
                  <SettingSideBarIndex
                    interFaceTypes={interFaceTypes}
                    changeHndl={setInterFaceSettings}
                    activeTab={interFaceSettings}
                  />
                }
              </div>
              <div className="setting_tab_data">
                <div className="border border-primary p-3 " style={{borderRadius:'20px'}}>
                {interFaceTypes?.account === interFaceSettings && (
                  <UserInformationSection />
                )}
                {interFaceTypes?.contact === interFaceSettings && (
                  <AccountContactSection />
                )}
                {interFaceTypes?.notification === interFaceSettings && (
                  <AccountNotificationSection />
                )}
                {interFaceTypes?.advancedSettings === interFaceSettings && (
                  <AdvancedSettingsIndex />
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
