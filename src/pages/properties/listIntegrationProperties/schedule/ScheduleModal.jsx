import { useState, useEffect } from 'react';
import { X, Clock, Trash2, Plus, Calendar } from '../../../../components/Icons';
import CopyScheduleModal from './CopyScheduleModal';
import TimeInput from './TimeInput';
import ToastHandle from '../../../../helper/ToastMessage';
import axios from 'axios';
import './scheduleModal.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const generateId = () => Math.random().toString(36).substr(2, 9);

// Helper to convert 24h time string (HH:MM format) to 12h format (h:MM AM/PM)
const convertTo12Hour = (time24) => {
  if (!time24) return '12:00 AM';
  const [hours, minutes] = time24.split(':').map(num => parseInt(num, 10));
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
};

// Helper to convert 12h time string (h:MM AM/PM) to 24h format (HH:MM)
const convertTo24Hour = (time12) => {
  if (!time12) return '00:00';
  const match = time12.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return '00:00';
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  const period = match[3].toUpperCase();
  
  if (period === 'PM' && hours !== 12) {
    hours += 12;
  } else if (period === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return `${hours.toString().padStart(2, '0')}:${minutes}`;
};

const ScheduleModal = ({ isOpen, onClose, propertyName, allProperties = [], currTimeZone }) => {
  const [activeView, setActiveView] = useState('recurring');
  const [copyModalOpen, setCopyModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [schedule, setSchedule] = useState({});
  const [dateRanges, setDateRanges] = useState([]);

  // Map API stage names to internal stage names
  const mapStageFromAPI = (apiStage) => {
    const mapping = {
      'FUTURE': 'future',
      'CURRENT': 'current',
      'INQUIRY/PAST': 'inquiry'
    };
    return mapping[apiStage] || apiStage.toLowerCase();
  };

  const mapStageToAPI = (internalStage) => {
    const mapping = {
      'future': 'FUTURE',
      'current': 'CURRENT',
      'inquiry': 'INQUIRY/PAST'
    };
    return mapping[internalStage] || internalStage.toUpperCase();
  };

  // Load saved schedule when modal opens
  useEffect(() => {
    if (isOpen && propertyName) {
      fetchSchedule();
    }
  }, [isOpen, propertyName]);

  const fetchSchedule = async () => {
    setLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = { headers: { "X-API-Key": API_KEY } };
      const response = await axios.get(`${baseUrl}/properties/${propertyName}/get_schedule`, config);

      if (response.data && response.data.schedules) {
        const apiSchedule = response.data.schedules.weekly;
        const convertedSchedule = {};

        // Convert API schedule format to component format
        DAYS.forEach(day => {
          const dayLower = day.toLowerCase();
          convertedSchedule[day] = { enabled: false, timeBlocks: [] };

          // Check if any stage has times for this day
          const hasAnyTimes = ['FUTURE', 'CURRENT', 'INQUIRY/PAST'].some(stage => 
            apiSchedule[stage] && apiSchedule[stage][dayLower] && apiSchedule[stage][dayLower].length > 0
          );

          if (hasAnyTimes) {
            convertedSchedule[day].enabled = true;

            // Group time ranges that appear across multiple stages
            const timeRangeMap = {};
            ['FUTURE', 'CURRENT', 'INQUIRY/PAST'].forEach(apiStage => {
              if (apiSchedule[apiStage] && apiSchedule[apiStage][dayLower]) {
                const times = apiSchedule[apiStage][dayLower];
                for (let i = 0; i < times.length; i += 2) {
                  if (i + 1 < times.length) {
                    const startTime = convertTo12Hour(times[i]);
                    const endTime = convertTo12Hour(times[i + 1]);
                    const key = `${startTime}-${endTime}`;
                    
                    if (!timeRangeMap[key]) {
                      timeRangeMap[key] = {
                        id: generateId(),
                        startTime,
                        endTime,
                        stages: []
                      };
                    }
                    timeRangeMap[key].stages.push(mapStageFromAPI(apiStage));
                  }
                }
              }
            });

            convertedSchedule[day].timeBlocks = Object.values(timeRangeMap);
          }
        });

        setSchedule(convertedSchedule);
        
        // Load date ranges from specific_dates
        if (response.data.schedules.specific_dates) {
          const specificDates = response.data.schedules.specific_dates;
          const loadedRanges = [];

          // Parse the specific dates structure
          // Format: { FUTURE: { on: ["mm/dd/yyyy HH:MM", "mm/dd/yyyy HH:MM", ...], off: [...] }, CURRENT: {...}, INQUIRY/PAST: {...} }
          // We need to convert this to our UI format
          const dateRangeMap = {};

          ['FUTURE', 'CURRENT', 'INQUIRY/PAST'].forEach(apiStage => {
            if (specificDates[apiStage] && specificDates[apiStage].on) {
              const times = specificDates[apiStage].on;
              
              // Process pairs of datetime strings
              for (let i = 0; i < times.length; i += 2) {
                if (i + 1 < times.length) {
                  const startDateTime = times[i]; // "mm/dd/yyyy HH:MM"
                  const endDateTime = times[i + 1]; // "mm/dd/yyyy HH:MM"
                  
                  // Parse the datetime
                  const [startDateStr, startTimeStr] = startDateTime.split(' ');
                  const [endDateStr, endTimeStr] = endDateTime.split(' ');
                  
                  // Convert date from mm/dd/yyyy to yyyy-mm-dd for input
                  const startDateParts = startDateStr.split('/');
                  const endDateParts = endDateStr.split('/');
                  const startDate = `${startDateParts[2]}-${startDateParts[0].padStart(2, '0')}-${startDateParts[1].padStart(2, '0')}`;
                  const endDate = `${endDateParts[2]}-${endDateParts[0].padStart(2, '0')}-${endDateParts[1].padStart(2, '0')}`;
                  
                  // Convert time from 24h to 12h format
                  const startTime = convertTo12Hour(startTimeStr);
                  const endTime = convertTo12Hour(endTimeStr);
                  
                  // Create a unique key for this date-time range
                  const key = `${startDate}-${endDate}-${startTime}-${endTime}`;
                  
                  if (!dateRangeMap[key]) {
                    dateRangeMap[key] = {
                      id: generateId(),
                      startDate,
                      endDate,
                      startTime,
                      endTime,
                      stages: []
                    };
                  }
                  dateRangeMap[key].stages.push(mapStageFromAPI(apiStage));
                }
              }
            }
          });

          setDateRanges(Object.values(dateRangeMap));
        }
      }
    } catch (error) {
      console.error('Error fetching schedule:', error);
      ToastHandle('Failed to load schedule', 'danger');
      // Initialize with empty schedule
      const emptySchedule = {};
      DAYS.forEach(day => {
        emptySchedule[day] = { enabled: false, timeBlocks: [] };
      });
      setSchedule(emptySchedule);
    } finally {
      setLoading(false);
    }
  };

  const toggleDay = (day) => {
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

  const toggleStage = (day, blockId, stage) => {
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

  const addTimeBlock = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeBlocks: [...prev[day].timeBlocks, { 
          id: generateId(), 
          startTime: '9:00 AM', 
          endTime: '5:00 PM', 
          stages: ['future', 'current', 'inquiry'] 
        }]
      }
    }));
  };

  const removeTimeBlock = (day, blockId) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeBlocks: prev[day].timeBlocks.filter(block => block.id !== blockId)
      }
    }));
  };

  const updateTimeBlock = (day, blockId, field, value) => {
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
      const clearedSchedule = {};
      DAYS.forEach(day => {
        clearedSchedule[day] = { enabled: false, timeBlocks: [] };
      });
      setSchedule(clearedSchedule);
    } else {
      setDateRanges([]);
    }
  };

  const setAllDay = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        enabled: true,
        timeBlocks: [{ 
          id: generateId(), 
          startTime: '12:00 AM', 
          endTime: '11:59 PM', 
          stages: ['future', 'current', 'inquiry'] 
        }]
      }
    }));
  };

  const set247 = () => {
    const allDaySchedule = {};
    DAYS.forEach(day => {
      allDaySchedule[day] = {
        enabled: true,
        timeBlocks: [{ 
          id: generateId(), 
          startTime: '12:00 AM', 
          endTime: '11:59 PM', 
          stages: ['future', 'current', 'inquiry'] 
        }]
      };
    });
    setSchedule(allDaySchedule);
  };

  // Date range functions for Duration tab
  const addDateRange = () => {
    const newDateRange = {
      id: Date.now(),
      startDate: '',
      startTime: '9:00 AM',
      endDate: '',
      endTime: '5:00 PM',
      stages: ['future', 'current', 'inquiry']
    };
    setDateRanges([...dateRanges, newDateRange]);
  };

  const removeDateRange = (id) => {
    setDateRanges(dateRanges.filter(range => range.id !== id));
  };

  const updateDateRange = (id, field, value) => {
    setDateRanges(dateRanges.map(range => 
      range.id === id ? { ...range, [field]: value } : range
    ));
  };

  const toggleDateRangeStage = (id, stage) => {
    setDateRanges(dateRanges.map(range => {
      if (range.id === id) {
        const stages = range.stages.includes(stage)
          ? range.stages.filter(s => s !== stage)
          : [...range.stages, stage];
        return { ...range, stages };
      }
      return range;
    }));
  };

  const saveSchedule = async () => {
    setLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      if (activeView === 'recurring') {
        // Save recurring weekly schedule
        const apiSchedule = {
          FUTURE: {},
          CURRENT: {},
          'INQUIRY/PAST': {}
        };

        DAYS.forEach(day => {
          const dayLower = day.toLowerCase();
          ['future', 'current', 'inquiry'].forEach(stage => {
            apiSchedule[mapStageToAPI(stage)][dayLower] = [];
          });

          if (schedule[day]?.enabled && schedule[day]?.timeBlocks) {
            schedule[day].timeBlocks.forEach(block => {
              block.stages.forEach(stage => {
                const apiStage = mapStageToAPI(stage);
                apiSchedule[apiStage][dayLower].push(
                  convertTo24Hour(block.startTime),
                  convertTo24Hour(block.endTime)
                );
              });
            });
          }
        });

        const dataToSend = {
          properties: [propertyName],
          schedules: apiSchedule
        };

        const response = await axios.put(`${baseUrl}/set_recurring_schedule`, dataToSend, config);

        if (response.status === 200) {
          ToastHandle('Weekly schedule saved successfully', 'success');
          onClose();
        } else {
          ToastHandle(response?.data?.error || 'Failed to save schedule', 'danger');
        }
      } else {
        // Save date-specific schedules
        // Validate that all date ranges have dates filled in
        const invalidRanges = dateRanges.filter(range => !range.startDate || !range.endDate);
        if (invalidRanges.length > 0) {
          ToastHandle('Please fill in start and end dates for all date ranges', 'danger');
          setLoading(false);
          return;
        }

        // Convert date ranges to API format
        // API expects: { FUTURE: { on: ["mm/dd/yyyy HH:MM", ...], off: [] }, CURRENT: {...}, INQUIRY/PAST: {...} }
        const apiDates = {
          FUTURE: { on: [], off: [] },
          CURRENT: { on: [], off: [] },
          'INQUIRY/PAST': { on: [], off: [] }
        };

        dateRanges.forEach(range => {
          // Convert date from yyyy-mm-dd to mm/dd/yyyy
          const startDateParts = range.startDate.split('-');
          const endDateParts = range.endDate.split('-');
          const startDateFormatted = `${startDateParts[1]}/${startDateParts[2]}/${startDateParts[0]}`;
          const endDateFormatted = `${endDateParts[1]}/${endDateParts[2]}/${endDateParts[0]}`;

          // Convert times to 24h format
          const startTime24 = convertTo24Hour(range.startTime);
          const endTime24 = convertTo24Hour(range.endTime);

          // Create datetime strings
          const startDateTime = `${startDateFormatted} ${startTime24}`;
          const endDateTime = `${endDateFormatted} ${endTime24}`;

          // Add to each stage that's enabled for this range
          range.stages.forEach(stage => {
            const apiStage = mapStageToAPI(stage);
            apiDates[apiStage].on.push(startDateTime, endDateTime);
          });
        });

        const dataToSend = {
          properties: [propertyName],
          dates: apiDates
        };

        const response = await axios.put(`${baseUrl}/set_datetime_toggle`, dataToSend, config);

        if (response.status === 200) {
          ToastHandle('Date-specific schedule saved successfully', 'success');
          onClose();
        } else {
          ToastHandle(response?.data?.error || 'Failed to save date-specific schedule', 'danger');
        }
      }
    } catch (error) {
      console.error('Error saving schedule:', error);
      ToastHandle('Error saving schedule', 'danger');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  // Convert schedule to API format for copying
  const getScheduleForCopy = () => {
    if (activeView === 'recurring') {
      // Return recurring schedule in API format
      const apiSchedule = {
        FUTURE: {},
        CURRENT: {},
        'INQUIRY/PAST': {}
      };

      DAYS.forEach(day => {
        const dayLower = day.toLowerCase();
        ['future', 'current', 'inquiry'].forEach(stage => {
          apiSchedule[mapStageToAPI(stage)][dayLower] = [];
        });

        if (schedule[day]?.enabled && schedule[day]?.timeBlocks) {
          schedule[day].timeBlocks.forEach(block => {
            block.stages.forEach(stage => {
              const apiStage = mapStageToAPI(stage);
              apiSchedule[apiStage][dayLower].push(
                convertTo24Hour(block.startTime),
                convertTo24Hour(block.endTime)
              );
            });
          });
        }
      });

      return apiSchedule;
    } else {
      // Return date-specific schedule in API format
      const apiDates = {
        FUTURE: { on: [], off: [] },
        CURRENT: { on: [], off: [] },
        'INQUIRY/PAST': { on: [], off: [] }
      };

      dateRanges.forEach(range => {
        if (!range.startDate || !range.endDate) return; // Skip incomplete ranges

        // Convert date from yyyy-mm-dd to mm/dd/yyyy
        const startDateParts = range.startDate.split('-');
        const endDateParts = range.endDate.split('-');
        const startDateFormatted = `${startDateParts[1]}/${startDateParts[2]}/${startDateParts[0]}`;
        const endDateFormatted = `${endDateParts[1]}/${endDateParts[2]}/${endDateParts[0]}`;

        // Convert times to 24h format
        const startTime24 = convertTo24Hour(range.startTime);
        const endTime24 = convertTo24Hour(range.endTime);

        // Create datetime strings
        const startDateTime = `${startDateFormatted} ${startTime24}`;
        const endDateTime = `${endDateFormatted} ${endTime24}`;

        // Add to each stage that's enabled for this range
        range.stages.forEach(stage => {
          const apiStage = mapStageToAPI(stage);
          apiDates[apiStage].on.push(startDateTime, endDateTime);
        });
      });

      return apiDates;
    }
  };

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal-container">
        {/* Header */}
        <div className="schedule-modal-header">
          <div>
            <h2 className="schedule-modal-title">Schedule</h2>
            <p className="schedule-modal-subtitle">{propertyName}</p>
          </div>
          <div className="schedule-modal-header-actions">
            <div className="schedule-tabs">
              <button
                onClick={() => setActiveView('recurring')}
                className={`schedule-tab ${activeView === 'recurring' ? 'active' : ''}`}
              >
                Recurring
              </button>
              <button
                onClick={() => setActiveView('duration')}
                className={`schedule-tab ${activeView === 'duration' ? 'active' : ''}`}
              >
                Duration
              </button>
            </div>
            <button onClick={onClose} className="schedule-close-btn">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="schedule-modal-body">
          {loading ? (
            <div className="schedule-loading">Loading...</div>
          ) : activeView === 'recurring' ? (
            <div className="schedule-content-wrapper">
              {/* Main Schedule Area */}
              <div className="schedule-main-area">
                {/* 24/7 Button */}
                <div className="schedule-top-actions">
                  <button onClick={set247} className="schedule-247-btn">
                    Set 24/7
                  </button>
                </div>

                <div className="schedule-days-list">
                  {DAYS.map(day => (
                    <div key={day} className="schedule-day-card">
                      {/* Day Header */}
                      <div className="schedule-day-header">
                        <button onClick={() => toggleDay(day)} className="schedule-day-toggle">
                          <div className={`schedule-checkbox ${schedule[day]?.enabled ? 'checked' : ''}`}>
                            {schedule[day]?.enabled && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            )}
                          </div>
                          <span className="schedule-day-name">{day}</span>
                        </button>
                        {schedule[day]?.enabled && (
                          <div className="schedule-day-actions">
                            <button onClick={() => setAllDay(day)} className="schedule-action-link">
                              All Day
                            </button>
                            <button onClick={() => addTimeBlock(day)} className="schedule-action-link">
                              <Clock className="w-4 h-4" />
                              Add Time
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Time Blocks */}
                      {schedule[day]?.enabled && schedule[day]?.timeBlocks?.length > 0 && (
                        <div className="schedule-time-blocks">
                          {schedule[day].timeBlocks.map(block => (
                            <div key={block.id} className="schedule-time-block">
                              <div className="schedule-time-block-content">
                                {/* Time Selectors */}
                                <div className="schedule-time-inputs">
                                  <TimeInput 
                                    value={block.startTime}
                                    onChange={(time) => updateTimeBlock(day, block.id, 'startTime', time)}
                                  />
                                  <span className="schedule-time-separator">–</span>
                                  <TimeInput 
                                    value={block.endTime}
                                    onChange={(time) => updateTimeBlock(day, block.id, 'endTime', time)}
                                  />
                                </div>
                                
                                {/* Stage Toggles */}
                                <div className="schedule-stage-toggles">
                                  <button
                                    onClick={() => toggleStage(day, block.id, 'future')}
                                    className={`schedule-stage-btn future ${block.stages?.includes('future') ? 'active' : ''}`}
                                    title="Future reservations"
                                  />
                                  <button
                                    onClick={() => toggleStage(day, block.id, 'current')}
                                    className={`schedule-stage-btn current ${block.stages?.includes('current') ? 'active' : ''}`}
                                    title="Current reservations"
                                  />
                                  <button
                                    onClick={() => toggleStage(day, block.id, 'inquiry')}
                                    className={`schedule-stage-btn inquiry ${block.stages?.includes('inquiry') ? 'active' : ''}`}
                                    title="Inquiry/Past reservations"
                                  />
                                </div>
                              </div>
                              {schedule[day].timeBlocks.length > 1 && (
                                <button
                                  onClick={() => removeTimeBlock(day, block.id)}
                                  className="schedule-delete-btn"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Disabled State */}
                      {!schedule[day]?.enabled && (
                        <div className="schedule-day-disabled">
                          <span>Not active</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend Sidebar */}
              <div className="schedule-sidebar">
                <div className="schedule-legend">
                  <h3 className="schedule-legend-title">Reservation Stages</h3>
                  <p className="schedule-legend-description">
                    Select which guest stages HostBuddy should respond to during each time block:
                  </p>
                  <div className="schedule-legend-items">
                    <div className="schedule-legend-item">
                      <div className="schedule-legend-dot future" />
                      <div>
                        <p className="schedule-legend-item-title">Future</p>
                        <p className="schedule-legend-item-desc">Upcoming reservations</p>
                      </div>
                    </div>
                    <div className="schedule-legend-item">
                      <div className="schedule-legend-dot current" />
                      <div>
                        <p className="schedule-legend-item-title">Current</p>
                        <p className="schedule-legend-item-desc">Active check-ins</p>
                      </div>
                    </div>
                    <div className="schedule-legend-item">
                      <div className="schedule-legend-dot inquiry" />
                      <div>
                        <p className="schedule-legend-item-title">Inquiry/Past</p>
                        <p className="schedule-legend-item-desc">Leads & past guests</p>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-legend-tip">
                    <p>
                      <span className="schedule-legend-tip-label">Tip:</span> Click the colored dots to toggle stages on/off for each time block.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Duration View */
            <div className="schedule-content-wrapper">
              <div className="schedule-main-area">
                <div className="schedule-duration-header">
                  <div>
                    <h3 className="schedule-section-title">Date-Specific Schedules</h3>
                    <p className="schedule-section-subtitle">
                      Set up temporary schedules for specific date ranges
                    </p>
                  </div>
                  <button 
                    className="schedule-add-date-btn"
                    onClick={addDateRange}
                  >
                    <Plus className="w-4 h-4" />
                    Add Date Range
                  </button>
                </div>

                {dateRanges.length === 0 ? (
                  <div className="schedule-empty-state">
                    <Calendar className="schedule-empty-icon" />
                    <p className="schedule-empty-title">No date-specific schedules yet</p>
                    <p className="schedule-empty-subtitle">
                      Click "Add Date Range" to create a temporary schedule
                    </p>
                  </div>
                ) : (
                  <div className="schedule-date-ranges">
                    {dateRanges.map((range) => (
                      <div key={range.id} className="schedule-date-range-card">
                        <div className="schedule-date-range-header">
                          <h4 className="schedule-date-range-title">Date Range</h4>
                          <button
                            className="schedule-remove-btn"
                            onClick={() => removeDateRange(range.id)}
                            aria-label="Remove date range"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="schedule-date-range-body">
                          {/* Start Date & Time */}
                          <div className="schedule-datetime-group">
                            <label className="schedule-datetime-label">Start</label>
                            <div className="schedule-datetime-inputs">
                              <div className="schedule-date-input-group">
                                <input
                                  type="date"
                                  value={range.startDate}
                                  onChange={(e) => updateDateRange(range.id, 'startDate', e.target.value)}
                                  className="schedule-date-input"
                                  placeholder="Select date"
                                />
                              </div>
                              <div className="schedule-time-input-group">
                                <TimeInput
                                  value={range.startTime}
                                  onChange={(value) => updateDateRange(range.id, 'startTime', value)}
                                  placeholder="Start time"
                                />
                              </div>
                            </div>
                          </div>

                          {/* End Date & Time */}
                          <div className="schedule-datetime-group">
                            <label className="schedule-datetime-label">End</label>
                            <div className="schedule-datetime-inputs">
                              <div className="schedule-date-input-group">
                                <input
                                  type="date"
                                  value={range.endDate}
                                  onChange={(e) => updateDateRange(range.id, 'endDate', e.target.value)}
                                  className="schedule-date-input"
                                  placeholder="Select date"
                                />
                              </div>
                              <div className="schedule-time-input-group">
                                <TimeInput
                                  value={range.endTime}
                                  onChange={(value) => updateDateRange(range.id, 'endTime', value)}
                                  placeholder="End time"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Reservation Stages */}
                          <div className="schedule-date-range-stages">
                            <label className="schedule-datetime-label">Active for:</label>
                            <div className="schedule-stage-toggles">
                              <button
                                className={`schedule-stage-btn schedule-stage-future ${
                                  range.stages?.includes('future') ? 'active' : ''
                                }`}
                                onClick={() => toggleDateRangeStage(range.id, 'future')}
                                title="Future reservations"
                              >
                                <span className="schedule-stage-dot"></span>
                              </button>
                              <button
                                className={`schedule-stage-btn schedule-stage-current ${
                                  range.stages?.includes('current') ? 'active' : ''
                                }`}
                                onClick={() => toggleDateRangeStage(range.id, 'current')}
                                title="Current reservations"
                              >
                                <span className="schedule-stage-dot"></span>
                              </button>
                              <button
                                className={`schedule-stage-btn schedule-stage-inquiry ${
                                  range.stages?.includes('inquiry') ? 'active' : ''
                                }`}
                                onClick={() => toggleDateRangeStage(range.id, 'inquiry')}
                                title="Inquiry and past reservations"
                              >
                                <span className="schedule-stage-dot"></span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Legend Sidebar - Same as recurring view */}
              <div className="schedule-sidebar">
                <div className="schedule-legend">
                  <h3 className="schedule-legend-title">Reservation Stages</h3>
                  <p className="schedule-legend-description">
                    Select which guest stages HostBuddy should respond to during each date range:
                  </p>
                  <div className="schedule-legend-items">
                    <div className="schedule-legend-item">
                      <div className="schedule-legend-dot future" />
                      <div>
                        <p className="schedule-legend-item-title">Future</p>
                        <p className="schedule-legend-item-desc">Upcoming reservations</p>
                      </div>
                    </div>
                    <div className="schedule-legend-item">
                      <div className="schedule-legend-dot current" />
                      <div>
                        <p className="schedule-legend-item-title">Current</p>
                        <p className="schedule-legend-item-desc">Active check-ins</p>
                      </div>
                    </div>
                    <div className="schedule-legend-item">
                      <div className="schedule-legend-dot inquiry" />
                      <div>
                        <p className="schedule-legend-item-title">Inquiry/Past</p>
                        <p className="schedule-legend-item-desc">Leads & past guests</p>
                      </div>
                    </div>
                  </div>

                  <div className="schedule-legend-tip">
                    <p>
                      <span className="schedule-legend-tip-label">Use case:</span> Set up temporary schedules for holidays, vacations, or special events.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="schedule-modal-footer">
          <div className="schedule-footer-left">
            <button onClick={clearAll} className="schedule-btn-danger">
              Clear All
            </button>
          </div>
          <div className="schedule-footer-right">
            <button onClick={() => setCopyModalOpen(true)} className="schedule-btn-secondary">
              Copy to Properties
            </button>
            <button onClick={saveSchedule} disabled={loading} className="schedule-btn-primary">
              {loading ? 'Saving...' : 'Save Schedule'}
            </button>
          </div>
        </div>

        {currTimeZone && (
          <div className="schedule-timezone-info">
            <p>Time zone: {currTimeZone} • Changes save when you click "Save Schedule"</p>
          </div>
        )}
      </div>

      {/* Copy Schedule Modal */}
      <CopyScheduleModal
        isOpen={copyModalOpen}
        onClose={() => setCopyModalOpen(false)}
        currentPropertyName={propertyName}
        allProperties={allProperties}
        schedule={getScheduleForCopy()}
        scheduleType={activeView === 'recurring' ? 'recurring' : 'dateSpecific'}
        currTimeZone={currTimeZone}
        onCopy={() => {
          // Callback after successful copy
        }}
      />
    </div>
  );
};

export default ScheduleModal;
