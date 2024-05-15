import React from "react";
import MeetBanner from "./banner/MeetBanner";
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
const TestProperty = () => {

  // URL format: ".../test-property/<chatbot_key>?user=<user_type>&name=<property_name>"
  const { id } = useParams();
  const chatbot_key = id; // path param
  let urlData = { chatbot_key };

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
