import { useState } from 'react';
import ConfigurationDropdown from './ConfigurationDropdown';
import NewConfigurationModal from './NewConfigurationModal';
import ConfigureTimingModal from './ConfigureTimingModal';
import { showSaveSuccess } from './useSaveNotification';

interface Configuration {
  id: string;
  name: string;
  isDefault: boolean;
  properties: string[];
  schedule?: any;
}

interface PreferencesProps {
  onSave?: () => void;
}

export default function Preferences({ onSave }: PreferencesProps = {}) {
  const [configurations, setConfigurations] = useState<Configuration[]>([
    { id: 'default', name: 'Default', isDefault: true, properties: [] }
  ]);
  const [selectedConfigId, setSelectedConfigId] = useState('default');
  const [showNewConfigModal, setShowNewConfigModal] = useState(false);
  const [showTimingModal, setShowTimingModal] = useState(false);
  const [pendingConfigName, setPendingConfigName] = useState('');

  const [deferBehavior, setDeferBehavior] = useState('defer-to-host');
  const [directContact, setDirectContact] = useState('');
  const [useSignature, setUseSignature] = useState(false);
  const [signature, setSignature] = useState('');
  const [conversationClosing, setConversationClosing] = useState('yes');
  const [aiTransparency, setAiTransparency] = useState('only-if-asked');
  const [language, setLanguage] = useState('whichever');
  const [languageValue, setLanguageValue] = useState('');
  const [stopOnNegative, setStopOnNegative] = useState(true);
  const [minDelay, setMinDelay] = useState('3');
  const [maxDelay, setMaxDelay] = useState('4');
  const [customTone, setCustomTone] = useState('');

  const selectedConfig = configurations.find(c => c.id === selectedConfigId);
  const isDefaultConfig = selectedConfigId === 'default';

  const handleSave = () => {
    console.log('Saving preferences...');
    // TODO: Save preferences
    showSaveSuccess('Settings saved successfully');
    if (onSave) {
      onSave();
    }
  };

  const handleNewConfig = (name: string) => {
    setPendingConfigName(name);
    setShowTimingModal(true);
  };

  const handleSaveTiming = (properties: string[], schedule: any) => {
    const newConfig: Configuration = {
      id: `config-${Date.now()}`,
      name: pendingConfigName,
      isDefault: false,
      properties,
      schedule
    };
    setConfigurations(prev => [...prev, newConfig]);
    setSelectedConfigId(newConfig.id);
    setPendingConfigName('');
  };

  return (
    <div className="bg-[#0F1117]">
      <div className="max-w-[1000px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Conversation Settings
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className="bg-[#01255e] text-white px-6 py-2.5 rounded-lg text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#013a8a] transition-colors border border-[#013280]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Save Settings
            </button>
            <ConfigurationDropdown
              configurations={configurations}
              selectedConfigId={selectedConfigId}
              onSelectConfig={setSelectedConfigId}
              onNewConfig={() => setShowNewConfigModal(true)}
            />
          </div>
        </div>

        {isDefaultConfig ? (
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-10" style={{ fontVariationSettings: "'opsz' 14" }}>
            This is the Default configuration. It applies to all properties that are not included in any other configuration.
          </p>
        ) : (
          <div className="mb-10">
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
              This configuration applies to: {selectedConfig?.properties.length || 0} {selectedConfig?.properties.length === 1 ? 'property' : 'properties'}
            </p>
            <button
              onClick={() => {
                setPendingConfigName(selectedConfig?.name || '');
                setShowTimingModal(true);
              }}
              className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Configure Timing
            </button>
          </div>
        )}

        <div className="border-t border-[#013280] mb-10"></div>

        {/* Defer Behavior */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Defer Behavior
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            How should HostBuddy respond when it's not able to resolve the guest's issue?
          </p>
          <div className="space-y-3">
            {[
              { value: 'defer-to-host', label: 'Defer to host', example: 'Ex.: "...the host will assist once they\'re back online."' },
              { value: 'defer-to-team', label: 'Defer to team', example: 'Ex.: "...I\'ll have to check with the team..."' },
              { value: 'embody-host', label: 'Embody host', example: 'Ex.: "...I will check and get back to you..."' },
              { value: 'share-contact', label: 'Share direct contact', example: 'Ex.: "...please contact the host at:..."' },
              { value: 'no-respond', label: 'Do not respond', example: '' }
            ].map((option) => (
              <div key={option.value} className="flex items-center gap-3">
                <button
                  onClick={() => setDeferBehavior(option.value)}
                  className="flex items-center gap-3 flex-1"
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    deferBehavior === option.value ? 'border-[#3e88f7]' : 'border-[#676a73]'
                  }`}>
                    {deferBehavior === option.value && (
                      <div className="w-3 h-3 rounded-full bg-[#3e88f7]" style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.5)' }}></div>
                    )}
                  </div>
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {option.label}
                  </span>
                </button>
                {option.example && (
                  <span className="text-[#6b7280] text-[13px] font-['DM_Sans:Regular',_sans-serif] ml-8" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {option.example}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Direct Contact
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            If asked, HostBuddy will provide this information to guests in the event of an emergency requiring immediate attention
          </p>
          <input
            type="text"
            value={directContact}
            onChange={(e) => setDirectContact(e.target.value)}
            placeholder="ex. John Doe, (888-123-4567)"
            className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#8A8E98] focus:outline-none focus:border-[#3e88f7] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          />
        </div>

        {/* Use Signature */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Use Signature
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setUseSignature(!useSignature)}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  useSignature ? 'bg-[#3e88f7]' : 'bg-[#676a73]'
                }`}
                style={useSignature ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.4)' } : {}}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    useSignature ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
              <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Disabled
              </span>
            </div>
          </div>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            If enabled, HostBuddy will append this to the end of each of its messages.
          </p>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            placeholder="- HostBuddy, our friendly AI assistant"
            className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#8A8E98] focus:outline-none focus:border-[#3e88f7] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          />
        </div>

        {/* Conversation Closing */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Conversation Closing
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            Can HostBuddy choose not to respond if it determines that a conversation is at its natural end?
          </p>
          <div className="space-y-3">
            {[
              { value: 'yes', label: 'Yes, HostBuddy can let conversations close when appropriate' },
              { value: 'no', label: 'No, HostBuddy should always be the last to respond' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setConversationClosing(option.value)}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  conversationClosing === option.value ? 'border-[#3e88f7]' : 'border-[#676a73]'
                }`}>
                  {conversationClosing === option.value && (
                    <div className="w-3 h-3 rounded-full bg-[#3e88f7]" style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.5)' }}></div>
                  )}
                </div>
                <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Transparency */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            AI Transparency
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            Can HostBuddy communicate that it is an AI assistant?
          </p>
          <div className="space-y-3">
            {[
              { value: 'only-if-asked', label: 'Only if directly asked' },
              { value: 'never', label: 'Never' }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setAiTransparency(option.value)}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  aiTransparency === option.value ? 'border-[#3e88f7]' : 'border-[#676a73]'
                }`}>
                  {aiTransparency === option.value && (
                    <div className="w-3 h-3 rounded-full bg-[#3e88f7]" style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.5)' }}></div>
                  )}
                </div>
                <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Language
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            What language should HostBuddy use when responding to guests?
          </p>
          <div className="space-y-3">
            <button
              onClick={() => setLanguage('whichever')}
              className="flex items-center gap-3"
            >
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                language === 'whichever' ? 'border-[#3e88f7]' : 'border-[#676a73]'
              }`}>
                {language === 'whichever' && (
                  <div className="w-3 h-3 rounded-full bg-[#3e88f7]" style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.5)' }}></div>
                )}
              </div>
              <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Whichever language the guest is using
              </span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage('specific')}
                className="flex items-center gap-3"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  language === 'specific' ? 'border-[#3e88f7]' : 'border-[#676a73]'
                }`}>
                  {language === 'specific' && (
                    <div className="w-3 h-3 rounded-full bg-[#3e88f7]" style={{ boxShadow: '0 0 8px rgba(62, 136, 247, 0.5)' }}></div>
                  )}
                </div>
                <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Always respond in:
                </span>
              </button>
              <input
                type="text"
                value={languageValue}
                onChange={(e) => setLanguageValue(e.target.value)}
                placeholder="ex. English"
                className="bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-2 text-white text-[14px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#8A8E98] focus:outline-none focus:border-[#3e88f7] transition-colors w-[200px]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
          </div>
        </div>

        {/* Stop Responding When Sentiment Turns Negative */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Stop Responding When Sentiment Turns Negative
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStopOnNegative(!stopOnNegative)}
                className={`w-14 h-7 rounded-full transition-all relative ${
                  stopOnNegative ? 'bg-[#3e88f7]' : 'bg-[#676a73]'
                }`}
                style={stopOnNegative ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.4)' } : {}}
              >
                <div
                  className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                    stopOnNegative ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                ></div>
              </button>
              <span className="text-[#10b981] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Enabled
              </span>
            </div>
          </div>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
            If enabled, HostBuddy will stop responding to a guest and let you take over if their sentiment turns negative. An action item will be generated when this happens – make sure you have{' '}
            <span className="text-[#98bffa]">notifications set up</span> so you're alerted if HostBuddy stops responding to a guest. You can re-enable responses on the inbox page.
          </p>
        </div>

        {/* Message Delay */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Message Delay
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5" style={{ fontVariationSettings: "'opsz' 14" }}>
            HostBuddy will delay its response to guests by a (random) number of minutes within this range. To have HostBuddy simply respond as quickly as possible, set min and max delay to 0.
          </p>
          <div className="flex gap-6">
            <div className="flex-1">
              <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Min. Delay
              </label>
              <input
                type="number"
                value={minDelay}
                onChange={(e) => setMinDelay(e.target.value)}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
            <div className="flex-1">
              <label className="text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                Max. Delay
              </label>
              <input
                type="number"
                value={maxDelay}
                onChange={(e) => setMaxDelay(e.target.value)}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
            </div>
          </div>
        </div>

        {/* Customize Tone */}
        <div className="mb-12">
          <h2 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
            Customize Tone
          </h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-5 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
            You can customize HostBuddy's responses by adding some instructions here to direct HostBuddy's tone. Make sure to test after you make changes here! HostBuddy is already optimized for friendly, hospitable conversation, so this is completely optional.
          </p>
          <textarea
            value={customTone}
            onChange={(e) => setCustomTone(e.target.value)}
            placeholder="(Optional) Add instructions to direct HostBuddy's tone..."
            rows={6}
            className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#8A8E98] focus:outline-none focus:border-[#3e88f7] transition-colors resize-none"
            style={{ fontVariationSettings: "'opsz' 14" }}
          />
        </div>

        {/* Bottom Save Button */}
        <div className="flex justify-center pt-6 pb-8">
          <button
            onClick={handleSave}
            className="bg-[#01255e] text-white px-12 py-3.5 rounded-lg text-[16px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#013a8a] transition-colors border border-[#013280]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Save Settings
          </button>
        </div>
      </div>

      {/* Modals */}
      <NewConfigurationModal
        isOpen={showNewConfigModal}
        onClose={() => setShowNewConfigModal(false)}
        onSubmit={handleNewConfig}
      />

      <ConfigureTimingModal
        isOpen={showTimingModal}
        onClose={() => {
          setShowTimingModal(false);
          setPendingConfigName('');
        }}
        onSave={handleSaveTiming}
        configName={pendingConfigName}
      />
    </div>
  );
}
