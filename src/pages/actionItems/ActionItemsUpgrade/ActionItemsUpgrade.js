import React from 'react';
import './ActionItemsUpgrade.css';
import ConversationLockedIcon from './icons/Conversation_locked_action_items.svg';

const ActionItemsUpgrade = () => {
  return (
    <div className="action-items-upgrade">
      <div className="upgrade-overlay">
        <div className="upgrade-content">
          <img src={ConversationLockedIcon} alt="Conversation Locked Action Items" className="conversation-icon" />
          
          {/* <div className="star-badge">
            <div className="star star-1"></div>
            <div className="star star-2"></div>
            <div className="star star-3"></div>
            <div className="star-icon">
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 0L9.79611 5.52786H15.6085L10.9062 8.94427L12.7023 14.4721L8 11.0557L3.29772 14.4721L5.09383 8.94427L0.391548 5.52786H6.20389L8 0Z" fill="#E4D5B0"/>
              </svg>
            </div>
          </div> */}
          
          <p className="upgrade-message">
            Your current plan displays action items from past 3 days. Upgrade plan to view all of the action items.
          </p>
          
          <button className="compare-plans-btn">
            Compare plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionItemsUpgrade;
