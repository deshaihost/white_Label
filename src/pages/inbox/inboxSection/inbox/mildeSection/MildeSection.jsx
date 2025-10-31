import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import MessageInbox from "./message/MessageInbox";
import Loader from "../../../../../helper/Loader";
import loaderGif from "../../../../../public/img/new_loader.gif";
import InboxUpgrade from "./inbox_Upgrade/InboxUpgrade";
import "./index.css";
import "./MildeSection.css";
import { timeFormat } from "../../../../../helper/commonFun";
import { callSendMessageApi, callGetAvailableSendersApi, callSetSenderForConversationApi } from "../../../../../helper/getConversationsTest/inboxApi";
import MessgFeedBckModel from "../../../../testProperty/banner/messages/messagesFeedBckModel/MessgFeedBckModel";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import ConversationHistoryLocked from "./inbox_messages_locked/ConversationHistoryLocked";

// Import the SVG icons
import SendIcon from "./message/icons/send_icon.svg";
import ChevDownIcon from "./message/icons/chevDown.svg";
import ChevDownDisabledIcon from "./message/icons/chevDown_disabled_state.svg";
import ChevDownEnabledIcon from "./message/icons/chevDown_enabled_state.svg";
import AiMessageIcon from "./message/icons/ai_messsage_icon.svg";
import SendTemplateIcon from "./message/icons/sendTemplate_icon.svg";

const placeholderImg = "https://hostbuddylb.com/misc/chatBubbles.webp";

const MildeSection = ({
  allConversationData,
  updateConversationFromApi,
  updateConversationLocal,
  subscriptionPlan,
  accountAgeDays,
  setCurrentView,
  userData,
  enterKeyBehavior = 'send', // Default to 'send' if not provided
}) => {
  const eliteOrWorksPlan =
    (/elite|works|ultimate/i.test(subscriptionPlan) && !/mount|pro/i.test(subscriptionPlan)) || subscriptionPlan == "trial"; // Case-insensitive check for 'elite', 'works', or 'ultimate' in the plan name, but exclude 'mount' and 'pro'
  const eliteFeaturesAvailable =
    /elite|ultimate/i.test(subscriptionPlan) || subscriptionPlan === "trial"; // user subscribed to Elite or Ultimate or is on trial
  const propertyIsLocked = !!allConversationData?.is_locked;
  const accountAllowsGenerateButton =
    eliteFeaturesAvailable && !propertyIsLocked;

  // Check if user has Hospitable integration
  const hasHospitableIntegration = () => {
    return !!(userData?.calry_integrations?.hospitable || 
             (userData?.calry_integrations_old && 
              userData.calry_integrations_old.some(integration => integration.hospitable)));
  };

  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const sendMenuRef = useRef(null);
  const sendButtonRef = useRef(null);
  // Mobile navigation ref for height calculation
  const mobileNavRef = useRef(null);
  // Refs for tracking request IDs and current conversation
  const currentConversationIdRef = useRef("");
  const latestScratchRequestIdRef = useRef(null);
  const latestCommandRequestIdRef = useRef(null);
  const latestConversationRequestIdRef = useRef(null);
  const latestSendMessageRequestIdRef = useRef(null);

  const [conversationData, setConversationData] = useState({});
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [propertyName, setPropertyName] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [sendOptionsVisible, setSendOptionsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is scrolled to bottom
  const [mobileHeight, setMobileHeight] = useState("100vh"); // Height for mobile chatbot container

  const [generateButtonIsEnabled, setGenerateButtonIsEnabled] = useState(false);
  const [generateButtonText, setGenerateButtonText] = useState("");
  const [generateButtonJustification, setGenerateButtonJustification] =
    useState("");
  const [showGenerateJustificationButton, setShowGenerateJustificationButton] =
    useState(false);
  const [generateOptionsVisible, setGenerateOptionsVisible] = useState(false);
  const [generateCommandApiLoading, setGenerateCommandApiLoading] =
    useState(false);
  const [generateScratchApiLoading, setGenerateScratchApiLoading] =
    useState(false);
  const [assistanceUsed, setAssistanceUsed] = useState(null); // 'command' if the user clicked "generate from command"; 'generate' if the user clicked "generate from scratch"; null if neither, or if the user cleared a generated message
  const [showInboxUpgradeModal, setShowInboxUpgradeModal] = useState(false);

  // Add state for showing locked history
  const [showLocked, setShowLocked] = useState(false);

  // Sender selection states
  const [availableSenders, setAvailableSenders] = useState([]);
  const [selectedSender, setSelectedSender] = useState(null);
  const [sendersDropdownVisible, setSendersDropdownVisible] = useState(false);
  const [loadingSenders, setLoadingSenders] = useState(false);
  const sendersMenuRef = useRef(null);
  const sendersButtonRef = useRef(null);

  // API functions for sender management
  const getAvailableSendersApi = async (propertyName) => {
    setLoadingSenders(true);
    try {
      const result = await callGetAvailableSendersApi(propertyName);
      if (result.senders) {
        setAvailableSenders(result.senders);
        return result;
      } else {
        return { error: result.error || "Failed to fetch available senders" };
      }
    } catch (error) {
      return { error: "Internal server error" };
    } finally {
      setLoadingSenders(false);
    }
  };

  const setSenderForConversationApi = async (conversationId, senderId, senderName) => {
    try {
      const result = await callSetSenderForConversationApi(conversationId, senderId, senderName);
      if (!result.error) {
        // Custom toast messages based on sender type
        let toastMessage;
        if (["PRIMARY_HOST", "LISTING_OWNER"].includes(senderId)) { // "primary_host" is the legacy label
          toastMessage = "Sender set to listing owner";
        } else if (senderId === "CLEAR") {
          toastMessage = "Sender set to default sender";
        } else {
          toastMessage = `Sender set to ${senderName}`;
        }
        
        ToastHandle(toastMessage, "success");
        return result;
      } else {
        return { error: result.error || "Failed to set sender" };
      }
    } catch (error) {
      return { error: "Internal server error" };
    }
  };

  const callGenerateFromScratchApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGenerateScratchApiLoading(true);

    // Create a unique ID for this request
    const requestId = `generate_scratch_${Date.now()}`;
    latestScratchRequestIdRef.current = requestId;
    const conversation_id = conversationData.conversation_id;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }, // don't throw an error for non-2xx responses
      };
      const body_data = { property_name: propertyName, conversation_id };
      const response = await axios.post(
        `${baseUrl}/generate_response`,
        body_data,
        config
      );

      // Check if this is still the most recent request and conversation hasn't changed
      if (
        latestScratchRequestIdRef.current !== requestId ||
        currentConversationIdRef.current !== conversation_id
      ) {
        return { error: "Conversation changed" };
      }

      if (response.status === 200) {
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.data;
    } catch (error) {
      // Don't show error if request was for a previous conversation
      if (currentConversationIdRef.current !== conversation_id) {
        return { error: "Conversation changed" };
      }

      // Only show error for the latest request
      if (latestScratchRequestIdRef.current === requestId) {
        ToastHandle("Internal server error", "danger");
      }
      return { error: "Internal server error" };
    } finally {
      // Only reset loading state if this is still the latest request
      if (latestScratchRequestIdRef.current === requestId) {
        setGenerateScratchApiLoading(false);
      }
    }
  };
  const callGenerateFromCommandApi = async (command) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGenerateCommandApiLoading(true);

    // Create a unique ID for this request
    const requestId = `generate_command_${Date.now()}`;
    latestCommandRequestIdRef.current = requestId;
    const conversation_id = conversationData.conversation_id;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }, // don't throw an error for non-2xx responses
      };
      const body_data = {
        property_name: propertyName,
        conversation_id,
        command,
      };
      const response = await axios.post(
        `${baseUrl}/response_from_command`,
        body_data,
        config
      );

      // Check if this is still the most recent request and conversation hasn't changed
      if (
        latestCommandRequestIdRef.current !== requestId ||
        currentConversationIdRef.current !== conversation_id
      ) {
        return { error: "Conversation changed" };
      }

      if (response.status === 200) {
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.data;
    } catch (error) {
      // Don't show error if request was for a previous conversation
      if (currentConversationIdRef.current !== conversation_id) {
        return { error: "Conversation changed" };
      }

      // Only show error for the latest request
      if (latestCommandRequestIdRef.current === requestId) {
        ToastHandle("Internal server error", "danger");
      }
      return { error: "Internal server error" };
    } finally {
      // Only reset loading state if this is still the latest request
      if (latestCommandRequestIdRef.current === requestId) {
        setGenerateCommandApiLoading(false);
      }
    }
  };

  const handleGenerateFromScratchClick = async () => {
    if (generateCommandApiLoading || generateScratchApiLoading) {
      return;
    }
    if (generateButtonText) {
      setInputValue(generateButtonText);
      setShowGenerateJustificationButton(true);
      setAssistanceUsed("generate");
    } else {
      const response = await callGenerateFromScratchApi();
      if (!("error" in response) && response?.response) {
        setInputValue(response.response);
        if (response?.justification) {
          setGenerateButtonJustification(response?.justification);
          setShowGenerateJustificationButton(true);
        }
        setAssistanceUsed("generate");
        setGenerateButtonText(response.response); // in case the user clicks generate again
      }
    }
  };
  // Only checks if the second word is 'reacted'. So may not be 1000% accurate, but low stakes use case so fine for now. Can be improved later if needed
  const lastMessageIsEmojiReact = () => {
    if (
      allConversationData?.messages &&
      allConversationData.messages.length > 0
    ) {
      const lastMessage =
        allConversationData.messages[allConversationData.messages.length - 1];
      if (!lastMessage || !lastMessage.text) {
        return false;
      }
      const lastMessageText = lastMessage.text;
      const words = lastMessageText.split(" ");
      return words.length > 1 && words[1] === "reacted";
    }
    return false;
  };

  const getTooltipMessage = () => {
    if (generateButtonIsEnabled) {
      return "";
    }
    if (
      !allConversationData?.messages ||
      allConversationData.messages.length === 0
    ) {
      return "AI response not available.";
    }

    const lastMessage =
      allConversationData.messages[allConversationData.messages.length - 1];
    if (!lastMessage || !lastMessage.sender) {
      return "AI response not available.";
    }

    if (lastMessage.sender === "guest") {
      if (lastMessageIsEmojiReact()) {
        return "AI response is only available when the last message is from the guest.";
      } else {
        return "AI response not available. If the message just came in, it may take a moment to prepare.";
      }
    } else {
      return "AI response is only available when the last message is from the guest.";
    }
  };
  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return; // no message added
    if (!conversationData?.conversation_id) return; // no conversation selected
    setSendMessageLoading(true);

    const { conversation_id, reservation_id = null } = conversationData; // reservation_id default to null if not present. Sometimes the send operation will still work if it isn't included, so proceed
    const messageToSend = inputValue;

    // Optimistically add the message to the local state immediately
    const currentTime = new Date();
    const optimisticMessage = {
      text: messageToSend, // Use simple string for LeftMessage compatibility
      sender: "host", // Host messages should have sender "host" to render on right side
      messageDay: formatRelativeDate(currentTime.toISOString()),
      rawDate: currentTime,
      sendBy: "host",
      id: `temp-${Date.now()}`, // Temporary ID until API response
      timeFormatConvert: timeFormat(currentTime.toISOString()),
      attachments: [],
    };

    // Add the message to the local state for immediate display
    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    
    // Also add the message to the main conversation state in the parent component
    if (updateConversationLocal) {
      updateConversationLocal(conversation_id, optimisticMessage, "pms");
    }

    try {
      const sendMsgResponse = await callSendMessageApi(
        messageToSend,
        conversation_id,
        reservation_id,
        propertyName,
        assistanceUsed
      );

      if (!("error" in sendMsgResponse)) {
        setInputValue("");
        setShowGenerateJustificationButton(false);
        setAssistanceUsed(null);

        await updateConversationFromApi(conversation_id);
      } else {
        // If there was an error, remove the optimistic message and restore the input
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.id !== optimisticMessage.id)
        );
        setInputValue(messageToSend);
        ToastHandle("Error sending message", "danger");
      }
    } catch (error) {
      ToastHandle("Error sending message", "danger");
      // Remove the optimistic message and restore the input on error
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== optimisticMessage.id)
      );
      setInputValue(messageToSend);
    } finally {
      setSendMessageLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (enterKeyBehavior === 'newline') {
        // When setting is 'newline', Enter always creates a new line
        // User must click Send button to send message
        return; // Allow default behavior (new line)
      } else {
        // When setting is 'send' (default), Enter sends message unless Shift is pressed
        if (e.shiftKey) {
          // Insert a new line when shift+enter is pressed instead of sending the message
          e.preventDefault();
          const { selectionStart, selectionEnd, value } = e.target;
          const newValue =
            value.substring(0, selectionStart) +
            "\n" +
            value.substring(selectionEnd);
          setInputValue(newValue);
          setTimeout(() => {
            e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
          }, 0); // Move the cursor to the new position
        } else {
          handleSendMessage();
        }
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
    if (generateCommandApiLoading || generateScratchApiLoading) {
      return;
    }
    setGenerateOptionsVisible(!generateOptionsVisible);
  };

  const handleGenerateOptionSelect = async (option) => {
    setGenerateOptionsVisible(false);
    if (option === "scratch") {
      await handleGenerateFromScratchClick();
    } else if (option === "command") {
      const response = await callGenerateFromCommandApi(inputValue);
      if (!("error" in response)) {
        setInputValue(response.response);
        setAssistanceUsed("command");
      }
    }
  };
  const handleSendButtonClick = () => {
    setSendOptionsVisible(!sendOptionsVisible);
  };

  const handleSendOptionSelect = (option) => {
    setSendOptionsVisible(false);

    if (option === "custom") {
      setScheduleMessageModalOpen(true);
    } else if (option === "schedule") {
      // Default scheduling option
      setScheduleMessageModalOpen(true);
    } else if (option === "tomorrow") {
      // Schedule for tomorrow at 10:30 AM
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      // Here you would handle the actual scheduling logic
      ToastHandle(`Message scheduled for tomorrow at 10:30 AM`, "success");
    } else if (option === "nextday") {
      // Schedule for the day after tomorrow at 10:30 AM
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
      // Here you would handle the actual scheduling logic
      ToastHandle(
        `Message scheduled for the day after tomorrow at 10:30 AM`,
        "success"
      );
    }
  };

  const handleSendersButtonClick = async () => {
    setSendersDropdownVisible(!sendersDropdownVisible);
    
    // Only fetch available senders when dropdown is clicked and opened
    if (!sendersDropdownVisible && conversationData?.property_name && hasHospitableIntegration()) {
      const result = await getAvailableSendersApi(conversationData.property_name);

      // Always include "Listing Owner" and "Default sender" options
      let senderOptions = [
        {
          id: "LISTING_OWNER",
          name: "Listing Owner"
        },
        {
          id: "default",
          name: "Default sender"
        }
      ];
      
      // Add API senders if available
      if (result && !result.error && result.senders && result.senders.length > 0) {
        // Add API senders before the default options
        senderOptions = [...result.senders, ...senderOptions];
      }
      
      setAvailableSenders(senderOptions);
    }
  };

  const handleSenderSelect = async (sender) => {
    setSendersDropdownVisible(false);
    setSelectedSender(sender);
    
    if (conversationData?.conversation_id) {
      // Handle different sender types
      let senderIdToSend, senderNameToSend;
      
      if (sender.id === "default") {
        // If "Default sender" is selected, pass "CLEAR" to the API
        senderIdToSend = "CLEAR";
        senderNameToSend = "CLEAR";
      } else if (sender.id === "LISTING_OWNER") {
        // If "Listing Owner" is selected, pass "LISTING_OWNER" to the API
        senderIdToSend = "LISTING_OWNER";
        senderNameToSend = "LISTING_OWNER";
      } else {
        // Regular sender
        senderIdToSend = sender.id;
        senderNameToSend = sender.name;
      }
      
      const result = await setSenderForConversationApi(
        conversationData.conversation_id,
        senderIdToSend,
        senderNameToSend
      );
      
      if (!result.error) {
        // Optionally refresh conversation data or update local state
        if (updateConversationFromApi) {
          await updateConversationFromApi(conversationData.conversation_id);
        }
      }
    }
  };

  const handleClickOutside = (event) => {
    // Close generate options menu when clicking outside
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setGenerateOptionsVisible(false);
    }

    // Close send options menu when clicking outside
    if (
      sendMenuRef.current &&
      !sendMenuRef.current.contains(event.target) &&
      sendButtonRef.current &&
      !sendButtonRef.current.contains(event.target)
    ) {
      setSendOptionsVisible(false);
    }

    // Close senders dropdown when clicking outside
    if (
      sendersMenuRef.current &&
      !sendersMenuRef.current.contains(event.target) &&
      sendersButtonRef.current &&
      !sendersButtonRef.current.contains(event.target)
    ) {
      setSendersDropdownVisible(false);
    }
  };
  // feed back functionality
  const [justificationText, setJustificationText] = useState("");
  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [feedBackModelOpen, setFeedBackModelOpen] = useState(false);
  const [scheduleMessageModalOpen, setScheduleMessageModalOpen] =
    useState(false);

  // Get next day's date by default for schedule message modal
  const getDefaultScheduleDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };

  const [scheduledDate, setScheduledDate] = useState(getDefaultScheduleDate());
  const [currentMonth, setCurrentMonth] = useState(scheduledDate.getMonth());
  const [currentYear, setCurrentYear] = useState(scheduledDate.getFullYear());
  const [scheduledTime, setScheduledTime] = useState("09:00 AM");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [calendarPosition, setCalendarPosition] = useState("bottom"); // "bottom" or "top"
  const dateFieldRef = useRef(null); // Calculate position for the calendar dropdown to ensure it's fully visible
  const updateCalendarPosition = () => {
    if (!dateFieldRef.current) return;

    const rect = dateFieldRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const calendarHeight = 350; // Approximate height of the calendar dropdown

    // If there's not enough space below, position it above
    if (spaceBelow < calendarHeight && rect.top > calendarHeight) {
      setCalendarPosition("top");
    } else {
      setCalendarPosition("bottom");
    }
  };

  // Update calendar position when toggling the date picker
  const toggleDatePicker = () => {
    updateCalendarPosition();
    setShowDatePicker(!showDatePicker);
  };
  // Get formatted date string (e.g., "May 1st, 2025")
  const getFormattedDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Add ordinal suffix to day (1st, 2nd, 3rd, etc)
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
  };

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Get number of days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Get days from previous month to fill first row
    const daysFromPrevMonth = [];
    if (firstDayOfMonth > 0) {
      const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
      for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        daysFromPrevMonth.push(prevMonthDays - i);
      }
    }

    // Get days for current month
    const daysInCurrentMonth = Array.from(
      { length: daysInMonth },
      (_, i) => i + 1
    );

    // Get days from next month to fill last row
    const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
    const daysFromNextMonth = Array.from(
      { length: totalCells - (daysFromPrevMonth.length + daysInMonth) },
      (_, i) => i + 1
    );

    return { daysFromPrevMonth, daysInCurrentMonth, daysFromNextMonth };
  };

  // Handle month navigation
  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (newMonth === 11) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
      return newMonth;
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (newMonth === 0) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  }; // Handle date selection
  const handleDateSelection = (day, isCurrentMonth = true, event) => {
    let year = currentYear;
    let month = currentMonth;

    if (!isCurrentMonth) {
      if (day > 20) {
        // Likely previous month
        month = month === 0 ? 11 : month - 1;
        if (month === 11) {
          year = year - 1;
        }
      } else {
        // Likely next month
        month = month === 11 ? 0 : month + 1;
        if (month === 0) {
          year = year + 1;
        }
      }
    }

    // Note: Immediate visual feedback is now applied directly in the onClick handler
    // before this function is called, for more immediate response

    const newDate = new Date(year, month, day);
    setScheduledDate(newDate);
    // Keep the date picker open when selecting a date
    // setShowDatePicker(false); -- removed this line to keep calendar open
  };

  // Add click outside handler to close date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      const datePickerElements = document.querySelectorAll(
        ".date-picker-dropdown"
      );
      if (
        datePickerElements.length &&
        !datePickerElements[0].contains(event.target) &&
        !event.target.closest(".date-field-toggle")
      ) {
        setShowDatePicker(false);
      }
    };

    // Only add listener if the date picker is showing
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  // Add effect to reposition calendar on scroll or resize
  useEffect(() => {
    if (showDatePicker) {
      const handleScrollResize = () => {
        updateCalendarPosition();
      };

      window.addEventListener("scroll", handleScrollResize);
      window.addEventListener("resize", handleScrollResize);

      return () => {
        window.removeEventListener("scroll", handleScrollResize);
        window.removeEventListener("resize", handleScrollResize);
      };
    }
  }, [showDatePicker]);

  // Update calendar position when toggling the date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      const datePickerElements = document.querySelectorAll(
        ".date-picker-dropdown"
      );
      if (
        datePickerElements.length &&
        !datePickerElements[0].contains(event.target) &&
        !event.target.closest(".date-field-toggle")
      ) {
        setShowDatePicker(false);
      }
    };

    // Only add listener if the date picker is showing
    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

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

  // Function to format date for separators (Today or Month Day)
  function formatDateForSeparator(date) {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    const today = new Date();
    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    // Check if the date is today
    if (
      date.getDate() === todayDate.getDate() &&
      date.getMonth() === todayDate.getMonth() &&
      date.getFullYear() === todayDate.getFullYear()
    ) {
      return "Today";
    }

    // Check if it's yesterday
    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setDate(todayDate.getDate() - 1);

    if (
      date.getDate() === yesterdayDate.getDate() &&
      date.getMonth() === yesterdayDate.getMonth() &&
      date.getFullYear() === yesterdayDate.getFullYear()
    ) {
      return "Yesterday";
    }

    // For older dates, show Month Day format
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
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
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  } // When we get the API data, populate the messages array and set the generate button functionality
  useEffect(() => {
    // Update the current conversation ID ref first, before processing messages
    if (allConversationData?.conversation_id) {
      currentConversationIdRef.current = allConversationData.conversation_id;
    }

    // Populate messages
    if (allConversationData?.messages) {
      // Only update the state if this conversation is still the one we want to display
      if (
        allConversationData?.conversation_id ===
        currentConversationIdRef.current
      ) {
        const newMessages = allConversationData.messages.map((messageList) => {
          const { sender, text, time, attachments, id, justification, response } = messageList;
          let timeFormatConvert = timeFormat(time);
          return {
            text: typeof text === 'string' ? text : text?.text || "",
            sender:
              sender === "host" || sender === "hostbuddy" ? "user" : "bot",
            messageDay: formatRelativeDate(time),
            rawDate: new Date(time), // Store the raw date for comparing
            sendBy: sender,
            id,
            timeFormatConvert,
            attachments,
            justification, // Include justification property
            response, // Include response property
          };
        });
        setConversationData(allConversationData);
        setMessages(newMessages);
        setPropertyName(allConversationData.property_name);

        // Set the selected sender from conversation data and clear available senders
        if (hasHospitableIntegration()) {
          // Clear available senders - they will be loaded when dropdown is clicked
          setAvailableSenders([]);
          
          if (["PRIMARY_HOST", "LISTING_OWNER"].includes(allConversationData.sender_id_airbnb)) {
            // Handle LISTING_OWNER case - show "Listing Owner" label
            setSelectedSender({
              id: "LISTING_OWNER",
              name: "Listing owner"
            });
          } else if (allConversationData.sender_name_airbnb) {
            setSelectedSender({
              id: allConversationData.sender_id_airbnb || "default",
              name: allConversationData.sender_name_airbnb
            });
          } else {
            // If no sender name in conversation, show "Default sender"
            setSelectedSender({
              id: "default",
              name: "Default sender"
            });
          }
        }
      }
    }

    // Generate button functionality. Only enable the generate button if the last message is from the guest and we have a pre-generated message ready for it
    if (
      allConversationData?.messages &&
      allConversationData.messages.length > 0 &&
      allConversationData.messages[allConversationData.messages.length - 1]
        .sender === "guest" &&
      allConversationData?.conversation_id === currentConversationIdRef.current // Only update if this is still the current conversation
    ) {
      setGenerateButtonIsEnabled(true);
      if (
        allConversationData.generated_response &&
        allConversationData.generated_response.for_message ===
          allConversationData.messages[allConversationData.messages.length - 1]
            .id
      ) {
        setGenerateButtonText(allConversationData.generated_response.response);
        setGenerateButtonJustification(
          allConversationData.generated_response.justification
        );
      }
    } else if (
      allConversationData?.conversation_id === currentConversationIdRef.current
    ) {
      setGenerateButtonIsEnabled(false);
      setGenerateButtonText("");
    }

    // Clear the input field only if this is still the current conversation
    if (
      allConversationData?.conversation_id === currentConversationIdRef.current
    ) {
      setInputValue("");
      setShowGenerateJustificationButton(false);
      setAssistanceUsed(null);
    }
  }, [allConversationData]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to check if scrolled to bottom (with a small threshold)
  const checkIfScrolledToBottom = useCallback(() => {
    if (messageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageListRef.current;
      // Consider "at bottom" if within 30px of the bottom
      const isBottom = scrollTop + clientHeight >= scrollHeight - 30;
      setIsAtBottom(isBottom);
      return isBottom;
    }
    return false;
  }, []);

  // Add scroll event listener to track if user manually scrolls away from bottom
  useEffect(() => {
    const messageList = messageListRef.current;
    if (messageList) {
      const handleScroll = () => {
        checkIfScrolledToBottom();
      };
      messageList.addEventListener("scroll", handleScroll);
      return () => {
        messageList.removeEventListener("scroll", handleScroll);
      };
    }
  }, [checkIfScrolledToBottom]);

  // Allow the text area to expand vertically as lines are added
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]); // Smart scroll behavior: only scroll to bottom if user was already at bottom or if user sent the message
  useEffect(() => {
    if (messageListRef.current && messages.length > 0) {
      const wasAtBottom = isAtBottom;
      const lastMessage = messages[messages.length - 1];
      const userSentLastMessage = lastMessage && lastMessage.sendBy === "host";

      // Don't auto-scroll if this is just a conversation update (not a new message)
      const isConversationUpdate = allConversationData?._isUpdate;

      // Auto-scroll if:
      // 1. User was already at the bottom before new messages, AND
      // 2. Either the user just sent a message OR this isn't just a conversation update
      if (wasAtBottom && (userSentLastMessage || !isConversationUpdate)) {
        setTimeout(() => {
          if (messageListRef.current) {
            messageListRef.current.scrollTop =
              messageListRef.current.scrollHeight;
            setIsAtBottom(true);
          }
        }, 0);
      }
    }
  }, [messages, isAtBottom, allConversationData?._isUpdate]);

  // Calculate mobile height by subtracting mobile nav height from 100vh
  useEffect(() => {
    const calculateMobileHeight = () => {
      if (window.innerWidth < 992 && mobileNavRef.current) {
        const mobileNavHeight = mobileNavRef.current.offsetHeight;
        const calculatedHeight = `calc(100vh - ${mobileNavHeight}px)`;
        setMobileHeight(calculatedHeight);
      } else {
        setMobileHeight("100vh");
      }
    };

    // Calculate on mount and window resize
    calculateMobileHeight();

    const handleResize = () => {
      calculateMobileHeight();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Track the previous conversation ID to distinguish between new conversations and updates
  const previousConversationIdRef = useRef(null);

  // Scroll to bottom ONLY when a NEW conversation is selected (not on updates)
  useEffect(() => {
    if (messageListRef.current && allConversationData?.conversation_id) {
      const currentConversationId = allConversationData.conversation_id;
      const previousConversationId = previousConversationIdRef.current;

      // Only auto-scroll if this is a truly NEW conversation selection
      if (currentConversationId !== previousConversationId) {
        setTimeout(() => {
          if (
            messageListRef.current &&
            allConversationData?.conversation_id === currentConversationId
          ) {
            messageListRef.current.scrollTop =
              messageListRef.current.scrollHeight;
            setIsAtBottom(true);
          }
        }, 100); // Small delay to ensure content is rendered
      }

      // Update the previous conversation ID reference
      previousConversationIdRef.current = currentConversationId;
    }
  }, [allConversationData?.conversation_id]);
  // Track current conversation ID changes
  useEffect(() => {
    // This effect runs on mount and when conversation_id changes
    // Update the current conversation ID reference
    if (allConversationData?.conversation_id) {
      currentConversationIdRef.current = allConversationData.conversation_id;
    }

    // Return a cleanup function that runs when the component unmounts or conversation changes
    return () => {
      // Reset request tracking for the old conversation
      latestScratchRequestIdRef.current = null;
      latestCommandRequestIdRef.current = null;
      latestConversationRequestIdRef.current = null;
      latestSendMessageRequestIdRef.current = null;
    };
  }, [allConversationData?.conversation_id]);

  const toolTipMessage = getTooltipMessage();

  // Filter messages based on subscription plan
  const now = new Date();
  let lockDurationMs = 3 * 24 * 60 * 60 * 1000; // Default 3 days for basic plans
  
  // Check for different subscription plans (case insensitive)
  const isPro = /pro/i.test(subscriptionPlan);
  const isElite = /elite/i.test(subscriptionPlan);
  const isUltimate = /ultimate/i.test(subscriptionPlan);
  
  if (isPro) {
    lockDurationMs = 30 * 24 * 60 * 60 * 1000; // 30 days for Pro
  } else if (isElite) {
    lockDurationMs = 60 * 24 * 60 * 60 * 1000; // 60 days for Elite
  } else if (isUltimate) {
    lockDurationMs = Number.MAX_SAFE_INTEGER; // No limit for Ultimate
  }
  
  const recentMessages = messages.filter(msg => now - new Date(msg.rawDate) <= lockDurationMs);
  const olderMessages = !isUltimate ? messages.filter(msg => now - new Date(msg.rawDate) > lockDurationMs) : [];

  // Scroll handler to show lock when at top and there are older messages
  const handleMessageListScroll = (e) => {
    // Don't show locked messages UI for Ultimate plan or trial users
    if (isUltimate || subscriptionPlan === "trial") {
      setShowLocked(false);
      return;
    }
    
    if (e.target.scrollTop === 0 && olderMessages.length > 0) {
      setShowLocked(true);
    } else if (e.target.scrollTop > 0 && showLocked) {
      setShowLocked(false);
    }
  };

  return (
    <div className="main-chat">
      <div className="d-block d-lg-none mobile-nav" ref={mobileNavRef}>
        <button
          onClick={() => setCurrentView("conversations")}
          className="btn btn-link"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentView("details")}
          className="btn btn-link"
        >
          Details
        </button>
      </div>{" "}      <div
        className="chatbot"
        style={{
          margin: "0px",
          width: "100%",
          padding: "0px",
          backgroundColor: "#0F1117",
          height: window.innerWidth < 992 ? mobileHeight : "100%",
        }}
      >
        {allConversationData && Object.keys(allConversationData).length > 0 ? (
          <div
            className="message-list"
            ref={messageListRef}
            style={{ marginBottom: "0px" }}
            onScroll={handleMessageListScroll}
          >
            {showLocked && !isUltimate && subscriptionPlan !== "trial" && (
              <ConversationHistoryLocked />
            )}
            {recentMessages?.map((message, index) => {
              const showDateSeparator =
                index === 0 ||
                !isSameDay(recentMessages[index - 1]?.rawDate, message.rawDate);
              return (
                <React.Fragment key={message?.id}>
                  {showDateSeparator && (
                    <div className="date-separator">
                      {formatDateForSeparator(message.rawDate)}
                    </div>
                  )}
                  <MessageInbox
                    text={typeof message.text === 'string' ? message.text : message.text?.text}
                    sender={message.sender}
                    currentMessageDay={message.messageDay}
                    messageData={message}
                    feedBckModelOpen={feedBckModelOpenHndle}
                    handleJustificationClick={handleJustificationClick}
                    feedBackDataGet={feedBackDataGet}
                    prevMsgText={recentMessages[index - 1]?.text}
                    isInitialMessage={index <= 1}
                    guestName={allConversationData.guest_name}
                    guestImageUrl={allConversationData.image_url}
                    conversationId={allConversationData.conversation_id}
                    reservationId={allConversationData.reservation_id}
                  />
                  {/* Banner for passed messages */}
                  {allConversationData?.passed_msgs &&
                    allConversationData.passed_msgs[message.id] && (
                      <div className="passed-message-banner">
                        <span>
                          HostBuddy chose not to respond to this message.{" "}
                        </span>
                        <a
                          href="#"
                          onClick={(e) =>
                            handleJustificationClick(
                              e,
                              allConversationData.passed_msgs[message.id]
                                .justification
                            )
                          }
                        >
                          Why?
                        </a>
                      </div>
                    )}
                </React.Fragment>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div
            className="no-messages-placeholder"
            style={{
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <img
              src={placeholderImg}
              alt="Chat bubbles"
              style={{ width: "200px", opacity: 0.7 }}
            />
            <p style={{ color: "#AAA" }}>No conversation selected</p>
          </div>
        )}
        {eliteFeaturesAvailable && !(conversationData?.channel == "hostbuddy") ? (
          <>
            {" "}
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
                    resize: "none",
                    overflow: "auto",
                    outline: "none",
                    boxShadow: "none",
                    borderColor: "inherit",
                    color: "#ffffff",
                  }}
                />
                {(generateCommandApiLoading || generateScratchApiLoading) && (
                  <div className="loader-container">
                    <Loader />
                  </div>
                )}{" "}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <div className="generate-container">
                    <button
                      ref={buttonRef}
                      className={`generate-button ${
                        generateOptionsVisible ? "active" : ""
                      }`}
                      onClick={handleGenerateButtonClick}
                    >
                      <img
                        src={AiMessageIcon}
                        alt="AI Message Icon"
                        width="15"
                        height="15"
                        style={{ marginRight: "5px" }}
                      />
                      <span
                        style={{
                          marginRight: "1px",
                          color: "rgba(208, 211, 219, 1)",
                          fontWeight: "500",
                          fontSize: "14px"
                        }}
                      >
                        AI Response
                      </span>
                      <img
                        src={ChevDownIcon}
                        alt="Chevron Icon"
                        width="20"
                        height="20"
                        style={{ marginLeft: "0px" }}
                        className="chevron-icon"
                      />{" "}
                    </button>
                    {generateOptionsVisible && (
                      <div
                        ref={menuRef}
                        className="generate-menu"
                        style={{ zIndex: 1000, border: "1px solid #38383d" }}
                      >
                        {accountAllowsGenerateButton ? (
                          conversationData?.conversation_id ? (
                            <>
                              {generateButtonIsEnabled ? (
                                <button
                                  className="generate-menu-item"
                                  key="scratch"
                                  onClick={() =>
                                    handleGenerateOptionSelect("scratch")
                                  }
                                >
                                  Generate From Scratch
                                </button>
                              ) : (
                                <button
                                  className="generate-menu-item greyed-out"
                                  key="scratch"
                                  disabled
                                  data-tooltip-id="aiNotAvailableTooltip"
                                  data-tooltip-content={toolTipMessage}
                                >
                                  Generate From Scratch
                                </button>
                              )}
                              {inputValue.trim() !== "" ? (
                                <button
                                  className="generate-menu-item greyed-out"
                                  key="command"
                                  onClick={() =>
                                    handleGenerateOptionSelect("command")
                                  }
                                >
                                  Generate From My Instruction
                                </button>
                              ) : (
                                <button
                                  className="generate-menu-item greyed-out"
                                  key="command"
                                  disabled
                                  data-tooltip-id="aiNotAvailableTooltip"
                                  data-tooltip-content={
                                    "Start typing to instruct HostBuddy how to message the guest"
                                  }
                                >
                                  Generate From My Instruction
                                </button>
                              )}
                            </>
                          ) : (
                            <>
                              <button
                                className="generate-menu-item greyed-out"
                                key="scratch"
                                disabled
                                data-tooltip-id="aiNotAvailableTooltip"
                                data-tooltip-content={
                                  "Select a conversation to generate a response"
                                }
                              >
                                Generate From Scratch
                              </button>
                              <button
                                className="generate-menu-item greyed-out"
                                key="command"
                                disabled
                                data-tooltip-id="aiNotAvailableTooltip"
                                data-tooltip-content={
                                  "Select a conversation to instruct HostBuddy how to craft a message for this guest"
                                }
                              >
                                Generate From My Instruction
                              </button>
                            </>
                          )
                        ) : propertyIsLocked ? (
                          <>
                            <button
                              className="generate-menu-item greyed-out"
                              key="scratch"
                              disabled
                              data-tooltip-id="aiNotAvailableTooltip"
                              data-tooltip-content={
                                "Unlock this property from the Properties page to enable message generation in the inbox"
                              }
                            >
                              Generate From Scratch
                            </button>
                            <button
                              className="generate-menu-item greyed-out"
                              key="command"
                              disabled
                              data-tooltip-id="aiNotAvailableTooltip"
                              data-tooltip-content={
                                "Unlock this property from the Properties page to enable message generation in the inbox"
                              }
                            >
                              Generate From My Instruction
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="generate-menu-item greyed-out"
                              key="scratch"
                              disabled
                              data-tooltip-id="aiNotAvailableTooltip"
                              data-tooltip-content={
                                "Upgrade to HostBuddy Elite to enable message generation in the inbox"
                              }
                            >
                              Generate From Scratch
                            </button>
                            <button
                              className="generate-menu-item greyed-out"
                              key="command"
                              disabled
                              data-tooltip-id="aiNotAvailableTooltip"
                              data-tooltip-content={
                                "Upgrade to HostBuddy Elite to enable message generation in the inbox"
                              }
                            >
                              Generate From My Instruction
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* <div 
                    className="vertical-divider" 
                    style={{ 
                      backgroundColor: "#bdc1c926",
                      borderRadius: "1px",
                      height: "16px",
                      position: "relative",
                      width: "1px",
                      margin: "0 5px"
                    }}
                  ></div> */}

                  {/* <button className="template-button">
                    <img src={SendTemplateIcon} alt="Send Template Icon" width="15" height="15" style={{ marginRight: '5px' }} />                    <span style={{ color: '#D0D3DB' }}>Send Template</span>
                  </button> */}
                </div>

                <div
                  className="send-container"
                  style={{ position: "relative", display: "flex", gap: "8px", alignItems: "center" }}
                >
                  {/* Sender Selection Dropdown */}
                  {hasHospitableIntegration() && (
                    <div style={{ position: "relative" }}>
                      <button
                        ref={sendersButtonRef}
                        onClick={handleSendersButtonClick}
                        className="senders-dropdown-button"
                        disabled={loadingSenders}
                        style={{
                          backgroundColor: "#24262E",
                          border: "1px solid #38383d",
                          borderRadius: "4px",
                          color: "#D0D3DB",
                          padding: "3px 10px",
                          fontSize: "12px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          minWidth: "140px",
                          justifyContent: "space-between"
                        }}
                      >
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {loadingSenders ? "Loading..." : selectedSender ? selectedSender.name : "Select Sender"}
                        </span>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            transform: sendersDropdownVisible ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease"
                          }}
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>

                      {sendersDropdownVisible && (
                        <div
                          ref={sendersMenuRef}
                          className="senders-dropdown-menu"
                          style={{
                            position: "absolute",
                            bottom: "100%",
                            right: "0",
                            marginBottom: "8px",
                            backgroundColor: "#262730",
                            border: "1px solid #24262E",
                            borderRadius: "4px",
                            zIndex: 1000,
                            minWidth: "200px",
                            maxHeight: "200px",
                            overflowY: "auto",
                            overflow: "hidden"
                          }}
                        >
                          {loadingSenders ? (
                            <div
                              style={{
                                padding: "8px 16px",
                                color: "#D0D3DB",
                                fontSize: "14px",
                                textAlign: "center"
                              }}
                            >
                              Loading...
                            </div>
                          ) : availableSenders.length > 0 ? (
                            availableSenders.map((sender) => (
                              <button
                                key={sender.id}
                                className="senders-dropdown-item"
                                onClick={() => handleSenderSelect(sender)}
                                style={{
                                  width: "100%",
                                  padding: "8px 16px",
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#D0D3DB",
                                  fontSize: "14px",
                                  textAlign: "left",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  position: "relative",
                                  fontFamily: "DM Sans, Helvetica"
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "rgba(1, 50, 128, 1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "transparent";
                                }}
                              >
                                {sender.name}
                              </button>
                            ))
                          ) : (
                            <button
                              className="senders-dropdown-item"
                              onClick={() => handleSenderSelect({ id: "default", name: "Default sender" })}
                              style={{
                                width: "100%",
                                padding: "8px 16px",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#D0D3DB",
                                fontSize: "14px",
                                textAlign: "left",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                position: "relative",
                                fontFamily: "DM Sans, Helvetica"
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "rgba(1, 50, 128, 1)";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                              }}
                            >
                              Default sender
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

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

                  {sendOptionsVisible && (
                    <div
                      ref={sendMenuRef}
                      className="send-menu"
                      style={{ zIndex: 1000, border: "1px solid #38383d" }}
                    >
                      <button
                        className="send-menu-item"
                        key="schedule"
                        onClick={() => handleSendOptionSelect("schedule")}
                      >
                        Schedule Message
                      </button>
                      <button
                        className="send-menu-item"
                        key="tomorrow"
                        onClick={() => handleSendOptionSelect("tomorrow")}
                      >
                        Tomorrow at 10:30 AM
                      </button>
                      <button
                        className="send-menu-item"
                        key="nextday"
                        onClick={() => handleSendOptionSelect("nextday")}
                      >
                        Next Day at 10:30 AM
                      </button>
                      <button
                        className="send-menu-item"
                        key="custom"
                        onClick={() => handleSendOptionSelect("custom")}
                      >
                        Customize Time
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {showGenerateJustificationButton && (
              <div
                className="where-did link-container"
                style={{ marginRight: "auto" }}
              >
                <a
                  href="#"
                  onClick={(e) =>
                    handleJustificationClick(e, generateButtonJustification)
                  }
                >
                  Where did this come from?
                </a>
              </div>
            )}
          </>
        ) : conversationData?.channel == "hostbuddy" ? null : (
          allConversationData &&
          Object.keys(allConversationData).length > 0 && (
            <p style={{ fontSize: "14px", margin: "0 auto" }}>
              Inbox is in view-only mode.{" "}
              <button 
                onClick={() => setShowInboxUpgradeModal(true)}
                style={{ 
                  fontSize: "14px", 
                  background: "none", 
                  border: "none", 
                  color: "#007bff", 
                  textDecoration: "underline", 
                  cursor: "pointer",
                  padding: "0"
                }}
              >
                Upgrade
              </button>{" "}
              to generate and send messages.
            </p>
          )
        )}
      </div>
      <Tooltip
        className="generate-tooltip"
        id="aiNotAvailableTooltip"
        delayShow={0}
        place="top"
        effect="solid"
        style={{ zIndex: 9999 }}
        positionStrategy="fixed"
        offset={15}
        float={true}
      />
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
      {/* Schedule Message Modal */}
      {scheduleMessageModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1050,
          }}
          onClick={() => setScheduleMessageModalOpen(false)}
        >
          <div
            style={{
              width: "480px",
              backgroundColor: "#2B2E36",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
              padding: "0",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px 24px",
                paddingBottom: "15px",
                borderBottom: "none",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#D0D3DB",
                  fontSize: "24px",
                  fontWeight: "700",
                  fontFamily: "poppins",
                }}
              >
                Schedule message
              </h2>
              <button
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  color: "#A6A9B2",
                  cursor: "pointer",
                  padding: "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "24px",
                  height: "24px",
                }}
                onClick={() => setScheduleMessageModalOpen(false)}
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "0 24px" }}>
              {" "}
              {/* Date and Time Selection Section */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                {/* Date Field */}{" "}
                <div
                  style={{
                    flex: 1.5,
                    minWidth: "240px", // Ensure sufficient width for the date field
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#A6A9B2",
                      fontFamily: "DMSans",
                      fontWeight: "600",
                    }}
                  >
                    Date
                  </label>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    {" "}
                    <div
                      ref={dateFieldRef}
                      className="date-field-toggle"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#24262E",
                        border: "1px solid transparent",
                        borderRadius: "4px",
                        padding: "10px 12px",
                        cursor: "pointer",
                        color: "#D0D3DB",
                        fontSize: "16px",
                        position: "relative",
                        minWidth: "200px", // Ensure sufficient width
                        whiteSpace: "nowrap", // Prevent wrapping of all contents
                      }}
                      onClick={toggleDatePicker}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ marginRight: "8px" }}
                      >
                        <path
                          d="M5.33333 1.33334V3.33334"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M10.6667 1.33334V3.33334"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <path
                          d="M2.33333 6.00001H13.6667"
                          stroke="white"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <rect
                          x="2.33333"
                          y="3.33334"
                          width="11.3333"
                          height="10.6667"
                          rx="2"
                          stroke="white"
                          strokeWidth="1.2"
                        />
                      </svg>{" "}
                      <span
                        style={{
                          flex: 1,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {getFormattedDate(scheduledDate)}
                      </span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>{" "}
                      {/* Calendar Dropdown */}
                      {showDatePicker && (
                        <div
                          className="date-picker-dropdown"
                          style={{
                            position: "fixed", // Changed to fixed positioning to ensure visibility
                            left: dateFieldRef.current
                              ? dateFieldRef.current.getBoundingClientRect()
                                  .left
                              : 0,
                            // Intelligently position the calendar either above or below based on available space
                            top:
                              calendarPosition === "top"
                                ? dateFieldRef.current
                                  ? dateFieldRef.current.getBoundingClientRect()
                                      .top - 360
                                  : "auto"
                                : dateFieldRef.current
                                ? dateFieldRef.current.getBoundingClientRect()
                                    .bottom + 4
                                : "auto",
                            backgroundColor: "#2B2E36",
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                            padding: "16px",
                            width: "252px",
                            maxHeight: "350px",
                            overflowY: "auto",
                            zIndex: 1100,
                          }}
                          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                        >
                          {/* Calendar Header */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              marginBottom: "16px",
                            }}
                          >
                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "4px",
                                color: "white",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                goToPreviousMonth();
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M10 4L6 8L10 12"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                            <div
                              style={{
                                color: "white",
                                fontSize: "16px",
                                fontWeight: "500",
                              }}
                            >
                              {
                                [
                                  "January",
                                  "February",
                                  "March",
                                  "April",
                                  "May",
                                  "June",
                                  "July",
                                  "August",
                                  "September",
                                  "October",
                                  "November",
                                  "December",
                                ][currentMonth]
                              }{" "}
                              {currentYear}
                            </div>

                            <button
                              style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: "4px",
                                color: "white",
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                goToNextMonth();
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M6 4L10 8L6 12"
                                  stroke="white"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </button>
                          </div>

                          {/* Day headers */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(7, 1fr)",
                              gap: "4px",
                              marginBottom: "8px",
                            }}
                          >
                            {[
                              "SUN",
                              "MON",
                              "TUE",
                              "WED",
                              "THU",
                              "FRI",
                              "SAT",
                            ].map((day) => (
                              <div
                                key={day}
                                style={{
                                  textAlign: "center",
                                  fontSize: "12px",
                                  fontWeight: "600",
                                  color: "#A6A9B2",
                                  padding: "4px 0",
                                }}
                              >
                                {day}
                              </div>
                            ))}
                          </div>
                          {/* Days grid */}
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(7, 1fr)",
                              gap: "4px",
                            }}
                            className="date-picker-dropdown"
                          >
                            {" "}
                            {/* Previous month days */}
                            {generateCalendarDays().daysFromPrevMonth.map(
                              (day) => {
                                // Check if this day is the selected date (from previous month)
                                const prevMonth =
                                  currentMonth === 0 ? 11 : currentMonth - 1;
                                const prevMonthYear =
                                  prevMonth === 11
                                    ? currentYear - 1
                                    : currentYear;
                                const isSelected =
                                  scheduledDate.getDate() === day &&
                                  scheduledDate.getMonth() === prevMonth &&
                                  scheduledDate.getFullYear() === prevMonthYear;

                                return (
                                  <div
                                    key={`prev-${day}`}
                                    style={{
                                      textAlign: "center",
                                      padding: "8px 0",
                                      color: isSelected ? "white" : "#676A73",
                                      fontSize: "14px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      backgroundColor: isSelected
                                        ? "#01255E"
                                        : "transparent",
                                      transition:
                                        "background-color 0.05s ease, color 0.05s ease",
                                      position: "relative", // For absolute positioning of the underline
                                    }}
                                    data-month="prev"
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      // Apply immediate styling to the clicked element
                                      e.currentTarget.style.backgroundColor =
                                        "#01255E";
                                      e.currentTarget.style.color = "white";

                                      // Then call the date selection handler
                                      handleDateSelection(day, false, e);
                                    }}
                                  >
                                    {day}
                                    {/* Underline indicator for selected date */}
                                    {isSelected && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          bottom: "2px",
                                          left: "50%",
                                          transform: "translateX(-50%)",
                                          width: "10px !important",
                                          height: "2px",
                                          backgroundColor: "#3E88F7",
                                          borderRadius: "1px",
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {/* Current month days */}
                            {generateCalendarDays().daysInCurrentMonth.map(
                              (day) => {
                                // Check if this day is the selected date
                                const isSelected =
                                  scheduledDate.getDate() === day &&
                                  scheduledDate.getMonth() === currentMonth &&
                                  scheduledDate.getFullYear() === currentYear;

                                return (
                                  <div
                                    key={day}
                                    style={{
                                      textAlign: "center",
                                      padding: "8px 0",
                                      color: isSelected ? "white" : "#D0D3DB",
                                      fontSize: "14px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      backgroundColor: isSelected
                                        ? "#01255E"
                                        : "transparent",
                                      transition:
                                        "background-color 0.05s ease, color 0.05s ease",
                                      position: "relative", // For absolute positioning of the underline
                                    }}
                                    data-month="current"
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      // Apply immediate styling to the clicked element
                                      e.currentTarget.style.backgroundColor =
                                        "#01255E";
                                      e.currentTarget.style.color = "white";

                                      handleDateSelection(day, true, e);
                                    }}
                                  >
                                    {day}
                                    {/* Underline indicator for selected date */}
                                    {isSelected && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          bottom: "2px",
                                          left: "50%",
                                          transform: "translateX(-50%)",
                                          width: "24px",
                                          height: "2px",
                                          backgroundColor: "#3E88F7",
                                          borderRadius: "1px",
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              }
                            )}
                            {/* Next month days */}
                            {generateCalendarDays().daysFromNextMonth.map(
                              (day) => {
                                // Check if this day is the selected date (from next month)
                                const nextMonth =
                                  currentMonth === 11 ? 0 : currentMonth + 1;
                                const nextMonthYear =
                                  nextMonth === 0
                                    ? currentYear + 1
                                    : currentYear;
                                const isSelected =
                                  scheduledDate.getDate() === day &&
                                  scheduledDate.getMonth() === nextMonth &&
                                  scheduledDate.getFullYear() === nextMonthYear;

                                return (
                                  <div
                                    key={`next-${day}`}
                                    style={{
                                      textAlign: "center",
                                      padding: "8px 0",
                                      color: isSelected ? "white" : "#676A73",
                                      fontSize: "14px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      backgroundColor: isSelected
                                        ? "#01255E"
                                        : "transparent",
                                      transition:
                                        "background-color 0.05s ease, color 0.05s ease",
                                      position: "relative", // For absolute positioning of the underline
                                    }}
                                    data-month="next"
                                    onClick={(e) => {
                                      e.stopPropagation();

                                      // Apply immediate styling to the clicked element
                                      e.currentTarget.style.backgroundColor =
                                        "#01255E";
                                      e.currentTarget.style.color = "white";

                                      handleDateSelection(day, false, e);
                                    }}
                                  >
                                    {day}
                                    {/* Underline indicator for selected date */}
                                    {isSelected && (
                                      <div
                                        style={{
                                          position: "absolute",
                                          bottom: "2px",
                                          left: "50%",
                                          transform: "translateX(-50%)",
                                          width: "24px",
                                          height: "2px",
                                          backgroundColor: "#3E88F7",
                                          borderRadius: "1px",
                                        }}
                                      />
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Time Field */}
                <div
                  style={{
                    flex: 1,
                    minWidth: "160px", // Ensure sufficient width for the time field
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "8px",
                      fontSize: "14px",
                      color: "#A6A9B2",
                      fontWeight: "500",
                    }}
                  >
                    Time
                  </label>
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#24262E",
                        border: "1px solid transparent",
                        borderRadius: "4px",
                        padding: "10px 12px",
                        cursor: "pointer",
                        color: "white",
                        fontSize: "16px",
                      }}
                    >
                      {" "}
                      <select
                        style={{
                          flex: 1,
                          background: "transparent",
                          border: "none",
                          color: "#D0D3DB",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          appearance: "none",
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0",
                        }}
                        value={scheduledTime}
                        onChange={(e) => setScheduledTime(e.target.value)}
                      >
                        <option value="08:00 AM">08:00 AM</option>
                        <option value="08:30 AM">08:30 AM</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="09:30 AM">09:30 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="10:30 AM">10:30 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="11:30 AM">11:30 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="12:30 PM">12:30 PM</option>
                        <option value="01:00 PM">01:00 PM</option>
                        <option value="01:30 PM">01:30 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="02:30 PM">02:30 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="03:30 PM">03:30 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="04:30 PM">04:30 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                        <option value="05:30 PM">05:30 PM</option>
                        <option value="06:00 PM">06:00 PM</option>
                      </select>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{
                          marginLeft: "8px",
                          pointerEvents: "none",
                        }}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "16px 24px",
                gap: "12px",
                marginTop: "24px",
              }}
            >
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#A6A9B2",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => setScheduleMessageModalOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#01255E",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
                onClick={() => {
                  // Here you would handle the actual scheduling
                  setScheduleMessageModalOpen(false);
                  ToastHandle(
                    `Message scheduled for ${getFormattedDate(
                      scheduledDate
                    )} at ${scheduledTime}`,
                    "success"
                  );
                }}
              >
                Schedule message
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* InboxUpgrade Modal */}
      <InboxUpgrade 
        show={showInboxUpgradeModal} 
        handleClose={() => setShowInboxUpgradeModal(false)} 
      />
    </div>
  );
};

export default MildeSection;
