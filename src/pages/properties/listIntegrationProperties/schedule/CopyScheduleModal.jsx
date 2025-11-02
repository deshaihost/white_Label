import { useState } from 'react';
import { X, Check } from '../../../../components/Icons';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';

const CopyScheduleModal = ({ isOpen, onClose, currentPropertyName, allProperties, onCopy, schedule, currTimeZone, scheduleType = 'recurring' }) => {
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [timezoneOption, setTimezoneOption] = useState('actual');
  const [loading, setLoading] = useState(false);

  // Only show properties, excluding the current one
  const availableProperties = allProperties.filter(p => p !== currentPropertyName);

  const toggleProperty = (propertyName) => {
    setSelectedProperties(prev =>
      prev.includes(propertyName) ? prev.filter(p => p !== propertyName) : [...prev, propertyName]
    );
  };

  const selectAll = () => {
    setSelectedProperties(availableProperties);
  };

  const deselectAll = () => {
    setSelectedProperties([]);
  };

  const handleCopy = async () => {
    if (selectedProperties.length === 0) return;

    setLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      let response;
      
      if (scheduleType === 'recurring') {
        // Copy weekly recurring schedule
        const dataToSend = {
          properties: selectedProperties,
          schedules: schedule,
          copyToLocalTime: timezoneOption === 'actual',
          currTimeZoneName: currTimeZone
        };
        response = await axios.put(`${baseUrl}/set_recurring_schedule`, dataToSend, config);
      } else if (scheduleType === 'dateSpecific') {
        // Copy date-specific schedule
        const dataToSend = {
          properties: selectedProperties,
          dates: schedule,
          copyToLocalTime: timezoneOption === 'actual',
          currTimeZoneName: currTimeZone
        };
        response = await axios.put(`${baseUrl}/set_datetime_toggle`, dataToSend, config);
      }

      if (response.status === 200) {
        ToastHandle(`Schedule copied to ${selectedProperties.length} ${selectedProperties.length === 1 ? 'property' : 'properties'} successfully`, "success");
        if (onCopy) onCopy(selectedProperties, timezoneOption);
        setSelectedProperties([]);
        onClose();
      } else {
        ToastHandle(response?.data?.error || "Failed to copy schedule", "danger");
      }
    } catch (error) {
      ToastHandle("Error copying schedule", "danger");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="schedule-modal-overlay">
      <div className="schedule-modal-container copy-modal">
        {/* Header */}
        <div className="schedule-modal-header">
          <div>
            <h2 className="schedule-modal-title">Copy Schedule to Other Properties</h2>
            <p className="schedule-modal-subtitle">
              Select which properties should receive this schedule
            </p>
          </div>
          <button onClick={onClose} className="schedule-close-btn">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="schedule-modal-content">
          {/* Properties Selection */}
          <div className="copy-modal-section">
            <div className="copy-modal-section-header">
              <label className="copy-modal-label">Choose Properties</label>
              {availableProperties.length > 0 && (
                <div className="copy-modal-actions">
                  <button onClick={selectAll} className="copy-modal-action-btn">
                    Select All
                  </button>
                  <span className="copy-modal-separator">•</span>
                  <button onClick={deselectAll} className="copy-modal-action-btn">
                    Deselect All
                  </button>
                </div>
              )}
            </div>
            
            <div className="copy-modal-properties-list">
              {availableProperties.length === 0 ? (
                <div className="copy-modal-empty">
                  <p>No other properties available. Import more properties from your PMS or create additional properties to copy this schedule to.</p>
                </div>
              ) : (
                availableProperties.map(property => (
                  <button
                    key={property}
                    onClick={() => toggleProperty(property)}
                    className={`copy-modal-property-item ${selectedProperties.includes(property) ? 'selected' : ''}`}
                  >
                    <span className="copy-modal-property-name">{property}</span>
                    <div className={`copy-modal-checkbox ${selectedProperties.includes(property) ? 'checked' : ''}`}>
                      {selectedProperties.includes(property) && (
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>

            {selectedProperties.length > 0 && (
              <p className="copy-modal-selected-count">
                {selectedProperties.length} {selectedProperties.length === 1 ? 'property' : 'properties'} selected
              </p>
            )}
          </div>

          {/* Timezone Behavior */}
          <div className="copy-modal-section">
            <label className="copy-modal-label">Time Zone Behavior</label>
            
            <div className="copy-modal-timezone-options">
              <button
                onClick={() => setTimezoneOption('actual')}
                className={`copy-modal-timezone-option ${timezoneOption === 'actual' ? 'selected' : ''}`}
              >
                <div className="copy-modal-radio-container">
                  <div className={`copy-modal-radio ${timezoneOption === 'actual' ? 'checked' : ''}`}>
                    {timezoneOption === 'actual' && (
                      <div className="copy-modal-radio-dot" />
                    )}
                  </div>
                  <div>
                    <p className="copy-modal-option-title">Copy Actual Time</p>
                    <p className="copy-modal-option-description">
                      e.g. "12:00 PM (PST)" copies as "3:00 PM (EST)" - same moment in time
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setTimezoneOption('relative')}
                className={`copy-modal-timezone-option ${timezoneOption === 'relative' ? 'selected' : ''}`}
              >
                <div className="copy-modal-radio-container">
                  <div className={`copy-modal-radio ${timezoneOption === 'relative' ? 'checked' : ''}`}>
                    {timezoneOption === 'relative' && (
                      <div className="copy-modal-radio-dot" />
                    )}
                  </div>
                  <div>
                    <p className="copy-modal-option-title">Copy Relative Time</p>
                    <p className="copy-modal-option-description">
                      e.g. "12:00 PM (PST)" copies as "12:00 PM (EST)" - same local time
                    </p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="schedule-modal-footer">
          <button onClick={onClose} className="schedule-btn-secondary">
            Cancel
          </button>
          <button
            onClick={handleCopy}
            disabled={selectedProperties.length === 0 || loading}
            className="schedule-btn-primary"
          >
            {loading ? 'Copying...' : 'Copy Schedule'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CopyScheduleModal;
