let number = "number";
let select = "select";
let multiSelecter = "multiSelecter";
let time = "time";

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
      guesttype: "Select a trigger...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "When a guest checks in",
      type: "check_in",
      label: "This trigger will fire at a guest's scheduled check-in time. You can also set it to fire a specific amount of time before or after scheduled check-in.",
      useTriggeredGuest: "Send the message to the guest that is checking in.",
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours", defaultVal: 0 },
        { inputLabel: "Minutes", type: number, payloadType: "minutes", defaultVal: 0 },
        {
          type: select,
          payloadType: "before_or_after",
          inputLabel: [
            {
              selectLabel: "Before or after...",
              type: "seleter",
              value: "",
            },
            {
              selectLabel: "Before guest check-in",
              type: "seleter",
              value: "before",
            },
            {
              selectLabel: "After guest check-in",
              type: "seleter",
              value: "after",
            },
          ],
        },
      ],
    },
    {
      guesttype: "When a guest checks out",
      type: "check_out",
      label: "This trigger will fire at a guest's scheduled check-out time. You can also set it to fire a specific amount of time before or after scheduled check-out.",
      useTriggeredGuest: "Send the message to the guest that is checking out.",
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours", defaultVal: 0 },
        { inputLabel: "Minutes", type: number, payloadType: "minutes", defaultVal: 0 },
        {
          type: select,
          payloadType: "before_or_after",
          inputLabel: [
            {
              selectLabel: "Before or after...",
              type: "seleter",
              value: "",
            },
            {
              selectLabel: "Before guest check-out",
              type: "seleter",
              value: "before",
            },
            {
              selectLabel: "After guest check-out",
              type: "seleter",
              value: "after",
            },
          ],
        },
      ],
    },
    {
      guesttype: "When a guest books",
      type: "guest_booked",
      label: "This trigger will fire when a guest books a reservation. You can also set it to fire a specific amount of time after the booking.",
      useTriggeredGuest: "Send the message to the guest that booked the reservation.",
      inputFiled: [
        { inputLabel: "Hours after guest books", type: number, payloadType: "hours_after", defaultVal: 0 },
        { inputLabel: "Minutes after guest books", type: number, payloadType: "minutes_after", defaultVal: 0 },
      ],
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
        {
          inputLabel: "Day of month",
          type: number,
          min: 1,
          max: 31,
          onlyUsed: "month1to31",
          payloadType: "day_of_month",
        },
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
        {
          inputLabel: "Day of month",
          type: number,
          min: 1,
          max: 31,
          onlyUsed: "month1to31",
          payloadType: "day_of_month",
        },
        { inputLabel: "Time", type: time, payloadType: "time" },
      ],
    },
    {
      guesttype: "When cleaning is complete",
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
  targets: [
    {
      guesttype: "Select a target...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Guests that will check in",
      type: "guests_checking_in",
      label: "Send the message to guests that are scheduled to check in within the specified time frame. For guests that are checking in later today, set \"Min Days From Now\" and \"Max Days From Now\" to 0.",
      inputFiled: [
        { inputLabel: "Min Days From Now", type: number, payloadType: "min_days_from_now", defaultVal: 0 },
        { inputLabel: "Max Days From Now", type: number, payloadType: "max_days_from_now", defaultVal: 0 },
      ],
    },
    {
      guesttype: "Guests that will check out",
      type: "guests_checking_out",
      label: "Send the message to guests that are scheduled to check out within the specified time frame. For guests that are checking out later today, set \"Min Days From Now\" and \"Max Days From Now\" to 0.",
      inputFiled: [
        { inputLabel: "Min Days From Now", type: number, payloadType: "min_days_from_now", defaultVal: 0 },
        { inputLabel: "Max Days From Now", type: number, payloadType: "max_days_from_now", defaultVal: 0 },
      ],
    },
    {
      guesttype: "Guests that have checked in",
      type: "guests_checked_in",
      label: "Send the message to guests that have checked in within the specified time frame. For guests that checked in today, set \"Min Days Ago\" and \"Max Days Ago\" to 0.",
      inputFiled: [
        { inputLabel: "Min Days Ago", type: number, payloadType: "min_days_ago", defaultVal: 0 },
        { inputLabel: "Max Days Ago", type: number, payloadType: "max_days_ago", defaultVal: 0 },
      ],
    },
    {
      guesttype: "Guests that have checked out",
      type: "guests_checked_out",
      label: "Send the message to guests that have checked out within the specified time frame. For guests that checked out today, set \"Min Days Ago\" and \"Max Days Ago\" to 0.",
      inputFiled: [
        { inputLabel: "Min Days Ago", type: number, payloadType: "min_days_ago", defaultVal: 0 },
        { inputLabel: "Max Days Ago", type: number, payloadType: "max_days_ago", defaultVal: 0 },
      ],
    },
    {
      guesttype: "Guests currently staying",
      type: "guests_currently_staying",
      label: "Send the message to guests that are currently staying.",
      inputFiled: [{}],
    },
  ],
  conditions: [
    {
      guesttype: "Select a condition...",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Weekday",
      type: "is_day_of_week",
      label: "Only send this message if the trigger fires on the selected day(s) of the week.",
      inputFiled: [
        { type: multiSelecter, payloadType: "weekdays", inputLabel: weeksData }
      ],
    },
    {
      guesttype: "Time Range",
      type: "is_within_time_range",
      label: "Only send this message if the trigger fires within the specified range of time of day.",
      inputFiled: [
        { inputLabel: "From", type: time, payloadType: "start_time" },
        { inputLabel: "To", type: time, payloadType: "end_time" },
      ],
    },
    {
      guesttype: "Sentiment",
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

// Create a mapping of type (accessible in the API data structure) to guesttype (displayed in the UI)
export const createTypeToGuesttypeMapping = () => {
  const mapping = {'triggered_guest': 'Triggered Guest'};

  const addMapping = (items) => {
    items.forEach(item => {
      if (item.type) {
        mapping[item.type] = item.guesttype;
      }
    });
  };

  addMapping(dataInput.triggers);
  addMapping(dataInput.targets);
  addMapping(dataInput.conditions);

  return mapping;
};