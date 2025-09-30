import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatWindow from "./chatWindow/chatWindow";
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './workbenchMulti.css';
import hostBuddyLogo from "../../../public/img/logo/logoGraphicOnlySquare.webp";
import TypingIndicator from '../../../component/chatbotThinkingBubble/typingIndicator';
import HostDaddy from '../../../component/hostDaddy/hostDaddy';

import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from '../../../redux/actions';
import { FaHome, FaPencilAlt, FaBook, FaCog } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";

import dummyPropertyImg from "../../../public/img/dummyPropertyImg.png";
import Authorized, { logOut } from '../../../helper/Authorized';
import { getActiveToken } from '../../../helper/apiCore';

const WorkbenchMulti = () => {
  const { multi_property_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [responseIsLoading, setResponseIsLoading] = useState(false);
  const [lastMessageJustification, setLastMessageJustification] = useState(null);
  const [multiPropertyName, setMultiPropertyName] = useState('');

  // Debug authentication state on component mount
  useEffect(() => {
    console.log('🚀 [DEBUG] WorkbenchMulti component mounted');
    console.log('🏠 Multi Property ID from URL:', multi_property_id);
    
    // Check authentication state
    const authData = Authorized();
    console.log('🔐 Initial Auth Check - Auth Data:', authData ? 'Present' : 'MISSING');
    if (authData) {
      console.log('🎫 Initial Auth Check - JWT Token:', authData.token ? `${authData.token.substring(0, 20)}...` : 'MISSING');
      console.log('👤 Initial Auth Check - User:', authData.user || 'No user info');
    }

    const activeToken = getActiveToken();
    console.log('🔓 Initial Auth Check - Active Token from helper:', activeToken ? `${activeToken.substring(0, 20)}...` : 'MISSING');

    // Check session/localStorage for auth
    const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
    console.log('💾 Initial Auth Check - Session Auth:', sessionAuth ? 'Present' : 'MISSING');
    console.log('💿 Initial Auth Check - Local Auth:', localAuth ? 'Present' : 'MISSING');

    // Check if axios defaults have the auth header
    console.log('🔧 Axios Default Headers:', JSON.stringify(axios.defaults.headers.common, null, 2));
  }, []);

  const initializeStateFromApiReturn = (response) => {
    const initial_bot_message_str = response.data.initial_message;
    const session_id_str = response.data.session_id;
    setMultiPropertyName(response.data.multi_property_name);
    setMessages([{ sender: "bot", text: { response: initial_bot_message_str, message_id: session_id_str } }]);
    setSessionId(session_id_str);
  };

  const callInitializeApi = async () => {
    setMessages([]);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    // Debug logs for authentication
    console.log('🔍 [DEBUG] WorkbenchMulti - callInitializeApi');
    console.log('🔑 API_KEY:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'MISSING');
    console.log('🌐 Base URL:', baseUrl);
    console.log('🏠 Multi Property ID:', multi_property_id);

    // Check authentication state
    const authData = Authorized();
    console.log('🔐 Auth Data:', authData ? 'Present' : 'MISSING');
    if (authData) {
      console.log('🎫 JWT Token:', authData.token ? `${authData.token.substring(0, 20)}...` : 'MISSING');
    }

    const activeToken = getActiveToken();
    console.log('🔓 Active Token from helper:', activeToken ? `${activeToken.substring(0, 20)}...` : 'MISSING');

    // Check session/localStorage for auth
    const sessionAuth = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const localAuth = JSON.parse(localStorage.getItem("hostBuddy_auth"));
    console.log('💾 Session Auth:', sessionAuth ? 'Present' : 'MISSING');
    console.log('💿 Local Auth:', localAuth ? 'Present' : 'MISSING');

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      // Add Authorization header if we have a token
      if (authData && authData.token) {
        config.headers["Authorization"] = `Bearer ${authData.token}`;
        console.log('✅ Added Authorization header to config');
      } else {
        console.log('❌ No JWT token available for Authorization header');
      }

      console.log('📤 Request Headers:', JSON.stringify(config.headers, null, 2));

      const bodyData = { multi_property_id: multi_property_id };
      console.log('📦 Request Body:', JSON.stringify(bodyData, null, 2));

      const apiUrl = `${baseUrl}/initialize_multi`;
      console.log('🎯 API URL:', apiUrl);

      const response = await axios.post(apiUrl.replace(/undefined\/?/g, ""), bodyData, config);
      
      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Data:', JSON.stringify(response.data, null, 2));

      if (response.status === 200) {
        initializeStateFromApiReturn(response);
        console.log('✅ Initialize API call successful');
      } else {
        console.log('⚠️ Initialize API call returned non-200 status:', response.status);
      }
    }
    catch (error) { 
      console.error('❌ Initialize API call failed:', error);
      if (error.response) {
        console.error('❌ Error Response Status:', error.response.status);
        console.error('❌ Error Response Data:', error.response.data);
      }
    }
  }

  const callSendMessageApi = async (messageText) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setResponseIsLoading(true);

    // Debug logs for authentication
    console.log('🔍 [DEBUG] WorkbenchMulti - callSendMessageApi');
    console.log('💬 Message:', messageText);
    console.log('🔑 API_KEY:', API_KEY ? `${API_KEY.substring(0, 10)}...` : 'MISSING');
    console.log('🌐 Base URL:', baseUrl);
    console.log('🏠 Multi Property ID:', multi_property_id);
    console.log('💼 Session ID:', sessionId);

    // Check authentication state
    const authData = Authorized();
    console.log('🔐 Auth Data:', authData ? 'Present' : 'MISSING');
    if (authData) {
      console.log('🎫 JWT Token:', authData.token ? `${authData.token.substring(0, 20)}...` : 'MISSING');
    }

    const activeToken = getActiveToken();
    console.log('🔓 Active Token from helper:', activeToken ? `${activeToken.substring(0, 20)}...` : 'MISSING');

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      // Add Authorization header if we have a token
      if (authData && authData.token) {
        config.headers["Authorization"] = `Bearer ${authData.token}`;
        console.log('✅ Added Authorization header to config');
      } else {
        console.log('❌ No JWT token available for Authorization header');
      }

      console.log('📤 Request Headers:', JSON.stringify(config.headers, null, 2));

      const bodyData = {
        multi_property_id: multi_property_id,
        conversation_id: sessionId,
        message: messageText
      };
      console.log('📦 Request Body:', JSON.stringify(bodyData, null, 2));

      const apiUrl = `${baseUrl}/chat_multi`;
      console.log('🎯 API URL:', apiUrl);

      const response = await axios.post(apiUrl.replace(/undefined\/?/g, ""), bodyData, config);

      console.log('📥 Response Status:', response.status);
      console.log('📥 Response Data:', JSON.stringify(response.data, null, 2));

      if (response.status === 200) {
        const bot_message_str = response.data.response;
        const message_id_str = response.data.message_id;
        const justification = response.data.justification;
        setMessages((prev) => [...prev, { sender: "bot", text: { response: bot_message_str, message_id: message_id_str, justification } }]);
        setLastMessageJustification(justification);
        console.log('✅ Send message API call successful');
      } else {
        console.log('⚠️ Send message API call returned non-200 status:', response.status);
      }
    }
    catch (error) { 
      console.error('❌ Send message API call failed:', error);
      if (error.response) {
        console.error('❌ Error Response Status:', error.response.status);
        console.error('❌ Error Response Data:', error.response.data);
      }
    }
    finally { setResponseIsLoading(false); }
  }

  const handleReset = async () => {
    setMessages([]);
    setResponseIsLoading(true);
    await callInitializeApi();
    setResponseIsLoading(false);
  }

  useEffect(() => {
    if (multi_property_id) callInitializeApi();
  }, [multi_property_id]);

  return (
    <div className='workbench'>
      <Helmet>
        <title>Test Multi-Property - HostBuddy AI</title>
      </Helmet>

      <div className='left-container'>
        <div className='control-section'>
          <button onClick={handleReset} className='reset-button'>
            <FaRotateRight /> Reset
          </button>
        </div>
        <ChatWindow
          messages={messages}
          setMessages={setMessages}
          sessionId={sessionId}
          callSendMessageApi={callSendMessageApi}
          responseIsLoading={responseIsLoading}
        />
      </div>

      <div className='right-container'>
        <div className='right-content'>
          <div className='header-information'>
            <div className='header-content'>
              <div className='header-text'>
                <h2 style={{ marginBottom: '5px' }}>{multiPropertyName}</h2>
                <Link to='/properties?multi=true'>&larr; Back to Multi Properties</Link>
              </div>
            </div>
          </div>

          <div className='chat-information'>
            <h3><img src={hostBuddyLogo} /> Conversation Analysis</h3>
            <div className='chat-information-content'>
              {responseIsLoading ? (
                <TypingIndicator />
              ) : (
                lastMessageJustification ? (
                  <>
                    <h5 style={{ marginTop: '0' }}>Where did this response come from?</h5>
                    <p>{lastMessageJustification}</p>
                  </>
                ) : (
                  <p style={{ color: '#AAA', fontStyle: 'italic', fontSize: '16px' }}>Send HostBuddy a message to get started!</p>
                )
              )}
            </div>
          </div>
        </div>

      </div>
      <HostDaddy />
    </div>
  )
}

export default WorkbenchMulti;
