import React, { useEffect, useRef, useState } from "react";
import MessageInbox from "./message/MessageInbox";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../../helper/Loader";
import "./index.css";
import {
  chatBoxAIActions,
  getSessionIdActions,
  stateEmptyActions,
} from "../../../../../redux/actions";
import loaderGif from "../../../../../public/img/new_loader.gif";
import ToastHandle from "../../../../../helper/ToastMessage";

const MildeSection = ({ allUserMessage }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState("");

  const updateMessageRespLoading = store?.chatBoxAIReducer?.loading;
  const sessionId = store?.getSessionIdReducer?.sessionId?.data;

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const userMessage = { text: inputValue, sender: "user" };
    dispatch(
      chatBoxAIActions({
        session_id: sessionId?.session_id,
        message: inputValue,
      })
    );
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSendMessage();
    }
  };

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
    const weekdayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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

  useEffect(() => {
    if (allUserMessage) {
      const newMessages = allUserMessage.map((messageList) => {
        const { sender, text, time } = messageList;
        console.log(messageList, "messageListmessageList", time);
        if (sender === "host") {
          return {
            text: text !== undefined ? text : "",
            sender: "bot",
            messageDay: formatRelativeDate(time),
          };
        } else {
          return {
            text: text,
            sender: "user",
            messageDay: formatRelativeDate(time),
          };
        }
      });
      setMessages(newMessages);
    }
  }, [allUserMessage]);

  console.log(allUserMessage, "allUserMessage");
  return (
    <div className="main-chat">
      <div className="chatbot">
        <div className="message-list" ref={messageListRef}>
          {messages?.map((message, index) => {
            return (
              <>
                <MessageInbox
                  key={index}
                  text={message.text}
                  sender={message.sender}
                  currentMessageDay={message.messageDay}
                  //   feedBckModelOpen={feedBckModelOpenHndle} feedBackDataGet={feedBackDataGet}
                />
              </>
            );
          })}
          {updateMessageRespLoading && <Loader />}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={updateMessageRespLoading ? true : false}
          />
          <button
            onClick={handleSendMessage}
            disabled={updateMessageRespLoading ? true : false}
            className={updateMessageRespLoading ? "chat-send" : ""}
          >
            {updateMessageRespLoading && (
              <img src={loaderGif} width="25" height="25" />
            )}
            {!updateMessageRespLoading && (
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="white"
                  d="M23.9804 3.58131C24.5564 1.98798 23.0124 0.443978 21.419 1.02131L1.94572 8.06398C0.347048 8.64264 0.153715 10.824 1.62438 11.676L7.84038 15.2746L13.391 9.72398C13.6425 9.4811 13.9793 9.34671 14.3289 9.34975C14.6785 9.35278 15.0129 9.49301 15.2601 9.74022C15.5074 9.98743 15.6476 10.3218 15.6506 10.6714C15.6537 11.021 15.5193 11.3578 15.2764 11.6093L9.72571 17.16L13.3257 23.376C14.1764 24.8466 16.3577 24.652 16.9364 23.0546L23.9804 3.58131Z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MildeSection;
