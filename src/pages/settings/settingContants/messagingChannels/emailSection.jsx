import React, { useState, useEffect } from "react";
import ConnectGmailButton from "./connectGmailButton";
import "./messagingChannels.css";

const EmailSection = ({ ApiUserData, refreshUserData, subsec }) => {
  const existingConnectedEmails = ApiUserData?.email_senders || [];

  return (
    <div className="email-section">
      <h4>Email Channel</h4>
      <p>Connect your Gmail account to send and receive emails through HostBuddy.</p>
      {existingConnectedEmails.length > 0 ? (
        <p>You have connected email addresses: {existingConnectedEmails.join(', ')}</p>
      ) : (
        <ConnectGmailButton subsec={subsec} />
      )}
    </div>
  );
};

export default EmailSection;

