import React from 'react';
import './ConversationHistoryLocked.css';
import ConversationIcon from './icons/Conversation_icon_inbox_messages.svg';
import { useNavigate } from 'react-router-dom';

const ConversationHistoryLocked = () => {
  const navigate = useNavigate();
  return (
    <div className="conversation-history-locked">
      <img src={ConversationIcon} alt="Conversation History" className="conversation-icon" />

      {/* <div className="conversation-history-icon"> */}
        {/* Decorative stars */}
        {/* <div className="star star-1"></div>
        <div className="star star-2"></div>
        <div className="star star-3"></div> */}
        
        {/* Main chat/message icon */}
        {/* <div className="chat-icon"> */}
          {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V9C14 9.55228 13.5523 10 13 10H7L4 13V10H3C2.44772 10 2 9.55228 2 9V3Z"
              fill="currentColor"
            />
          </svg> */}
        {/* </div> */}
      {/* </div> */}
      
      <p className="upgrade-text">
        Upgrade to view the full conversation history and get access to more powerful features!
      </p>
      
      <button className="compare-plans-btn" onClick={() => navigate('/setting/subscription')}>
        Compare plans
      </button>
    </div>
  );
};

export default ConversationHistoryLocked;
