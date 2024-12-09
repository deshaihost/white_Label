import React, { useState } from 'react';
import './pullOutPanel.css';

import QuickAdd from './quickAdd';
import AdvancedSettingsIndex from '../../../inbox/inboxSection/preferences/Preferences';
import HostBuddyKnowledgeBase from '../../../properties/addProperties/dynamic_questionnaire/questionnaireFirstPage/knowledgeBase/hbKnowledgeBase';
import QuestionnairePage from '../../../properties/addProperties/dynamic_questionnaire/complete_questionnaire';

const PullOutPanel = ({ onClose, content, className, propertyName, apiPropertyData, setApiPropertyData, getPropertyDataFromAPI, allPropertyNamesList, setPanelContent }) => {
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleClose = () => {
    if (hasUnsavedChanges) {
      if (!window.confirm('You have unsaved changes. Are you sure you want to close without saving?')) {
        return;
      }
    }
    setHasUnsavedChanges(false);
    onClose();
  };

  const renderContent = () => {
    switch (content) {
      case 'quickAdd':
        return <QuickAdd propertyName={propertyName} setPanelContent={setPanelContent} setHasUnsavedChanges={setHasUnsavedChanges} />;
      case 'editProperty':
        return <QuestionnairePage property_name={propertyName} startAtPage={1}/>; // Questionnaire starts at page 1 (don't show the questionnaire first page)
      case 'viewPrevious':
        return <QuestionnairePage property_name={propertyName} startAtPage={1} jumpToSection={'SOPs'} scrollToBottom={true}/>; // Questionnaire starts at page 1 - user jumps to start viewing the Extras section, where any previous quick-add notes are
      case 'manageSources':
        return <HostBuddyKnowledgeBase property_name={propertyName} apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI} forceShowDataAdded={true}/>;
      case 'conversationPreferences':
        return <AdvancedSettingsIndex allPropertyNamesList={allPropertyNamesList}/>;
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
