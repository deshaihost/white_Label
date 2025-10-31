let number = "number";
let select = "select";
let multiSelecter = "multiSelecter";
let time = "time";
let date = "date";
let checkbox = "checkbox";

const weeksData = [
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" }
];

export const dataInput = {
  triggers: [
    {
      guesttype: "Choose when to send this message...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Send Once",
      type: "send_once",
      label: "Send the message once at a scheduled date and time.",
      inputFiled: [
        { inputLabel: "Date", type: date, payloadType: "scheduled_date", disableIf: "send_immediately" },
        { inputLabel: "Time", type: time, payloadType: "scheduled_time", disableIf: "send_immediately" },
      ]
    },
    {
      guesttype: "During reservation",
      type: "during_reservation",
      label: "Send the message during the guest's reservation, on a specific day and time. Day 1 is the day of check-in.",
      inputFiled: [
        { inputLabel: "Day", type: number, payloadType: "day", defaultVal: 1, min: 1, max: 365 },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ]
    },
    {
      guesttype: "Before reservation",
      type: "before_reservation",
      label: "Send the message a number of days before the guest's reservation, at a specific time. \"0 days before\" will send the message on the day of check-in.",
      inputFiled: [
        { inputLabel: "Days before", type: number, payloadType: "days_before", defaultVal: 0, min: 0, max: 365 },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ]
    },
    {
      guesttype: "After reservation",
      type: "after_reservation",
      label: "Send the message a number of days after the guest's reservation, at a specific time. \"0 days after\" will send the message on the day of check-out.",
      inputFiled: [
        { inputLabel: "Days after", type: number, payloadType: "days_after", defaultVal: 0, min: 0, max: 365 },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ]
    },
    {
      guesttype: "Before stay ends",
      type: "before_stay_ends",
      label: "Send the message a number of days before the guest's stay ends, at a specific time. \"0 days before\" will send the message on the day of check-out.",
      inputFiled: [
        { inputLabel: "Days before", type: number, payloadType: "days_before", defaultVal: 0, min: 0, max: 365 },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ]
    },
    {
      guesttype: "After guest books",
      type: "guest_booked",
      label: "Send the message a number of hours and minutes after the guest books.",
      inputFiled: [
        { inputLabel: "Hours after booking", type: number, payloadType: "hours_after", defaultVal: 0, min: 0, max: (365*24) },
        { inputLabel: "Minutes after booking", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0, max: 59 },
      ]
    },
    {
      guesttype: "After guest cancels",
      type: "guest_canceled",
      label: "Send the message a number of hours and minutes after the guest cancels.",
      inputFiled: [
        { inputLabel: "Hours after guest cancels", type: number, payloadType: "hours_after", defaultVal: 0, min: 0, max: (365*24) },
        { inputLabel: "Minutes after guest cancels", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0, max: 59 },
      ]
    },
    {
      guesttype: "Daily",
      type: "daily",
      inputFiled: [{ inputLabel: "Time", type: time, payloadType: "time" }],
    },
    {
      guesttype: "Weekly",
      type: "weekly",
      label: "This trigger will fire every week on the selected days, at the specified time of day.",
      inputFiled: [
        {
          type: multiSelecter,
          payloadType: "weekdays",
          inputLabel: weeksData,
        },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ],
    },
    {
      guesttype: "Monthly",
      type: "monthly",
      label: "This trigger will fire once a month on the selected day, at the specified time of day.",
      inputFiled: [
        { inputLabel: "Day of month", type: number, onlyUsed: "month1to31", payloadType: "day_of_month", min: 1, max: 31 },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ],
    },
    {
      guesttype: "Yearly",
      type: "yearly",
      inputFiled: [
        {
          type: select,
          payloadType: "month",
          label: "This trigger will fire once a year on the selected month and day, at the specified time of day.",
          inputLabel: [
            { selectLabel: "Month...", type: "seleter", value: "" },
            { selectLabel: "January", type: "seleter", value: "january" },
            { selectLabel: "February", type: "seleter", value: "february" },
            { selectLabel: "March", type: "seleter", value: "march" },
            { selectLabel: "April", type: "seleter", value: "april" },
            { selectLabel: "May", type: "seleter", value: "may" },
            { selectLabel: "June", type: "seleter", value: "june" },
            { selectLabel: "July", type: "seleter", value: "july" },
            { selectLabel: "August", type: "seleter", value: "august" },
            { selectLabel: "September", type: "seleter", value: "september" },
            { selectLabel: "October", type: "seleter", value: "october" },
            { selectLabel: "November", type: "seleter", value: "november" },
            { selectLabel: "December", type: "seleter", value: "december" }
          ],
        },
        { inputLabel: "Day of month", type: number, onlyUsed: "month1to31", payloadType: "day_of_month", min: 1, max: 31 },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ],
    },
    {
      guesttype: "After pre-stay cleaning is complete",
      type: "cleaning_complete",
      label: "This trigger will fire when a cleaning project is completed at one of your properties. You can also set it to fire a specific amount of time after the cleaning is completed. Requires a Turno integration.",
      labelLine2: "This trigger can only send a message to guests associated with the property that the cleaning was completed at.",
      propertiesMessage: "When this trigger fires, this template will only consider the guests associated with the property that the cleaning was completed at.",
      inputFiled: [
        { inputLabel: "Hours after cleaning complete", type: number, payloadType: "hours_after", defaultVal: 0 },
        { inputLabel: "Minutes after cleaning complete", type: number, payloadType: "minutes_after", defaultVal: 0 },
      ],
    },
  ],
  conditions: [
    {
      guesttype: "Only send the message if...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Guest has not responded",
      type: "guest_has_not_responded",
      label: "Only send this follow-up message if the guest has not responded to the previous message.",
      inputFiled: [{}], // empty obj placeholder must be added to make the option selectable
      followUpOnly: true,
    },
    {
      guesttype: "Reservation status is...",
      type: "reservation_status",
      label: "Only send this message to guests at the selected reservation statuses.",
      inputFiled: [
        {
          type: multiSelecter,
          payloadType: "statuses",
          inputLabel: [
            {
              label: "inquiry",
              value: "inquiry",
            },
            {
              label: "current",
              value: "current",
            },
            {
              label: "future",
              value: "future",
            },
            {
              label: "past",
              value: "past",
            }
          ]
        }
      ]
    },
    {
      guesttype: "Weekday is...",
      type: "is_day_of_week",
      label: "Only send this message if it is the selected day(s) of the week.",
      inputFiled: [
        { type: multiSelecter, payloadType: "weekdays", inputLabel: weeksData }
      ],
    },
    {
      guesttype: "Time of day is...",
      type: "is_within_time_range",
      label: "Only send this message if it is between the selected start and end time of day.",
      inputFiled: [
        { inputLabel: "From", type: time, payloadType: "start_time" },
        { inputLabel: "To", type: time, payloadType: "end_time" },
      ],
    },
    {
      guesttype: "Reservation duration is...",
      type: "reservation_duration",
      label: "Only send this message if the guest's reservation is within the selected duration. Specify either min, max, or both.",
      inputFiled: [
        { inputLabel: "Min days", type: number, payloadType: "min" },
        { inputLabel: "Max days", type: number, payloadType: "max" },
      ],
    },
    {
      guesttype: "Guest count is...",
      type: "guest_count",
      label: "Only send this message if the guest count is within the selected range. Specify either min, max, or both.",
      inputFiled: [
        { inputLabel: "Min guests", type: number, payloadType: "min" },
        { inputLabel: "Max guests", type: number, payloadType: "max" },
      ],
    },
    {
      guesttype: "Pet count is...",
      type: "pet_count",
      label: "Only send this message if the guest declared a number of pets within the selected range. Specify either min, max, or both.",
      inputFiled: [
        { inputLabel: "Min pets", type: number, payloadType: "min" },
        { inputLabel: "Max pets", type: number, payloadType: "max" },
      ],
    },
    {
      guesttype: "Child count is...",
      type: "child_count",
      label: "Only send this message if the guest declared a number of children within the selected range. Does not include infants. Specify either min, max, or both.",
      inputFiled: [
        { inputLabel: "Min children", type: number, payloadType: "min" },
        { inputLabel: "Max children", type: number, payloadType: "max" },
      ],
    },
    {
      guesttype: "Infant count is...",
      type: "infant_count",
      label: "Only send this message if the guest declared a number of infants within the selected range. Specify either min, max, or both.",
      inputFiled: [
        { inputLabel: "Min infants", type: number, payloadType: "min" },
        { inputLabel: "Max infants", type: number, payloadType: "max" },
      ],
    },
    {
      guesttype: "Check-in day is...",
      type: "check_in_day",
      label: "Only send this message if the guest's check-in day is this many days away. Specify either min, max, or both. Specify min 0 and max 0 to require check-in day today.",
      inputFiled: [
        { inputLabel: "Min days away", type: number, payloadType: "min_days_from_now", defaultVal: 0 },
        { inputLabel: "Max days away", type: number, payloadType: "max_days_from_now", defaultVal: 0 },
      ]
    },
    {
      guesttype: "Check-out day is...",
      type: "check_out_day",
      label: "Only send this message if the guest's check-out day is this many days away. Specify either min, max, or both. Specify min 0 and max 0 to require check-out day today.",
      inputFiled: [
        { inputLabel: "Min days away", type: number, payloadType: "min_days_from_now", defaultVal: 0 },
        { inputLabel: "Max days away", type: number, payloadType: "max_days_from_now", defaultVal: 0 },
      ]
    },
    {
      guesttype: "Reservation dates contain...",
      type: "reservation_dates_contain",
      label: "Only send this message if this date is part of the guest's reservation.",
      inputFiled: [
        {
          type: select,
          payloadType: "month",
          label: "This trigger will fire once a year on the selected month and day, at the specified time of day.",
          inputLabel: [
            { selectLabel: "Month...", type: "seleter", value: "" },
            { selectLabel: "January", type: "seleter", value: "january" },
            { selectLabel: "February", type: "seleter", value: "february" },
            { selectLabel: "March", type: "seleter", value: "march" },
            { selectLabel: "April", type: "seleter", value: "april" },
            { selectLabel: "May", type: "seleter", value: "may" },
            { selectLabel: "June", type: "seleter", value: "june" },
            { selectLabel: "July", type: "seleter", value: "july" },
            { selectLabel: "August", type: "seleter", value: "august" },
            { selectLabel: "September", type: "seleter", value: "september" },
            { selectLabel: "October", type: "seleter", value: "october" },
            { selectLabel: "November", type: "seleter", value: "november" },
            { selectLabel: "December", type: "seleter", value: "december" }
          ],
        },
        {
          inputLabel: "Day of month",
          type: number,
          min: 1,
          max: 31,
          onlyUsed: "month1to31",
          payloadType: "day_of_month",
        }
      ],
    },
    {
      guesttype: "Sentiment is...",
      type: "sentiment",
      label: "Only send this message to a guest if their detected sentiment matches a criteria.",
      inputFiled: [
        {
          type: multiSelecter,
          payloadType: "criteria",
          inputLabel: [
            {
              label: "negative",
              value: "negative",
            },
            {
              label: "neutral",
              value: "neutral",
            },
            {
              label: "positive",
              value: "positive",
            },
          ],
        },
      ],
    },
  ],
};

// minut triggers: alarm_heard; avg_sound_high; disturbance_first_notice; disturbance_second_notice; disturbance_third_notice; disturbance_snoozed; disturbance_ended; glassbreak; smoking_detection_smoking_detected; sound_level_dropped_normal
// minut conditions: avg_sound_high
export const minutDataInput = {
  minutTriggers: [
    {
      guesttype: "Choose a Minut event...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Disturbance first notice",
      type: "disturbance_first_notice",
      label: "Send the message upon the first notice of a disturbance detected by Minut.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    },
    {
      guesttype: "Disturbance second notice",
      type: "disturbance_second_notice",
      label: "Send the message upon the second notice of a disturbance detected by Minut.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    },
    {
      guesttype: "Disturbance third notice",
      type: "disturbance_third_notice",
      label: "Send the message upon the third notice of a disturbance detected by Minut.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    },
    {
      guesttype: "Disturbance ended",
      type: "disturbance_ended",
      label: "Send the message upon the end of a disturbance detected by Minut.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    },
    {
      guesttype: "Disturbance dismissed",
      type: "disturbance_dismissed",
      label: "Send the message when a minut-detected disturbance is dismissed.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    },
    {
      guesttype: "Disturbance snoozed",
      type: "disturbance_snoozed",
      label: "Send the message when a minut-detected disturbance is snoozed.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    },
    {
      guesttype: "Smoking detection: Smoking detected",
      type: "smoking_detection_smoking_detected",
      label: "Send the message when Minut detects smoking in the property.",
      inputFiled: [
        { inputLabel: "Minutes after event", type: number, payloadType: "minutes_after", defaultVal: 0, min: 0 }
      ]
    }
  ],
  minutConditions: [
    {
      guesttype: "Choose a Minut condition...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Disturbance is ongoing",
      type: "disturbance_ongoing",
      label: "Only send this message if Minut previously detected a disturbance, which has not been dismissed or detected as ended yet.",
      inputFiled: [{}] // empty obj placeholder must be added to make the option selectable
    },
    {
      guesttype: "Disturbance IS NOT ongoing",
      type: "no_disturbance",
      label: "Only send this message if there is no disturbance detected, or if the previous disturbance has been dismissed or detected as ended.",
      inputFiled: [{}] // empty obj placeholder must be added to make the option selectable
    },
  ],
};



// Create a mapping of type to guesttype and useTriggeredGuest if available
export const createTypeToGuesttypeMapping = () => {
  const mapping = { 'triggered_guest': { guesttype: 'Triggered Guest' } };

  const addMapping = (items) => {
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        if (item.type) {
          mapping[item.type] = { guesttype: item.guesttype };
          if (item.useTriggeredGuest) {
            mapping[item.type].useTriggeredGuest = item.useTriggeredGuest;
          }
        }
      });
    }
  };

  addMapping(dataInput?.triggers);
  addMapping(dataInput?.conditions);
  addMapping(minutDataInput?.minutTriggers);
  addMapping(minutDataInput?.minutConditions);

  return mapping;
};

// For a smart template obj, get the useTriggeredGuest value for its trigger
export const getUseTriggeredGuestFromTemplate = (templateObj) => {
  if (!templateObj || !templateObj.triggers || templateObj.triggers.length === 0) { return null; } // Ensure the object has a valid triggers array
  const triggerType = templateObj.triggers[0].type; // Get the type from the first trigger (assuming there is at least one trigger)
  const trigger = dataInput.triggers.find(item => item.type === triggerType); // Find the corresponding trigger in the dataInput.triggers array
  return trigger ? trigger.useTriggeredGuest || null : null; // If the trigger exists, return the useTriggeredGuest value, otherwise return null
};


// Logic to describe a template in human-readable form --------------------------------------------

export const describeTemplate = (template) => {
    return template?.message || ''
    
    // Below logic describes the template based on its triggers, targets, and conditions. Unused since changing the behavior of the template
    const triggersDesc = describeTriggers(template.triggers);
    const targetsDesc = describeTargets(template.targets, template.triggers);
    const conditionsDesc = describeConditions(template.conditions);

    let result = `${triggersDesc}; ${targetsDesc}`;
    if (conditionsDesc) {
        result += `; if ${conditionsDesc}`;
    }
    return result;
}

function describeTriggers(triggers) {
  return triggers.map(trigger => {
      const { type, data } = trigger;
      switch (type) {
          case 'check_in':
          case 'check_out':
              const event = type === 'check_in' ? 'guest checks in' : 'guest checks out';
              
              // Special case: if 0 hours and 0 minutes, say "when the guest checks in" or "when the guest checks out"
              if (data.hours === 0 && data.minutes === 0) {
                  return `when a ${event}`;
              }
              
              // Otherwise, use the usual time description
              const timeDesc = formatDuration(data.hours, data.minutes, data.before_or_after);
              return `${timeDesc} ${event}`;
          case 'guest_booked':
              const bookingTimeDesc = formatDuration(data.hours_after, data.minutes_after, 'after');
              return `${bookingTimeDesc} guest books`;
          case 'daily':
              return `every day at ${formatTime(data.time)}`;
          case 'weekly':
              const weekdays = data.weekdays.join(', ');
              return `every week on ${weekdays} at ${formatTime(data.time)}`;
          case 'monthly':
              return `every month on day ${data.day_of_month} at ${formatTime(data.time)}`;
          case 'yearly':
              const monthNames = [
                  '', 'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
              ];
              return `every year on ${monthNames[data.month]} ${data.day_of_month} at ${formatTime(data.time)}`;
          case 'cleaning_complete':
              const cleaningTimeDesc = formatDuration(data.hours_after, data.minutes_after, 'after');
              return `${cleaningTimeDesc} cleaning is complete`;
          case 'send_once':
              const immediate = data.send_immediately ? 'immediately' : `on ${formatDate(data.scheduled_date)} at ${formatTime(data.scheduled_time)}`;
              return `once, ${immediate}`;
          default:
              return '';
      }
  }).join(' and ');
}

function describeTargets(targets, triggers) {
    return 'send to ' + targets.map(target => {
        const { type, data } = target;
        switch (type) {
            case 'all_guests':
                return 'all guests';
            case 'guests_checking_in':
                return formatGuestTiming('guests checking in', data.min_days_from_now, data.max_days_from_now);
            case 'guests_checking_out':
                return formatGuestTiming('guests checking out', data.min_days_from_now, data.max_days_from_now);
            case 'guests_checked_in':
                return formatGuestTiming('guests that checked in', data.min_days_ago, data.max_days_ago, true);
            case 'guests_checked_out':
                return formatGuestTiming('guests that checked out', data.min_days_ago, data.max_days_ago, true);
            case 'guests_currently_staying':
                return 'guests currently staying';
            case 'triggered_guest':
                // Handle the triggered_guest target type
                const trigger = triggers[0]; // Assume the first trigger is relevant
                return `the guest that ${triggerEventDescription(trigger)}`;
            default:
                return '';
        }
    }).join(' and ');
}

function triggerEventDescription(trigger) {
    const { type } = trigger;
    switch (type) {
        case 'check_in':
            return 'is checking in';
        case 'check_out':
            return 'is checking out';
        case 'guest_booked':
            return 'booked';
        case 'cleaning_complete':
            return 'had their cleaning completed';
        default:
            return 'triggered the event';
    }
}

function describeConditions(conditions) {
    if (!conditions || conditions.length === 0) {
        return '';
    }
    return conditions.map(condition => {
        const { type, data } = condition;
        switch (type) {
            case 'is_day_of_week':
                return `it is ${data.weekdays.join(' or ')}`;
            case 'is_within_time_range':
                return `the time is between ${formatTime(data.start_time)} and ${formatTime(data.end_time)}`;
            case 'sentiment':
                return `sentiment is ${data.criteria.join(' or ')}`;
            default:
                return '';
        }
    }).join(' and ');
}

function formatTime(time24) {
    let [hour, minute] = time24.split(':').map(Number);
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, '0')}${ampm}`;
}

function formatDuration(hours, minutes, beforeOrAfter) {
    const timeParts = [];
    if (hours) timeParts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes) timeParts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    const timeDesc = timeParts.join(' and ');
    return `${timeDesc} ${beforeOrAfter}`;
}

function formatGuestTiming(guestType, minDays, maxDays, ago = false) {
    if (minDays === 0 && maxDays === 0) {
        return `${guestType} today`;
    } else if (minDays === maxDays) {
        return `${guestType} ${ago ? '' : 'in '}${minDays} day${minDays !== 1 ? 's' : ''}${ago ? ' ago' : ''}`;
    } else {
        return `${guestType} ${ago ? '' : 'in '}${minDays} to ${maxDays} days${ago ? ' ago' : ''}`;
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}