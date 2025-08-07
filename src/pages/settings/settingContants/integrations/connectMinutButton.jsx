import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import { useLocation } from 'react-router-dom';
import './Integrations.css';
import axios from 'axios';
import ToastHandle from "../../../../helper/ToastMessage";
import MinutLogo from './Icons/Minut Logo.svg';

const ConnectToMinut = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  // Call the backend API to complete the OAuth flow
  const completeMinutOauth = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { code };
  
      const response = await axios.post(`${baseUrl}/complete_minut_oauth`, body_data, config);
  
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
      // Only process if we're on the exact integrations path (not a subpath)
      if (location.pathname !== '/setting/integrations') {
        return;
      }
      
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        setIsProcessing(true);
        try {
          const result = await completeMinutOauth(code);
          if (result.success) {
            ToastHandle('Successfully connected to Minut!', 'success');
            dispatch(getUserDataActions(false)); // update user data so we can show the new integration
          } else {
            ToastHandle(`Failed to connect to Minut: ${result.error}`, 'danger');
          }
        } catch (error) {
          setMessage('Failed to connect to Minut.');
          console.error('Error:', error);
        } finally {
          setIsProcessing(false);
        }
      }
    };

    handleOauth();
  }, [location.search, location.pathname]);

  const handleConnectClick = () => {
    if (isProcessing) { return; }

    // Build the authorization URL
    const clientId = '39ce85e5b969749c';
    const redirectUri = 'https://www.hostbuddy.ai/setting/integrations';
    const authorizationUrl = `https://api.minut.com/v8/oauth/authorize?response_type=code&client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

    // Redirect the user to Minut's authorization endpoint
    window.location.href = authorizationUrl;
  };

  return (
    <div className="partner-tile" onClick={handleConnectClick}>
      <img className="partner-logo" alt="Minut Logo" src={MinutLogo} />
      <p>Connect with Minut’s insights platform to automate and personalize guest messaging for noise or occupancy events. streamline your operations, keep your property protected, and enhance guest experience.</p>
    </div>
  );
};

export default ConnectToMinut;
