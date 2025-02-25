import React, { useState, useEffect } from "react";
import WhatsAppEmbeddedSignup from "./WhatsAppEmbeddedSignup";

const WhatsAppSection = (ApiUserData, refreshUserData) => {
  const registeredWhatsAppNumber = ApiUserData?.ApiUserData?.whatsapp_phone_number || null;

  const [signupInProgress, setSignupInProgress] = useState(false);
  const [backendRegisterLoading, setBackendRegisterLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+');

  // When ApiUserData populates, update the phone number in the state if needed
  useEffect(() => {
    if (registeredWhatsAppNumber) {
      setPhoneNumber(registeredWhatsAppNumber);
    }
  }, [registeredWhatsAppNumber]);

  const gapBetweenSections = '60px';

  const isValidE164 = (num) => {
    if (!num.startsWith('+')) return false;
    const digitsOnly = num.slice(1); // Remove the '+' prefix for the check
    if (digitsOnly.length < 11 || digitsOnly.length > 15) return false;
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(num);
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value;
    
    // If the user tries to delete the plus sign, keep it
    if (!value.includes('+')) {
      value = '+' + value.replace(/\+/g, '');
    }
    
    // Remove any non-digit characters except the plus sign
    value = value.replace(/[^\d+]/g, '');
    
    // Ensure plus sign is always at the start
    if (value.indexOf('+') !== 0) {
      value = '+' + value.replace(/\+/g, '');
    }
    
    setPhoneNumber(value);
  };

  return (
    <div>
      <h4 style={{marginBottom:'20px'}}>WhatsApp</h4>
      <p style={{fontSize:'15px', marginBottom:gapBetweenSections}}>If you have a WhatsApp Business account, you can connect it here to allow HostBuddy to communicate with your guest via WhatsApp.</p>
      
      <h6 style={{marginBottom:'20px'}}>1. Enter your WhatsApp Business phone number, including the country code. This is the number that HostBuddy will communicate with your guests through. It MUST match the number that you choose in the Facebook portal in the next step.</h6>
      <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} disabled={registeredWhatsAppNumber !== null} placeholder="+1234567890" style={{marginBottom:gapBetweenSections, padding:'8px', fontSize:'16px', borderRadius:'4px', border:'1px solid #ccc', width:'200px', backgroundColor:registeredWhatsAppNumber !== null ? '#aaa' : 'white', color:'black'}}/>
      
      <h6 style={{marginBottom:'20px'}}>2. Click the button below to connect your WhatsApp Business account to HostBuddy.</h6>
      {!registeredWhatsAppNumber ? (
        isValidE164(phoneNumber) ? (
          <div style={{marginBottom:'60px'}}>
            <WhatsAppEmbeddedSignup signupInProgress={signupInProgress} setSignupInProgress={setSignupInProgress} backendRegisterLoading={backendRegisterLoading} setBackendRegisterLoading={setBackendRegisterLoading} phoneNumberEntered={phoneNumber} refreshUserData={refreshUserData}/>
          </div>
        ) : (
          // Fake unclickable button while no valid phone number is entered
          <div style={{display:'flex', flexDirection:'column', gap:'8px', width:'fit-content', marginBottom:'60px'}}>
            <button onClick={() => {}} style={{backgroundColor:"#506c8f", border:0, borderRadius:4, color:"#CCC", cursor:"not-allowed", fontFamily:"Helvetica, Arial, sans-serif", fontSize:16, fontWeight:"bold", height:40, padding:"0 24px", alignSelf:'flex-start'}}>
              Login with Facebook
            </button>
            <label style={{color:'white', fontSize:'12px'}}>Please enter a valid phone number first, including the country code.</label>
          </div>
        )
      ) : (
        <div style={{marginBottom:'60px'}}>
          <p style={{color:'#093', fontSize:'14px'}}>You have already connected your WhatsApp Business account!</p>
        </div>
      )}

      <h6 style={{marginBottom:'20px'}}>3. Toggle the switch below to enable automated responses to your guests over WhatsApp.</h6>
      <div className="enableSection">
          <p className="d-flex align-items-center gap-4">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" checked={false} onChange={() => {}} id="flexSwitchCheckChecked"/>
            </div>
            Enable WhatsApp Messaging
          </p>
          {!registeredWhatsAppNumber ? (
            <p className="fs-14 text-muted">
              Complete the steps above to enable WhatsApp messaging.
            </p>
          ) : (
            <p className="fs-14 text-muted">
              This functionality is scheduled for release later this week. To have it enabled for your account, please contact support.
            </p>
          )}
        </div>
    </div>
  );
};

export default WhatsAppSection;
