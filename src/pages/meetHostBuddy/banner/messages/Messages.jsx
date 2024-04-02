import React from "react";
import BotImg from "../../../../public/img/hostbuddy_icon_white.png";
import UserImg from "../../../../public/img/userimg2.png";
import Loader from "../../../../helper/Loader";
import { useSelector } from "react-redux";
function Message({ text, sender }) {
  const store = useSelector((state) => state);

  console.log(text, "texttext");
  return (
    <div>
      <div className={`message ${sender}`}>
        {sender == "bot" && (
          <img src={BotImg} className="bot-img" alt="bot-img" />
        )}
        <p>{text}</p>
        {sender == "user" && (
          <img src={UserImg} className="user-img" alt="user-img" />
        )}
       
      </div>
    </div>
  );
}

export default Message;
