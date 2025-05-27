import React, { useState } from "react";
import WhatsAppSection from "./whatsAppSection";
import EmailSection from "./emailSection";
import "./messagingChannels.css";

const MessagingChannels = ({ ApiUserData, refreshUserData, subsec }) => {
  const initialSection = (subsec === 'email' || subsec === 'gmail') ? 'Email' : 'WhatsApp';
  const [selectedChannel, setSelectedChannel] = useState(initialSection);

  return (
    <div className="messaging-channels">
      <h3 style={{marginBottom:'20px'}}>Messaging Channels</h3>
      <hr style={{marginBottom:'20px'}}/>

      <div className="channels-tabs">
        <button className={`tab-button ${selectedChannel === 'WhatsApp' ? 'active' : ''}`} onClick={() => setSelectedChannel('WhatsApp')}>
          WhatsApp
        </button>
        {/*
        <button className={`tab-button ${selectedChannel === 'Email' ? 'active' : ''}`} onClick={() => setSelectedChannel('Email')}>
          Email
        </button>
        */}
      </div>

      <div style={{ marginTop: '20px' }}>
        {selectedChannel === 'WhatsApp' && (
          <WhatsAppSection ApiUserData={ApiUserData} refreshUserData={refreshUserData} />
        )}
        {selectedChannel === 'Email' && (
          <EmailSection ApiUserData={ApiUserData} refreshUserData={refreshUserData} subsec={subsec} />
        )}
      </div>
    </div>
  );
};

export default MessagingChannels;
