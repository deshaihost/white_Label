import React from 'react';
import './pullOutPanel.css';

import QuickAdd from './quickAdd';
import AdvancedSettingsIndex from '../../../inbox/inboxSection/preferences/Preferences';
import HostBuddyKnowledgeBase from '../../../properties/addProperties/dynamic_questionnaire/questionnaireFirstPage/knowledgeBase/hbKnowledgeBase';
import QuestionnairePage from '../../../properties/addProperties/dynamic_questionnaire/complete_questionnaire';

const PullOutPanel = ({ onClose, content, className, propertyName, apiPropertyData, setApiPropertyData, getPropertyDataFromAPI }) => {
  const handleClose = () => {
    onClose();
  };

  const renderContent = () => {
    switch (content) {
      case 'quickAdd':
        return <QuickAdd propertyName={propertyName}/>;
      case 'editProperty':
        return <QuestionnairePage property_name={propertyName} startAtPage={1}/>; // start at page 1 (as opposed to 0): exclude the questionnaire first page
      case 'manageSources':
        return <HostBuddyKnowledgeBase property_name={propertyName} apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI} />;
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
