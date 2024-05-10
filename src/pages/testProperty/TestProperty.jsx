import React, { useEffect } from "react";
import MeetBanner from "./banner/MeetBanner";
import Setup from "./setup/Setup";
import Discover from "./discover/Discover";
import { Helmet } from "react-helmet";
import Authorized, { ParamsGet } from "../../helper/Authorized";
import { APICore, setAuthorization } from "../../helper/apiCore";
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const TestProperty = () => {
    const api = new APICore();

  // URL format: ".../test-property/<chatbot_key>?user=<user_type>&name=<property_name>"
  const { id } = useParams();
  const chatbot_key = id; // path param
  let urlData = { chatbot_key };
  console.log('FOUND data:', urlData)

  return (
    <div>
        <div className="meet-buddy">
      <Helmet>
        <title>HostBuddy - Property Chat</title>
      </Helmet>
      <div className="meet-buddy-container">
        <MeetBanner urlData={urlData} />
      </div>
    </div>
      
    </div>
  )
}

export default TestProperty
