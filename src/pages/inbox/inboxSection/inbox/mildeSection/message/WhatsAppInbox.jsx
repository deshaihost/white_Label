import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { timeFormat } from "../../../../../../helper/commonFun";
import WhatsAppIcon from "./icons/whatsapp_icon.svg"; // Make sure to create or import this icon
import ThumbsUpIcon from "./thumbsComponent/icons/Thumbs_Up_Icon.svg";
import ThumbsDownIcon from "./thumbsComponent/icons/Thumbs_Down_Icon.svg";
import HelpCircleIcon from "./thumbsComponent/icons/help_circle.svg";
import HostBuddyIcon from "./thumbsComponent/icons/hostBuddy_icon.svg"; // Import HostBuddy icon

const WhatsAppInbox = ({ message, guestName, guestImageUrl, feedBackDataGet, feedBckModelOpen, prevMsgText, handleJustificationClick }) => {
  // Handle image loading error
  const [imageError, setImageError] = useState(false);

  // Extract message details
  const { id, text, time, time_utc, sender, justification, response } = message || {};
  const isHost = sender === "host" || sender === "hostbuddy";
  const message_id = id ? id : [];
  const sendByFormatted =
    sender === "hostbuddy" ? "HostBuddy" : sender === "host" ? "Host" : sender;

  // Determine message sender for CSS class - guest messages use "bot", host messages use "user"
  const messageSender = isHost ? "user" : "bot";  // Format time
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
  const timeFormatHHMM = formatTimeToHHMM(time);

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


  return (
    <div style={{ marginBottom: "20px" }}>      {/* Message timing header - same structure as MessageInbox */}
      {messageSender === "bot" ? (
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
        </p>)
        :
        (
          <p className="text-end timing">
            {sender === "hostbuddy" && (
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

      {/* Message bubble - same structure as MessageInbox */}
      <div className={`message ${messageSender} mesaage-box`}>
        <div
          style={{
            width: "fit-content",
            maxWidth: "100%",
            height: "auto",
            minHeight: "fit-content",
            minWidth: text?.length <= 1 ? "30px" : "auto",
          }}
        >
          <p
            style={{
              margin: text?.length <= 1 ? "8px 0" : "",
              textAlign: text?.length <= 1 ? "center" : "left",
            }}
          >
            {message?.attachments &&
              message?.attachments.length > 0 && (
                <div className="image-attachment">
                  {message.attachments
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
          {/* Thumbs feedback for hostbuddy messages, same logic as MildeSection.jsx */}
          {sender === "hostbuddy" && (
            <div
              className="thunbs"
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                marginTop: "5px",
              }}
            >
              <span style={{ marginRight: "3px" }}>
                <img
                  src={ThumbsUpIcon}
                  alt="Thumbs Up"
                  className="mainCursor"
                  onClick={() =>
                    feedBckModelOpen("up", message_id, response, prevMsgText)
                  }
                />
              </span>
              <span style={{ marginRight: "3px" }}>
                <img
                  src={ThumbsDownIcon}
                  alt="Thumbs Down"
                  className="mainCursor"
                  onClick={() =>
                    feedBckModelOpen("down", message_id, response, prevMsgText)
                  }
                />
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
    </div>
  );
};

export default WhatsAppInbox;