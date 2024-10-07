import React from "react";
import "./TestShowConv.css";
import BotImg from "../../public/img/logo/logoGraphicOnlySquare.webp";
import userImg from "../../public/img/userimg2.webp";

const TestShowConversations = ({ message }) => {
  const { text, sender, sendBy, timeDate } = message;

  return (
    <div>
      <div>
        <div className={`${sender === "guest" ? "text-start" : "text-end"}`}>
          <span>{`Sent by ${sendBy} | ${timeDate}`}</span>
        </div>
      </div>
      <div className={`message ${sender}`}>
        {sender === "guest" && (
          <img src={userImg} className="sender-img" alt="user-img" style={{marginTop:'3px', marginRight:'3px'}}/>
        )}
        <div>
          <p>{text}</p>
        </div>
        {sender === "host" && (
          <img src={BotImg} className="sender-img" alt="bot-img" style={{marginTop:'3px', marginLeft:'3px'}}/>
        )}
      </div>
    </div>
  );
};

export default TestShowConversations;