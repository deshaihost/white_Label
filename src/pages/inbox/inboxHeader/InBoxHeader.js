import React from "react";
import "./index.css";
import { Link } from "react-router-dom";


const InBoxHeader = ({ showInterFace, interFaceComponent, showTimeZoneNotif }) => {
  const labelName = ["Inbox", "Smart Templates", "Review Removal", "Preferences", "Upsells"];
  return (
    <div className="inbox-nav-bar">
      {labelName?.map((label, index) => {
        return (
          <button className={`${interFaceComponent === index ? 'nav-active': ""}`} onClick={() => {showInterFace(index);}} key={label}>
            {label}
          </button>
        );
      })}
      {showTimeZoneNotif && (
        <p style={{fontSize:'16px', color:'rgb(255, 165, 0)', marginLeft:'20px'}}>Set your <Link to="/setting">time zone</Link> to enable all features and ensure accurate data.</p>
      )}
    </div>
  );
};

export default InBoxHeader;
