import React from "react";
import { FaUserLarge, FaChessQueen } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { LiaCogSolid } from "react-icons/lia";

const SettingSideBarIndex = (props) => {
  const { interFaceTypes, changeHndl, activeTab } = props;
  const { account, advancedSettings, contact, notification, subscription } =
    interFaceTypes;

  return (
    <div
      className="border border-primary py-3"
      style={{ borderRadius: "20px" }}
    >
      <div
        className={`px-2 py-2 setting-tab-link   ${
          activeTab === account && "active"
        }`}
        onClick={() => changeHndl(account)}
      >
        <h6 
        className="d-flex align-items-center gap-2 m-0">
          <FaUserLarge />
          Account
        </h6>
      </div>
      <div
        className={`px-2 py-2 setting-tab-link   ${
          activeTab === contact && "active"
        }`}
        onClick={() => changeHndl(contact)}
      >
        <h6 className="d-flex align-items-center gap-2 m-0">
          <FaPhoneAlt />
          Contact
        </h6>
      </div>
      <div
        className={`px-2 py-2 setting-tab-link   ${
          activeTab === notification && "active"
        }`}
        onClick={() => changeHndl(notification)}
      >
        <h6 className="d-flex align-items-center gap-2 m-0">
          <HiBellAlert />
          Notifications
        </h6>
      </div>
      <div
        className={`px-2 py-2 setting-tab-link   ${
          activeTab === advancedSettings && "active"
        }`}
        onClick={() => changeHndl(advancedSettings)}
      >
        <h6 className="d-flex align-items-center gap-2 m-0">
          <LiaCogSolid />
          Advanced settings
        </h6>
      </div>
      <div
        
        className={`px-2 py-2 setting-tab-link   ${
          activeTab === subscription && "active"
        }`}
        onClick={() => changeHndl(subscription)}
      >
        <h6 className="d-flex align-items-center gap-2 m-0">
          <FaChessQueen />
          Subscription
        </h6>
      </div>
    </div>
  );
};

export default SettingSideBarIndex;
