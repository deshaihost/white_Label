import React from "react";
import BotImg from "../../../../public/img/logo/logoGraphicOnlySquare.webp";
import UserImg from "../../../../public/img/userimg2.webp";
import Loader from "../../../../helper/Loader";
import TypingIndicator from "../../../../component/chatbotThinkingBubble/typingIndicator";


function Message({ key, text, sender, feedBckModelOpen, feedBackDataGet }) {
  const { response, message_id } = text ? text : {};
  const useLoader = (!text) // don't treat this as an actual message - show the animated "..." bubble instead
  return (
    <div>
      <div className={`message ${sender}`}>
        {sender === "bot" && (
          <img src={BotImg} className="bot-img" alt="bot-img" style={{marginTop:'7px'}} />
        )}
        <p>{useLoader ? <TypingIndicator /> : (sender === "bot" ? <>{response}</> : <>{text}</>)}</p>
        {sender === "user" && (
          <img src={UserImg} className="user-img" alt="user-img" />
        )}
      </div>
    </div>
  );
}

export default Message;
