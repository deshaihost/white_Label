let number = "number";
let select = "select";
export const dataInput = {
  triggers: [
    {
      guesttype: "checks in",
      type: "check_in",
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours" },
        { inputLabel: "Minustes", type: number, payloadType: "minutes" },
        {
          type: select,
          payloadType: "before_or_after",
          inputLabel: [
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
      guesttype: "checks out",
      type: "check_out",
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours" },
        { inputLabel: "Minustes", type: number, payloadType: "minutes" },
        {
          type: select,
          payloadType: "before_or_after",
          inputLabel: [
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
      guesttype: "books",
      type: "guest_booked",
      inputFiled: [
        { inputLabel: "Hours", type: number, payloadType: "hours_after" },
        { inputLabel: "Minustes", type: number, payloadType: "minutes_after" },
      ],
    },
  ],
};
