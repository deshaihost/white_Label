import React from "react";
import "./NotificationBanner.css";
import arrowIcon from "./icons/arrow-circle-up-right.svg";

const NotificationBanner = ({ className = "", onWatchLetter, onClose }) => {
  return (
    <div className={`notification-banner-inbox ${className}`}>
      <span className="notification-text-inbox">New!</span>
      <span className="notification-message-inbox">
        ✨ Your inbox just got a major upgrade! See what's new and improved.
      </span>{" "}
      <div className="watch-letter-button" onClick={onWatchLetter}>
        Watch the tour
        <img src={arrowIcon} alt="arrow" className="watch-letter-icon" />
      </div>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
    </div>
  );
};

export default NotificationBanner;
