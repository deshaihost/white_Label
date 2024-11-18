import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { MdInbox, MdSmartButton, MdReviews, MdSettings, MdTrendingUp } from "react-icons/md";

const InBoxHeader = ({ showInterFace, interFaceComponent, showTimeZoneNotif }) => {
  const navItems = [
    { label: "Inbox", icon: <MdInbox /> },
    { label: "Smart Templates", icon: <MdSmartButton /> },
    { label: "Review Removal", icon: <MdReviews /> },
    { label: "Preferences", icon: <MdSettings /> },
    { label: "Upsells", icon: <MdTrendingUp /> }
  ];

  return (
    <div className="inbox-nav-bar">
      <div className="nav-buttons-container">
        {navItems.map((item, index) => (
          <button className={`${interFaceComponent === index ? 'nav-active': ""}`} onClick={() => showInterFace(index)} key={item.label}>
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
      {showTimeZoneNotif && (
        <p className="timezone-notification">Set your <Link to="/setting">time zone</Link> to enable all features and ensure accurate data.</p>
      )}
    </div>
  );
};

export default InBoxHeader;
