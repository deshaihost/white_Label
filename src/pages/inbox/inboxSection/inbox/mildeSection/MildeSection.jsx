import React, { useEffect, useRef, useState } from "react";
import MessageInbox from "./message/MessageInbox";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../helper/Loader";
import "./index.css";
import { timeFormat } from "../../../../../helper/commonFun";
import MessgFeedBckModel from "../../../../testProperty/banner/messages/messagesFeedBckModel/MessgFeedBckModel";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";

const MildeSection = ({ allConversationData }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const sessionId = store?.getSessionIdReducer?.sessionId?.data;

  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [generateButtonIsEnabled, setGenerateButtonIsEnabled] = useState(false);
  const [generateButtonText, setGenerateButtonText] = useState("");
  const [propertyName, setPropertyName] = useState("");

  const updateMessageRespLoading = store?.chatBoxAIReducer?.loading;

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const userMessage = { text: inputValue, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSendMessage();
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
      conversationId: sessionId?.session_id,
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
          {updateMessageRespLoading && <Loader />}
          <div ref={messagesEndRef} />
        </div>
        <div className="ai-input">
          {generateButtonIsEnabled && (
            <button
              onClick={() => setInputValue(generateButtonText)}
              className="generate-button"
            >
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
              disabled={updateMessageRespLoading ? true : false}
              rows="1"
              style={{ resize: "none", overflow: "auto" }}
            />
          </div>
        </div>
      </div>
      <MessgFeedBckModel
        show={feedBackModelOpen}
        handleClose={messgFeedBckClose}
        feedBackDataGet={feedBackDataGet}
      />
      <JustificationModal
        show={showJustificationModal}
        handleClose={() => setShowJustificationModal(false)}
        propertyName={propertyName}
        justification={justificationText}
      />
    </div>
  );
};

export default MildeSection;
