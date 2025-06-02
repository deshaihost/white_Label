import React, { useState, useEffect, useRef } from "react";
import {
  callGetConversationsApi,
  callGetSingleConversationApi,
} from "../../../../helper/getConversationsTest/inboxApi";
import { callPinConversationApi } from "../../../../helper/getConversationsTest/pinConversationApi";
import { InboxLoader } from "../../../../helper/Loader";
import LeftMessage from "./leftMessage/LeftMessage";
import MildeSection from "./mildeSection/MildeSection";
import WhatsAppSection from "./mildeSection/WhatsAppSection"; // Import WhatsApp Section
import RightSection from "./rightSection/RightSection";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "./inboxIndex.css";
import { timeFormat } from "../../../../helper/commonFun";

// Import the SVG icons
import PmsIcon from "./mildeSection/message/icons/pms_icon.svg";
import WhatsappIcon from "./mildeSection/message/icons/whatsapp_icon.svg";
import OpenIssueIcon from "./mildeSection/message/icons/openIssue_icon.svg";
import NotesIcon from "./mildeSection/message/icons/notes_icon.svg";
import CheckBoxIcon from "./mildeSection/message/icons/check_box.svg";
import DefaultPinIcon from "./mildeSection/message/icons/default_pin.svg";
import SelectedPinIcon from "./mildeSection/message/icons/selected_pin.svg";
import UrgentFlagIcon from "./mildeSection/message/icons/urgent_flag_middle.svg";

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 991px) {
    .inbox-content-container {
      width: 105% !important;
    }
  }
  
  @media (min-width: 992px) {
    /* Fixed left bar width for desktop view regardless of sidebar state */
    .left-bar {
      min-width: 368px !important;
      max-width: 384px !important;
      width: 368px !important;
    }
    
    /* Fixed middle section width for desktop with responsive scaling */
    .middleSectionContainer {
      min-width: 384px !important;
      flex: 1 !important;
      width: auto !important;
    }
    
    /* Fixed right section width for desktop */
    .rightSectionContainer {
      width: 296px !important;
      flex: none !important;
    }
  }
  
  /* Medium screen responsive design (1100px - 1279px) */
  @media (min-width: 1100px) and (max-width: 1279px) {
    .left-bar {
      width: 368px !important;
      min-width: 368px !important;
      max-width: 368px !important;
      flex: none !important;
    }
    
    .middleSectionContainer {
      min-width: 492px !important;
      flex: 1 !important;
      width: auto !important;
    }
    
    .rightSectionContainer {
      width: 296px !important;
      min-width: 296px !important;
      max-width: 296px !important;
      flex: none !important;
      position: absolute !important;
      right: 11px !important;
      top: 0 !important;
      height: 100% !important;
      z-index: 1000 !important;
      background-color: #17191F !important;
      border: 1px solid #24262E !important;
      border-radius: 4px !important;
      transition: all 0.3s ease !important;
    }
    
    .rightSectionContainer.hidden {
      display: none !important;
    }
    
    .middleSectionContainer.with-right-panel {
      margin-right: 0px !important;
    }
    
    .close-right-section {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      background: none !important;
      border: none !important;
      color: #FFFFFF !important;
      font-size: 20px !important;
      cursor: pointer !important;
      z-index: 1001 !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 4px !important;
      transition: background-color 0.2s ease !important;
    }
      .close-right-section:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
    /* Large screen responsive design (1280px - 1599px) */
  @media (min-width: 1280px) and (max-width: 1599px) {
    .left-bar {
      width: 368px !important;
      min-width: 368px !important;
      max-width: 368px !important;
      flex: none !important;
    }
    
    .middleSectionContainer {
      min-width: 376px !important;
      flex: 1 !important;
      width: auto !important;
      transition: all 0.3s ease !important;
    }
    
    .rightSectionContainer {
      width: 296px !important;
      min-width: 296px !important;
      max-width: 296px !important;
      flex: none !important;
      position: relative !important;
      height: 100% !important;
      background-color: #17191F !important;
      border: 1px solid #24262E !important;
      border-radius: 4px !important;
      transition: all 0.3s ease !important;
    }
    
    .rightSectionContainer.hidden {
      display: none !important;
    }
    
    .close-right-section {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      background: none !important;
      border: none !important;
      color: #FFFFFF !important;
      font-size: 20px !important;
      cursor: pointer !important;
      z-index: 1001 !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 4px !important;
      transition: background-color 0.2s ease !important;
    }
      .close-right-section:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  /* Extra large screen responsive design (1600px and above) */
  @media (min-width: 1600px) {
    .left-bar {
      width: 400px !important;
      min-width: 400px !important;
      max-width: 400px !important;
      flex: none !important;
    }
    
    .middleSectionContainer {
      min-width: 376px !important;
      flex: 1 !important;
      width: auto !important;
      transition: all 0.3s ease !important;
    }
    
    .rightSectionContainer {
      width: 320px !important;
      min-width: 320px !important;
      max-width: 320px !important;
      flex: none !important;
      position: relative !important;
      height: 100% !important;
      background-color: #17191F !important;
      border: 1px solid #24262E !important;
      border-radius: 4px !important;
      transition: all 0.3s ease !important;
    }
    
    .rightSectionContainer.hidden {
      display: none !important;
    }
    
    .close-right-section {
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      background: none !important;
      border: none !important;
      color: #FFFFFF !important;
      font-size: 20px !important;
      cursor: pointer !important;
      z-index: 1001 !important;
      width: 24px !important;
      height: 24px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 4px !important;
      transition: background-color 0.2s ease !important;
    }
    
    .close-right-section:hover {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
  }
  
  /* Notes textarea placeholder color */
  .notes-textarea::placeholder {
    color: #676A73 !important;
  }
  
  /* Pin icon styles */
  .pin-icon-container {
    transition: background-color 0.2s ease, box-shadow 0.2s ease;
  }
  
  .pin-icon-container:hover {
    background-color: rgba(189, 193, 201, 0.15) !important;
  }
  
  .pin-icon-container:active {
    background-color: rgba(15, 17, 23, 0.08) !important;
  }
`;

const Inbox = ({
  allPropertyNamesList,
  allGuestNamesList,
  userHasPMS,
  subscriptionPlan,
  accountAgeDays,
  singleConversationIdFromUrl,
}) => {
  const navigate = useNavigate();
  const eliteFeaturesAvailable =
    /elite|works/i.test(subscriptionPlan) || subscriptionPlan === "trial"; // Changed == to === for strict equality
  const [conversations, setConversations] = useState([]); // All conversations to be displayed; array of objs
  const [selectedConversation, setSelectedConversation] = useState({}); // The single selected conversation; obj. Messages are under the key 'messages'
  const [conversationCache, setConversationCache] = useState(new Map()); // Cache to store full conversation details by conversation_id
  const [conversationsNotYetFetched, setConversationsNotYetFetched] =
    useState(true);
  const [urgentFilterIsEnabled, setUrgentFilterIsEnabled] = useState(false);
  const [propertyFilterVal, setPropertyFilterVal] = useState("");
  const [phaseFilterVal, setPhaseFilterVal] = useState("");
  const [fromHostBuddyFilterVal, setFromHostBuddyFilterVal] = useState(false);
  const [guestNameSearchVal, setGuestNameSearchVal] = useState("");
  const [currentView, setCurrentView] = useState("conversations"); // New state for mobile view
  const [activeTab, setActiveTab] = useState("pms"); // New state to track active tab
  const [pendingTabChange, setPendingTabChange] = useState(null); // To track pending tab change when switching views
  const [allowConvIdQuery, setAllowConvIdQuery] = useState(true); // Added state for handling conversationId query
  const [rightSectionVisible, setRightSectionVisible] = useState(false); // State for right section visibility in medium screens
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
  const [sidebarClicked, setSidebarClicked] = useState(true); // Track if sidebar was clicked vs hovered
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width for responsive design
  console.log("selectedConversation from  inbox", selectedConversation);
  // State for tracking pin status
  const [isPinned, setIsPinned] = useState(false);

  // Function to handle pin/unpin action
  const handlePinToggle = async () => {
    if (!selectedConversation?.conversation_id) return;

    try {
      const result = await callPinConversationApi(
        selectedConversation.conversation_id,
        !isPinned
      );

      if (result && !result.error) {
        // API response format: { "message": "Conversation pin status set", "pinned": true|false }
        setIsPinned(result.pinned);
        ToastHandle(
          result.message ||
            `Conversation ${result.pinned ? "pinned" : "unpinned"}`,
          "success"
        );

        // Update the selected conversation object to include the pinned state
        if (selectedConversation) {
          const updatedConversation = {
            ...selectedConversation,
            pinned: result.pinned,
            is_pinned: result.pinned, // For backward compatibility
          };
          setSelectedConversation({
            ...updatedConversation,
            _apiCallMade: true, // Preserve the API call flag
          });          // Update the conversation in the conversations list too
          setConversations((prev) =>
            prev.map((convo) =>
              convo.conversation_id === selectedConversation.conversation_id
                ? { ...convo, pinned: result.pinned, is_pinned: result.pinned }
                : convo
            )
          );
        }
      }
    } catch (error) {
      ToastHandle("Error updating pin status", "danger");
    }
  };
  // Update isPinned state when selected conversation changes
  useEffect(() => {
    if (selectedConversation?.conversation_id) {
      // Get the initial pin status from the conversation object
      const currentPinStatus = !!(
        selectedConversation?.pinned || selectedConversation?.is_pinned
      );
      setIsPinned(currentPinStatus);

      // Track if this conversation ID has been processed to prevent multiple API calls
      const conversationId = selectedConversation.conversation_id;
      const isNewConversationSelection =
        selectedConversation._apiCallMade !== true;      // Only fetch conversation data if this is a new selection
      if (isNewConversationSelection) {
        // Enhanced cache-first strategy: Check multiple sources for complete conversation data
        
        // First, check if we have comprehensive cached data from periodic updates
        const cachedConversation = conversationCache.get(conversationId);
        if (cachedConversation && cachedConversation._has_complete_data) {
          console.log("Using comprehensive cached conversation data from periodic updates for:", conversationId);
          
          // Update pin status based on cached data
          const isPinnedValue = !!(
            cachedConversation.pinned || cachedConversation.is_pinned
          );
          setIsPinned(isPinnedValue);

          // Use the cached data immediately
          setSelectedConversation({
            ...cachedConversation,
            pinned: isPinnedValue,
            is_pinned: isPinnedValue, // For backward compatibility
            _apiCallMade: true, // Mark that we've loaded the data
          });
          return; // Exit early since we have comprehensive cached data
        }

        // Second, check if the selected conversation already has complete message data from the conversations array
        const hasCompleteMessageData = selectedConversation.messages && 
          Array.isArray(selectedConversation.messages) && 
          selectedConversation.messages.length > 0 &&
          selectedConversation.messages.every(msg => msg.sender && msg.text && msg.time);

        if (hasCompleteMessageData) {
          // Use the existing conversation data from the conversations array
          console.log("Using complete conversation data from conversations array for:", conversationId);
          
          // Cache this conversation data for future use
          setConversationCache(prevCache => {
            const newCache = new Map(prevCache);
            newCache.set(conversationId, {
              ...selectedConversation,
              _cached_at: Date.now(),
              _has_complete_data: true,
              _from_conversations_array: true
            });
            return newCache;
          });

          // Mark as processed and update the conversation object
          setSelectedConversation(prev => ({
            ...prev,
            _apiCallMade: true, // Mark that we've processed this conversation
          }));
          return; // Exit early since we have complete data
        }        const fetchLatestConversationData = async () => {
          try {
            // Third fallback: check if we have any cached data for this conversation (even if not complete)
            const cachedConversation = conversationCache.get(conversationId);
            
            if (cachedConversation) {
              // Use cached data instead of making API call, even if it's not marked as complete
              console.log("Using fallback cached conversation data for:", conversationId);
              
              // Update pin status based on cached data
              const isPinnedValue = !!(
                cachedConversation.pinned || cachedConversation.is_pinned
              );
              setIsPinned(isPinnedValue);

              // Update the conversation object with cached data
              setSelectedConversation({
                ...cachedConversation,
                pinned: isPinnedValue,
                is_pinned: isPinnedValue, // For backward compatibility
                _apiCallMade: true, // Mark that we've loaded the data
              });
              return; // Exit early since we used cached data
            }

            // Mark that we've started processing this conversation
            setSelectedConversation((prev) => ({
              ...prev,
              _apiCallMade: true,
            }));            // Only call API if we don't have cached data
            console.log("No cached data found, making API call for:", conversationId);
            const result = await callGetSingleConversationApi(conversationId);

            if (
              result &&
              !result.error &&
              result.conversations &&
              result.conversations.length > 0
            ) {
              const updatedConversation = result.conversations[0];

              // Enhanced cache update: Mark this as complete data from API
              setConversationCache(prevCache => {
                const newCache = new Map(prevCache);
                newCache.set(conversationId, {
                  ...updatedConversation,
                  _cached_at: Date.now(),
                  _has_complete_data: true,
                  _from_api_call: true
                });
                return newCache;
              });

              // Update pin status based on the API response
              const isPinnedValue = !!(
                updatedConversation.pinned || updatedConversation.is_pinned
              );
              setIsPinned(isPinnedValue);

              // Update the conversation object with the latest data from the API
              setSelectedConversation({
                ...updatedConversation,
                pinned: isPinnedValue,
                is_pinned: isPinnedValue, // For backward compatibility
                _apiCallMade: true, // Mark that we've made the API call
              });
            }
          } catch (error) {
            console.error("Error fetching conversation data:", error);
          }
        };

        fetchLatestConversationData();
      }
    } else {
      // No conversation selected, reset pin status
      setIsPinned(false);
    }
  }, [selectedConversation?.conversation_id]); // Only re-run when the conversation ID changes

  // Update the sidebar state when it changes from NavBarContainer
  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setSidebarOpen(event.detail.open);
      // Only update clicked state if it was explicitly provided
      if (event.detail.clicked !== undefined) {
        setSidebarClicked(event.detail.clicked);
      }
    };

    // Add event listener for sidebar state changes
    document.addEventListener("sidebarStateChanged", handleSidebarStateChange);

    // Initial sidebar state check
    if (window.getSidebarState) {
      const state = window.getSidebarState();
      setSidebarOpen(state.open);
      setSidebarClicked(
        state.clicked !== undefined ? state.clicked : state.open
      );
    }

    return () => {
      document.removeEventListener(
        "sidebarStateChanged",
        handleSidebarStateChange
      );
    };
  }, []);

  // Update currentConversationIdRef when selectedConversation changes
  useEffect(() => {
    if (selectedConversation?.conversation_id) {
      currentConversationIdRef.current = selectedConversation.conversation_id;
    }
  }, [selectedConversation?.conversation_id]);
  // State for unread messages counts
  const [unreadPmsCount, setUnreadPmsCount] = useState(0);
  const [unreadWhatsAppCount, setUnreadWhatsAppCount] = useState(0);

  // Calculate unread messages counts when selected conversation changes
  useEffect(() => {
    // Count unread PMS messages only for the selected conversation
    if (selectedConversation && selectedConversation.messages) {
      const unreadCount = selectedConversation.messages.filter(
        (msg) => !msg.read
      ).length;
      setUnreadPmsCount(unreadCount);
    } else {
      setUnreadPmsCount(0);
    }

    // Count unread WhatsApp messages if they exist
    if (selectedConversation && selectedConversation.whatsapp_messages) {
      const unreadWhatsAppCount = selectedConversation.whatsapp_messages.filter(
        (msg) => !msg.read
      ).length;
      setUnreadWhatsAppCount(unreadWhatsAppCount);
    } else {
      setUnreadWhatsAppCount(0);
    }
  }, [selectedConversation]); // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState(null);
  const [visibleToHostbuddy, setVisibleToHostbuddy] = useState(false);

  // Keep the current conversation ID reference for context tracking
  const currentConversationIdRef = useRef("");

  // State for tracking which note's dropdown is currently open
  const [openDropdownId, setOpenDropdownId] = useState(null);
  // State for currently editing note
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [isEditNoteModalOpen, setIsEditNoteModalOpen] = useState(false);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [editingNoteVisibleToHostbuddy, setEditingNoteVisibleToHostbuddy] =
    useState(false);

  // Handle pending tab changes when view changes
  useEffect(() => {
    // If we have a pending tab change and we're in the messages view, apply it
    if (pendingTabChange && currentView === "messages") {
      setActiveTab(pendingTabChange);
      setPendingTabChange(null); // Clear the pending change
    }
  }, [currentView, pendingTabChange]);

  // Handle dropdown toggle
  const toggleDropdown = (noteId) => {
    if (openDropdownId === noteId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(noteId);
    }
  }; // Function to call the API to get notes
  const callGetNotesApi = async () => {
    if (!selectedConversation?.conversation_id) return;

    const conversation_id = selectedConversation.conversation_id;
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setIsLoadingNotes(true);

    try {
      const config = {
        headers: {
          "X-API-Key": API_KEY,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      // Use conversation_id as a URL query parameter
      const url = `${baseUrl}/get_notes?conversation_id=${encodeURIComponent(
        conversation_id
      )}`;
      const response = await axios.get(url, config);

      if (response.status === 200) {
        setNotes(response.data.notes || []);
      } else {
        ToastHandle(response?.data?.error || "Failed to fetch notes", "danger");
      }
    } catch (error) {
      ToastHandle("Error - unable to get notes", "danger");
    } finally {
      setIsLoadingNotes(false);
    }
  }; // Function to call the API to add a note
  const callAddNoteApi = async (noteText) => {
    if (!selectedConversation?.conversation_id || !noteText.trim()) return;

    const conversation_id = selectedConversation.conversation_id;
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: {
          "X-API-Key": API_KEY,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };
      // According to the API documentation pattern, include conversation_id in the request body
      const bodyData = {
        note: noteText,
        conversation_id: conversation_id,
        visible_to_hostbuddy: visibleToHostbuddy,
      };

      const response = await axios.post(
        `${baseUrl}/add_note`,
        bodyData,
        config
      );

      if (response.status === 200) {
        // Refresh the notes list
        callGetNotesApi();
        setNewNote(""); // Clear the input field
        ToastHandle("Note added successfully", "success");
      } else {
        ToastHandle(response?.data?.error || "Failed to add note", "danger");
      }
    } catch (error) {
      ToastHandle("Error adding note", "danger");
    }
  };

  // Function to call the API to delete a note
  const callDeleteNoteApi = async (noteId) => {
    if (!noteId || !selectedConversation?.conversation_id) return;

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    setDeletingNoteId(noteId);

    try {
      const config = {
        headers: {
          "X-API-Key": API_KEY,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      // According to the API documentation pattern, include data in the request body
      const bodyData = {
        note_id: noteId,
        conversation_id: selectedConversation.conversation_id,
      };

      // For DELETE requests with a body, we need to use the data property in the config
      const response = await axios.delete(`${baseUrl}/delete_note`, {
        ...config,
        data: bodyData,
      });

      if (response.status === 200) {
        // Remove the deleted note from the state
        setNotes(notes.filter((note) => note.note_id !== noteId));
        ToastHandle("Note deleted successfully", "success");
      } else {
        ToastHandle(response?.data?.error || "Failed to delete note", "danger");
      }
    } catch (error) {
      ToastHandle("Error deleting note", "danger");
    } finally {
      setDeletingNoteId(null);
    }
  };
  // Function to call the API to update/edit a note
  const callUpdateNoteApi = async (noteId, noteText, visibleToHostbuddy) => {
    if (!noteId || !noteText.trim()) return;

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: {
          "X-API-Key": API_KEY,
        },
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        },
      };

      // According to the API documentation for PUT /edit_note
      const bodyData = {
        note_id: noteId,
        note: noteText,
        visible_to_hostbuddy: visibleToHostbuddy,
      };

      const response = await axios.put(
        `${baseUrl}/edit_note`,
        bodyData,
        config
      );

      if (response.status === 200) {
        // Update the note in the local state
        const updatedNotes = notes.map((note) =>
          note.note_id === noteId
            ? {
                ...note,
                note: noteText,
                visible_to_hostbuddy: visibleToHostbuddy,
              }
            : note
        );
        setNotes(updatedNotes);

        // Clear the editing state
        setEditingNoteId(null);
        setNewNote("");
        setIsEditNoteModalOpen(false);

        ToastHandle("Note updated successfully", "success");
      } else {
        ToastHandle(response?.data?.error || "Failed to update note", "danger");
      }
    } catch (error) {
      ToastHandle("Error updating note", "danger");
    }
  };

  // Action items state to display in the Open Issues tab
  const [filteredActionItems, setFilteredActionItems] = useState([]);
  const [isLoadingActionItems, setIsLoadingActionItems] = useState(false);

  // Update action items when selectedConversation changes
  useEffect(() => {
    // Only proceed if we have a valid conversation with a conversation_id
    if (selectedConversation && selectedConversation.conversation_id) {
      setIsLoadingActionItems(true);

      // Check if the selected conversation has action_items
      if (
        selectedConversation.action_items &&
        Array.isArray(selectedConversation.action_items)
      ) {
        // Filter for incomplete items if needed
        const incompleteItems = selectedConversation.action_items.filter(
          (item) => item.status === "incomplete"
        );
        setFilteredActionItems(incompleteItems);
        setIsLoadingActionItems(false);
      } else {
        // If no action_items in the conversation data, set empty array
        setFilteredActionItems([]);
        setIsLoadingActionItems(false);
      }
    } else {
      // No conversation selected, clear the action items
      setFilteredActionItems([]);
      setIsLoadingActionItems(false);
    }
  }, [selectedConversation]);
  // This function is deprecated - we now get action items directly from the selected conversation
  // Using the function will log a warning and do nothing
  const callGetActionItemsApi = async () => {
    console.warn(
      "callGetActionItemsApi is deprecated - action items should be fetched from the selected conversation"
    );
    return { error: "Deprecated function" };
  };

  // Function to call the API to mark an action item as complete
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
        // Remove the completed action item from the filteredActionItems state
        setFilteredActionItems(
          filteredActionItems.filter((item) => item.id !== actionItemId)
        );

        // Update the action_items in the selectedConversation if this action item belongs to it
        if (selectedConversation && selectedConversation.action_items) {
          // Create a new action_items array with the completed item marked as "completed"
          const updatedActionItems = selectedConversation.action_items.map(
            (item) => {
              if (item.id === actionItemId) {
                return { ...item, status: "completed" };
              }
              return item;
            }
          );
          // Update the selectedConversation state with the modified action_items
          setSelectedConversation({
            ...selectedConversation,
            action_items: updatedActionItems,
            _apiCallMade: selectedConversation._apiCallMade, // Preserve the API call flag
          });

          // Also update the conversation in the conversations list if needed
          if (conversations && conversations.length > 0) {
            const updatedConversations = conversations.map((convo) => {
              if (
                convo.conversation_id === selectedConversation.conversation_id
              ) {
                return {
                  ...convo,
                  action_items: updatedActionItems,
                };
              }
              return convo;
            });
            setConversations(updatedConversations);
          }
        }

        ToastHandle("Action item marked as completed", "success");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      return response.data;
    } catch (error) {
      ToastHandle("Error completing action item", "danger");
    }
  }; // No need to fetch global action items when the component mounts
  // since we're now showing conversation-specific action items
  // When the activeTab changes to 'openIssue', ensure we have the latest action items from the selected conversation only
  useEffect(() => {
    if (
      activeTab === "openIssue" &&
      selectedConversation &&
      selectedConversation.conversation_id
    ) {
      setIsLoadingActionItems(true);

      // If we already have the conversation data, just filter its action items
      if (
        selectedConversation.action_items &&
        Array.isArray(selectedConversation.action_items)
      ) {
        // Only use action items from the selected conversation
        const incompleteItems = selectedConversation.action_items.filter(
          (item) => item.status === "incomplete"
        );
        setFilteredActionItems(incompleteItems);
        setIsLoadingActionItems(false);
      } else {
        // If the conversation doesn't have action_items, try to refresh the conversation data
        updateConversation(selectedConversation.conversation_id)
          .then(() => setIsLoadingActionItems(false))
          .catch(() => setIsLoadingActionItems(false));
      }
    }
  }, [activeTab, selectedConversation?.conversation_id]);

  // Load notes when the selected conversation changes, regardless of active tab
  useEffect(() => {
    if (selectedConversation?.conversation_id) {
      callGetNotesApi();
    }
  }, [selectedConversation?.conversation_id]);

  // Refresh notes when the tab changes to 'notes'
  useEffect(() => {
    if (activeTab === "notes" && selectedConversation?.conversation_id) {
      callGetNotesApi();
    }
  }, [activeTab, selectedConversation?.conversation_id]);

  // Get the conversations we already have in the format needed to send to the API: { conversationId1: { last_message_time:<last_message_time_utc> }, ... }
  const getConversationsAlreadyHave = () => {
    if (conversations) {
      return conversations.reduce((acc, conversation) => {
        acc[conversation.conversation_id] = {
          last_message_time: conversation.last_message_time_utc,
        };
        return acc;
      }, {});
    } else {
      return {};
    }
  };
  // Call the API to get conversations, up to the specified limit, and update the state with the returned data.
  const fetchConversations = async (
    limit,
    reset = false,
    urgent = false,
    propertyName = "",
    phase = "",
    meetHbOnly = false,
    guestName = "",
    useConvIdQuery = true
  ) => {
    let conversationsAlreadyHave = {};
    if (reset) {
      // Clear conversations state
      conversationsAlreadyHave = {};
      setConversations([]);
    } else {
      // Tell the API which conversations we already have, so we don't need to get them again if they haven't been updated
      conversationsAlreadyHave = getConversationsAlreadyHave();
    }
    const conversationId = useConvIdQuery
      ? singleConversationIdFromUrl || null
      : null;

    // Use the simplified API without request ID tracking and AbortController
    const data = await callGetConversationsApi(
      limit,
      conversationsAlreadyHave,
      urgent,
      propertyName,
      phase,
      meetHbOnly,
      guestName,
      conversationId
    );

    if (data?.conversations) {
      updateConversationsWithApiData(data.conversations);
    }
    setConversationsNotYetFetched(false);
  };

  // Sort the conversations array by the most recent message (conversation.messages[-1].time ; format MM/DD/YYYY HH:MM:SS)
  const sortConversationsByMostRecentMessage = (conversations) => {
    return conversations.sort((a, b) => {
      const timeA = new Date(a.messages[a.messages.length - 1].time);
      const timeB = new Date(a.messages[a.messages.length - 1].time);
      return timeB - timeA; // Sort in descending order
    });
  };  // Given a conversation ID: fetch that convo from the API and update that conversation in the state
  const updateConversation = async (conversationId) => {
    try {
      // Check if this is the currently selected conversation that's already been loaded
      if (
        selectedConversation?.conversation_id === conversationId &&
        selectedConversation._apiCallMade
      ) {
        console.log(
          "Skipping duplicate API call for already loaded conversation"
        );
        return; // Skip duplicate API call
      }

      // Use the simplified API function without passing request ID or reference
      const updatedConversationData = await callGetSingleConversationApi(
        conversationId
      );
      console.log(
        "Updated conversation data:",
        updatedConversationData.conversations[0].messages[0]
      );
      if (
        updatedConversationData?.conversations &&
        updatedConversationData.conversations.length > 0
      ) {
        const retrievedConversation = {
          ...updatedConversationData.conversations[0],
          _apiCallMade: true, // Mark as loaded
          _isUpdate: selectedConversation?.conversation_id === conversationId, // Flag to indicate this is an update, not a new selection
        };        // Cache the updated conversation data with enhanced metadata
        setConversationCache(prevCache => {
          const newCache = new Map(prevCache);
          newCache.set(conversationId, {
            ...retrievedConversation,
            _cached_at: Date.now(),
            _has_complete_data: true,
            _from_update_api: true
          });
          return newCache;
        });

        let updatedConversations = conversations.map((conversation) => {
          if (conversation.conversation_id === conversationId) {
            return retrievedConversation;
          }
          return conversation;
        });
        updatedConversations =
          sortConversationsByMostRecentMessage(updatedConversations);
        setConversations(updatedConversations);

        // If the conversation to be updated is selectedConversation (the one currently being viewed), update that too
        if (selectedConversation.conversation_id === conversationId) {
          setSelectedConversation(retrievedConversation);
        }
      }
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };  // Update our conversation state with a new list returned by the API. This does NOT call the API: it takes the API data as a parameter. Also handles detecting when there are no updates from the API and making sure the previous state gets copied over.
  const updateConversationsWithApiData = (apiConversationData) => {
    let newConversationState = apiConversationData.map((conversation) => {
      const conversationId = conversation["conversation_id"];
      if (!conversation.hasOwnProperty("messages")) {
        // the API data doesn't include messages (or most other fields) for conversations we already have if there are no updates. Get the convo ID, find the convo in our local state, and copy that old record over into the new state
        const localConversation = conversations.find(
          (conv) => conv.conversation_id === conversationId
        );
        return localConversation ? localConversation : conversation;
      } else {
        // Enhanced cache population: Store complete conversation data with comprehensive message details
        // This ensures we have full data available for immediate use when users click on conversations
        const hasCompleteMessageData = conversation.messages && 
          Array.isArray(conversation.messages) && 
          conversation.messages.length > 0 &&
          conversation.messages.every(msg => msg.sender && msg.text && msg.time);

        if (hasCompleteMessageData) {
          // Cache the full conversation details when we have complete data
          setConversationCache(prevCache => {
            const newCache = new Map(prevCache);
            newCache.set(conversationId, {
              ...conversation,
              _cached_at: Date.now(), // Track when this was cached
              _has_complete_data: true, // Flag to indicate this has complete message data
              _from_periodic_update: true // Flag to indicate this came from periodic update
            });
            return newCache;
          });
        }

        if (selectedConversation.conversation_id === conversationId) {
          // If this updated conversation record is the one currently being viewed, update the selectedConversation state
          setSelectedConversation({
            ...conversation,
            _apiCallMade: true, // Preserve the flag showing API data is up to date
          });
        }
        return conversation;
      }
    });
    setConversations(newConversationState);
  };
  // Cache management functions
  const invalidateConversationCache = (conversationId) => {
    setConversationCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.delete(conversationId);
      return newCache;
    });
  };

  const getCachedConversation = (conversationId) => {
    return conversationCache.get(conversationId);
  };

  const updateConversationInCache = (conversationId, conversationData) => {
    setConversationCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.set(conversationId, {
        ...conversationData,
        _cached_at: Date.now(),
        _has_complete_data: conversationData.messages && 
          Array.isArray(conversationData.messages) && 
          conversationData.messages.length > 0 &&
          conversationData.messages.every(msg => msg.sender && msg.text && msg.time)
      });
      return newCache;
    });
  };
  // Clean up old cache entries (older than 10 minutes) to prevent memory leaks
  const cleanupOldCacheEntries = () => {
    const maxAge = 10 * 60 * 1000; // 10 minutes in milliseconds
    const now = Date.now();
    
    setConversationCache(prevCache => {
      const newCache = new Map();
      let removedCount = 0;
      for (const [key, value] of prevCache.entries()) {
        if (value._cached_at && (now - value._cached_at) < maxAge) {
          newCache.set(key, value);
        } else {
          removedCount++;
        }
      }
      if (removedCount > 0) {
        console.log(`Cache cleanup: Removed ${removedCount} old entries, ${newCache.size} entries remaining`);
      }
      return newCache;
    });
  };
  // Run cache cleanup every 5 minutes
  useEffect(() => {
    const cleanupInterval = setInterval(cleanupOldCacheEntries, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(cleanupInterval);
  }, []);

  // Debug function to log cache statistics (can be called from browser console)
  window.logCacheStats = () => {
    console.log(`Conversation Cache Statistics:
      - Total cached conversations: ${conversationCache.size}
      - Conversations with complete data: ${[...conversationCache.values()].filter(c => c._has_complete_data).length}
      - Cache sources breakdown:
        * From periodic updates: ${[...conversationCache.values()].filter(c => c._from_periodic_update).length}
        * From API calls: ${[...conversationCache.values()].filter(c => c._from_api_call).length}
        * From conversations array: ${[...conversationCache.values()].filter(c => c._from_conversations_array).length}
        * From update API: ${[...conversationCache.values()].filter(c => c._from_update_api).length}
    `);
  };
  // Add a message to a conversation in our local record (conversations)
  const addMessageToLocalConversation = (conversationId, message) => {
    // Invalidate cache when a new message is added
    invalidateConversationCache(conversationId);
    
    // Update the covnersation in covnersations
    const updatedConversations = conversations.map((conversation) => {
      if (conversation.conversation_id === conversationId) {
        conversation.messages.push(message);
      }
      return conversation;
    });
    setConversations(updatedConversations);
    // If the conversation to be updated is selectedConversation (the one currently being viewed), update it
    if (selectedConversation.conversation_id === conversationId) {
      setSelectedConversation((prevSelectedConversation) => {
        return {
          ...prevSelectedConversation,
          messages: [...prevSelectedConversation.messages, message],
          _apiCallMade: prevSelectedConversation._apiCallMade, // Preserve the API call flag
        };
      });
    }
  };

  // Fetch the first batch of conversations on page load
  useEffect(() => {
    fetchConversations(10);
  }, []);

  // Fetch conversations to keep the page up-to-date (every 10s for new accounts, every 20s for elite users)
  useEffect(() => {
    const isNewAccount =
      typeof accountAgeDays === "number" && accountAgeDays < 4;    if (isNewAccount || eliteFeaturesAvailable) {
      const intervalId = setInterval(
        () => {
          const num_existing_convos = conversations.length;
          const num_convos_to_fetch = Math.max(num_existing_convos, 2); // always fetch at least 2 convos, even if we're only looking at one (e.g. due to filter), so if there's simultaneous updates we're more likely to catch it. 2 is still an arbitrary number tbh
          
          console.log(`Periodic update: Fetching ${num_convos_to_fetch} conversations to refresh cache`);
          fetchConversations(
            num_convos_to_fetch,
            false,
            urgentFilterIsEnabled,
            propertyFilterVal,
            phaseFilterVal,
            fromHostBuddyFilterVal,
            guestNameSearchVal,
            num_existing_convos <= 1
          );
        },
        isNewAccount ? 10000 : 20000
      ); // 10s for new accounts, 20s for elite users

      const timeoutId = setTimeout(() => {
        // Stop auto-updating after the page has been open for 2 hours (7,200,000 milliseconds = 4 hours)
        clearInterval(intervalId);
      }, 7200000);

      return () => {
        // Cleanup the interval and timeout on component unmount
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [
    conversations,
    eliteFeaturesAvailable,
    urgentFilterIsEnabled,
    propertyFilterVal,
    phaseFilterVal,
    fromHostBuddyFilterVal,
    guestNameSearchVal,
    accountAgeDays,
  ]);
  // Track window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Helper function to determine justifyContent value based on screen width and panel visibility
  const determineJustifyContent = () => {
    // For large screens (above 1279px), always use "space-between"
    if (windowWidth > 1279) {
      return "100%";
    }

    // For medium screens (1100px-1279px) and other smaller screens, use conditional logic
    // If right section is visible, align items to the start
    // otherwise distribute space between items
    return  rightSectionVisible ? "calc(100% - 290px)" : "100%";
  };

  return (
    <>
      <style>{responsiveStyles}</style>
      <div
        className="inbox-content-container"
        style={{
          height: "95vh",
          margin: "10px",
          // borderWidth:"1px" ,
          // borderStyle:"solid",
          // borderColor:"rgba(36, 38, 46, 1)" ,
          // backgroundColor:"#17191F"
        }}
      >
        {conversationsNotYetFetched ? <InboxLoader /> : null}
        <div className="row text-white" style={{ height: "100%" }}>
          {" "}
          {/* Desktop View */}
          <div
            style={{ width: "100%", gap: "0px", height: "100%" }}
            className="desktop-view"
          >
            <LeftMessage
              className="box"
              allPropertyNamesList={allPropertyNamesList}
              allGuestNames={allGuestNamesList}
              allConversations={conversations}
              setAllConversations={setConversations}
              setSelectedConvo={setSelectedConversation}
              fetchConversations={fetchConversations}
              userHasPMS={userHasPMS}
              urgentFilterIsEnabled={urgentFilterIsEnabled}
              setUrgentFilterIsEnabled={setUrgentFilterIsEnabled}
              propertyFilterVal={propertyFilterVal}
              setPropertyFilterVal={setPropertyFilterVal}
              phaseFilterVal={phaseFilterVal}
              setPhaseFilterVal={setPhaseFilterVal}
              fromHostBuddyFilterVal={fromHostBuddyFilterVal}
              setFromHostBuddyFilterVal={setFromHostBuddyFilterVal}
              guestNameSearchVal={guestNameSearchVal}
              setGuestNameSearchVal={setGuestNameSearchVal}
              setCurrentView={setCurrentView}
              currentView={currentView}
              setAllowConvIdQuery={setAllowConvIdQuery}
              setUnreadPmsCount={setUnreadPmsCount}
              sidebarClicked={sidebarClicked}
              sidebarOpen={sidebarOpen}
            />
            <div
              className="middleSectionContainer"
              style={{ flex: "1", height: "100%", border: "1px solid #24262E" }}
            >
              <div
                style={{
                  display: "flex",
                  backgroundColor: "#17191f",
                  padding: "5px",
                  borderRadius: "0px",
                  marginBottom: "4px",
                  flexDirection: "column",
                  border: "1px solid",
                  borderColor: "#24262E",
                }}
              >
                {" "}
                {/* User header row with image, name and action icons */}{" "}
                <div
                  style={{
                    display: "flex",
                    // justifyContent: determineJustifyContent(),
                    justifyContent:"space-between",
                    alignItems: "center",
                    width: "100%",
                    padding: "4px",
                    marginBottom: "4px",
                  }}
                >
                  {/* Left side - User info */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* User image with square badge */}
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#007bff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        marginRight: "5px",
                      }}
                    >
                      {selectedConversation?.guest_name
                        ? selectedConversation.guest_name
                            .charAt(0)
                            .toUpperCase()
                        : "G"}
                    </div>

                    {/* User name */}
                    <span
                      style={{
                        color: "white",
                        fontFamily: "DM Sans, helvetica !important",
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      {selectedConversation?.guest_name || "Guest"}
                    </span>

                    {/* Urgent flag render - placed right next to guest name */}
                    {selectedConversation?.action_items &&
                      selectedConversation.action_items.length === 0 && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#4D2100",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            marginLeft: "10px",
                            marginRight: "10px",
                            height: "32px",
                          }}
                        >
                          <img
                            src={UrgentFlagIcon}
                            alt="Urgent"
                            style={{
                              width: "16px",
                              height: "16px",
                              marginRight: "4px",
                            }}
                          />
                          <span
                            style={{
                              color: "white",
                              fontSize: "14px",
                              fontWeight: "500",
                            }}
                          >
                            Urgent
                          </span>
                        </div>
                      )}
                  </div>

                  {/* Right side - Icons */}
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {/* Pin icon with square badge */}
                    <div
                      className="pin-icon-container"
                      onClick={handlePinToggle}
                      tabIndex={0}
                      title={
                        isPinned ? "Unpin conversation" : "Pin conversation"
                      }
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "rgba(189, 193, 201, 0.08)",
                        // Normal state: #BDC1C9 with 8% opacity
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        marginRight: "8px",
                        cursor: "pointer",
                        position: "relative",
                        outline: "none",
                        // Remove default focus outline
                      }}
                      onMouseDown={(e) => {
                        // Add pressed style by changing backgroundColor
                        e.currentTarget.style.backgroundColor =
                          "rgba(15, 17, 23, 0.08)";
                        // Pressed state: #0F1117 with opacity
                      }}
                      onMouseUp={(e) => {
                        // Reset to normal style
                        e.currentTarget.style.backgroundColor =
                          "rgba(189, 193, 201, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        // Reset to normal style if mouse leaves during press
                        e.currentTarget.style.backgroundColor =
                          "rgba(189, 193, 201, 0.08)";
                      }}
                      onFocus={(e) => {
                        // Add focus style with blue border
                        e.currentTarget.style.boxShadow = "0 0 0 2px #3E88F7";
                      }}
                      onBlur={(e) => {
                        // Remove focus style
                        e.currentTarget.style.boxShadow = "none";
                      }}
                      onKeyDown={(e) => {
                        // Handle keyboard activation (Enter or Space)
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.currentTarget.style.backgroundColor =
                            "rgba(15, 17, 23, 0.08)";
                          handlePinToggle();
                        }
                      }}
                      onKeyUp={(e) => {
                        // Reset style after key press
                        if (e.key === "Enter" || e.key === " ") {
                          e.currentTarget.style.backgroundColor =
                            "rgba(189, 193, 201, 0.08)";
                        }
                      }}
                    >
                      <img
                        src={isPinned ? SelectedPinIcon : DefaultPinIcon}
                        alt={isPinned ? "Unpin" : "Pin"}
                        style={{
                          width: "18px",
                          height: "18px",
                          pointerEvents: "none",
                          // Prevents the image from capturing events
                        }}
                      />
                    </div>
                    {/* Three dots with square badge
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: 'rgba(189, 193, 201, 0.08)', // #BDC1C9 with 8% opacity
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      marginRight: '10px',
                      cursor: 'pointer'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '18px',
                        height: '18px'
                      }}>
                        <div style={{
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          backgroundColor: '#BDC1C9',
                          margin: '0 1px'
                        }}></div>
                        <div style={{
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          backgroundColor: '#BDC1C9',
                          margin: '0 1px'
                        }}></div>
                        <div style={{
                          width: '3px',
                          height: '3px',
                          borderRadius: '50%',
                          backgroundColor: '#BDC1C9',
                          margin: '0 1px'
                        }}></div>
                      </div>
                    </div> */}{" "}
                    {/* Info circle icon with background */}
                    <div
                      style={{
                        height: "32px",
                        backgroundColor: "#01255E",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "4px",
                        cursor: "pointer",
                        padding: "0 8px",
                        gap: "6px",
                      }}
                      onClick={() => setRightSectionVisible(!rightSectionVisible)}
                    >
                      <img
                        src={
                          require("./icons/Details_icon_for_right.svg").default
                        }
                        alt="Details"
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      <span
                        style={{
                          color: "#D0D3DB",
                          fontSize: "14px",
                          fontWeight: "400",
                          fontFamily: "DM Sans",
                        }}
                      >
                        Details
                      </span>
                    </div>
                  </div>
                </div>
                {/* Tabs navigation row */}{" "}
                <div
                  style={{ display: "flex", width: "100%", padding: "0 9px" }}
                >
                  {[
                    { id: "pms", icon: PmsIcon, text: "PMS" },
                    { id: "whatsapp", icon: WhatsappIcon, text: "WhatsApp" },
                    {
                      id: "openIssue",
                      icon: OpenIssueIcon,
                      text: "Open Issue",
                    },
                    { id: "notes", icon: NotesIcon, text: "Notes" },
                  ].map((tab) => (
                    <div
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                      }}
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        cursor: "pointer",
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        marginRight: "18px",
                        paddingBottom: "2px",
                        justifyContent: "space-between",
                        borderBottom:
                          tab.id === activeTab ? "2px solid #007bff" : "none",
                        color: tab.id === activeTab ? "#FFFFFF" : "#D0D3DB",
                        transition: "color 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={tab.icon}
                          alt={tab.text}
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "5px",
                          }}
                        />
                        <span>{tab.text}</span>
                      </div>
                      {/* Unread message counters{tab.id === 'pms' && unreadPmsCount > 0 && (
                        <span style={{
                          backgroundColor: '#ff9800',
                          color: 'white',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: '6px',
                          fontWeight: 'bold'
                        }}>
                          {unreadPmsCount}
                        </span>
                      )}
                      
                      {tab.id === 'whatsapp' && unreadWhatsAppCount > 0 && (
                        <span style={{
                          backgroundColor: '#25D366',
                          color: 'white',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          fontSize: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: '6px',
                          fontWeight: 'bold'
                        }}>
                          {unreadWhatsAppCount}
                        </span>
                      )}
                      */}
                      {/* {tab.id === "pms" && unreadPmsCount > 0 && (
                        <span
                          style={{
                             backgroundColor: "rgb(44 46 52)",
                            color: "#A6A9B2",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "6px",
                            fontWeight: "bold",
                          }}
                        >
                          {unreadPmsCount}
                        </span>
                      )} */}

                      {/* {tab.id === "whatsapp" && unreadWhatsAppCount > 0 && (
                        <span
                          style={{
                            backgroundColor: "#25D366",
                            color: "white",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "6px",
                            fontWeight: "bold",
                          }}
                        >
                          {unreadWhatsAppCount}
                        </span>
                      )} */}

                      {tab.id === "openIssue" &&
                        filteredActionItems &&
                        filteredActionItems.length > 0 && (
                          <span
                            style={{
                              backgroundColor: "rgb(44 46 52)",
                              color: "#A6A9B2",
                              borderRadius: "50%",
                              width: "18px",
                              height: "18px",
                              fontSize: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginLeft: "6px",
                              fontWeight: "bold",
                            }}
                          >
                            {filteredActionItems.length}
                          </span>
                        )}
                      {tab.id === "notes" && notes.length > 0 && (
                        <span
                          style={{
                            backgroundColor: "rgb(44 46 52)",
                            color: "#A6A9B2",
                            borderRadius: "50%",
                            width: "18px",
                            height: "18px",
                            fontSize: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "6px",
                            fontWeight: "bold",
                          }}
                        >
                          {notes.length}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Tab content rendered inside the div container */}
              <div
                style={{
                  height: "calc(100% - 85.101111px)",
                  width: "100%",
                  position: "relative",
                }}
              >
                {/* PMS Tab */}
                <div
                  style={{
                    visibility: activeTab === "pms" ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <MildeSection
                    key={`pms-section-${
                      selectedConversation?.conversation_id || "empty"
                    }`}
                    className="box"
                    allConversationData={selectedConversation}
                    updateConversationFromApi={updateConversation}
                    updateConversationLocal={addMessageToLocalConversation}
                    subscriptionPlan={subscriptionPlan}
                    accountAgeDays={accountAgeDays}
                    setCurrentView={setCurrentView}
                  />
                </div>

                {/* WhatsApp Tab */}
                <div
                  style={{
                    visibility: activeTab === "whatsapp" ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <WhatsAppSection
                    key="whatsapp-section"
                    allConversationData={selectedConversation}
                  />
                </div>

                {/* Open Issue Tab */}
                <div
                  style={{
                    visibility:
                      activeTab === "openIssue" ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  {" "}
                  <div
                    className="action-items-container"
                    style={{
                      height: "100%",
                      overflowY: "auto",
                      padding: "5px",
                    }}
                  >
                    {/* Render action items from the selected conversation */}
                    {[]
                      .concat(filteredActionItems || [])
                      .filter((item) => item.status !== "completed")
                      .map((actionItem) => (
                        <div
                          key={actionItem.id}
                          // className="action-item-card"
                          style={{
                            backgroundColor: "rgb(32 33 39)",
                            border: "1px solid #24262E",
                            borderRadius: "8px",
                            padding: "10px",
                            marginBottom: "8px",
                            // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                            fontFamily: "DM Sans, Helvetica !important",
                            fontSize: "14px",
                          }}
                        >
                          <div
                            className="action-item-header"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "4px",
                            }}
                          >
                            <div
                              className="action-item-date"
                              style={{
                                fontSize: "12px",
                                color: "#A6A9B2",
                                forntweight: "600",
                              }}
                            >
                              {new Date(
                                actionItem.created_at
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}{" "}
                              {new Date(
                                actionItem.created_at
                              ).toLocaleTimeString("en-US", {
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}{" "}
                              •{" "}
                              <span>
                                {actionItem.category
                                  ? actionItem.category
                                      .charAt(0)
                                      .toUpperCase() +
                                    actionItem.category.slice(1).toLowerCase()
                                  : ""}
                              </span>
                            </div>
                          </div>
                          <div
                            className="action-item-description"
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: "#D0D3DB",
                              lineHeight: "1.4",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ flex: 1 }}>{actionItem.item}</div>
                            <label
                              className="action-item-checkbox"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                cursor: "pointer",
                                marginLeft: "12px",
                              }}
                            >
                              <div
                                style={{
                                  backgroundColor: "rgba(189, 193, 201, 0.08)",
                                  height: "32px",
                                  width: "32px",
                                  borderRadius: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  callCompleteActionItemApi(actionItem.id)
                                }
                                title="Mark as Resolved"
                              >
                                <img
                                  src={CheckBoxIcon}
                                  alt="Mark as Resolved"
                                />
                              </div>
                            </label>
                          </div>
                        </div>
                      ))}
                    {/* If there are no items or the API hasn't been integrated yet, show these mock items */}{" "}
                    {isLoadingActionItems ? (
                      <div
                        className="no-action-items"
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#a4a6aa",
                        }}
                      >
                        <p>Loading...</p>
                      </div>
                    ) : !selectedConversation?.conversation_id ? (
                      <div
                        className="no-action-items"
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#a4a6aa",
                        }}
                      >
                        <p>Select a conversation to view open issues</p>
                      </div>
                    ) : !filteredActionItems ||
                      filteredActionItems.length === 0 ? (
                      <div
                        className="no-action-items"
                        style={{
                          padding: "20px",
                          textAlign: "center",
                          color: "#a4a6aa",
                        }}
                      >
                        <p>No open issues found for this conversation</p>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Notes Tab */}
                <div
                  style={{
                    visibility: activeTab === "notes" ? "visible" : "hidden",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <div
                    className="box"
                    style={{
                      padding: "0",
                      backgroundColor: "#0F1117",
                      borderRadius: "4px",
                      height: "100%",
                      display: "flex",
                      // border: '1px solid #24262E',
                      flexDirection: "column",
                    }}
                  >
                    <div
                      className="notes-container"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        backgroundColor: "#121318",
                      }}
                    >
                      {" "}
                      {/* Notes List Area */}
                      <div
                        className="notes-scroll-area"
                        style={{
                          flex: 1,
                          overflowY: "auto",
                          backgroundColor: "#0F1117",
                          padding: "5px 5px",
                        }}
                      >
                        {isLoadingNotes ? (
                          <div style={{ textAlign: "center", padding: "20px" }}>
                            <div
                              className="spinner-border text-primary"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          </div>
                        ) : !selectedConversation?.conversation_id ? (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "20px",
                              color: "#888",
                            }}
                          >
                            Select a conversation to view notes
                          </div>
                        ) : notes.length === 0 ? (
                          <div
                            style={{
                              textAlign: "center",
                              padding: "20px",
                              color: "#888",
                            }}
                          >
                            No notes found for this conversation
                          </div>
                        ) : (
                          <div>
                            {notes.map((note) => (
                              <div
                                key={note.note_id}
                                style={{
                                  marginBottom: "5px",
                                  color: "#D0D3DB",
                                  fontSize: "14px",
                                  fontWeight: "400",
                                  fontFamily: "DM Sans",
                                }}
                              >
                                {/* Note content with three dots on the same line */}
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                  }}
                                >
                                  {/* Note content with three dots menu */}
                                  <div
                                    style={{
                                      backgroundColor: "#1e1f25",
                                      padding: "9px 9px",
                                      borderRadius: "4px",
                                      boxShadow: "0 1px 1px rgba(0,0,0,0.1)",
                                      flex: 1,
                                      position: "relative",
                                      border: "1px solid",
                                      borderColor: "#24262E",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        width: "100%",
                                      }}
                                    >
                                      <div style={{ flex: 1 }}>
                                        {note.visible_to_hostbuddy && (
                                          <div
                                            style={{
                                              backgroundColor: "#013280",
                                              color: "#D4E4FC",
                                              padding: "2px 6px",
                                              borderRadius: "4px",
                                              fontSize: "12px",
                                              marginBottom: "6px",
                                              fontWeight: "500",
                                              display: "inline-block",
                                            }}
                                          >
                                            Visible to HostBuddy
                                          </div>
                                        )}

                                        <div
                                          style={{
                                            fontSize: "16px",
                                            color: "#D0D3DB",
                                            fontWeight: 400,
                                            whiteSpace: "pre-wrap",
                                          }}
                                        >
                                          {note.note}
                                        </div>
                                      </div>

                                      {/* Three dots menu button */}
                                      <div
                                        style={{
                                          position: "relative",
                                          marginLeft: "10px",
                                          flexShrink: 0,
                                        }}
                                      >
                                        {deletingNoteId === note.note_id ? (
                                          <div
                                            className="spinner-border spinner-border-sm text-secondary"
                                            role="status"
                                          >
                                            <span className="visually-hidden">
                                              Deleting...
                                            </span>
                                          </div>
                                        ) : (
                                          <div>
                                            {" "}
                                            <button
                                              onClick={() =>
                                                toggleDropdown(note.note_id)
                                              }
                                              style={{
                                                background: "none",
                                                border: "none",
                                                color: "#FFFFFF",
                                                cursor: "pointer",
                                                padding: "4px",
                                                fontSize: "14px",
                                                marginTop: "-4px",
                                              }}
                                              title="Options"
                                            >
                                              <i className="bi bi-three-dots"></i>
                                            </button>
                                            {/* Dropdown menu */}
                                            {openDropdownId ===
                                              note.note_id && (
                                              <div
                                                style={{
                                                  position: "absolute",
                                                  right: "0",
                                                  top: "100%",
                                                  backgroundColor: "#2B2E36",
                                                  borderRadius: "4px",

                                                  zIndex: 10,
                                                  width: "130px",
                                                  overflow: "hidden",
                                                  border:
                                                    "1px solid rgb(53 55 60)",
                                                }}
                                              >
                                                <ul
                                                  style={{
                                                    listStyle: "none",
                                                    padding: "0",
                                                    margin: "0",
                                                  }}
                                                >
                                                  {" "}
                                                  <li
                                                    onClick={() => {
                                                      toggleDropdown(
                                                        note.note_id
                                                      );
                                                      setEditingNoteId(
                                                        note.note_id
                                                      );
                                                      setEditingNoteText(
                                                        note.note
                                                      );
                                                      setEditingNoteVisibleToHostbuddy(
                                                        note.visible_to_hostbuddy
                                                      );
                                                      setIsEditNoteModalOpen(
                                                        true
                                                      );
                                                    }}
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      width: "100%",
                                                      textAlign: "left",
                                                      padding: "8px 8px",
                                                      color: "#D0D3DB",
                                                      cursor: "pointer",
                                                      fontSize: "14px",
                                                      fontFamily:
                                                        '"DM Sans", Helvetica',
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        require("./mildeSection/message/icons/update_icon.svg")
                                                          .default
                                                      }
                                                      alt="Update"
                                                      style={{
                                                        marginLeft: "8px",
                                                        marginRight: "6px",
                                                        width: "16px",
                                                        height: "16px",
                                                        zIndex: 11,
                                                      }}
                                                    />
                                                    Edit note
                                                  </li>
                                                  <li
                                                    onClick={() => {
                                                      toggleDropdown(
                                                        note.note_id
                                                      );
                                                      callDeleteNoteApi(
                                                        note.note_id
                                                      );
                                                    }}
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      width: "100%",
                                                      textAlign: "left",
                                                      padding: "8px 8px",
                                                      color: "#F97257",
                                                      cursor: "pointer",
                                                      fontSize: "14px",
                                                      fontFamily:
                                                        '"DM Sans", Helvetica',
                                                    }}
                                                  >
                                                    <img
                                                      src={
                                                        require("./mildeSection/message/icons/delete_red_icon.svg")
                                                          .default
                                                      }
                                                      alt="Delete"
                                                      style={{
                                                        marginLeft: "8px",
                                                        marginRight: "6px",
                                                        width: "16px",
                                                        height: "16px",
                                                        zIndex: 11,
                                                      }}
                                                    />
                                                    Delete note
                                                  </li>
                                                </ul>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    {/* Date and time with avatar */}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        // marginTop: '8px'
                                      }}
                                    >
                                      {/* Small user avatar - showing full name with proper capitalization */}
                                      <div
                                        style={{
                                          width: "auto",
                                          color: "#A6A9B2",
                                          height: "20px",
                                          display: "flex",
                                          fontFamily:
                                            '"DM Sans-SemiBold", Helvetica',
                                          alignItems: "center",
                                          marginRight: "8px",
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          letterSpacing: 0,
                                          lineHeight: "normal",
                                          position: "relative",
                                          flexShrink: 0,
                                        }}
                                      >
                                        {note.created_by
                                          ? note.created_by
                                              .charAt(0)
                                              .toUpperCase() +
                                            note.created_by
                                              .slice(1)
                                              .toLowerCase()
                                          : "User"}{" "}
                                        .
                                      </div>

                                      {/* Date and time text in the requested format: Month Short name Date . Time */}
                                      <div
                                        style={{
                                          color: "#A6A9B2",
                                          fontFamily:
                                            '"DM Sans-Regular", Helvetica',
                                          fontSize: "14px",
                                          fontWeight: 400,
                                          letterSpacing: 0,
                                          lineHeight: "normal",
                                          position: "relative",
                                        }}
                                      >
                                        {new Date(
                                          note.created_at_utc
                                        ).toLocaleDateString("en-US", {
                                          month: "short",
                                        })}{" "}
                                        {new Date(
                                          note.created_at_utc
                                        ).getDate()}{" "}
                                        .
                                        {new Date(
                                          note.created_at_utc
                                        ).toLocaleTimeString("en-US", {
                                          hour: "numeric",
                                          minute: "2-digit",
                                          hour12: true,
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      {/* Note Input Area - Fixed at bottom */}
                      <div
                        style={{
                          border: "1px solid #222",
                          padding: "8px 8px",
                          backgroundColor: "#17191F",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <textarea
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          onKeyDown={(e) => {
                            // Submit on Enter without Shift key
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              if (editingNoteId) {
                                callUpdateNoteApi(
                                  editingNoteId,
                                  newNote,
                                  visibleToHostbuddy
                                );
                              } else if (
                                newNote.trim() &&
                                selectedConversation?.conversation_id
                              ) {
                                callAddNoteApi(newNote);
                              }
                            }
                            // Allow normal behavior for Shift+Enter (new line)
                          }}
                          placeholder="Type note..."
                          style={{
                            flex: 1,
                            backgroundColor: "#17191F",
                            border: "none",
                            color: "#EEE",
                            // padding: '8px 2px',
                            fontSize: "14px",
                            outline: "none",
                            resize: "none",
                            minHeight: "40px",
                            maxHeight: "100px",
                            fontFamily: "inherit",
                            lineHeight: "1.4",
                            overflowY: "auto",
                          }}
                          className="notes-textarea" // Add class for placeholder styling
                          disabled={!selectedConversation?.conversation_id}
                        />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // marginTop: '8px'
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {" "}
                            <input
                              type="checkbox"
                              id="visibleToHostbuddy"
                              checked={visibleToHostbuddy}
                              onChange={(e) =>
                                setVisibleToHostbuddy(e.target.checked)
                              }
                              style={{
                                cursor: "pointer",
                                marginRight: "5px",
                                borderRadius: "4px",
                                accentColor: "#0B5FDE",
                                backgroundColor: visibleToHostbuddy
                                  ? "#0B5FDE"
                                  : "transparent",
                                width: "16px",
                                height: "16px",
                              }}
                            />
                            <label
                              htmlFor="visibleToHostbuddy"
                              style={{
                                color: "#D0D3DB",
                                fontSize: "14px",
                                fontWeight: "400",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              Visible to HostBuddy
                              <div
                               
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  backgroundColor: "#24262E",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  marginLeft: "5px",
                                  borderRadius: "4px",
                                }}
                              >
                                <img
                                  src={
                                    require("./mildeSection/message/icons/helper_icon_notes.svg")
                                      .default
                                  }
                                  alt="Help"
                                  style={{ width: "14px", height: "14px" }}
                                />
                              </div>
                            </label>
                          </div>{" "}
                          <button
                            onClick={() => {
                              if (editingNoteId) {
                                callUpdateNoteApi(
                                  editingNoteId,
                                  newNote,
                                  visibleToHostbuddy
                                );
                              } else if (
                                newNote.trim() &&
                                selectedConversation?.conversation_id
                              ) {
                                callAddNoteApi(newNote);
                              }
                            }}
                            style={{
                              backgroundColor:
                                selectedConversation?.conversation_id &&
                                newNote.trim()
                                  ? "#1a73e8"
                                  : "rgba(15, 17, 23, 0.42)",
                              color:
                                selectedConversation?.conversation_id &&
                                newNote.trim()
                                  ? "white"
                                  : "#4A4D54",
                              height: "30px",
                              border: "none",
                              borderRadius: "4px",
                              padding: "2px 12px",
                              fontSize: "12px",
                              fontWeight: "500",
                              cursor:
                                selectedConversation?.conversation_id &&
                                newNote.trim()
                                  ? "pointer"
                                  : "not-allowed",
                              opacity: "1",
                            }}
                            disabled={
                              !selectedConversation?.conversation_id ||
                              !newNote.trim()
                            }
                          >
                            {editingNoteId ? "Update note" : "+ Add note"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div
              className={`rightSectionContainer ${
                !rightSectionVisible ? "hidden" : ""
              }`}
              style={{
                width: "296px",
                flex: "none",
                height: "100%",
                padding: "11px",
                border: "1px solid #24262E",
              }}
            >
              {" "}
              <RightSection
                className="box"
                style={{
                  width: "100%",
                  height: "calc(100vh - 110px)",
                  backgroundColor: "#17191F",
                }}
                rightSectionData={selectedConversation}
                updateConversationFromApi={updateConversation}
                setActiveTab={setActiveTab}
                setPendingTabChange={setPendingTabChange}
                setRightSectionVisible={setRightSectionVisible}
              />
            </div>
          </div>
          {/* Edit Note Modal */}
          <EditNoteModal
            isOpen={isEditNoteModalOpen}
            onClose={() => {
              setIsEditNoteModalOpen(false);
              setEditingNoteId(null);
            }}
            noteText={editingNoteText}
            setNoteText={setEditingNoteText}
            visibleToHostbuddy={editingNoteVisibleToHostbuddy}
            setVisibleToHostbuddy={setEditingNoteVisibleToHostbuddy}
            onSave={() =>
              callUpdateNoteApi(
                editingNoteId,
                editingNoteText,
                editingNoteVisibleToHostbuddy
              )
            }
            onDelete={() => {
              if (editingNoteId) {
                callDeleteNoteApi(editingNoteId);
                setIsEditNoteModalOpen(false);
              }
            }}
          />
          {/* Mobile View */}
          <div className="mobile-view">
            {currentView === "conversations" && (
              <LeftMessage
                allPropertyNamesList={allPropertyNamesList}
                allGuestNames={allGuestNamesList}
                allConversations={conversations}
                setAllConversations={setConversations}
                setSelectedConvo={setSelectedConversation}
                fetchConversations={fetchConversations}
                userHasPMS={userHasPMS}
                urgentFilterIsEnabled={urgentFilterIsEnabled}
                setUrgentFilterIsEnabled={setUrgentFilterIsEnabled}
                propertyFilterVal={propertyFilterVal}
                setPropertyFilterVal={setPropertyFilterVal}
                phaseFilterVal={phaseFilterVal}
                setPhaseFilterVal={setPhaseFilterVal}
                fromHostBuddyFilterVal={fromHostBuddyFilterVal}
                setFromHostBuddyFilterVal={setFromHostBuddyFilterVal}
                guestNameSearchVal={guestNameSearchVal}
                setGuestNameSearchVal={setGuestNameSearchVal}
                setCurrentView={setCurrentView}
                currentView={currentView}
                setAllowConvIdQuery={setAllowConvIdQuery}
                setUnreadPmsCount={setUnreadPmsCount}
                sidebarClicked={sidebarClicked}
                sidebarOpen={sidebarOpen}
              />
            )}{" "}
            {currentView === "messages" && (
              <MildeSection
                allConversationData={selectedConversation}
                updateConversationFromApi={updateConversation}
                updateConversationLocal={addMessageToLocalConversation}
                subscriptionPlan={subscriptionPlan}
                accountAgeDays={accountAgeDays}
                setCurrentView={setCurrentView}
              />
            )}
            {currentView === "details" && (
              <RightSection
                rightSectionData={selectedConversation}
                updateConversationFromApi={updateConversation}
                setCurrentView={setCurrentView}
                setActiveTab={setActiveTab}
                setPendingTabChange={setPendingTabChange}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Add the EditNote modal JSX before the export
const EditNoteModal = ({
  isOpen,
  onClose,
  noteText,
  setNoteText,
  visibleToHostbuddy,
  setVisibleToHostbuddy,
  onSave,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: "500px",
          backgroundColor: "#2B2E36",
          borderRadius: "4px",
          border: "1px solid rgb(60 63 67)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 24px",
            // borderBottom: '1px solid #24262E',
          }}
        >
          <h3
            style={{
              margin: 0,
              color: "#D0D3DB",
              fontFamily: "popins, sans-serif",
              fontSize: "24px",
              paddingTop: "10px",
              fontWeight: "700",
            }}
          >
            Edit note
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#A6A9B2",
              fontSize: "20px",
              padding: 0,
            }}
          >
            ✕
          </button>
        </div>

        {/* Note Content */}
        <div
          style={{
            padding: "10px 24px",
          }}
        >
          <div
            style={{
              color: "#A6A9B2",
              fontFamily: "DM Sans, helvetica !impotant",
            }}
          >
            Note
          </div>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Type note..."
            style={{
              width: "100%",
              height: "80px",
              backgroundColor: "#24262E",
              border: "1px solid rgb(60 63 67)",
              borderRadius: "4px",
              color: "#EEE",
              fontSize: "14px",
              padding: "8px",
              outline: "none",
              resize: "none",
              fontFamily: "DM Sans, helvetica",
              lineHeight: "1.5",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <input
              type="checkbox"
              id="editVisibleToHostbuddy"
              checked={visibleToHostbuddy}
              onChange={(e) => setVisibleToHostbuddy(e.target.checked)}
              style={{
                cursor: "pointer",
                marginRight: "8px",
                accentColor: "#0B5FDE",
                width: "16px",
                height: "16px",
              }}
            />
            <label
              htmlFor="editVisibleToHostbuddy"
              style={{
                color: "#D0D3DB",
                fontSize: "14px",
                fontWeight: "400",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              Visible to HostBuddy
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#24262E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: "5px",
                  borderRadius: "4px",
                }}
              >
                <img
                  src={
                    require("./mildeSection/message/icons/helper_icon_notes.svg")
                      .default
                  }
                  alt="Help"
                  style={{ width: "14px", height: "14px" }}
                />
              </div>
            </label>
          </div>
        </div>

        {/* Footer / Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 24px",
            gap: "12px",
          }}
        >
          <button
            onClick={() => {
              if (onDelete) onDelete();
            }}
            style={{
              backgroundColor: "transparent",
              color: "#F97257",
              border: "none",
              height: "36px",
              borderRadius: "4px",
              padding: "0",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            title="Delete note"
          >
            <img
              src={require("./icons/delete_red_icon.svg").default}
              alt="Delete"
              style={{
                marginRight: "6px",
                width: "16px",
                height: "16px",
              }}
            />
            Delete
          </button>

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={onClose}
              style={{
                backgroundColor: "transparent",
                color: "#D0D3DB",
                border: "0px solid #24262E",
                height: "36px",
                borderRadius: "4px",
                padding: "0 16px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              style={{
                backgroundColor: "#1a73e8",
                color: "white",
                border: "none",
                height: "36px",
                borderRadius: "4px",
                padding: "0 16px",
                fontSize: "14px",
                fontWeight: "500",
                cursor: noteText.trim() ? "pointer" : "not-allowed",
                opacity: noteText.trim() ? "1" : "0.7",
              }}
              disabled={!noteText.trim()}
            >
              {" "}
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
