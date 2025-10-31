import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../../component/sideBar/SideBar";
import "./account.css";
import { Helmet } from "react-helmet";
import AccountNavBar from "./accountNavBar";
import UserInformationSection from "./userInformationSection";
import AccountContactSection from "./contactSection";
import AccountRegionSection from "./regionSection";
import AccountNotificationSection from "./notificationSection";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";


const Account = () => {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  const [selectedSection, setSelectedSection] = useState('UserInformation');
  const location = useLocation();

  // Debug: Log the text color value
  console.log('🎨 Account Page CSS Config:', {
    cssLoading,
    hasCssConfig: !!cssConfig,
    primaryTextColor: cssConfig?.css_data?.text?.primary,
    secondaryTextColor: cssConfig?.css_data?.text?.secondary
  });

  // If the URL points to "/contact", go to the contact section. This is necessary for handling oauth, e.g. when connecting Slack
  useEffect(() => {
    const path = location.pathname.split('/').pop();
    const section = path === 'contact' ? 'Contact' : 'UserInformation'; // Default to UserInformation
    setSelectedSection(section);
  }, [location.pathname]);

  return (
    <div 
      className="account-main"
      style={{
        background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117'
      }}
    >
      <Helmet>
        <title>Account - HostBuddy AI</title>
      </Helmet>
      <div className="container">
        <div className="banner-heading">
          <h2 style={{ 
            color: !cssLoading && cssConfig?.css_data?.text?.primary ? cssConfig.css_data.text.primary : 'white',
            fontSize: '28px', 
            fontFamily: "'DM Sans', sans-serif", 
            fontWeight: '700', 
            fontVariationSettings: "'opsz' 14", 
            marginBottom: '8px',
            textAlign: 'left'
          }}>
            Account Settings TEST
          </h2>
          <p style={{ 
            color: !cssLoading && cssConfig?.css_data?.text?.secondary ? cssConfig.css_data.text.secondary : '#a6a9b2', 
            fontSize: '14px', 
            fontFamily: "'DM Sans', sans-serif", 
            fontWeight: '400', 
            fontVariationSettings: "'opsz' 14", 
            marginBottom: '0' 
          }}>
            manage your personal information, location, and account security
          </p>
        </div>
        <div className="row">
          <div className="col-lg-2 col-xl-2  col-xxl-2">
            <SideBar />
          </div>
          <div className="col-lg-10 col-xl-10 col-xxl-10">
            <div 
              className="account-container"
              style={{
                background: !cssLoading ? (cssConfig?.css_data?.background?.primary || '#0F1117') : '#0F1117'
              }}
            >
              <AccountNavBar selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
              
              {selectedSection === 'UserInformation' && <UserInformationSection />}
              {selectedSection === 'Contact' && <AccountContactSection />}
              {selectedSection === 'Region' && <AccountRegionSection />}
              {selectedSection === 'Notifications' && <AccountNotificationSection />}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
