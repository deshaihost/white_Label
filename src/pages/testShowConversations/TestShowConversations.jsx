import React from "react";
import "./TestShowConv.css";

const TestShowConversations = ({ message }) => {
  const { text, sender, sendBy, timeDate } = message;
  const subtitle = "title";

  return (
    <div>
      <div>
        <div className={`${sender === subtitle ? "text-start" : "text-end"}`}>
          <span>{`Sent by ${sendBy} | ${timeDate}`}</span>
        </div>
      </div>
      <div className={`message ${sender}`}>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
};

export default TestShowConversations;