

export const prebuiltTemplates = [
  {
    displayData: {
      templateName: "Post-stay review request",
      templateDescription: "Send a message to your guests after their stay if they have a positive sentiment, asking them to leave a review."
    },
    templateData: {
      name: "Post-stay review request",
      enabled: false,
      message: "Hi [[guest_name]],\n\n I hope you enjoyed your stay! If you have a moment, I’d greatly appreciate it if you could leave us a review. It really helps us out and ensures we can keep providing the best experience for our guests.\n\nThank you again for choosing us for your stay!\n\nBest regards.",
      triggers: [
        {
          type: "after_reservation",
          data: {
            days_after: 0,
            time: "14:00"
          }
        }
      ],
      conditions: [
        {
          type: "sentiment",
          data: {
            criteria: ["positive"]
          }
        }
      ]
    }
  },
  {
    displayData: {
      templateName: "Property Ready message",
      templateDescription: "If your property is cleaned early, send a message to the next guest welcoming them to check in early.",
    },
    templateData: {
      name: "Property Ready message",
      enabled: false,
      message: "Hi [[guest_name]], the property is ready for you to check in! We're here if you need anything. Enjoy your stay!",
      triggers: [
        {
          type: "cleaning_complete",
          data: {
            hours_after: 0,
            minutes_after: 0
          }
        }
      ],
      conditions: [
        {
          type: "is_within_time_range",
          data: {
            start_time: "00:00",
            end_time: "16:00"
          }
        },
        {
          type: "check_in_day",
          data: {
            min_days_from_now: 0,
            max_days_from_now: 0
          }
        }
      ]
    }
  },
  {
    displayData: {
      templateName: "Post-check-in welcome message",
      templateDescription: "Send a message to your guests after they check in to welcome them",
    },
    templateData: {
      name: "Post-check-in welcome message",
      enabled: false,
      ai_context_check: true,
      message: "Hi [[guest_name]], I hope you're finding everything well! If you need anything, don't hesitate to ask. Enjoy your stay!",
      triggers: [
        {
          type: "during_reservation",
          data: {
            day: 1,
            time: "16:30"
          }
        }
      ],
      conditions: []
    }
  }
];




const prebuiltTemplatesOld = [
  {
    displayData: {
      templateName: "Post-stay review request",
      templateDescription: "Send a message to your guests after their stay if they have a positive sentiment, asking them to leave a review."
    },
    templateData: {
      name: "Post-stay review request",
      enabled: false,
      message: "Hi [[guest_name]],\n\n I hope you enjoyed your stay! If you have a moment, I’d greatly appreciate it if you could leave us a review. It really helps us out and ensures we can keep providing the best experience for our guests.\n\nThank you again for choosing us for your stay!\n\nBest regards.",
      triggers: [
        {
          type: "check_out",
          data: {
            before_or_after: "after",
            hours: 4,
            minutes: 0
          }
        }
      ],
      targets: [
        {
          type: "triggered_guest",
          data: {}
        }
      ],
      conditions: [
        {
          type: "sentiment",
          data: {
            criteria: ["positive"]
          }
        }
      ]
    }
  },
  {
    displayData: {
      templateName: "Property Ready message",
      templateDescription: "If your property is cleaned early, send a message to the next guest welcoming them to check in early.",
    },
    templateData: {
      name: "Property Ready message",
      enabled: false,
      message: "Hi [[guest_name]], the property is ready for you to check in! We're here if you need anything. Enjoy your stay!",
      triggers: [
        {
          type: "cleaning_complete",
          data: {
            hours_after: 0,
            minutes_after: 0
          }
        }
      ],
      targets: [
        {
          type: "guests_checking_in",
          data: {
            min_days_from_now: 0,
            max_days_from_now: 0
          }
        }
      ],
      conditions: [
        {
          type: "is_within_time_range",
          data: {
            start_time: "00:00",
            end_time: "16:00"
          }
        }
      ]
    }
  },
  {
    displayData: {
      templateName: "Post-check-in welcome message",
      templateDescription: "Send a message to your guests after they check in to welcome them",
    },
    templateData: {
      name: "Post-check-in welcome message",
      enabled: false,
      ai_context_check: true,
      message: "Hi [[guest_name]], I hope you're finding everything well! If you need anything, don't hesitate to ask. Enjoy your stay!",
      triggers: [
        {
          type: "check_in",
          data: {
            before_or_after: "after",
            hours: 1,
            minutes: 30
          }
        }
      ],
      targets: [
        {
          type: "triggered_guest",
          data: {}
        }
      ],
      conditions: []
    }
  }
];