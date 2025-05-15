import React, { useState, useEffect } from 'react';
import { callGetConversationsApi, callGetSingleConversationApi } from "../../../../helper/getConversationsTest/inboxApi";
import { callPinConversationApi } from "../../../../helper/getConversationsTest/pinConversationApi";
import { InboxLoader } from "../../../../helper/Loader"; 
import LeftMessage from "./leftMessage/LeftMessage";
import MildeSection from "./mildeSection/MildeSection";
import RightSection from "./rightSection/RightSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import "./inboxIndex.css";

// Import the SVG icons
import PmsIcon from "./mildeSection/message/icons/pms_icon.svg";
import WhatsappIcon from "./mildeSection/message/icons/whatsapp_icon.svg";
import OpenIssueIcon from "./mildeSection/message/icons/openIssue_icon.svg";
import NotesIcon from "./mildeSection/message/icons/notes_icon.svg";
import CheckBoxIcon from "./mildeSection/message/icons/check_box.svg";
import DefaultPinIcon from "./mildeSection/message/icons/default_pin.svg";
import SelectedPinIcon from "./mildeSection/message/icons/selected_pin.svg";

// Add responsive styles
const responsiveStyles = `
  @media (max-width: 991px) {
    .inbox-content-container {
      width: 105% !important;
    }
  }
  
  @media (min-width: 992px) {
    .middleSectionContainer.sidebar-clicked-expanded {
      width: 35% !important;
    }
    
    .middleSectionContainer.sidebar-clicked-collapsed {
      width: 45% !important;
    }
    
    .rightSectionContainer.sidebar-clicked-expanded {
      width: 23% !important;
    }
      .rightSectionContainer.sidebar-clicked-collapsed {
      width: 25% !important;
    }
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

const Inbox = ({allPropertyNamesList, allGuestNamesList, userHasPMS, subscriptionPlan, accountAgeDays, singleConversationIdFromUrl }) => {
  const navigate = useNavigate();
  const eliteFeaturesAvailable = (/elite|works/i.test(subscriptionPlan) || subscriptionPlan === 'trial') // Changed == to === for strict equality

  const [conversations, setConversations] = useState([]); // All conversations to be displayed; array of objs
  const [selectedConversation, setSelectedConversation] = useState({}); // The single selected conversation; obj. Messages are under the key 'messages'
  const [conversationsNotYetFetched, setConversationsNotYetFetched] = useState(true);
  const [urgentFilterIsEnabled, setUrgentFilterIsEnabled] = useState(false);
  const [propertyFilterVal, setPropertyFilterVal] = useState("");
  const [phaseFilterVal, setPhaseFilterVal] = useState("");
  const [fromHostBuddyFilterVal, setFromHostBuddyFilterVal] = useState(false);
  const [guestNameSearchVal, setGuestNameSearchVal] = useState("");
  const [currentView, setCurrentView] = useState('conversations'); // New state for mobile view
  const [activeTab, setActiveTab] = useState('pms'); // New state to track active tab
  const [allowConvIdQuery, setAllowConvIdQuery] = useState(true); // Added state for handling conversationId query
  const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state
  const [sidebarClicked, setSidebarClicked] = useState(true); // Track if sidebar was clicked vs hovered

  // State for tracking pin status
  const [isPinned, setIsPinned] = useState(false);
  // Function to handle pin/unpin action
  const handlePinToggle = async () => {
    if (!selectedConversation?.conversation_id) return;
    
    try {
      const result = await callPinConversationApi(selectedConversation.conversation_id, !isPinned);
      
      if (result && !result.error) {        // API response format: { "message": "Conversation pin status set", "pinned": true|false }
        setIsPinned(result.pinned);
        ToastHandle(result.message || `Conversation ${result.pinned ? 'pinned' : 'unpinned'}`, "success");
        
        // Update the conversation object to include the pinned state
        if (selectedConversation) {
          setSelectedConversation({
            ...selectedConversation,
            pinned: result.pinned,
            is_pinned: result.pinned // For backward compatibility
          });
        }
      }
    } catch (error) {
      ToastHandle("Error updating pin status", "danger");
    }  };  // Update isPinned state when selected conversation changes
  useEffect(() => {
    if (selectedConversation?.conversation_id) {
      // Call the get_all_conversations API to get the latest conversation data when a conversation is selected
      const fetchLatestConversationData = async () => {
        try {
          // Use callGetSingleConversationApi which calls /get_all_conversations with the conversation_id
          const result = await callGetSingleConversationApi(selectedConversation.conversation_id);
          
          if (result && !result.error && result.conversations && result.conversations.length > 0) {
            const updatedConversation = result.conversations[0];
            
            // Update pin status based on the API response
            const isPinnedValue = !!(updatedConversation.pinned || updatedConversation.is_pinned);
            setIsPinned(isPinnedValue);
            
            // Update the conversation object with the latest data from the API, preserving the pin status
            setSelectedConversation({
              ...updatedConversation,
              pinned: isPinnedValue,
              is_pinned: isPinnedValue // For backward compatibility
            });
          } else {
            // If API call fails, fall back to using the property from the conversation object
            if (selectedConversation?.pinned !== undefined) {
              setIsPinned(!!selectedConversation.pinned);
            } else if (selectedConversation?.is_pinned !== undefined) {
              setIsPinned(!!selectedConversation.is_pinned);
            } else {
              setIsPinned(false);
            }
          }
        } catch (error) {
          console.error("Error fetching conversation data:", error);          // Fall back to using the property from the conversation object
          if (selectedConversation?.pinned !== undefined) {
            setIsPinned(!!selectedConversation.pinned);
          } else if (selectedConversation?.is_pinned !== undefined) {
            setIsPinned(!!selectedConversation.is_pinned);
          } else {
            setIsPinned(false);
          }
        }
      };

      fetchLatestConversationData();
    } else {
      // No conversation selected, reset pin status
      setIsPinned(false);
    }
  }, [selectedConversation?.conversation_id]); // Only re-run when the conversation ID changes

  // Listen for sidebar state changes
  useEffect(() => {
    const handleSidebarStateChange = (event) => {
      setSidebarOpen(event.detail.open);
      // If clicked property is present in the event, update sidebarClicked state
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
      setSidebarClicked(state.clicked !== undefined ? state.clicked : state.open);
    }
    
    return () => {
      document.removeEventListener("sidebarStateChanged", handleSidebarStateChange);
    };
  }, []);

  // State for unread PMS messages count
  const [unreadPmsCount, setUnreadPmsCount] = useState(0);

  // Calculate unread PMS messages count when selected conversation changes
  useEffect(() => {
    // Count unread messages only for the selected conversation
    if (selectedConversation && selectedConversation.messages) {
      const unreadCount = selectedConversation.messages.filter(msg => !msg.read).length;
      setUnreadPmsCount(unreadCount);
    } else {
      setUnreadPmsCount(0);
    }
  }, [selectedConversation]);

  // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  // State for tracking which note's dropdown is currently open
  const [openDropdownId, setOpenDropdownId] = useState(null);

  // State for currently editing note
  const [editingNoteId, setEditingNoteId] = useState(null);

  // Handle dropdown toggle
  const toggleDropdown = (noteId) => {
    if (openDropdownId === noteId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(noteId);
    }
  };

  // Function to call the API to get notes
  const callGetNotesApi = async () => {
    if (!selectedConversation?.conversation_id) return;
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setIsLoadingNotes(true);
  
    try {
      const config = {
        headers: { 
          "X-API-Key": API_KEY
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      // Use conversation_id as a URL query parameter
      const url = `${baseUrl}/get_notes?conversation_id=${encodeURIComponent(selectedConversation.conversation_id)}`;
      const response = await axios.get(url, config);
  
      if (response.status === 200) {
        setNotes(response.data.notes || []);
      }
      else { 
        ToastHandle(response?.data?.error || "Failed to fetch notes", "danger"); 
      }
    } catch (error) {
      ToastHandle("Error - unable to get notes", "danger");
    } finally {
      setIsLoadingNotes(false);
    }
  };

  // Function to call the API to add a note
  const callAddNoteApi = async (noteText) => {
    if (!selectedConversation?.conversation_id || !noteText.trim()) return;
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    try {
      const config = {
        headers: { 
          "X-API-Key": API_KEY
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      // According to the API documentation pattern, include conversation_id in the request body
      const bodyData = { 
        note: noteText,
        conversation_id: selectedConversation.conversation_id
      };
      
      const response = await axios.post(`${baseUrl}/add_note`, bodyData, config);
  
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
          "X-API-Key": API_KEY
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      // According to the API documentation pattern, include data in the request body
      const bodyData = { 
        note_id: noteId,
        conversation_id: selectedConversation.conversation_id
      };
      
      // For DELETE requests with a body, we need to use the data property in the config
      const response = await axios.delete(`${baseUrl}/delete_note`, { 
        ...config, 
        data: bodyData 
      });
  
      if (response.status === 200) { 
        // Remove the deleted note from the state
        setNotes(notes.filter(note => note.note_id !== noteId));
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
  const callUpdateNoteApi = async (noteId, noteText) => {
    if (!noteId || !noteText.trim()) return;
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    try {
      const config = {
        headers: { 
          "X-API-Key": API_KEY
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      // According to the API documentation for PUT /edit_note
      const bodyData = { 
        note_id: noteId,
        note: noteText
      };
      
      const response = await axios.put(`${baseUrl}/edit_note`, bodyData, config);
  
      if (response.status === 200) { 
        // Update the note in the local state
        const updatedNotes = notes.map(note => 
          note.note_id === noteId ? { ...note, note: noteText } : note
        );
        setNotes(updatedNotes);
        
        // Clear the editing state
        setEditingNoteId(null);
        setNewNote("");
        
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

  // Function to call the API to get action items
  const callGetActionItemsApi = async (status_query = 'incomplete') => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setIsLoadingActionItems(true);
  
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      const response = await axios.get(`${baseUrl}/get_action_items?status=${status_query}&limit=200`, config);
  
      if (response.status === 200) {
        setFilteredActionItems(response.data.action_items);
      }
      else { 
        ToastHandle(response?.data?.error, "danger"); 
      }
      return response.data;
    } catch (error) {
      ToastHandle("Error - unable to get action items", "danger");
      return { error: "Internal server error" };
    } finally {
      setIsLoadingActionItems(false);
    }
  };

  // Function to call the API to mark an action item as complete
  const callCompleteActionItemApi = async (actionItemId) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      const bodyData = { action_item_id: actionItemId };
      const response = await axios.put(`${baseUrl}/complete_action_item`, bodyData, config);
  
      if (response.status === 200) { 
        // Remove the completed action item from the state
        setFilteredActionItems(filteredActionItems.filter((item) => item.id !== actionItemId));
        ToastHandle("Action item marked as completed", "success");
      } else { 
        ToastHandle(response?.data?.error, "danger"); 
      }
      return response.data;
    } catch (error) {
      ToastHandle("Error completing action item", "danger");
    }
  };

  // Fetch action items when the component mounts, regardless of active tab
  useEffect(() => {
    callGetActionItemsApi();
  }, []);

  // Fetch action items when the Open Issues tab is selected
  useEffect(() => {
    if (activeTab === 'openIssue') {
      callGetActionItemsApi();
    }
  }, [activeTab]);

  // Load notes when the selected conversation changes, regardless of active tab
  useEffect(() => {
    if (selectedConversation?.conversation_id) {
      callGetNotesApi();
    }
  }, [selectedConversation?.conversation_id]);

  // Refresh notes when the tab changes to 'notes'
  useEffect(() => {
    if (activeTab === 'notes' && selectedConversation?.conversation_id) {
      callGetNotesApi();
    }
  }, [activeTab, selectedConversation?.conversation_id]);

  // Get the conversations we already have in the format needed to send to the API: { conversationId1: { last_message_time:<last_message_time_utc> }, ... }
  const getConversationsAlreadyHave = () => {
    if (conversations) {
      return conversations.reduce((acc, conversation) => {
        acc[conversation.conversation_id] = {
          last_message_time: conversation.last_message_time_utc
        };
        return acc;
      }, {});
    } else {
      return {};
    }
  };

  // Call the API to get conversations, up to the specified limit, and update the state with the returned data.
  const fetchConversations = async (limit, reset=false, urgent=false, propertyName="", phase="", meetHbOnly=false, guestName='', useConvIdQuery=true) => {
    let conversationsAlreadyHave = {};
    if (reset) { // Clear conversations state
      conversationsAlreadyHave = {};
      setConversations([]);
    }
    else { // Tell the API which conversations we already have, so we don't need to get them again if they haven't been updated
      conversationsAlreadyHave = getConversationsAlreadyHave();
    }
    const conversationId = (useConvIdQuery) ? (singleConversationIdFromUrl || null) : null;

    const data = await callGetConversationsApi(limit, conversationsAlreadyHave, urgent, propertyName, phase, meetHbOnly, guestName, conversationId);
    if (data?.conversations) { updateConversationsWithApiData(data.conversations); }
    setConversationsNotYetFetched(false);
  };

  // Sort the conversations array by the most recent message (conversation.messages[-1].time ; format MM/DD/YYYY HH:MM:SS)
  const sortConversationsByMostRecentMessage = (conversations) => {
    return conversations.sort((a, b) => {
      const timeA = new Date(a.messages[a.messages.length - 1].time);
      const timeB = new Date(a.messages[a.messages.length - 1].time);
      return timeB - timeA; // Sort in descending order
    });
  };

  // Given a conversation ID: fetch that convo from the API and update that conversation in the state
  const updateConversation = async (conversationId) => {
    const updatedConversationData = await callGetSingleConversationApi(conversationId);
    if (updatedConversationData?.conversations && updatedConversationData.conversations.length > 0) {
      const retrievedConversation = updatedConversationData.conversations[0];
      let updatedConversations = conversations.map((conversation) => {
        if (conversation.conversation_id === conversationId) {
          return retrievedConversation;
        }
        return conversation;
      });
      updatedConversations = sortConversationsByMostRecentMessage(updatedConversations);
      setConversations(updatedConversations);
      // If the conversation to be updated is selectedConversation (the one currently being viewed), update that too
      if (selectedConversation.conversation_id === conversationId) {
        setSelectedConversation(retrievedConversation);
      }
    }
  };

  // Update our conversation state with a new list returned by the API. This does NOT call the API: it takes the API data as a parameter. Also handles detecting when there are no updates from the API and making sure the previous state gets copied over.
  const updateConversationsWithApiData = (apiConversationData) => {
    let newConversationState = apiConversationData.map(conversation => {
      const conversationId = conversation['conversation_id'];
      if (!conversation.hasOwnProperty('messages')) { // the API data doesn't include messages (or most other fields) for conversations we already have if there are no updates. Get the convo ID, find the convo in our local state, and copy that old record over into the new state
        const localConversation = conversations.find(conv => conv.conversation_id === conversationId);
        return localConversation ? localConversation : conversation;
      }
      else {
        if (selectedConversation.conversation_id === conversationId) { // If this updated conversation record is the one currently being viewed, update the selectedConversation state
          setSelectedConversation(conversation);
        }
        return conversation;
      }
    });
    setConversations(newConversationState);
  };

  // Add a message to a conversation in our local record (conversations)
  const addMessageToLocalConversation = (conversationId, message) => {
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
    const isNewAccount = typeof accountAgeDays === 'number' && accountAgeDays < 4;
    if (isNewAccount || eliteFeaturesAvailable) {
      const intervalId = setInterval(() => {
        const num_existing_convos = conversations.length;
        const num_convos_to_fetch = Math.max(num_existing_convos, 2); // always fetch at least 2 convos, even if we're only looking at one (e.g. due to filter), so if there's simultaneous updates we're more likely to catch it. 2 is still an arbitrary number tbh
        fetchConversations(num_convos_to_fetch, false, urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, fromHostBuddyFilterVal, guestNameSearchVal, num_existing_convos <= 1);
      }, isNewAccount ? 10000 : 20000); // 10s for new accounts, 20s for elite users

      const timeoutId = setTimeout(() => { // Stop auto-updating after the page has been open for 2 hours (7,200,000 milliseconds = 4 hours)
        clearInterval(intervalId);
      }, 7200000);

      return () => { // Cleanup the interval and timeout on component unmount
        clearInterval(intervalId);
        clearTimeout(timeoutId);
      };
    }
  }, [conversations, eliteFeaturesAvailable, urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, fromHostBuddyFilterVal, guestNameSearchVal, accountAgeDays]);

  return (
    <>
      <style>{responsiveStyles}</style>
      <div className="inbox-content-container" 
          style={{height:"96vh" ,
                  margin:"10px" ,
                  // borderWidth:"1px" ,
                  // borderStyle:"solid",
                  // borderColor:"rgba(36, 38, 46, 1)" , 
                  // backgroundColor:"#17191F"
                  }}>
        {conversationsNotYetFetched ? <InboxLoader /> : null}
        <div className="row text-white" style={{height:"100%"}}>
          {/* Desktop View */}
          <div style={{ width: "100%", gap: "0px" }} className="d-none d-lg-flex col-lg-12">
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
            />
            <div className={`middleSectionContainer ${sidebarClicked ? (sidebarOpen ? 'sidebar-clicked-expanded' : 'sidebar-clicked-collapsed') : ''}`} style={{ width: '45%', flex: 'none', height: 'calc(100vh - 100px)', border: '1px solid #24262E' }}>
              <div style={{ display: 'flex', backgroundColor: '#17191f', padding: '5px', borderRadius: '0px', marginBottom: '4px', flexDirection: 'column'  , border:"1px solid" , borderColor:"#24262E"}}>
                {/* User header row with image, name and action icons */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  width: '100%', 
                  padding: '4px',
                  marginBottom: '4px'
                }}>
                  {/* Left side - User info */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {/* User image with square badge */}
                    <div style={{ 
                      width: '32px', 
                      height: '32px', 
                      backgroundColor: '#007bff', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      borderRadius: '4px',
                      marginRight: '5px'
                    }}>
                      {selectedConversation?.guest_name ? selectedConversation.guest_name.charAt(0).toUpperCase() : 'G'}
                    </div>
                    
                    {/* User name */}
                    <span style={{ 
                      color: 'white', 
                      fontFamily: 'DM Sans, helvetica !important', 
                      fontSize: '18px', 
                      fontWeight: '700' 
                    }}>
                      {selectedConversation?.guest_name || 'Guest'}
                    </span>
                  </div>
                  
                  {/* Right side - Icons */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>                    {/* Pin icon with square badge */}
                    <div 
                      className="pin-icon-container"
                      onClick={handlePinToggle}
                      tabIndex={0}
                      title={isPinned ? "Unpin conversation" : "Pin conversation"}
                      style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: 'rgba(189, 193, 201, 0.08)', // Normal state: #BDC1C9 with 8% opacity
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '4px',
                        marginRight: '8px',
                        cursor: 'pointer',
                        position: 'relative',
                        outline: 'none', // Remove default focus outline
                      }}
                      onMouseDown={(e) => {
                        // Add pressed style by changing backgroundColor
                        e.currentTarget.style.backgroundColor = 'rgba(15, 17, 23, 0.08)'; // Pressed state: #0F1117 with opacity
                      }}
                      onMouseUp={(e) => {
                        // Reset to normal style
                        e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                      }}
                      onMouseLeave={(e) => {
                        // Reset to normal style if mouse leaves during press
                        e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                      }}
                      onFocus={(e) => {
                        // Add focus style with blue border
                        e.currentTarget.style.boxShadow = '0 0 0 2px #3E88F7';
                      }}
                      onBlur={(e) => {
                        // Remove focus style
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                      onKeyDown={(e) => {
                        // Handle keyboard activation (Enter or Space)
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          e.currentTarget.style.backgroundColor = 'rgba(15, 17, 23, 0.08)';
                          handlePinToggle();
                        }
                      }}
                      onKeyUp={(e) => {
                        // Reset style after key press
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.currentTarget.style.backgroundColor = 'rgba(189, 193, 201, 0.08)';
                        }
                      }}
                    >
                      <img 
                        src={isPinned ? SelectedPinIcon : DefaultPinIcon} 
                        alt={isPinned ? "Unpin" : "Pin"} 
                        style={{ 
                          width: '18px', 
                          height: '18px',
                          pointerEvents: 'none' // Prevents the image from capturing events
                        }} 
                      />
                    </div>
                    
                    {/* Three dots with square badge */}
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
                    </div>
                    
                    {/* Info circle icon with background */}
                    <div style={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#01255E',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}>
                      <img 
                        src={require('./icons/info-circle.svg').default} 
                        alt="Info" 
                        style={{ 
                          width: '16px', 
                          height: '16px'
                        }} 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Tabs navigation row */}
                <div style={{ display: 'flex', width: '100%', padding: '0 9px' }}>
                  {[
                    { id: 'pms', icon: PmsIcon, text: 'PMS' },
                    { id: 'whatsapp', icon: WhatsappIcon, text: 'WhatsApp' },
                    { id: 'openIssue', icon: OpenIssueIcon, text: 'Open Issue' },
                    { id: 'notes', icon: NotesIcon, text: 'Notes' }
                  ].map((tab) => (
                    <div 
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                      }}
                      style={{ 
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        cursor: 'pointer',
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        marginRight: '18px',
                        paddingBottom: '2px',
                        justifyContent: 'space-between',
                        borderBottom: tab.id === activeTab ? '2px solid #007bff' : 'none'
                      }}
                    >
                      <img src={tab.icon} alt={tab.text} style={{ width: '15px', height: '15px', marginRight: '5px' }} />
                      <span>{tab.text}</span>
                      {/* Temporarily commented out unread message counter for PMS tab
                      {tab.id === 'pms' && unreadPmsCount > 0 && (
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
                      */}
                      {tab.id === 'openIssue' && filteredActionItems.length > 0 && (
                        <span style={{
                          backgroundColor: '#ff4d4f',
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
                          {filteredActionItems.length}
                        </span>
                      )}
                      {tab.id === 'notes' && notes.length > 0 && (
                        <span style={{
                          backgroundColor: '#1a73e8',
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
                          {notes.length}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Tab content rendered inside the div container */}
              {activeTab === 'pms' && (
                <MildeSection
                  className="box"
                  allConversationData={selectedConversation}
                  updateConversationFromApi={updateConversation}
                  updateConversationLocal={addMessageToLocalConversation}
                  subscriptionPlan={subscriptionPlan}
                  accountAgeDays={accountAgeDays}
                />
              )}
              {activeTab === 'whatsapp' && (
                <div className="box" style={{ padding: '20px', backgroundColor: '#17191f', borderRadius: '4px' }}>
                  <h3>WhatsApp Messages</h3>
                  <p>WhatsApp integration content will appear here.</p>
                </div>
              )}
              {activeTab === 'openIssue' && (
                <div className="box" style={{ padding: '0px', backgroundColor: '#0F1117', borderRadius: '4px', height: 'calc(-90px + 100vh)', overflowY: 'auto' }}>
                  
                  <div className="action-items-container">
                    {/* We would fetch action items from the API in a real implementation */}
                    {[].concat(filteredActionItems || []).filter(item => item.status !== 'completed').map(actionItem => (
                      <div key={actionItem.id} className="action-item-card" style={{
                        backgroundColor: '#23252f',
                        borderRadius: '8px',
                        padding: '10px',
                        marginBottom: '16px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                        fontFamily: "DM Sans, Helvetica",
                        fontSize: "14px"
                      }}>
                        <div className="action-item-header" style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          marginBottom: '12px'
                        }}>
                          <div className="action-item-date" style={{
                            fontSize: '14px',
                            color: '#a4a6aa'
                          }}>
                            {new Date(actionItem.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {new Date(actionItem.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })} • <span>
                              {actionItem.category}
                            </span>
                          </div>
                        </div>
                        <div className="action-item-description" style={{
                          fontSize: '14px',
                          fontWeight: '500',
                          color: 'white',
                          lineHeight: '1.4',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}>
                          <div style={{ flex: 1 }}>
                            {actionItem.item}
                          </div>
                          <label className="action-item-checkbox" style={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                            marginLeft: '12px'
                          }}>
                            <div 
                              style={{
                                backgroundColor: "rgba(74, 70, 84, 0.41)",
                                height: "32px",
                                width: "32px",
                                borderRadius: "4px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer"
                              }}
                              onClick={() => callCompleteActionItemApi(actionItem.id)}
                              title="Mark as Resolved"
                            >
                              <img src={CheckBoxIcon} alt="Mark as Resolved" />
                            </div>
                          </label>
                        </div>
                      </div>
                    ))}
                    
                    {/* If there are no items or the API hasn't been integrated yet, show these mock items */}
                    {isLoadingActionItems ? (
                      <div className="no-action-items" style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#a4a6aa'
                      }}>
                        <p>Loading...</p>
                      </div>
                    ) : (!filteredActionItems || filteredActionItems.length === 0) ? (
                      <div className="no-action-items" style={{
                        padding: '20px',
                        textAlign: 'center',
                        color: '#a4a6aa'
                      }}>
                        <p>No open issues found</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
              {activeTab === 'notes' && (
                <div className="box" style={{ 
                  padding: '0', 
                  backgroundColor: '#17191f', 
                  borderRadius: '4px', 
                  height: 'calc(100vh - 108px)', 
                  display: 'flex',
                  // border: '1px solid #24262E',
                  flexDirection: 'column'
                }}>
                  <div className="notes-container" style={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    backgroundColor: '#121318', 
                  }}>
                    {/* Notes List Area */}
                    <div style={{ 
                      flex: 1, 
                      overflowY: 'auto',
                      backgroundColor:"#0F1117",
                      padding: '5px 5px'
                    }}>
                      {isLoadingNotes ? (
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : !selectedConversation?.conversation_id ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                          Select a conversation to view notes
                        </div>
                      ) : notes.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '20px', color: '#888' }}>
                          No notes found for this conversation
                        </div>
                      ) : (
                        <div>
                          {notes.map(note => (
                            <div 
                              key={note.note_id} 
                              style={{ 
                                marginBottom: '5px',
                                color:"#D0D3DB",
                                fontSize: '14px',
                                fontFamily: 'DM Sans'
                              }}
                            >
                              {/* Note content with three dots on the same line */}
                              <div style={{ 
                                display: 'flex',
                                alignItems: 'flex-start',
                              }}>
                               
                                
                                {/* Note content with three dots menu */}
                                <div style={{
                                  backgroundColor: '#1e1f25', 
                                  padding: '9px 9px',
                                  borderRadius: '4px',
                                  boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                                  flex: 1,
                                  position: 'relative',
                                  border: '1px solid',
                                  borderColor: '#24262E'
                                }}>
                                  <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    width: '100%'
                                  }}>
                                    <div style={{ 
                                      fontSize: '14px', 
                                      color: '#D0D3DB', 
                                      whiteSpace: 'pre-wrap',
                                      flex: 1
                                    }}>
                                      {note.note}
                                    </div>
                                    
                                    {/* Three dots menu button */}
                                    <div style={{ 
                                      position: 'relative',
                                      marginLeft: '10px',
                                      flexShrink: 0
                                    }}>
                                      {deletingNoteId === note.note_id ? (
                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                          <span className="visually-hidden">Deleting...</span>
                                        </div>
                                      ) : (
                                        <div>
                                          <button
                                            onClick={() => toggleDropdown(note.note_id)}
                                            style={{
                                              background: 'none',
                                              border: 'none',
                                              color: '#777',
                                              cursor: 'pointer',
                                              padding: '4px',
                                              fontSize: '14px',
                                              marginTop: '-4px'
                                            }}
                                            title="Options"
                                          >
                                            <i className="bi bi-three-dots-vertical"></i>
                                          </button>
                                          
                                          {/* Dropdown menu */}
                                          {openDropdownId === note.note_id && (
                                            <div style={{
                                              position: 'absolute',
                                              right: '0',
                                              top: '100%',
                                              backgroundColor: '#262730',
                                              borderRadius: '4px',
                                             
                                              zIndex: 10,
                                              width: '130px',
                                              overflow: 'hidden',
                                              border: '2px solid rgb(48, 49, 51)'
                                            }}>
                                              <ul style={{
                                                listStyle: 'none',
                                                padding: '0',
                                                margin: '0'
                                              }}>
                                                <li style={{
                                                  border: '1px solid #24262E'
                                                }}>
                                                  <button 
                                                    onClick={() => {
                                                      toggleDropdown(note.note_id);
                                                      setEditingNoteId(note.note_id);
                                                      setNewNote(note.note);
                                                    }}
                                                    style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      width: '100%',
                                                      textAlign: 'left',
                                                      padding: '8px 8px',
                                                      backgroundColor: '#24262E',
                                                      border: '1px solid #24262E',
                                                      color: '#D0D3DB',
                                                      cursor: 'pointer',
                                                      fontSize: '14px',
                                                      fontFamily: '"DM Sans", Helvetica'
                                                    }}
                                                  >
                                                    <i className="bi bi-pencil-fill" style={{ marginRight: '4px' }}></i>
                                                    Update
                                                  </button>
                                                </li>
                                                <li>
                                                  <button 
                                                    onClick={() => {
                                                      toggleDropdown(note.note_id);
                                                      callDeleteNoteApi(note.note_id);
                                                    }}
                                                    style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      width: '100%',
                                                      textAlign: 'left',
                                                      padding: '8px 8px',
                                                      backgroundColor: '#24262E',
                                                      border: '1px solid #24262E',
                                                      color: '#D0D3DB',
                                                      cursor: 'pointer',
                                                      fontSize: '14px',
                                                      fontFamily: '"DM Sans", Helvetica'
                                                    }}
                                                  >
                                                    <i className="bi bi-trash" style={{ marginRight: '4px' }}></i>
                                                    Delete note
                                                  </button>
                                                </li>
                                              </ul>
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Date and time with avatar */}
                                  <div style={{ 
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: '8px'
                                  }}>
                                    {/* Small user avatar - showing full name with proper capitalization */}
                                    <div style={{ 
                                      width: 'auto',
                                      color: "#a6a9b2",
                                      height: '20px',
                                      display: 'flex',
                                      fontFamily: '"DM Sans-SemiBold", Helvetica',
                                      alignItems: 'center',
                                      marginRight: '8px',
                                      fontSize: '12px',
                                      fontWeight: 600,
                                      letterSpacing: 0,
                                      lineHeight: 'normal',
                                      position: 'relative',
                                      flexShrink: 0
                                    }}>
                                      {note.created_by ? 
                                        note.created_by.charAt(0).toUpperCase() + note.created_by.slice(1).toLowerCase() 
                                        : 'User'} .
                                    </div>
                                    
                                    {/* Date and time text in the requested format: Month Short name Date . Time */}
                                    <div style={{ 
                                       color:"#a6a9b2", 
                                       fontFamily: '"DM Sans-Regular", Helvetica',
                                       fontSize: '12px',
                                       fontWeight: 400,
                                       letterSpacing: 0,
                                       lineHeight: 'normal',
                                       position: 'relative'
                                    }}>
                                      {new Date(note.created_at_utc).toLocaleDateString('en-US', { 
                                        month: 'short'
                                      })} {new Date(note.created_at_utc).getDate()} . 
                                      {new Date(note.created_at_utc).toLocaleTimeString('en-US', { 
                                        hour: 'numeric', 
                                        minute: '2-digit', 
                                        hour12: true 
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
                    <div style={{ 
                      border: '1px solid #222',
                      padding: '8px 8px',
                      backgroundColor: '#17191F',
                      display: 'flex'
                    }}>
                      <textarea
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        onKeyDown={(e) => {
                          // Submit on Enter without Shift key
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (editingNoteId) {
                              callUpdateNoteApi(editingNoteId, newNote);
                            } else if (newNote.trim() && selectedConversation?.conversation_id) {
                              callAddNoteApi(newNote);
                            }
                          }
                          // Allow normal behavior for Shift+Enter (new line)
                        }}
                        placeholder="Type here..."
                        style={{ 
                          flex: 1,
                          backgroundColor: '#17191F',
                          border: 'none',
                          color: '#EEE',
                          padding: '8px 2px',
                          fontSize: '14px',
                          outline: 'none',
                          resize: 'none',
                          minHeight: '40px',
                          maxHeight: '100px',
                          fontFamily: 'inherit',
                          lineHeight: '1.4',
                          overflowY: 'auto'
                        }}
                        disabled={!selectedConversation?.conversation_id}
                      />
                      <button 
                        onClick={() => {
                          if (editingNoteId) {
                            callUpdateNoteApi(editingNoteId, newNote);
                          } else if (newNote.trim() && selectedConversation?.conversation_id) {
                            callAddNoteApi(newNote);
                          }
                        }}
                        style={{
                          backgroundColor: '#1a73e8',
                          color: 'white',
                          height: '30px',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '2px 2px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: selectedConversation?.conversation_id && newNote.trim() ? 'pointer' : 'not-allowed',
                          opacity: selectedConversation?.conversation_id && newNote.trim() ? '1' : '0.7'
                        }}
                        disabled={!selectedConversation?.conversation_id || !newNote.trim()}
                      >
                        {editingNoteId ? 'Update note' : '+ Add note'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className={`rightSectionContainer ${sidebarClicked ? (sidebarOpen ? 'sidebar-clicked-expanded' : 'sidebar-clicked-collapsed') : ''}`} 
              style={{ width: '27%', flex: 'none', height:"100%", 
                padding:"11px", 
                border:"1px solid #24262E"
              }}> 
            <RightSection
              className="box"
              style={{ width: "100%", height: "calc(100vh - 110px)" }}
              rightSectionData={selectedConversation}
              updateConversationFromApi={updateConversation}
            />
            </div>
          </div>


          
           
            
            {/* Mobile View */}
          <div className="d-block d-lg-none col-12">
            {currentView === 'conversations' && (
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
              />
            )}
            {currentView === 'messages' && (
              <MildeSection allConversationData={selectedConversation} updateConversationFromApi={updateConversation} updateConversationLocal={addMessageToLocalConversation} subscriptionPlan={subscriptionPlan} accountAgeDays={accountAgeDays} setCurrentView={setCurrentView} />
            )}
            {currentView === 'details' && (
              <RightSection rightSectionData={selectedConversation} updateConversationFromApi={updateConversation} setCurrentView={setCurrentView} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;