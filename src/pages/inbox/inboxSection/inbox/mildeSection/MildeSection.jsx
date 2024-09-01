import React, { useEffect, useRef, useState } from "react";
import MessageInbox from "./message/MessageInbox";
import Loader from "../../../../../helper/Loader";
import loaderGif from "../../../../../public/img/new_loader.gif";
import "./index.css";
import { timeFormat } from "../../../../../helper/commonFun";
import { callSendMessageApi } from "../../../../../helper/getConversationsTest/inboxApi";
import MessgFeedBckModel from "../../../../testProperty/banner/messages/messagesFeedBckModel/MessgFeedBckModel";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";

const MildeSection = ({ allConversationData, updateConversationFromApi, updateCovnersationLocal }) => {
  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [conversationData, setConversationData] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [generateButtonIsEnabled, setGenerateButtonIsEnabled] = useState(false);
  const [generateButtonText, setGenerateButtonText] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    setSendMessageLoading(true);

    const { conversation_id, reservation_id=null } = conversationData; // reservation_id default to null if not present. Sometimes the send operation will still work if it isn't included, so proceed
    const sendMsgResponse = await callSendMessageApi(inputValue, conversation_id, reservation_id, propertyName);
    if (!("error" in sendMsgResponse)) {
      setInputValue("");
      await updateConversationFromApi(conversation_id);
    }
    setSendMessageLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (e.shiftKey) { // Insert a new line when shift+enter is pressed instead of sending the message
        e.preventDefault();
        const { selectionStart, selectionEnd, value } = e.target;
        const newValue = value.substring(0, selectionStart) + "\n" + value.substring(selectionEnd);
        setInputValue(newValue);
        setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = selectionStart + 1; }, 0); // Move the cursor to the new position
      } else {
        handleSendMessage();
      }
    }
  };

  // feed back functionality
  const [justificationText, setJustificationText] = useState("");
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [feedBackModelOpen, setFeedBackModelOpen] = useState(false);
  const [feedBackDataGet, setFeedBackDataGet] = useState({
    typeThumbs: "",
    conversationId: "",
    messageId: "",
    propertyName: "",
    botMsg: "",
    precedingGuestMsg: "",
  });

  const feedBckModelOpenHndle = (type, messId, botMsg, precedingGuestMsg) => {
    setFeedBackDataGet({
      ...feedBackDataGet,
      typeThumbs: type,
      conversationId: conversationData?.conversation_id,
      messageId: messId,
      propertyName: propertyName,
      botMsg: botMsg,
      precedingGuestMsg: precedingGuestMsg,
    });
    setFeedBackModelOpen(true);
  };

  const handleJustificationClick = (e, justificationText) => {
    e.preventDefault();
    setShowJustificationModal(true);
    setJustificationText(justificationText);
  };
  const messgFeedBckClose = () => {
    setFeedBackModelOpen(false);
  };
  // feed back functionality

  function formatRelativeDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Get today's date without time
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Get yesterday's date
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    // Get the name of the weekday
    const weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const weekdayName = weekdayNames[inputDate.getDay()];

    // Compare dates
    if (inputDate >= todayDate) {
      return "Today";
    } else if (inputDate >= yesterdayDate) {
      return "Yesterday";
    } else {
      // Return the weekday name for older dates
      return weekdayName;
    }
  }

  // When we get the API data, populate the messages array and set the generate button functionality
  useEffect(() => {
    // Populate messages
    if (allConversationData?.messages) {
      const newMessages = allConversationData.messages.map((messageList) => {
        const { sender, text, time } = messageList;
        let timeFormatConvert = timeFormat(time);
        return {
          text: messageList !== undefined ? messageList : "",
          sender: sender === "host" || sender === "hostbuddy" ? "user" : "bot",
          messageDay: formatRelativeDate(time),
          sendBy: sender,
          timeFormatConvert,
        };
      });
      setConversationData(allConversationData);
      setMessages(newMessages);
      setPropertyName(allConversationData.property_name);
    }
    // Generate button functionality. Only enable the generate button if the last message is from the guest and we have a pre-generated message ready for it
    if (
      allConversationData?.messages &&
      allConversationData.messages.length > 0 &&
      allConversationData.messages[allConversationData.messages.length - 1].sender === "guest" &&
      allConversationData.generated_response &&
      allConversationData.generated_response.for_message === allConversationData.messages[allConversationData.messages.length - 1].id
    ) {
      setGenerateButtonIsEnabled(true);
      setGenerateButtonText(allConversationData.generated_response.response);
    } else {
      setGenerateButtonIsEnabled(false);
      setGenerateButtonText("");
    }
  }, [allConversationData]);

  // Allow the text area to expand vertically as lines are added
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="main-chat">
      <div className="chatbot">
        <div className="message-list" ref={messageListRef}>
          {messages?.map((message, index) => {
            return (
              <>
                <MessageInbox
                  key={index}
                  text={message.text?.text}
                  sender={message.sender}
                  currentMessageDay={message.messageDay}
                  messageData={message}
                  feedBckModelOpen={feedBckModelOpenHndle}
                  handleJustificationClick={handleJustificationClick}
                  feedBackDataGet={feedBackDataGet}
                  prevMsgText={messages[index - 1]?.text}
                  isInitialMessage={index <= 1}
                />
              </>
            );
          })}
          {/* {updateMessageRespLoading && <Loader />} */}
          <div ref={messagesEndRef} />
        </div>
        <div className="ai-input">
          {generateButtonIsEnabled && (
            <button onClick={() => setInputValue(generateButtonText)} className="generate-button">
              <i className="bi bi-stars"></i>
            </button>
          )}
          <div className="input-container">
            <textarea
              type="text"
              ref={textareaRef}
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              rows="1"
              disabled={sendMessageLoading ? true : false}
              style={{ resize: "none", overflow: "auto" }}
            />
          </div>
          <button onClick={handleSendMessage} className='chat-send-button' disabled={sendMessageLoading ? true : false}>
            {sendMessageLoading ? (
              <img src={loaderGif} width="25" height="25" />
            ) : (
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M23.9804 3.58131C24.5564 1.98798 23.0124 0.443978 21.419 1.02131L1.94572 8.06398C0.347048 8.64264 0.153715 10.824 1.62438 11.676L7.84038 15.2746L13.391 9.72398C13.6425 9.4811 13.9793 9.34671 14.3289 9.34975C14.6785 9.35278 15.0129 9.49301 15.2601 9.74022C15.5074 9.98743 15.6476 10.3218 15.6506 10.6714C15.6537 11.021 15.5193 11.3578 15.2764 11.6093L9.72571 17.16L13.3257 23.376C14.1764 24.8466 16.3577 24.652 16.9364 23.0546L23.9804 3.58131Z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <MessgFeedBckModel show={feedBackModelOpen} handleClose={messgFeedBckClose} feedBackDataGet={feedBackDataGet}/>
      <JustificationModal show={showJustificationModal} handleClose={() => setShowJustificationModal(false)} propertyName={propertyName} justification={justificationText}/>
    </div>
  );
};

export default MildeSection;
