import React from 'react';
import './accountNotifBanner.css';

// Theme: 'default', 'warning', 'error'
const AccountNotifBanner = ({title, message, theme='default', iconColor}) => {
  return (
    <div className={`notification-banner ${theme}`}>
      <div className="banner-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color:iconColor }}>
          <path stroke="currentColor" strokeWidth="2" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="16" r="1" fill="currentColor"/>
        </svg>
      </div>
      <div className="banner-content">
        {title && <h4 className="banner-title">{title}</h4>}
        <div className="banner-message">{message}</div>
      </div>
    </div>
  );
};

export default AccountNotifBanner;
