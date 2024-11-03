import React from 'react';
import './pullOutPanel.css';

import QuickAdd from './quickAdd';
import AdvancedSettingsIndex from '../../../inbox/inboxSection/preferences/Preferences';

const PullOutPanel = ({ onClose, content, className }) => {
  const handleClose = () => {
    onClose();
  };

  const renderContent = () => {
    switch (content) {
      case 'quickAdd':
        return <QuickAdd />;
      case 'editProperty':
        return <div>Edit Property Profile</div>;
      case 'manageSources':
        return <div>Manage Knowledge Base Sources</div>;
      case 'conversationPreferences':
        return <AdvancedSettingsIndex />; // TODO: get a list of user properties and pass here as allPropertyNamesList prop
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`panel-overlay ${className}`} onClick={handleClose} />
      <div className={`pull-out-panel ${className}`}>
        <button className='close-button' onClick={handleClose}>X</button>
        <div className='panel-content'>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default PullOutPanel;
