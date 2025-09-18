import React, { useState, useEffect } from "react";
import WhatsAppEmbeddedSignup from "./WhatsAppEmbeddedSignup";

const WhatsAppSection = (ApiUserData, refreshUserData) => {
  const registeredWhatsAppNumber = ApiUserData?.ApiUserData?.whatsapp_phone_number || null;

  const [signupInProgress, setSignupInProgress] = useState(false);
  const [backendRegisterLoading, setBackendRegisterLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+');
  const [showFacebookSignup, setShowFacebookSignup] = useState(false);

  // When ApiUserData populates, update the phone number in the state if needed
  useEffect(() => {
    if (registeredWhatsAppNumber) {
      setPhoneNumber(registeredWhatsAppNumber);
    }
  }, [registeredWhatsAppNumber]);

  // Load Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '399087879892234',
        cookie: true,
        xfbml: true,
        version: 'v17.0'
      });
    };

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const gapBetweenSections = '60px';

  const isValidE164 = (num) => {
    if (!num || typeof num !== 'string') return false;
    if (!num.startsWith('+')) return false;
    
    const digitsOnly = num.slice(1); // Remove the '+' prefix for the check
    
    // Ensure we have a reasonable length
    if (digitsOnly.length < 8 || digitsOnly.length > 15) return false;
    
    // Ensure all characters are digits after the plus sign
    if (!/^\d+$/.test(digitsOnly)) return false;
    
    // E.164 format check
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
    
    console.log("Final phone number value:", value);
    setPhoneNumber(value);
    // Reset Facebook signup if phone number changes
    setShowFacebookSignup(false);
  };

  // Function to initiate Facebook signup
  const handleFacebookLogin = () => {
    console.log("Starting Facebook signup with phone number:", phoneNumber);
    
    if (window.FB) {
      setSignupInProgress(true);
      window.FB.login(
        (response) => {
          console.log("Facebook login response:", response);
          if (response.status === "connected" || response.authResponse) {
            // Set showFacebookSignup to true only after successful login
            setShowFacebookSignup(true);
          } else {
            setSignupInProgress(false);
            console.log("Facebook login was canceled or failed");
          }
        },
        {
          config_id: "399087879892234",
          auth_type: "rerequest",
          response_type: "code",
          override_default_response_type: true,
          extras: {
            sessionInfoVersion: 3,
            setup: {
              solutionID: "2037824596655024"
            }
          }
        }
      );
    } else {
      console.error("Facebook SDK not loaded");
      alert("Facebook login is not available. Please try again later.");
    }
  };

  return (
    <div>
      <h4 style={{marginBottom:'20px'}}>WhatsApp</h4>
      <p style={{fontSize:'15px', marginBottom:gapBetweenSections}}>If you have a WhatsApp Business account, you can connect it here to allow HostBuddy to communicate with your guest via WhatsApp.</p>
      
      <h6 style={{marginBottom:'20px'}}>1. Enter your WhatsApp Business phone number, including the country code. This is the number that HostBuddy will communicate with your guests through. <span style={{color:'orange'}}>It MUST match the number that you choose in the Facebook portal in the next step.</span></h6>
      <input 
        type="tel" 
        value={phoneNumber} 
        onChange={handlePhoneNumberChange} 
        disabled={registeredWhatsAppNumber !== null} 
        placeholder="+1234567890" 
        style={{
          marginBottom:gapBetweenSections, 
          padding:'8px', 
          fontSize:'16px', 
          borderRadius:'4px', 
          border:'1px solid #ccc', 
          width:'200px', 
          backgroundColor:registeredWhatsAppNumber !== null ? '#aaa' : 'white', 
          color:'black'
        }}
      />
      
      <h6 style={{marginBottom:'20px'}}>2. Click the button below to connect your WhatsApp Business account to HostBuddy.</h6>
      {!registeredWhatsAppNumber ? (
        isValidE164(phoneNumber) ? (
          <div style={{marginBottom:'60px'}}>
            {!signupInProgress ? (
              <button 
                onClick={handleFacebookLogin} 
                style={{
                  backgroundColor:"#1877f2", 
                  border:0, 
                  borderRadius:4, 
                  color:"#fff", 
                  cursor:"pointer", 
                  fontFamily:"Helvetica, Arial, sans-serif", 
                  fontSize:16, 
                  fontWeight:"bold", 
                  height:40, 
                  padding:"0 24px"
                }}
              >
                Login with Facebook
              </button>
            ) : (
              <div style={{marginTop: '10px'}}>
                <p style={{fontSize: '14px'}}>Facebook login in progress...</p>
              </div>
            )}
            
            {/* Render WhatsAppEmbeddedSignup after Facebook login is complete */}
            {showFacebookSignup && (
              <div>
                {console.log("Phone number being passed to WhatsAppEmbeddedSignup:", phoneNumber)}
                <WhatsAppEmbeddedSignup 
                  signupInProgress={signupInProgress} 
                  setSignupInProgress={setSignupInProgress} 
                  backendRegisterLoading={backendRegisterLoading} 
                  setBackendRegisterLoading={setBackendRegisterLoading} 
                  phoneNumberEntered={phoneNumber} 
                  refreshUserData={refreshUserData}
                />
              </div>
            )}
          </div>
        ) : (
          // Fake unclickable button while no valid phone number is entered
          <div style={{display:'flex', flexDirection:'column', gap:'8px', width:'fit-content', marginBottom:'60px'}}>
            <button 
              onClick={() => {}} 
              style={{
                backgroundColor:"#506c8f", 
                border:0, 
                borderRadius:4, 
                color:"#CCC", 
                cursor:"not-allowed", 
                fontFamily:"Helvetica, Arial, sans-serif", 
                fontSize:16, 
                fontWeight:"bold", 
                height:40, 
                padding:"0 24px", 
                alignSelf:'flex-start'
              }}
            >
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

      {/*
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
      */}

    </div>
  );
};

export default WhatsAppSection;