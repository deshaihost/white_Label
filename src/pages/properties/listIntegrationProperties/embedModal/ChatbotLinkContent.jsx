
import React from "react";
import CopyableCode from "./copyableCode";

const ChatbotLinkContent = ({ chatbotKey }) => {
  return (
    <div className="embed-modal-content">
      <div className='embed-modal-section' style={{marginTop:'10px'}}>
        <h2>Shareable Chat Link</h2>
        <p>
          <strong>
            This is a link to a HostBuddy chat window for this property that you can share with your guests.
          </strong>
        </p>
        <CopyableCode>{`https://hostbuddy.ai/property-chat/${chatbotKey}`}</CopyableCode>
      </div>
    </div>
  );
};

export default ChatbotLinkContent;