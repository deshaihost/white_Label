import { useState } from 'react';
import { Inbox } from "./components/Inbox";
import Dashboard from "./components/Dashboard";
import ActionItems from "./components/ActionItems";
import Properties from "./components/Properties";
import TestProperty from "./components/TestProperty";
import PropertySetup from "./components/PropertySetup";
import SmartTemplates from "./components/SmartTemplates";
import AddSmartTemplate from "./components/AddSmartTemplate";
import Preferences from "./components/Preferences";
import Upsells from "./components/Upsells";
import PostStayGapNight from "./components/PostStayGapNight";
import PreStayGapNight from "./components/PreStayGapNight";
import InquiryFollowUps from "./components/InquiryFollowUps";
import Insights from "./components/Insights";
import Account from "./components/Account";
import Contacts from "./components/Contacts";
import NotificationSettings from "./components/NotificationSettings";
import { ActionItemsSettings } from "./components/ActionItemsSettings";
import { Integrations } from "./components/Integrations";
import { Users } from "./components/Users";
import { Subscription } from "./components/Subscription";
import { GetStarted } from "./components/GetStarted";
import MasterAccount from "./components/MasterAccount";
import SideNavigation from "./components/SideNavigation";
import { SaveNotification } from "./components/SaveNotification";

interface FollowUpMessage {
  id: string;
  message: string;
  delay: number;
  conditions: string[];
}

interface Template {
  id: string;
  title: string;
  preview: string;
  enabled: boolean;
  message?: string;
  sendWhen?: string;
  sendIfConditions?: string[];
  aiCuratedChecking?: boolean;
  aiPersonalization?: boolean;
  followUps?: FollowUpMessage[];
  selectedProperties?: string[];
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [testPropertyData, setTestPropertyData] = useState<{ name: string; image?: string } | null>(null);
  const [setupPropertyData, setSetupPropertyData] = useState<{ name: string; image?: string; pmsLinked?: boolean; pmsName?: string } | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      title: 'Property Ready message',
      preview: 'Hi [[guest_name]], the property is ready for you to check in! If you plan on checking in before 3PM, let us know and we\'ll send over a tem...',
      enabled: true,
      message: 'Hi [[guest_name]], the property is ready for you to check in! If you plan on checking in before 3PM, let us know and we\'ll send over a temporary code.',
      sendWhen: 'During reservation',
      sendIfConditions: [],
      aiCuratedChecking: false,
      aiPersonalization: false,
      followUps: [],
      selectedProperties: []
    },
    {
      id: '2',
      title: 'Post-check-in welcome message',
      preview: 'Hi [[guest_name]], I hope you\'re finding everything well! If you need anything, don\'t hesitate to ask. Enjoy your stay!',
      enabled: false,
      message: 'Hi [[guest_name]], I hope you\'re finding everything well! If you need anything, don\'t hesitate to ask. Enjoy your stay!',
      sendWhen: 'During reservation',
      sendIfConditions: [],
      aiCuratedChecking: false,
      aiPersonalization: false,
      followUps: [],
      selectedProperties: []
    }
  ]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleTestProperty = (propertyName: string, propertyImage?: string) => {
    setTestPropertyData({ name: propertyName, image: propertyImage });
    setCurrentPage('testproperty');
  };

  const handlePropertySetup = (propertyName: string, propertyImage?: string, pmsLinked?: boolean, pmsName?: string) => {
    setSetupPropertyData({ name: propertyName, image: propertyImage, pmsLinked, pmsName });
    setCurrentPage('propertysetup');
  };

  const handleBackFromTest = () => {
    setCurrentPage('properties');
    setTestPropertyData(null);
  };

  const handleBackFromSetup = () => {
    setCurrentPage('properties');
    setSetupPropertyData(null);
  };

  const handleAddSmartTemplate = () => {
    setEditingTemplate(null);
    setCurrentPage('addsmarttemplate');
  };

  const handleEditTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setEditingTemplate(template);
      setCurrentPage('addsmarttemplate');
    }
  };

  const handleBackFromAddTemplate = () => {
    setEditingTemplate(null);
    setCurrentPage('smarttemplates');
  };

  const handleNavigateToUpsell = (upsellType: string) => {
    setCurrentPage(upsellType);
  };

  const handleBackFromUpsell = () => {
    setCurrentPage('upsells');
  };

  const handleSaveTemplate = (templateData: Partial<Template>) => {
    if (editingTemplate) {
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t.id === editingTemplate.id 
          ? { 
              ...t, 
              ...templateData,
              preview: templateData.message 
                ? templateData.message.substring(0, 100) + (templateData.message.length > 100 ? '...' : '')
                : t.preview
            }
          : t
      ));
    } else {
      // Create new template
      const newTemplate: Template = {
        id: Date.now().toString(),
        title: templateData.title || '',
        preview: templateData.message 
          ? templateData.message.substring(0, 100) + (templateData.message.length > 100 ? '...' : '')
          : '',
        enabled: false,
        message: templateData.message || '',
        sendWhen: templateData.sendWhen || '',
        sendIfConditions: templateData.sendIfConditions || [],
        aiCuratedChecking: templateData.aiCuratedChecking || false,
        aiPersonalization: templateData.aiPersonalization || false,
        followUps: templateData.followUps || [],
        selectedProperties: templateData.selectedProperties || []
      };
      setTemplates(prev => [...prev, newTemplate]);
    }
    setEditingTemplate(null);
    setCurrentPage('smarttemplates');
  };

  const handleUpdateTemplates = (updatedTemplates: Template[]) => {
    setTemplates(updatedTemplates);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    setEditingTemplate(null);
    setCurrentPage('smarttemplates');
  };

  const handleSelectPilotAccount = () => {
    setCurrentPage('dashboard');
  };

  return (
    <div className="bg-[#0F1117] min-h-screen">
      <SaveNotification />
      {currentPage === 'masteraccount' ? (
        <MasterAccount onSelectPilotAccount={handleSelectPilotAccount} />
      ) : (
        <>
          <SideNavigation currentPage={currentPage} onNavigate={handleNavigate} />
          <div className="ml-[200px] h-screen">
        {currentPage === 'getstarted' && <GetStarted />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
        {currentPage === 'inbox' && <Inbox />}
        {currentPage === 'actionitems' && <ActionItems />}
        {currentPage === 'properties' && <Properties onTestProperty={handleTestProperty} onPropertySetup={handlePropertySetup} onNavigate={handleNavigate} />}
        {currentPage === 'smarttemplates' && <SmartTemplates templates={templates} onUpdateTemplates={handleUpdateTemplates} onAddTemplate={handleAddSmartTemplate} onEditTemplate={handleEditTemplate} />}
        {currentPage === 'addsmarttemplate' && <AddSmartTemplate onBack={handleBackFromAddTemplate} onSave={handleSaveTemplate} onDelete={handleDeleteTemplate} editingTemplate={editingTemplate} />}
        {currentPage === 'testproperty' && testPropertyData && (
          <TestProperty 
            propertyName={testPropertyData.name} 
            propertyImage={testPropertyData.image}
            onBack={handleBackFromTest}
          />
        )}
        {currentPage === 'propertysetup' && setupPropertyData && (
          <PropertySetup 
            propertyName={setupPropertyData.name} 
            propertyImage={setupPropertyData.image}
            pmsLinked={setupPropertyData.pmsLinked}
            pmsName={setupPropertyData.pmsName}
            onBack={handleBackFromSetup}
          />
        )}
        {currentPage === 'preferences' && <Preferences />}
        {currentPage === 'upsells' && <Upsells onNavigateToUpsell={handleNavigateToUpsell} />}
        {currentPage === 'post-stay-gap' && <PostStayGapNight onBack={handleBackFromUpsell} />}
        {currentPage === 'pre-stay-gap' && <PreStayGapNight onBack={handleBackFromUpsell} />}
        {currentPage === 'inquiry-followups' && <InquiryFollowUps onBack={handleBackFromUpsell} />}
        {currentPage === 'insights' && <Insights />}
        {currentPage === 'account' && <Account />}
        {currentPage === 'contacts' && <Contacts />}
        {currentPage === 'notifications' && <NotificationSettings />}
        {currentPage === 'actionitems-settings' && <ActionItemsSettings />}
        {currentPage === 'integrations' && <Integrations />}
        {currentPage === 'users' && <Users />}
        {currentPage === 'subscription' && <Subscription />}
          </div>
        </>
      )}
    </div>
  );
}
