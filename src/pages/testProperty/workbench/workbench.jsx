import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChatWindow from "./chatWindow/chatWindow";
import PullOutPanel from './pullOutPanel/pullOutPanel';
import { Helmet } from "react-helmet";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './workbench.css';
import hostBuddyLogo from "../../../public/img/logo/logoGraphicOnlySquare.webp";
import TypingIndicator from '../../../component/chatbotThinkingBubble/typingIndicator';

/* Dummy icons for now */
import { FaHome, FaPencilAlt, FaBook, FaCog } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";

const leo_img = 'https://orbirental-images.s3.amazonaws.com/4ca3b355-c04e-4fb8-a593-e3a50b721d58_604.png';

const Workbench = () => {
  const { property_name } = useParams();

  const [apiPropertyData, setApiPropertyData] = useState(null);
  const [reservationStage, setReservationStage] = useState('current');
  const [isPanelOpen, setIsPanelOpen] = useState(false); // State for panel visibility
  const [panelContent, setPanelContent] = useState(null); // State for panel content

  // This can't be factored out of this file because it uses this component's useState hooks
  const getPropertyDataFromAPI = async (propertyName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.get(`${baseUrl}/properties/${propertyName}`, config);

      if (response.status === 200) {
        setApiPropertyData(response.data.property);
      } else {  }
    } catch (error) {  }
  };

  // Function to open the panel
  const handleActionClick = (content) => {
    setPanelContent(content);
    setIsPanelOpen(true);
  };

  // Function to close the panel
  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setPanelContent(null);
  };

  // When the page loads, fetch the property data from the API and set it in state
  useEffect(() => {
    getPropertyDataFromAPI(property_name);
  }, [property_name]);


  // Chat window state & logic ---------------------------------------------------------
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [responseIsLoading, setResponseIsLoading] = useState(false);
  const [lastMessageJustification, setLastMessageJustification] = useState(null);

  // After a successful intiialize API call, call this to set the first messages and save the session ID
  const initializeStateFromApiReturn = (response) => {
    const initial_bot_message_str = response.data.initial_message;
    const session_id_str = response.data.session_id;

    const userMessage = { sender:"user", text:"Hi" };
    const botMessage = { sender:"bot", text:{response:initial_bot_message_str, message_id:session_id_str} }; // bot message uses this format for text because ChatWindow logic is not smartly built
    setMessages([botMessage]);
    setSessionId(session_id_str);
  };

  // After a successful send message API call (and bot response received), call this to update the chat state
  const setStateAfterSendMessage = (response) => {
    const bot_message_str = response.data.response;
    const message_id_str = response.data.message_id;
    const justification = response.data.justification;

    const botMessage = { sender:"bot", text:{response:bot_message_str, message_id:message_id_str, justification:justification} };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
    setLastMessageJustification(justification);
  };

  // Call the API to initialize the chat session, then set the state for the brand new chat
  const callInitializeApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = { property_name:property_name, user:'host' };
      const response = await axios.post(`${baseUrl}/initialize`, bodyData, config);

      if (response.status === 200) {
        initializeStateFromApiReturn(response);
      }
    }
    catch (error) {  }
  }

  // Call the API to send a message, and update all the state stuff on response
  const callSendMessageApi = async (messageText) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setResponseIsLoading(true);

    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const bodyData = { session_id:sessionId, message:messageText, reservation_stage:reservationStage };
      const response = await axios.post(`${baseUrl}/chat`, bodyData, config);

      if (response.status === 200) {
        setStateAfterSendMessage(response);
      }
    }
    catch (error) {  }
    finally { setResponseIsLoading(false); }
  }

  const handleReset = async () => {
    setMessages([]);
    setResponseIsLoading(true);
    await callInitializeApi();
    setResponseIsLoading(false);
  }


  // When the page loads, initialize the chat session
  useEffect(() => {
    if (property_name) callInitializeApi();
  }, [property_name]);
  // -----------------------------------------------------------------------------------


  return (
    <div className='workbench'>
      <Helmet>
        <title>Test Property - HostBuddy AI</title>
      </Helmet>

      <div className='left-container'>
        <div className='control-section'>
          <button onClick={handleReset} className='reset-button'>
            <FaRotateRight /> Reset
          </button>
          <div className='reservation-stage'>
            <h6 style={{marginBottom:'2px'}}>Reservation Stage</h6>
            <select id='reservation-stage-select' className='reservation-stage-select' value={reservationStage} onChange={(e) => setReservationStage(e.target.value)}>
              <option value='' disabled>Select...</option>
              <option value='current'>Current</option>
              <option value='inquiry'>Inquiry</option>
              <option value='future'>Future</option>
              <option value='past'>Past</option>
            </select>
          </div>
        </div>
        <ChatWindow property_name={property_name} messages={messages} setMessages={setMessages} sessionId={sessionId} callSendMessageApi={callSendMessageApi} responseIsLoading={responseIsLoading}/>
      </div>

      <div className='right-container'>
        <div className='right-content'>
          <div className='header-information'>
            <div className='header-content'>
              <img src={leo_img} alt='dummy property' />
              <div className='header-text'>
                <h2 style={{marginBottom:'5px'}}>{property_name}</h2>
                {/* <h4 style={{marginBottom:'5px'}}>1281 Broadway, San Diego</h4> */}
                <Link to='/properties'>&larr; Back to Properties</Link>
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
                    <h5 style={{marginTop:'0'}}>Where did this response come from?</h5>
                    <p>{lastMessageJustification}</p>
                    {/*
                    <h5>Suggestions</h5>
                    <ul>
                      <li>Add information about typical travel times and the best routes for driving to Tijuana from the property.</li>
                    </ul>
                    */}
                  </>
                ) : (
                  <p style={{color:'#AAA', fontStyle:'italic', fontSize:'16px'}}>Send HostBuddy a message to get started!</p>
                )
              )}
            </div>
          </div>
        </div>

        <div className='actions-section'>
          <h3>Actions</h3>
          <div className='actions-container'>
            <div className='clickable-div action-content' onClick={() => handleActionClick('quickAdd')}>
              <FaPencilAlt />
              <h6>Quick Add To Knowledge Base</h6>
            </div>
            <div className='clickable-div action-content' onClick={() => handleActionClick('editProperty')}>
              <FaHome />
              <h6>Edit Property Profile</h6>
            </div>
            <div className='clickable-div action-content' onClick={() => handleActionClick('manageSources')}>
              <FaBook />
              <h6>Manage Knowledge Base Sources</h6>
            </div>
            <div className='clickable-div action-content' onClick={() => handleActionClick('conversationPreferences')}>
              <FaCog />
              <h6>Conversation Preferences</h6>
            </div>
          </div>
        </div>
      </div>
      <PullOutPanel onClose={handleClosePanel} content={panelContent} className={isPanelOpen ? 'open' : ''} propertyName={property_name} apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
    </div>
  )
}

export default Workbench