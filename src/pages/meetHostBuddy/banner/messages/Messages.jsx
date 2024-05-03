import React from "react";
import BotImg from "../../../../public/img/hostbuddy_icon_white.png";
import UserImg from "../../../../public/img/userimg2.png";

function Message({ text, sender,feedBckModelOpen }) {
  return (
    <div>
      <div className={`message ${sender}`}>
        {sender === "bot" && (
          <img src={BotImg} className="bot-img" alt="bot-img" />
        )}
        <p>{text}</p>
        {/* {sender === "bot" && (
          <div className=" py-3"> 
            <span>
              <i class="bi bi-hand-thumbs-up text-white" onClick={feedBckModelOpen}></i>
            </span>
            <span>
              <i class="bi bi-hand-thumbs-down" onClick={feedBckModelOpen}></i>
            </span>
          </div>
        )} */}
        {sender === "user" && (
          <img src={UserImg} className="user-img" alt="user-img" />
        )}
      </div>
      
    </div>
  );
}

export default Message;
