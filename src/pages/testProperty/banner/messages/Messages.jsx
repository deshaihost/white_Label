import React from "react";
import BotImg from "../../../../public/img/hostbuddy_icon_white.png";
import UserImg from "../../../../public/img/userimg2.png";

function Message({ key, text, sender, feedBckModelOpen, feedBackDataGet }) {
  const { response, message_id } = text ? text : [];
  const { typeThumbs, messageId,  } = feedBackDataGet
    ? feedBackDataGet
    : [];
  return (
    <div>
      <div className={`message ${sender}`}>
        {sender === "bot" && (
          <img src={BotImg} className="bot-img" alt="bot-img" />
        )}
        <p>{sender === "bot" ? <>{response}</> : <>{text}</>}</p>
        {sender === "bot" && (
          <div className=" py-3">
            <span>
              {typeThumbs === "up"?<>{messageId === message_id?<>
                <i
                className="bi bi-hand-thumbs-up text-danger mainCursor"
                onClick={() => feedBckModelOpen("up", message_id)}
              ></i>
              
              </>:<i
                className="bi bi-hand-thumbs-up text-white mainCursor"
                onClick={() => feedBckModelOpen("up", message_id)}
              ></i>}</>:<i
                className="bi bi-hand-thumbs-up text-white mainCursor"
                onClick={() => feedBckModelOpen("up", message_id)}
              ></i>}
            </span>
            <span>
            {typeThumbs === "down"?<>{messageId === message_id?<>
              <i
              className="bi bi-hand-thumbs-down text-danger mainCursor"
              onClick={() => feedBckModelOpen("down", message_id)}
            ></i>
            </>:<i
              className="bi bi-hand-thumbs-down text-white mainCursor"
              onClick={() => feedBckModelOpen("down", message_id)}
            ></i>}</>:<i
              className="bi bi-hand-thumbs-down text-white mainCursor"
              onClick={() => feedBckModelOpen("down", message_id)}
            ></i>}
            </span>
          </div>
        )}
        {sender === "user" && (
          <img src={UserImg} className="user-img" alt="user-img" />
        )}
      </div>
    </div>
  );
}

export default Message;
