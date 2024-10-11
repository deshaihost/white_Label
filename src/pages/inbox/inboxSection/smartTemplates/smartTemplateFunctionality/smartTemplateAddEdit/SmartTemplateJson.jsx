let number = "number";
let select = "select";
let multiSelecter = "multiSelecter";
let time = "time";
const weeksData = [
  {
    label: "Monday",
    value: "monday",
  },
  {
    label: "Tuesday",
    value: "tuesday",
  },
  {
    label: "Wednesday",
    value: "wednesday",
  },
  {
    label: "Thursday",
    value: "thursday",
  },
  {
    label: "Friday",
    value: "friday",
  },
  {
    label: "Saturday",
    value: "saturday",
  },
  {
    label: "Sunday",
    value: "sunday",
  },
];
export const dataInput = {
  triggers: [
    {
      guesttype: "Please Select One",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "When a guest checks in",
      type: "check_in",
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours" },
        { inputLabel: "Minutes", type: number, payloadType: "minutes" },
        {
          type: select,
          payloadType: "before_or_after",
          inputLabel: [
            {
              selectLabel: "Please Select One",
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
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours" },
        { inputLabel: "Minutes", type: number, payloadType: "minutes" },
        {
          type: select,
          payloadType: "before_or_after",
          inputLabel: [
            {
              selectLabel: "Please Select One",
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
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours_after" },
        { inputLabel: "Minutes", type: number, payloadType: "minutes_after" },
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
          inputLabel: [
            {
              selectLabel: "Please Select One",
              type: "seleter",
              value: "",
            },
            {
              selectLabel: "January",
              type: "seleter",
              value: "january",
            },
            {
              selectLabel: "February",
              type: "seleter",
              value: "february",
            },

            {
              selectLabel: "March",
              type: "seleter",
              value: "march",
            },
            {
              selectLabel: "April",
              type: "seleter",
              value: "april",
            },
            {
              selectLabel: "May",
              type: "seleter",
              value: "may",
            },
            {
              selectLabel: "June",
              type: "seleter",
              value: "june",
            },

            {
              selectLabel: "July",
              type: "seleter",
              value: "july",
            },
            {
              selectLabel: "August",
              type: "seleter",
              value: "august",
            },
            {
              selectLabel: "September",
              type: "seleter",
              value: "september",
            },
            {
              selectLabel: "October",
              type: "seleter",
              value: "october",
            },
            {
              selectLabel: "November",
              type: "seleter",
              value: "november",
            },
            {
              selectLabel: "December",
              type: "seleter",
              value: "december",
            },
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
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours_after" },
        { inputLabel: "Minutes", type: number, payloadType: "minutes_after" },
      ],
    },
  ],
  targets: [
    {
      guesttype: "Please Select One",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Guests that will check in",
      type: "guests_checking_in",
      inputFiled: [
        {
          inputLabel: "Min Days From Now",
          type: number,
          payloadType: "min_days_from_now",
        },
        {
          inputLabel: "Max Days From Now",
          type: number,
          payloadType: "max_days_from_now",
        },
      ],
    },
    {
      guesttype: "Guests that will check out",
      type: "guests_checking_out",
      inputFiled: [
        {
          inputLabel: "Min Days From Now",
          type: number,
          payloadType: "min_days_from_now",
        },
        {
          inputLabel: "Max Days From Now",
          type: number,
          payloadType: "max_days_from_now",
        },
      ],
    },
    {
      guesttype: "Guests that have checked in",
      type: "guests_checked_in",
      inputFiled: [
        {
          inputLabel: "Min Days Ago",
          type: number,
          payloadType: "min_days_ago",
        },
        {
          inputLabel: "Max Days Ago",
          type: number,
          payloadType: "max_days_ago",
        },
      ],
    },
    {
      guesttype: "Guests that have checked out",
      type: "guests_checked_out",
      inputFiled: [
        {
          inputLabel: "Min Days Ago",
          type: number,
          payloadType: "min_days_ago",
        },
        {
          inputLabel: "Max Days Ago",
          type: number,
          payloadType: "max_days_ago",
        },
      ],
    },
    {
      guesttype: "Guests currently staying",
      type: "guests_currently_staying",
      inputFiled: [{}],
    },
  ],
  conditions: [
    {
      guesttype: "Please Select One",
      type: "",
      inputFiled: [],
    },
    {
      guesttype: "Weekday",
      type: "is_day_of_week",
      inputFiled: [
        {
          type: multiSelecter,
          payloadType: "weekdays",
          inputLabel: weeksData,
        },
        // { inputLabel: "Time", type: time, payloadType: "time" },
      ],
    },
    {
      guesttype: "Time Range",
      type: "is_within_time_range",
      inputFiled: [
        { inputLabel: "Start", type: time, payloadType: "start_time" },
        { inputLabel: "End", type: time, payloadType: "end_time" },
      ],
    },
    {
      guesttype: "Sentiment",
      type: "sentiment",
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
