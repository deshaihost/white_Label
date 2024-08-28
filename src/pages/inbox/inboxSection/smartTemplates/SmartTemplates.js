import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
const SmartTemplates = () => {
  const smartTepData = [
    {
      label: "Post-Stay Review",
      text: "Send a message to your guests who had a positive experience, asking them to leave a review.",
    },
    {
      label: "Arrival Day Pulse Check",
      text: "Send check-in messages to guests who have not communicated that they have arrived.",
    },
    {
      label: "Check Out Reminder",
      text: "Send check-out reminders to guests who have not communicated that they have departed.",
    },
  ];

  return (
    <div className="s-template">
      <h2>Smart Templates</h2>
      <p>
        Send templated messages to the right guests at the right time. Use
        modern technology to analyze conversations and situations to trigger
        messaging.
      </p>
      <div className="smart-template">
        {smartTepData?.map((items) => {
          const { label, text } = items;
          return (
            <div className="template-inner">
              <h2>{label}</h2>
              <p>{text}</p>
              <Link href="/">
                <i class="bi bi-arrow-right-short"></i>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SmartTemplates;
