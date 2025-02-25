import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import { useLocation } from 'react-router-dom';
import ToastHandle from "../../../../helper/ToastMessage";
import axios from 'axios';
import Loader from "../../../../helper/Loader";
import "./messagingChannels.css";

const gmail_logo = 'https://storage.googleapis.com/frontend_media/partners/Gmail_icon_(2020).svg';

const ConnectGmailButton = ({ subsec }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  // Call the backend API to complete the OAuth flow
  const completeGmailOauth = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { code };
  
      const response = await axios.post(`${baseUrl}/complete_google_oauth`, body_data, config);
  
      if (response.status === 200) {
        return { success: true, data: response.data };
      } else {
        return { success: false, error: response.data?.error || 'Unknown error' };
      }
    } catch (error) {
      return { success:false, error:'Internal server error' };
    }
  };

  useEffect(() => {
    const handleOauth = async () => {
      // Only process OAuth if we're on the gmail callback route
      if (subsec !== 'gmail') {
        return;
      }

      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        setIsProcessing(true);
        try {
          const result = await completeGmailOauth(code);
          if (result.success) {
            ToastHandle('Successfully connected to Gmail!', 'success');
            dispatch(getUserDataActions(false)); // update user data so we can show the new integration
          } else {
            ToastHandle(`Failed to connect to Gmail: ${result.error}`, 'danger');
          }
        } catch (error) {
          ToastHandle('Failed to connect to Gmail.', 'danger');
          console.error('Error:', error);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    handleOauth();
  }, [location.search, subsec]);

  const handleConnectClick = () => {
    if (isProcessing) { return; }

    // Generate a random state parameter
    const state = generateRandomString(16);
    //localStorage.setItem('gmail_oauth_state', state);

    // Build the authorization URL
    const clientId = '846715585601-e108g2kk85v5oigdcqt97uvvmifut026.apps.googleusercontent.com';
    const redirectUri = encodeURIComponent('https://www.hostbuddy.ai/setting/messaging-channels/gmail');
    const scopes = encodeURIComponent("openid email profile https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send");
    const authorizationUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=code&state=${state}`;

    // Redirect the user to the authorization page
    window.location.href = authorizationUrl;
  };

  // Utility function to generate a random string for the state parameter
  const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  };

  return (
    <>
      {isProcessing ? (
        <Loader />
      ) : (
        <button className="gmail-connect-button" onClick={handleConnectClick}>
          <img src={gmail_logo} alt="Gmail" className="gmail-logo" />
          <span>Connect Gmail</span>
        </button>
      )}
    </>
  );
};

export default ConnectGmailButton;