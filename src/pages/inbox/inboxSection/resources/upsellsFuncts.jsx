import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";


// Format date range
// e.g. input startDate='2024-08-16', endDate='2024-08-18' => output 'Aug 16 - Aug 18'
// e.g. input startDate='2024-08-16', endDate='2024-08-16' => output 'Aug 16'
// e.g. input startDate='08-16-24', endDate='08-18-24' => output 'Aug 16 - Aug 18'
export const formatDateRange = (startDate, endDate) => {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const parseDate = (dateString) => {
    let year, month, day;
    if (dateString.includes('-')) {
      const parts = dateString.split('-').map(Number);
      if (parts[0] > 31) { // Assuming format is YYYY-MM-DD
        [year, month, day] = parts;
      } else { // Assuming format is MM-DD-YY
        [month, day, year] = parts;
        year += 2000; // Assuming 21st century for two-digit years
      }
    }
    return new Date(Date.UTC(year, month - 1, day));
  };

  const formatDate = (date, includeYear = false) => {
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    return includeYear ? `${month} ${day}, ${year}` : `${month} ${day}`;
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  const startFormatted = formatDate(start, start.getUTCFullYear() !== end.getUTCFullYear());
  const endFormatted = formatDate(end, start.getUTCFullYear() !== end.getUTCFullYear());

  if (startFormatted === endFormatted) {
    return startFormatted;
  } else {
    return `${startFormatted} - ${endFormatted}`;
  }
};

// Format datetime
// e.g. input datetime='2024-08-15 13:00' => output 'Aug 15, 1:00 PM'
export const formatDateTime = (datetime) => {
  const [datePart, timePart] = datetime.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);

  const date = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' };
  return date.toLocaleDateString('en-US', options);
};

// Truncate a string to num_chars
// e.g. input string='Hello, world!', num_chars=5 => output 'Hello...'
// e.g. input string='Hello', num_chars=5 => output 'Hello'
export const truncateString = (string, num_chars) => {
  if (string.length > num_chars) {
    return string.slice(0, num_chars-3) + '...';
  } else {
    return string;
  }
}

// Set a particular field in the current settings
export const setSetting = (key, value, currentSettingsData, setCurrentSettingsData) => {

  // Only accept valid values for certain fields
  if (key === 'days_before_check_out' || key === 'days_before_check_in') {
    value = parseInt(value);
    if (value < 0 || value > 30) { return }
  } else if (key === 'discount_percentage') {
    value = parseInt(value);
    if (value < 0 || value > 100) { return }
  } else if (key === 'discount_absolute') {
    value = parseInt(value);
    if (value < 0) { return }
  } else if (key === 'number_of_nights_criteria') {
    value = parseInt(value);
    if (value < 1 || value > 30) { return }
  } else if (key === 'min_message_delay_minutes' || key === 'max_message_delay_minutes') {
    value = parseInt(value);
    if (value < 0 || value > 7) { return }
  } else if (key === 'minutes_after_property_ready') {
    value = parseInt(value);
    if (value < 0 || value > 1440) { return }
  }

  setCurrentSettingsData({ ...currentSettingsData, [key]: value });
}

export const insertVariableAtCursor = (textarea, variable, currentSettingsData, setCurrentSettingsData) => {
  const startPos = textarea.selectionStart;
  const endPos = textarea.selectionEnd;
  const textBefore = textarea.value.substring(0, startPos);
  const textAfter = textarea.value.substring(endPos, textarea.value.length);

  const newText = textBefore + variable + textAfter;
  setSetting('upsell_message', newText, currentSettingsData, setCurrentSettingsData);

  // Set the cursor position after the inserted variable
  setTimeout(() => {
    textarea.selectionStart = textarea.selectionEnd = startPos + variable.length;
    textarea.focus();
  }, 0);
};

// Call the API to save the user's settings. This only handles default settings.
export const callSaveSettingsApi = async (localSettingsData, upsellType) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    const body_data = { settings:localSettingsData, upsell_type:upsellType };
    const response = await axios.put( `${baseUrl}/set_settings_for_upsell_type`, body_data, config );

    if (response.status === 200) {
      ToastHandle("Settings saved successfully", "success");
    }
    else { ToastHandle(response?.data?.error, "danger"); }
  } catch (error) {
    
  } finally {
  }
}

// Call the API to cancel an upsell message
export const callCancelMessageApi = async (propertyName, guestKey, upsellType, callGetUpcomingMessagesApi, setCancelMessageLoading) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  setCancelMessageLoading(guestKey);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
    };
    const body_data = { property_name:propertyName, guest_key:guestKey, upsell_type:upsellType };
    const response = await axios.put( `${baseUrl}/cancel_upcoming_message`, body_data, config );

    if (response.status === 200) {
      ToastHandle("Message cancelled successfully", "success");
      callGetUpcomingMessagesApi(false, upsellType);
    }
    else { ToastHandle(response?.data?.error, "danger"); }
  } catch (error) {
    ToastHandle('Internal server error', "danger");
  } finally {
    setCancelMessageLoading("");
  }
}