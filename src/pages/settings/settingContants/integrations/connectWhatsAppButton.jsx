import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Integrations.css';

const ConnectToWhatsApp = () => {

  return (
    <>
      <Link to="/setting/messaging-channels" className="partner-tile">
        <img className="partner-logo" alt="WhatsApp Logo" src="https://hostbuddylb.com/partners/WhatsApp_logo.svg"/>
        <p>Connect your WhatsApp Business Account to view your WhatsApp conversations in your inbox, and let HostBuddy automatically respond to your guests over WhatsApp.</p>
      </Link>
    </>
  );
};

export default ConnectToWhatsApp;
