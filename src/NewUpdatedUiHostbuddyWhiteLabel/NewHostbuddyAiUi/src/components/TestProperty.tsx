import { useState } from 'react';
import { Send, Home, ArrowLeft, Edit2, BookOpen, Settings, X, RotateCcw } from 'lucide-react';
import faviconImage from 'figma:asset/8c57f694868279ca7b9c2fd95c7970c4ad789baf.png';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import ReservationPhaseSelector from './ReservationPhaseSelector';
import PropertySetup from './PropertySetup';
import Preferences from './Preferences';
import { showSaveSuccess } from './useSaveNotification';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
}

interface TestPropertyProps {
  propertyName: string;
  propertyImage?: string;
  onBack: () => void;
}

export default function TestProperty({ propertyName, propertyImage, onBack }: TestPropertyProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hello! How can I help you today?', sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [reservationStage, setReservationStage] = useState<'current' | 'future' | 'inquiry' | 'past'>('current');
  const [showKnowledgeBase, setShowKnowledgeBase] = useState(false);
  const [showManageKnowledgeBase, setShowManageKnowledgeBase] = useState(false);
  const [showReservationPhases, setShowReservationPhases] = useState(false);
  const [editingSource, setEditingSource] = useState<string | null>(null);
  const [kbLabel, setKbLabel] = useState('');
  const [kbContent, setKbContent] = useState('');
  const [quickAddModalOpen, setQuickAddModalOpen] = useState(false);
  const [manageKbModalOpen, setManageKbModalOpen] = useState(false);
  const [showCopyKBModal, setShowCopyKBModal] = useState(false);
  const [selectedCopyKBItem, setSelectedCopyKBItem] = useState<{ key: string; name: string } | null>(null);
  const [selectedKBModalProperties, setSelectedKBModalProperties] = useState<Set<string>>(new Set());
  const [showPropertySetup, setShowPropertySetup] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  // Knowledge base sources state
  const [kbSources, setKbSources] = useState({
    pmsPropertyDetails: true,
    pmsAvailability: true,
    pmsGuestData: true,
    pmsPastConversations: false,
    docBellevue: true,
    docUnit10: true,
    docNotion: true,
    propertyProfile: true
  });

  // Reservation phases for each source
  const [reservationPhases, setReservationPhases] = useState<{[key: string]: {current: boolean, future: boolean, inquiry: boolean, past: boolean}}>({
    pmsPropertyDetails: { current: true, future: true, inquiryPast: true },
    pmsAvailability: { current: true, future: true, inquiryPast: true },
    pmsGuestData: { current: true, future: true, inquiryPast: true },
    pmsPastConversations: { current: true, future: true, inquiryPast: false },
    docBellevue: { current: true, future: true, inquiryPast: true },
    docUnit10: { current: true, future: true, inquiryPast: true },
    docNotion: { current: true, future: true, inquiryPast: true },
  });
  
  const availableProperties = [
    '1811 Adams - 10',
    'Mountain View Lodge',
    'Sunset Beach House',
    'Lakeside Retreat'
  ];
  
  // Helper function to check if reservation phases have been modified
  const hasPhaseModification = (sourceKey: string) => {
    const phases = reservationPhases[sourceKey];
    if (!phases) return false;
    return !(phases.current && phases.future && phases.inquiryPast);
  };

  const handleEditSource = (sourceName: string) => {
    setEditingSource(sourceName);
    setShowReservationPhases(true);
  };

  const togglePhase = (phase: 'current' | 'future' | 'inquiryPast') => {
    if (!editingSource) return;
    setReservationPhases(prev => ({
      ...prev,
      [editingSource]: {
        ...prev[editingSource],
        [phase]: !prev[editingSource]?.[phase]
      }
    }));
  };
  
  // Copy KB item handlers
  const handleOpenCopyKBModal = (sourceKey: string, sourceName: string) => {
    setSelectedCopyKBItem({ key: sourceKey, name: sourceName });
    setSelectedKBModalProperties(new Set());
    setShowCopyKBModal(true);
  };
  
  const toggleKBModalProperty = (property: string) => {
    setSelectedKBModalProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(property)) {
        newSet.delete(property);
      } else {
        newSet.add(property);
      }
      return newSet;
    });
  };
  
  const handleCopyToAllKBProperties = () => {
    if (selectedKBModalProperties.size === availableProperties.length) {
      setSelectedKBModalProperties(new Set());
    } else {
      setSelectedKBModalProperties(new Set(availableProperties));
    }
  };
  
  const handleCopyKBToProperties = () => {
    if (selectedCopyKBItem) {
      console.log('Copying KB item:', selectedCopyKBItem.name, 'to:', Array.from(selectedKBModalProperties));
      setShowCopyKBModal(false);
      setSelectedCopyKBItem(null);
      setSelectedKBModalProperties(new Set());
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Thank you for your message! I\'m here to help with any questions you have.',
        sender: 'ai'
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([{ id: '1', text: 'Hello! How can I help you today?', sender: 'ai' }]);
    setInputValue('');
  };

  const handleAddToKnowledgeBase = (type: 'single' | 'multiple') => {
    console.log(`Adding to ${type} properties:`, { label: kbLabel, content: kbContent });
    setShowKnowledgeBase(false);
    setKbLabel('');
    setKbContent('');
  };

  return (
    <div className="h-full flex relative bg-[#0F1117]">
      {/* Left Panel - Chat */}
      <div className="w-[600px] bg-[#0F1117] border-r border-[#013280] flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-[#013280] flex items-center justify-between">
          <button
            onClick={handleReset}
            className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-all flex items-center gap-2 shadow-lg"
            style={{ 
              fontVariationSettings: "'opsz' 14",
              boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
            }}
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
          <div>
            <p className="text-[#a6a9b2] text-[11px] font-['DM_Sans:Medium',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
              Reservation Stage
            </p>
            <select
              value={reservationStage}
              onChange={(e) => setReservationStage(e.target.value as any)}
              className="bg-[#17191f] border border-[#013280] text-[#3e88f7] px-3 py-1.5 rounded text-[13px] font-['DM_Sans:SemiBold',_sans-serif] cursor-pointer"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              <option value="current">Current</option>
              <option value="future">Future</option>
              <option value="inquiry">Inquiry</option>
              <option value="past">Past</option>
            </select>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-2 flex-shrink-0 shadow-lg p-1"
                  style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.25)' }}
                >
                  <img src={faviconImage} alt="HostBuddy AI" className="w-full h-full object-contain" />
                </div>
              )}
              <div
                className={`max-w-[70%] px-4 py-2.5 rounded-lg ${
                  message.sender === 'ai'
                    ? 'bg-[#17191f] border border-[#013280] text-white'
                    : 'bg-[#3e88f7] text-white shadow-lg'
                }`}
                style={message.sender === 'user' ? { boxShadow: '0 0 8px rgba(62, 136, 247, 0.15)' } : {}}
              >
                <p className="text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-[#013280]">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-[#17191f] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] focus:shadow-lg transition-all"
              style={{ 
                fontVariationSettings: "'opsz' 14",
              }}
            />
            <button
              onClick={handleSend}
              className="bg-[#3e88f7] hover:bg-[#5296f8] text-white p-3 rounded-lg transition-all shadow-lg"
              style={{ boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)' }}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Analysis & Actions */}
      <div className="flex-1 bg-[#0F1117] flex flex-col overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#013280]">
          <div className="flex items-center gap-4 mb-3">
            {propertyImage && (
              <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[#013280] shadow-lg"
                style={{ boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
              >
                <ImageWithFallback
                  src={propertyImage}
                  alt={propertyName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                {propertyName}
              </h2>
              <button
                onClick={onBack}
                className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-1"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Properties
              </button>
            </div>
          </div>
        </div>

        {/* Conversation Analysis */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-lg p-1"
              style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.25)' }}
            >
              <img src={faviconImage} alt="HostBuddy AI" className="w-full h-full object-contain" />
            </div>
            <h3 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Conversation Analysis
            </h3>
          </div>

          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-4 mb-8 shadow-lg relative overflow-hidden min-h-[120px]"
            style={{ boxShadow: '0 0 15px rgba(62, 136, 247, 0.08)' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#3e88f7]/5 to-transparent pointer-events-none" />
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] italic relative z-10" style={{ fontVariationSettings: "'opsz' 14" }}>
              Send HostBuddy a message to get started!
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 relative z-10">
            <h3 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              Actions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowKnowledgeBase(true)}
                className="bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-white px-4 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl group"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 8px rgba(62, 136, 247, 0.05)'
                }}
              >
                <Edit2 className="w-4 h-4 group-hover:text-[#3e88f7] transition-colors" />
                Quick Add To Knowledge Base
              </button>
              <button 
                onClick={() => setShowPropertySetup(true)}
                className="bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-white px-4 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl group"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 8px rgba(62, 136, 247, 0.05)'
                }}
              >
                <Home className="w-4 h-4 group-hover:text-[#3e88f7] transition-colors" />
                Edit Property Profile
              </button>
              <button 
                onClick={() => setShowManageKnowledgeBase(true)}
                className="bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-white px-4 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl group"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 8px rgba(62, 136, 247, 0.05)'
                }}
              >
                <BookOpen className="w-4 h-4 group-hover:text-[#3e88f7] transition-colors" />
                Manage Knowledge Base Sources
              </button>
              <button 
                onClick={() => setShowPreferences(true)}
                className="bg-[#0F1117] border-2 border-[#013280] hover:border-[#3e88f7] text-white px-4 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl group"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 8px rgba(62, 136, 247, 0.05)'
                }}
              >
                <Settings className="w-4 h-4 group-hover:text-[#3e88f7] transition-colors" />
                Conversation Preferences
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Manage Knowledge Base Sources Modal */}
      {showManageKnowledgeBase && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[700px] shadow-2xl relative"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#013280] flex items-center justify-between">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                HostBuddy Knowledge Base
              </h2>
              <button
                onClick={() => setShowManageKnowledgeBase(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Choose what information HostBuddy can access directly.
                </p>
                <p className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Hostfully Connected
                </p>
              </div>

              <div className="border-b border-[#17191f] mb-6" />

              {/* PMS Integration Section */}
              <div className="mb-8">
                <h3 className="text-[#a6a9b2] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                  PMS Integration
                </h3>
                <div className="space-y-3">
                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, pmsPropertyDetails: !prev.pmsPropertyDetails }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.pmsPropertyDetails 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.pmsPropertyDetails ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.pmsPropertyDetails && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.pmsPropertyDetails ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        PMS property details
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('pmsPropertyDetails') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('pmsPropertyDetails')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.pmsPropertyDetails ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, pmsAvailability: !prev.pmsAvailability }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.pmsAvailability 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.pmsAvailability ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.pmsAvailability && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.pmsAvailability ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        Property availability and pricing
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('pmsAvailability') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('pmsAvailability')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.pmsAvailability ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, pmsGuestData: !prev.pmsGuestData }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.pmsGuestData 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.pmsGuestData ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.pmsGuestData && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.pmsGuestData ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        Guest and reservation data
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('pmsGuestData') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('pmsGuestData')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.pmsGuestData ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, pmsPastConversations: !prev.pmsPastConversations }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.pmsPastConversations 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.pmsPastConversations ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.pmsPastConversations && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.pmsPastConversations ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        Past conversations <span className="text-[#676a73]">(last 6 months)</span>
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('pmsPastConversations') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('pmsPastConversations')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.pmsPastConversations ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Documents Section */}
              <div className="mb-8">
                <h3 className="text-[#a6a9b2] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Property Documents
                </h3>
                <div className="space-y-3">
                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, docBellevue: !prev.docBellevue }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.docBellevue 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.docBellevue ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.docBellevue && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.docBellevue ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        Bellevue (HF Guidebook)
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('docBellevue') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('docBellevue')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.docBellevue ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, docUnit10: !prev.docUnit10 }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.docUnit10 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.docUnit10 ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.docUnit10 && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.docUnit10 ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        Unit 10 1811 Adams Ave–Welcome Doc–docx.pdf
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('docUnit10') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('docUnit10')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.docUnit10 ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>

                  <div className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all group">
                    <button
                      onClick={() => setKbSources(prev => ({ ...prev, docNotion: !prev.docNotion }))}
                      className="flex items-center gap-3 flex-1"
                    >
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.docNotion 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.docNotion ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.docNotion && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.docNotion ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        notion_Adams – 10 – Guest.txt
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5">
                      {hasPhaseModification('docNotion') && (
                        <div 
                          className="w-2 h-2 rounded-full bg-[#F97316]" 
                          style={{ boxShadow: '0 0 6px rgba(249, 115, 22, 0.8)' }}
                          title="Reservation phases modified"
                        />
                      )}
                      <button
                        onClick={() => handleEditSource('docNotion')}
                        className="p-1 hover:bg-[#17191f] rounded transition-colors"
                      >
                        <Edit2 className={`w-3.5 h-3.5 transition-colors ${
                          kbSources.docNotion ? 'text-[#3e88f7]' : 'text-[#676a73]'
                        } group-hover:text-[#3e88f7]`} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Property Profile Section */}
              <div className="mb-6">
                <h3 className="text-[#a6a9b2] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-4 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Property Profile
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setKbSources(prev => ({ ...prev, propertyProfile: !prev.propertyProfile }))}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                        kbSources.propertyProfile 
                          ? 'bg-[#3e88f7] shadow-lg' 
                          : 'bg-[#17191f] border border-[#013280]'
                      }`}
                        style={kbSources.propertyProfile ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                      >
                        {kbSources.propertyProfile && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                        kbSources.propertyProfile ? 'text-white' : 'text-[#676a73]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        Property Profile
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => {
                    showSaveSuccess('Knowledge base updated successfully');
                    setShowManageKnowledgeBase(false);
                  }}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-12 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reservation Phases Modal */}
      {showReservationPhases && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[500px] shadow-2xl relative"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#013280] flex items-center justify-between">
              <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Reservation Phases
              </h2>
              <button
                onClick={() => setShowReservationPhases(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <ReservationPhaseSelector
                phases={reservationPhases[editingSource || ''] || { current: true, future: true, inquiryPast: true }}
                onToggle={togglePhase}
                title="Reservation Stages"
                description="Select which reservation stages should have access to this information."
                variant="buttons"
              />
            </div>

            {/* Footer Buttons */}
            <div className="flex gap-3 justify-end px-6 pb-6 pt-6 border-t border-[#013280]">
              <button
                onClick={() => setShowReservationPhases(false)}
                className="bg-[#17191f] hover:bg-[#24262e] text-white border border-[#013280] px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Cancel
              </button>
              <button
                onClick={() => setShowReservationPhases(false)}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                style={{ 
                  fontVariationSettings: "'opsz' 14",
                  boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Copy KB Item to Properties Modal */}
      {showCopyKBModal && selectedCopyKBItem && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[500px] shadow-2xl relative"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#013280] flex items-center justify-between">
              <div>
                <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Copy to Properties
                </h2>
                <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {selectedCopyKBItem.name}
                </p>
              </div>
              <button
                onClick={() => setShowCopyKBModal(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Select Properties
                </h3>
                <button
                  onClick={handleCopyToAllKBProperties}
                  className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  {selectedKBModalProperties.size === availableProperties.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>

              <div className="space-y-3 mb-6">
                {availableProperties.map((property) => (
                  <button
                    key={property}
                    onClick={() => toggleKBModalProperty(property)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#01255e] transition-all"
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${
                      selectedKBModalProperties.has(property)
                        ? 'bg-[#3e88f7] shadow-lg'
                        : 'bg-[#17191f] border border-[#013280]'
                    }`}
                      style={selectedKBModalProperties.has(property) ? { boxShadow: '0 0 5px rgba(62, 136, 247, 0.25)' } : {}}
                    >
                      {selectedKBModalProperties.has(property) && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${
                      selectedKBModalProperties.has(property) ? 'text-white' : 'text-[#676a73]'
                    }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                      {property}
                    </span>
                  </button>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowCopyKBModal(false)}
                  className="px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all text-[#a6a9b2] hover:text-white"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCopyKBToProperties}
                  disabled={selectedKBModalProperties.size === 0}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Copy to {selectedKBModalProperties.size} {selectedKBModalProperties.size === 1 ? 'Property' : 'Properties'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Add To Knowledge Base Modal */}
      {showKnowledgeBase && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full max-w-[900px] shadow-2xl relative"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[#013280] flex items-center justify-between">
              <h2 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Quick Add To Knowledge Base
              </h2>
              <button
                onClick={() => setShowKnowledgeBase(false)}
                className="text-[#a6a9b2] hover:text-white transition-colors p-2"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
                Type or paste any information about your property that you would like HostBuddy to know.
              </p>

              <div className="space-y-5">
                {/* Label Input */}
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Label (Optional)
                  </label>
                  <input
                    type="text"
                    value={kbLabel}
                    onChange={(e) => setKbLabel(e.target.value)}
                    placeholder="Enter a label for this information..."
                    className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] transition-all"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  />
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Content for knowledge base
                  </label>
                  <textarea
                    value={kbContent}
                    onChange={(e) => setKbContent(e.target.value)}
                    placeholder="Enter anything you'd like HostBuddy to know..."
                    rows={8}
                    className="w-full bg-[#01255e] border border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] placeholder:text-[#676a73] focus:outline-none focus:border-[#3e88f7] transition-all resize-none"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-center gap-4 mt-6">
                <button
                  onClick={() => handleAddToKnowledgeBase('single')}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Add to this property
                </button>
                <button
                  onClick={() => handleAddToKnowledgeBase('multiple')}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-3 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
                  style={{ 
                    fontVariationSettings: "'opsz' 14",
                    boxShadow: '0 0 10px rgba(62, 136, 247, 0.2)'
                  }}
                >
                  Add to multiple properties...
                </button>
              </div>

              {/* View Previously Added Link */}
              <div className="text-center mt-4">
                <button className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity" style={{ fontVariationSettings: "'opsz' 14" }}>
                  View previously added
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Property Setup Modal */}
      {showPropertySetup && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full h-full max-w-[1400px] max-h-[900px] shadow-2xl relative overflow-hidden"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPropertySetup(false)}
              className="absolute top-6 right-6 z-10 text-[#a6a9b2] hover:text-white transition-colors p-2 bg-[#17191f] rounded-lg border border-[#013280]"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Property Setup Content */}
            <div className="h-full overflow-hidden">
              <PropertySetup
                propertyName={propertyName}
                propertyImage={propertyImage}
                onBack={() => setShowPropertySetup(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Conversation Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8">
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-full h-full max-w-[1000px] max-h-[900px] shadow-2xl relative overflow-hidden"
            style={{ boxShadow: '0 0 25px rgba(62, 136, 247, 0.15)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPreferences(false)}
              className="absolute top-6 right-6 z-10 text-[#a6a9b2] hover:text-white transition-colors p-2 bg-[#17191f] rounded-lg border border-[#013280]"
            >
              <X className="w-6 h-6" />
            </button>
            
            {/* Preferences Content */}
            <div className="h-full overflow-auto">
              <Preferences onSave={() => setShowPreferences(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
