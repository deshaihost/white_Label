import React from "react";
import BotImg from "../../../../../../public/img/logo/logoGraphicOnlySquare.png";
import UserImg from "../../../../../../public/img/userimg2.png";
import Loader from "../../../../../../helper/Loader";

const MessageInbox = ({
  key,
  text,
  sender,
  currentMessageDay,
  feedBckModelOpen,
  feedBackDataGet,
}) => {
  const { response, message_id } = text ? text : {};
  const use_loader = sender === "bot" && !response && !message_id;
  return (
    <div>
      {/* <div>{currentMessageDay}</div> */}
      <div className={`message ${sender}`}>
        {sender === "bot" && (
          <img src={BotImg} className="bot-img" alt="bot-img" />
        )}
        <p>{sender === "bot" ? <>{text}</> : <>{text}</>}</p>
        {sender === "user" && (
          <img src={UserImg} className="user-img" alt="user-img" />
        )}
      </div>
    </div>
  );
};

export default MessageInbox;
