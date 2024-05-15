import React from "react";
import MeetBanner from "./banner/MeetBanner";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";

const CopyChatBotLink = () => {
  const { id } = useParams();
  const chatbot_key = id; // path param
  let urlData = { chatbot_key };
  // crash
  const x = 5;
  const y = 0;
  const z = x / y;

  return (
    <div>
      <div className="meet-buddy">
        <Helmet>
          <title>HostBuddy - Test Property</title>
        </Helmet>
        <div className="meet-buddy-container">
          <MeetBanner urlData={urlData} />
        </div>
      </div>
    </div>
  );
};

export default CopyChatBotLink;
