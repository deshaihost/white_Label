import React from "react";
import "./meetHostBuddy.css";
import MeetBanner from "./banner/MeetBanner";
import Setup from "./setup/Setup";
import Discover from "./discover/Discover";
import { Helmet } from "react-helmet";
import { APICore } from "../../helper/apiCore";
import { useLocation } from 'react-router-dom';

const MeetHostBoddy = () => {
  const api = new APICore();

  /* Mboddie: This is the proper way to get data from the URL.
  The data is expected to be passed in the URL as query parameters. So in addition to below changes, I changed the file "ListIntegrationProperties.jsx" to create the URL as:
  "/meet-hostbuddy?key=<chatbot_key>&name=<property_name>&user=<user>"
  TODO (Expinator team) - please create a new path in the application for the property chat window, since it should not use the same path as Meet Hostbuddy and
  should not have "Meet-Hostbuddy" in the URL (use a path like "/property-chat"). You can copy over most of this logic. */
  function useQuery() { return new URLSearchParams(useLocation().search); }
  let query = useQuery();

  const chatbot_key = query.get("key");
  const property_name = query.get("name");
  const user_type = query.get("user");

  let urlData;
  if (chatbot_key !== null && property_name !== null && user_type !== null) {
    urlData = { chatbot_key, property_name, user_type }; }
  return (
    <div className="meet-buddy">
      <Helmet>
        <title>Meet HostBuddy – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/meet-hostbuddy" />
      </Helmet>
      <div className="meet-buddy-container">
        <MeetBanner urlData={urlData} />
        {urlData === undefined && (
          <>
            {/* <Setup /> */}
            <Discover />
          </>
        )}
      </div>
    </div>
  );
};

export default MeetHostBoddy;
