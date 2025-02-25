import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import { useLocation } from 'react-router-dom';
import './Integrations.css';
import axios from 'axios';
import ToastHandle from "../../../../helper/ToastMessage";

const ConnectToTurno = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Call the backend API to complete the OAuth flow
  const completeTurnoOauth = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { code };
  
      const response = await axios.post(`${baseUrl}/complete_turno_oauth`, body_data, config);
  
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
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const returnedState = params.get('state');

      if (code && returnedState) {
        //const storedState = localStorage.getItem('turno_oauth_state');

        //if (storedState !== returnedState) { // skip state check
        if (false) {
          ToastHandle('ERROR: State Mismatch.', 'danger');
        } else {
          setIsProcessing(true);
          try {
            const result = await completeTurnoOauth(code);
            if (result.success) {
              ToastHandle('Successfully connected to Turno!', 'success');
              dispatch(getUserDataActions(false)); // update user data so we can show the new integration
            } else {
              ToastHandle(`Failed to connect to Turno: ${result.error}`, 'danger');
            }
          } catch (error) {
            ToastHandle('Failed to connect to Turno.', 'danger');
            console.error('Error:', error);
          } finally {
            setIsProcessing(false);
          }
        }
      }
    };

    handleOauth();
  }, [location.search]);

  const handleConnectClick = () => {
    if (isProcessing) { return; }

    // Generate a random state parameter
    const state = generateRandomString(16);
    localStorage.setItem('turno_oauth_state', state);

    // Build the authorization URL
    const clientId = '13';
    const redirectUri = 'https://www.hostbuddy.ai/setting/integrations';
    const authorizationUrl = `https://app.turno.com/v2/oauth/authorize?client_id=${encodeURIComponent(clientId)}&response_type=code&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(redirectUri)}`; // prod
    // const authorizationUrl = `https://sandbox.turno.com/v2/oauth/authorize?client_id=${encodeURIComponent(clientId)}&response_type=code&state=${encodeURIComponent(state)}&redirect_uri=${encodeURIComponent(redirectUri)}`; // not prod

    // Redirect the user to Turno's authorization endpoint
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
    <div className="partner-tile" onClick={handleConnectClick}>
      <img className="partner-logo" alt="Turno Logo" src="https://storage.googleapis.com/frontend_media/partners/turno-logo-with-text.webp"/>
      <p>Connecting your Turno account lets you use "Property Ready" in Smart Templates, so you can send messages to guests when their unit is ready for check-in.</p>
    </div>
  );
};

export default ConnectToTurno;
