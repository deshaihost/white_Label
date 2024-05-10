import React from "react";
import MeetBanner from "./banner/MeetBanner";
import { Helmet } from "react-helmet";
import { APICore } from "../../helper/apiCore";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const CopyChatBotLink = () => {
    const api = new APICore();

  /* Mboddie: This is the proper way to get data from the URL.
  The data is expected to be passed in the URL as query parameters. So in addition to below changes, I changed the file "ListIntegrationProperties.jsx" to create the URL as:
  "/meet-hostbuddy?key=<chatbot_key>&name=<property_name>&user=<user>"
  TODO (Expinator team) - please create a new path in the application for the property chat window, since it should not use the same path as Meet Hostbuddy and
  should not have "Meet-Hostbuddy" in the URL (use a path like "/property-chat"). You can copy over most of this logic.
  function useQuery() { return new URLSearchParams(useLocation().search); }
  let query = useQuery();

  const chatbot_key = query.get("key");
  const property_name = query.get("name");
  const user_type = query.get("user");

  let urlData;
  if (chatbot_key !== null && property_name !== null && user_type !== null) {
    urlData = { chatbot_key, property_name, user_type }; } */

  // URL format: ".../test-property/<chatbot_key>?user=<user_type>&name=<property_name>"
  const { id } = useParams();
  const chatbot_key = id; // path param
  let urlData = { chatbot_key };
  console.log('FOUND data:', urlData)

  // crash
  const x = 5
  const y = 0
  const z = x / y


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
  )
}

export default CopyChatBotLink
