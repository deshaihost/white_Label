import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { callGetSingleConversationApi } from "../../../../../helper/getConversationsTest/inboxApi";
import "./index.css";
import "./LeftMessage.css";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { callGetConversationsApi, callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";
import { BoxLoader } from "../../../../../helper/Loader";
import { TextField } from "./searchComponent/searchInput"; // Import the TextField component
import FilterPop from "./FilterPop/FilterPop"; // Import the FilterPop component
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import { getActiveToken } from "../../../../../helper/apiCore";

import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
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
import PinnedIcon from "./icons/pinned_for_chat.svg"; // Import the pinned icon
import RefreshIcon from "./icons/refresh_for_chat.svg"; // Import the refresh icon
import UrgentFlagIcon from "./icons/urgent_flag_icon.svg"; // Import the urgent flag icon
import AIRBIN_ICON from "./icons/AIRBIN_ICON.svg"; // Import the Airbnb icon
import BOOKING_ICON from "./icons/BOOKING_ICON.svg"; // Import the Booking icon
import VRBO_ICON from "./icons/VRBO_ICON.svg"; // Import the VRBO icon
import DIRECT_ICON from "./icons/DIRECT_ICON.svg"; // Import the Direct icon
import EMAIL_ICON from "./icons/EMAIL_ICON.svg"; // Import the Email icon
import OPENPHONE_ICON from "./icons/openphone_icon.svg"; // Import the OpenPhone icon
import WHATSAPPSUP_ICON from "./icons/WHATSAPPSUP_ICON.svg"; // Import the WhatsApp icon
import { set } from "react-hook-form";

const avatarImages = [
  avatar01, avatar02, avatar03, avatar04,
  avatar05, avatar06, avatar07, avatar08,
  avatar09, avatar10, avatar11, avatar12,
  avatar13, avatar14, avatar15, avatar16
];

const avatarCache = new Map();

function getRandomAvatar(conversationId) {
  // Add safety check for undefined conversationId
  if (!conversationId || typeof conversationId !== 'string') {
    // Return a default avatar if conversationId is invalid
    return avatarImages[0];
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

const LeftMessage = ({
  allPropertyNamesList,
  allGuestNames,
  allExternalContactNumbers,
  allConversations,
  setAllConversations,
  setSelectedConvo,
  fetchConversations,
  userHasPMS,
  urgentFilterIsEnabled,
  setUrgentFilterIsEnabled,
  propertyFilterVal,
  setPropertyFilterVal,
  phaseFilterVal,
  setPhaseFilterVal,
  fromHostBuddyFilterVal,
  setFromHostBuddyFilterVal,
  guestNameSearchVal,
  setGuestNameSearchVal,
  userFilterVal,
  setUserFilterVal,
  setCurrentView,
  currentView,
  setAllowConvIdQuery,
  setUnreadPmsCount,
  setUnreadOpenPhoneCount,
  sidebarClicked,
  sidebarOpen,
  contactType,
}) => {
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [userHasManuallySelected, setUserHasManuallySelected] = useState(false); // Track if user has manually selected a conversation
  const [initialAutoSelectionDone, setInitialAutoSelectionDone] = useState(false); // Track if initial auto-selection has been done
  const [nextBatchLoading, setNextBatchLoading] = useState(false);
  
  // Use ref to track manual selection immediately to prevent race conditions
  const userHasManuallySelectedRef = useRef(false);

  // State declarations that need to be available early
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [filteredGuests, setFilteredGuests] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [guestNameInputVal, setGuestNameInputVal] = useState(""); // currently typed text in the guest name search input

  // Filter modal state
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  // Temporary filter states (for modal)
  const [tempPropertyFilter, setTempPropertyFilter] = useState("");
  const [tempPhaseFilter, setTempPhaseFilter] = useState("");
  const [tempUrgentFilter, setTempUrgentFilter] = useState(false);
  const [tempFromHostBuddyFilter, setTempFromHostBuddyFilter] = useState(false);
  const [tempGuestNameFilter, setTempGuestNameFilter] = useState("");
  const [tempUserFilter, setTempUserFilter] = useState("");

  // User-related state
  const [subUserNames, setSubUserNames] = useState([]);
  const [subUserLoading, setSubUserLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

  const [filterQueryLoading, setFilterQueryLoading] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredGuestsFromSearch, setFilteredGuestsFromSearch] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchDropdownRef = useRef(null);

  // Add phone number search states
  const [filteredContactsFromPhoneSearch, setFilteredContactsFromPhoneSearch] = useState([]);
  const [justSelectedFromPhoneSearch, setJustSelectedFromPhoneSearch] = useState(false);

  // Temporary filter state (not applied until user clicks "Apply")
  // Use the current date for real-time checking
  const currentDate = new Date();
  // Function to check if a date is today - using the proper YYMMDD_HHMMSS format
  const isToday = (dateString) => {
    if (!dateString) return false;

    try {
      // Parse the YYMMDD_HHMMSS format
      // Format example: 250419_120000 (for April 19, 2025 at 12:00:00)
      const year = parseInt("20" + dateString.substring(0, 2)); // Convert YY to YYYY
      const month = parseInt(dateString.substring(2, 4)) - 1; // JS months are 0-indexed
      const day = parseInt(dateString.substring(4, 6));

      const departure = new Date(year, month, day);

      return (
        currentDate.getFullYear() === departure.getFullYear() &&
        currentDate.getMonth() === departure.getMonth() &&
        currentDate.getDate() === departure.getDate()
      );
    } catch (error) {
      console.error("Error comparing dates:", error);
      return false;
    }
  };
  // Function to check if arrival and departure dates are on the same day
  const isSameDay = (arrivalDate, departureDate) => {
    if (!arrivalDate || !departureDate) return false;

    try {
      // Parse the YYMMDD_HHMMSS format
      // Format example: 250419_120000 (for April 19, 2025 at 12:00:00)
      const arrYear = parseInt("20" + arrivalDate.substring(0, 2));
      const arrMonth = parseInt(arrivalDate.substring(2, 4)) - 1;
      const arrDay = parseInt(arrivalDate.substring(4, 6));

      const depYear = parseInt("20" + departureDate.substring(0, 2));
      const depMonth = parseInt(departureDate.substring(2, 4)) - 1;
      const depDay = parseInt(departureDate.substring(4, 6));

      return arrYear === depYear && arrMonth === depMonth && arrDay === depDay;
    } catch (error) {
      console.error("Error comparing dates for same day check:", error);
      return false;
    }
  };

  // Load the next batch of conversations. fetchConversations handles excluding conversations we already have, calling the API, and updating the state
  const loadNextBatch = async () => {
    setAllowConvIdQuery(false); // once the user decides to load more conversations: we cno longer want to regard the conversationId query param, if one was passed
    setNextBatchLoading(true);
    const num_existing_convos = allConversations.length;
    await fetchConversations(
      num_existing_convos + 10,
      false,
      urgentFilterIsEnabled,
      propertyFilterVal,
      phaseFilterVal,
      fromHostBuddyFilterVal,
      guestNameSearchVal,
      false,
      userFilterVal
    );
    setNextBatchLoading(false);
  };

  useEffect(() => {
    if (contactType) {
      // console.log("Contact type changed:", contactType);
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;
      const token = getActiveToken() || localStorage.getItem("authToken");
      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
          "Content-Type": "application/json",
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      const body_data = { 'query_data': { 'conversation_id': selectedConversationId } };
      axios.post(`${baseUrl}/get_all_conversations`, body_data, config);
    }
  }, [contactType]);

  // In the useEffect that processes conversations before display:
useEffect(() => {
  if (searchInputValue.trim() === "") {
    // Sort conversations by timestamp (newest first)
    const sortedConversations = [...allConversations]
      .filter(convo => 
        convo.reservation_id || 
        convo.contact_type === "External Contact" ||
        (!convo.reservation_id && convo.conversation_id?.includes("openphone:") && convo.last_message_time_utc)
      )
      .sort((a, b) => {
        // Sort by timestamp (newest first)
        return getConversationTimestamp(b) - getConversationTimestamp(a);
      });
    
    setFilteredConversations(sortedConversations);
  } else {
    // Filter and sort conversations based on search input
    const inputLower = searchInputValue.toLowerCase();
    const inputClean = searchInputValue.replace(/^\+/, ''); // Remove leading + for phone matching
    
    const filtered = allConversations
      .filter(convo => {
        // Skip OpenPhone conversations that belong to another conversation
  if (convo.conversation_id?.includes("openphone:") && 
      !convo.last_message_time_utc &&
      allConversations.some(c => 
        c.openphone_conversations?.includes(convo.conversation_id))) {
    return false;
  }

        // Guest name matching
        const guestNameMatch = convo.guest_name?.toLowerCase().includes(inputLower);
        
        // Phone number matching
        const phoneFromId = convo.conversation_id?.split(":")[1] || "";
        const phoneMatch = 
          phoneFromId === searchInputValue ||
          phoneFromId === inputClean ||
          phoneFromId.includes(searchInputValue) ||
          phoneFromId.includes(inputClean) ||
          convo.phone_numbers?.some(p => 
            p === searchInputValue || 
            p === inputClean ||
            p.includes(searchInputValue) ||
            p.includes(inputClean)
          );
        
        // Name matching for external contacts
        const nameMatch = convo.name?.toLowerCase().includes(inputLower);
        
        // Conversation ID matching
        const conversationIdMatch = convo.conversation_id?.toLowerCase().includes(inputLower);
        
        return guestNameMatch || phoneMatch || nameMatch || conversationIdMatch;
      })
      .sort((a, b) => {
        return getConversationTimestamp(b) - getConversationTimestamp(a);
      });
    
    setFilteredConversations(filtered);
  }
}, [allConversations, searchInputValue]);

  // When loadNextBatch is defined (i.e. component mount), initialize the event listener that tracks scrolling (so we can load more convos whenever the user scrolls to the bottom)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          // 5px buffer to load just before reaching the bottom
          loadNextBatch();
        }
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadNextBatch]);

  // Mark a conversation as opened, in the state and in the API
  const markConversationAsOpened = (conversationId, propertyName) => {
    // Make sure the conversation isn't already opened
    const conversation = allConversations.find(
      (convo) => convo.conversation_id === conversationId
    );
    if (conversation && conversation.opened) {
      return;
    }

    // If it isn't, mark it opened in the state and call the API
    const updatedConversations = allConversations.map((conversation) => {
      if (conversation.conversation_id === conversationId) {
        conversation.opened = true;
      }
      return conversation;
    });
    setAllConversations(updatedConversations);
    callMarkConversationAsOpenedApi(conversationId, propertyName);
  };

  const getContactTypeDisplayText = (type) => {
    if (type === "Guest") {
      return "Guest";
    } else if (type === "External Contact") {
      return "External Contact"; // Change "External Contact" to "Guest" when contactType === "Guest"
    } else if (type === "Vendor") {
      return "Vendor"; // Change "External Contact" to "Guest" when contactType === "Guest"
    } else if (type === "Owner") {
      return "Owner"; // Change "External Contact" to "Guest" when contactType === "Guest"
    }
    return type;
  };

  // Add this function to the component or to a utility file
const getConversationTimestamp = (conversation) => {
  // First try to use last_message_time_utc if available
  if (conversation.last_message_time_utc) {
    return new Date(conversation.last_message_time_utc).getTime();
  }
  
  // For OpenPhone conversations, check openphone_messages
  if (conversation.openphone_messages && conversation.openphone_messages.length > 0) {
    const messages = [...conversation.openphone_messages].sort((a, b) => {
      return new Date(b.time || b.time_utc || 0) - new Date(a.time || a.time_utc || 0);
    });
    if (messages[0].time || messages[0].time_utc) {
      return new Date(messages[0].time || messages[0].time_utc).getTime();
    }
  }
  
  // For regular messages
  if (conversation.messages && conversation.messages.length > 0) {
    const messages = [...conversation.messages].sort((a, b) => {
      return new Date(b.time || 0) - new Date(a.time || 0);
    });
    if (messages[0].time) {
      return new Date(messages[0].time).getTime();
    }
  }
  
  // Fallback to conversation_start_time or current time
  return conversation.conversation_start_time 
    ? new Date(conversation.conversation_start_time).getTime() 
    : new Date().getTime();
};

  const openConversationHandle = (data, id, isManualSelection = false) => {
  // CRITICAL: If this is a manual selection, immediately set the flag to prevent auto-selection
  if (isManualSelection) {
    userHasManuallySelectedRef.current = true; // Set ref immediately
    setUserHasManuallySelected(true); // Set state for UI
  }
  
  // Enhanced cache-aware conversation selection
  const hasCompleteMessageData =
    data.messages &&
    Array.isArray(data.messages) &&
    data.messages.length > 0 &&
    data.messages.every((msg) => msg.sender && msg.text && msg.time);

  const shouldSkipApiCall = hasCompleteMessageData;

  // First, mark the conversation as read in the local state
  // This is important for UI updates to show correct badge counts
  const updatedData = { ...data };
  
  // Handle different message types
  if (data.conversation_id?.includes("openphone:") || 
      (data.channel && data.channel.toUpperCase().includes("OPENPHONE"))) {
    // Mark OpenPhone messages as read
    if (updatedData.openphone_messages && Array.isArray(updatedData.openphone_messages)) {
      updatedData.openphone_messages = updatedData.openphone_messages.map(msg => ({
        ...msg,
        read: true
      }));
      
      // Update the global OpenPhone unread count
      setUnreadOpenPhoneCount && setUnreadOpenPhoneCount(prevCount => {
        const unreadCount = data.openphone_messages?.filter(msg => !msg.read)?.length || 0;
        return Math.max(0, prevCount - unreadCount);
      });
    }
    
  } else {
    // Handle regular PMS messages
    if (updatedData.messages && Array.isArray(updatedData.messages)) {
      updatedData.messages = updatedData.messages.map(msg => ({
        ...msg,
        read: true
      }));
      
      // Update the global PMS unread count
      setUnreadPmsCount && setUnreadPmsCount(prevCount => {
        const unreadCount = data.messages?.filter(msg => !msg.read)?.length || 0;
        return Math.max(0, prevCount - unreadCount);
      });
    }
  }
  
  // Set as opened in the state (this affects the visual appearance in the list)
  updatedData.opened = true;
  
  setSelectedConvo({
    ...updatedData,
    _apiCallMade: shouldSkipApiCall,
    _has_complete_local_data: hasCompleteMessageData,
  });
  
  setSelectedConversationId(id); // This is used to highlight the selected conversation
  
  markConversationAsOpened(data.conversation_id, data.property_name);

  // On mobile, navigate to messages view
  if (window.innerWidth < 992) {
    setCurrentView("messages");
  }
};
  // Modify the useEffect that auto-selects the first conversation
  useEffect(() => {
    const isMobile = window.innerWidth < 992;
    const conversationsToUse =
      filteredConversations.length > 0
        ? filteredConversations
        : allConversations;

    console.log("🔍 Auto-selection useEffect triggered:", {
      trigger: "useEffect dependency changed",
      isMobile,
      selectedConversationId,
      userHasManuallySelected,
      userHasManuallySelectedRef: userHasManuallySelectedRef.current,
      initialAutoSelectionDone,
      conversationsCount: conversationsToUse.length,
      currentView,
      firstConversation: conversationsToUse[0]?.guest_name || conversationsToUse[0]?.conversation_id,
      conditions: {
        "selectedConversationId === ''": selectedConversationId === "",
        "conversationsToUse.length > 0": conversationsToUse.length > 0,
        "(!isMobile || (currentView !== 'conversations' && currentView !== 'messages'))": (!isMobile || (currentView !== "conversations" && currentView !== "messages")),
        "!userHasManuallySelected": !userHasManuallySelected,
        "!userHasManuallySelectedRef.current": !userHasManuallySelectedRef.current,
        "!initialAutoSelectionDone": !initialAutoSelectionDone
      }
    });

    // MOBILE FIX: Only auto-select on initial load, never after user interaction or API updates
    // Use ref to check manual selection immediately to prevent race conditions
    // On mobile, don't auto-select if we're transitioning to messages view (user likely just selected something)
    const shouldAutoSelect = selectedConversationId === "" &&
      conversationsToUse.length > 0 &&
      (!isMobile || (currentView !== "conversations" && currentView !== "messages")) && // Prevent auto-selection when switching to messages view on mobile
      !userHasManuallySelected &&
      !userHasManuallySelectedRef.current && // Check ref immediately
      !initialAutoSelectionDone;

    console.log("❓ Should auto-select:", shouldAutoSelect);

    if (shouldAutoSelect) {
      console.log("✅ Auto-selecting first conversation:", {
        conversationId: conversationsToUse[0]?.conversation_id,
        guestName: conversationsToUse[0]?.guest_name
      });
      setInitialAutoSelectionDone(true); // Mark that we've done the initial auto-selection
      openConversationHandle(
        conversationsToUse[0],
        conversationsToUse[0]?.conversation_id,
        false // This is auto-selection, not manual
      );
    } else {
      console.log("❌ Auto-selection skipped");
    }
  }, [filteredConversations, allConversations, currentView, userHasManuallySelected, initialAutoSelectionDone, selectedConversationId]);
  // Add the listener for clicking outside the guest search dropdown (so it can be closed)
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleSearchClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleSearchClickOutside);
    };
  }, []);

  const phoneSearchTimeout = useRef(null);

  const handleSearchInputChange = async (e) => {
    const searchVal = e.target.value;
    setSearchInputValue(searchVal);

    const isPhoneSearch = /^\d+$/.test(searchVal.trim());

    // Debounce
    if (phoneSearchTimeout.current) {
      clearTimeout(phoneSearchTimeout.current);
    }

    // ======== IF INPUT CLEARED ========
    if (searchVal.trim() === "") {
    setFilteredGuestsFromSearch([]);
    setFilteredContactsFromPhoneSearch([]);
    
    // Reset the flag when search is cleared
    setJustSelectedFromPhoneSearch(false);
    
    // Reset manual selection flag when search is cleared
    setUserHasManuallySelected(false);
    userHasManuallySelectedRef.current = false; // Reset ref too
    setInitialAutoSelectionDone(false); // Allow auto-selection to work again after search is cleared

    // If there was a guest filter active, clear it and reload all conversations
    if (guestNameSearchVal) {
      setFilterQueryLoading(true);
      setGuestNameSearchVal("");

      try {
        await fetchConversations(
          10,
          true, // replace existing conversations
          urgentFilterIsEnabled, // keep current urgent filter
          propertyFilterVal, // keep current property filter
          phaseFilterVal, // keep current phase filter
          fromHostBuddyFilterVal, // keep current host buddy filter
          "", // clear guest name search
          true, // force refresh
          userFilterVal // keep current user filter
        );
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setFilterQueryLoading(false);
      }
    } else {
      // Remove conversations that were added from phone search (external contacts)
      // Keep only conversations that have reservation_id or don't have the _isCompleteConversation flag
      const originalConversations = allConversations.filter(convo => {
        // Keep conversations that:
        // 1. Have a reservation_id (these are original PMS conversations)
        // 2. Don't have the _isCompleteConversation flag (these weren't added via phone search)
        return convo.reservation_id || !convo._isCompleteConversation || convo.contact_type === "External Contact";
      });

      // Re-fetch fresh conversations to restore original order
      setFilterQueryLoading(true);
      try {
        await fetchConversations(
          10,
          true, // replace existing conversations
          urgentFilterIsEnabled,
          propertyFilterVal,
          phaseFilterVal,
          fromHostBuddyFilterVal,
          "",
          true, // force refresh
          userFilterVal
        );
      } catch (error) {
        console.error("Error fetching conversations:", error);
        // Fallback to filtered original conversations if API call fails
        setAllConversations(originalConversations);
        setFilteredConversations(originalConversations);
      } finally {
        setFilterQueryLoading(false);
      }
    }
    return; // Early return to avoid running other search logic
  }

    // ======== PHONE NUMBER SEARCH (Guest-like Logic) ========
    if (isPhoneSearch && allExternalContactNumbers && allExternalContactNumbers?.length > 0) {
      const digitSearch = searchVal.replace(/\D/g, "");

      // Filter phone contacts by last 4 or full digits
      const filteredContacts = allExternalContactNumbers.filter((contact) =>
        contact.searchable.includes(digitSearch) || contact.searchable.endsWith(digitSearch)
      );
      setFilteredGuestsFromSearch([]); // Clear guest name dropdown
      setFilteredContactsFromPhoneSearch(filteredContacts); // Show in phone dropdown

      // console.log("Filtered conversations from phone search:", allConversations);
    }

    // ======== GUEST NAME SEARCH LOGIC ========
    else if (!isPhoneSearch && allGuestNames && allGuestNames.length > 0) {
      const searchValLower = searchVal.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filteredGuests = allGuestNames.filter(
        (guest) =>
          guest.searchable.startsWith(searchValLower) ||
          guest.name.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredGuestsFromSearch(filteredGuests);
      setFilteredContactsFromPhoneSearch([]);

      // Filter conversation tiles with improved OpenPhone filtering
      const guestFiltered = allConversations.filter(
        (convo) => {
          // First check if this is a linked OpenPhone conversation that shouldn't be displayed separately
          if (convo.conversation_id?.includes("openphone:") &&
              !convo.last_message_time_utc &&
              allConversations.some(c =>
                c.openphone_conversations?.includes(convo.conversation_id))) {
            return false;
          }
          
          // Then check if guest name matches search term
          return convo.guest_name &&
            convo.guest_name.toLowerCase().includes(searchVal.toLowerCase());
        }
      );
      setFilteredConversations(guestFiltered);
    }
  };
                
  useEffect(() => {
    // console.log("Input value changed:", searchInputValue);
    // If we just selected from phone search, don't filter anything - keep the selected conversation
    if (justSelectedFromPhoneSearch) {
      // console.log("Just selected from phone search, keeping current filtered conversations", setSearchInputValue);
      return; // Don't change justSelectedFromPhoneSearch here
    }

    if (searchInputValue.trim() === "") {
      // Apply the OpenPhone filter even when showing all conversations
      const filteredResults = allConversations.filter(convo => {
        // Skip OpenPhone conversations that belong to another conversation
        if (convo.conversation_id?.includes("openphone:") && 
            !convo.last_message_time_utc &&
            allConversations.some(c => 
              c.openphone_conversations?.includes(convo.conversation_id))) {
          return false;
        }
        return true;
      });
      setFilteredConversations(filteredResults);
    } else {
      const inputLower = searchInputValue.toLowerCase();
      const inputClean = searchInputValue.replace(/^\+/, ''); // Remove leading + for phone matching

      // console.log("All conversations for filtering:", allConversations);

      const filtered = allConversations.filter((convo) => {
        // Skip OpenPhone conversations that belong to another conversation
        if (convo.conversation_id?.includes("openphone:") && 
            !convo.last_message_time_utc &&
            allConversations.some(c => 
              c.openphone_conversations?.includes(convo.conversation_id))) {
          return false;
        }

        // Guest name matching
        const guestNameMatch = convo.guest_name?.toLowerCase().includes(inputLower);

        // Enhanced phone number matching
        const phoneFromId = convo.conversation_id?.split(":")[1] || "";
        const phoneMatch =
          phoneFromId === searchInputValue || // Exact match with +
          phoneFromId === inputClean || // Exact match without +
          phoneFromId.includes(searchInputValue) || // Contains with +
          phoneFromId.includes(inputClean) || // Contains without +
          convo.phone_numbers?.some(p =>
            p === searchInputValue ||
            p === inputClean ||
            p.includes(searchInputValue) ||
            p.includes(inputClean)
          ) ||
          convo.whatsapp_numbers?.some(p =>
            p === searchInputValue ||
            p === inputClean ||
            p.includes(searchInputValue) ||
            p.includes(inputClean)
          );

        // Name matching for external contacts
        const nameMatch = convo.name?.toLowerCase().includes(inputLower);

        // Conversation ID matching (for openphone: or whatsapp: prefixed IDs)
        const conversationIdMatch = convo.conversation_id?.toLowerCase().includes(inputLower) ||
          convo.conversation_id?.includes(searchInputValue);

        const matched = guestNameMatch || phoneMatch || nameMatch || conversationIdMatch;

        if (searchInputValue.trim()) {
          // console.log(`Conversation ${convo.conversation_id} matched: ${matched}`, {
          //   guestNameMatch, phoneMatch, nameMatch, conversationIdMatch,
          //   searchInputValue, inputLower, inputClean, phoneFromId
          // });
        }

        return matched;
      });

      // console.log("Filtered conversations based on search input:", filtered);
      setFilteredConversations(filtered);
    }
  }, [allConversations, searchInputValue, justSelectedFromPhoneSearch]);

  const handleContactSelectFromPhoneSearch = async (contact) => {
    // console.log("Selected contact:", contact);
    setFilteredContactsFromPhoneSearch([]);
    setFilteredGuestsFromSearch([]);

    try {
      // Fetch the conversation from the API
      const apiResult = await callGetSingleConversationApi(contact.conversation_id);
      // console.log("API result for phone contact:", apiResult);

      const conversation =
        apiResult?.conversations && apiResult.conversations.length > 0
          ? apiResult.conversations[0]
          : null;

      // Extract phone number from conversation ID for search input
      const phoneNumber = contact.conversation_id.includes(":")
        ? contact.conversation_id.split(":")[1]
        : contact.conversation_id;

      if (conversation) {
        // console.log("Found conversation:", conversation);

        // Mark this conversation as complete to identify it later
        conversation._isCompleteConversation = true;

        // CRITICAL: Set the flag BEFORE any state updates
        setJustSelectedFromPhoneSearch(true);

        // Set search input to the phone number (don't clear it)
        setSearchInputValue(phoneNumber);
        
        // Add to allConversations if it doesn't exist
        let updatedConversations = [...allConversations];
        const existingIndex = updatedConversations.findIndex(
          c => c.conversation_id === conversation.conversation_id
        );
        
        if (existingIndex === -1) {
          // Add to the beginning if it doesn't exist
          updatedConversations = [conversation, ...updatedConversations];
          setAllConversations(updatedConversations);
        } else {
          // Update existing conversation with latest data
          updatedConversations[existingIndex] = {
            ...updatedConversations[existingIndex],
            ...conversation,
            _isCompleteConversation: true
          };
          setAllConversations(updatedConversations);
        }
        
        // Always set filtered conversations explicitly to make sure the tile appears
        setFilteredConversations([conversation]);
        
        // console.log("Set filtered conversations to:", [conversation]);
        // console.log("Updated all conversations:", updatedConversations);

        // Open the conversation
        // openConversationHandle(conversation, conversation.conversation_id);
        
      } else {
        // console.log("No conversation found for contact");
        setSearchInputValue(phoneNumber);
        setFilteredConversations([]);
      }
    } catch (error) {
      console.error("Error fetching phone contact conversation:", error);
      setFilteredConversations([]);
    } finally {
      // Reset the flag after a short delay to allow useEffect to process
      setTimeout(() => {
        setJustSelectedFromPhoneSearch(false);
      }, 500);
      setFilterQueryLoading(false);
    }
  };

  const handleGuestSelectFromSearch = async (guest) => {
    // Start loading state
    setFilterQueryLoading(true);
    
    // Reset manual selection flag when guest search is used
    setUserHasManuallySelected(false);
    userHasManuallySelectedRef.current = false; // Reset ref too
    setInitialAutoSelectionDone(false); // Allow auto-selection to work again after guest search
    
    // Clear guest search results dropdown
    setFilteredGuestsFromSearch([]);
    
    // Set search input to show the selected guest name
    setSearchInputValue(guest.name);
    
    // Update filters: set guest name filter and clear all other filters
    setGuestNameSearchVal(guest.name);
    setPropertyFilterVal("");
    setPhaseFilterVal("");
    setUrgentFilterIsEnabled(false);
    setFromHostBuddyFilterVal(false);
    setUserFilterVal("");

    // Fetch conversations based on guest name
    await fetchConversations(
      10,
      true, // replace existing conversations
      false, // urgent filter off
      "", // property filter cleared
      "", // phase filter cleared
      false, // from hostbuddy filter off
      guest.name, // search by guest name
      true, // force refresh
      "" // user filter cleared
    );
    
    // Apply additional filtering to exclude OpenPhone conversations that are linked to other conversations
    const filteredResults = allConversations.filter(convo => {
      // Skip OpenPhone conversations that belong to another conversation
      if (convo.conversation_id?.includes("openphone:") && 
          allConversations.some(c => 
            c.openphone_conversations?.includes(convo.conversation_id))) {
        return false;
      }
      return true;
    });
    
    // Update the displayed conversations
    setFilteredConversations(filteredResults);
    
    // End loading state
    setFilterQueryLoading(false);
  };

  const handleSearchClickOutside = (event) => {
    if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target)
    ) {
      setFilteredGuestsFromSearch([]);
      setFilteredContactsFromPhoneSearch([]); // Also clear phone search results
    }
  };

  const handlePropertyFilterChange = (e) => {
    // Store selected value in temporary state without applying filter
    setTempPropertyFilter(e.target.value);
  };

  const handleUrgentClick = () => {
    // Toggle urgent filter in temporary state without applying
    setTempUrgentFilter(!tempUrgentFilter);
  };
  const handleFromHostBuddyClick = () => {
    // Toggle FromHostBuddy filter in temporary state without applying
    setTempFromHostBuddyFilter(!tempFromHostBuddyFilter);
  };

  const handleUserFilterChange = (e) => {
    // Store selected user in temporary state without applying filter
    setTempUserFilter(e.target.value);
  };
  const handlePhaseFilterChange = (e) => {
    // Store selected phase in temporary state without applying filter
    setTempPhaseFilter(e.target.value);
  };

  // Fetch sub user names from API
  const fetchSubUserNames = async () => {
    // If data was already fetched, don't fetch again
    if (dataFetched && subUserNames.length > 0) return;

    setSubUserLoading(true);
    try {
      const baseUrl = process.env.REACT_APP_API_ENDPOINT;
      const API_KEY = process.env.REACT_APP_API_KEY;

      // Get token from the apiCore's active token or fall back to localStorage
      const token = getActiveToken() || localStorage.getItem("authToken");

      const config = {
        headers: {
          "X-API-Key": API_KEY,
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      const response = await axios.get(`${baseUrl}/get_sub_user_names`, config);

      if (response.status === 200) {
        setSubUserNames(response.data.sub_user_names || []);
        setDataFetched(true); // Mark data as fetched
      } else {
        ToastHandle(
          response?.data?.error || "Failed to fetch user names",
          "danger"
        );
      }
    } catch (error) {
      ToastHandle("Error fetching user names", "danger");
    } finally {
      setSubUserLoading(false);
    }
  };
  const handleResetFilters = async () => {
    // Reset all temporary filters to default values
    setTempPropertyFilter("");
    setTempPhaseFilter("");
    setTempUrgentFilter(false);
    setTempFromHostBuddyFilter(false);
    setTempGuestNameFilter("");
    setTempUserFilter("");

    // Also immediately apply the reset by clearing actual filter states
    setFilterQueryLoading(true);
    
    // Reset manual selection flag when filters are reset
    setUserHasManuallySelected(false);
    userHasManuallySelectedRef.current = false; // Reset ref too
    setInitialAutoSelectionDone(false); // Allow auto-selection to work again after filters reset

    // Clear the actual filter states
    setPropertyFilterVal("");
    setPhaseFilterVal("");
    setUrgentFilterIsEnabled(false);
    setFromHostBuddyFilterVal(false);
    setGuestNameSearchVal("");
    setUserFilterVal("");
    setSearchInputValue("");

    // Fetch conversations with all filters cleared
    await fetchConversations(10, true, false, "", "", false, "", true, "");

    setFilterQueryLoading(false);

    // Close the modal after reset
    setFilterModalOpen(false);
  };
  const handleApplyFilters = async () => {
    // Only fetch if filters have changed
    if (
      tempPropertyFilter !== propertyFilterVal ||
      tempPhaseFilter !== phaseFilterVal ||
      tempUrgentFilter !== urgentFilterIsEnabled ||
      tempFromHostBuddyFilter !== fromHostBuddyFilterVal ||
      tempGuestNameFilter !== guestNameSearchVal ||
      tempUserFilter !== userFilterVal
    ) {
      setFilterQueryLoading(true);
      
      // Reset manual selection flag when filters are applied
      setUserHasManuallySelected(false);
      userHasManuallySelectedRef.current = false; // Reset ref too
      setInitialAutoSelectionDone(false); // Allow auto-selection to work again after filters applied

      // Update the actual filter states with temporary values
      setPropertyFilterVal(tempPropertyFilter);
      setPhaseFilterVal(tempPhaseFilter);
      setUrgentFilterIsEnabled(tempUrgentFilter);
      setFromHostBuddyFilterVal(tempFromHostBuddyFilter);
      setGuestNameSearchVal(tempGuestNameFilter);
      setUserFilterVal(tempUserFilter);

      // Apply filters by fetching filtered conversations
      await fetchConversations(
        10,
        true,
        tempUrgentFilter,
        tempPropertyFilter,
        tempPhaseFilter,
        tempFromHostBuddyFilter,
        tempGuestNameFilter,
        true,
        tempUserFilter
      );

      setFilterQueryLoading(false);
    }
    // Close the modal
    setFilterModalOpen(false);
  };

  const handleCancelFilters = () => {
    // Discard temporary changes by not applying them
    setFilterModalOpen(false);
  };
  const openFilterModal = () => {
    // Initialize temporary filters with current values
    setTempPropertyFilter(propertyFilterVal);
    setTempPhaseFilter(phaseFilterVal);
    setTempUrgentFilter(urgentFilterIsEnabled);
    setTempFromHostBuddyFilter(fromHostBuddyFilterVal);
    setTempGuestNameFilter(guestNameSearchVal);
    setTempUserFilter(userFilterVal);
    setFilterModalOpen(true);
  };

  const handleGuestSearchChange = async (e) => {
    const searchVal = e.target.value;
    setGuestNameInputVal(searchVal);

    if (searchVal) {
      const searchValLower = searchVal.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filtered = allGuestNames.filter((guest) =>
        guest.searchable.startsWith(searchValLower)
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests([]);
      if (guestNameSearchVal) {
        setGuestNameSearchVal("");
        setFilterQueryLoading(true);
        await fetchConversations(10, true, false, "", "", false, "", true, "");
        setFilterQueryLoading(false);
      }
    }
  };

  const handleGuestClick = async (guest) => {
    setFilterQueryLoading(true);
    setFilteredGuests([]);
    setGuestNameSearchVal(guest.name); // Clear all other filters. Guest name search overrides everything
    setPropertyFilterVal("");
    setPhaseFilterVal("");
    setUrgentFilterIsEnabled(false);
    setFromHostBuddyFilterVal(false);

    await fetchConversations(
      10,
      true,
      false,
      "",
      "",
      false,
      guest.name,
      true,
      ""
    );

    setFilterQueryLoading(false);
  };

  const handleClickOutside = (event) => {
    // Close the dropdown if the user clicks outside of it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredGuests([]);
    }
  };
  return (
    <div
      className="left-bar"
      style={{
        height: "100%",
        border: "1px solid",
        borderColor: `var(--white-label-border-primary, #24262E)`,
        backgroundColor: "#17191F",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="message-filter"
        style={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0, // Prevent this from shrinking
        }}
      >
        <div
          style={{
            fontWeight: "700",
            fontSize: "24px",
            color: "white",
            marginLeft: "5px",
            marginBottom: "3px",
            fontFamily: "Poppins-Bold, Helvetica",
            lineHeight: "33.6px",
          }}
        >
          Inbox
        </div>{" "}
        <div
          className="messsage-search"
          style={{ display: "flex", width: "96%", marginLeft: "5px" }}
        >
          <div
            className="search-container"
            style={{ position: "relative", flex: 1 }}
            ref={searchDropdownRef}
          >
            <TextField
              className="custom-padding"
              type="search"
              placeholder="Search by guest name or phone number..."
              style={{
                width: "100%",
                borderRadius: "4px",
                backgroundColor: "#24262E",
                border: searchFocused
                  ? "2px solid rgba(62, 136, 247, 1)"
                  : "1px solid rgba(189, 193, 201, 0.15)",
                height: "32px",
              }}
              onChange={handleSearchInputChange}
              value={searchInputValue}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />

            {/* Guest search dropdown */}
            {filteredGuestsFromSearch.length > 0 && searchInputValue.trim() && (
              <div
                className="dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "#24262E",
                  border: "1px solid rgba(189, 193, 201, 0.15)",
                  borderRadius: "4px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  zIndex: 1000,
                  marginTop: "2px",
                }}
              >
                {filteredGuestsFromSearch.map((guest) => (
                  <div
                    key={guest?.id_for_react}
                    className="dropdown-item"
                    onClick={() => handleGuestSelectFromSearch(guest)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      color: "#fff",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(1, 50, 128, 1)";

                        const indicator = document.createElement("div");
                        indicator.className = "dropdown-section-indicator";
                        indicator.style.position = "absolute";
                        indicator.style.left = "0";
                        indicator.style.top = "50%";
                        indicator.style.transform = "translateY(-50%)";
                        indicator.style.height = "50px";
                        indicator.style.width = "3px";
                        indicator.style.backgroundColor =
                          "rgba(62, 136, 247, 1)";
                        indicator.style.borderRadius = "0 2px 2px 0";

                        const existingIndicator = e.currentTarget.querySelector(
                          ".dropdown-section-indicator"
                        );
                        if (existingIndicator) {
                          e.currentTarget.removeChild(existingIndicator);
                        }

                        e.currentTarget.appendChild(indicator);
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";

                      const indicator = e.currentTarget.querySelector(
                        ".dropdown-section-indicator"
                      );
                      if (indicator) {
                        e.currentTarget.removeChild(indicator);
                      }
                    }}
                    onMouseDown={(e) => {
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(0, 19, 48, 1)";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(1, 50, 128, 1)";
                      }
                    }}
                  >
                    <div
                      className="guest-name"
                      style={{
                        fontSize: "14px",
                        color: "#D0D3DB",
                        fontWeight: "400",
                      }}
                    >
                      {guest.name}
                    </div>
                    <div
                      className="guest-property"
                      style={{
                        fontSize: "14px",
                        color: "#D0D3DB",
                        fontWeight: "400",
                      }}
                    >
                      {guest.property}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Phone search dropdown */}
            {filteredContactsFromPhoneSearch.length > 0 && searchInputValue.trim() && (
              <div
                className="dropdown"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: "#24262E",
                  border: "1px solid rgba(189, 193, 201, 0.15)",
                  borderRadius: "4px",
                  maxHeight: "200px",
                  overflowY: "auto",
                  zIndex: 1000,
                  marginTop: "2px",
                }}
              >
                {filteredContactsFromPhoneSearch.map((contact) => (
                  <div
                    key={contact?.id_for_react}
                    className="dropdown-item"
                    onClick={() => handleContactSelectFromPhoneSearch(contact)}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      color: "#fff",
                      position: "relative",
                    }}
                    onMouseEnter={(e) => {
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(1, 50, 128, 1)";

                        const indicator = document.createElement("div");
                        indicator.className = "dropdown-section-indicator";
                        indicator.style.position = "absolute";
                        indicator.style.left = "0";
                        indicator.style.top = "50%";
                        indicator.style.transform = "translateY(-50%)";
                        indicator.style.height = "50px";
                        indicator.style.width = "3px";
                        indicator.style.backgroundColor =
                          "rgba(62, 136, 247, 1)";
                        indicator.style.borderRadius = "0 2px 2px 0";

                        const existingIndicator = e.currentTarget.querySelector(
                          ".dropdown-section-indicator"
                        );
                        if (existingIndicator) {
                          e.currentTarget.removeChild(existingIndicator);
                        }

                        e.currentTarget.appendChild(indicator);
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";

                      const indicator = e.currentTarget.querySelector(
                        ".dropdown-section-indicator"
                      );
                      if (indicator) {
                        e.currentTarget.removeChild(indicator);
                      }
                    }}
                    onMouseDown={(e) => {
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(0, 19, 48, 1)";
                      }
                    }}
                    onMouseUp={(e) => {
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(1, 50, 128, 1)";
                      }
                    }}
                  >
                    <div
                      className="contact-name"
                      style={{
                        fontSize: "14px",
                        color: "#D0D3DB",
                        fontWeight: "400",
                      }}
                    >
                      {contact.name || contact.guest_name || "Unknown Contact"}
                    </div>
                    <div
                      className="contact-phone"
                      style={{
                        fontSize: "14px",
                        color: "#D0D3DB",
                        fontWeight: "400",
                      }}
                    >
                      {/* Extract phone from conversation ID or phone_numbers/whatsapp_numbers */}
                      {(() => {
                        if (contact.whatsapp_numbers && contact.whatsapp_numbers.length > 0) {
                          return `${contact.whatsapp_numbers[0]}`;
                        }
                        if (contact.phone_numbers && contact.phone_numbers.length > 0) {
                          return `${contact.phone_numbers[0]}`;
                        }
                        if (contact.conversation_id && contact.conversation_id.includes(":")) {
                          return contact.conversation_id.split(":")[1];
                        }
                      })()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            className="filters-button"
            onClick={openFilterModal}
            style={{
              whiteSpace: "nowrap",
              backgroundColor: "#0B5ED7",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <i className="bi bi-filter" style={{ marginRight: "4px" }}></i>
            Filters
          </button>{" "}
        </div>
      </div>
      <FilterPop
        show={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        allPropertyNamesList={allPropertyNamesList}
        tempPropertyFilter={tempPropertyFilter}
        tempPhaseFilter={tempPhaseFilter}
        tempUrgentFilter={tempUrgentFilter}
        tempFromHostBuddyFilter={tempFromHostBuddyFilter}
        tempUserFilter={tempUserFilter}
        subUserNames={subUserNames}
        subUserLoading={subUserLoading}
        fetchSubUserNames={fetchSubUserNames}
        handlePropertyFilterChange={handlePropertyFilterChange}
        handlePhaseFilterChange={handlePhaseFilterChange}
        handleUrgentClick={handleUrgentClick}
        handleFromHostBuddyClick={handleFromHostBuddyClick}
        handleUserFilterChange={handleUserFilterChange}
        handleResetFilters={handleResetFilters}
        handleCancelFilters={handleCancelFilters}
        handleApplyFilters={handleApplyFilters}
      />{" "}
      {filterQueryLoading ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <BoxLoader />
        </div>
      ) : filteredConversations && filteredConversations.length ? (
        <div
          className={`left-bar-chat`}
          ref={containerRef}
          style={{
            flex: 1,
            overflowY: "auto",
            position: "relative",
          }}
        >
          <div style={{ border: `1px solid var(--white-label-border-primary, #24262E)`, position: "relative" }}>
            {filteredConversations.map((message) => {
              // console.log("Rendering message:", message);
              const {
                property_name,
                guest_name,
                arrival_date,
                departure_date,
                opened,
                conversation_id,
                image_url,
                channel,
                action_items,
                user,
                status,
                pinned,
              } = message;
              const allDataForConversation = message;
              const messages = message?.messages; // Assuming message?.messages is an array
              const lastValue =
                messages && messages.length > 0
                  ? messages[messages.length - 1]
                  : null;
              const { sender, text: messageText, time } = lastValue || {
                sender: "",
                text: "",
                time: "",
              };
              // Fix the text extraction
              let shortenedText = "";
              let messageTime = time;
              if (messageText) {
                shortenedText = messageText.length > 50 ? messageText.slice(0, 50) + "..." : messageText;
              } else if (message.openphone_messages && message.openphone_messages.length > 0) {
                // Special handling for OpenPhone messages
                const lastOpenPhoneMessage = message.openphone_messages[message.openphone_messages.length - 1];
                shortenedText = lastOpenPhoneMessage.text;
                if (shortenedText && shortenedText.length > 50) {
                  shortenedText = shortenedText.slice(0, 50) + "...";
                }

                // Extract time from OpenPhone message
                messageTime = lastOpenPhoneMessage.time || lastOpenPhoneMessage.time_utc || time;
              } else if (message.whatsapp_messages && message.whatsapp_messages.length > 0) {
                const lastWhatsAppMessage = message.whatsapp_messages[message.whatsapp_messages.length - 1];
                shortenedText = lastWhatsAppMessage.text;
                if (shortenedText && shortenedText.length > 50) {
                  shortenedText = shortenedText.slice(0, 50) + "...";
                }

                // Extract time from WhatsApp message
                messageTime = lastWhatsAppMessage.time || lastWhatsAppMessage.time_utc || time;
              }

              // Based on which of these fields are present (arrival_date, departure_date, property_name): render the appropriate string
              let datesAndPropertyNameDisplay = "";
              const reservationDateRange = formatDateRange(
                arrival_date,
                departure_date
              );
              if (reservationDateRange && property_name) {
                datesAndPropertyNameDisplay = `${reservationDateRange} | ${property_name}`;
              } else if (reservationDateRange) {
                datesAndPropertyNameDisplay = reservationDateRange;
              } else if (property_name) {
                datesAndPropertyNameDisplay = property_name;
              } else {
                datesAndPropertyNameDisplay = "";
              }
              return (
                <React.Fragment key={conversation_id}>
                  <div
                    className={`conversation-item ${conversation_id === selectedConversationId
                      ? "bg-dark"
                      : ""
                      } left-inner-tab`}
                    onClick={() => {
                      openConversationHandle(
                        allDataForConversation,
                        conversation_id,
                        true // This is a manual selection by the user
                      );
                    }}
                  >
                    {conversation_id === selectedConversationId && (
                      <div className="sectionIndicatorBox">
                        <div className="selection-indicator"></div>
                      </div>
                    )}
                    <div className="left-bar-container">
                      <div
                        className="image-container"
                        style={{ position: "relative" }}
                      >
                        <img
                          src={
                            !message.reservation_id
                              ? getRandomAvatar(message.conversation_id || `temp_${Math.random()}`)
                              : message.image_url || dummyPropertyImg
                          }
                          alt="Thumbnail"
                          className="property-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = dummyPropertyImg;
                          }}
                        />{" "}
                        {/* Pin badge for pinned conversations */}
                        {(allDataForConversation.pinned ||
                          allDataForConversation.is_pinned) && (
                            <div
                              style={{
                                position: "absolute",
                                top: "5px",
                                left: "5px",
                                minWidth: "24px",
                                minHeight: "24px",
                                width: "24px",
                                height: "24px",
                                backgroundColor: "#F26C0C",
                                borderRadius: "50%",
                                border: "2px solid #17191f",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                zIndex: 1,
                                transform: "translate(-30%, -30%)",
                                overflow: "hidden",
                              }}
                            >
                              <img
                                src={PinnedIcon}
                                alt="Pinned"
                                style={{
                                  maxWidth: "14px",
                                  maxHeight: "14px",
                                  width: "12px",
                                  height: "12px",
                                  objectFit: "contain",
                                  display: "block",
                                  margin: "0 auto",
                                }}
                              />
                            </div>
                          )}{" "}
                        {/* Refresh icon for same-day arrival/departure */}
                        {isSameDay(arrival_date, departure_date) && (
                          <div
                            style={{
                              position: "absolute",
                              top: "6px",
                              left:
                                allDataForConversation.pinned ||
                                  allDataForConversation.is_pinned
                                  ? "24px"
                                  : "6px",
                              minWidth: "24px",
                              minHeight: "24px",
                              width: "24px",
                              height: "24px",
                              backgroundColor: "#1EC7C7",
                              borderRadius: "50%",
                              border: "2px solid #17191f",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              zIndex: 1,
                              transform: "translate(-30%, -30%)",
                              overflow: "hidden",
                            }}
                          >
                            <img
                              src={RefreshIcon}
                              alt="Same-day stay"
                              style={{
                                maxWidth: "14px",
                                maxHeight: "14px",
                                width: "12px",
                                height: "12px",
                                objectFit: "contain",
                                display: "block",
                                margin: "0 auto",
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="content-container">
                        {/* First line: Guest name and time format */}{" "}
                        <div className="description-container description-item">
                          <h2 className="guest-name">
                            {channel !== "hostbuddy"
                              ? !message.reservation_id
                                ? (message?.name) ? (message.name) : "Unknown Contact"
                                : guest_name
                              : "Chat Window"}
                          </h2>{" "}
                          <div className="date date-no-margin">
                            {messageTime ? timeFormat(messageTime) : ""}
                          </div>
                        </div>                        {/* Second line: Message text and count of unread messages */}
                        <div className="message-container short-des">
                          <div
                            className="message-text"
                            style={{
                              fontWeight: !opened ? 600 : 400,
                            }}
                          >
                            {shortenedText}
                          </div>
                          {!opened && (
                            <span className="message-counter">
                              {message.conversation_id?.includes("openphone:") || 
       (channel && channel.toUpperCase().includes("OPENPHONE")) 
        ? (message.openphone_messages && 
           message.openphone_messages.filter(msg => !msg.read).length) || 1
        : (messages &&
           messages.filter((msg) => !msg.read).length) || 1}
                            </span>
                          )}
                        </div>
                        {/* Third line: Reservation date and property address */}
                        <div className="reservation-info">
                          <div>
                            {/* Reservation date range */}
                            {arrival_date && departure_date && (
                              <span>
                                {formatDateRange(
                                  arrival_date,
                                  departure_date,
                                  false
                                )}
                              </span>
                            )}
                          </div>
                          <div>
                            {/* Property address/name */}
                            {property_name && <span>{property_name}</span>}
                          </div>
                        </div>
                        {/* Fourth line: User and status indicators */}
                        <div
                          className="status-container"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {/* User from line 324 */}
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "4px",
                              }}
                            >
                              <span className="user-badge ">
                                {
                                  // Always show contact type labels, not guest names
                                  message.contact_type === "Vendor"
                                    ? "Vendor"
                                    : message.contact_type === "Owner"
                                      ? "Owner"
                                      : message.contact_type === "External Contact"
                                        ? "External Contact"
                                        : message.contact_type
                                          ? message.contact_type
                                          : !message.reservation_id
                                            ? "External Contact"
                                            : user
                                              ? user
                                                .split(" ")
                                                .map(
                                                  (word) =>
                                                    word.charAt(0).toUpperCase() +
                                                    word.slice(1).toLowerCase()
                                                )
                                                .join(" ")
                                              : sender
                                                ? sender
                                                  .split(" ")
                                                  .map(
                                                    (word) =>
                                                      word.charAt(0).toUpperCase() +
                                                      word.slice(1).toLowerCase()
                                                  )
                                                  .join(" ")
                                                : "Guest"
                                }
                              </span>
                              {(() => {
                                let hasActionItems = action_items && action_items.length > 0;
                                const isExternalContact = message.contact_type === "External Contact";
                                if (!message.reservation_id) {
                                  hasActionItems = false; // No action items for non-reservation messages
                                }

                                return (hasActionItems || isExternalContact);
                              })() && (
                                  /* Replaced text with icon */
                                  <span
                                    className="urgent-badge"
                                    style={{
                                      backgroundColor: "#4D2100",
                                      borderRadius: "2px",
                                      height: "20px",
                                      width: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={UrgentFlagIcon}
                                      alt="Urgent"
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </span>
                                )}
                            </div>
                            {/* Display status badges - commented out */}
                            {/* {status === 'future' && 
                              <span className="future-badge">
                                future
                              </span>
                            }
                            {status === 'current' && 
                              <span className="current-badge">
                                current
                              </span>
                            }
                            {status === 'inquiry' && 
                              <span className="inquiry-badge">
                                inquiry
                              </span>
                            } */}
                          </div>
                          <div
                            className="status-indicators"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            {/* Status indicators with updated logic */}

                            {status === "inquiry" ? (
                              <span className="inquiry-badge">Inquiry</span>
                            ) : (
                              <>
                                {isToday(departure_date) && (
                                  <span className="checkout-badge">
                                    Check-out today
                                  </span>
                                )}
                                {isToday(arrival_date) && (
                                  <span className="checkin-badge">
                                    Check-in today
                                  </span>
                                )}
                                {/* Show status badges only if not check-in/check-out today */}
                                {!isToday(departure_date) &&
                                  !isToday(arrival_date) && (
                                    <>
                                      {status === "future" && (
                                        <span className="future-badge">
                                          Future
                                        </span>
                                      )}
                                      {status === "current" && (
                                        <span className="current-badge">
                                          Current
                                        </span>
                                      )}
                                      {status === "past" && (
                                        <span className="inquiry-badge">
                                          Past
                                        </span>
                                      )}
                                    </>
                                  )}
                              </>
                            )}
                            {channel && (
                              <>
                                {channel.toUpperCase().includes("AIRBNB") && (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      backgroundColor: "#24262E",
                                      borderRadius: "2px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={AIRBIN_ICON}
                                      alt="Airbnb"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>
                                )}
                                {channel.toUpperCase().includes("BOOKING") && (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      backgroundColor: "#24262E",
                                      borderRadius: "2px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={BOOKING_ICON}
                                      alt="Booking"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>
                                )}
                                {channel.toUpperCase().includes("VRBO") && (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      backgroundColor: "#24262E",
                                      borderRadius: "2px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={VRBO_ICON}
                                      alt="VRBO"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>
                                )}
                                {channel.toUpperCase().includes("DIRECT") && (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      backgroundColor: "#24262E",
                                      borderRadius: "2px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={DIRECT_ICON}
                                      alt="Direct"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>
                                )}
                                {channel.toUpperCase().includes("EMAIL") && (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      backgroundColor: "#24262E",
                                      borderRadius: "2px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={EMAIL_ICON}
                                      alt="Email"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>
                                )}
                                {(channel.toUpperCase().includes("OPENPHONE") ||
                                  channel
                                    .toUpperCase()
                                    .includes("OPEN PHONE")) && (
                                    <div
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        minWidth: "20px",
                                        minHeight: "20px",
                                        backgroundColor: "#24262E",
                                        borderRadius: "2px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <img
                                        src={OPENPHONE_ICON}
                                        alt="OpenPhone"
                                        style={{
                                          width: "16px",
                                          height: "16px",
                                          objectFit: "contain",
                                          display: "block",
                                          margin: "0 auto",
                                        }}
                                      />
                                    </div>
                                  )}
                                {channel.toUpperCase().includes("WHATSAPP") && (
                                  <div
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      minWidth: "20px",
                                      minHeight: "20px",
                                      backgroundColor: "#24262E",
                                      borderRadius: "2px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      overflow: "hidden",
                                    }}
                                  >
                                    <img
                                      src={WHATSAPPSUP_ICON}
                                      alt="Direct"
                                      style={{
                                        width: "16px",
                                        height: "16px",
                                        objectFit: "contain",
                                        display: "block",
                                        margin: "0 auto",
                                      }}
                                    />
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <hr /> */}
                </React.Fragment>
              );
            })}
          </div>          {/* Gradient overlay to indicate overflow content */}          <div
            style={{
              position: "sticky",
              width: "100%",
              bottom: 0,
              left: 0,
              right: 0,
              height: "40px",
              marginTop: "-40px",
              background:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          />

          {/* Button to load more conversations (failsafe for auto-load when user scrolls to bottom) - or loader icon if already loading */}
          {nextBatchLoading ? (
            <div className="loading-container">
              <BoxLoader />
            </div>
          ) : (
            <button
              className="btn btn-primary load-more-button"
              onClick={loadNextBatch}
            >
              Load More
            </button>
          )}
        </div>
      ) : searchInputValue ||
        fromHostBuddyFilterVal ||
        urgentFilterIsEnabled ||
        propertyFilterVal ||
        phaseFilterVal ||
        guestNameSearchVal ? (
        <div
          className="no-messages-container"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="no-messages-text">
            No conversations match the selected filters.
          </p>
        </div>
      ) : userHasPMS ? (
        <div
          className="no-messages-container"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="no-messages-text">No conversations found.</p>
        </div>
      ) : (
        <div
          className="no-messages-container no-messages-wide"
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="no-messages-text">
            No conversations found.{" "}
            <Link to="/getstarted">Connecting your PMS</Link> will automatically
            import your conversations.
          </p>
        </div>
      )}
    </div>
  );
};

export default LeftMessage;
