import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import MessageInbox from "./message/MessageInbox";
import Loader from "../../../../../helper/Loader";
import loaderGif from "../../../../../public/img/new_loader.gif";
import "./index.css";
import { timeFormat } from "../../../../../helper/commonFun";
import { callSendMessageApi } from "../../../../../helper/getConversationsTest/inboxApi";
import MessgFeedBckModel from "../../../../testProperty/banner/messages/messagesFeedBckModel/MessgFeedBckModel";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";

const placeholderImg = 'https://hostbuddylb.com/misc/chatBubbles.webp';

const MildeSection = ({ allConversationData, updateConversationFromApi, updateCovnersationLocal, subscriptionPlan, accountAgeDays, setCurrentView }) => {
  const eliteOrWorksPlan = /elite|works/i.test(subscriptionPlan) || subscriptionPlan == 'trial'; // Case-insensitive check for 'elite' or 'works' in the plan name
  const eliteFeaturesAvailable = /elite/i.test(subscriptionPlan) || subscriptionPlan == 'trial'; // user subscribed to Elite or is on trial
  const propertyIsLocked = !!allConversationData?.is_locked;
  //const accountAllowsGenerateButton = (eliteFeaturesAvailable && !propertyIsLocked) || (accountAgeDays && accountAgeDays <= 4); // Generate functionality allowed if user/prop subscription is sufficient, OR if the account is new
  const accountAllowsGenerateButton = (eliteFeaturesAvailable && !propertyIsLocked)

  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const [conversationData, setConversationData] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);

  const [generateButtonIsEnabled, setGenerateButtonIsEnabled] = useState(false);
  const [generateButtonText, setGenerateButtonText] = useState("");
  const [generateButtonJustification, setGenerateButtonJustification] = useState("");
  const [showGenerateJustificationButton, setShowGenerateJustificationButton] = useState(false);
  const [generateOptionsVisible, setGenerateOptionsVisible] = useState(false);
  const [generateCommandApiLoading, setGenerateCommandApiLoading] = useState(false);
  const [assistanceUsed, setAssistanceUsed] = useState(null); // 'command' if the user clicked "generate from command"; 'generate' if the user clicked "generate from scratch"; null if neither, or if the user cleared a generated message

  const callGenerateFromCommandApi = async (command) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGenerateCommandApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { property_name:propertyName, conversation_id:conversationData.conversation_id, command };
      const response = await axios.post( `${baseUrl}/response_from_command`, body_data, config );

      if (response.status === 200) { }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    } finally {
      setGenerateCommandApiLoading(false);
    }
  };

  // Only checks if the second word is 'reacted'. So may not be 1000% accurate, but low stakes use case so fine for now. Can be improved later if needed
  const lastMessageIsEmojiReact = () => {
    if (allConversationData?.messages && allConversationData.messages.length > 0) {
      const lastMessageText = allConversationData.messages[allConversationData.messages.length - 1].text;
      const words = lastMessageText.split(' ');
      return words.length > 1 && words[1] === 'reacted';
    }
    return false;
  };

  const getTooltipMessage = () => {
    if (generateButtonIsEnabled) { return ""; }
    if (!allConversationData?.messages) { return "AI response not available."; }

    if (allConversationData.messages[allConversationData.messages.length - 1].sender === "guest") {
      if (lastMessageIsEmojiReact()) { return "AI response is only available when the last message is from the guest."; }
      else { return "AI response not available. If the message just came in, it may take a moment to prepare."; }
    } else {
      return "AI response is only available when the last message is from the guest.";
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return; // no message added
    if (!conversationData?.conversation_id) return; // no conversation selected
    setSendMessageLoading(true);

    const { conversation_id, reservation_id=null } = conversationData; // reservation_id default to null if not present. Sometimes the send operation will still work if it isn't included, so proceed
    const sendMsgResponse = await callSendMessageApi(inputValue, conversation_id, reservation_id, propertyName, assistanceUsed);
    if (!("error" in sendMsgResponse)) {
      setInputValue("");
      setShowGenerateJustificationButton(false);
      setAssistanceUsed(null);
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

  const handleInputFieldChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value.trim() === "") {
      setShowGenerateJustificationButton(false);
      setAssistanceUsed(null);
    }
  };


  const handleGenerateButtonClick = () => {
    if (generateCommandApiLoading) { return; }
    setGenerateOptionsVisible(!generateOptionsVisible);
  };

  const handleGenerateOptionSelect = async (option) => {
    setGenerateOptionsVisible(false);
    if (option === 'scratch') {
      setInputValue(generateButtonText);
      setShowGenerateJustificationButton(true);
      setAssistanceUsed('generate');
    }
    else if (option === 'command') {
      const response = await callGenerateFromCommandApi(inputValue);
      if (!("error" in response)) {
        setInputValue(response.response);
        setAssistanceUsed('command');
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
        const { sender, text, time, attachments, id } = messageList;
        let timeFormatConvert = timeFormat(time);
        return {
          text: messageList !== undefined ? messageList : "",
          sender: sender === "host" || sender === "hostbuddy" ? "user" : "bot",
          messageDay: formatRelativeDate(time),
          sendBy: sender,
          id,
          timeFormatConvert,
          attachments
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
      setGenerateButtonJustification(allConversationData.generated_response.justification);
    } else {
      setGenerateButtonIsEnabled(false);
      setGenerateButtonText("");
    }
    // Clear the input field
    setInputValue("");
    setShowGenerateJustificationButton(false);
    setAssistanceUsed(null);
  }, [allConversationData]);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && buttonRef.current && !buttonRef.current.contains(event.target)) {
      setGenerateOptionsVisible(false);
    }
  };

  // Allow the text area to expand vertically as lines are added
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Scroll to the bottom of the message list when the messages are loaded
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  // On component load, add the listeners so we can close the generate button menu when the user clicks outside of it
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toolTipMessage = getTooltipMessage();

  return (
    <div className="main-chat">
      <div className="d-block d-lg-none mobile-nav">
        <button onClick={() => setCurrentView('conversations')} className="btn btn-link">
          Back
        </button>
        <button onClick={() => setCurrentView('details')} className="btn btn-link">
          Details
        </button>
      </div>
      <div className="chatbot">
        {allConversationData && Object.keys(allConversationData).length > 0 ? (
          <div className="message-list" ref={messageListRef}>
            {messages?.map((message, index) => {
              return (
                  <MessageInbox
                    key={message?.id}
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
              );
            })}
            {/* {updateMessageRespLoading && <Loader />} */}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="no-messages-placeholder" style={{margin:'auto', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <img src={placeholderImg} alt="Chat bubbles" style={{width:'200px', opacity:0.7}}/>
            <p style={{ color: '#AAA' }}>No conversation selected</p>
          </div>
        )}

        {/* ((eliteOrWorksPlan || (accountAgeDays && accountAgeDays <= 4)) && !(conversationData?.channel == 'hostbuddy')) ? ( // old logic */}
        {((eliteOrWorksPlan) && !(conversationData?.channel == 'hostbuddy')) ? ( // generate button and message input / send components
          <>
            <div className="ai-input">
              <div className="generate-container">
                <button ref={buttonRef} className="generate-button" onClick={handleGenerateButtonClick}>
                  <i className="bi bi-stars"></i>
                </button>
                {generateOptionsVisible && (
                  <div ref={menuRef} className="generate-menu">
                    {accountAllowsGenerateButton ? (
                      conversationData?.conversation_id ? (
                        <>
                          {generateButtonIsEnabled ? (
                            <button className="generate-menu-item" key='scratch' onClick={() => handleGenerateOptionSelect('scratch')}>Generate From Scratch</button>
                          ) : (
                            <button className="generate-menu-item greyed-out" key='scratch' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={toolTipMessage}>Generate From Scratch</button>
                          )}
                          {inputValue.trim() !== "" ? (
                            <button className="generate-menu-item" key='command' onClick={() => handleGenerateOptionSelect('command')}>Generate From My Instruction</button>
                          ) : (
                            <button className="generate-menu-item greyed-out" key='command' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Start typing to instruct HostBuddy how to message the guest'}>Generate From My Instruction</button>
                          )}
                        </>
                      ) : (
                        <>
                          <button className="generate-menu-item greyed-out" key='scratch' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Select a conversation to generate a response'}>Generate From Scratch</button>
                          <button className="generate-menu-item greyed-out" key='command' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Select a conversation to instruct HostBuddy how to craft a message for this guest'}>Generate From My Instruction</button>
                        </>
                      )
                    ) : (
                      propertyIsLocked ? (
                        <>
                          <button className="generate-menu-item greyed-out" key='scratch' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Unlock this property from the Properties page to enable message generation in the inbox'}>Generate From Scratch</button>
                          <button className="generate-menu-item greyed-out" key='command' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Unlock this property from the Properties page to enable message generation in the inbox'}>Generate From My Instruction</button>
                        </>
                      ) : (
                        <>
                          <button className="generate-menu-item greyed-out" key='scratch' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Upgrade to HostBuddy Elite to enable message generation in the inbox'}>Generate From Scratch</button>
                          <button className="generate-menu-item greyed-out" key='command' disabled data-tooltip-id="aiNotAvailableTooltip" data-tooltip-content={'Upgrade to HostBuddy Elite to enable message generation in the inbox'}>Generate From My Instruction</button>
                        </>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="input-container">
                <textarea type="text" ref={textareaRef} placeholder="Type a message..." value={inputValue} onChange={handleInputFieldChange}
                  onKeyDown={handleKeyPress} rows="1" disabled={(generateCommandApiLoading || sendMessageLoading) ? true : false} style={{resize:'none', overflow:'auto'}}
                />
                {generateCommandApiLoading && (
                  <div className="loader-container">
                    <Loader />
                  </div>
                )}
              </div>

              <button onClick={handleSendMessage} className='chat-send-button' disabled={(generateCommandApiLoading || sendMessageLoading) ? true : false}>
                {(sendMessageLoading) ? (
                  <img src={loaderGif} width="25" height="25" />
                ) : (
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="white" d="M23.9804 3.58131C24.5564 1.98798 23.0124 0.443978 21.419 1.02131L1.94572 8.06398C0.347048 8.64264 0.153715 10.824 1.62438 11.676L7.84038 15.2746L13.391 9.72398C13.6425 9.4811 13.9793 9.34671 14.3289 9.34975C14.6785 9.35278 15.0129 9.49301 15.2601 9.74022C15.5074 9.98743 15.6476 10.3218 15.6506 10.6714C15.6537 11.021 15.5193 11.3578 15.2764 11.6093L9.72571 17.16L13.3257 23.376C14.1764 24.8466 16.3577 24.652 16.9364 23.0546L23.9804 3.58131Z"></path>
                  </svg>
                )}
              </button>
            </div>

            {showGenerateJustificationButton &&
              <div className="where-did link-container" style={{ marginRight:"auto" }}>
                <a href="#" onClick={(e) => handleJustificationClick(e, generateButtonJustification)}>
                  Where did this come from?
                </a>
              </div>
            }
          </>
        ) : (
          conversationData?.channel == 'hostbuddy' ? ( // chat link / embedded window conversations
            null
          ) : (
            allConversationData && Object.keys(allConversationData).length > 0 && (
              <p style={{fontSize:'14px', margin:'0 auto'}}>
                Inbox is in view-only mode. <Link to='/setting/subscription' style={{fontSize:'14px'}}>Upgrade</Link> to generate and send messages.
              </p>
            )
          )
        )}
      </div>
      <Tooltip className="generate-tooltip" id="aiNotAvailableTooltip" delayShow={0} place="top" effect="solid"/>
      <MessgFeedBckModel show={feedBackModelOpen} handleClose={messgFeedBckClose} feedBackDataGet={feedBackDataGet}/>
      <JustificationModal show={showJustificationModal} handleClose={() => setShowJustificationModal(false)} propertyName={propertyName} justification={justificationText}/>
    </div>
  );
};

export default MildeSection;
