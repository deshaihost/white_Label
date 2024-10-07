import React from "react";
import BotImg from "../../../../public/img/logo/logoGraphicOnlySquare.webp";
import UserImg from "../../../../public/img/userimg2.png";
import Loader from "../../../../helper/Loader";
import TypingIndicator from "../../../../component/chatbotThinkingBubble/typingIndicator";

function Message({ key, text, sender, feedBckModelOpen, handleJustificationClick, feedBackDataGet, prevMsgText, isInitialMessage }) {

  const { response, message_id, justification } = text ? text : {};
  const { typeThumbs, messageId,  } = feedBackDataGet ? feedBackDataGet : {};
  const useLoader = sender === "bot" && !response && !message_id // don't treat this as an actual message - show the animated "..." bubble instead

  return (
    <>
      <div className="test-property-message-container">
        <div className={`message ${sender}`}>
          {sender === "bot" && (
            <img src={BotImg} className="bot-img" alt="bot-img" style={{marginTop:'8px'}}/>
          )}
          <p>{useLoader ? <TypingIndicator /> : (sender === "bot" ? <>{response}</> : <>{text}</>)}</p>
          {sender === "bot" && !useLoader && (
            <div className=" py-3">
              <span>
                {typeThumbs === "up"?
                  <>{messageId === message_id?
                    <i className="bi bi-hand-thumbs-up text-success mainCursor" onClick={() => feedBckModelOpen("up", message_id, response, prevMsgText)}></i>
                    :
                    <i className="bi bi-hand-thumbs-up text-white mainCursor" onClick={() => feedBckModelOpen("up", message_id, response, prevMsgText)}></i>}
                  </>
                : <i className="bi bi-hand-thumbs-up text-white mainCursor" onClick={() => feedBckModelOpen("up", message_id, response, prevMsgText)}></i>}
              </span>
              <span>
              {typeThumbs === "down"?
                <>{messageId === message_id?<>
                  <i className="bi bi-hand-thumbs-down text-danger mainCursor" onClick={() => feedBckModelOpen("down", message_id, response, prevMsgText)}></i></>
                  :
                  <i className="bi bi-hand-thumbs-down text-white mainCursor" onClick={() => feedBckModelOpen("down", message_id, response, prevMsgText)}></i>}
                </>
              : <i className="bi bi-hand-thumbs-down text-white mainCursor" onClick={() => feedBckModelOpen("down", message_id, response, prevMsgText)}></i>}
              </span>
            </div>
          )}
          {sender === "user" && (
            <img src={UserImg} className="user-img" alt="user-img" />
          )}
        </div>

        {sender === "bot" && !isInitialMessage && !useLoader && (
          <div className="link-container">
            <a href="#" onClick={(e) => handleJustificationClick(e, justification)}>Where did this come from?</a>
          </div>
        )}
      </div>
    </>
  );
}

export default Message;
