import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import "./MildeSection.css";
import OpenPhoneInbox from "./message/OpenPhoneInbox";
import ToastHandle from "../../../../../helper/ToastMessage";
import loaderGif from "../../../../../public/img/new_loader.gif";
import { callSendOpenPhoneMessageApi } from "../../../../../helper/getConversationsTest/inboxApi";

const placeholderImg = "https://hostbuddylb.com/misc/chatBubbles.webp";

const OpenPhoneSection = ({
  allConversationData,
  updateConversationFromApi,
  propertyName,
}) => {
  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [hasOpenPhoneIntegration, setHasOpenPhoneIntegration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  // AI input functionality states
  const [inputValue, setInputValue] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [generateOptionsVisible, setGenerateOptionsVisible] = useState(false);
  const [generateCommandApiLoading, setGenerateCommandApiLoading] =
    useState(false);
  const [generateScratchApiLoading, setGenerateScratchApiLoading] =
    useState(false);

  // Local state for OpenPhone messages with optimistic rendering
  const [openphoneMessages, setOpenPhoneMessages] = useState([]);

  // Extract guest information from conversation data
  const guestName = allConversationData?.guest_name || "Guest";
  const guestImageUrl = allConversationData?.image_url || "";

  // Check for OpenPhone integration by calling the get_user_data API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const API_KEY = process.env.REACT_APP_API_KEY;
        const baseUrl = process.env.REACT_APP_API_ENDPOINT;

        const response = await axios.get(`${baseUrl}/get_user_data`, {
          headers: { "X-API-Key": API_KEY },
        });

        // Store the user data
        if (response.data && response.data.user) {
          setUserData(response.data.user);
        }

        // Check if user has OpenPhone phone number in the response
        // Important: We must check the user data from the API, not the conversation data
        if (
          response.data &&
          response.data.user &&
          response.data.user.openphone_numbers
        ) {
          setHasOpenPhoneIntegration(true);
        } else {
          setHasOpenPhoneIntegration(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setHasOpenPhoneIntegration(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Scrolls to the bottom of the message list when new messages arrive
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [openphoneMessages]);

  // Sync local OpenPhone messages state with conversation data
  useEffect(() => {
    if (allConversationData?.openphone_messages) {
      setOpenPhoneMessages(allConversationData.openphone_messages);
    } else {
      setOpenPhoneMessages([]);
    }
  }, [allConversationData?.openphone_messages]);

  // Handle sending OpenPhone message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    if (!allConversationData?.conversation_id) return;
    setSendMessageLoading(true);

    const { conversation_id, reservation_id = null } = allConversationData;
    const messageToSend = inputValue;
    const currentTime = new Date();

    // Create optimistic message object
    const optimisticMessage = {
      id: `temp-${Date.now()}`, // Temporary ID until API response
      text: messageToSend,
      time: currentTime.toISOString(),
      time_utc: currentTime.toISOString(),
      sender: "host"
    };

    // Add the message immediately to show it in the UI
    setOpenPhoneMessages(prevMessages => [...prevMessages, optimisticMessage]);
    setInputValue("");

    try {
      const sendMsgResponse = await callSendOpenPhoneMessageApi(
        messageToSend,
        conversation_id,
        reservation_id,
        propertyName,
        null
      );

      if (!("error" in sendMsgResponse)) {
        // Success - the API response will update via updateConversationFromApi
        if (updateConversationFromApi) {
          await updateConversationFromApi(conversation_id);
        }
      } else {
        // If there was an error, remove the optimistic message and restore input
        setOpenPhoneMessages(prevMessages => 
          prevMessages.filter(msg => msg.id !== optimisticMessage.id)
        );
        setInputValue(messageToSend); // Restore the message text
        ToastHandle("Error sending OpenPhone message", "danger");
      }
    } catch (error) {
      // Remove the optimistic message on error and restore input
      setOpenPhoneMessages(prevMessages => 
        prevMessages.filter(msg => msg.id !== optimisticMessage.id)
      );
      setInputValue(messageToSend); // Restore the message text
      ToastHandle("Error sending OpenPhone message", "danger");
    } finally {
      setSendMessageLoading(false);
    }
  };

  // Handle input field changes
  const handleInputFieldChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  // Handle key press in textarea
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (e.shiftKey) {
        // Insert a new line when shift+enter is pressed
        e.preventDefault();
        const { selectionStart, selectionEnd, value } = e.target;
        const newValue =
          value.substring(0, selectionStart) +
          "\n" +
          value.substring(selectionEnd);
        setInputValue(newValue);
        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
        }, 0);
      } else {
        handleSendMessage();
      }
    }
  };

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  return (
    <div
      className="openphone-section box"
      style={{
        padding: "0px",
        backgroundColor: "#0F1117",
        borderRadius: "4px",
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Show loading state */}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p style={{ color: "#A6A9B2", fontSize: "16px", marginTop: "10px" }}>
            Loading OpenPhone data...
          </p>
        </div>
      ) : openphoneMessages.length > 0 ? (
        // Display OpenPhone messages if they exist
        <>
          <div
            ref={messageListRef}
            className="message-list"
            style={{
              flex: 1,
              overflow: "auto",
              padding: "15px",
              backgroundColor: "#0F1117",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {openphoneMessages.map((message) => (
              <OpenPhoneInbox
                key={message.id}
                message={message}
                guestName={guestName}
                guestImageUrl={guestImageUrl}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Input Container for OpenPhone */}
          {hasOpenPhoneIntegration && allConversationData?.conversation_id && (
            <div
              className="ai-input"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: "#17191F",
                borderTop: "1px solid #24262E",
              }}
            >
              <div
                className="input-container"
                style={{ width: "100%", marginBottom: "10px" }}
              >
                {" "}
                <textarea
                  type="text"
                  ref={textareaRef}
                  placeholder="Message..."
                  value={inputValue}
                  onChange={handleInputFieldChange}
                  onKeyDown={handleKeyPress}
                  rows="1"
                  disabled={
                    generateCommandApiLoading ||
                    generateScratchApiLoading ||
                    sendMessageLoading
                      ? true
                      : false
                  }
                  className="custom-textarea"
                  style={{
                    width: "100%",
                    backgroundColor: "#17191F",
                    border: "none",
                    borderRadius: "0",
                    resize: "none",
                    overflow: "auto",
                    outline: "none",
                    boxShadow: "none",
                    color: "#ffffff",
                  }}
                />
                {(generateCommandApiLoading || generateScratchApiLoading) && (
                  <div className="loader-container">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>{" "}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <div
                  className="send-container"
                  style={{ position: "relative" }}
                >
                  <button
                    onClick={handleSendMessage}
                    className="chat-send-button"
                    disabled={
                      generateCommandApiLoading ||
                      generateScratchApiLoading ||
                      sendMessageLoading ||
                      !inputValue.trim()
                    }
                    style={{
                      backgroundColor:
                        !inputValue.trim() &&
                        !(
                          generateCommandApiLoading ||
                          generateScratchApiLoading ||
                          sendMessageLoading
                        )
                          ? "rgba(15, 17, 23, 0.42)"
                          : "#007bff",
                      color:
                        !inputValue.trim() &&
                        !(
                          generateCommandApiLoading ||
                          generateScratchApiLoading ||
                          sendMessageLoading
                        )
                          ? "#4A4D54"
                          : "white",
                    }}
                  >
                    {sendMessageLoading ? (
                      <img src={loaderGif} width="25" height="25" />
                    ) : (
                      <>
                        <span
                          style={{
                            marginRight: "1px",
                            marginLeft: "2px",
                            fontSize: "12px",
                          }}
                        >
                          Send
                        </span>
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ marginLeft: "2px" }}
                        >
                          <path
                            d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        // Display empty state message
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            textAlign: "center",
            padding: "20px",
          }}
        >
          {allConversationData?.conversation_id ? (
            <div>
              {/* If the user has OpenPhone integration but no messages */}
              {hasOpenPhoneIntegration ? (
                <>
                  <img
                    src={placeholderImg}
                    alt="No Messages"
                    style={{
                      width: "120px",
                      height: "auto",
                      marginBottom: "20px",
                      opacity: "0.6",
                    }}
                  />
                  <p
                    style={{
                      color: "#A6A9B2",
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    No OpenPhone messages in this conversation.
                  </p>
                </>
              ) : (
                // If OpenPhone integration is not configured
                <>                  <svg
                    width="60"
                    height="60"
                    viewBox="0 0 60 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginBottom: "20px" }}
                  >
                    {/* Circular background with increased radius */}
                    <circle cx="30" cy="30" r="28" fill="rgba(95, 56, 65, 1)" />
                    
                    {/* OpenPhone integration icon - better centered */}
                    <g transform="translate(16, 14) scale(1.75)">
                      <path d="M9.85625 0.484375C9.67812 0.184375 9.35 0 9 0C8.65 0 8.32188 0.184375 8.14375 0.484375L5.14375 5.48438C4.95938 5.79375 4.95312 6.17812 5.13125 6.49062C5.30937 6.80312 5.64062 6.99687 6 6.99687H12C12.3594 6.99687 12.6937 6.80312 12.8687 6.49062C13.0437 6.17812 13.0406 5.79375 12.8562 5.48438L9.85625 0.484375ZM9 9.75V14.25C9 14.9406 9.55937 15.5 10.25 15.5H14.75C15.4406 15.5 16 14.9406 16 14.25V9.75C16 9.05937 15.4406 8.5 14.75 8.5H10.25C9.55937 8.5 9 9.05937 9 9.75ZM4 16C5.06087 16 6.07828 15.5786 6.82843 14.8284C7.57857 14.0783 8 13.0609 8 12C8 10.9391 7.57857 9.92172 6.82843 9.17157C6.07828 8.42143 5.06087 8 4 8C2.93913 8 1.92172 8.42143 1.17157 9.17157C0.421427 9.92172 0 10.9391 0 12C0 13.0609 0.421427 14.0783 1.17157 14.8284C1.92172 15.5786 2.93913 16 4 16Z" fill="#F7CFD8"/>
                    </g>
                    
                    {/* 8×8 star at top right */}
                    <g transform="translate(44, 6)">
                      <path d="M4 0L4.1362 2.00402C4.20401 3.00171 4.99829 3.79599 5.99598 3.8638L8 4L5.99598 4.1362C4.99829 4.20401 4.20401 4.99829 4.1362 5.99598L4 8L3.8638 5.99598C3.79599 4.99829 3.00171 4.20401 2.00402 4.1362L0 4L2.00402 3.8638C3.00171 3.79599 3.79599 3.00171 3.8638 2.00402L4 0Z" fill="#D37B8F"/>
                    </g>
                    
                    {/* 9×9 star at bottom right */}
                    <g transform="translate(46, 44)">
                      <path d="M4.5 0L4.66802 2.4722C4.73583 3.46989 5.53011 4.26417 6.5278 4.33198L9 4.5L6.5278 4.66802C5.53011 4.73583 4.73583 5.53011 4.66802 6.5278L4.5 9L4.33198 6.5278C4.26417 5.53011 3.46989 4.73583 2.4722 4.66802L0 4.5L2.4722 4.33198C3.46989 4.26417 4.26417 3.46989 4.33198 2.4722L4.5 0Z" fill="#D37B8F"/>
                    </g>
                    
                    {/* 12×12 star at left side */}
                    <g transform="translate(4, 24)">
                      <path d="M6 0L6.26348 3.87674C6.33129 4.87443 7.12557 5.66871 8.12326 5.73652L12 6L8.12326 6.26348C7.12557 6.33129 6.33129 7.12557 6.26348 8.12326L6 12L5.73652 8.12326C5.66871 7.12557 4.87443 6.33129 3.87674 6.26348L0 6L3.87674 5.73652C4.87443 5.66871 5.66871 4.87443 5.73652 3.87674L6 0Z" fill="#EEBBC7"/>
                    </g>
                  </svg>
                  <p
                    style={{
                      color: "rgba(208, 211, 219, 1)",
                      fontSize: "14px",
                      fontWeight: "600",
                      marginBottom: "10px",
                    }}
                  >
Setup OpenPhone to enhance communication with your guests!                  </p>{" "}                  <Link
                    to="/setting/integrations"
                    style={{
                      color: "rgba(116, 169, 247, 1)",
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "DM Sans, sans-serif",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}>
                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginRight: "4px" }}
                    >
                      <path d="M8.49967 5.33334V10.6667M5.83301 8.00001H11.1663M15.1663 8.00001C15.1663 11.6819 12.1816 14.6667 8.49967 14.6667C4.81778 14.6667 1.83301 11.6819 1.83301 8.00001C1.83301 4.31811 4.81778 1.33334 8.49967 1.33334C12.1816 1.33334 15.1663 4.31811 15.1663 8.00001Z" stroke="#74A9F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Integrate OpenPhone
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: "4px" }}
                    >
                      <path
                        d="M3.33334 8H12.6667"
                        stroke="#146ef5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 3.33334L12.6667 8.00001L8 12.6667"
                        stroke="#146ef5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </>
              )}
            </div>
          ) : (
            // If no conversation is selected
            <p style={{ color: "#A6A9B2", fontSize: "16px" }}>
              Select a conversation to view OpenPhone messages
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default OpenPhoneSection;