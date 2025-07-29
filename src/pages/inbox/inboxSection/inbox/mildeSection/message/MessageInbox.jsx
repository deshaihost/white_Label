import React, { useEffect, useState } from "react";
import ThumbsUpIcon from "./thumbsComponent/icons/Thumbs_Up_Icon.svg";
import ThumbsDownIcon from "./thumbsComponent/icons/Thumbs_Down_Icon.svg";
import HelpCircleIcon from "./thumbsComponent/icons/help_circle.svg";
import HostBuddyIcon from "./thumbsComponent/icons/hostBuddy_icon.svg";
import dummyPropertyImg from "../../../../../../public/img/dummyPropertyImg.png";


const MessageInbox = ({
  key,
  text,
  sender,
  messageData,
  feedBckModelOpen,
  handleJustificationClick,
  feedBackDataGet,
  prevMsgText,
  isInitialMessage,
  guestName,
  guestImageUrl,
  conversationId,
  reservationId
}) => {
  const { typeThumbs, messageId } = feedBackDataGet ? feedBackDataGet : {};
  const { timeFormatConvert, sendBy, id, justification, response } = messageData;
  
  // Debug: Log the messageData to see its structure (can be removed after testing)
  console.log("MessageInbox - messageData:", messageData);
  console.log("MessageInbox - justification:", justification);
  
  const message_id = id ? id : [];
  const sendByFormatted =
    sendBy === "hostbuddy" ? "HostBuddy" : sendBy === "host" ? "Host" : sendBy;

  // Handle image loading error
  const [imageError, setImageError] = useState(false);  // Extract only the time in h:mm format
  const formatTimeToHHMM = (timeString) => {
    try {
      // Check if timeString is a valid date format
      const date = new Date(timeString);

      if (!isNaN(date.getTime())) {
        // Get hours and minutes
        let hours = date.getHours();
        const minutes = date.getMinutes();
        
        // Convert to 12-hour format
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        // Format minutes with leading zero if needed
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutesStr} ${ampm}`;
      } else if (typeof timeString === "string") {
        // If it's already a string, try to extract time part
        // This handles formats like "2023-04-25 14:30:00" or "14:30:00"
        const timeMatch = timeString.match(/(\d{1,2}):(\d{1,2})/);
        if (timeMatch) {
          let hours = parseInt(timeMatch[1], 10);
          const minutes = timeMatch[2];
          
          // Convert to 12-hour format
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          
          return `${hours}:${minutes} ${ampm}`;
        }
      }

      // If all else fails, return the original but still try to format any existing time
      if (timeString) {
        let result = timeString;
        // Try to capitalize existing am/pm
        if (result.includes('am')) result = result.replace('am', 'AM');
        if (result.includes('pm')) result = result.replace('pm', 'PM');
        if (result.includes('a.m.')) result = result.replace('a.m.', 'AM');
        if (result.includes('p.m.')) result = result.replace('p.m.', 'PM');
        return result;
      }
      
      return timeString;
    } catch (error) {
      return timeString; // Return original on error
    }
  };

  // Format the time
  const timeFormatHHMM = formatTimeToHHMM(timeFormatConvert);

  // Format guest name for display
  const displayName = guestName || "Guest";

  // Generate initials for avatar
  const getInitials = (name) => {
    if (!name || name === "Guest") return "G";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const initials = getInitials(displayName);

  // Reset image error state when guestImageUrl changes
  useEffect(() => {
    setImageError(false);
  }, [guestImageUrl]);

  // When the user clicks a message bubble: console.log the IDs so the support teams can easily access them from the frontend to use for troubleshooting and escalation.
  const handleMessageClick = () => {
    console.log('Message ID:', message_id);
    console.log('Conversation ID:', conversationId);
    console.log('Reservation ID: ', reservationId);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      {sender === "bot" ? (
        <p className="timing left-msg">
          {guestImageUrl && !imageError ? (
            <img
              src={guestImageUrl}
              alt={displayName}
              onError={() => setImageError(true)}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "4px",
                verticalAlign: "middle",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            />
          ) : (
            <span
              className="avatar-circle"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                backgroundColor: "#2196F3",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                marginRight: "6px",
                verticalAlign: "middle",
              }}
            >
              {initials}
            </span>
          )}
          {displayName}{" "}
          <span style={{ fontWeight: 400 }}>{timeFormatHHMM}</span>
        </p>
      ) : (
        <p className="text-end timing">
          {sendBy === "hostbuddy" && (
            <img
              src={HostBuddyIcon}
              alt="HostBuddy"
              style={{
                width: "21px",
                height: "21px",
                marginRight: "5px",
                verticalAlign: "middle",
              }}
            />
          )}
          {sendByFormatted}{" "}
          <span style={{ fontWeight: 400 }}>{timeFormatHHMM}</span>
        </p>
      )}
      <div 
        className={`message ${sender} mesaage-box`}
        onClick={handleMessageClick}
        style={{ cursor: 'pointer' }}
      >
        <div
          style={{
            width: "fit-content",
            maxWidth: "100%",
            height: "auto",
            minHeight: "fit-content",
            minWidth: text?.length <= 1 ? "30px" : "auto", // Add minimum width for very short messages
          }}
        >
          <p
            style={{
              margin: text?.length <= 1 ? "8px 0" : "", // Better vertical padding for single characters
              textAlign: text?.length <= 1 ? "center" : "left", // Center align very short messages
            }}
          >
            {messageData?.attachments &&
              messageData?.attachments.length > 0 && (
                <div className="image-attachment">
                  {messageData.attachments
                    .filter(
                      (attachment) =>
                        attachment.type.toLowerCase().includes("image") ||
                        ["jpeg", "jpg", "png", "gif", "bmp", "webp"].some(
                          (format) =>
                            attachment.type.toLowerCase().includes(format)
                        )
                    )
                    .map((attachment, index) => (
                      <img
                        key={index}
                        src={attachment.url}
                        alt="attachment"
                        style={{ width: "320px" }}
                      />
                    ))}
                </div>
              )}
            {text}
          </p>

          {sendBy === "hostbuddy" && (
            <div
              className=" thunbs"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                marginTop: "5px",
              }}
            >
              <span style={{ marginRight: "3px" }}>
                {typeThumbs === "up" ? (
                  <>
                    {messageId === message_id ? (
                      <img
                        src={ThumbsUpIcon}
                        alt="Thumbs Up"
                        className="mainCursor"
                        //   style={{ filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(90%) contrast(119%)' }}
                        onClick={() =>
                          feedBckModelOpen(
                            "up",
                            message_id,
                            response,
                            prevMsgText
                          )
                        }
                      />
                    ) : (
                      <img
                        src={ThumbsUpIcon}
                        alt="Thumbs Up"
                        className="mainCursor"
                        //    style={{ filter: 'brightness(0) invert(1)' }}
                        onClick={() =>
                          feedBckModelOpen(
                            "up",
                            message_id,
                            response,
                            prevMsgText
                          )
                        }
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={ThumbsUpIcon}
                    alt="Thumbs Up"
                    className="mainCursor"
                    //    style={{ filter: 'brightness(0) invert(1)' }}
                    onClick={() =>
                      feedBckModelOpen("up", message_id, response, prevMsgText)
                    }
                  />
                )}
              </span>
              <span style={{ marginRight: "3px" }}>
                {typeThumbs === "down" ? (
                  <>
                    {messageId === message_id ? (
                      <>
                        <img
                          src={ThumbsDownIcon}
                          alt="Thumbs Down"
                          className="mainCursor"
                          //    style={{ filter: 'invert(20%) sepia(100%) saturate(6418%) hue-rotate(357deg) brightness(89%) contrast(126%)' }}
                          onClick={() =>
                            feedBckModelOpen(
                              "down",
                              message_id,
                              response,
                              prevMsgText
                            )
                          }
                        />
                      </>
                    ) : (
                      <img
                        src={ThumbsDownIcon}
                        alt="Thumbs Down"
                        className="mainCursor"
                        //    style={{ filter: 'brightness(0) invert(1)' }}
                        onClick={() =>
                          feedBckModelOpen(
                            "down",
                            message_id,
                            response,
                            prevMsgText
                          )
                        }
                      />
                    )}
                  </>
                ) : (
                  <img
                    src={ThumbsDownIcon}
                    alt="Thumbs Down"
                    className="mainCursor"
                    //  style={{ filter: 'brightness(0) invert(1)' }}
                    onClick={() =>
                      feedBckModelOpen(
                        "down",
                        message_id,
                        response,
                        prevMsgText
                      )
                    }
                  />
                )}
              </span>
              <span>
                <img
                  src={HelpCircleIcon}
                  alt="Help"
                  className="mainCursor"
                  style={{ width: "16px", height: "16px" }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleJustificationClick(
                      e,
                      justification || "No justification available"
                    );
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>
      {/* <div className="mb-3">
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
      </div> */}
    </div>
  );
};

export default MessageInbox;
