import React from "react";
import "./index.css";
const InBoxHeader = ({ showInterFace, interFaceComponent }) => {
  const labelName = ["Inbox", "Smart Templates", "Review Removal", "Preferences", "Upsells"];
  return (
    <div className="nab-bar">
      {labelName?.map((label, index) => {
        return (
          <button className={`${interFaceComponent === index ? 'nav-active': ""}`} onClick={() => {showInterFace(index);}}>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default InBoxHeader;
