import { useState, useRef, useEffect } from 'react';

const TimeInput = ({ value, onChange, disabled }) => {
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Parse the current value
  const parseTime = (timeStr) => {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return { hours: '12', minutes: '00', period: 'AM' };
    return {
      hours: match[1].padStart(2, '0'),
      minutes: match[2],
      period: match[3].toUpperCase()
    };
  };

  const { hours, minutes, period } = parseTime(value);

  // Update input value when not focused and external value changes
  useEffect(() => {
    if (!isFocused) {
      setInputValue(`${hours}:${minutes}`);
    }
  }, [value, isFocused, hours, minutes]);

  const formatTimeDisplay = (digits) => {
    if (digits.length === 0) return '';
    if (digits.length === 1) return digits;
    if (digits.length === 2) return digits;
    if (digits.length === 3) return `${digits.slice(0, 1)}:${digits.slice(1)}`;
    return `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
  };

  const validateAndUpdateTime = (timeString, newPeriod) => {
    // Extract digits
    const digits = timeString.replace(/\D/g, '');
    
    if (digits.length < 3) {
      // Not enough digits, use defaults
      onChange(`12:00 ${newPeriod}`);
      return;
    }

    let hour = '';
    let minute = '';

    if (digits.length === 3) {
      hour = digits[0];
      minute = digits.slice(1, 3);
    } else {
      hour = digits.slice(0, 2);
      minute = digits.slice(2, 4);
    }

    // Validate hour (1-12)
    let hourNum = parseInt(hour, 10);
    if (hourNum > 12) hourNum = 12;
    if (hourNum === 0) hourNum = 12;

    // Validate minute (0-59)
    let minuteNum = parseInt(minute, 10);
    if (minuteNum > 59) minuteNum = 59;

    const formattedHour = hourNum.toString();
    const formattedMinute = minuteNum.toString().padStart(2, '0');

    onChange(`${formattedHour}:${formattedMinute} ${newPeriod}`);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    const digits = input.replace(/\D/g, '');
    
    // Limit to 4 digits
    const limitedDigits = digits.slice(0, 4);
    
    // Format for display
    const formatted = formatTimeDisplay(limitedDigits);
    setInputValue(formatted);
    
    // If we have 4 digits, validate and update immediately
    if (limitedDigits.length === 4) {
      validateAndUpdateTime(formatted, period);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Validate and update time on blur
    if (inputValue) {
      validateAndUpdateTime(inputValue, period);
    } else {
      // If empty, reset to current value
      setInputValue(`${hours}:${minutes}`);
    }
  };

  const handleInputFocus = (e) => {
    setIsFocused(true);
    setInputValue('');
  };

  const togglePeriod = () => {
    onChange(`${hours.replace(/^0+/, '') || '12'}:${minutes} ${period === 'AM' ? 'PM' : 'AM'}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <div className="time-input-container">
      {/* Time Input Field */}
      <div className={`time-input-field ${isFocused ? 'focused' : ''}`}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={isFocused ? inputValue : `${hours}:${minutes}`}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="--:--"
          className="time-input"
        />
      </div>

      {/* AM/PM Toggle */}
      <button
        type="button"
        onClick={togglePeriod}
        disabled={disabled}
        className="period-toggle-btn"
      >
        {period}
      </button>
    </div>
  );
};

export default TimeInput;
