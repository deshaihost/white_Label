import { useState } from 'react';
import { Input } from './ui/input';
import { X, Check, ChevronDown, Trash2, Bell, UserPlus } from 'lucide-react';
import { showSaveSuccess } from './useSaveNotification';

const categories = ['Maintenance', 'Cleanliness', 'Special Requests', 'Reservation Changes', 'Other'];
const properties = [
  'Leo 506',
  '1B1 Adams - 8',
  '1B1 Adams - 4',
  '831 B',
  '1B1 Adams - 3',
  'Leo 403',
  '1B1 Adams - 10',
  '1B1 Adams - 2',
  '4183',
  '1B1 Adams - 5',
  'Leo 401',
  'Leo 601',
];

const timingOptions = [
  'Immediate',
  'Hourly',
  'Daily',
];

function MultiSelectDropdown({ 
  label, 
  options, 
  selected, 
  onChange,
  selectAllText = 'Select all'
}: { 
  label: string; 
  options: string[]; 
  selected: string[]; 
  onChange: (selected: string[]) => void;
  selectAllText?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(item => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const selectAll = () => {
    onChange(options);
  };

  const removeItem = (option: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter(item => item !== option));
  };

  const displayText = selected.length === 0 ? label : selected.length === options.length ? label : `${selected.length} selected`;

  return (
    <div className="relative flex-1">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#17191f] border border-[#3e88f7] rounded-lg px-3 py-2 min-h-[44px] cursor-pointer flex flex-wrap items-center gap-2 font-['DM_Sans:Regular',_sans-serif]"
        style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
      >
        {selected.length === 0 ? (
          <span className="text-[#676A73] text-[14px]">{label}</span>
        ) : (
          <>
            {selected.map(item => (
              <div 
                key={item}
                className="bg-[#3e88f7] bg-opacity-20 border border-[#3e88f7] rounded px-2 py-1 flex items-center gap-1"
              >
                <span className="text-white text-[12px]">{item}</span>
                <button
                  onClick={(e) => removeItem(item, e)}
                  className="text-white hover:text-[#ef4444]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </>
        )}
        <ChevronDown className="w-4 h-4 text-[#a6a9b2] ml-auto" />
      </div>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 bg-[#17191f] border border-[#3e88f7] rounded-lg shadow-lg z-20 w-full max-h-[300px] overflow-y-auto" style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.2)' }}>
            <div className="p-2">
              <button
                onClick={selectAll}
                className="w-full text-left px-3 py-2 text-white text-[14px] hover:bg-[#3e88f7] hover:bg-opacity-10 rounded font-['DM_Sans:Medium',_sans-serif]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {selectAllText}
              </button>
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => toggleOption(option)}
                  className="px-3 py-2 flex items-center gap-2 hover:bg-[#3e88f7] hover:bg-opacity-10 cursor-pointer rounded font-['DM_Sans:Regular',_sans-serif]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    selected.includes(option) ? 'bg-[#3e88f7] border-[#3e88f7]' : 'border-[#676a73]'
                  }`}>
                    {selected.includes(option) && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-white text-[14px]">
                    {option}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SingleSelectDropdown({ 
  label, 
  options, 
  selected, 
  onChange 
}: { 
  label: string; 
  options: string[]; 
  selected: string; 
  onChange: (selected: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative flex-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#17191f] border border-[#3e88f7] h-[44px] rounded-lg px-3 flex items-center justify-between font-['DM_Sans:Regular',_sans-serif]"
        style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
      >
        <span className={`text-[14px] ${selected ? 'text-white' : 'text-[#676A73]'}`}>
          {selected || label}
        </span>
        <ChevronDown className="w-4 h-4 text-[#a6a9b2]" />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full mt-1 left-0 bg-[#17191f] border border-[#3e88f7] rounded-lg shadow-lg z-20 w-full" style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.2)' }}>
            {options.map((option) => (
              <div
                key={option}
                onClick={() => selectOption(option)}
                className="px-3 py-2.5 hover:bg-[#3e88f7] hover:bg-opacity-10 cursor-pointer first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 font-['DM_Sans:Regular',_sans-serif]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {selected === option && <Check className="w-4 h-4 text-[#3e88f7]" />}
                <span className="text-white text-[14px]">
                  {option}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Mock contact data - this would come from the Contacts component
const availableEmails = [
  { name: 'Primary Email', email: 'select@stays.net' },
  { name: 'Select Stays Team', email: 'hosting@selectstays.net' },
  { name: 'Leadership', email: 'info@hostbuddy.ai' },
  { name: 'Kat', email: 'kat@selectstays.net' },
  { name: 'Operations Team', email: 'operations@selectstays.net' }
];

const availablePhoneNumbers = [
  { name: 'Nick', number: '+14085067412' },
  { name: 'Sam', number: '+15304016167' },
  { name: 'Michael', number: '+15713582222' }
];

const availableWhatsAppNumbers = [
  { name: 'Michael', number: '+15713582222' }
];

const availableSlackChannels = [
  { name: '#general', id: 'general' },
  { name: '#support', id: 'support' },
  { name: '#operations', id: 'operations' }
];

const availableWebhooks = [
  { name: 'PMS Sync', url: 'https://pms.example.com/webhook' },
  { name: 'Analytics', url: 'https://analytics.example.com/webhook' }
];

export default function NotificationSettings() {
  const [recipients, setRecipients] = useState([
    {
      name: 'Jay',
      method: 'sms',
      contact: 'Nick (+14085067412)',
      timing: 'Immediate',
      categories: '6 categories',
      properties: 'All properties'
    },
    {
      name: 'Erika',
      method: 'email',
      contact: 'select@stays.net',
      timing: 'Immediate',
      categories: '6 categories',
      properties: 'All properties'
    },
    {
      name: 'Paula',
      method: 'sms',
      contact: 'Sam (+15304016167)',
      timing: 'Daily at 6:00 PM',
      categories: '1 categories',
      properties: 'All properties'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [channel, setChannel] = useState('');
  const [selectedContact, setSelectedContact] = useState('');
  const [timing, setTiming] = useState('');
  const [dailyTime, setDailyTime] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);

  const getReceiveNotificationText = () => {
    if (timing === 'Immediate') return 'Immediately';
    if (timing === 'Hourly') return 'Hourly';
    if (timing === 'Daily') return dailyTime || '';
    return '';
  };

  const getContactOptions = () => {
    switch (channel) {
      case 'Email':
        return availableEmails.map(e => `${e.name} (${e.email})`);
      case 'Text message (SMS)':
        return availablePhoneNumbers.map(p => `${p.name} (${p.number})`);
      case 'WhatsApp':
        return availableWhatsAppNumbers.map(w => `${w.name} (${w.number})`);
      case 'Slack':
        return availableSlackChannels.map(s => s.name);
      case 'Webhook':
        return availableWebhooks.map(w => `${w.name} (${w.url})`);
      default:
        return [];
    }
  };

  const getContactLabel = () => {
    switch (channel) {
      case 'Email':
        return 'Email Address';
      case 'Text message (SMS)':
        return 'Phone Number';
      case 'WhatsApp':
        return 'WhatsApp Number';
      case 'Slack':
        return 'Slack Channel';
      case 'Webhook':
        return 'Webhook Endpoint';
      default:
        return 'Contact';
    }
  };

  const handleSubmit = () => {
    console.log('Adding recipient:', { 
      recipientName, 
      channel,
      selectedContact,
      timing, 
      receiveNotificationAt: getReceiveNotificationText(),
      selectedCategories, 
      selectedProperties 
    });
    // Reset form
    setRecipientName('');
    setChannel('');
    setSelectedContact('');
    setTiming('');
    setDailyTime('');
    setSelectedCategories([]);
    setSelectedProperties([]);
    setShowAddForm(false);
    showSaveSuccess('Notification recipient added successfully');
  };

  const handleDeleteRecipient = (index: number) => {
    const updatedRecipients = recipients.filter((_, i) => i !== index);
    setRecipients(updatedRecipients);
    showSaveSuccess('Recipient removed successfully');
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#0F1117]">
      <div className="max-w-[1200px] mx-auto px-8 py-12">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-7 h-7 text-[#3e88f7]" />
            <h1 className="text-white text-[28px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Notification Settings
            </h1>
          </div>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Configure how and when you receive notifications from HostBuddy
          </p>
        </div>

        {/* Info Banner */}
        <div className="bg-[#17191f] border border-[#013280] rounded-xl p-4 mb-8">
          <p className="text-[#d0d3db] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            💡 If your contact information is not showing up here, add it in the "Contact" section and make sure it is confirmed.
          </p>
        </div>

        {/* Action Items Section */}
        <div>
          <h2 className="text-white text-[20px] font-['DM_Sans:SemiBold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Action Items</h2>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-6" style={{ fontVariationSettings: "'opsz' 14" }}>
            Get notifications when HostBuddy detects a new action item for the host in a guest conversation.
          </p>

          {/* Recipients Table */}
          <div className="bg-[#17191f] rounded-xl border border-[#013280] overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#013280] bg-[#24262e]">
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Name</th>
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Method</th>
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Contact</th>
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Timing</th>
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Categories</th>
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Properties</th>
                  <th className="text-left text-white text-[13px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>Manage</th>
                </tr>
              </thead>
              <tbody>
                {recipients.map((recipient, index) => (
                  <tr key={index} className="border-b border-[#013280] last:border-b-0 hover:bg-[#24262e] transition-all duration-200">
                    <td className="text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>{recipient.name}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#3e88f7] bg-opacity-15 border border-[#3e88f7] border-opacity-30 text-[#98bffa] text-[12px] font-['DM_Sans:Medium',_sans-serif] capitalize" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {recipient.method}
                      </span>
                    </td>
                    <td className="text-[#d0d3db] text-[13px] font-['DM_Sans:Regular',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>{recipient.contact}</td>
                    <td className="text-white text-[13px] font-['DM_Sans:Regular',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>{recipient.timing}</td>
                    <td className="text-[#d0d3db] text-[13px] font-['DM_Sans:Regular',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>{recipient.categories}</td>
                    <td className="text-[#d0d3db] text-[13px] font-['DM_Sans:Regular',_sans-serif] p-4" style={{ fontVariationSettings: "'opsz' 14" }}>{recipient.properties}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleDeleteRecipient(index)}
                        className="flex items-center gap-1.5 text-[#ef4444] hover:text-[#f87171] font-['DM_Sans:Medium',_sans-serif] transition-all duration-200 group"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="text-[13px]">Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {!showAddForm && (
            <div className="flex justify-center mb-8">
              <button 
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-[#3e88f7] hover:bg-[#74A9F7] text-white px-8 py-3 rounded-xl text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all duration-200 transform hover:scale-105"
                style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 25px rgba(62, 136, 247, 0.4)' }}
              >
                <UserPlus className="w-5 h-5" />
                Add Recipient
              </button>
            </div>
          )}

          {/* Add Recipient Form */}
          {showAddForm && (
            <div className="bg-[#17191f] rounded-xl border border-[#013280] p-6 mb-8">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#013280]">
                <UserPlus className="w-6 h-6 text-[#3e88f7]" />
                <h3 className="text-white text-[18px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>Add New Recipient</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Recipient Name</label>
                  <Input
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="John Doe"
                    className="bg-[#17191f] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif] placeholder:text-[#676A73]"
                    style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Channel</label>
                    <SingleSelectDropdown
                      label="-- Please select --"
                      options={['Email', 'Text message (SMS)', 'Slack', 'WhatsApp', 'Webhook']}
                      selected={channel}
                      onChange={(value) => {
                        setChannel(value);
                        setSelectedContact('');
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>{getContactLabel()}</label>
                    <SingleSelectDropdown
                      label={channel ? '-- Please select --' : 'Select channel first'}
                      options={getContactOptions()}
                      selected={selectedContact}
                      onChange={setSelectedContact}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Timing</label>
                  <SingleSelectDropdown
                    label="-- Please select --"
                    options={timingOptions}
                    selected={timing}
                    onChange={(value) => {
                      setTiming(value);
                      setDailyTime('');
                    }}
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Receive Notification At:</label>
                  {timing === 'Daily' ? (
                    <Input
                      type="time"
                      value={dailyTime}
                      onChange={(e) => setDailyTime(e.target.value)}
                      className="bg-[#17191f] border-[#3e88f7] text-white h-[44px] font-['DM_Sans:Regular',_sans-serif]"
                      style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                    />
                  ) : (
                    <Input
                      value={getReceiveNotificationText()}
                      readOnly
                      placeholder="Please select Timing first"
                      className="bg-[#17191f] border-[#3e88f7] text-white h-[44px] placeholder:text-[#676A73] font-['DM_Sans:Regular',_sans-serif]"
                      style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 10px rgba(62, 136, 247, 0.1)' }}
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Categories</label>
                  <MultiSelectDropdown
                    label="-- Please select --"
                    options={categories}
                    selected={selectedCategories}
                    onChange={setSelectedCategories}
                    selectAllText="Select all categories"
                  />
                </div>
                <div>
                  <label className="block text-white text-[14px] font-['DM_Sans:Medium',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>Properties</label>
                  <MultiSelectDropdown
                    label="-- Please select --"
                    options={properties}
                    selected={selectedProperties}
                    onChange={setSelectedProperties}
                    selectAllText="Select all"
                  />
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setRecipientName('');
                    setChannel('');
                    setSelectedContact('');
                    setTiming('');
                    setDailyTime('');
                    setSelectedCategories([]);
                    setSelectedProperties([]);
                  }}
                  className="px-8 py-3 bg-transparent border border-[#3e88f7] border-opacity-50 hover:border-opacity-100 text-[#d0d3db] hover:text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl transition-all duration-200"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 px-8 py-3 bg-[#3e88f7] hover:bg-[#74A9F7] text-white text-[14px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl transition-all duration-200 transform hover:scale-105"
                  style={{ fontVariationSettings: "'opsz' 14", boxShadow: '0 0 25px rgba(62, 136, 247, 0.4)' }}
                >
                  <Check className="w-4 h-4" />
                  Add Recipient
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
