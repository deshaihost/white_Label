import React from "react";
import BotImg from "../../../../public/img/logo/logoGraphicOnlySquare.webp";
import UserImg from "../../../../public/img/userimg2.png";
import TypingIndicator from "../../../../component/chatbotThinkingBubble/typingIndicator";

function Message({  text, sender }) {
  const { response, message_id } = text ? text : [];
  const useLoader = sender === "bot" && !response && !message_id
  return (
    <div>
      <div className={`message ${sender}`}>
        {sender === "bot" && (
          <img src={BotImg} className="bot-img" alt="bot-img"  style={{marginTop:'8px'}}/>
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
