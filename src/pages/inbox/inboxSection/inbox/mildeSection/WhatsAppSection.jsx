import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import "./MildeSection.css";
import WhatsAppInbox from "./message/WhatsAppInbox";
import { timeFormat } from "../../../../../helper/commonFun";
import ToastHandle from "../../../../../helper/ToastMessage";
import loaderGif from "../../../../../public/img/new_loader.gif";
import { callSendWhatsAppMessageApi } from "../../../../../helper/getConversationsTest/inboxApi";

// Import icons for AI input functionality
import AiMessageIcon from "./message/icons/ai_messsage_icon.svg";
import ChevDownIcon from "./message/icons/chevDown.svg";

const placeholderImg = "https://hostbuddylb.com/misc/chatBubbles.webp";

const WhatsAppSection = ({ allConversationData, updateConversationFromApi, propertyName }) => {
  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  
  const [hasWhatsappIntegration, setHasWhatsappIntegration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  
  // AI input functionality states
  const [inputValue, setInputValue] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [generateOptionsVisible, setGenerateOptionsVisible] = useState(false);
  const [generateCommandApiLoading, setGenerateCommandApiLoading] = useState(false);
  const [generateScratchApiLoading, setGenerateScratchApiLoading] = useState(false);

  // Extract guest information from conversation data
  const guestName = allConversationData?.guest_name || "Guest";
  const guestImageUrl = allConversationData?.image_url || "";

  // Extract WhatsApp messages from conversation data
  const whatsappMessages = allConversationData?.whatsapp_messages || [];

  // Check for WhatsApp integration by calling the get_user_data API
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

        // Check if user has WhatsApp phone number in the response
        // Important: We must check the user data from the API, not the conversation data
        if (
          response.data &&
          response.data.user &&
          response.data.user.whatsapp_phone_number
        ) {
          setHasWhatsappIntegration(true);
        } else {
          setHasWhatsappIntegration(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setHasWhatsappIntegration(false);
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
  };
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [whatsappMessages]);

  // Handle sending WhatsApp message
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    if (!allConversationData?.conversation_id) return;
    setSendMessageLoading(true);

    const { conversation_id, reservation_id = null } = allConversationData;
    const messageToSend = inputValue;

    try {
      const sendMsgResponse = await callSendWhatsAppMessageApi(
        messageToSend,
        conversation_id,
        reservation_id,
        propertyName,
        null // assistanceUsed
      );

      if (!("error" in sendMsgResponse)) {
        setInputValue("");
        if (updateConversationFromApi) {
          await updateConversationFromApi(conversation_id);
        }
      }
    } catch (error) {
      ToastHandle("Error sending WhatsApp message", "danger");
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
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  };

  // Handle generate button click
  const handleGenerateButtonClick = () => {
    setGenerateOptionsVisible(!generateOptionsVisible);
  };

  // Handle generate option select
  const handleGenerateOptionSelect = (option) => {
    // Placeholder for AI generation functionality
    setGenerateOptionsVisible(false);
    ToastHandle("AI generation for WhatsApp coming soon", "info");
  };

  return (
    <div
      className="whatsapp-section box"
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
            Loading WhatsApp data...
          </p>
        </div>      ) : whatsappMessages.length > 0 ? (
        // Display WhatsApp messages if they exist
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
            {whatsappMessages.map((message) => (
              <WhatsAppInbox
                key={message.id}
                message={message}
                guestName={guestName}
                guestImageUrl={guestImageUrl}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* AI Input Container for WhatsApp */}
          {hasWhatsappIntegration && allConversationData?.conversation_id && (
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
              >                <textarea
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
                  }                  className="custom-textarea"
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
              </div>              <div
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
              {/* If the user has WhatsApp integration but no messages */}
              {hasWhatsappIntegration ? (
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
                    No WhatsApp messages in this conversation.
                  </p>
                </>
              ) : (
                // If WhatsApp integration is not configured
                <>
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ marginBottom: "20px" }}
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="#A6A9B2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.09 9.00002C9.3251 8.33169 9.78915 7.76813 10.4 7.40915C11.0108 7.05018 11.7289 6.91896 12.4272 7.03873C13.1255 7.15851 13.7588 7.52154 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13"
                      stroke="#A6A9B2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 17H12.01"
                      stroke="#A6A9B2"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p
                    style={{
                      color: "#A6A9B2",
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    WhatsApp integration not configured for this account.
                  </p>{" "}
                  <Link
                    to="/setting//messaging-channels"
                    style={{
                      color: "#146ef5",
                      fontSize: "14px",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Configure WhatsApp Integration
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
              Select a conversation to view WhatsApp messages
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WhatsAppSection;
