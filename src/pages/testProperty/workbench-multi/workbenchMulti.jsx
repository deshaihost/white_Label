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

const WorkbenchMulti = () => {
  const { multi_property_id } = useParams();

  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [responseIsLoading, setResponseIsLoading] = useState(false);
  const [lastMessageJustification, setLastMessageJustification] = useState(null);
  const [multiPropertyName, setMultiPropertyName] = useState('');

  const initializeStateFromApiReturn = (response) => {
    const initial_bot_message_str = response.data.initial_message;
    const session_id_str = response.data.session_id;
    setMultiPropertyName(response.data.multi_property_name);
    setMessages([{ sender: "bot", text: { response: initial_bot_message_str, message_id: session_id_str } }]);
    setSessionId(session_id_str);
  };

  const getSanitizedBaseUrl = () => {
    const rawUrl = import.meta.env.VITE_API_ENDPOINT;
    console.log("Url:", rawUrl);
    // Remove any 'undefined' from the URL
    return rawUrl;
  };

  const callInitializeApi = async () => {
    setMessages([]);
    const baseUrl = getSanitizedBaseUrl();
    const API_KEY = import.meta.env.VITE_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = { multi_property_id: multi_property_id };
      const response = await axios.post(`${baseUrl}/initialize_multi`, bodyData, config);

      if (response.status === 200) {
        initializeStateFromApiReturn(response);
      }
    }
    catch (error) { }
  }

  const callSendMessageApi = async (messageText) => {
    const baseUrl = getSanitizedBaseUrl();
    const API_KEY = import.meta.env.VITE_API_KEY;
    setResponseIsLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = {
        multi_property_id: multi_property_id,
        conversation_id: sessionId,
        message: messageText
      };
      const response = await axios.post(`${baseUrl}/chat_multi`, bodyData, config);

      if (response.status === 200) {
        const bot_message_str = response.data.response;
        const message_id_str = response.data.message_id;
        const justification = response.data.justification;
        setMessages((prev) => [...prev, { sender: "bot", text: { response: bot_message_str, message_id: message_id_str, justification } }]);
        setLastMessageJustification(justification);
      }
    }
    catch (error) { }
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
