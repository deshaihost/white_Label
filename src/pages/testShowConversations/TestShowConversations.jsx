import React from "react";
import "./TestShowConv.css";
const TestShowConversations = ({ message }) => {
  const { text, sender, sendBy, timeDate } = message;
  const subtitle = "title";
  return (
    <div>
      <div>
        {
          <div className={`${sender === subtitle ? "text-start" : "text-end"}`}>
            <span>{`${
              sender === subtitle ? timeDate : `Sent by ${sendBy} | ${timeDate}`
            }`}</span>
          </div>
        }
      </div>
      <div className={`message ${sender}`}>
        <div>
          <p>
            {sender === subtitle ? (
              <>
                <>{text}</>
              </>
            ) : (
              <>{text}</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestShowConversations;
