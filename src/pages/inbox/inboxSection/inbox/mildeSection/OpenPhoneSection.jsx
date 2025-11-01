import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios, { all } from "axios";
import "./index.css";
import "./MildeSection.css";
import OpenPhoneInbox from "./message/OpenPhoneInbox";
import { timeFormat } from "../../../../../helper/commonFun";
import ToastHandle from "../../../../../helper/ToastMessage";
import loaderGif from "../../../../../public/img/new_loader.gif";
import { callSendOpenPhoneMessageApi } from "../../../../../helper/getConversationsTest/inboxApi";
import OpenPhoneLocked from "./openPhoneLocked/OpenPhoneLocked.js";
import avatar01 from "../../../../../public/img/Avatar-01.png";
import avatar02 from "../../../../../public/img/Avatar-02.png";
import avatar03 from "../../../../../public/img/Avatar-03.png";
import avatar04 from "../../../../../public/img/Avatar-04.png";
import avatar05 from "../../../../../public/img/Avatar-05.png";
import avatar06 from "../../../../../public/img/Avatar-06.png";
import avatar07 from "../../../../../public/img/Avatar-07.png";
import avatar08 from "../../../../../public/img/Avatar-08.png";
import avatar09 from "../../../../../public/img/Avatar-09.png";
import avatar10 from "../../../../../public/img/Avatar-10.png";
import avatar11 from "../../../../../public/img/Avatar-11.png";
import avatar12 from "../../../../../public/img/Avatar-12.png";
import avatar13 from "../../../../../public/img/Avatar-13.png";
import avatar14 from "../../../../../public/img/Avatar-14.png";
import avatar15 from "../../../../../public/img/Avatar-15.png";
import avatar16 from "../../../../../public/img/Avatar-16.png";
import MessgFeedBckModel from "../../../../testProperty/banner/messages/messagesFeedBckModel/MessgFeedBckModel";
import JustificationModal from "../../../../testProperty/banner/messages/justificationModal/justificationModal";
import { Tooltip } from "react-tooltip";

// Import the SVG icons
import AiMessageIcon from "./message/icons/ai_messsage_icon.svg";
import ChevDownIcon from "./message/icons/chevDown.svg";

const placeholderImg = "https://hostbuddylb.com/misc/chatBubbles.webp";

const OpenPhoneSection = ({
  allConversationData,
  updateConversationFromApi,
  updateConversationLocal,
  updateSpecificConversation,
  propertyName,
  subscriptionPlan,
}) => {
  const messageListRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
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
  const [hasOpenPhoneIntegration, setHasOpenPhoneIntegration] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [sendOptionsVisible, setSendOptionsVisible] = useState(false);
  const [conversationData, setConversationData] = useState({});
  const [isAtBottom, setIsAtBottom] = useState(true); // Track if user is scrolled to bottom
  const [mobileHeight, setMobileHeight] = useState("100vh"); // Height for mobile chatbot container


  // AI input functionality states
  const [generateButtonIsEnabled, setGenerateButtonIsEnabled] = useState(false);
  const [generateButtonText, setGenerateButtonText] = useState("");
  const [generateButtonJustification, setGenerateButtonJustification] =
    useState("");
  const [showGenerateJustificationButton, setShowGenerateJustificationButton] =
    useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  const [generateOptionsVisible, setGenerateOptionsVisible] = useState(false);
  const [generateCommandApiLoading, setGenerateCommandApiLoading] =
    useState(false);
  const [generateScratchApiLoading, setGenerateScratchApiLoading] =
    useState(false);
  const [assistanceUsed, setAssistanceUsed] = useState(null); // 'command' if the user clicked "generate from command"; 'generate' if the user clicked "generate from scratch"; null if neither, or if the user cleared a generated message


  // Local state for OpenPhone messages with optimistic rendering
  const [openphoneMessages, setOpenPhoneMessages] = useState([]);

  // Extract guest information from conversation data
  const name = allConversationData?.name;
  const isValidName = name && !/^Unknown Contact\s*\(\d+\)/.test(name);

  const guestName =
    allConversationData?.reservation_id
      ? allConversationData?.guest_name || "Guest"
      : allConversationData?.contact_type === "Vendor"
        ? isValidName ? name : "Vendor"
        : allConversationData?.contact_type === "Owner"
          ? isValidName ? name : "Owner"
          : allConversationData?.contact_type === "External Contact"
            ? isValidName ? name : "External Contact"
            : isValidName ? name : "Guest";

  const avatarImages = [
    avatar01, avatar02, avatar03, avatar04,
    avatar05, avatar06, avatar07, avatar08,
    avatar09, avatar10, avatar11, avatar12,
    avatar13, avatar14, avatar15, avatar16
  ];

  const avatarCache = new Map();

  function getRandomAvatar(conversationId) {
    // Add null/undefined check
    if (!conversationId) {
      return avatarImages[0]; // Return default avatar if no conversation ID
    }

    if (!avatarCache.has(conversationId)) {
      // Generate a deterministic index based on the conversationId
      // This ensures the same conversation always gets the same avatar
      const hashCode = conversationId.split('').reduce(
        (acc, char) => (acc * 31 + char.charCodeAt(0)) & 0xffffffff, 0
      );
      const avatarIndex = Math.abs(hashCode) % avatarImages.length;
      avatarCache.set(conversationId, avatarImages[avatarIndex]);
    }

    return avatarCache.get(conversationId);
  }

  const guestImageUrl = !allConversationData?.reservation_id
    ? getRandomAvatar(allConversationData?.conversation_id || "default")
    : allConversationData?.image_url || ""

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
      // Process messages to add rawDate for date separator functionality
      const processedMessages = allConversationData.openphone_messages.map(message => ({
        ...message,
        rawDate: new Date(message.time || message.time_utc)
      }));
      setOpenPhoneMessages(processedMessages);
    } else {
      setOpenPhoneMessages([]);
    }
  }, [allConversationData?.openphone_messages]);

  // Helper functions for date separator (same as MildeSection)
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
  }

  // Process OpenPhone messages to add date formatting
  useEffect(() => {
    if (allConversationData?.openphone_messages) {
      const processedMessages = allConversationData.openphone_messages.map((message) => ({
        ...message,
        rawDate: new Date(message.time || message.time_utc),
        messageDay: formatRelativeDate(message.time || message.time_utc),
      }));
      setOpenPhoneMessages(processedMessages);
    } else {
      setOpenPhoneMessages([]);
    }
  }, [allConversationData?.openphone_messages]);

  const callGenerateFromScratchApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setGenerateScratchApiLoading(true);

    // Create a unique ID for this request
    const requestId = `generate_scratch_${Date.now()}`;
    latestScratchRequestIdRef.current = requestId;
    const conversation_id = allConversationData.conversation_id;

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
    const conversation_id = allConversationData.conversation_id;

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
      messageDay: formatRelativeDate(currentTime.toISOString()),
      text: { text: messageToSend },
      rawDate: currentTime, // Add rawDate for date separator functionality
      timeFormatConvert: timeFormat(currentTime.toISOString()),
      attachments: [],
      sender: "host",
      sendBy: "host",
      read: true,
    };

    // Add the message to the local state for immediate display
    setOpenPhoneMessages(prevMessages => [...prevMessages, optimisticMessage]);
    
    setInputValue("");

    // Add the message to the main conversation state in the parent component
    if (updateConversationLocal) {
      updateConversationLocal(conversation_id, {
        ...optimisticMessage, 
        is_sent_by_you: true,
      },"openphone");
    }

    try {
      const sendMsgResponse = await callSendOpenPhoneMessageApi(
        messageToSend,
        conversation_id,
        reservation_id,
        propertyName,
        assistanceUsed
      );

      if (!("error" in sendMsgResponse)) {
        setInputValue(""); // Clear input field after successful send
        setShowGenerateJustificationButton(false);
        setAssistanceUsed(null);

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
      // Remove the optimistic message and restore input on error
      setOpenPhoneMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== optimisticMessage.id)
      );
      setInputValue(messageToSend); // Restore the message text
      ToastHandle("Error sending OpenPhone message", "danger");
    } finally {
      setSendMessageLoading(false);
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
          const { sender, text, time, attachments, id } = messageList;
          let timeFormatConvert = timeFormat(time);
          return {
            text: messageList !== undefined ? messageList : "",
            sender:
              sender === "host" || sender === "hostbuddy" ? "user" : "bot",
            messageDay: formatRelativeDate(time),
            rawDate: new Date(time), // Store the raw date for comparing
            sendBy: sender,
            id,
            timeFormatConvert,
            attachments,
          };
        });
        setConversationData(allConversationData);
        setMessages(newMessages);
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

  // Render OpenPhoneLocked for pro and mount plans
  if (/pro|mount/i.test(subscriptionPlan)) {
    return <OpenPhoneLocked onComparePlans={() => window.location.href = "/setting/subscription"} />;
  }

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
              {openphoneMessages.map((message, index) => {
              const showDateSeparator =
                index === 0 ||
                !isSameDay(openphoneMessages[index - 1]?.rawDate, message.rawDate);
              return (
              <React.Fragment key={message?.id}>
                {showDateSeparator && (
                  <div className="date-separator">
                    {formatDateForSeparator(message.rawDate)}
                  </div>
                )}
                <OpenPhoneInbox
                  key={message.id}
                  message={message}
                  guestName={guestName}
                  guestImageUrl={guestImageUrl}
                  feedBckModelOpen={feedBckModelOpenHndle}
                  handleJustificationClick={handleJustificationClick}
                  feedBackDataGet={feedBackDataGet}
                  prevMsgText={openphoneMessages[index - 1]?.text}
                />
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

          {/* AI Input Container for OpenPhone */}
          {hasOpenPhoneIntegration && allConversationData?.conversation_id && (
            <div
              className="ai-input"
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                backgroundColor: "#17191F",
                borderTop: `1px solid var(--white-label-border-primary, #24262E)`,
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
                    <path d="M9.85625 0.484375C9.67812 0.184375 9.35 0 9 0C8.65 0 8.32188 0.184375 8.14375 0.484375L5.14375 5.48438C4.95938 5.79375 4.95312 6.17812 5.13125 6.49062C5.30937 6.80312 5.64062 6.99687 6 6.99687H12C12.3594 6.99687 12.6937 6.80312 12.8687 6.49062C13.0437 6.17812 13.0406 5.79375 12.8562 5.48438L9.85625 0.484375ZM9 9.75V14.25C9 14.9406 9.55937 15.5 10.25 15.5H14.75C15.4406 15.5 16 14.9406 16 14.25V9.75C16 9.05937 15.4406 8.5 14.75 8.5H10.25C9.55937 8.5 9 9.05937 9 9.75ZM4 16C5.06087 16 6.07828 15.5786 6.82843 14.8284C7.57857 14.0783 8 13.0609 8 12C8 10.9391 7.57857 9.92172 6.82843 9.17157C6.07828 8.42143 5.06087 8 4 8C2.93913 8 1.92172 8.42143 1.17157 9.17157C0.421427 9.92172 0 10.9391 0 12C0 13.0609 0.421427 14.0783 1.17157 14.8284C1.92172 15.5786 2.93913 16 4 16Z" fill="#F7CFD8" />
                  </g>

                  {/* 8×8 star at top right */}
                  <g transform="translate(44, 6)">
                    <path d="M4 0L4.1362 2.00402C4.20401 3.00171 4.99829 3.79599 5.99598 3.8638L8 4L5.99598 4.1362C4.99829 4.20401 4.20401 4.99829 4.1362 5.99598L4 8L3.8638 5.99598C3.79599 4.99829 3.00171 4.20401 2.00402 4.1362L0 4L2.00402 3.8638C3.00171 3.79599 3.79599 3.00171 3.8638 2.00402L4 0Z" fill="#D37B8F" />
                  </g>

                  {/* 9×9 star at bottom right */}
                  <g transform="translate(46, 44)">
                    <path d="M4.5 0L4.66802 2.4722C4.73583 3.46989 5.53011 4.26417 6.5278 4.33198L9 4.5L6.5278 4.66802C5.53011 4.73583 4.73583 5.53011 4.66802 6.5278L4.5 9L4.33198 6.5278C4.26417 5.53011 3.46989 4.73583 2.4722 4.66802L0 4.5L2.4722 4.33198C3.46989 4.26417 4.26417 3.46989 4.33198 2.4722L4.5 0Z" fill="#D37B8F" />
                  </g>

                  {/* 12×12 star at left side */}
                  <g transform="translate(4, 24)">
                    <path d="M6 0L6.26348 3.87674C6.33129 4.87443 7.12557 5.66871 8.12326 5.73652L12 6L8.12326 6.26348C7.12557 6.33129 6.33129 7.12557 6.26348 8.12326L6 12L5.73652 8.12326C5.66871 7.12557 4.87443 6.33129 3.87674 6.26348L0 6L3.87674 5.73652C4.87443 5.66871 5.66871 4.87443 5.73652 3.87674L6 0Z" fill="#EEBBC7" />
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
                      <path d="M8.49967 5.33334V10.6667M5.83301 8.00001H11.1663M15.1663 8.00001C15.1663 11.6819 12.1816 14.6667 8.49967 14.6667C4.81778 14.6667 1.83301 11.6819 1.83301 8.00001C1.83301 4.31811 4.81778 1.33334 8.49967 1.33334C12.1816 1.33334 15.1663 4.31811 15.1663 8.00001Z" stroke="#74A9F7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
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
              You are connected to OpenPhone! As you message your guests on OpenPhone, you will now see those conversations in the HostBuddy inbox.
            </p>
          )}
        </div>
      )}
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
    </div>
  );
};

export default OpenPhoneSection;