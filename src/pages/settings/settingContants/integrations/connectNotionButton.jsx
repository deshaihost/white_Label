import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import { useLocation } from 'react-router-dom';
import './Integrations.css';
import axios from 'axios';
import ToastHandle from "../../../../helper/ToastMessage";

const ConnectToNotion = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  // Call the backend API to complete the OAuth flow
  const completeNotionOauth = async (code) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { code };
  
      const response = await axios.post(`${baseUrl}/complete_notion_oauth`, body_data, config);
  
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
      // Only process if we're on the Notion redirect path
      if (!location.pathname.endsWith('/notion')) {
        return;
      }
      
      const params = new URLSearchParams(location.search);
      const code = params.get('code');

      if (code) {
        setIsProcessing(true);
        try {
          const result = await completeNotionOauth(code);
          if (result.success) {
            ToastHandle('Successfully connected to Notion!', 'success');
            dispatch(getUserDataActions(false)); // update user data so we can show the new integration
            
            // Redirect back to main integrations page after successful connection
            window.location.href = '/setting/integrations';
          } else {
            ToastHandle(`Failed to connect to Notion: ${result.error}`, 'danger');
          }
        } catch (error) {
          setMessage('Failed to connect to Notion.');
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

    // Use the provided authorization URL
    const authorizationUrl = "https://api.notion.com/v1/oauth/authorize?client_id=1eed872b-594c-8022-8cb4-00372c49bc69&response_type=code&owner=user&redirect_uri=https%3A%2F%2Fwww.hostbuddy.ai%2Fsetting%2Fintegrations%2Fnotion";

    // Redirect the user to Notion's authorization endpoint
    window.location.href = authorizationUrl;
  };

  return (
    <div className="partner-tile" onClick={handleConnectClick}>
      <img className="partner-logo" alt="Notion Logo" src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png"/>
      <p>Connect with Notion to let HostBuddy reference your documents and databases when responding to guests, allowing you to easily keep HostBuddy's knowledge base up to date in real time.</p>
    </div>
  );
};

export default ConnectToNotion;
