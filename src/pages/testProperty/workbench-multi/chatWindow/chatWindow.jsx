import React, { useState, useRef, useEffect } from "react";
import "./chatWindow.css";
import Message from "./messages/Messages";
import loaderGif from "../../../../public/img/new_loader.gif";
import ToastHandle from "../../../../helper/ToastMessage";
import MessgFeedBckModel from "./messages/messagesFeedBckModel/MessgFeedBckModel";
import JustificationModal from "./messages/justificationModal/justificationModal";


const ChatWindow = ({property_name, messages, setMessages, sessionId, callSendMessageApi, responseIsLoading}) => {
  const updateMessageRespLoading = responseIsLoading;
  const [inputValue, setInputValue] = useState("");
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [justificationText, setJustificationText] = useState("");
  const messagesEndRef = useRef(null);

  // Event handler for key press in the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      handleSendMessage(sessionId);
    }
  };

  const handleSendMessage = (sessionId) => {
    if (inputValue.trim() === "") return;
    const userMessage = { text: inputValue, sender: "user" };
    //dispatch(chatBoxAIActions({session_id:sessionId, message:inputValue}));
    callSendMessageApi(inputValue);

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
  };

  // When a new message is added, scroll to the bottom of the chat window
  const messageListRef = useRef(null);
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // feed back functionality
  const [feedBackModelOpen, setFeedBackModelOpen] = useState(false);
  const [feedBackDataGet, setFeedBackDataGet] = useState({typeThumbs:"", conversationId:"", messageId:"", propertyName:"", botMsg:"", precedingGuestMsg:""});

  const feedBckModelOpenHndle = (type, messId, botMsg, precedingGuestMsg) => {
    setFeedBackDataGet({ ...feedBackDataGet, typeThumbs:type, conversationId:sessionId, messageId:messId, propertyName:property_name, botMsg:botMsg, precedingGuestMsg:precedingGuestMsg });
    setFeedBackModelOpen(true);
  };

  const messgFeedBckClose = () => {
    setFeedBackModelOpen(false);
  };

  const handleJustificationClick = (e, justificationText) => {
    e.preventDefault();
    setShowJustificationModal(true);
    setJustificationText(justificationText);
  };

  return (
    <>
      <div className="workbench-chat-window chatbot blur-background-top-left blur-background-bottom-right">
        <div className="message-list" ref={messageListRef}>
          {messages?.map((message, index) => {
            // Find if this is the last bot message
            const isLastBotMessage = message.sender === 'bot' && 
              !messages.slice(index + 1).some(m => m.sender === 'bot');
              
            return (
              <Message key={index} text={message.text} sender={message.sender} feedBckModelOpen={feedBckModelOpenHndle} handleJustificationClick={handleJustificationClick} feedBackDataGet={feedBackDataGet} prevMsgText={messages[index - 1]?.text} isInitialMessage={index <= 1}
                isLastBotMessage={isLastBotMessage} isFirstBotMessage={message.sender === 'bot' && !messages.slice(0, index).some(m => m.sender === 'bot')}
              />
            );
          })}
          {updateMessageRespLoading && (
            // This will show as an animated bubble indicating that the bot is thinking
            <Message key={'bot_responding'} sender={'bot'} />
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Type a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyPress} disabled={updateMessageRespLoading ? true : false}/>
          <button onClick={handleSendMessage} disabled={updateMessageRespLoading ? true : false} className={updateMessageRespLoading ? "chat-send" : ""}>
            {updateMessageRespLoading && (
              <img src={loaderGif} width="25" height="25" />
            )}
            {!updateMessageRespLoading && (
              <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="white" d="M23.9804 3.58131C24.5564 1.98798 23.0124 0.443978 21.419 1.02131L1.94572 8.06398C0.347048 8.64264 0.153715 10.824 1.62438 11.676L7.84038 15.2746L13.391 9.72398C13.6425 9.4811 13.9793 9.34671 14.3289 9.34975C14.6785 9.35278 15.0129 9.49301 15.2601 9.74022C15.5074 9.98743 15.6476 10.3218 15.6506 10.6714C15.6537 11.021 15.5193 11.3578 15.2764 11.6093L9.72571 17.16L13.3257 23.376C14.1764 24.8466 16.3577 24.652 16.9364 23.0546L23.9804 3.58131Z"></path>
              </svg>
            )}
          </button>
        </div>
      </div>
      <MessgFeedBckModel show={feedBackModelOpen} handleClose={messgFeedBckClose} feedBackDataGet={feedBackDataGet}/>
      <JustificationModal show={showJustificationModal} handleClose={() => setShowJustificationModal(false)} propertyName={property_name} justification={justificationText}/>
    </>
  );
};

export default ChatWindow;
