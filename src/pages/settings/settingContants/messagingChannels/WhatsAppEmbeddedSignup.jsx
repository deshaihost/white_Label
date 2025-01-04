import React, { useEffect } from 'react';

const WhatsAppEmbeddedSignup = () => {
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: "571176512441758",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v21.0"
      });
    };

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.crossOrigin = "anonymous";
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    document.body.appendChild(script);

    const embeddedSignupInfoListener = (event) => {
      if (!event.origin.endsWith('facebook.com')) return;
      
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          // Handle successful completion
          if (data.event === 'FINISH' || data.event === 'FINISH_ONLY_WABA') {
            const {phone_number_id, waba_id} = data.data;
            console.log('Phone number ID ', phone_number_id, ' WhatsApp business account ID ', waba_id);
            // Here you can add logic to handle the successful signup
            // e.g., save these IDs to your backend or state management

          // Handle cancellation
          } else if (data.event === 'CANCEL') {
            const {current_step} = data.data;
            console.warn('Cancel at ', current_step);
            // Add logic for handling cancellation
          
          // Handle errors
          } else if (data.event === 'ERROR') {
            const {error_message} = data.data;
            console.error('error ', error_message);
            // Add logic for handling errors
          }
        }
      } catch (error) {
        console.log('Non JSON Responses', event.data);
      }
    };

    window.addEventListener("message", embeddedSignupInfoListener);
    return () => window.removeEventListener("message", embeddedSignupInfoListener);
  }, []);

  const launchEmbeddedSignup = () => {
    window.FB.login(
      () => {
        // Using Twilio APIs, so no additional handling here
      },
      {
        config_id: "399087879892234",
        auth_type: "rerequest",
        response_type: "code",
        override_default_response_type: true,
        extras: {
          sessionInfoVersion: 3,
          setup: {
            solutionID: "571176512441758"
          }
        }
      }
    );
  };

  return (
    <button
      onClick={launchEmbeddedSignup}
      style={{
        backgroundColor: "#1877f2",
        border: 0,
        borderRadius: 4,
        color: "#fff",
        cursor: "pointer",
        fontFamily: "Helvetica, Arial, sans-serif",
        fontSize: 16,
        fontWeight: "bold",
        height: 40,
        padding: "0 24px"
      }}
    >
      Login with Facebook
    </button>
  );
};

export default WhatsAppEmbeddedSignup;
