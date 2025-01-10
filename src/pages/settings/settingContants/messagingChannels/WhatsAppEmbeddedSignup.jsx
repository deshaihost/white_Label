import React, { useEffect } from 'react';
import ToastHandle from '../../../../helper/ToastMessage';
import axios from 'axios';
import Loader from '../../../../helper/Loader';

const WhatsAppEmbeddedSignup = ({signupInProgress, setSignupInProgress, backendRegisterLoading, setBackendRegisterLoading, phoneNumberEntered, refreshUserData}) => {

  const launchEmbeddedSignup = () => {
    setSignupInProgress(true);
    window.FB.login(
      () => {
        console.log('Logged in');
      }, // Using Twilio APIs, so no additional handling here
      {
        config_id: "399087879892234",
        auth_type: "rerequest", // Avoids 'user is already logged' in errors if users click the button again before refreshing the page
        response_type: "code",
        override_default_response_type: true,
        extras: {
          sessionInfoVersion: 3, // Required to get WABA ID
          setup: {
            solutionID: "2037824596655024"
          }
        }
      }
    );
  };


  const callBackendFinishSignupApi = async (phone_number, phone_number_id, waba_id) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setBackendRegisterLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post(`${baseUrl}/complete_whatsapp_signup`, {phone_number, phone_number_id, waba_id}, config);

      if (response.status === 200 || response.status === 201) {
        ToastHandle("Successfully completed signup", "success");
        refreshUserData();
      }
      else { ToastHandle("Failed to complete signup: " + (response.data.error || "Unknown error"), "danger"); }
    }
    catch (error) { ToastHandle("Failed to complete signup - an error occurred", "danger"); }
    finally { setBackendRegisterLoading(false); }
  };


  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({appId:"571176512441758", autoLogAppEvents:true, xfbml:true, version:"v21.0"});
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
        console.log('Received message from embedded signup', event.data);
        const data = JSON.parse(event.data);
        if (data.type === 'WA_EMBEDDED_SIGNUP') {
          // Handle successful completion
          if (data.event === 'FINISH' || data.event === 'FINISH_ONLY_WABA') {
            console.log('Finish event:', data);
            const {phone_number_id, waba_id} = data.data;
            //console.log('Phone number ID ', phone_number_id, ' WhatsApp business account ID ', waba_id);
            callBackendFinishSignupApi(phoneNumberEntered, phone_number_id, waba_id);
            setSignupInProgress(false);

          // Handle cancellation
          } else if (data.event === 'CANCEL') {
            console.log('Cancel event:', data);
            //const {current_step} = data.data;
            //console.warn('Cancel at ', current_step);
            setSignupInProgress(false);
          
          // Handle errors
          } else if (data.event === 'ERROR') {
            console.log('Error event:', data);
            const {error_message} = data.data;
            //console.error('error ', error_message);
            ToastHandle('error: ' + error_message, 'danger');
            setSignupInProgress(false);
          }
        }
      } catch (error) {
        //console.log('Non JSON Responses', event.data);
        setSignupInProgress(false);
      }
    };

    window.addEventListener("message", embeddedSignupInfoListener);
    return () => window.removeEventListener("message", embeddedSignupInfoListener);
  }, []);


  return (
    <>
      {(!signupInProgress && !backendRegisterLoading) ? (
        <button onClick={launchEmbeddedSignup} style={{backgroundColor:"#1877f2", border:0, borderRadius:4, color:"#fff", cursor:"pointer", fontFamily:"Helvetica, Arial, sans-serif", fontSize:16, fontWeight:"bold", height:40, padding:"0 24px"}}>
          Login with Facebook
        </button>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default WhatsAppEmbeddedSignup;
