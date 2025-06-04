import React from "react";
import "./NotificationBanner.css";
import arrowIcon from "./icons/arrow-circle-up-right.svg";

const NotificationBanner = ({ className = "", onWatchLetter }) => {
  return (
    <div className={`notification-banner ${className}`}>
      <span className="notification-text">New!</span>
      <span className="notification-message">
        ✨ Your inbox just got a major upgrade! See what's new and improved.
      </span>{" "}
      <div className="watch-letter-button" onClick={onWatchLetter}>
        Watch the tour
        <img src={arrowIcon} alt="arrow" className="watch-letter-icon" />
      </div>
    </div>
  );
};

export default NotificationBanner;
