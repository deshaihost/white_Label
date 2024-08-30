import React, { useEffect } from "react";

const MessageInbox = ({key, text, sender, messageData, feedBckModelOpen, handleJustificationClick, feedBackDataGet, prevMsgText, isInitialMessage}) => {
  const { typeThumbs, messageId } = feedBackDataGet ? feedBackDataGet : {};
  const { timeFormatConvert, sendBy } = messageData;
  const messageDetails = messageData?.text;
  const { id, justification, response } = messageDetails;
  const message_id = id ? id : [];

  return (
    <div>
      <p>
        {sender === "bot" ? (
            <div className="timing left-msg">{timeFormatConvert}</div>
        ) : (
            <div className="text-end timing">{timeFormatConvert}</div>
        )}
      </p>
      <div className={`message ${sender}  mesaage-box`}>
        {sendBy === "hostbuddy" && (
          <div className=" py-3 thunbs">
            <span>
              {typeThumbs === "up" ? (
                <>
                  {messageId === message_id ? (
                    <i className="bi bi-hand-thumbs-up text-success mainCursor" onClick={() => feedBckModelOpen("up", message_id, response, prevMsgText)}></i>
                  ) : (
                    <i className="bi bi-hand-thumbs-up text-white mainCursor" onClick={() => feedBckModelOpen("up", message_id, response, prevMsgText)}></i>
                  )}
                </>
              ) : (
                <i className="bi bi-hand-thumbs-up text-white mainCursor" onClick={() => feedBckModelOpen("up", message_id, response, prevMsgText)}></i>
              )}
            </span>
            <span>
              {typeThumbs === "down" ? (
                <>
                  {messageId === message_id ? (
                    <>
                      <i className="bi bi-hand-thumbs-down text-danger mainCursor" onClick={() => feedBckModelOpen("down", message_id, response, prevMsgText)}></i>
                    </>
                  ) : (
                    <i className="bi bi-hand-thumbs-down text-white mainCursor" onClick={() => feedBckModelOpen("down", message_id, response, prevMsgText)}></i>
                  )}
                </>
              ) : (
                <i className="bi bi-hand-thumbs-down text-white mainCursor" onClick={() => feedBckModelOpen("down", message_id, response, prevMsgText)}></i>
              )}
            </span>
          </div>
        )}
        <p>
          {sender === "bot" ? (
            <>{text}</>
          ) : (
            <>
              <div>{text}</div>
            </>
          )}
        </p>
      </div>
      <div className="mb-3">
        {sender === "bot" ? (
          <>
            <div className="timing left-msg">Sent by {sendBy}</div>
          </>
        ) : (
          <>
            <div className="where-did">
              <div>
                {sendBy === "hostbuddy" && (
                  <div className="link-container ">
                    <a href="#" onClick={(e) => handleJustificationClick(e, justification)}>Where did this come from?</a>
                  </div>
                )}
              </div>
              <div className="text-end timing">Sent by {sendBy}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageInbox;
