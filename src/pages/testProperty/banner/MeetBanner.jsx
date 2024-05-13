import React, { useState, useRef, useEffect } from "react";
import "./meetBanner.css";
import Message from "./messages/Messages";
import HouseImg from "../../../public/img/house-img.png";
import { Container, ToastHeader } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  chatBoxAIActions,
  getSessionIdActions,
} from "../../../redux/pages/meetHostBuddy/actions";
import { stateEmptyActions } from "../../../redux/stateEmpty/actions";

import Loader from "../../../helper/Loader";
import { ParamsGet, nameKey } from "../../../helper/Authorized";
import loaderGif from "../../../public/img/new_loader.gif";
import ToastHandle from "../../../helper/ToastMessage";
import MessgFeedBckModel from "./messages/messagesFeedBckModel/MessgFeedBckModel";
import { useLocation } from "react-router-dom";
const MeetBanner = (props) => {
  const { urlData } = props;
  const { chatbot_key } = urlData ? urlData : {};
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  //const chatBoxUrl = ParamsGet();
  //const getName = nameKey();
  //const testPropetyName = getName?.nameKey;
  //const copyChatBotName = urlData?.property_name;
  const sessionId = store?.getSessionIdReducer?.sessionId?.data;
  const getMessageResp =
    store?.getSessionIdReducer?.sessionId?.data?.initial_message;
  const getMessageRespId = store?.getSessionIdReducer?.sessionId?.data?.session_id;
  const getPropertyName = store?.getSessionIdReducer?.sessionId?.data?.property_name;
  let FirstMessageRespo = {
    response: getMessageResp,
    message_id: getMessageRespId,
  };
  // const getMessageResp =
  //   store?.getSessionIdReducer?.sessionId?.data?.initial_message;
  // const updateMessageResp = store?.chatBoxAIReducer?.chatBoxAI?.data?.response;
  const updateMessageResp = store?.chatBoxAIReducer?.chatBoxAI?.data;

  const statusResp = store?.chatBoxAIReducer?.chatBoxAI?.status;
  const updateMessageRespLoading = store?.chatBoxAIReducer?.loading;
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  // const messagesContainerRef = useRef(null);

  // Event handler for key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSendMessage();
    }
  };

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

  // message feedback model functionality

  // Initial messages
  useEffect(() => {
    const userMessage = { text: "Hi", sender: "user" };
    const botMessage = {
      text: FirstMessageRespo !== undefined ? FirstMessageRespo : "",
      sender: "bot",
    };
    setMessages([userMessage, botMessage]);
  }, [getMessageResp]);

  const isFirstRun = useRef(true);
  const initialGeneratedFun = () => {
    dispatch(
      getSessionIdActions({
        action: "hb_meet_hostbuddy_chat_start",
        textareaValue: "Hi",
        chatbot_key: chatbot_key,
        data_host_return: " ",
        user: "guest"
      })
    );
  };

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      if (chatbot_key !== undefined) {
        initialGeneratedFun();
      } else if (chatbot_key === undefined) {
        initialGeneratedFun();
      }
    }
  }, [chatbot_key]);

  useEffect(() => {
    dispatch(stateEmptyActions());
    if (statusResp === 200) {
      const botMessage = {
        text: updateMessageResp !== undefined ? updateMessageResp : "",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } else if (statusResp == 500) {
      ToastHandle("Internal Server Error", "danger");
    }
  }, [statusResp]);

  // When a new message is added, scroll to the bottom of the chat window
  const messageListRef = useRef(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // feed back functionality
  const [feedBackModelOpen, setFeedBackModelOpen] = useState(false);
  // const [feedBackIconActive, setFeedBackIconActive] = useState("");
  const [feedBackDataGet, setFeedBackDataGet] = useState({
    typeThumbs: "",
    conversationId: "",
    messageId: "",
    propertyName: "",
  });
  const feedBckModelOpenHndle = (type, messId) => {
    // setFeedBackIconActive(messId);
    setFeedBackDataGet({
      ...feedBackDataGet,
      typeThumbs: type,
      conversationId: sessionId?.session_id,
      messageId: messId,
      propertyName: getPropertyName,
    });

    setFeedBackModelOpen(true);
  };
  const messgFeedBckClose = () => {
    setFeedBackModelOpen(false);
  };

  return (
    <div className="meet-banner">
      <Container>
        <div className="banner-heading">
          <h2>
            {" "}
            {getPropertyName !== undefined ? getPropertyName : ""}
            {/* {isPropertyChat ? (
              <>
                {testPropetyName !== ""
                  ? copyChatBotName !== undefined
                    ? copyChatBotName
                    : testPropetyName
                  : "Empty"}
              </>
            ) : (
              "Meet HostBuddy"
            )} */}
          </h2>
          {/* {!isPropertyChat && (
            <p>
              Get ready to meet our friendly HostBuddy chatbot. We're here to
              assist you with any questions or support you might need. Just type
              your query below, and we'll be happy to help
            </p>
          )} */}
          <Link to="/properties" className="link-btn filled-btn">
              Back
            </Link>
          {/* {isPropertyChat ? (
            <Link to="/properties" className="link-btn filled-btn">
              Back
            </Link>
          ) : (
            <Link to="/" className="link-btn filled-btn">
              Learn More
            </Link>
          )} */}
        </div>
        <div className="row">
          {/* {!isPropertyChat && (
            <div className="col-lg-5" id="house-image">
              <div className="house-img">
                <img src={HouseImg} alt="house-img" className="img-fluid" />
              </div>
            </div>
          )} */}

          <div 
          // className={isPropertyChat ? "col-lg-12" : "col-lg-7"}
          className="col-lg-12" 

          >
            <div className="chatbot">
              <div className="message-list" ref={messageListRef}>
                {messages?.map((message, index) => {
                  return (
                    <>
                      <Message
                        key={index}
                        text={message.text}
                        sender={message.sender}
                        feedBckModelOpen={feedBckModelOpenHndle}
                        feedBackDataGet={feedBackDataGet}
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
                        d="M23.9804 3.58131C24.5564 1.98798 23.0124 0.443978 21.419 1.02131L1.94572 8.06398C0.347048 8.64264 0.153715 10.824 1.62438 11.676L7.84038 15.2746L13.391 9.72398C13.6425 9.4811 13.9793 9.34671 14.3289 9.34975C14.6785 9.35278 15.0129 9.49301 15.2601 9.74022C15.5074 9.98743 15.6476 10.3218 15.6506 10.6714C15.6537 11.021 15.5193 11.3578 15.2764 11.6093L9.72571 17.16L13.3257 23.376C14.1764 24.8466 16.3577 24.652 16.9364 23.0546L23.9804 3.58131Z"
                        fill="white"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <MessgFeedBckModel
          show={feedBackModelOpen}
          handleClose={messgFeedBckClose}
          feedBackDataGet={feedBackDataGet}
        />
      </Container>
    </div>
  );
};

export default MeetBanner;
