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
import SendIcon from "./message/icons/send_icon.svg";
import ChevDownIcon from "./message/icons/chevDown.svg";
import AiMessageIcon from "./message/icons/ai_messsage_icon.svg";

const placeholderImg = 'https://hostbuddylb.com/misc/chatBubbles.webp';

const MildeSection = ({ allConversationData, updateConversationFromApi, updateCovnersationLocal, subscriptionPlan, accountAgeDays, setCurrentView }) => {
  const eliteOrWorksPlan = /elite|works/i.test(subscriptionPlan) || subscriptionPlan == 'trial'; // Case-insensitive check for 'elite' or 'works' in the plan name
  const eliteFeaturesAvailable = /elite/i.test(subscriptionPlan) || subscriptionPlan == 'trial'; // user subscribed to Elite or is on trial
  const propertyIsLocked = !!allConversationData?.is_locked;
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
  const [generateScratchApiLoading, setGenerateScratchApiLoading] = useState(false);
  const [assistanceUsed, setAssistanceUsed] = useState(null); // 'command' if the user clicked "generate from command"; 'generate' if the user clicked "generate from scratch"; null if neither, or if the user cleared a generated message

  const callGenerateFromScratchApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGenerateScratchApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { property_name:propertyName, conversation_id:conversationData.conversation_id };
      const response = await axios.post(`${baseUrl}/generate_response`, body_data, config);

      if (response.status === 200) { }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    } finally {
      setGenerateScratchApiLoading(false);
    }
  };

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

  const handleGenerateFromScratchClick = async () => {
    if (generateCommandApiLoading || generateScratchApiLoading) { return; }
    if (generateButtonText) {
      setInputValue(generateButtonText);
      setShowGenerateJustificationButton(true);
      setAssistanceUsed('generate');
    } else {
      const response = await callGenerateFromScratchApi();
      if (!("error" in response) && response?.response) {
        setInputValue(response.response);
        if (response?.justification) {
          setGenerateButtonJustification(response?.justification);
          setShowGenerateJustificationButton(true);
        }
        setAssistanceUsed('generate');
        setGenerateButtonText(response.response); // in case the user clicks generate again
      }
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
    if (generateCommandApiLoading || generateScratchApiLoading) { return; }
    setGenerateOptionsVisible(!generateOptionsVisible);
  };

  const handleGenerateOptionSelect = async (option) => {
    setGenerateOptionsVisible(false);
    if (option === 'scratch') {
      await handleGenerateFromScratchClick();
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

  // Function to format date for separators (Today or Month Day)
  function formatDateForSeparator(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return '';
    }
    
    const today = new Date();
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    
    // Check if the date is today
    if (date.getDate() === todayDate.getDate() && 
        date.getMonth() === todayDate.getMonth() && 
        date.getFullYear() === todayDate.getFullYear()) {
      return 'Today';
    }
    
    // Check if it's yesterday
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);
    
    if (date.getDate() === yesterdayDate.getDate() && 
        date.getMonth() === yesterdayDate.getMonth() && 
        date.getFullYear() === yesterdayDate.getFullYear()) {
      return 'Yesterday';
    }
    
    // For older dates, show Month Day format
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const month = months[date.getMonth()];
    const day = date.getDate();
    
    return `${month} ${day}`;
  }

  // Function to check if two dates are from the same day
  function isSameDay(date1, date2) {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return false;
    }
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
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
          rawDate: new Date(time), // Store the raw date for comparing
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
      allConversationData.messages[allConversationData.messages.length - 1].sender === "guest"
    ) {
      setGenerateButtonIsEnabled(true);
      if (allConversationData.generated_response &&
          allConversationData.generated_response.for_message === allConversationData.messages[allConversationData.messages.length - 1].id
      ) {
        setGenerateButtonText(allConversationData.generated_response.response);
        setGenerateButtonJustification(allConversationData.generated_response.justification);
      }
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
              const showDateSeparator = index === 0 || !isSameDay(messages[index - 1]?.rawDate, message.rawDate);
              return (
                <React.Fragment key={message?.id}>
                  {showDateSeparator && (
                    <div className="date-separator">
                      {formatDateForSeparator(message.rawDate)}
                    </div>
                  )}
                  <MessageInbox
                    text={message.text?.text}
                    sender={message.sender}
                    currentMessageDay={message.messageDay}
                    messageData={message}
                    feedBckModelOpen={feedBckModelOpenHndle}
                    handleJustificationClick={handleJustificationClick}
                    feedBackDataGet={feedBackDataGet}
                    prevMsgText={messages[index - 1]?.text}
                    isInitialMessage={index <= 1}
                    guestName={allConversationData.guest_name}
                    guestImageUrl={allConversationData.image_url}
                  />
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="no-messages-placeholder" style={{margin:'auto', justifyContent:'center', alignItems:'center', textAlign:'center'}}>
            <img src={placeholderImg} alt="Chat bubbles" style={{width:'200px', opacity:0.7}}/>
            <p style={{ color: '#AAA' }}>No conversation selected</p>
          </div>
        )}

        {((eliteOrWorksPlan) && !(conversationData?.channel == 'hostbuddy')) ? (
          <>
            <div className="ai-input" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
              <div className="input-container" style={{ width: '100%', marginBottom: '10px' }}>
                <textarea type="text" ref={textareaRef} placeholder="Message..." value={inputValue} onChange={handleInputFieldChange} 
                  onKeyDown={handleKeyPress} rows="1" disabled={(generateCommandApiLoading || generateScratchApiLoading || sendMessageLoading) ? true : false} 
                  style={{
                    resize:'none', 
                    overflow:'auto', 
                    outline: 'none',
                    boxShadow: 'none',
                    borderColor: 'inherit'
                  }}
                />
                {(generateCommandApiLoading || generateScratchApiLoading) && (
                  <div className="loader-container">
                    <Loader />
                  </div>
                )}
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div className="generate-container">
                  <button ref={buttonRef} className="generate-button" onClick={handleGenerateButtonClick}>
                    <img src={AiMessageIcon} alt="AI Message Icon" width="15" height="15" style={{ marginRight: '5px' }} />
                    <span style={{ marginRight: '1px', color: 'rgba(208, 211, 219, 1)' }}>AI Response</span>
                    <img src={ChevDownIcon} alt="Chevron Down Icon" width="20" height="20" style={{ marginLeft: '0px' }} />
                  </button>
                  {generateOptionsVisible && (
                    <div ref={menuRef} className="generate-menu" style={{ zIndex: 1000 }}>
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
                
                <button onClick={handleSendMessage} className='chat-send-button' disabled={(generateCommandApiLoading || generateScratchApiLoading || sendMessageLoading) ? true : false}>
                  {(sendMessageLoading) ? (
                    <img src={loaderGif} width="25" height="25" />
                  ) : (
                    <>
                      <span style={{ marginRight: '1px', marginLeft:"2px" , fontSize:"12px"}}>Send</span>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '2px' }}>
                        <path d="M10.5004 12H5.00043M4.91577 12.2915L2.58085 19.2662C2.39742 19.8142 2.3057 20.0881 2.37152 20.2569C2.42868 20.4034 2.55144 20.5145 2.70292 20.5567C2.87736 20.6054 3.14083 20.4869 3.66776 20.2497L20.3792 12.7296C20.8936 12.4981 21.1507 12.3824 21.2302 12.2216C21.2993 12.082 21.2993 11.9181 21.2302 11.7784C21.1507 11.6177 20.8936 11.5019 20.3792 11.2705L3.66193 3.74776C3.13659 3.51135 2.87392 3.39315 2.69966 3.44164C2.54832 3.48375 2.42556 3.59454 2.36821 3.74078C2.30216 3.90917 2.3929 4.18255 2.57437 4.72931L4.91642 11.7856C4.94759 11.8795 4.96317 11.9264 4.96933 11.9744C4.97479 12.0171 4.97473 12.0602 4.96916 12.1028C4.96289 12.1508 4.94718 12.1977 4.91577 12.2915Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span>|</span>
                      <img src={ChevDownIcon} alt="Chevron Down Icon" width="20" height="20" style={{ marginLeft: '0px' }} />
                    </>
                  )}
                </button>
              </div>
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
          conversationData?.channel == 'hostbuddy' ? (
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