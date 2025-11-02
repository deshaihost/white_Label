import { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, X } from 'lucide-react';
import { showSaveSuccess } from './useSaveNotification';
import DeleteConfirmDialog from './DeleteConfirmDialog';

interface SendWhenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

function SendWhenModal({ isOpen, onClose, onSelect }: SendWhenModalProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [sendImmediately, setSendImmediately] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('1');
  const [daysAfter, setDaysAfter] = useState('0');
  const [daysBefore, setDaysBefore] = useState('0');
  const [hoursAfter, setHoursAfter] = useState('0');
  const [minutesAfter, setMinutesAfter] = useState('0');
  const [hoursCancels, setHoursCancels] = useState('0');
  const [minutesCancels, setMinutesCancels] = useState('0');
  const [dayOfWeek, setDayOfWeek] = useState('');
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [dayOfMonth, setDayOfMonth] = useState('1');
  const [month, setMonth] = useState('');
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [hoursCleaning, setHoursCleaning] = useState('0');
  const [minutesCleaning, setMinutesCleaning] = useState('0');
  const [minutTrigger, setMinutTrigger] = useState('');
  const [showMinutDropdown, setShowMinutDropdown] = useState(false);
  const [minutesAfterEvent, setMinutesAfterEvent] = useState('0');

  useEffect(() => {
    if (!isOpen) {
      setShowDropdown(false);
      setSelectedOption(null);
      setSendImmediately(false);
      setDate('');
      setTime('');
      setDay('1');
      setDaysAfter('0');
      setDaysBefore('0');
      setHoursAfter('0');
      setMinutesAfter('0');
      setHoursCancels('0');
      setMinutesCancels('0');
      setDayOfWeek('');
      setShowDayDropdown(false);
      setDayOfMonth('1');
      setMonth('');
      setShowMonthDropdown(false);
      setHoursCleaning('0');
      setMinutesCleaning('0');
      setMinutTrigger('');
      setShowMinutDropdown(false);
      setMinutesAfterEvent('0');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allOptions = [
    { 
      type: 'config', 
      id: 'send-once', 
      label: 'Send Once',
      description: 'Send the message once, either immediately or at a scheduled date and time.'
    },
    { 
      type: 'config', 
      id: 'during-reservation', 
      label: 'During reservation',
      description: 'Send the message during the guest\'s reservation, on a specific day and time. Day 1 is the day of check-in.'
    },
    { 
      type: 'config', 
      id: 'before-reservation', 
      label: 'Before reservation',
      description: 'Send the message before the guest\'s reservation starts, on a specific day and time.'
    },
    { 
      type: 'config', 
      id: 'after-reservation', 
      label: 'After reservation',
      description: 'Send the message a number of days after the guest\'s reservation, at a specific time. "0 days after" will send the message on the day of check-out.'
    },
    { 
      type: 'config', 
      id: 'before-stay-ends', 
      label: 'Before stay ends',
      description: 'Send the message a number of days before the guest\'s stay ends, at a specific time. "0 days before" will send the message on the day of check-out.'
    },
    { 
      type: 'config', 
      id: 'after-guest-books', 
      label: 'After guest books',
      description: 'Send the message a number of hours and minutes after the guest books.'
    },
    { 
      type: 'config', 
      id: 'after-guest-cancels', 
      label: 'After guest cancels',
      description: 'Send the message a number of hours and minutes after the guest cancels.'
    },
    { 
      type: 'config', 
      id: 'daily', 
      label: 'Daily',
      description: 'Send the message every day at the specified time.'
    },
    { 
      type: 'config', 
      id: 'weekly', 
      label: 'Weekly',
      description: 'This trigger will fire every week on the selected days, at the specified time of day.'
    },
    { 
      type: 'config', 
      id: 'monthly', 
      label: 'Monthly',
      description: 'This trigger will fire once a month on the selected day, at the specified time of day.'
    },
    { 
      type: 'config', 
      id: 'yearly', 
      label: 'Yearly',
      description: ''
    },
    { 
      type: 'config', 
      id: 'after-cleaning', 
      label: 'After pre-stay cleaning is complete',
      description: 'This trigger will fire when a cleaning project is completed at one of your properties. You can also set it to fire a specific amount of time after the cleaning is completed. Requires a Turno integration.\n\nThis trigger can only send a message to guests associated with the property that the cleaning was completed at.'
    },
    { 
      type: 'config', 
      id: 'minut-triggers', 
      label: 'Minut Triggers',
      description: ''
    }
  ];

  const handleOptionSelect = (option: typeof allOptions[0]) => {
    if (option.type === 'config') {
      setSelectedOption(option.id);
      setShowDropdown(false);
    } else {
      onSelect(option.label);
      onClose();
    }
  };

  const handleConfirm = () => {
    const option = allOptions.find(o => o.id === selectedOption);
    if (!option) return;

    let result = option.label;
    
    if (selectedOption === 'send-once') {
      if (sendImmediately) {
        result = 'Send Once - Immediately';
      } else if (date && time) {
        result = `Send Once - ${date} at ${time}`;
      }
    } else if (selectedOption === 'during-reservation' || selectedOption === 'before-reservation') {
      if (day && time) {
        result = `${option.label} - Day ${day} at ${time}`;
      }
    } else if (selectedOption === 'after-reservation') {
      if (time) {
        result = `After reservation - ${daysAfter} days at ${time}`;
      }
    } else if (selectedOption === 'before-stay-ends') {
      if (time) {
        result = `Before stay ends - ${daysBefore} days at ${time}`;
      }
    } else if (selectedOption === 'after-guest-books') {
      result = `After guest books - ${hoursAfter}h ${minutesAfter}m`;
    } else if (selectedOption === 'after-guest-cancels') {
      result = `After guest cancels - ${hoursCancels}h ${minutesCancels}m`;
    } else if (selectedOption === 'daily') {
      if (time) {
        result = `Daily - ${time}`;
      }
    } else if (selectedOption === 'weekly') {
      if (dayOfWeek && time) {
        result = `Weekly - ${dayOfWeek} at ${time}`;
      }
    } else if (selectedOption === 'monthly') {
      if (dayOfMonth && time) {
        result = `Monthly - Day ${dayOfMonth} at ${time}`;
      }
    } else if (selectedOption === 'yearly') {
      if (month && dayOfMonth && time) {
        result = `Yearly - ${month} ${dayOfMonth} at ${time}`;
      }
    } else if (selectedOption === 'after-cleaning') {
      result = `After cleaning - ${hoursCleaning}h ${minutesCleaning}m`;
    } else if (selectedOption === 'minut-triggers') {
      if (minutTrigger) {
        result = `${minutTrigger} - ${minutesAfterEvent}m after`;
      }
    }
    
    onSelect(result);
    onClose();
  };

  const handleCancel = () => {
    setSelectedOption(null);
    setSendImmediately(false);
    setDate('');
    setTime('');
    setDay('1');
    setDaysAfter('0');
    setDaysBefore('0');
    setHoursAfter('0');
    setMinutesAfter('0');
    setHoursCancels('0');
    setMinutesCancels('0');
    setDayOfWeek('');
    setShowDayDropdown(false);
    setDayOfMonth('1');
    setMonth('');
    setShowMonthDropdown(false);
    setHoursCleaning('0');
    setMinutesCleaning('0');
    setMinutTrigger('');
    setShowMinutDropdown(false);
    setMinutesAfterEvent('0');
  };

  const selectedOptionData = allOptions.find(o => o.id === selectedOption);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[820px]"
        style={{ 
          boxShadow: '0 0 40px rgba(30, 75, 158, 0.3)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F1117] border-b border-[#013280] px-8 py-5 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Send When
          </h3>
          <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-[#0F1117] px-8 py-8 overflow-y-auto" style={{ minHeight: '500px' }}>
          {!selectedOption ? (
            // Initial dropdown state
            <>
              <div className="relative mb-12">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="w-full text-left px-6 py-5 bg-[#17191f] border-2 border-[#013280] rounded-xl text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <span>Choose when to send this message...</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showDropdown && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-3 bg-[#d0d3db] rounded-xl z-[100] shadow-[0_0_40px_rgba(0,0,0,0.6)]" 
                    style={{ 
                      maxHeight: '400px',
                      overflowY: 'auto',
                      scrollbarWidth: 'thin', 
                      scrollbarColor: '#676A73 #d0d3db'
                    }}
                  >
                    <div className="p-3">
                      <div className="text-[#676A73] text-[13px] font-['DM_Sans:Medium',_sans-serif] px-4 py-3 uppercase tracking-wide sticky top-0 bg-[#d0d3db] z-10" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Choose when to send this message
                      </div>
                      <div className="space-y-1 pb-2">
                        {allOptions.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => handleOptionSelect(option)}
                            className="w-full text-left px-4 py-3 text-[#0a0e1a] text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#98bffa] transition-colors rounded-lg"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-[#013280]/40 my-12"></div>
              
              <div className="flex justify-center pt-8">
                <button
                  onClick={onClose}
                  className="px-40 py-4 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            // Configuration screen
            <>
              {/* Selected option - clickable to change */}
              <div className="mb-8">
                <button
                  onClick={() => {
                    setSelectedOption(null);
                    setShowDropdown(true);
                  }}
                  className="w-full text-left px-6 py-5 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Medium',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <span>{selectedOptionData?.label}</span>
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              {(() => {
                // Dynamic description for Minut Triggers
                if (selectedOption === 'minut-triggers' && minutTrigger) {
                  const minutDescriptions: { [key: string]: string } = {
                    'Disturbance first notice': 'Send the message upon the first notice of a disturbance detected by Minut.',
                    'Disturbance second notice': 'Send the message upon the second notice of a disturbance detected by Minut.',
                    'Disturbance third notice': 'Send the message upon the third notice of a disturbance detected by Minut.',
                    'Disturbance ended': 'Send the message when a disturbance has ended as detected by Minut.',
                    'Disturbance dismissed': 'Send the message when a disturbance has been dismissed in Minut.',
                    'Disturbance snoozed': 'Send the message when a disturbance has been snoozed in Minut.',
                    'Smoking detection: Smoking detected': 'Send the message when smoking is detected by Minut.'
                  };
                  return (
                    <div className="mb-10">
                      <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] text-center leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {minutDescriptions[minutTrigger]}
                      </p>
                    </div>
                  );
                }
                // Standard description
                if (selectedOptionData?.description) {
                  return (
                    <div className="mb-10">
                      <p className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] text-center leading-relaxed whitespace-pre-line" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {selectedOptionData.description}
                      </p>
                    </div>
                  );
                }
                return null;
              })()}

              <div className="border-t border-[#013280]/40 mb-10"></div>

              {/* Configuration fields based on selected option */}
              <div className="space-y-6 mb-12">
                {selectedOption === 'send-once' && (
                  <>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="send-immediately"
                        checked={sendImmediately}
                        onChange={(e) => setSendImmediately(e.target.checked)}
                        className="w-5 h-5 bg-transparent border-2 border-[#3e88f7] rounded accent-[#3e88f7] cursor-pointer"
                      />
                      <label 
                        htmlFor="send-immediately" 
                        className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] cursor-pointer"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        Send Immediately
                      </label>
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        disabled={sendImmediately}
                        placeholder="mm/dd/yyyy"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={sendImmediately}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7] disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {(selectedOption === 'during-reservation' || selectedOption === 'before-reservation') && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Day
                      </label>
                      <input
                        type="number"
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        min="1"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'after-reservation' && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Days after
                      </label>
                      <input
                        type="number"
                        value={daysAfter}
                        onChange={(e) => setDaysAfter(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'before-stay-ends' && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Days before
                      </label>
                      <input
                        type="number"
                        value={daysBefore}
                        onChange={(e) => setDaysBefore(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'after-guest-books' && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Hours after booking
                      </label>
                      <input
                        type="number"
                        value={hoursAfter}
                        onChange={(e) => setHoursAfter(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Minutes after booking
                      </label>
                      <input
                        type="number"
                        value={minutesAfter}
                        onChange={(e) => setMinutesAfter(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'after-guest-cancels' && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Hours after guest cancels
                      </label>
                      <input
                        type="number"
                        value={hoursCancels}
                        onChange={(e) => setHoursCancels(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Minutes after guest cancels
                      </label>
                      <input
                        type="number"
                        value={minutesCancels}
                        onChange={(e) => setMinutesCancels(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'daily' && (
                  <div>
                    <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="--:-- --"
                      className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                      style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                    />
                  </div>
                )}

                {selectedOption === 'weekly' && (
                  <>
                    <div className="relative">
                      <button
                        onClick={() => setShowDayDropdown(!showDayDropdown)}
                        className="w-full text-left px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-full text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span className={dayOfWeek ? 'text-white' : 'text-[#a6a9b2]'}>
                          {dayOfWeek || 'Day of Week'}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showDayDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showDayDropdown && (
                        <div 
                          className="absolute top-full left-0 right-0 mt-2 bg-[#d0d3db] rounded-xl z-[100] shadow-[0_0_40px_rgba(0,0,0,0.6)]" 
                          style={{ 
                            maxHeight: '300px',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin', 
                            scrollbarColor: '#676A73 #d0d3db'
                          }}
                        >
                          <div className="p-2">
                            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                              <button
                                key={day}
                                onClick={() => {
                                  setDayOfWeek(day);
                                  setShowDayDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 text-[#0a0e1a] text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#98bffa] transition-colors rounded-lg"
                                style={{ fontVariationSettings: "'opsz' 14" }}
                              >
                                {day}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'monthly' && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Day of month
                      </label>
                      <input
                        type="number"
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(e.target.value)}
                        min="1"
                        max="31"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'yearly' && (
                  <>
                    <div className="relative">
                      <button
                        onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                        className="w-full text-left px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-full text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span className={month ? 'text-white' : 'text-[#a6a9b2]'}>
                          {month || 'Month...'}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showMonthDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showMonthDropdown && (
                        <div 
                          className="absolute top-full left-0 right-0 mt-2 bg-[#d0d3db] rounded-xl z-[100] shadow-[0_0_40px_rgba(0,0,0,0.6)]" 
                          style={{ 
                            maxHeight: '300px',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin', 
                            scrollbarColor: '#676A73 #d0d3db'
                          }}
                        >
                          <div className="p-2">
                            {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((m) => (
                              <button
                                key={m}
                                onClick={() => {
                                  setMonth(m);
                                  setShowMonthDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 text-[#0a0e1a] text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#98bffa] transition-colors rounded-lg"
                                style={{ fontVariationSettings: "'opsz' 14" }}
                              >
                                {m}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Day of month
                      </label>
                      <input
                        type="number"
                        value={dayOfMonth}
                        onChange={(e) => setDayOfMonth(e.target.value)}
                        min="1"
                        max="31"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Time
                      </label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        placeholder="--:-- --"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14", colorScheme: 'dark' }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'after-cleaning' && (
                  <>
                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Hours after cleaning complete
                      </label>
                      <input
                        type="number"
                        value={hoursCleaning}
                        onChange={(e) => setHoursCleaning(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Minutes after cleaning complete
                      </label>
                      <input
                        type="number"
                        value={minutesCleaning}
                        onChange={(e) => setMinutesCleaning(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>
                  </>
                )}

                {selectedOption === 'minut-triggers' && (
                  <>
                    <div className="relative">
                      <button
                        onClick={() => setShowMinutDropdown(!showMinutDropdown)}
                        className="w-full text-left px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-full text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      >
                        <span className={minutTrigger ? 'text-white' : 'text-[#a6a9b2]'}>
                          {minutTrigger || 'Choose a Minut event...'}
                        </span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${showMinutDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showMinutDropdown && (
                        <div 
                          className="absolute top-full left-0 right-0 mt-2 bg-[#d0d3db] rounded-xl z-[100] shadow-[0_0_40px_rgba(0,0,0,0.6)]" 
                          style={{ 
                            maxHeight: '400px',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin', 
                            scrollbarColor: '#676A73 #d0d3db'
                          }}
                        >
                          <div className="p-2">
                            {[
                              'Disturbance first notice',
                              'Disturbance second notice',
                              'Disturbance third notice',
                              'Disturbance ended',
                              'Disturbance dismissed',
                              'Disturbance snoozed',
                              'Smoking detection: Smoking detected'
                            ].map((trigger) => (
                              <button
                                key={trigger}
                                onClick={() => {
                                  setMinutTrigger(trigger);
                                  setShowMinutDropdown(false);
                                }}
                                className="w-full text-left px-4 py-3 text-[#0a0e1a] text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#98bffa] transition-colors rounded-lg"
                                style={{ fontVariationSettings: "'opsz' 14" }}
                              >
                                {trigger}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Minutes after event
                      </label>
                      <input
                        type="number"
                        value={minutesAfterEvent}
                        onChange={(e) => setMinutesAfterEvent(e.target.value)}
                        min="0"
                        className="w-full bg-[#17191f] border-2 border-[#013280] rounded-full px-6 py-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                        style={{ fontVariationSettings: "'opsz' 14" }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-6 pt-6">
                <button
                  onClick={handleCancel}
                  className="px-12 py-3 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-full hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-12 py-3 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-full hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Confirm
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

interface MinutConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (condition: string) => void;
}

function MinutConditionsModal({ isOpen, onClose, onSelect }: MinutConditionsModalProps) {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedCondition(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const options = [
    'Disturbance is Ongoing',
    'Disturbance IS NOT Ongoing'
  ];

  const handleConfirm = () => {
    if (selectedCondition) {
      onSelect(selectedCondition);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60]" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[820px]"
        style={{ 
          boxShadow: '0 0 40px rgba(30, 75, 158, 0.3)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F1117] border-b border-[#013280] px-8 py-5 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Send If
          </h3>
          <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="bg-[#0F1117] px-8 py-8 overflow-y-auto" style={{ minHeight: '500px' }}>
          <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
            Only send this message if the Minut disturbance condition is met.
          </p>

          <div className="border-t border-[#013280]/40 mb-8"></div>

          <div className="space-y-3 mb-12">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedCondition(option)}
                className={`w-full text-left px-6 py-5 transition-all text-white text-[16px] font-['DM_Sans:Medium',_sans-serif] rounded-xl border-2 ${
                  selectedCondition === option
                    ? 'bg-[#01255e] border-[#3e88f7] shadow-[0_0_15px_rgba(62,136,247,0.2)]'
                    : 'bg-[#0F1117] border-[#013280] hover:bg-[#01255e] hover:border-[#3e88f7] hover:shadow-[0_0_15px_rgba(62,136,247,0.2)]'
                }`}
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={onClose}
              className="px-12 py-4 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="px-12 py-4 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SendIfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

function SendIfModal({ isOpen, onClose, onSelect }: SendIfModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
  const [selectedSentiments, setSelectedSentiments] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMinutModal, setShowMinutModal] = useState(false);
  const [timeFrom, setTimeFrom] = useState('');
  const [timeTo, setTimeTo] = useState('');
  const [minDays, setMinDays] = useState('');
  const [maxDays, setMaxDays] = useState('');
  const [minGuests, setMinGuests] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [minPets, setMinPets] = useState('');
  const [maxPets, setMaxPets] = useState('');
  const [minChildren, setMinChildren] = useState('');
  const [maxChildren, setMaxChildren] = useState('');
  const [minInfants, setMinInfants] = useState('');
  const [maxInfants, setMaxInfants] = useState('');
  const [minCheckInDays, setMinCheckInDays] = useState('');
  const [maxCheckInDays, setMaxCheckInDays] = useState('');
  const [minCheckOutDays, setMinCheckOutDays] = useState('');
  const [maxCheckOutDays, setMaxCheckOutDays] = useState('');
  const [reservationMonth, setReservationMonth] = useState('');
  const [reservationDayOfMonth, setReservationDayOfMonth] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
      setSelectedStatuses([]);
      setSelectedWeekdays([]);
      setSelectedSentiments([]);
      setShowDropdown(false);
      setTimeFrom('');
      setTimeTo('');
      setMinDays('');
      setMaxDays('');
      setMinGuests('');
      setMaxGuests('');
      setMinPets('');
      setMaxPets('');
      setMinChildren('');
      setMaxChildren('');
      setMinInfants('');
      setMaxInfants('');
      setMinCheckInDays('');
      setMaxCheckInDays('');
      setMinCheckOutDays('');
      setMaxCheckOutDays('');
      setReservationMonth('');
      setReservationDayOfMonth('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionSelect = (option: string) => {
    if (option === 'Minut conditions...') {
      setShowMinutModal(true);
    } else {
      setSelectedOption(option);
    }
  };

  const toggleStatus = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const toggleWeekday = (day: string) => {
    if (selectedWeekdays.includes(day)) {
      setSelectedWeekdays(selectedWeekdays.filter(d => d !== day));
    } else {
      setSelectedWeekdays([...selectedWeekdays, day]);
    }
  };

  const toggleSentiment = (sentiment: string) => {
    if (selectedSentiments.includes(sentiment)) {
      setSelectedSentiments(selectedSentiments.filter(s => s !== sentiment));
    } else {
      setSelectedSentiments([...selectedSentiments, sentiment]);
    }
  };

  const handleConfirm = () => {
    if (selectedOption === 'Reservation status is...') {
      onSelect(`Reservation status: ${selectedStatuses.join(', ')}`);
    } else if (selectedOption === 'Weekday is...') {
      onSelect(`Weekday: ${selectedWeekdays.join(', ')}`);
    } else if (selectedOption === 'Time of day is...') {
      onSelect(`Time of day: ${timeFrom} - ${timeTo}`);
    } else if (selectedOption === 'Reservation duration is...') {
      onSelect(`Reservation duration: ${minDays}-${maxDays} days`);
    } else if (selectedOption === 'Guest count is...') {
      onSelect(`Guest count: ${minGuests}-${maxGuests}`);
    } else if (selectedOption === 'Pet count is...') {
      onSelect(`Pet count: ${minPets}-${maxPets}`);
    } else if (selectedOption === 'Child count is...') {
      onSelect(`Child count: ${minChildren}-${maxChildren}`);
    } else if (selectedOption === 'Infant count is...') {
      onSelect(`Infant count: ${minInfants}-${maxInfants}`);
    } else if (selectedOption === 'Check-in day is...') {
      onSelect(`Check-in day: ${minCheckInDays}-${maxCheckInDays} days away`);
    } else if (selectedOption === 'Check-out day is...') {
      onSelect(`Check-out day: ${minCheckOutDays}-${maxCheckOutDays} days away`);
    } else if (selectedOption === 'Reservation dates contain...') {
      onSelect(`Reservation dates contain: ${reservationMonth} ${reservationDayOfMonth}`);
    } else if (selectedOption === 'Sentiment is...') {
      onSelect(`Sentiment: ${selectedSentiments.join(', ')}`);
    }
    onClose();
  };

  const options = [
    'Reservation status is...',
    'Weekday is...',
    'Time of day is...',
    'Reservation duration is...',
    'Guest count is...',
    'Pet count is...',
    'Child count is...',
    'Infant count is...',
    'Check-in day is...',
    'Check-out day is...',
    'Reservation dates contain...',
    'Sentiment is...',
    'Minut conditions...'
  ];

  const statusOptions = ['Future', 'Past', 'Current', 'Inquiry'];
  const weekdayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
        <div 
          className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[820px]"
          style={{ 
            boxShadow: '0 0 40px rgba(30, 75, 158, 0.3)',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-[#0F1117] border-b border-[#013280] px-8 py-5 flex items-center justify-between flex-shrink-0">
            <h3 className="text-white text-[22px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Send If
            </h3>
            <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-[#0F1117] px-8 py-8 overflow-y-auto" style={{ minHeight: '500px' }}>
            {!selectedOption ? (
              <>
                <div className="relative mb-12">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-full text-left px-6 py-5 bg-[#17191f] border-2 border-[#013280] rounded-xl text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>Only send the message if...</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showDropdown && (
                    <div 
                      className="absolute top-full left-0 right-0 mt-3 bg-[#d0d3db] rounded-xl z-[100] shadow-[0_0_40px_rgba(0,0,0,0.6)]" 
                      style={{ 
                        maxHeight: '400px',
                        overflowY: 'auto',
                        scrollbarWidth: 'thin', 
                        scrollbarColor: '#676A73 #d0d3db'
                      }}
                    >
                      <div className="p-3">
                        <div className="text-[#676A73] text-[13px] font-['DM_Sans:Medium',_sans-serif] px-4 py-3 uppercase tracking-wide sticky top-0 bg-[#d0d3db] z-10" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Only send the message if
                        </div>
                        <div className="space-y-1 pb-2">
                          {options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                handleOptionSelect(option);
                                setShowDropdown(false);
                              }}
                              className="w-full text-left px-4 py-3 text-[#0a0e1a] text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#98bffa] transition-colors rounded-lg"
                              style={{ fontVariationSettings: "'opsz' 14" }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-[#013280]/40 my-12"></div>
                
                <div className="flex justify-center pt-8">
                  <button
                    onClick={onClose}
                    className="px-40 py-4 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Close
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Selected option display - clickable to change */}
                <div className="mb-8">
                  <button
                    onClick={() => {
                      setSelectedOption(null);
                      setShowDropdown(true);
                    }}
                    className="w-full text-left px-6 py-5 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Medium',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <span>{selectedOption}</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                </div>

                {/* Description and configuration */}
                {selectedOption === 'Reservation status is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message to guests at the selected reservation statuses.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          onClick={() => toggleStatus(status)}
                          className={`px-6 py-5 rounded-xl border-2 text-[16px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
                            selectedStatuses.includes(status)
                              ? 'bg-[#3e88f7] border-[#3e88f7] text-white shadow-[0_0_15px_rgba(62,136,247,0.3)]'
                              : 'bg-[#0F1117] border-[#013280] text-white hover:border-[#3e88f7] hover:bg-[#01255e]'
                          }`}
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {selectedOption === 'Weekday is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if it is the selected day(s) of the week.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {weekdayOptions.map((day) => (
                        <button
                          key={day}
                          onClick={() => toggleWeekday(day)}
                          className={`px-6 py-5 rounded-xl border-2 text-[16px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
                            selectedWeekdays.includes(day)
                              ? 'bg-[#3e88f7] border-[#3e88f7] text-white shadow-[0_0_15px_rgba(62,136,247,0.3)]'
                              : 'bg-[#0F1117] border-[#013280] text-white hover:border-[#3e88f7] hover:bg-[#01255e]'
                          }`}
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {selectedOption === 'Time of day is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if it is between the selected start and end time of day.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>From</label>
                        <input
                          type="time"
                          value={timeFrom}
                          onChange={(e) => setTimeFrom(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>To</label>
                        <input
                          type="time"
                          value={timeTo}
                          onChange={(e) => setTimeTo(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Reservation duration is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest's reservation is within the selected duration. Specify either min, max, or both.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min days</label>
                        <input
                          type="number"
                          value={minDays}
                          onChange={(e) => setMinDays(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max days</label>
                        <input
                          type="number"
                          value={maxDays}
                          onChange={(e) => setMaxDays(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Guest count is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest count is within the selected range. Specify either min, max, or both.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min guests</label>
                        <input
                          type="number"
                          value={minGuests}
                          onChange={(e) => setMinGuests(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max guests</label>
                        <input
                          type="number"
                          value={maxGuests}
                          onChange={(e) => setMaxGuests(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Pet count is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest declared a number of pets within the selected range. Specify either min, max, or both.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min pets</label>
                        <input
                          type="number"
                          value={minPets}
                          onChange={(e) => setMinPets(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max pets</label>
                        <input
                          type="number"
                          value={maxPets}
                          onChange={(e) => setMaxPets(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Child count is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest declared a number of children within the selected range. Specify either min, max, or both.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min children</label>
                        <input
                          type="number"
                          value={minChildren}
                          onChange={(e) => setMinChildren(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max children</label>
                        <input
                          type="number"
                          value={maxChildren}
                          onChange={(e) => setMaxChildren(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Infant count is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest declared a number of infants within the selected range. Specify either min, max, or both.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min infants</label>
                        <input
                          type="number"
                          value={minInfants}
                          onChange={(e) => setMinInfants(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max infants</label>
                        <input
                          type="number"
                          value={maxInfants}
                          onChange={(e) => setMaxInfants(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Check-in day is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest's check-in day is this many days away. Specify either min, max, or both. Specify min 0 and max 0 to require check-in day today.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min days away</label>
                        <input
                          type="number"
                          value={minCheckInDays}
                          onChange={(e) => setMinCheckInDays(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max days away</label>
                        <input
                          type="number"
                          value={maxCheckInDays}
                          onChange={(e) => setMaxCheckInDays(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Check-out day is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if the guest's check-out day is this many days away. Specify either min, max, or both. Specify min 0 and max 0 to require check-out day today.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Min days away</label>
                        <input
                          type="number"
                          value={minCheckOutDays}
                          onChange={(e) => setMinCheckOutDays(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Max days away</label>
                        <input
                          type="number"
                          value={maxCheckOutDays}
                          onChange={(e) => setMaxCheckOutDays(e.target.value)}
                          className="w-full px-6 py-4 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Reservation dates contain...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message if this date is part of the guest's reservation.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="space-y-6">
                      <div>
                        <button
                          onClick={() => {}}
                          className="w-full text-left px-6 py-5 bg-[#17191f] border-2 border-[#013280] rounded-xl text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          <span>{reservationMonth || 'Month...'}</span>
                          <ChevronDown className="w-5 h-5" />
                        </button>
                      </div>
                      <div>
                        <label className="text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>Day of month</label>
                        <input
                          type="number"
                          value={reservationDayOfMonth}
                          onChange={(e) => setReservationDayOfMonth(e.target.value)}
                          className="w-full px-6 py-5 bg-[#17191f] border-2 border-[#013280] rounded-xl text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] focus:outline-none focus:border-[#3e88f7]"
                          style={{ fontVariationSettings: "'opsz' 14" }}
                          placeholder=""
                          min="1"
                          max="31"
                        />
                      </div>
                    </div>
                  </>
                )}

                {selectedOption === 'Sentiment is...' && (
                  <>
                    <p className="text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] mb-8 text-center" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Only send this message to a guest if their detected sentiment matches a criteria.
                    </p>

                    <div className="border-t border-[#013280]/40 mb-8"></div>

                    <div className="grid grid-cols-3 gap-4 mb-8">
                      {['Negative', 'Neutral', 'Positive'].map((sentiment) => (
                        <button
                          key={sentiment}
                          onClick={() => toggleSentiment(sentiment)}
                          className={`px-6 py-5 rounded-xl border-2 text-[16px] font-['DM_Sans:Medium',_sans-serif] transition-all ${
                            selectedSentiments.includes(sentiment)
                              ? 'bg-[#3e88f7] border-[#3e88f7] text-white shadow-[0_0_15px_rgba(62,136,247,0.3)]'
                              : 'bg-[#0F1117] border-[#013280] text-white hover:border-[#3e88f7] hover:bg-[#01255e]'
                          }`}
                          style={{ fontVariationSettings: "'opsz' 14" }}
                        >
                          {sentiment}
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {/* Cancel and Confirm buttons */}
                <div className="flex justify-center gap-4 mt-12">
                  <button
                    onClick={() => setSelectedOption(null)}
                    className="px-12 py-4 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="px-12 py-4 bg-[#3e88f7] text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] rounded-xl hover:bg-[#5a9bff] transition-all shadow-[0_0_20px_rgba(62,136,247,0.3)]"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <MinutConditionsModal
        isOpen={showMinutModal}
        onClose={() => setShowMinutModal(false)}
        onSelect={(condition) => {
          onSelect(condition);
          onClose();
        }}
      />
    </>
  );
}

interface FollowUpConditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

function FollowUpConditionModal({ isOpen, onClose, onSelect }: FollowUpConditionModalProps) {
  if (!isOpen) return null;

  const options = [
    'Only send the message if...',
    'Guest has not responded',
    'Reservation status is...',
    'Weekday is...',
    'Time of day is...',
    'Reservation duration is...',
    'Guest count is...',
    'Pet count is...',
    'Child count is...',
    'Infant count is...',
    'Check-in day is...',
    'Check-out day is...',
    'Reservation dates contain...',
    'Sentiment is...'
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-[600px] max-h-[600px] overflow-hidden"
        style={{ boxShadow: '0 0 40px rgba(30, 75, 158, 0.3)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#0F1117] border-b border-[#013280] px-6 py-4 flex items-center justify-between">
          <h3 className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
            Follow-Up Condition
          </h3>
          <button onClick={onClose} className="text-[#a6a9b2] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="bg-[#0F1117] p-6 max-h-[500px] overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`.overflow-y-auto::-webkit-scrollbar { display: none; }`}</style>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect(option);
                  onClose();
                }}
                className="w-full text-left px-5 py-4 bg-[#0F1117] hover:bg-[#01255e] transition-all text-white text-[15px] font-['DM_Sans:Medium',_sans-serif] rounded-lg border border-[#013280] hover:border-[#3e88f7] hover:shadow-[0_0_15px_rgba(62,136,247,0.2)]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

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

interface AddSmartTemplateProps {
  onBack: () => void;
  onSave: (templateData: Partial<Template>) => void;
  onDelete: (templateId: string) => void;
  editingTemplate?: Template | null;
}

export default function AddSmartTemplate({ onBack, onSave, onDelete, editingTemplate }: AddSmartTemplateProps) {
  const [templateName, setTemplateName] = useState('');
  const [enabled, setEnabled] = useState(false);
  const [message, setMessage] = useState('');
  const [sendWhen, setSendWhen] = useState('');
  const [sendIfConditions, setSendIfConditions] = useState<string[]>([]);
  const [aiCuratedChecking, setAiCuratedChecking] = useState(false);
  const [aiPersonalization, setAiPersonalization] = useState(false);
  const [showVariables, setShowVariables] = useState(false);
  const [showSendWhenModal, setShowSendWhenModal] = useState(false);
  const [showSendIfModal, setShowSendIfModal] = useState(false);
  const [showFollowUpConditionModal, setShowFollowUpConditionModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteSendIfConfirm, setShowDeleteSendIfConfirm] = useState(false);
  const [showDeleteFollowUpConfirm, setShowDeleteFollowUpConfirm] = useState(false);
  const [showDeleteFollowUpConditionConfirm, setShowDeleteFollowUpConditionConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{type: string; index?: number; followUpId?: string; conditionIndex?: number} | null>(null);
  const [currentFollowUpId, setCurrentFollowUpId] = useState<string | null>(null);
  const [followUps, setFollowUps] = useState<FollowUpMessage[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);

  // Load template data when editing
  useEffect(() => {
    if (editingTemplate) {
      setTemplateName(editingTemplate.title || '');
      setEnabled(editingTemplate.enabled || false);
      setMessage(editingTemplate.message || '');
      setSendWhen(editingTemplate.sendWhen || '');
      setSendIfConditions(editingTemplate.sendIfConditions || []);
      setAiCuratedChecking(editingTemplate.aiCuratedChecking || false);
      setAiPersonalization(editingTemplate.aiPersonalization || false);
      setFollowUps(editingTemplate.followUps || []);
      setSelectedProperties(editingTemplate.selectedProperties || []);
    } else {
      // Reset for new template
      setTemplateName('');
      setEnabled(false);
      setMessage('');
      setSendWhen('');
      setSendIfConditions([]);
      setAiCuratedChecking(false);
      setAiPersonalization(false);
      setFollowUps([]);
      setSelectedProperties([]);
    }
  }, [editingTemplate]);

  const variables = [
    'Guest name',
    'Property Name',
    'City',
    'Reservation Start Date',
    'Reservation End Date'
  ];

  const properties = [
    'Sunset Villa',
    'Ocean View Apartment',
    'Mountain Retreat',
    'Downtown Loft'
  ];

  const addFollowUp = () => {
    setFollowUps([...followUps, {
      id: Date.now().toString(),
      message: '',
      delay: 30,
      conditions: []
    }]);
  };

  const removeFollowUp = (id: string) => {
    setFollowUps(followUps.filter(f => f.id !== id));
  };

  const updateFollowUp = (id: string, field: string, value: any) => {
    setFollowUps(followUps.map(f => 
      f.id === id ? { ...f, [field]: value } : f
    ));
  };

  const addFollowUpCondition = (followUpId: string, condition: string) => {
    setFollowUps(followUps.map(f => 
      f.id === followUpId ? { ...f, conditions: [...f.conditions, condition] } : f
    ));
  };

  const removeFollowUpCondition = (followUpId: string, conditionIndex: number) => {
    setFollowUps(followUps.map(f => 
      f.id === followUpId ? { ...f, conditions: f.conditions.filter((_, i) => i !== conditionIndex) } : f
    ));
  };

  const handleAddFollowUpCondition = (followUpId: string) => {
    setCurrentFollowUpId(followUpId);
    setShowFollowUpConditionModal(true);
  };

  const handleSave = () => {
    if (templateName && message) {
      onSave({
        title: templateName,
        message: message,
        sendWhen: sendWhen,
        sendIfConditions: sendIfConditions,
        aiCuratedChecking: aiCuratedChecking,
        aiPersonalization: aiPersonalization,
        followUps: followUps,
        selectedProperties: selectedProperties,
        enabled: enabled
      });
      showSaveSuccess('Template saved successfully');
    } else {
      showSaveSuccess('Please fill in template name and message');
    }
  };

  const handleDelete = () => {
    if (editingTemplate) {
      onDelete(editingTemplate.id);
      showSaveSuccess('Template deleted successfully');
    }
  };

  const handleDeleteSendIf = () => {
    if (deleteTarget && deleteTarget.type === 'sendIf' && deleteTarget.index !== undefined) {
      setSendIfConditions(sendIfConditions.filter((_, i) => i !== deleteTarget.index));
      setDeleteTarget(null);
    }
  };

  const handleDeleteFollowUp = () => {
    if (deleteTarget && deleteTarget.type === 'followUp' && deleteTarget.followUpId) {
      removeFollowUp(deleteTarget.followUpId);
      setDeleteTarget(null);
    }
  };

  const handleDeleteFollowUpCondition = () => {
    if (deleteTarget && deleteTarget.type === 'followUpCondition' && deleteTarget.followUpId && deleteTarget.conditionIndex !== undefined) {
      removeFollowUpCondition(deleteTarget.followUpId, deleteTarget.conditionIndex);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="h-screen bg-[#0F1117] overflow-y-auto">
      <div className="max-w-[1400px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#3e88f7] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity mb-4"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Smart Templates
          </button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-white text-[40px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                {editingTemplate ? 'Edit Smart Template' : 'Add Smart Template'}
              </h1>
              <p className="text-[#3e88f7] text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Smart Template
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleSave}
                className="bg-[#01255e] text-white px-8 py-3 rounded-lg text-[16px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#013a8a] transition-colors border border-[#013280]"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Save
              </button>
              {editingTemplate && (
                <button 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-[#ef4444] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Delete Template
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#a6a9b2] text-[15px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed mb-8" style={{ fontVariationSettings: "'opsz' 14" }}>
          Smart Templates lets you create highly customized templated messages to suit your exact needs. Choose specific triggers, target recipients, and conditions, and use AI to analyze context to send to the right guests at the right time.
        </p>

        {/* Divider */}
        <div className="border-t border-[#013280] mb-8"></div>

        {/* Enable Toggle */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#013280]/40">
          <div>
            <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-1" style={{ fontVariationSettings: "'opsz' 14" }}>
              Enable Template
            </h3>
            <p className={`text-[14px] font-['DM_Sans:Regular',_sans-serif] ${enabled ? 'text-[#10b981]' : 'text-[#ef4444]'}`} style={{ fontVariationSettings: "'opsz' 14" }}>
              {enabled ? 'You currently have this template enabled' : 'You currently have this template disabled'}
            </p>
          </div>
          <button
            onClick={() => setEnabled(!enabled)}
            className={`w-14 h-7 rounded-full transition-all relative ${
              enabled ? 'bg-[#3e88f7]' : 'bg-[#676a73]'
            }`}
            style={enabled ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.4)' } : {}}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                enabled ? 'translate-x-7' : 'translate-x-0.5'
              }`}
            ></div>
          </button>
        </div>

        {/* Template Name and Properties */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <label className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
              Template Name
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter template name"
              className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-5 py-3.5 text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] placeholder-[#676A73] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7]/50 transition-all"
              style={{ fontVariationSettings: "'opsz' 14" }}
            />
          </div>

          <div>
            <label className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-3 block" style={{ fontVariationSettings: "'opsz' 14" }}>
              Applies to these properties
            </label>
            <div className="relative">
              <button
                onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-5 py-3.5 text-[#a6a9b2] text-[16px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between hover:border-[#3e88f7] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                <span>{selectedProperties.length > 0 ? `${selectedProperties.length} properties selected` : 'Select properties...'}</span>
                <ChevronDown className="w-5 h-5" />
              </button>
              {showPropertyDropdown && (
                <div className="absolute top-full mt-2 w-full bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-20" style={{ boxShadow: '0 0 20px rgba(30, 75, 158, 0.2)' }}>
                  <button 
                    onClick={() => {
                      if (selectedProperties.length === properties.length) {
                        setSelectedProperties([]);
                      } else {
                        setSelectedProperties(properties);
                      }
                    }}
                    className="w-full text-left px-4 py-3 text-[#3e88f7] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] border-b border-[#013280] hover:bg-[#01255e] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    {selectedProperties.length === properties.length ? 'Deselect all' : 'Select all'}
                  </button>
                  {properties.map((property, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (selectedProperties.includes(property)) {
                          setSelectedProperties(selectedProperties.filter(p => p !== property));
                        } else {
                          setSelectedProperties([...selectedProperties, property]);
                        }
                      }}
                      className="w-full text-left px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors flex items-center gap-3"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        selectedProperties.includes(property) ? 'bg-[#3e88f7] border-[#3e88f7]' : 'border-[#013280]'
                      }`}>
                        {selectedProperties.includes(property) && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      {property}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Send When */}
        <div className="mb-8 pb-8 border-b border-[#013280]/40">
          <label className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
            Send When...
          </label>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            This controls when the message will be sent to the guest.
          </p>
          {sendWhen ? (
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] flex items-center justify-between" style={{ fontVariationSettings: "'opsz' 14" }}>
                <span>{sendWhen}</span>
                <button 
                  onClick={() => setSendWhen('')}
                  className="text-[#ef4444] hover:opacity-80 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => setShowSendWhenModal(true)}
                className="text-[#98bffa] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors whitespace-nowrap"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Change Event
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowSendWhenModal(true)}
              className="text-[#98bffa] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              + Add an Event
            </button>
          )}
        </div>

        {/* Send If */}
        <div className="mb-8 pb-8 border-b border-[#013280]/40">
          <label className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2 block" style={{ fontVariationSettings: "'opsz' 14" }}>
            Send If...
          </label>
          <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
            Add conditions to restrict message sending. Templated message will only be sent if all these conditions are met for the message to be sent to them.
          </p>
          {sendIfConditions.length > 0 && (
            <div className="mb-4 space-y-2">
              {sendIfConditions.map((condition, index) => (
                <div key={index} className="bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    {condition}
                  </span>
                  <button 
                    onClick={() => {
                      setDeleteTarget({ type: 'sendIf', index });
                      setShowDeleteSendIfConfirm(true);
                    }}
                    className="text-[#ef4444] hover:opacity-80 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button 
            onClick={() => setShowSendIfModal(true)}
            className="text-[#98bffa] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            + Add a Condition
          </button>
        </div>

        {/* Message */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <label className="text-white text-[20px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Message
            </label>
            <div className="relative">
              <button 
                onClick={() => setShowVariables(!showVariables)}
                className="bg-[#01255e] border border-[#013280] rounded-lg px-5 py-2.5 text-white text-[15px] font-['DM_Sans:SemiBold',_sans-serif] flex items-center gap-2 hover:bg-[#013a8a] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                + Insert Variable
                <ChevronDown className="w-4 h-4" />
              </button>
              {showVariables && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0F1117] border-2 border-[#013280] rounded-lg overflow-hidden z-20" style={{ boxShadow: '0 0 20px rgba(1, 50, 128, 0.2)' }}>
                  <div className="p-3 border-b border-[#013280] bg-[#0F1117] text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Click on each variable to add it to your message
                  </div>
                  {variables.map((variable, index) => (
                    <button
                      key={index}
                      className="w-full text-left px-4 py-2.5 text-[#d0d3db] text-[15px] font-['DM_Sans:Regular',_sans-serif] hover:bg-[#01255e] transition-colors"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                      onClick={() => {
                        const varName = variable.toLowerCase().replace(/ /g, '_');
                        setMessage(prev => prev + `[[${varName}]]`);
                        setShowVariables(false);
                      }}
                    >
                      {variable}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
            className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-5 py-4 text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] placeholder-[#676A73] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7]/50 transition-all resize-none min-h-[200px]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          />
        </div>

        {/* Follow-up Messages */}
        {followUps.map((followUp, index) => (
          <div key={followUp.id} className="mb-8 pb-8 border-b border-[#013280]/40">
            <h3 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-4" style={{ fontVariationSettings: "'opsz' 14" }}>
              Follow-Up Message {index + 1}
            </h3>
            
            <textarea
              value={followUp.message}
              onChange={(e) => updateFollowUp(followUp.id, 'message', e.target.value)}
              placeholder="Enter your follow-up message here..."
              className="w-full bg-[#0F1117] border border-[#013280] rounded-lg px-5 py-4 text-white text-[16px] font-['DM_Sans:Regular',_sans-serif] placeholder-[#676A73] focus:outline-none focus:border-[#3e88f7] focus:ring-1 focus:ring-[#3e88f7]/50 transition-all resize-none min-h-[150px] mb-4"
              style={{ fontVariationSettings: "'opsz' 14" }}
            />

            <div className="flex items-center gap-3 mb-4 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              <span>Send this follow-up</span>
              <input
                type="number"
                value={followUp.delay}
                onChange={(e) => updateFollowUp(followUp.id, 'delay', parseInt(e.target.value))}
                className="bg-[#0F1117] border border-[#013280] rounded-lg px-3 py-2 text-white text-[15px] font-['DM_Sans:Regular',_sans-serif] w-20 focus:outline-none focus:border-[#3e88f7] transition-all"
                style={{ fontVariationSettings: "'opsz' 14" }}
              />
              <span>minutes after the previous message.</span>
            </div>

            <div className="mb-4">
              <h4 className="text-white text-[16px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                Only follow up if...
              </h4>
              {followUp.conditions.length > 0 ? (
                <div className="mb-3 space-y-2">
                  {followUp.conditions.map((condition, conditionIndex) => (
                    <div key={conditionIndex} className="bg-[#0F1117] border border-[#013280] rounded-lg px-4 py-3 flex items-center justify-between">
                      <span className="text-white text-[15px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        {condition}
                      </span>
                      <button 
                        onClick={() => {
                          setDeleteTarget({ type: 'followUpCondition', followUpId: followUp.id, conditionIndex });
                          setShowDeleteFollowUpConditionConfirm(true);
                        }}
                        className="text-[#ef4444] hover:opacity-80 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  No conditions set. This message will be always sent at the specified time after the first message, regardless of any conditions or guest response.
                </p>
              )}
              <button 
                onClick={() => handleAddFollowUpCondition(followUp.id)}
                className="text-[#98bffa] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                + Add a condition for following up
              </button>
            </div>

            <button 
              onClick={() => {
                setDeleteTarget({ type: 'followUp', followUpId: followUp.id });
                setShowDeleteFollowUpConfirm(true);
              }}
              className="text-[#ef4444] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Remove this follow-up
            </button>
          </div>
        ))}

        <button
          onClick={addFollowUp}
          className="text-[#98bffa] text-[16px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-[#3e88f7] transition-colors mb-8 block"
          style={{ fontVariationSettings: "'opsz' 14" }}
        >
          Add another follow-up...
        </button>

        {/* AI Options */}
        <div className="space-y-6 mb-8">
          {/* AI Context Checking */}
          <div className="flex items-start justify-between pb-6 border-b border-[#013280]/40">
            <div className="flex-1">
              <h4 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                Enable AI Context Checking
              </h4>
              <p className="text-[#a6a9b2] text-[15px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                If enabled, the AI will check all messages and conditions before sending. If the context doesn't apply to the guest, the AI will be cancelled.
              </p>
            </div>
            <button
              onClick={() => setAiCuratedChecking(!aiCuratedChecking)}
              className={`ml-6 w-14 h-7 rounded-full transition-all relative shrink-0 ${
                aiCuratedChecking ? 'bg-[#3e88f7]' : 'bg-[#676a73]'
              }`}
              style={aiCuratedChecking ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.4)' } : {}}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  aiCuratedChecking ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>

          {/* AI Personalization */}
          <div className="flex items-start justify-between pb-6 border-b border-[#013280]/40">
            <div className="flex-1">
              <h4 className="text-white text-[18px] font-['DM_Sans:Bold',_sans-serif] mb-2" style={{ fontVariationSettings: "'opsz' 14" }}>
                Enable AI Personalization
              </h4>
              <p className="text-[#a6a9b2] text-[15px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                If enabled, the AI will personalize the message to the guest's context and characteristics and add personal touches that are guaranteed to not change the meaning of the message.
              </p>
            </div>
            <button
              onClick={() => setAiPersonalization(!aiPersonalization)}
              className={`ml-6 w-14 h-7 rounded-full transition-all relative shrink-0 ${
                aiPersonalization ? 'bg-[#3e88f7]' : 'bg-[#676a73]'
              }`}
              style={aiPersonalization ? { boxShadow: '0 0 12px rgba(62, 136, 247, 0.4)' } : {}}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform ${
                  aiPersonalization ? 'translate-x-7' : 'translate-x-0.5'
                }`}
              ></div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pb-8">
          <button 
            onClick={handleSave}
            className="bg-[#01255e] text-white px-12 py-4 rounded-lg text-[18px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#013a8a] transition-colors border border-[#013280]"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Save Template
          </button>
        </div>
      </div>

      {/* Modals */}
      <SendWhenModal 
        isOpen={showSendWhenModal}
        onClose={() => setShowSendWhenModal(false)}
        onSelect={setSendWhen}
      />
      <SendIfModal 
        isOpen={showSendIfModal}
        onClose={() => setShowSendIfModal(false)}
        onSelect={(condition) => setSendIfConditions([...sendIfConditions, condition])}
      />
      <FollowUpConditionModal 
        isOpen={showFollowUpConditionModal}
        onClose={() => {
          setShowFollowUpConditionModal(false);
          setCurrentFollowUpId(null);
        }}
        onSelect={(condition) => {
          if (currentFollowUpId) {
            addFollowUpCondition(currentFollowUpId, condition);
          }
          setShowFollowUpConditionModal(false);
          setCurrentFollowUpId(null);
        }}
      />

      {/* Delete Confirmation Dialogs */}
      <DeleteConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Template"
        description={`Are you sure you want to delete "${templateName}"? This action cannot be undone.`}
      />

      <DeleteConfirmDialog
        isOpen={showDeleteSendIfConfirm}
        onClose={() => {
          setShowDeleteSendIfConfirm(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteSendIf}
        title="Delete Condition"
        description="Are you sure you want to delete this send condition? This action cannot be undone."
      />

      <DeleteConfirmDialog
        isOpen={showDeleteFollowUpConfirm}
        onClose={() => {
          setShowDeleteFollowUpConfirm(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteFollowUp}
        title="Delete Follow-Up Message"
        description="Are you sure you want to delete this follow-up message? This action cannot be undone."
      />

      <DeleteConfirmDialog
        isOpen={showDeleteFollowUpConditionConfirm}
        onClose={() => {
          setShowDeleteFollowUpConditionConfirm(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleDeleteFollowUpCondition}
        title="Delete Follow-Up Condition"
        description="Are you sure you want to delete this follow-up condition? This action cannot be undone."
      />
    </div>
  );
}
