import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import "./LeftMessage.css";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";
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

const avatarImages = [
  avatar01, avatar02, avatar03, avatar04,
  avatar05, avatar06, avatar07, avatar08,
  avatar09, avatar10, avatar11, avatar12,
  avatar13, avatar14, avatar15, avatar16
];

const avatarCache = new Map();

function getRandomAvatar(conversationId) {
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
  sidebarClicked,
  sidebarOpen,
  contactType,
}) => {
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [nextBatchLoading, setNextBatchLoading] = useState(false);

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
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [filteredGuestsFromSearch, setFilteredGuestsFromSearch] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchDropdownRef = useRef(null);

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
      console.log("Contact type changed:", contactType);
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

  useEffect(() => {
    if (searchInputValue.trim() === "") {
      setFilteredConversations(allConversations);
    } else {
      const filtered = allConversations.filter(
        (convo) =>
          convo.guest_name &&
          convo.guest_name
            .toLowerCase()
            .includes(searchInputValue.toLowerCase())
      );
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

  const openConversationHandle = (data, id) => {
    console.log("Opening conversation:", id, data);
    // Enhanced cache-aware conversation selection
    // Check if this conversation already has complete message data before forcing an API call
    const hasCompleteMessageData =
      data.messages &&
      Array.isArray(data.messages) &&
      data.messages.length > 0 &&
      data.messages.every((msg) => msg.sender && msg.text && msg.time);

    // If we have complete data, mark it as already processed to avoid unnecessary API calls
    const shouldSkipApiCall = hasCompleteMessageData;

    setSelectedConvo({
      ...data,
      _apiCallMade: shouldSkipApiCall, // Only skip API call if we have complete data
      _has_complete_local_data: hasCompleteMessageData, // Flag to help with cache decisions
    });
    setSelectedConversationId(id); // This is used to highlight the selected conversation
    markConversationAsOpened(data.conversation_id, data.property_name);

    // Update the unread message count for the PMS tab
    if (data.messages) {
      const unreadCount = data.messages.filter((msg) => !msg.read).length;
      setUnreadPmsCount && setUnreadPmsCount(unreadCount);
    }

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

    if (
      selectedConversationId === "" &&
      conversationsToUse.length > 0 &&
      (!isMobile || currentView !== "conversations")
    ) {
      openConversationHandle(
        conversationsToUse[0],
        conversationsToUse[0]?.conversation_id
      );
    }
  }, [filteredConversations, allConversations, currentView]);
  // Add the listener for clicking outside the guest search dropdown (so it can be closed)
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleSearchClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleSearchClickOutside);
    };
  }, []);
  const handleSearchInputChange = async (e) => {
    const searchVal = e.target.value;
    setSearchInputValue(searchVal);

    if (searchVal && allGuestNames && allGuestNames.length > 0) {
      const searchValLower = searchVal.toLowerCase().replace(/[^a-z0-9]/g, "");
      const filtered = allGuestNames.filter(
        (guest) =>
          guest.searchable.startsWith(searchValLower) ||
          guest.name.toLowerCase().includes(searchVal.toLowerCase())
      );
      setFilteredGuestsFromSearch(filtered);
    } else {
      setFilteredGuestsFromSearch([]);

      // If search is cleared and there was a guest filter active, clear it
      if (!searchVal && guestNameSearchVal) {
        setFilterQueryLoading(true);
        setGuestNameSearchVal(""); // Reset all filters when clearing search
        setPropertyFilterVal("");
        setPhaseFilterVal("");
        setUrgentFilterIsEnabled(false);
        setFromHostBuddyFilterVal(false);

        await fetchConversations(10, true, false, "", "", false, "", true, "");
        setFilterQueryLoading(false);
      }
    }
  };

  const handleGuestSelectFromSearch = async (guest) => {
    setFilterQueryLoading(true);
    setFilteredGuestsFromSearch([]);
    setSearchInputValue(guest.name);
    setGuestNameSearchVal(guest.name); // Clear all other filters when guest is selected
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

  const handleSearchClickOutside = (event) => {
    if (
      searchDropdownRef.current &&
      !searchDropdownRef.current.contains(event.target)
    ) {
      setFilteredGuestsFromSearch([]);
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
        borderColor: "#24262E",
        backgroundColor: "#17191F",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="message-filter"
        style={{
          padding: "12px",
          backgroundColor: "#17191F",
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
              placeholder="Search..."
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
            />{" "}
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
                {" "}
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
                      // Make sure we're only changing the background of this specific item
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(1, 50, 128, 1)";

                        // Create a section indicator element
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

                        // Remove any existing indicator
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

                      // Remove section indicator
                      const indicator = e.currentTarget.querySelector(
                        ".dropdown-section-indicator"
                      );
                      if (indicator) {
                        e.currentTarget.removeChild(indicator);
                      }
                    }}
                    onMouseDown={(e) => {
                      // Make sure we're only changing the background of this specific item
                      if (
                        e.currentTarget === e.target ||
                        e.currentTarget.contains(e.target)
                      ) {
                        e.currentTarget.style.backgroundColor =
                          "rgba(0, 19, 48, 1)";
                      }
                    }}
                    onMouseUp={(e) => {
                      // Make sure we're only changing the background of this specific item
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
          </div>
          <button
            className="filters-button"
            onClick={openFilterModal}
            style={{
              marginLeft: "8px",
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
          <div style={{ border: "1px solid #24262E", position: "relative" }}>
            {filteredConversations.map((message) => {
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
                    onClick={() =>
                      openConversationHandle(
                        allDataForConversation,
                        conversation_id
                      )
                    }
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
                              ? getRandomAvatar(message.conversation_id)
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
                              {(messages &&
                                messages.filter((msg) => !msg.read).length) ||
                                1}
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
                                  // Always show "External Contact" if contact_type is set to that
                                  contactType === "Guest"
                                    ? "Guest"
                                    : contactType === "External Contact"
                                      ? "External Contact"  // Change "External Contact" to "Guest"
                                      : message.contact_type
                                        ? message.contact_type
                                        : message.contact_info && message.contact_info.name
                                          ? message.contact_info.name
                                            .split(" ")
                                            .map(
                                              (word) =>
                                                word.charAt(0).toUpperCase() +
                                                word.slice(1).toLowerCase()
                                            )
                                            .join(" ")
                                          : message.name
                                            ? message.name
                                              .split(" ")
                                              .map(
                                                (word) =>
                                                  word.charAt(0).toUpperCase() +
                                                  word.slice(1).toLowerCase()
                                              )
                                              .join(" ")
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
                                                  : "Unknown"
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
