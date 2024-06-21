import React, { useEffect, useState, useRef } from "react";
import "./account.css";


const AccountNavBar = ({ selectedSection, setSelectedSection }) => {
  return (
    <div className="account-navbar container-fluid">
      <div className="row">
        <div className="col">
          <button  className={`nav-option ${selectedSection === 'UserInformation' ? 'selected' : ''}`} onClick={() => setSelectedSection('UserInformation')}>
            User Information
          </button>
        </div>
        <div className="col">
          <button className={`nav-option ${selectedSection === 'Contact' ? 'selected' : ''}`} onClick={() => setSelectedSection('Contact')}>
            Contact
          </button>
        </div>
        <div className="col">
          <button className={`nav-option ${selectedSection === 'Region' ? 'selected' : ''}`} onClick={() => setSelectedSection('Region')}>
            Region
          </button>
        </div>
        <div className="col">
          <button className={`nav-option ${selectedSection === 'Notifications' ? 'selected' : ''}`} onClick={() => setSelectedSection('Notifications')}>
            Notifications
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountNavBar;