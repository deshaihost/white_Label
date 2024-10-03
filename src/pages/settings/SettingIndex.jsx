import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../redux/actions";
import "./SettingIndex.css";
import SettingSideBarIndex from "./settingSideBar/SettingSideBarIndex";
import AdvancedSettingsIndex from "./settingContants/advancedSettings/AdvancedSettingsIndex";
import UpsellsIndex from './settingContants/upsells/upsells';
import SubscriptionIndex from "./settingContants/subscription/SubscriptionIndex";
import IntegrationsIndex from "./settingContants/integrations/IntegrationsIndex";
import { Helmet } from "react-helmet";
import UserInformationSection from "../account/userInformationSection";
import AccountContactSection from "../account/contactSection";
import AccountRegionSection from "../account/regionSection";
import AccountNotificationSection from "../account/notificationSection";
import { Link, useParams } from "react-router-dom";

const SettingIndex = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { section } = useParams();

  const [interFaceSettings, setInterFaceSettings] = useState("account");
  const [userData, setUserData] = useState({});

  const interFaceTypes = { account:"account", contact:"contact", notifications:"notifications", conversationSettings:"conversation-preferences", integrations:"integrations", upsells:"upsells", subscription:"subscription" };

  const ApiUserData = store?.getUserDataReducer?.getUserData?.data?.user;

  const refreshUserData = () => {
    // dispatch(stateEmptyActions());
    dispatch(getUserDataActions());
  };

  // Get the path param (if passed) and set the active tab
  useEffect(() => {
    if (section) {
      setInterFaceSettings(section);
    }
  }, [section]);

  // On page load, get user data
  useEffect(() => {
    dispatch(getUserDataActions());
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
                      <UserInformationSection ApiUserData={userData} refreshUserData={refreshUserData} />
                      <AccountRegionSection ApiUserData={userData} refreshUserData={refreshUserData} />
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
                  {interFaceTypes?.integrations === interFaceSettings && (
                    <IntegrationsIndex ApiUserData={userData} />
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
