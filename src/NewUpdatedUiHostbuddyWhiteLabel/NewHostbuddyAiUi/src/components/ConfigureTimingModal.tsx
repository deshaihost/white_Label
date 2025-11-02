import { useState } from 'react';
import { X, ChevronDown, Clock } from 'lucide-react';
import TimeInput from './TimeInput';

interface TimeRange {
  enabled: boolean;
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  [key: string]: TimeRange;
}

interface ConfigureTimingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (properties: string[], schedule: DaySchedule) => void;
  configName: string;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AVAILABLE_PROPERTIES = [
  'Leo 506',
  '1B1 Adams - 8',
  '1B1 Adams - 4',
  '831 B',
  'Leo 403',
  '1B1 Adams - 10',
  '4183',
  'Leo 401',
  'Leo 601'
];

const TIME_PRESETS = [
  { name: 'Business Hours', start: '9:00 AM', end: '5:00 PM' },
  { name: '24/7', start: '12:00 AM', end: '11:59 PM' },
  { name: 'Overnight', start: '10:00 PM', end: '6:00 AM' },
];

export default function ConfigureTimingModal({ isOpen, onClose, onSave, configName }: ConfigureTimingModalProps) {
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showPresetMenu, setShowPresetMenu] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule>(
    DAYS.reduce((acc, day) => ({
      ...acc,
      [day]: { enabled: true, startTime: '12:00 AM', endTime: '11:59 PM' }
    }), {})
  );

  if (!isOpen) return null;

  const toggleProperty = (property: string) => {
    setSelectedProperties(prev =>
      prev.includes(property)
        ? prev.filter(p => p !== property)
        : [...prev, property]
    );
  };

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], enabled: !prev[day].enabled }
    }));
  };

  const updateTime = (day: string, field: 'startTime' | 'endTime', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }));
  };

  const handleClearAll = () => {
    setSchedule(
      DAYS.reduce((acc, day) => ({
        ...acc,
        [day]: { enabled: false, startTime: '12:00 AM', endTime: '11:59 PM' }
      }), {})
    );
  };

  const handleSelectAll = () => {
    setSelectedProperties([...AVAILABLE_PROPERTIES]);
  };

  const handleDeselectAll = () => {
    setSelectedProperties([]);
  };

  const removeProperty = (property: string) => {
    setSelectedProperties(prev => prev.filter(p => p !== property));
  };

  const applyPreset = (preset: typeof TIME_PRESETS[0]) => {
    const enabledDays = DAYS.filter(day => schedule[day].enabled);
    if (enabledDays.length === 0) return;

    setSchedule(prev => {
      const updated = { ...prev };
      enabledDays.forEach(day => {
        updated[day] = { ...updated[day], startTime: preset.start, endTime: preset.end };
      });
      return updated;
    });
    setShowPresetMenu(false);
  };

  const handleSave = () => {
    onSave(selectedProperties, schedule);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div 
        className="bg-[#0F1117] border-2 border-[#013280] rounded-2xl w-[820px] max-h-[90vh] overflow-hidden"
        style={{ boxShadow: '0 0 50px rgba(62, 136, 247, 0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-b from-[#17191f] to-[#0F1117] border-b border-[#013280] px-8 py-5 flex items-center justify-between">
          <div>
            <h3 className="text-white text-[24px] font-['DM_Sans:Bold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              {configName}
            </h3>
            <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif] mt-1.5" style={{ fontVariationSettings: "'opsz' 14" }}>
              Configure properties and timing for this configuration
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="text-[#a6a9b2] hover:text-white transition-colors p-2 hover:bg-[#17191f] rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0F1117] p-8 max-h-[calc(90vh-200px)] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#013280 #0F1117' }}>
          
          {/* Property Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <label className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Applies to these properties:
              </label>
              {selectedProperties.length > 0 && (
                <div className="flex gap-2">
                  <button
                    onClick={handleSelectAll}
                    className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#3e88f7] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Select All
                  </button>
                  <span className="text-[#676a73]">|</span>
                  <button
                    onClick={handleDeselectAll}
                    className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#3e88f7] transition-colors"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Selected Properties Pills */}
            {selectedProperties.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProperties.map(property => (
                  <div 
                    key={property}
                    className="bg-[#17191f] border border-[#013280] rounded-lg px-3 py-1.5 flex items-center gap-2 group hover:border-[#3e88f7] transition-colors"
                  >
                    <span className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      {property}
                    </span>
                    <button
                      onClick={() => removeProperty(property)}
                      className="text-[#a6a9b2] hover:text-[#ef4444] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                className="w-full bg-[#17191f] border-2 border-[#013280] rounded-lg px-4 py-3.5 text-left flex items-center justify-between hover:border-[#3e88f7] transition-all"
                style={{ boxShadow: showPropertyDropdown ? '0 0 0 3px rgba(62, 136, 247, 0.1)' : 'none' }}
              >
                <span className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                  {selectedProperties.length === 0 
                    ? 'Select properties...' 
                    : `${selectedProperties.length} ${selectedProperties.length === 1 ? 'property' : 'properties'} selected`}
                </span>
                <ChevronDown className={`w-5 h-5 text-[#a6a9b2] transition-transform ${showPropertyDropdown ? 'rotate-180' : ''}`} />
              </button>

              {showPropertyDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#17191f] border-2 border-[#013280] rounded-lg overflow-hidden z-10" style={{ boxShadow: '0 0 30px rgba(62, 136, 247, 0.15)' }}>
                  <div className="border-b border-[#013280] px-4 py-2.5 flex gap-3">
                    <button
                      onClick={handleSelectAll}
                      className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#3e88f7] transition-colors"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      Select All
                    </button>
                    <span className="text-[#676a73]">|</span>
                    <button
                      onClick={handleDeselectAll}
                      className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#3e88f7] transition-colors"
                      style={{ fontVariationSettings: "'opsz' 14" }}
                    >
                      Deselect All
                    </button>
                  </div>
                  <div className="max-h-[240px] overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#013280 #17191f' }}>
                    {AVAILABLE_PROPERTIES.map((property) => (
                      <button
                        key={property}
                        onClick={() => toggleProperty(property)}
                        className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#0F1117] transition-colors border-b border-[#013280] last:border-0"
                      >
                        <div className={`w-[18px] h-[18px] rounded border-2 flex items-center justify-center transition-all ${
                          selectedProperties.includes(property) 
                            ? 'bg-[#3e88f7] border-[#3e88f7]' 
                            : 'border-[#676a73] hover:border-[#98bffa]'
                        }`}>
                          {selectedProperties.includes(property) && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-[14px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {property}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configure Timing */}
          <div>
            <div className="flex items-center justify-between mb-5">
              <label className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                Configure Timing:
              </label>
              <div className="relative">
                <button
                  onClick={() => setShowPresetMenu(!showPresetMenu)}
                  className="text-[#98bffa] text-[13px] font-['DM_Sans:Medium',_sans-serif] hover:text-[#3e88f7] transition-colors flex items-center gap-1.5"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  <Clock className="w-4 h-4" />
                  Quick Presets
                </button>
                {showPresetMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-[#17191f] border-2 border-[#013280] rounded-lg overflow-hidden z-10 min-w-[160px]" style={{ boxShadow: '0 0 20px rgba(62, 136, 247, 0.15)' }}>
                    {TIME_PRESETS.map(preset => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(preset)}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#0F1117] transition-colors border-b border-[#013280] last:border-0"
                      >
                        <div className="text-white text-[13px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {preset.name}
                        </div>
                        <div className="text-[#a6a9b2] text-[11px] font-['DM_Sans:Regular',_sans-serif] mt-0.5" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {preset.start} - {preset.end}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2.5">
              {DAYS.map((day) => (
                <div key={day} className="bg-[#17191f] border border-[#013280] rounded-lg p-4 hover:border-[#013280] transition-colors">
                  <div className="flex items-center gap-4">
                    {/* Day Toggle */}
                    <div className="flex items-center gap-3 w-[140px]">
                      <button
                        onClick={() => toggleDay(day)}
                        className={`relative w-12 h-6 rounded-full transition-all ${
                          schedule[day].enabled
                            ? 'bg-[#3e88f7]'
                            : 'bg-[#676a73]'
                        }`}
                        style={{ boxShadow: schedule[day].enabled ? '0 0 10px rgba(62, 136, 247, 0.3)' : 'none' }}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
                          schedule[day].enabled ? 'left-[26px]' : 'left-0.5'
                        }`} />
                      </button>
                      <span className={`text-[14px] font-['DM_Sans:Medium',_sans-serif] transition-colors ${
                        schedule[day].enabled ? 'text-white' : 'text-[#6b7280]'
                      }`} style={{ fontVariationSettings: "'opsz' 14" }}>
                        {day}
                      </span>
                    </div>

                    {/* Time Inputs */}
                    <div className={`flex-1 flex items-center gap-3 transition-opacity ${!schedule[day].enabled ? 'opacity-30 pointer-events-none' : ''}`}>
                      <div className="flex items-center gap-3 flex-1">
                        <TimeInput
                          value={schedule[day].startTime}
                          onChange={(value) => updateTime(day, 'startTime', value)}
                          disabled={!schedule[day].enabled}
                        />
                        <span className="text-[#6b7280] text-[18px]">—</span>
                        <TimeInput
                          value={schedule[day].endTime}
                          onChange={(value) => updateTime(day, 'endTime', value)}
                          disabled={!schedule[day].enabled}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-t from-[#17191f] to-[#0F1117] border-t border-[#013280] px-8 py-5 flex justify-between items-center">
          <button
            onClick={handleClearAll}
            className="text-[#ef4444] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#17191f] px-4 py-2 rounded-lg transition-all"
            style={{ fontVariationSettings: "'opsz' 14" }}
          >
            Clear All Days
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-[#a6a9b2] text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:text-white hover:bg-[#17191f] rounded-lg transition-all"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#01255e] text-white px-8 py-2.5 rounded-lg text-[15px] font-['DM_Sans:SemiBold',_sans-serif] hover:bg-[#013a8a] transition-all border border-[#013280]"
              style={{ 
                fontVariationSettings: "'opsz' 14",
                boxShadow: '0 0 20px rgba(62, 136, 247, 0.2)'
              }}
            >
              Add Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
