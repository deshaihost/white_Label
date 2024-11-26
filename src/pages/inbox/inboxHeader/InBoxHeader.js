import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { MdInbox, MdSmartButton, MdReviews, MdSettings, MdTrendingUp } from "react-icons/md";

const InBoxHeader = ({ showInterFace, interFaceComponent, showTimeZoneNotif }) => {
  let navItems = [
    { label: "Inbox", icon: <MdInbox /> },
    { label: "Smart Templates", icon: <MdSmartButton /> },
    { label: "Preferences", icon: <MdSettings /> },
    { label: "Upsells", icon: <MdTrendingUp /> },
    //{ label: "Review Removal", icon: <MdReviews /> }
  ];

  // Only add the Review Removal tab if the user is on a PMS that supports it
  try {
    const userData = JSON.parse(sessionStorage.getItem("userData")); // assumes that getUserDataActions has been dispatched at some point this session, which populates this session storage item
    const userPMS = userData?.calry_integrations ? Object.keys(userData.calry_integrations)[0] || null : null;
    const userEmail = userData?.email;

    if ((!['ownerrez', 'hostfully'].includes(userPMS?.toLowerCase())) || (userEmail === "select@stays.net")) {
      navItems.push({ label: "Review Removal", icon: <MdReviews /> });
    }
  } catch { }

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
