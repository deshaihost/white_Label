import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserLarge, FaChessQueen } from "react-icons/fa6";
import { FaPhoneAlt, FaPlug, FaArrowUp } from "react-icons/fa";
import { HiBellAlert } from "react-icons/hi2";
import { LiaCogSolid } from "react-icons/lia";

const SettingSideBarIndex = (props) => {
  const navigate = useNavigate();
  const { interFaceTypes, changeHndl, activeTab, isAdmin } = props;
  const { account, conversationSettings, integrations, users, upsells, contact, notifications, subscription } = interFaceTypes;

  const handleUsersClick = () => {
    if (!isAdmin) { changeHndl(users); }
    else { navigate("/journey"); }
  }

  return (
    <div className="border border-primary py-3" style={{ borderRadius:"20px", padding:"10px" }}>

      <div className={`px-2 py-2 setting-tab-link ${ activeTab === account && "active" }`} onClick={() => changeHndl(account)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <FaUserLarge />
          Account
        </h6>
      </div>

      <div className={`px-2 py-2 setting-tab-link ${activeTab === contact && "active"}`} onClick={() => changeHndl(contact)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <FaPhoneAlt />
          Contact
        </h6>
      </div>

      <div className={`px-2 py-2 setting-tab-link ${activeTab === notifications && "active"}`} onClick={() => changeHndl(notifications)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <HiBellAlert />
          Notifications
        </h6>
      </div>

      <div className={`px-2 py-2 setting-tab-link ${activeTab === conversationSettings && "active"}`} onClick={() => changeHndl(conversationSettings)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <LiaCogSolid />
          Conversation<br/>Preferences
        </h6>
      </div>

      <div className={`px-2 py-2 setting-tab-link ${activeTab === integrations && "active"}`} onClick={() => changeHndl(integrations)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <FaPlug />
          Integrations
        </h6>
      </div>

      <div className={`px-2 py-2 setting-tab-link ${ activeTab === users && "active" }`} onClick={handleUsersClick}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <FaUserLarge />
          Users
        </h6>
      </div>

      {/*
      <div className={`px-2 py-2 setting-tab-link ${activeTab === upsells && "active"}`} onClick={() => changeHndl(upsells)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <FaArrowUp />
          Upsells
        </h6>
      </div>
      */}

      <div className={`px-2 py-2 setting-tab-link ${activeTab === subscription && "active"}`} onClick={() => changeHndl(subscription)}>
        <h6 className="d-flex align-items-center gap-2 m-0" style={{ cursor: 'pointer' }}>
          <FaChessQueen />
          Subscription
        </h6>
      </div>

    </div>
  );
};

export default SettingSideBarIndex;
