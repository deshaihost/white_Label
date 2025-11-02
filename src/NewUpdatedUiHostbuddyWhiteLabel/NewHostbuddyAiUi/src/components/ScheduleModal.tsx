import { useState, useEffect } from 'react';
import { X, Clock, Trash2, Plus, Calendar } from 'lucide-react';
import CopyScheduleModal from './CopyScheduleModal';
import TimeInput from './TimeInput';
import { showSaveSuccess } from './useSaveNotification';

type Stage = 'future' | 'current' | 'inquiry';

type TimeBlock = {
  id: string;
  startTime: string;
  endTime: string;
  stages: Stage[];
};

type DaySchedule = {
  enabled: boolean;
  timeBlocks: TimeBlock[];
};

type WeekSchedule = {
  [key: string]: DaySchedule;
};

type DateRange = {
  id: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  stages: Stage[];
};

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const HOURS = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const MINUTES = ['00', '15', '30', '45', '59'];
const PERIODS = ['AM', 'PM'];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to parse time string into components
const parseTime = (timeStr: string) => {
  const match = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/);
  if (!match) return { hour: '9', minute: '00', period: 'AM' };
  return { hour: match[1], minute: match[2], period: match[3] };
};

// Helper to format time components into string
const formatTime = (hour: string, minute: string, period: string) => {
  return `${hour}:${minute} ${period}`;
};

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  propertyId?: number;
  onSave?: (hasActiveSchedule: boolean) => void;
  importedProperties?: Array<{ id: number; name: string }>;
}

// Removed old TimePicker - now using TimeInput component

export default function ScheduleModal({ isOpen, onClose, propertyName, propertyId, onSave, importedProperties = [] }: ScheduleModalProps) {
  const [activeView, setActiveView] = useState<'recurring' | 'duration'>('recurring');
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [schedule, setSchedule] = useState<WeekSchedule>({
    Monday: { enabled: false, timeBlocks: [] },
    Tuesday: { enabled: false, timeBlocks: [] },
    Wednesday: { enabled: false, timeBlocks: [] },
    Thursday: { enabled: false, timeBlocks: [] },
    Friday: { enabled: false, timeBlocks: [] },
    Saturday: { enabled: false, timeBlocks: [] },
    Sunday: { enabled: false, timeBlocks: [] },
  });

  const [dateRanges, setDateRanges] = useState<DateRange[]>([]);

  // Load saved schedule when modal opens
  useEffect(() => {
    if (isOpen && propertyId) {
      const schedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
      const savedSchedule = schedules[propertyId];
      
      if (savedSchedule) {
        if (savedSchedule.weeklySchedule) {
          setSchedule(savedSchedule.weeklySchedule);
        }
        if (savedSchedule.dateRanges) {
          setDateRanges(savedSchedule.dateRanges);
        }
      }
    }
  }, [isOpen, propertyId]);

  const handleCopySchedule = (propertyIds: number[], timezoneOption: 'actual' | 'relative') => {
    if (!propertyId) return;

    // Get the current property's schedule
    const schedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
    const currentSchedule = {
      weeklySchedule: schedule,
      dateRanges: dateRanges
    };

    // Check if there's an active schedule to copy
    const hasActiveSchedule = Object.values(schedule).some(
      (day: any) => day.enabled && day.timeBlocks.length > 0
    ) || dateRanges.length > 0;

    // Copy the schedule to selected properties
    propertyIds.forEach(targetPropertyId => {
      schedules[targetPropertyId] = { ...currentSchedule };
    });
    localStorage.setItem('propertySchedules', JSON.stringify(schedules));

    // Update property statuses to "responding" if there's an active schedule
    if (hasActiveSchedule) {
      const properties = JSON.parse(localStorage.getItem('properties') || '[]');
      const updatedProperties = properties.map((p: any) =>
        propertyIds.includes(p.id) ? { ...p, isActive: true } : p
      );
      localStorage.setItem('properties', JSON.stringify(updatedProperties));

      // Trigger onSave to update parent component state if needed
      onSave?.(hasActiveSchedule);
    }
  };

  const toggleDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        timeBlocks: !prev[day].enabled && prev[day].timeBlocks.length === 0 
          ? [{ id: generateId(), startTime: '9:00 AM', endTime: '5:00 PM', stages: ['future', 'current', 'inquiry'] }]
          : prev[day].timeBlocks
      }
    }));
  };

  const toggleStage = (day: string, blockId: string, stage: Stage) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeBlocks: prev[day].timeBlocks.map(block => 
          block.id === blockId
            ? {
                ...block,
                stages: block.stages.includes(stage)
                  ? block.stages.filter(s => s !== stage)
                  : [...block.stages, stage]
              }
            : block
        )
      }
    }));
  };

  const addTimeBlock = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeBlocks: [...prev[day].timeBlocks, { id: generateId(), startTime: '9:00 AM', endTime: '5:00 PM', stages: ['future', 'current', 'inquiry'] }]
      }
    }));
  };

  const removeTimeBlock = (day: string, blockId: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeBlocks: prev[day].timeBlocks.filter(block => block.id !== blockId)
      }
    }));
  };

  const updateTimeBlock = (day: string, blockId: string, field: 'startTime' | 'endTime', value: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeBlocks: prev[day].timeBlocks.map(block =>
          block.id === blockId
            ? { ...block, [field]: value }
            : block
        )
      }
    }));
  };

  const clearAll = () => {
    if (activeView === 'recurring') {
      const clearedSchedule: WeekSchedule = {};
      DAYS.forEach(day => {
        clearedSchedule[day] = { enabled: false, timeBlocks: [] };
      });
      setSchedule(clearedSchedule);
    } else {
      setDateRanges([]);
    }
  };

  const setAllDay = (day: string) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        enabled: true,
        timeBlocks: [{ id: generateId(), startTime: '12:00 AM', endTime: '11:59 PM', stages: ['future', 'current', 'inquiry'] }]
      }
    }));
  };

  const set247 = () => {
    const allDaySchedule: WeekSchedule = {};
    DAYS.forEach(day => {
      allDaySchedule[day] = {
        enabled: true,
        timeBlocks: [{ id: generateId(), startTime: '12:00 AM', endTime: '11:59 PM', stages: ['future', 'current', 'inquiry'] }]
      };
    });
    setSchedule(allDaySchedule);
  };

  const addDateRange = () => {
    const today = new Date().toISOString().split('T')[0];
    setDateRanges(prev => [...prev, {
      id: generateId(),
      startDate: today,
      endDate: today,
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      stages: ['future', 'current', 'inquiry']
    }]);
  };

  const removeDateRange = (id: string) => {
    setDateRanges(prev => prev.filter(range => range.id !== id));
  };

  const toggleDateRangeStage = (id: string, stage: Stage) => {
    setDateRanges(prev => prev.map(range =>
      range.id === id
        ? {
            ...range,
            stages: range.stages.includes(stage)
              ? range.stages.filter(s => s !== stage)
              : [...range.stages, stage]
          }
        : range
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1117] border-2 border-[#013280] rounded-xl w-full max-w-[1000px] max-h-[90vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#013280]">
          <div>
            <h2 className="text-white text-[24px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Schedule
            </h2>
            <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
              {propertyName}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#17191f] rounded-lg p-1">
              <button
                onClick={() => setActiveView('recurring')}
                className={`px-4 py-2 rounded-md text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                  activeView === 'recurring'
                    ? 'bg-[#3e88f7] text-white'
                    : 'text-[#a6a9b2] hover:text-white'
                }`}
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Recurring
              </button>
              <button
                onClick={() => setActiveView('duration')}
                className={`px-4 py-2 rounded-md text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-all ${
                  activeView === 'duration'
                    ? 'bg-[#3e88f7] text-white'
                    : 'text-[#a6a9b2] hover:text-white'
                }`}
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Duration
              </button>
            </div>
            <button
              onClick={onClose}
              className="text-[#a6a9b2] hover:text-white transition-colors p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeView === 'recurring' && (
            <div key="recurring-view" className="flex gap-6">
            {/* Main Schedule Area */}
            <div className="flex-1">
              {/* 24/7 Button */}
              <div className="mb-4 flex justify-end">
                <button
                  onClick={set247}
                  className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-5 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors shadow-[0_0_15px_rgba(62,136,247,0.3)]"
                  style={{ fontVariationSettings: "'opsz' 14" }}
                >
                  Set 24/7
                </button>
              </div>

              <div className="space-y-3">
                {DAYS.map(day => (
                  <div key={day} className="bg-[#17191f] border border-[#013280] rounded-lg p-4">
                    {/* Day Header */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        onClick={() => toggleDay(day)}
                        className="flex items-center gap-3"
                      >
                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          schedule[day].enabled
                            ? 'bg-[#3e88f7] border-[#3e88f7]'
                            : 'border-[#676a73]'
                        }`}>
                          {schedule[day].enabled && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <span className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          {day}
                        </span>
                      </button>
                      {schedule[day].enabled && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setAllDay(day)}
                            className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            All Day
                          </button>
                          <button
                            onClick={() => addTimeBlock(day)}
                            className="text-[#3e88f7] text-[13px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity flex items-center gap-1"
                            style={{ fontVariationSettings: "'opsz' 14" }}
                          >
                            <Clock className="w-4 h-4" />
                            Add Time
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Time Blocks */}
                    {schedule[day].enabled && schedule[day].timeBlocks.length > 0 && (
                      <div className="space-y-2">
                        {schedule[day].timeBlocks.map(block => (
                          <div
                            key={block.id}
                            className="bg-[#0F1117] border border-[#013280] rounded-lg p-3 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-4">
                              {/* Time Selectors */}
                              <div className="flex items-center gap-2">
                                <TimeInput 
                                  value={block.startTime}
                                  onChange={(time) => updateTimeBlock(day, block.id, 'startTime', time)}
                                />
                                <span className="text-[#676a73]">–</span>
                                <TimeInput 
                                  value={block.endTime}
                                  onChange={(time) => updateTimeBlock(day, block.id, 'endTime', time)}
                                />
                              </div>
                              
                              {/* Stage Toggles */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => toggleStage(day, block.id, 'future')}
                                  className={`w-6 h-6 rounded-full transition-all ${
                                    block.stages.includes('future') ? 'bg-[#3e88f7]' : 'bg-[#013280]'
                                  } hover:scale-110`}
                                  title="Future reservations"
                                />
                                <button
                                  onClick={() => toggleStage(day, block.id, 'current')}
                                  className={`w-6 h-6 rounded-full transition-all ${
                                    block.stages.includes('current') ? 'bg-[#4ade80]' : 'bg-[#013280]'
                                  } hover:scale-110`}
                                  title="Current reservations"
                                />
                                <button
                                  onClick={() => toggleStage(day, block.id, 'inquiry')}
                                  className={`w-6 h-6 rounded-full transition-all ${
                                    block.stages.includes('inquiry') ? 'bg-[#fbbf24]' : 'bg-[#013280]'
                                  } hover:scale-110`}
                                  title="Inquiry/Past reservations"
                                />
                              </div>
                            </div>
                            {schedule[day].timeBlocks.length > 1 && (
                              <button
                                onClick={() => removeTimeBlock(day, block.id)}
                                className="text-[#676a73] hover:text-[#d4183d] transition-colors p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Disabled State */}
                    {!schedule[day].enabled && (
                      <div className="text-center py-2">
                        <span className="text-[#676a73] text-[13px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Not active
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend Sidebar */}
            <div className="w-[240px] flex-shrink-0">
              <div className="bg-[#17191f] border border-[#013280] rounded-lg p-5 sticky top-0">
                <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Reservation Stages
                </h3>
                <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-4 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                  Select which guest stages HostBuddy should respond to during each time block:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#3e88f7] flex-shrink-0" />
                    <div>
                      <p className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Future
                      </p>
                      <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Upcoming reservations
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4ade80] flex-shrink-0" />
                    <div>
                      <p className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Current
                      </p>
                      <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Active check-ins
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#fbbf24] flex-shrink-0" />
                    <div>
                      <p className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Inquiry/Past
                      </p>
                      <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                        Leads & past guests
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#013280]">
                  <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                    <span className="text-white font-['DM_Sans:SemiBold',_sans-serif]">Tip:</span> Click the colored dots to toggle stages on/off for each time block.
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
          {activeView === 'duration' && (
            /* Month View - Date Range Scheduling */
            <div key="duration-view" className="flex gap-6">
              {/* Date Ranges Area */}
              <div className="flex-1">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Date-Specific Schedules
                    </h3>
                    <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Set up temporary schedules for specific date ranges
                    </p>
                  </div>
                  <button
                    onClick={addDateRange}
                    className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-4 py-2 rounded-lg text-[13px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors flex items-center gap-2"
                    style={{ fontVariationSettings: "'opsz' 14" }}
                  >
                    <Plus className="w-4 h-4" />
                    Add Date Range
                  </button>
                </div>

                {dateRanges.length === 0 ? (
                  <div className="bg-[#17191f] border-2 border-dashed border-[#013280] rounded-lg p-12 text-center">
                    <Calendar className="w-12 h-12 text-[#676a73] mx-auto mb-3" />
                    <p className="text-[#a6a9b2] text-[14px] font-['DM_Sans:Medium',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                      No date-specific schedules yet
                    </p>
                    <p className="text-[#676a73] text-[12px] font-['DM_Sans:Regular',_sans-serif] mt-1" style={{ fontVariationSettings: "'opsz' 14" }}>
                      Click "Add Date Range" to create a temporary schedule
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {dateRanges.map(range => (
                      <div key={range.id} className="bg-[#17191f] border border-[#013280] rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[#a6a9b2] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] mb-1 block uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={range.startDate}
                                onChange={(e) => setDateRanges(prev => prev.map(r =>
                                  r.id === range.id ? { ...r, startDate: e.target.value } : r
                                ))}
                                className="w-full bg-[#0F1117] border border-[#013280] rounded px-3 py-2 text-white text-[13px]"
                              />
                            </div>
                            <div>
                              <label className="text-[#a6a9b2] text-[11px] font-['DM_Sans:SemiBold',_sans-serif] mb-1 block uppercase" style={{ fontVariationSettings: "'opsz' 14" }}>
                                End Date
                              </label>
                              <input
                                type="date"
                                value={range.endDate}
                                onChange={(e) => setDateRanges(prev => prev.map(r =>
                                  r.id === range.id ? { ...r, endDate: e.target.value } : r
                                ))}
                                className="w-full bg-[#0F1117] border border-[#013280] rounded px-3 py-2 text-white text-[13px]"
                              />
                            </div>
                          </div>
                          <button
                            onClick={() => removeDateRange(range.id)}
                            className="text-[#676a73] hover:text-[#d4183d] transition-colors p-1 ml-3"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="bg-[#0F1117] border border-[#013280] rounded-lg p-3 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Time Selectors */}
                            <div className="flex items-center gap-2">
                              <TimeInput 
                                value={range.startTime}
                                onChange={(time) => setDateRanges(prev => prev.map(r =>
                                  r.id === range.id ? { ...r, startTime: time } : r
                                ))}
                              />
                              <span className="text-[#676a73]">–</span>
                              <TimeInput 
                                value={range.endTime}
                                onChange={(time) => setDateRanges(prev => prev.map(r =>
                                  r.id === range.id ? { ...r, endTime: time } : r
                                ))}
                              />
                            </div>
                            
                            {/* Stage Toggles */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleDateRangeStage(range.id, 'future')}
                                className={`w-6 h-6 rounded-full transition-all ${
                                  range.stages.includes('future') ? 'bg-[#3e88f7]' : 'bg-[#013280]'
                                } hover:scale-110`}
                                title="Future reservations"
                              />
                              <button
                                onClick={() => toggleDateRangeStage(range.id, 'current')}
                                className={`w-6 h-6 rounded-full transition-all ${
                                  range.stages.includes('current') ? 'bg-[#4ade80]' : 'bg-[#013280]'
                                } hover:scale-110`}
                                title="Current reservations"
                              />
                              <button
                                onClick={() => toggleDateRangeStage(range.id, 'inquiry')}
                                className={`w-6 h-6 rounded-full transition-all ${
                                  range.stages.includes('inquiry') ? 'bg-[#fbbf24]' : 'bg-[#013280]'
                                } hover:scale-110`}
                                title="Inquiry/Past reservations"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Legend Sidebar - Same as schedule view */}
              <div className="w-[240px] flex-shrink-0">
                <div className="bg-[#17191f] border border-[#013280] rounded-lg p-5 sticky top-0">
                  <h3 className="text-white text-[16px] font-['DM_Sans:SemiBold',_sans-serif] mb-3" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Reservation Stages
                  </h3>
                  <p className="text-[#a6a9b2] text-[13px] font-['DM_Sans:Regular',_sans-serif] mb-4 leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                    Select which guest stages HostBuddy should respond to during each date range:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#3e88f7] flex-shrink-0" />
                      <div>
                        <p className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Future
                        </p>
                        <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Upcoming reservations
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#4ade80] flex-shrink-0" />
                      <div>
                        <p className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Current
                        </p>
                        <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Active check-ins
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#fbbf24] flex-shrink-0" />
                      <div>
                        <p className="text-white text-[13px] font-['DM_Sans:SemiBold',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Inquiry/Past
                        </p>
                        <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
                          Leads & past guests
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#013280]">
                    <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif] leading-relaxed" style={{ fontVariationSettings: "'opsz' 14" }}>
                      <span className="text-white font-['DM_Sans:SemiBold',_sans-serif]">Use case:</span> Set up temporary schedules for holidays, vacations, or special events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#013280] px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={clearAll}
              className="text-[#d4183d] text-[14px] font-['DM_Sans:SemiBold',_sans-serif] hover:opacity-80 transition-opacity"
              style={{ fontVariationSettings: "'opsz' 14" }}
            >
              Clear All
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => setCopyModalOpen(true)}
                className="bg-[#17191f] hover:bg-[#17191f] text-white border border-[#013280] px-5 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Copy to Properties
              </button>
              <button
                onClick={() => {
                  // Save schedule to localStorage
                  let hasActiveSchedule = false;
                  if (propertyId) {
                    const schedules = JSON.parse(localStorage.getItem('propertySchedules') || '{}');
                    schedules[propertyId] = {
                      weeklySchedule: schedule,
                      dateRanges: dateRanges
                    };
                    localStorage.setItem('propertySchedules', JSON.stringify(schedules));
                    
                    // Check if any schedule is active (has enabled days with time blocks)
                    hasActiveSchedule = Object.values(schedule).some(
                      (day: any) => day.enabled && day.timeBlocks.length > 0
                    ) || dateRanges.length > 0;
                    
                    // Update property status based on whether there's an active schedule
                    const properties = JSON.parse(localStorage.getItem('properties') || '[]');
                    const updatedProperties = properties.map((p: any) =>
                      p.id === propertyId ? { ...p, isActive: hasActiveSchedule } : p
                    );
                    localStorage.setItem('properties', JSON.stringify(updatedProperties));
                  }
                  onSave?.(hasActiveSchedule);
                  showSaveSuccess('Schedule saved successfully');
                  onClose();
                }}
                className="bg-[#3e88f7] hover:bg-[#5296f8] text-white px-6 py-2.5 rounded-lg text-[14px] font-['DM_Sans:SemiBold',_sans-serif] transition-colors"
                style={{ fontVariationSettings: "'opsz' 14" }}
              >
                Save Schedule
              </button>
            </div>
          </div>
          <div className="text-center">
            <p className="text-[#676a73] text-[11px] font-['DM_Sans:Regular',_sans-serif]" style={{ fontVariationSettings: "'opsz' 14" }}>
              Time zone: America/New_York (EST) • Changes save automatically
            </p>
          </div>
        </div>
      </div>

      {/* Copy Schedule Modal */}
      <CopyScheduleModal
        isOpen={copyModalOpen}
        onClose={() => setCopyModalOpen(false)}
        currentPropertyId={propertyId}
        importedProperties={importedProperties}
        onCopy={handleCopySchedule}
      />
    </div>
  );
}
