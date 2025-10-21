import { useState } from 'react';
import UpsellConfigurationDropdown from './UpsellConfigurationDropdown';
import NewUpsellConfigModal from './NewUpsellConfigModal';
import { showSaveSuccess } from './useSaveNotification';

interface UpsellConfiguration {
  id: string;
  name: string;
  isDefault: boolean;
  properties: string[];
}

interface InquiryFollowUpsProps {
  onBack: () => void;
}

export default function InquiryFollowUps({ onBack }: InquiryFollowUpsProps) {
  const [enabled, setEnabled] = useState(false);
  const [enableAI, setEnableAI] = useState(true);
  const [showAICustomization, setShowAICustomization] = useState(false);
  const [aiInstructions, setAiInstructions] = useState('');
  const [timingValue, setTimingValue] = useState(24);
  const [timingUnit, setTimingUnit] = useState('hours');
  const [message, setMessage] = useState("Hi {{guest_name}}, just following up on your inquiry. We have {{number_of_nights_available}} night(s) available with a {{discount_percentage}} discount. Please let us know if you have any questions!");

  const [configurations, setConfigurations] = useState<UpsellConfiguration[]>([
    { id: 'default', name: 'Default', isDefault: true, properties: [] }
  ]);
  const [selectedConfigId, setSelectedConfigId] = useState('default');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const handleNewConfig = (name: string, properties: string[]) => {
    const newConfig: UpsellConfiguration = {
      id: `config-${Date.now()}`,
      name,
      isDefault: false,
      properties
    };
    setConfigurations(prev => [...prev, newConfig]);
    setSelectedConfigId(newConfig.id);
    showSaveSuccess('Configuration created successfully');
  };

  const insertVariable = (variable: string) => {
    const textarea = document.getElementById('message-textarea') as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = message;
      const before = text.substring(0, start);
      const after = text.substring(end);
      setMessage(before + variable + after);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  };

  const handleSave = () => {
    showSaveSuccess('Inquiry follow-up settings saved successfully');
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1200px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex-1">
            <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              Inquiry Follow-Ups
            </h1>
            <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed max-w-[900px]" style={{ fontVariationSettings: "'opsz' 14" }}>
              HostBuddy can follow up with guests who inquired about your property but didn't immediately book available. You can choose the time to send a follow up message to guests who haven't yet booked and are responding.
            </p>
          </div>
          <div className="flex items-center gap-3 ml-8">
            <UpsellConfigurationDropdown
              configurations={configurations}
              selectedConfigId={selectedConfigId}
              onSelectConfig={setSelectedConfigId}
              onNewConfig={() => setShowConfigModal(true)}
            />
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-[#3e88f7] hover:bg-[#5296f8] border border-[#3e88f7] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] transition-all shadow-lg"
              style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 20px rgba(62, 136, 247, 0.3)' }}
            >
              Save Upsell
            </button>
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-[#0F1117] border border-[#013280] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#17191f] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Back
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#013280] mb-10"></div>

        {/* Enable Toggle */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Enable Auto Follow-Ups
            </h3>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#3e88f7]' : 'bg-[#013280]'} shrink-0`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <p className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${enabled ? 'text-[#4ade80]' : 'text-[#ef4444]'}`} style={{ fontVariationSettings: "'opsz' 14" }}>
            You currently have inquiry follow-ups {enabled ? 'enabled' : 'not enabled'}.
          </p>
        </div>

        {/* Timing */}
        <div className="mb-10">
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Follow-Up Timing
          </h3>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            When should HostBuddy send the follow-up message?
          </p>
          
          <div className="flex items-center gap-4">
            <div className="w-[140px]">
              <input
                type="number"
                min="1"
                max="999"
                value={timingValue}
                onChange={(e) => setTimingValue(Number(e.target.value))}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
            <div className="w-[180px]">
              <select
                value={timingUnit}
                onChange={(e) => setTimingUnit(e.target.value)}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] cursor-pointer"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <option value="hours">hours</option>
                <option value="days">days</option>
              </select>
            </div>
            <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              after last message from guest
            </span>
          </div>
        </div>

        {/* Follow-Up Message */}
        <div className="mb-10">
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Follow-Up Message
          </h3>
          
          {/* Variables */}
          <div className="mb-4">
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Variables
            </p>
            <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Click to insert a variable in your guest message. These variables will autofill with info relevant to the specific guest, reservation, etc.
            </p>
            <div className="flex flex-wrap gap-2">
              {['{{guest_name}}', '{{discount_percentage}}', '{{number_of_nights_available}}'].map((variable) => (
                <button
                  key={variable}
                  onClick={() => insertVariable(variable)}
                  className="px-4 py-2 bg-[#0F1117] border border-[#013280] rounded-lg text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif] hover:bg-[#01255e] hover:border-[#3e88f7] transition-all"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  {variable}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div className="mb-4">
            <label className="block text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              Message
            </label>
            <textarea
              id="message-textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#01255e] border-2 border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] min-h-[120px] focus:outline-none focus:border-[#3e88f7] resize-y"
              style={{ fontVariationSettings: "'opsz' 14" }}
            />
          </div>

          {/* Enable AI Personalization */}
          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => setEnableAI(!enableAI)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${enableAI ? 'bg-[#3e88f7]' : 'bg-[#013280]'} shrink-0 mt-0.5`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${enableAI ? 'translate-x-5' : ''}`} />
                </button>
                <div className="flex-1">
                  <p className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Enable AI Personalization
                  </p>
                  <p className={`text-[12px] font-['DM_Sans:Regular',_sans-serif] ${enableAI ? 'text-[#4ade80]' : 'text-[#a6a9b2]'}`} style={{ fontVariationSettings: "'opsz' 14" }}>
                    You currently have AI personalization {enableAI ? 'enabled' : 'disabled'}.
                  </p>
                  <p className="text-[#a6a9b2] text-[12px] font-['DM_Sans:Regular',_sans-serif] mt-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                    If this is enabled, HostBuddy may adjust the wording of each message slightly to make it sound more natural and personalized given the context of the conversation.
                  </p>
                </div>
              </div>
              {enableAI && (
                <button
                  onClick={() => setShowAICustomization(!showAICustomization)}
                  className="px-4 py-2 bg-[#0F1117] border border-[#013280] rounded-lg text-[#98bffa] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#01255e] hover:border-[#3e88f7] transition-all ml-4"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Customize
                </button>
              )}
            </div>
            
            {enableAI && showAICustomization && (
              <div className="mt-4">
                <label className="block text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                  (Optional) Add custom instructions to guide the AI personalization
                </label>
                <textarea
                  value={aiInstructions}
                  onChange={(e) => setAiInstructions(e.target.value)}
                  placeholder="Type instructions to guide the AI..."
                  className="w-full bg-[#01255e] border-2 border-[#013280] rounded-lg px-4 py-3 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] min-h-[120px] focus:outline-none focus:border-[#3e88f7] resize-y placeholder:text-[#8A8E98]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Save Settings Button */}
        <div className="mb-10">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-[#3e88f7] rounded-lg text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#74A9F7] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Save Settings
          </button>
        </div>

        {/* Upcoming Messages */}
        <div>
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Upcoming Messages
          </h3>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Preview Scheduled
          </p>
          {!enabled ? (
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
              Inquiry follow-ups are currently off. Enable them to see upcoming messages.
            </p>
          ) : (
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
              You currently have zero upcoming inquiry follow up messages. These messages will all show up here.
            </p>
          )}

          <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0F1117] border-b border-[#013280]">
                  <th className="px-6 py-3 text-left text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Sending on
                  </th>
                  <th className="px-6 py-3 text-left text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Property
                  </th>
                  <th className="px-6 py-3 text-left text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Vacant Night
                  </th>
                  <th className="px-6 py-3 text-left text-[#a6a9b2] text-[12px] font-['DM_Sans:SemiBold',_sans-serif] uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {!enabled ? 'Inquiry follow-ups are off' : 'No upcoming messages'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <NewUpsellConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSave={handleNewConfig}
      />
    </div>
  );
}
