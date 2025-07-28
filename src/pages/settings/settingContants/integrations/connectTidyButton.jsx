import React, { useState, useEffect } from 'react';
import './Integrations.css';
import ContactUs from '../../../meetHostBuddy/discover/contactUs/ContactUs';

const ConnectToTidy = () => {
  const [contactModalShow, setContactModalShow] = useState(false);

  return (
    <>
      <div className="partner-tile" onClick={() => { setContactModalShow(true); }}>
        <img className="partner-logo" alt="Tidy Logo" src={require('./Icons/Tidy Logo.svg').default}/>
        <p>HostBuddy's groundbreaking partnership with Tidy allows you to completely automate the handling of early check-in / late check-out requests based on the real-time cleaning status of your properties. Contact us to get access!</p>
      </div>
      <ContactUs show={contactModalShow} onHide={() => setContactModalShow(false)}/>
    </>
  );
};

export default ConnectToTidy;
