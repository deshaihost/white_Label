import React from "react";
import MeetBanner from "./banner/MeetBanner";
import { Helmet } from "react-helmet";

const CustomerJourney = () => {

  return (
    <div>
      <div className="meet-buddy">
        <Helmet>
          <title>Chat - HostBuddy AI</title>
        </Helmet>
        <div className="meet-buddy-container">
          <MeetBanner />
        </div>
      </div>
    </div>
  );
};

export default CustomerJourney;
