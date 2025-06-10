import React, { useState, useEffect } from 'react';
import './pullOutPanel.css';

import QuickAdd from './quickAdd';
import AdvancedSettingsIndex from '../../../inbox/inboxSection/preferences/Preferences';
import HostBuddyKnowledgeBase from '../../../properties/addProperties/dynamic_questionnaire/questionnaireFirstPage/knowledgeBase/hbKnowledgeBase';
import QuestionnairePage from '../../../properties/addProperties/dynamic_questionnaire/complete_questionnaire';

const PullOutPanel = ({ onClose, content, className, propertyName, apiPropertyData, setApiPropertyData, getPropertyDataFromAPI, allPropertyNamesList, setPanelContent }) => {  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [sidebarState, setSidebarState] = useState({ open: true, width: 240 });
  // Listen to sidebar state changes
  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setSidebarState({
        open: event.detail.open,
        width: event.detail.width
      });
    };

    const handleWindowResize = () => {
      // Force re-render when window is resized to recalculate panel width
      if (content === 'conversationPreferences') {
        setSidebarState(prevState => ({ ...prevState }));
      }
    };

    // Listen for sidebar state changes
    document.addEventListener('sidebarStateChanged', handleSidebarStateChange);
    window.addEventListener('resize', handleWindowResize);

    // Get initial sidebar state if available
    if (window.getSidebarState) {
      const initialState = window.getSidebarState();
      setSidebarState(initialState);
    }

    return () => {
      document.removeEventListener('sidebarStateChanged', handleSidebarStateChange);
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [content]);

  // Calculate panel width based on sidebar state for conversationPreferences
  const getPanelWidth = () => {
    if (content === 'conversationPreferences') {
      // Adjust width based on sidebar state
      // When sidebar is expanded (240px), leave more space for panel
      // When sidebar is collapsed (64px), panel can be wider
      const viewportWidth = window.innerWidth;
      const sidebarWidth = sidebarState.width;
      const availableWidth = viewportWidth - sidebarWidth - 40; // 40px margin
      
      // Set minimum and maximum widths
      const minWidth = 600;
      const maxWidth = 1000;
      
      return Math.min(Math.max(availableWidth, minWidth), maxWidth);
    }
    return 860; // Default width for other content types
  };

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
  };  return (
    <>
      <div className={`panel-overlay ${className}`} onClick={handleClose} />
      <div 
        className={`pull-out-panel ${className}`}
        style={{
          width: content === 'conversationPreferences' ? `${getPanelWidth()}px` : undefined,
          minWidth: content === 'conversationPreferences' ? `${getPanelWidth()}px` : undefined
        }}
      >        <button 
          className="close-button" 
          onClick={handleClose}
        >
          X
        </button>
        <div className='panel-content'>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default PullOutPanel;
