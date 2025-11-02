import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import "./multiselect.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader from "../../../../../helper/Loader";
import HostBuddyIcon from "./icons/hostbuddy_icon.svg";
import NeutralIcon from "./icons/neutral_sentiment_icon.svg";
import XCloseSvg from "./icons/x-close.svg";
import PositiveIcon from "./icons/positive_sentiment_icon.svg";
import NegativeIcon from "./icons/negative_sentiment_icon.svg";
import ChevDownIcon from "./icons/chevDown_icon.svg";
import CheckBoxIcon from "../mildeSection/message/icons/check_box.svg";
import CheckIconOpenIssue from "./icons/Check_icon_for_open_issue.svg";
import { getActiveToken } from "../../../../../helper/apiCore";

// Channel Icons
import AIRBNB_ICON_FOR_RIGHT from "./icons/AIRBNB_ICON_FOR_RIGHT.svg";
import BOOKING_ICON_FOR_RIGHT from "./icons/BOOKING_ICON_FOR_RIGHT.svg";
import VIRBO_ICON_FOR_RIGHT from "./icons/VIRBO_ICON_FOR_RIGHT.svg";
import DIRECT_ICON_FOR_RIGHT from "./icons/DIRECT_ICON_FOR_RIGHT.svg";
import EMAIL_ICON_RIGHT from "./icons/EMAIL_ICON_RIGHT.svg";
import OPENPHONE_ICON_FOR_RIGHT from "./icons/OPENPHONE_ICON_FOR_RIGHT.svg";
import GOOGLERENTAL_ICON_FOR_RIGHT from "./icons/GOOGLERENTAL_ICON_FOR_RIGHT.svg";
import SMS_ICON_FOR_RIGHT from "./icons/SMS_ICON_FOR_RIGHT.svg";

// Import action items API function from ActionsItemsTable
const callGetActionItemsApi = async (
  setActionItems,
  setGetActionItemsLoading
) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  setGetActionItemsLoading(true);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    };
    const response = await axios.get(
      `${baseUrl}/get_action_items?status=incomplete&limit=200`,
      config
    );

    if (response.status === 200) {
      setActionItems(response.data.action_items);
    } else {
      ToastHandle(response?.data?.error, "danger");
    }
    return response.data;
  } catch (error) {
    ToastHandle("Error - unable to get action items", "danger");
    return { error: "Internal server error" };
  } finally {
    setGetActionItemsLoading(false);
  }
};

const RightSection = ({
  rightSectionData,
  updateConversationFromApi,
  setCurrentView,
  setActiveTab,
  setPendingTabChange,
  setRightSectionVisible,
}) => {
  const {
    arrival_date,
    assigned_sub_user_names,
    assigned_sub_users,
    departure_date,
    status,
    guest_name,
    sentiment,
    sentiment_justification,
    property_name,
    guest_chatbot_status,
    property_chatbot_status,
    conversation_id,
    reservation_id,
    image_url,
    user,
    action_items,
  } = rightSectionData ? rightSectionData : {};
  // console.log("Assigned Sub user ", assigned_sub_user_names);
  // console.log("assigned_sub_users", assigned_sub_users)

  const until_formatted =
    guest_chatbot_status?.until_utc == "indefinitely"
      ? "indefinitely"
      : guest_chatbot_status?.until_local
        ? timeFormat(guest_chatbot_status?.until_local)
        : null;
  let { channel, is_locked } = rightSectionData || {};

  // Helper function to safely handle action items filtering
  const getIncompleteActionItems = () => {
    return action_items && Array.isArray(action_items)
      ? action_items.filter((obj) => obj.status === "incomplete")
      : [];
  };
  const [selectedOption, setSelectedOption] = useState("");
  const [toggleStatusLoading, setToggleStatusLoading] = useState(false);
  const [sentimentLoading, setSentimentLoading] = useState(false); // Add new state for sentiment loading
  const [issuesExpanded, setIssuesExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hostbuddyDropdownOpen, setHostbuddyDropdownOpen] = useState(false);
  const [localStatus, setLocalStatus] = useState(null); // Local state for tracking status changes
  const [selectedSentiment, setSelectedSentiment] = useState(
    sentiment || "neutral"
  );  // State for sub-user names
  const [subUserNames, setSubUserNames] = useState([]);
  const [subUserLoading, setSubUserLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [combinedUsers, setCombinedUsers] = useState([]); // State to store both assigned and selected users
  const [combinedMails, setCombinedMails] = useState([]); // State to store email addresses for API calls
  const [assignUserDropdownOpen, setAssignUserDropdownOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState(false); // Flag to track if data has been fetched
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
  });
  const [getGuestDataLoading, setGetGuestDataLoading] = useState(false);
  const [updateGuestDataLoading, setUpdateGuestDataLoading] = useState(false);
  const dropdownRef = useRef(null);
  const assignUserDropdownRef = useRef(null);
  const hostbuddyDropdownRef = useRef(null);
  const rightSideRef = useRef(null);
  const statusByConversationRef = useRef({});
  const navigate = useNavigate();

  // Cache to store user assignments per conversation
  const assignmentsByConversation = useRef({});
  // State for action items
  const [actionItems, setActionItems] = useState([]);
  const [getActionItemsLoading, setGetActionItemsLoading] = useState(false);
  // State for scroll overlay
  const [showTopGradient, setShowTopGradient] = useState(false);
  const [showBottomGradient, setShowBottomGradient] = useState(false);

  // Status calculation logic (moved here to avoid initialization issues)
  const get_current_status = () => {
    const { until_utc } = guest_chatbot_status || {};

    // Check to see if a guest status applies
    if (until_utc) {
      let currentTime, untilTime;
      if (until_utc !== "indefinitely") {
        currentTime = new Date();
        untilTime = new Date(until_utc);
      }

      if (untilTime > currentTime || until_utc === "indefinitely") {
        // a guest status is active
        if (guest_chatbot_status.status === "on") {
          return { curr_status: "on", source: "guest" };
        } else if (guest_chatbot_status.status === "off") {
          return { curr_status: "off", source: "guest" };
        }
        // else: status is probably 'not_specified'. Use property status
      }
    }

    // Otherwise, use property status
    return { curr_status: property_chatbot_status, source: "property" };
  };

  const current_status_get = property_chatbot_status
    ? get_current_status()
    : null;
  const { curr_status, source } = current_status_get || {};

useEffect(() => {
  // Check if we have a previously modified status for this conversation
  if (conversation_id && statusByConversationRef.current[conversation_id]) {
    // Use the stored status instead of the API's curr_status
    setLocalStatus(statusByConversationRef.current[conversation_id]);
  } else if (curr_status !== undefined) {
    // If no stored status, use the API's current status
    setLocalStatus(curr_status);
  }
}, [conversation_id, curr_status]);

const callSetStatusAPI = async (on_or_off, timing) => {
  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  setToggleStatusLoading(true);

  // Store the status for this conversation immediately
  if (conversation_id) {
    statusByConversationRef.current[conversation_id] = on_or_off;
  }
  
  // Update local status immediately for UI responsiveness
  setLocalStatus(on_or_off);

  const end_time_utc = calculateEndTimeUTC(timing);

  try {
    const config = {
      headers: { "X-API-Key": API_KEY },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      },
    };
    const body_data = {
      conversation_id: rightSectionData.conversation_id,
      status: on_or_off,
      until_utc: end_time_utc,
    };
    const response = await axios.put(
      `${baseUrl}/toggle_conversation_status`,
      body_data,
      config
    );

    if (response.status === 200) {
      ToastHandle("Status updated successfully", "success");
      
      // After successful API update, get the new conversation data
      if (updateConversationFromApi) {
        await updateConversationFromApi(conversation_id);
        
        // The API succeeded, keep our stored status
        statusByConversationRef.current[conversation_id] = on_or_off;
      }
    } else {
      ToastHandle(response?.data?.error, "danger");
      
      // If API fails, remove our stored status and revert to API status
      if (conversation_id) {
        delete statusByConversationRef.current[conversation_id];
      }
      setLocalStatus(curr_status);
    }
    return response.data;
  } catch (error) {
    ToastHandle("Internal server error", "danger");
    
    // If API fails, remove our stored status and revert to API status
    if (conversation_id) {
      delete statusByConversationRef.current[conversation_id];
    }
    setLocalStatus(curr_status);
    return { error: "Internal server error" };
  } finally {
    setToggleStatusLoading(false);
  }
};

  // Fetch action items when component mounts
  useEffect(() => {
    callGetActionItemsApi(setActionItems, setGetActionItemsLoading);
  }, []);

  // Initialize localStatus whenever curr_status changes
  //useEffect(() => {
  //  setLocalStatus(curr_status);
  //}, [curr_status]);

  // Refresh action items when conversation_id changes and there are no action_items in rightSectionData
  useEffect(() => {
    if (conversation_id && (!action_items || action_items.length === 0)) {
      // If there are no action_items in rightSectionData for this conversation,
      // we could either update the callGetActionItemsApi to filter by conversation_id
      // or rely on the updateConversationFromApi function to refresh the data
      if (
        updateConversationFromApi &&
        typeof updateConversationFromApi === "function"
      ) {
        updateConversationFromApi(conversation_id);
      }
    }
  }, [conversation_id, action_items, updateConversationFromApi]);  // Initialize combinedUsers with assigned_sub_user_names when component mounts or assigned users change
  useEffect(() => {
    if (!conversation_id) return;

    // Check if we have cached data for this conversation
    const cachedData = assignmentsByConversation.current[conversation_id];

    if (cachedData) {
      // Use cached data if available (user has modified this conversation before)
      setCombinedUsers(cachedData.users);
      setCombinedMails(cachedData.mails);
    } else {
      // Use props data for first time viewing this conversation
      if (assigned_sub_user_names && assigned_sub_user_names.length > 0) {
        const assignedUsersFormatted = assigned_sub_user_names.map(
          (name, index) => ({
            id: `assigned-${index}`,
            name: name,
            type: "assigned",
          })
        );
        setCombinedUsers(assignedUsersFormatted);

        // Initialize combinedMails with assigned_sub_users (emails)
        if (assigned_sub_users && assigned_sub_users.length > 0) {
          setCombinedMails([...assigned_sub_users]);
        } else {
          setCombinedMails([]);
        }
      } else {
        setCombinedUsers([]);
        setCombinedMails([]);
      }
    }
  }, [assigned_sub_user_names, assigned_sub_users, conversation_id]);  // Track when user explicitly takes an action that should trigger the API
  const [userActionTriggered, setUserActionTriggered] = useState(false);

  // Save current assignments to cache when user makes changes
  useEffect(() => {
    if (userActionTriggered && conversation_id && combinedMails.length >= 0) {
      // Cache the current state for this conversation
      assignmentsByConversation.current[conversation_id] = {
        users: [...combinedUsers],
        mails: [...combinedMails]
      };
    }
  }, [combinedUsers, combinedMails, userActionTriggered, conversation_id]);

  // Trigger API call only when user explicitly takes an action
  useEffect(() => {
    if (userActionTriggered && conversation_id) {
      // Call API with current combinedMails
      assignUsersToConversation();
      // Reset flag after API call to prevent future automatic calls
      setUserActionTriggered(false);
    }
  }, [userActionTriggered, conversation_id]);

  // Function to mark an action item as complete
  const callCompleteActionItemApi = async (actionItemId) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      const bodyData = { action_item_id: actionItemId };
      const response = await axios.put(
        `${baseUrl}/complete_action_item`,
        bodyData,
        config
      );
      if (response.status === 200) {
        // Remove the completed action item from the state
        setActionItems(actionItems.filter((item) => item.id !== actionItemId));

        // If this is a conversation-specific action item and updateConversationFromApi is available, refresh the conversation data
        if (
          conversation_id &&
          updateConversationFromApi &&
          typeof updateConversationFromApi === "function"
        ) {
          updateConversationFromApi(conversation_id);
        }

        ToastHandle("Action item marked as completed", "success");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.data;
    } catch (error) {
      ToastHandle("Error completing action item", "danger");
    }
  };

  // Function to fetch sub-user names
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

  // Handle dropdown open - fetch data when dropdown is opened
  const handleAssignUserDropdownOpen = () => {
    const newState = !assignUserDropdownOpen;
    setAssignUserDropdownOpen(newState);

    // If opening the dropdown and we haven't fetched data yet, fetch it
    if (newState && !dataFetched) {
      fetchSubUserNames();
    }
  };  // Handle user selection for multi-select
  const handleUserSelect = (user) => {
    // Update combinedMails first to track email changes
    setCombinedMails((prev) => {
      if (prev.includes(user.email)) {
        // If email already exists, remove it
        return prev.filter((email) => email !== user.email);
      } else {
        // If email doesn't exist, add it
        return [...prev, user.email];
      }
    });

    setCombinedUsers((prev) => {
      // Check if user is already in combinedUsers
      if (
        prev.some(
          (selected) =>
            selected.name === user.display_name || selected.name === user.email
        )
      ) {
        // If already selected, remove it
        return prev.filter(
          (selected) =>
            selected.name !== user.display_name && selected.name !== user.email
        );
      } else {
        // If not selected, add it
        const newUser = {
          id: `selected-${user.email}`,
          name: user.display_name,
          email: user.email,
          type: "selected",
        };
        return [...prev, newUser];
      }
    });

    // Also update selectedUsers for API calls
    setSelectedUsers((prev) => {
      // Check if user is already selected
      if (prev.some((selected) => selected.email === user.email)) {
        // If already selected, remove it
        const newSelection = prev.filter(
          (selected) => selected.email !== user.email
        );
        return newSelection;
      } else {
        // If not selected, add it
        const newSelection = [...prev, user];
        return newSelection;
      }
    });

    // Trigger API call because user explicitly made a selection action
    setUserActionTriggered(true);
  };// Handle removing a user from selection
  const handleRemoveUser = (identifier) => {
    // Find the user being removed to get their email
    const userToRemove = combinedUsers.find(
      (user) => user.name === identifier || user.email === identifier
    );

    // Remove from combinedMails
    if (userToRemove) {
      setCombinedMails((prev) => {
        if (userToRemove.type === "assigned") {
          // For assigned users, find the email by matching the index
          const userIndex = assigned_sub_user_names?.indexOf(userToRemove.name);
          const emailToRemove = assigned_sub_users?.[userIndex];
          return prev.filter((email) => email !== emailToRemove);
        } else {
          // For selected users, remove by email
          return prev.filter((email) => email !== userToRemove.email);
        }
      });
    }

    // Remove from combinedUsers
    setCombinedUsers((prev) => {
      return prev.filter(
        (user) => user.name !== identifier && user.email !== identifier
      );
    });    // Also remove from selectedUsers if it's a selected user (for API calls)
    setSelectedUsers((prev) => {
      const newSelection = prev.filter(
        (user) => user.email !== identifier && user.display_name !== identifier
      );
      return newSelection;
    });

    // Trigger API call because user explicitly removed a user
    setUserActionTriggered(true);
  };  // Clear all selected users
  const handleClearAllUsers = () => {
    setSelectedUsers([]);
    setCombinedUsers([]);
    setCombinedMails([]);    // Trigger API call because user explicitly cleared all users
    setUserActionTriggered(true);
  };
  // Function to assign selected users to the conversation
  const assignUsersToConversation = async () => {
    if (!conversation_id) return;

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

      // Use combinedMails instead of extracting from usersToAssign
      const subUserEmails = combinedMails;

      const bodyData = {
        conversation_id: conversation_id,
        sub_user_emails: subUserEmails,
      };

      const response = await axios.put(
        `${baseUrl}/assign_sub_users_to_conversation`,
        bodyData,
        config
      );

      if (response.status === 200) {
        ToastHandle("Users assigned successfully", "success");
        // You can optionally update the conversation data if needed
        if (
          updateConversationFromApi &&
          typeof updateConversationFromApi === "function"
        ) {
          updateConversationFromApi(conversation_id);
        }
      } else {
        ToastHandle(
          response?.data?.error || "Failed to assign users",
          "danger"
        );
      }
    } catch (error) {
      console.error("Error assigning users:", error);
      ToastHandle("Error assigning users", "danger");
    }
  };

  // Fetch any existing assigned users when conversation changes
  useEffect(() => {
    const fetchAssignedUsers = async () => {
      if (!conversation_id) {
        setSelectedUsers([]);
        return;
      }

      // Only fetch if we've already loaded the sub-user names
      if (!dataFetched || subUserNames.length === 0) {
        return;
      }

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

        const response = await axios.get(
          `${baseUrl}/get_sub_users_for_conversation/${conversation_id}`,
          config
        );

        if (response.status === 200 && response.data.sub_user_emails) {
          // Map assigned users to match our selected users format
          const assignedUsers = response.data.sub_user_emails.map((email) => {
            // Find matching user in subUserNames
            const user = subUserNames.find((user) => user.email === email);
            return user || { email, display_name: email.split("@")[0] }; // Fallback if user not found
          });

          setSelectedUsers(assignedUsers);
        }
      } catch (error) {
        console.error(
          "Error fetching assigned users for get_sub_users_for_conversation :",
          error
        );
      }
    };

    fetchAssignedUsers();
  }, [conversation_id, dataFetched, subUserNames]);

  // Effect to handle outside clicks for dropdown
  useEffect(() => {
    function handleOutsideClick(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        assignUserDropdownRef.current &&
        !assignUserDropdownRef.current.contains(event.target)
      ) {
        setAssignUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // Update selectedSentiment when rightSectionData changes
  useEffect(() => {
    if (sentiment === "clear") {
      // If sentiment is explicitly cleared, display as neutral but with different styling
      setSelectedSentiment("clear");
    } else if (sentiment) {
      setSelectedSentiment(sentiment);
    } else {
      setSelectedSentiment("neutral"); // Default to neutral
    }
  }, [sentiment]);
  // Handle clicks outside the Hostbuddy dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hostbuddyDropdownRef.current &&
        !hostbuddyDropdownRef.current.contains(event.target)
      ) {
        setHostbuddyDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle scroll gradients for overflow content
  useEffect(() => {
    const checkScroll = () => {
      if (rightSideRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = rightSideRef.current;

        // Show top gradient when scrolled down
        setShowTopGradient(scrollTop > 10);

        // Show bottom gradient when there's more content to scroll to
        setShowBottomGradient(
          scrollHeight > clientHeight &&
          scrollTop < scrollHeight - clientHeight - 10
        );
      }
    };

    // Check initial state
    checkScroll();

    // Add scroll event listener
    const rightSide = rightSideRef.current;
    if (rightSide) {
      rightSide.addEventListener("scroll", checkScroll);

      // Also check when content might have changed
      const resizeObserver = new ResizeObserver(() => {
        checkScroll();
      });

      resizeObserver.observe(rightSide);

      return () => {
        rightSide.removeEventListener("scroll", checkScroll);
        resizeObserver.disconnect();
      };
    }
  }, [rightSectionData]);

  // Force display for testing - remove in production
  const isCheckInToday = true; // For testing
  const isCheckOutToday = true; // For testing  // Function to handle sentiment selection
  const handleSentimentSelect = (sentiment) => {
    // Update the local UI state
    setSelectedSentiment(sentiment);
    setDropdownOpen(false);

    // Call the API to update the sentiment if conversation_id exists
    if (conversation_id) {
      // Show loading indicator when updating any sentiment option
      setSentimentLoading(true);

      // For API calls, ensure we're passing the correct values expected by the backend
      const apiSentimentValue = sentiment === "clear" ? "clear" : sentiment;
      updateSentiment(conversation_id, apiSentimentValue);
    }
  };

  // Function to handle keyboard navigation in dropdown
  const handleHostbuddyDropdownKeyDown = (e) => {
    if (hostbuddyDropdownOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const menu =
          hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        if (menu) {
          const options = Array.from(menu.querySelectorAll('[role="option"]'));
          const currentFocus = document.activeElement;
          const currentIndex = options.indexOf(currentFocus);

          let nextIndex;
          if (e.key === "ArrowDown") {
            nextIndex =
              currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex =
              currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          }

          options[nextIndex]?.focus();
        }
      } else if (e.key === "Escape") {
        setHostbuddyDropdownOpen(false);
      } else if (e.key === "Home") {
        e.preventDefault();
        const menu =
          hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        menu?.querySelector('[role="option"]')?.focus();
      } else if (e.key === "End") {
        e.preventDefault();
        const menu =
          hostbuddyDropdownRef.current?.querySelector('[role="listbox"]');
        const options = menu?.querySelectorAll('[role="option"]');
        options?.[options.length - 1]?.focus();
      }
    }
  };

  // Function to call the API to update sentiment
  const updateSentiment = async (conversationId, sentimentValue) => {
    if (!conversationId) return;

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    try {
      // Validate the sentiment value is one of the accepted values
      if (
        !["positive", "neutral", "negative", "clear"].includes(sentimentValue)
      ) {
        setSentimentLoading(false); // Make sure to reset loading state if validation fails
        ToastHandle(
          "Invalid sentiment value. Must be positive, neutral, negative, or clear.",
          "danger"
        );
        return;
      }

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
      const bodyData = {
        conversation_id: conversationId,
        new_sentiment: sentimentValue,
        property_name: property_name || undefined,
      };

      const response = await axios.post(
        `${baseUrl}/change_sentiment`,
        bodyData,
        config
      );
      if (response.status === 200) {
        // Handle API response which might include updated sentiment values
        const updatedSentiment = response.data?.new_sentiment || sentimentValue;
        const updatedJustification = response.data?.new_sentiment_justification;
        // Update local state with the sentiment returned from API
        setSelectedSentiment(updatedSentiment);

        // Reset the loading state
        setSentimentLoading(false);

        // Display appropriate success message based on sentiment value
        if (sentimentValue === "clear") {
          ToastHandle("Sentiment cleared successfully", "success");
        } else {
          ToastHandle(`Sentiment updated to ${updatedSentiment}`, "success");
        }

        // Update the conversation data if needed
        if (
          updateConversationFromApi &&
          typeof updateConversationFromApi === "function"
        ) {
          updateConversationFromApi(conversationId);
        }
      } else {
        // Reset loading state on error
        setSentimentLoading(false);
        ToastHandle(
          response?.data?.error || "Failed to update sentiment",
          "danger"
        );
      }
    } catch (error) {
      // Reset loading state on error
      setSentimentLoading(false);
      console.error("Error updating sentiment:", error);
      ToastHandle(
        error?.response?.data?.error || "Error updating sentiment",
        "danger"
      );
    }
  };

  // Function to get the appropriate icon based on sentiment
  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return PositiveIcon;
      case "negative":
        return NegativeIcon;
      case "clear":
        return NeutralIcon; // Using neutral icon for clear too, can be changed if there's a specific icon
      case "neutral":
      default:
        return NeutralIcon;
    }
  };
  const currentDate = new Date();

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

  // console.log("Debug - Arrival date:", arrival_date);
  // console.log("Debug - Departure date:", departure_date);
  // Format timestamp for issues in "Month Day, Time" format (e.g. "Feb 15, 3:45pm")
  const formatIssueTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    const date = new Date(dateTimeString);
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

    const month = months[date.getMonth()];
    const day = date.getDate(); // Get the day
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${month} ${day}, ${hours}:${minutes}${ampm}`;
  };

  // Calculate end_time_utc based on timing, for toggle conversation status
  const calculateEndTimeUTC = (timing) => {
    const now = new Date();
    switch (timing) {
      case "15m":
        now.setMinutes(now.getMinutes() + 15);
        break;
      case "1h":
        now.setHours(now.getHours() + 1);
        break;
      case "1d":
        now.setDate(now.getDate() + 1);
        break;
      case "indefinitely":
        return "indefinitely";
      default:
        throw new Error("Invalid timing value");
    }
    return now.toISOString();
  };

  const handleOpenContactModal = () => {
    setContactInfo({
      email: contactInfo.email || "not added",
      phone: contactInfo.phone || "not added",
    });
    setContactModalOpen(true);
  };

  // When the user selects to toggle guest status
  const handleSelectChange = (event, curr_status) => {
    const on_or_off = curr_status === "on" ? "off" : "on";
    callSetStatusAPI(on_or_off, event.target.value);
  };
  // When the user selects to revert guest status
  const handleRevertStatus = (e) => {
    if (e) e.preventDefault();
    callSetStatusAPI("not_specified", "indefinitely");
  };

  // Determines what to display for the status section
  const getStatusText = (status) => {
    if (status === "inquiry") {
      return "Inquiry";
    } else if (["past", "current", "future"].includes(status)) {
      return `${status.charAt(0).toUpperCase() + status.slice(1)} guest`;
    } else {
      return null;
    }
  };

  if (channel) {
    channel = channel.split(" (")[0]; // channel e.g. "Airbnb (via Hostfully)". Remove the second part.
    channel = channel.replace("hostbuddy", "Chat Window");
  } else {
    channel = "";
  }
  const statusText = getStatusText(status);

  // Navigate to action items page
  const navigateToActionItems = () => {
    if (setActiveTab) {
      // For desktop view, directly switch to Open Issue tab
      setActiveTab("openIssue");

      // If we're in mobile view and need to navigate to messages view first
      if (setCurrentView) {
        // Set which tab we want to activate after the view change
        if (setPendingTabChange) {
          setPendingTabChange("openIssue");
        }
        // Navigate to messages view
        setCurrentView("messages");
      }
    } else {
      // Fallback to the original behavior if setActiveTab is not available
      navigate("/action-item");
    }
  };

  // Initial fetch of guest data when conversation_id is available
useEffect(() => {
  if (conversation_id) {
    callGetGuestDataApi();
  }
}, [conversation_id, property_name, reservation_id]); // Added property_name and reservation_id as dependencies

  // Function to call the API to get guest data
  // Function to call the API to get guest data
const callGetGuestDataApi = async () => {
  if (!conversation_id) return;

  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  setGetGuestDataLoading(true);

  try {
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

    let response;
    
    // Try to get guest data first (for reservation-associated conversations)
    if (property_name && reservation_id) {
      const queryParams = new URLSearchParams({
        conversation_id,
        property_name,
      });

      // Add reservation_id only if it exists
      if (reservation_id) {
        queryParams.append("reservation_id", reservation_id);
      }

      response = await axios.get(
        `${baseUrl}/get_guest_data?${queryParams.toString()}`,
        config
      );
    }

    // If guest data API fails or conversation is not associated with reservation,
    // try getting external contact info
    if (!response || response.status !== 200) {
      const queryParams = new URLSearchParams({
        conversation_id,
      });

      response = await axios.get(
        `${baseUrl}/get_external_contact_info?${queryParams.toString()}`,
        config
      );

      if (response.status === 200) {
        // Handle external contact data
        const contactData = response.data.contact_info;
        
        const phoneNumber = contactData.phone_numbers?.[0] || '';
        const emailAddress = contactData.email_addresses?.[0] || '';

        // console.log('External Contact Phone Number:', phoneNumber);
        // console.log('External Contact Email Address:', emailAddress);

        setContactInfo({
          email: emailAddress || "not added",
          phone: phoneNumber || "not added",
        });
        return;
      }
    }

    if (response && response.status === 200) {
      // Handle guest data (reservation-associated conversation)
      const guestData = response.data.guest_data;

      // Get first phone number and first email address
      const phoneNumber = guestData.phone_numbers?.[0] || '';
      const emailAddress = guestData.email_addresses?.[0] || '';

      // console.log('Guest Phone Number:', phoneNumber);
      // console.log('Guest Email Address:', emailAddress);

      setContactInfo({
        email: emailAddress || "not added",
        phone: phoneNumber || "not added",
      });
    } else {
      // Reset contact info when both APIs fail
      setContactInfo({
        email: "not added",
        phone: "not added",
      });
    }
  } catch (error) {
    console.error("Error fetching contact data:", error);
    // Reset contact info when API throws an error
    setContactInfo({
      email: "not added",
      phone: "not added",
    });
  } finally {
    setGetGuestDataLoading(false);
  }
};

  // API function to update guest contact information
  // API function to update guest contact information
const callUpdateGuestDataApi = async () => {
  if (!conversation_id) return;

  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY = process.env.REACT_APP_API_KEY;
  setUpdateGuestDataLoading(true);

  try {
    // Get token from the apiCore's active token or fall back to localStorage
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

    const emailValue = contactInfo.email && contactInfo.email !== "not added" ? contactInfo.email.trim() : "";
    const phoneValue = contactInfo.phone && contactInfo.phone !== "not added" ? contactInfo.phone.trim() : "";

    // Build the request body with contact information
    const requestBody = {
      conversation_id,
      property_name,
      guest_data: {
        email_addresses:
          emailValue
            ? [emailValue]
            : [],
        phone_numbers:
          phoneValue
            ? [phoneValue]
            : [],
      },
    };

    // Add reservation_id only if it exists
    if (reservation_id) {
      requestBody.reservation_id = reservation_id;
    }

    const response = await axios.put(
      `${baseUrl}/update_guest_info`,
      requestBody,
      config
    );

    if (response.status === 200) {
      ToastHandle("Contact information updated successfully", "success");
      
      // Check if phone numbers or email addresses were removed
      const wasPhoneRemoved = phoneValue === "" && contactInfo.phone !== "not added";
      const wasEmailRemoved = emailValue === "" && contactInfo.email !== "not added";
      
      if (wasPhoneRemoved || wasEmailRemoved) {
        // If contact info was removed, the conversation might have been converted to external contact
        // Update the contact info immediately to reflect the change
        setContactInfo({
          email: emailValue || "not added",
          phone: phoneValue || "not added",
        });
        
        // Also refresh the conversation data to get updated reservation association
        if (updateConversationFromApi && typeof updateConversationFromApi === "function") {
          setTimeout(() => {
            updateConversationFromApi(conversation_id);
          }, 1000);
        }
      } else {
        // Normal refresh for adding contact info
        setTimeout(async () => {
          await callGetGuestDataApi();
        }, 1000); // 1 second delay
      }
      
      setContactModalOpen(false);
    } else {
      ToastHandle(
        response?.data?.error || "Failed to update contact information",
        "danger"
      );
    }
  } catch (error) {
    console.error("Error updating guest data:", error);
    ToastHandle("Error updating contact information", "danger");
  } finally {
    setUpdateGuestDataLoading(false);
  }
};
  // Initial fetch of guest data when conversation_id and reservation_id are available
  useEffect(() => {
    if (conversation_id && reservation_id) {
      callGetGuestDataApi();
    }
  }, [conversation_id, reservation_id]);

  return (
    <div className="right-side" ref={rightSideRef}>
      {/* Gradient overlays for scrolling indication */}
      {showTopGradient && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "296px",
            height: "40px",
            background:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      {showBottomGradient && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "296px",
            height: "40px",
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      )}
      {/* Mobile Back Button */}
      <div className="d-block d-lg-none mobile-nav">
        <button
          onClick={() => setCurrentView("messages")}
          className="btn btn-link"
        >
          Back to Messages
        </button>
      </div>{" "}
      <div
        className="right-title"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Reservation details</h1>
        {setRightSectionVisible && (
          <button
            className="close-right-section-btn"
            onClick={() => setRightSectionVisible(false)}
            style={{
              background: "transparent",
              border: "none",
              color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
              cursor: "pointer",
              fontSize: "24px",
              padding: "6px 12px",
              borderRadius: "4px",
              transition: "background-color 0.2s ease",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#24262E")}
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = "transparent")
            }
          >
            <img
              src={XCloseSvg}
              alt="Close"
              style={{
                width: "18px",
                height: "18px",
                background: "transparent",
              }}
            />
          </button>
        )}
      </div>
      {/* Guest Image */}
      <div
        className="guest-image-container"
        style={{ marginBottom: "2px", textAlign: "center" }}
      >
        {image_url ? (
          <img
            src={image_url}
            alt={`${guest_name || "Guest"}`}
            style={{
              width: "100%",
              height: "75%",
              objectFit: "contain",
              borderRadius: "8px",
              display: "block",
              marginLeft: "0",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = dummyPropertyImg;
            }}
          />
        ) : (
          <img
            src={dummyPropertyImg}
            alt="Default guest"
            style={{
              maxWidth: "272px",
              maxHeight: "220px",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              borderRadius: "8px",
              display: "block",
              marginLeft: "0",
            }}
          />
        )}
      </div>
      {/* User info aligned to the left */}
      {user && (
        <div
          style={{
            textAlign: "left",
            paddingLeft: "0px",
            marginBottom: "2px",
            marginTop: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px",
            }}
          >
            <div
              style={{
                display: "inline-block",
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#BDC1C9",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                letterSpacing: "0px",
                lineHeight: "var(--body-medium-med-500-line-height)",
                padding: "2px ",
                borderRadius: "4px",
                height: "25px",
                backgroundColor: "#24262E",
              }}
            >
              {user ? user.charAt(0).toUpperCase() + user.slice(1) : user}
            </div>

            {/* Check-in-today badge */}
            {isToday(arrival_date) && (
              <span
                className="checkin-badge"
                style={{ height: "25px", width: "112px" }}
              >
                Check-in today
              </span>
            )}

            {/* Check-out-today badge */}
            {isToday(departure_date) && (
              <span
                className="checkout-badge"
                style={{ height: "25px", width: "112px" }}
              >
                Check-out today
              </span>
            )}
          </div>
        </div>
      )}
      <div>
        <div className="guest">
          {statusText || guest_name || property_name ? (
            <>
              {/* {statusText && <span>{statusText}</span>} */}
              {/* <h1 style={{ fontSize: '14px', margin: 0 }}>{guest_name}</h1> */}
              <h1
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: '"DM Sans", Helvetica',
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                }}
              >
                {property_name}
              </h1>
              <h1
                className="guest_date"
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: '"DM Sans", Helvetica',
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                }}
              >
                {arrival_date &&
                  formatDateRange(arrival_date, departure_date, true)}
              </h1>
            </>
          ) : (
            <p>No guest selected</p>
          )}
        </div>{" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "4px",
            marginBottom: "5px",
          }}
        >
          {channel && (
            <>
              {channel.toUpperCase().includes("AIRBNB") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",

                    height: "20px",
                    padding: "4px",
                    borderRadius: "3px",
                    backgroundColor: "#24262E",
                  }}
                >
                  <img
                    src={AIRBNB_ICON_FOR_RIGHT}
                    alt="Airbnb"
                    style={{
                      width: "49.64px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}{" "}
              {channel.toUpperCase().includes("BOOKING") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#24262E",
                  }}
                >
                  <img
                    src={BOOKING_ICON_FOR_RIGHT}
                    alt="Booking"
                    style={{
                      width: "80.14px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
              {channel.toUpperCase().includes("VRBO") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#24262E",
                  }}
                >
                  <img
                    src={VIRBO_ICON_FOR_RIGHT}
                    alt="VIRBO"
                    style={{
                      width: "45.38px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}{" "}
              {(channel.toUpperCase().includes("OPENPHONE") ||
                channel.toUpperCase().includes("OPEN PHONE")) && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      height: "20px",
                      borderRadius: "3px",
                      backgroundColor: "#24262E",
                    }}
                  >
                    <img
                      src={OPENPHONE_ICON_FOR_RIGHT}
                      alt="OpenPhone"
                      style={{
                        width: "86.77px",
                        height: "20px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}{" "}
              {channel.toUpperCase().includes("DIRECT") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#24262E",
                  }}
                >
                  <img
                    src={DIRECT_ICON_FOR_RIGHT}
                    alt="Direct"
                    style={{
                      width: "66px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}{" "}
              {channel.toUpperCase().includes("EMAIL") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#24262E",
                  }}
                >
                  <img
                    src={EMAIL_ICON_RIGHT}
                    alt="Email"
                    style={{
                      width: "58px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}{" "}
              {(channel.toUpperCase().includes("GOOGLE RENTALS") ||
                channel.toUpperCase().includes("GOOGLERENTALS")) && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "4px",
                      height: "20px",
                      borderRadius: "3px",
                      backgroundColor: "#24262E",
                    }}
                  >
                    <img
                      src={GOOGLERENTAL_ICON_FOR_RIGHT}
                      alt="Google Rentals"
                      style={{
                        width: "119.6px",
                        height: "20px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}{" "}
              {channel.toUpperCase().includes("SMS") && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "4px",
                    height: "20px",
                    borderRadius: "3px",
                    backgroundColor: "#24262E",
                  }}
                >
                  <img
                    src={SMS_ICON_FOR_RIGHT}
                    alt="SMS"
                    style={{
                      width: "52px",
                      height: "20px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}
            </>
          )}
        </div>
        {/* Adding dividing line after channel */}
        <div
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            margin: "10px auto",
            width: "100%",
            maxWidth: "400px",
          }}
        ></div>
        {/* Contact Information Section */}
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "#ffffff",
                fontFamily: '"Poppins-SemiBold", Helvetica',
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "19.6px",
              }}
            >
              Contact information
            </h2>{" "}
            <span
              onClick={handleOpenContactModal}
              style={{
                color: "#74A9F7",
                fontSize: "14px",
                cursor: "pointer",
                fontFamily: '"DM Sans", Helvetica',
              }}
            >
              Edit
            </span>
          </div>{" "}
          <div style={{ marginBottom: "5px" }}>
            <span
              style={{
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Phone:
            </span>
            <span
              style={{
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.phone}
            </span>
          </div>
          <div>
            <span
              style={{
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
              }}
            >
              Email:
            </span>
            <span
              style={{
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
                fontWeight: 400,
                marginLeft: "5px",
              }}
            >
              {getGuestDataLoading ? "Loading..." : contactInfo.email}
            </span>
          </div>
        </div>
        <div
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            margin: "10px auto",
            width: "100%",
            maxWidth: "400px",
          }}
        ></div>
      </div>
      {!(channel == "Chat Window") &&
        (!is_locked ? (
          curr_status && (
            <div className="toggle">
              {curr_status && (
                <div
                  style={{
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    marginBottom: "10px",
                  }}
                >
                  {" "}
                  <img
                    src={HostBuddyIcon}
                    alt="HostBuddy"
                    style={{ width: "25px", height: "25px" }}
                  />
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      fontFamily: "Poppins Helvetica",
                    }}
                  >
                    HostBuddy{" "}
                  </span>
                  <span>is</span>
                  {!toggleStatusLoading ? (
                    <div
                      ref={hostbuddyDropdownRef}
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                      }}
                    >
                      {/* Custom Dropdown Button */}
                      <div
                        onClick={() =>
                          setHostbuddyDropdownOpen(!hostbuddyDropdownOpen)
                        }
                        style={{
                          alignItems: "center",
                          display: "flex",
                          backgroundColor: "var(--white-label-background-dropdown, #24262E)",
                          // border: '1px solid',
                          // borderColor: 'rgba(57, 61, 70, 1)',
                          borderRadius: "4px",
                          gap: "6px",
                          height: "32px",
                          padding: "0px 8px",
                          position: "relative",
                          width: "100%",
                          cursor: "pointer",
                          color:
                            (localStatus || curr_status) === "on"
                              ? "rgb(0,180,0)"
                              : "rgb(200,0,0)",
                          fontWeight: "bold",
                          transition: "background-color 0.2s ease",
                        }}
                        tabIndex={0}
                        role="button"
                        aria-haspopup="listbox"
                        aria-expanded={hostbuddyDropdownOpen}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setHostbuddyDropdownOpen(!hostbuddyDropdownOpen);
                          }
                          handleHostbuddyDropdownKeyDown(e);
                        }}
                      >
                        {" "}
                        <span
                          style={{
                            display: "inline-block",
                            marginRight: "4px",
                          }}
                        >
                          ●
                        </span>
                        <span style={{ flexGrow: 1 }}>
                          {(localStatus || curr_status) === "on"
                            ? "Active"
                            : "Turned off"}
                        </span>
                        <img
                          src={ChevDownIcon}
                          alt="Dropdown Icon"
                          style={{
                            width: "16px",
                            height: "16px",
                            transform: hostbuddyDropdownOpen
                              ? "rotate(180deg)"
                              : "rotate(0)",
                            transition: "transform 0.3s ease",
                          }}
                        />
                      </div>
                      {/* Custom Dropdown Menu */}{" "}
                      {hostbuddyDropdownOpen && (
                        <div
                          style={{
                            position: "absolute",
                            top: "100%",
                            left: "0",
                            right: "0",
                            backgroundColor: "var(--white-label-background-dropdown, #262730)",
                            borderRadius: "4px",
                            marginTop: "4px",
                            zIndex: 100,
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                            border: "1px solid rgba(57, 61, 70, 1)",
                            overflow: "hidden",
                          }}
                          role="listbox"
                        >
                          {(localStatus || curr_status) === "on" && (
                            <span
                              style={{
                                padding: "8px 16px",
                                display: "block",
                                // backgroundColor: "#353840",
                                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                                fontWeight: "500",
                                // borderLeft: "3px solid #0B5FDE",
                              }}
                              role="option"
                              aria-selected="true"
                            >
                              Turn off
                            </span>
                          )}{" "}
                          {(localStatus || curr_status) === "off" && (
                            <div
                              onClick={() => {
                                callSetStatusAPI("on", "indefinitely");
                                setHostbuddyDropdownOpen(false);
                              }}
                              style={{
                                padding: "8px 16px",
                                cursor: "pointer",
                                transition: "background-color 0.2s ease",
                                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                                hoverBackgroundColor: "rgba(1, 50, 128, 1)",
                                display: "flex",
                                alignItems: "center",
                                position: "relative",
                              }}
                              role="option"
                              tabIndex={0}
                              onMouseDown={(e) =>
                              (e.currentTarget.style.backgroundColor =
                                "rgba(0, 19, 48, 1)")
                              }
                              onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "rgba(1, 50, 128, 1)";
                                const indicator =
                                  e.currentTarget.querySelector(
                                    ".section-indicator"
                                  );
                                if (indicator) {
                                  indicator.style.backgroundColor =
                                    "rgba(62, 136, 247, 1)";
                                }
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                const indicator =
                                  e.currentTarget.querySelector(
                                    ".section-indicator"
                                  );
                                if (indicator) {
                                  indicator.style.backgroundColor =
                                    "transparent";
                                }
                              }}
                              onFocus={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "rgba(1, 50, 128, 1)";
                                const indicator =
                                  e.currentTarget.querySelector(
                                    ".section-indicator"
                                  );
                                if (indicator) {
                                  indicator.style.backgroundColor =
                                    "rgba(62, 136, 247, 1)";
                                }
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.backgroundColor =
                                  "transparent";
                                const indicator =
                                  e.currentTarget.querySelector(
                                    ".section-indicator"
                                  );
                                if (indicator) {
                                  indicator.style.backgroundColor =
                                    "transparent";
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  callSetStatusAPI("on", "indefinitely");
                                  setHostbuddyDropdownOpen(false);
                                }
                              }}
                            >
                              <div
                                className="section-indicator"
                                style={{
                                  width: "3px",
                                  height: "calc(100% - 8px)",
                                  backgroundColor: "transparent",
                                  marginRight: "8px",
                                  transition: "background-color 0.2s ease",
                                  position: "absolute",
                                  left: "0",
                                  top: "4px",
                                  bottom: "4px",
                                  borderRadius: "0 2px 2px 0",
                                }}
                              />
                              <span style={{ marginLeft: "8px" }}>
                                Turn back on
                              </span>
                            </div>
                          )}{" "}
                          {(localStatus || curr_status) === "on" && (
                            <>
                              {" "}
                              <div
                                onClick={() => {
                                  callSetStatusAPI("off", "15m");
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                                role="option"
                                tabIndex={0}
                                onMouseDown={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)")
                                }
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    callSetStatusAPI("off", "15m");
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                <div
                                  className="section-indicator"
                                  style={{
                                    width: "3px",
                                    height: "calc(100% - 8px)",
                                    backgroundColor: "transparent",
                                    marginRight: "8px",
                                    transition: "background-color 0.2s ease",
                                    position: "absolute",
                                    left: "0",
                                    top: "4px",
                                    bottom: "4px",
                                    borderRadius: "0 2px 2px 0",
                                  }}
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  For 15 minutes
                                </span>
                              </div>{" "}
                              <div
                                onClick={() => {
                                  callSetStatusAPI("off", "1h");
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                                role="option"
                                tabIndex={0}
                                onMouseDown={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)")
                                }
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    callSetStatusAPI("off", "1h");
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                <div
                                  className="section-indicator"
                                  style={{
                                    width: "3px",
                                    height: "calc(100% - 8px)",
                                    backgroundColor: "transparent",
                                    marginRight: "8px",
                                    transition: "background-color 0.2s ease",
                                    position: "absolute",
                                    left: "0",
                                    top: "4px",
                                    bottom: "4px",
                                    borderRadius: "0 2px 2px 0",
                                  }}
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  For 1 hour
                                </span>
                              </div>{" "}
                              <div
                                onClick={() => {
                                  callSetStatusAPI("off", "1d");
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                                role="option"
                                tabIndex={0}
                                onMouseDown={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)")
                                }
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    callSetStatusAPI("off", "1d");
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                <div
                                  className="section-indicator"
                                  style={{
                                    width: "3px",
                                    height: "calc(100% - 8px)",
                                    backgroundColor: "transparent",
                                    marginRight: "8px",
                                    transition: "background-color 0.2s ease",
                                    position: "absolute",
                                    left: "0",
                                    top: "4px",
                                    bottom: "4px",
                                    borderRadius: "0 2px 2px 0",
                                  }}
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  For 24 hours
                                </span>
                              </div>{" "}
                              <div
                                onClick={() => {
                                  callSetStatusAPI("off", "indefinitely");
                                  setHostbuddyDropdownOpen(false);
                                }}
                                style={{
                                  padding: "8px 16px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s ease",
                                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                                  display: "flex",
                                  alignItems: "center",
                                  position: "relative",
                                }}
                                role="option"
                                tabIndex={0}
                                onMouseDown={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                  getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)")
                                }
                                onMouseOver={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onMouseOut={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onFocus={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "rgba(62, 136, 247, 1)";
                                  }
                                }}
                                onBlur={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                                  const indicator =
                                    e.currentTarget.querySelector(
                                      ".section-indicator"
                                    );
                                  if (indicator) {
                                    indicator.style.backgroundColor =
                                      "transparent";
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    callSetStatusAPI("off", "indefinitely");
                                    setHostbuddyDropdownOpen(false);
                                  }
                                }}
                              >
                                <div
                                  className="section-indicator"
                                  style={{
                                    width: "3px",
                                    height: "calc(100% - 8px)",
                                    backgroundColor: "transparent",
                                    marginRight: "8px",
                                    transition: "background-color 0.2s ease",
                                    position: "absolute",
                                    left: "0",
                                    top: "4px",
                                    bottom: "4px",
                                    borderRadius: "0 2px 2px 0",
                                  }}
                                />
                                <span style={{ marginLeft: "8px" }}>
                                  Indefinitely
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        height: "24px",
                      }}
                    >
                      <Loader />
                    </span>
                  )}
                </div>
              )}
              {/* {(source=='guest') && (
                until_formatted === 'indefinitely' ? (
                  <p style={{ fontSize: "12px" }}>Indefinitely</p>
                ) : (
                  <p style={{ fontSize: "12px" }}>Until {until_formatted}</p>
                )
              } */}
              {/* Additional time selection dropdown if needed */}
              {/* {here setDuration code is available below} */}
              {/* {!toggleStatusLoading && curr_status && source=='property' && (
                <select className="select-dropdown" value={selectedOption} onChange={(e) => handleSelectChange(e, curr_status)}>
                  <option value="" disabled>Set duration</option>
                  <option value="15m">For 15 minutes</option>
                  <option value="1h">For 1 hour</option>
                  <option value="1d">For 24 hours</option>
                  <option value="indefinitely">Indefinitely</option>
                </select>
              )} */}{" "}
              {source == "guest1" && !toggleStatusLoading && (
                <div style={{ textAlign: "center" }}>
                  <a
                    style={{
                      fontSize: "14px",
                      color: "#0d6efd",
                      cursor: "pointer",
                      padding: "4px 8px",
                      marginTop: "8px",
                      display: "inline-block",
                    }}
                    onClick={handleRevertStatus}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleRevertStatus();
                      }
                    }}
                  >
                    Turn back {curr_status === "on" ? "off" : "on"}
                  </a>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="toggle">
            <p style={{ fontSize: "12px" }}>
              HostBuddy is{" "}
              <span style={{ color: "rgb(200,0,0)" }}>NOT RESPONDING</span> to
              this guest.
            </p>
            <p style={{ fontSize: "12px" }}>
              <Link to="/properties" style={{ fontSize: "14px" }}>
                Unlock
              </Link>{" "}
              this property to start responding.
            </p>
          </div>
        ))}{" "}
      {!(channel == "Chat Window") && (
        <div className="satisfy">
          <h2 style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "#ffffff" }}>Sentiment</h2>
          <div ref={dropdownRef} style={{ position: "relative" }}>
            {/* Sentiment Dropdown Button */}{" "}
            <div
              onClick={() =>
                !sentimentLoading && setDropdownOpen(!dropdownOpen)
              }
              onMouseDown={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === "positive") {
                  e.currentTarget.style.backgroundColor = "#002B0B";
                } else if (currentSentiment === "negative") {
                  e.currentTarget.style.backgroundColor = "#3B1900";
                } else {
                  e.currentTarget.style.backgroundColor =
                    "rgba(15, 17, 23, 0.6)";
                }
              }}
              onMouseUp={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === "positive") {
                  e.currentTarget.style.backgroundColor = "#014714";
                } else if (currentSentiment === "negative") {
                  e.currentTarget.style.backgroundColor = "#4D2100";
                } else {
                  e.currentTarget.style.backgroundColor =
                    "rgba(189, 193, 201, 0.08)";
                }
              }}
              onMouseEnter={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === "positive") {
                  e.currentTarget.style.backgroundColor = "#036920";
                } else if (currentSentiment === "negative") {
                  e.currentTarget.style.backgroundColor = "#7A3601"; // Same as default per specs
                } else if (currentSentiment === "clear") {
                  e.currentTarget.style.backgroundColor = "#393d46"; // Darker gray for hover
                } else {
                  e.currentTarget.style.backgroundColor =
                    "rgba(189, 193, 201, 0.08)"; // Same as default per specs
                }
              }}
              onMouseLeave={(e) => {
                const currentSentiment = selectedSentiment;
                if (currentSentiment === "positive") {
                  e.currentTarget.style.backgroundColor = "#014714";
                } else if (currentSentiment === "negative") {
                  e.currentTarget.style.backgroundColor = "#4D2100";
                } else if (currentSentiment === "clear") {
                  e.currentTarget.style.backgroundColor = "#24262E"; // Different color for clear
                } else {
                  e.currentTarget.style.backgroundColor =
                    "rgba(189, 193, 201, 0.08)";
                }
              }}
              style={{
                alignItems: "center",
                cursor: sentimentLoading ? "wait" : "pointer",
                pointerEvents: sentimentLoading ? "none" : "auto",
                alignSelf: "stretch",
                backgroundColor:
                  selectedSentiment === "positive"
                    ? "#014714"
                    : selectedSentiment === "negative"
                      ? "#4D2100"
                      : selectedSentiment === "clear"
                        ? "#24262E"
                        : "rgba(189, 193, 201, 0.08)",
                borderRadius: "4px",
                display: "flex",
                gap: "6px",
                height: "32px",
                padding: "0px 8px",
                position: "relative",
                width: "100%",
                marginLeft: "0px",
                transition: "background-color 0.2s ease",
                opacity: sentimentLoading ? 0.8 : 1,
              }}
            >
              {" "}
              {sentimentLoading ? (
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="spinner-border"
                    role="status"
                    style={{
                      width: "16px",
                      height: "16px",
                      borderWidth: "2px",
                      color:
                        selectedSentiment === "clear" ? "#A6A9B2" : "white",
                    }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <img
                  src={getSentimentIcon(selectedSentiment)}
                  alt="Sentiment Icon"
                  style={{ width: "18px", height: "18px" }}
                />
              )}
              <span
                style={{
                  color:
                    selectedSentiment === "neutral"
                      ? "#BBB"
                      : selectedSentiment === "clear"
                        ? "#A6A9B2"
                        : "white",
                  flexGrow: 1,
                  fontSize: "14px",
                }}
              >
                {sentimentLoading
                  ? "Updating..."
                  : selectedSentiment === "clear"
                    ? "No sentiment"
                    : selectedSentiment.charAt(0).toUpperCase() +
                    selectedSentiment.slice(1)}
              </span>
              <img
                src={ChevDownIcon}
                alt="Dropdown Icon"
                style={{
                  width: "16px",
                  height: "16px",
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s ease",
                  opacity: sentimentLoading ? 0.5 : 1,
                }}
              />
            </div>{" "}
            {/* Dropdown Menu */}
            {dropdownOpen && !sentimentLoading && (
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  right: "0",
                  backgroundColor: "var(--white-label-background-dropdown, #262730)",
                  borderRadius: "4px",
                  marginTop: "4px",
                  zIndex: 100,
                  border: "1px solid var(--white-label-border-primary, #24262E)",
                  overflow: "hidden",
                }}
              >
                {" "}
                {/* Neutral Option */}
                <div
                  onClick={() => handleSentimentSelect("neutral")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "rgba(62, 136, 247, 1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "transparent";
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                  }}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                    position: "relative",
                  }}
                >
                  {" "}
                  <div
                    className="section-indicator"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      backgroundColor: "transparent",
                      borderTopRightRadius: "2px",
                      borderBottomRightRadius: "2px",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                  <span style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB", fontSize: "14px" }}>
                    Neutral
                  </span>
                </div>{" "}
                {/* Positive Option */}
                <div
                  onClick={() => handleSentimentSelect("positive")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "rgba(62, 136, 247, 1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "transparent";
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                  }}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                    position: "relative",
                  }}
                >
                  {" "}
                  <div
                    className="section-indicator"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      backgroundColor: "transparent",
                      borderTopRightRadius: "2px",
                      borderBottomRightRadius: "2px",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                  <span style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB", fontSize: "14px" }}>
                    Positive
                  </span>
                </div>{" "}
                {/* Negative Option */}{" "}
                <div
                  onClick={() => handleSentimentSelect("negative")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "rgba(62, 136, 247, 1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "transparent";
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                  }}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                    position: "relative",
                  }}
                >
                  {" "}
                  <div
                    className="section-indicator"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      backgroundColor: "transparent",
                      borderTopRightRadius: "2px",
                      borderBottomRightRadius: "2px",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                  <span style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB", fontSize: "14px" }}>
                    Negative
                  </span>
                </div>{" "}
                {/* Clear Option */}
                <div
                  onClick={() => handleSentimentSelect("clear")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "rgba(62, 136, 247, 1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-dropdown').trim() || "transparent";
                    const indicator =
                      e.currentTarget.querySelector(".section-indicator");
                    if (indicator) {
                      indicator.style.backgroundColor = "transparent";
                    }
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(0, 19, 48, 1)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.backgroundColor =
                      getComputedStyle(document.documentElement).getPropertyValue('--white-label-background-hover').trim() || "rgba(1, 50, 128, 1)";
                  }}
                  style={{
                    padding: "8px 16px",
                    cursor: "pointer",
                    transition: "background-color 0.2s ease",
                    color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                    position: "relative",
                  }}
                >
                  {" "}
                  <div
                    className="section-indicator"
                    style={{
                      position: "absolute",
                      left: "0",
                      top: "8px",
                      bottom: "8px",
                      width: "3px",
                      backgroundColor: "transparent",
                      borderTopRightRadius: "2px",
                      borderBottomRightRadius: "2px",
                      transition: "background-color 0.2s ease",
                    }}
                  />
                  <span style={{ color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB", fontSize: "14px" }}>
                    Auto-detect
                  </span>
                </div>
              </div>
            )}
            {sentiment_justification && (
              <p
                style={{
                  fontSize: "14px",
                  marginTop: "3px",
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                  fontWeight: "400",
                  fontFamily: "DM Sans",
                }}
              >
                {sentiment_justification}
              </p>
            )}
          </div>
        </div>
      )}
      {!(channel == "Chat Window") && (
        <div
          style={{
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            margin: "10px auto",
            width: "100%",
            maxWidth: "400px",
          }}
        ></div>
      )}{" "}
      {/* render here the assign user  */}{" "}
      <div>
        <h2
          style={{
            margin: 0,
            marginBottom: "5px",
            color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "#ffffff",
            fontFamily: '"Poppins-SemiBold", Helvetica',
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19.6px",
          }}
        >
          Assign user
        </h2>
        <div
          className="user-dropdown-container"
          ref={assignUserDropdownRef}
          style={{ border: "1px solid var(--white-label-border-primary, #24262E)" }}
        >
          {/* Custom dropdown that looks like the sentiment dropdown */}
          <div
            className="user-dropdown-header"
            onClick={handleAssignUserDropdownOpen}
          >
            {" "}
            {/* Show combined users or placeholder */}
            {combinedUsers.length > 0 ? (
              <div className="user-tags-container">
                {combinedUsers.map((user) => (
                  <div key={user.id} className="user-tag">
                    <span className="user-tag-text">{user.name}</span>
                    <span
                      className="user-tag-close"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveUser(user.name);
                      }}
                    >
                      ×
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="user-dropdown-placeholder">Select</span>
            )}
            {/* Dropdown icon */}
            <img
              src={ChevDownIcon}
              alt="Dropdown Icon"
              className="user-dropdown-icon"
              style={{
                transform: assignUserDropdownOpen
                  ? "rotate(180deg)"
                  : "rotate(0)",
              }}
            />
          </div>

          {/* Dropdown menu */}
          {assignUserDropdownOpen && !subUserLoading && (
            <div className="user-dropdown-menu">
              {subUserNames &&
                subUserNames.map((user, index) => (
                  <div
                    key={index}
                    className={`user-dropdown-item ${combinedUsers.some(
                      (selected) =>
                        selected.name === user.display_name ||
                        selected.email === user.email
                    )
                        ? "user-dropdown-item-selected"
                        : ""
                      }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUserSelect(user);
                    }}
                  >
                    <span className="user-dropdown-item-text">
                      {user.display_name}
                    </span>
                    {combinedUsers.some(
                      (selected) =>
                        selected.name === user.display_name ||
                        selected.email === user.email
                    ) && <span className="user-dropdown-item-check">✓</span>}
                  </div>
                ))}
            </div>
          )}

          {/* Loading indicator */}
          {subUserLoading && (
            <div className="user-dropdown-loading">
              <span style={{ color: "white" }}>Loading...</span>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          margin: "10px auto",
          width: "100%",
          maxWidth: "400px",
        }}
      ></div>
      {!(channel == "Chat Window") && (
        <div className="issue">
          {" "}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0px",
            }}
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1
                style={{
                  margin: 0,
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "#ffffff",
                  fontFamily: '"Poppins-SemiBold", Helvetica',
                  fontSize: "14px",
                  fontWeight: 600,
                  letterSpacing: 0,
                  lineHeight: "19.6px",
                  whiteSpace: "nowrap",
                  position:
                    "relative" /* Using relative instead of fixed to maintain layout flow */,
                }}
              >
                Open Issues
              </h1>
              {action_items &&
                action_items.filter((obj) => obj.status === "incomplete")
                  .length > 0 && (
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#24262E",
                      color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      fontSize: "10px",
                      marginLeft: "8px",
                      fontWeight: "bold",
                      margin: "5px",
                    }}
                  >
                    {getIncompleteActionItems().length}
                  </span>
                )}
            </div>
            {/* View All link - always rendered and navigates to action items page */}
            <span
              onClick={navigateToActionItems}
              className="view-all-link"
            >
              View All
            </span>{" "}
          </div>{" "}
          {/* Use action_items from rightSectionData (guest specific) if available, otherwise fall back to actionItems state */}
          {getIncompleteActionItems().length > 0 ? (
            <>
              {/* Always display the first/latest issue with timestamp above */}
              <div style={{ marginBottom: "10px" }}>
                {" "}
                <div
                  style={{
                    fontSize: "12px",
                    color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#808080",
                    marginBottom: "2px",
                  }}
                >
                  {formatIssueTime(getIncompleteActionItems()[0]?.created_at)}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#d0d3db",
                      fontFamily: '"DM Sans-Regular", Helvetica',
                      fontSize: "14px",
                      fontWeight: 400,
                      letterSpacing: 0,
                      lineHeight: "normal",
                      position: "relative",
                      flex: "1",
                    }}
                  >
                    {" "}
                    {getIncompleteActionItems()[0]?.item}
                  </p>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      backgroundColor: "rgba(189, 193, 201, 0.08)",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      const firstIncompleteItem = getIncompleteActionItems()[0];
                      if (firstIncompleteItem && firstIncompleteItem.id) {
                        callCompleteActionItemApi(firstIncompleteItem.id);
                      }
                    }}
                  >
                    <img
                      src={CheckIconOpenIssue}
                      alt="Check icon"
                      style={{
                        width: "18px",
                        height: "18px",
                      }}
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Show remaining issues when expanded with timestamps above each */}
              {issuesExpanded && getIncompleteActionItems().length > 1 && (
                <div>
                  {getIncompleteActionItems()
                    .slice(1)
                    .map((obj, index) => (
                      <div key={index} style={{ marginBottom: "10px" }}>
                        {" "}
                        <div
                          style={{
                            fontSize: "12px",
                            color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2",
                            marginBottom: "2px",
                            fontWeight: 600,
                          }}
                        >
                          {formatIssueTime(obj.created_at)}
                        </div>{" "}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            justifyContent: "space-between",
                            width: "100%",
                          }}
                        >
                          {" "}
                          <p
                            style={{
                              margin: 0,
                              color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                              fontFamily: '"DM Sans-Regular", Helvetica',
                              fontSize: "14px",
                              fontWeight: 400,
                              letterSpacing: 0,
                              lineHeight: "normal",
                              position: "relative",
                              flex: "1",
                            }}
                          >
                            {obj.item}
                          </p>
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              backgroundColor: "rgba(189, 193, 201, 0.08)",
                              borderRadius: "4px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              cursor: "pointer",
                            }}
                            onClick={() => callCompleteActionItemApi(obj.id)}
                          >
                            <img
                              src={CheckIconOpenIssue}
                              alt="Check icon"
                              style={{
                                width: "18px",
                                height: "18px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}{" "}
              {/* Show "+X more issues" text (clickable to expand issues) */}
              {!issuesExpanded && getIncompleteActionItems().length > 1 && (
                <span
                  onClick={() => setIssuesExpanded(true)}
                  style={{
                    color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2",
                    fontFamily: '"DM Sans", Helvetica',
                    fontSize: "14px",
                    fontWeight: 400,
                    letterSpacing: 0,
                    lineHeight: "normal",
                    position:
                      "relative" /* Using relative instead of fixed to maintain proper layout */,
                    display: "block",
                    marginBottom: "10px",
                    width: "272px",
                    cursor: "pointer",
                  }}
                >
                  +{getIncompleteActionItems().length - 1} more{" "}
                  {getIncompleteActionItems().length - 1 === 1
                    ? "issue"
                    : "issues"}
                </span>
              )}{" "}
            </>
          ) : (
            <p
              style={{
                color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2",
                fontFamily: '"DM Sans", Helvetica',
                fontSize: "14px",
              }}
            >
              No action items for this guest
            </p>
          )}
        </div>
      )}
      {/* Contact Information Modal */}
      {contactModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setContactModalOpen(false)}
        >
          <div
            style={{
              width: "400px",
              backgroundColor: "#2B2E36",
              borderRadius: "4px", // Setting border radius to 4px as requested
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              border: "1px solid var(--white-label-border-primary, rgb(67, 70, 78))",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "#D0D3DB",
                  fontFamily: '"Poppins-SemiBold", Helvetica',
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                Contact information
              </h2>
              <span
                onClick={() => setContactModalOpen(false)}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2",
                }}
              >
                &times;
              </span>
            </div>

            {/* Form Fields - Making email and phone labels appear horizontally */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "20px" }}
              >
                {/* Email Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email === "not added" ? "" : contactInfo.email}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, email: e.target.value || "not added" })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid var(--white-label-border-primary, #393d46)",
                      borderRadius: "4px",
                      color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>

                {/* Phone Field */}
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      // marginBottom: '5px',
                      fontSize: "14px",
                      color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#A6A9B2", // Setting label color as requested
                    }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone === "not added" ? "" : contactInfo.phone}
                    onChange={(e) =>
                      setContactInfo({ ...contactInfo, phone: e.target.value || "not added" })
                    }
                    style={{
                      width: "100%",
                      padding: "8px",
                      backgroundColor: "#24262E",
                      border: "1px solid var(--white-label-border-primary, #393d46)",
                      borderRadius: "4px",
                      color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB", // Setting input text color as requested
                      fontSize: "14px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              {" "}
              <button
                onClick={() => setContactModalOpen(false)}
                style={{
                  padding: "8px 16px",
                  border: "none",
                  backgroundColor: "transparent",
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-secondary').trim() || "#D0D3DB",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                Cancel
              </button>
              <button
                onClick={callUpdateGuestDataApi}
                disabled={updateGuestDataLoading}
                style={{
                  padding: "8px 8px",
                  border: "none",
                  backgroundColor: updateGuestDataLoading
                    ? "#4A5568"
                    : "#0B5FDE",
                  color: getComputedStyle(document.documentElement).getPropertyValue('--white-label-text-primary').trim() || "#ffffff",
                  borderRadius: "4px",
                  cursor: updateGuestDataLoading ? "not-allowed" : "pointer",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: "60px",
                }}
              >
                {updateGuestDataLoading ? <Loader /> : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSection;
