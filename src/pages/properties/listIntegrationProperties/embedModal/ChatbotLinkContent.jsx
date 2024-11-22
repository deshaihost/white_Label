import React from "react";
import CopyableCode from "./copyableCode";

const linkImg = 'https://hostbuddylb.com/embed-doc/link.webp';

const ChatbotLinkContent = ({ chatbotKey }) => {
  return (
    <div className="embed-modal-content">
      <h2>Share a HostBuddy Chat Link With Your Guests</h2>
      <div className='embed-modal-section' style={{marginTop:'10px'}}>
        <div className="widget-preview-images">
          <div>
            <img src={linkImg} alt="Chat link preview" />
            <p className="image-caption">Chat Link Preview</p>
          </div>
        </div>
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