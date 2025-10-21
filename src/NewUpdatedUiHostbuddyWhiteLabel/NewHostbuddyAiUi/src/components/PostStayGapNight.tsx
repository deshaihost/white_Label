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

interface PostStayGapNightProps {
  onBack: () => void;
}

export default function PostStayGapNight({ onBack }: PostStayGapNightProps) {
  const [enabled, setEnabled] = useState(false);
  const [minNights, setMinNights] = useState(1);
  const [maxNights, setMaxNights] = useState(3);
  const [discountAmount, setDiscountAmount] = useState(15);
  const [enableAI, setEnableAI] = useState(true);
  const [showAICustomization, setShowAICustomization] = useState(false);
  const [aiInstructions, setAiInstructions] = useState('');
  const [daysBeforeCheckout, setDaysBeforeCheckout] = useState(1);
  const [sendTime, setSendTime] = useState('12:00 PM');
  const [message, setMessage] = useState("Hi {{guest_name}}, we'd love to extend your stay! We have {{number_of_nights_available}} night(s) available right after your reservation. If you're interested, we can offer you a discount of {{discount_percentage}} on the gap night. Let us know if you'd like to take advantage of this offer!");

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

  const upcomingMessages = [
    { sendingOn: 'Oct 15, 2025', property: 'Luxury Downtown Loft', guest: 'Sarah Johnson', sent: '-', action: 'No upcoming messages' }
  ];

  const handleSave = () => {
    showSaveSuccess('Post-stay gap night settings saved successfully');
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1200px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div className="flex-1">
            <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              Post Stay Gap Night
            </h1>
            <p className="text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed max-w-[900px]" style={{ fontVariationSettings: "'opsz' 14" }}>
              HostBuddy will detect when there's a vacant night between two reservations. You'll send a message to the first guest with a gap night upsell offer, customizable by you, with AI personalization if you enable it. If they're interested, HostBuddy will automatically acknowledge and prompt you to manually extend their stay.
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
              Enable Post Stay Upsells
            </h3>
            <button
              onClick={() => setEnabled(!enabled)}
              className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? 'bg-[#3e88f7]' : 'bg-[#013280]'} shrink-0`}
            >
              <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${enabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>
          <p className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${enabled ? 'text-[#4ade80]' : 'text-[#ef4444]'}`} style={{ fontVariationSettings: "'opsz' 14" }}>
            You currently have post-stay upsells {enabled ? 'enabled' : 'not enabled'}.
          </p>
        </div>

        {/* Number of Nights to Consider */}
        <div className="mb-10">
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Number of Nights to Consider
          </h3>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            HostBuddy will send a message each time there is a number of consecutive vacant nights between these values. Remove the maximum to allow HostBuddy to send messages to guests touching any open availability.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Min
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={minNights}
                onChange={(e) => setMinNights(Number(e.target.value))}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
            
            <div>
              <label className="block text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                Max
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={maxNights}
                onChange={(e) => setMaxNights(Number(e.target.value))}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
          </div>
        </div>

        {/* Upsell Timing */}
        <div className="mb-10">
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Upsell Timing
          </h3>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            When should HostBuddy send the upsell message?
          </p>
          
          <div className="flex items-center gap-4">
            <div className="w-[140px]">
              <input
                type="number"
                min="0"
                max="30"
                value={daysBeforeCheckout}
                onChange={(e) => setDaysBeforeCheckout(Number(e.target.value))}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
            <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              days before guest check-out, at
            </span>
            <div className="w-[140px]">
              <input
                type="time"
                value={sendTime.toLowerCase().includes('pm') ? 
                  (parseInt(sendTime.split(':')[0]) === 12 ? '12' : String(parseInt(sendTime.split(':')[0]) + 12)) + ':' + sendTime.split(':')[1].split(' ')[0] 
                  : sendTime.split(' ')[0]}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':');
                  const hour = parseInt(hours);
                  const period = hour >= 12 ? 'PM' : 'AM';
                  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                  setSendTime(`${displayHour}:${minutes} ${period}`);
                }}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
          </div>
        </div>

        {/* Discount Amount */}
        <div className="mb-10">
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Discount Amount
          </h3>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            The discount you'll offer to your guests (percentage)
          </p>
          
          <div className="max-w-[200px]">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2.5 pr-10 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                %
              </span>
            </div>
          </div>
        </div>

        {/* Upsell Message */}
        <div className="mb-10">
          <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Upsell Message
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
            Save Upsell
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
              Post-stay upsells are currently off. Enable them to see upcoming messages.
            </p>
          ) : (
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
              You currently have zero upcoming upsell messages. These messages will all show up here.
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
                    {!enabled ? 'Post-stay upsells are off' : 'No upcoming messages'}
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
