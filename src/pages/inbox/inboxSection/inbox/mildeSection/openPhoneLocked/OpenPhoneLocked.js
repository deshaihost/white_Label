import React from 'react';
import './OpenPhoneLocked.css';
import IntegrationsIconSvg from './icons/Integrations Icon.svg';

const OpenPhoneLocked = ({ onComparePlans }) => {
  return (
    <div className="openphone-locked">
      <div className="openphone-locked-content">
        {/* <div className="integrations-icon">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="integration-symbol">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M8 14.5C11.5898 14.5 14.5 11.5898 14.5 8C14.5 4.41015 11.5898 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5898 4.41015 14.5 8 14.5Z" 
                fill="#F7CFD8" 
                stroke="#F7CFD8" 
                strokeWidth="1"
              />
              <path 
                d="M5.5 6.5L7.5 8.5L10.5 5.5" 
                stroke="#5F3841" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div> */}
        
        <div className="integrations-icon">
          <img src={IntegrationsIconSvg} alt="Integrations Icon" />
        </div>
        
        <h3 className="locked-title">
        Upgrade to add OpenPhone communication for 
        your guests!
        </h3>
        
        <button 
          className="compare-plans-btn"
          onClick={onComparePlans}
        >
          Compare plans
        </button>
      </div>
    </div>
  );
};

export default OpenPhoneLocked;
