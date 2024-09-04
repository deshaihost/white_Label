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
            <div className="text-end timing">Sent by {sendBy} | {timeFormatConvert}</div>
        )}
      </p>
      <div className={`message ${sender} mesaage-box`}>
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
          {messageData?.attachments && messageData?.attachments.length > 0 && (
            <div className="image-attachment">
              {messageData.attachments
                .filter(attachment => attachment.type.includes("image"))
                .map((attachment, index) => (
                  <img key={index} src={attachment.url} alt="attachment" style={{width:"320px"}}/>
                ))}
            </div>
          )}
          {text}
        </p>
      </div>
      <div className="mb-3">
        {sender != "bot" && (
          <div className="where-did" style={{ position: 'relative', marginBottom: (sendBy === "hostbuddy" && justification) ? '30px' : '0' }}>
            <div>
              {sendBy === "hostbuddy" && justification && (
                <div className="link-container" style={{ position:'absolute', right:0 }}>
                  <a href="#" onClick={(e) => handleJustificationClick(e, justification)}>
                    Where did this come from?
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageInbox;
