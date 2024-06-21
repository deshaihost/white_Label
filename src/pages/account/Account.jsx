import React, { useEffect, useState, useRef } from "react";
import SideBar from "../../component/sideBar/SideBar";
import "./account.css";
import { Helmet } from "react-helmet";
import AccountNavBar from "./accountNavBar";
import UserInformationSection from "./userInformationSection";
import AccountContactSection from "./contactSection";
import AccountRegionSection from "./regionSection";
import AccountNotificationSection from "./notificationSection";


const Account = () => {
  const [selectedSection, setSelectedSection] = useState('UserInformation');


  return (
    <div className="account-main">
      <Helmet>
        <title>Account - HostBuddy AI</title>
      </Helmet>
      <div className="container">
        <div className="banner-heading">
          <h2>My HostBuddy</h2>
          {/* <p>Manage your profile here </p> */}
        </div>
        <div className="row">
          <div className="col-lg-2 col-xl-2  col-xxl-2">
            <SideBar />
          </div>
          <div className="col-lg-10 col-xl-10 col-xxl-10">
            <div className="account-container">
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
