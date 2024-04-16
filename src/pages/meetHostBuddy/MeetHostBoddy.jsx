import React from "react";
import "./meetHostBuddy.css";
import MeetBanner from "./banner/MeetBanner";
import Setup from "./setup/Setup";
import Discover from "./discover/Discover";
import { Helmet } from "react-helmet";
import { ParamsGet } from "../../helper/Authorized";

const MeetHostBoddy = () => {
  const chatBoxUrl = ParamsGet();
  return (
    <div className="meet-buddy">
      <Helmet>
        <title>Meet HostBuddy – Hostbuddy</title>
      </Helmet>
      <div className="meet-buddy-container">
        <MeetBanner />
        {chatBoxUrl === undefined && (
          <>
            <Setup />
            <Discover />
          </>
        )}
      </div>
    </div>
  );
};

export default MeetHostBoddy;
