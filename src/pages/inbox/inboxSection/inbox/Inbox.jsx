import React, { useState, useEffect } from 'react';
import { callGetConversationsApi, callGetSingleConversationApi } from "../../../../helper/getConversationsTest/inboxApi";
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

  // Notes state
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isLoadingNotes, setIsLoadingNotes] = useState(false);
  const [deletingNoteId, setDeletingNoteId] = useState(null);

  // Function to call the API to get notes
  const callGetNotesApi = async () => {
    if (!selectedConversation?.conversation_id) return;
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setIsLoadingNotes(true);
  
    try {
      const config = {
        headers: { 
          "X-API-Key": API_KEY,
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      const bodyData = { conversation_id: selectedConversation.conversation_id };
      const response = await axios.get(`${baseUrl}/get_notes`, { ...config, params: bodyData });
  
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
          "X-API-Key": API_KEY,
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
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
    if (!noteId) return;
    
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    setDeletingNoteId(noteId);
    
    try {
      const config = {
        headers: { 
          "X-API-Key": API_KEY,
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };
      
      const bodyData = { note_id: noteId };
      const response = await axios.delete(`${baseUrl}/delete_note`, { ...config, data: bodyData });
  
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

  // Fetch action items when the Open Issues tab is selected
  useEffect(() => {
    if (activeTab === 'openIssue') {
      callGetActionItemsApi();
    }
  }, [activeTab]);

  // Load notes when the tab changes to 'notes' or when the selected conversation changes
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
      const timeB = new Date(b.messages[b.messages.length - 1].time);
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
    <div className="inbox-content-container" style={{height:"96vh" ,margin:"10px" ,borderWidth:"1px" ,borderStyle:"solid",borderColor:"rgba(36, 38, 46, 1)"}}>
      {conversationsNotYetFetched ? <InboxLoader /> : null}
      <div className="row text-white" style={{height:"100%"}}>
        {/* Desktop View */}
        <div style={{ width: "100%", gap: "2px" }} className="d-none d-lg-flex col-lg-12">
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
          />
          <div className='middleSectionContainer' style={{ width: '40%', flex: 'none' ,height: 'calc(100vh - 100px)' }}>
            <div>
              {/* here user image , name ,  */}
            </div>
            <div style={{ display: 'flex', backgroundColor: '#17191f', padding: '4px', borderRadius: '4px', marginBottom: '4px' }}>
              {/* Tabs for navigation */}
              <div style={{ display: 'flex', width: '100%' }}>
                {[
                  { id: 'pms', icon: PmsIcon, text: 'PMS' },
                  { id: 'whatsapp', icon: WhatsappIcon, text: 'WhatsApp' },
                  { id: 'openIssue', icon: OpenIssueIcon, text: 'Open Issue' },
                  { id: 'notes', icon: NotesIcon, text: 'Notes' }
                ].map((tab) => (
                  <div 
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id); // Update active tab state
                    }}
                    style={{ 
                      fontFamily: "DM Sans", // Changed from fontStyle to fontFamily
                      fontSize: "14px",
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px',
                      justifyContent: 'space-between', // Changed from alignItems to justifyContent
                      borderBottom: tab.id === activeTab ? '2px solid #007bff' : 'none' // Blue underline for active tab
                    }}
                  >
                    <img src={tab.icon} alt={tab.text} style={{ width: '15px', height: '15px', marginRight: '5px' }} />
                    <span>{tab.text}</span>
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
              <div className="box" style={{ padding: '0px', backgroundColor: 'rgb(0,0,0)', borderRadius: '4px', height: 'calc(100vh - 30px)', overflowY: 'auto' }}>
                
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
                  {(!filteredActionItems || filteredActionItems.length === 0) && (
                    <div className="no-action-items" style={{
                      padding: '20px',
                      textAlign: 'center',
                      color: '#a4a6aa'
                    }}>
                      <p>Loading </p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {activeTab === 'notes' && (
              <div className="box" style={{ 
                padding: '0', 
                backgroundColor: '#17191f', 
                borderRadius: '4px', 
                height: 'calc(100vh - 60px)', 
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div className="notes-container" style={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  overflowY: 'auto'
                }}>
                  {/* Messages/Notes List Area */}
                  <div style={{ 
                    flex: 1, 
                    overflowY: 'auto',
                    padding: '10px 20px'
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
                              marginBottom: '16px',
                            }}
                          >
                            {/* Note header with user and timestamp */}
                            <div style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              marginBottom: '6px' 
                            }}>
                              <div style={{ 
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: '#146ef5',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '8px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: 'white'
                              }}>
                                {note.created_by ? note.created_by.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div style={{ fontSize: '13px', color: '#a4a6aa' }}>
                                <span style={{ fontWeight: '500', color: '#d8d8d8' }}>{note.created_by || 'User'}</span>
                                <span style={{ marginLeft: '8px', color: '#777' }}>
                                  {new Date(note.created_at_utc).toLocaleDateString('en-US', { 
                                    month: 'numeric', 
                                    day: 'numeric'
                                  })} {new Date(note.created_at_utc).toLocaleTimeString('en-US', { 
                                    hour: 'numeric', 
                                    minute: '2-digit', 
                                    hour12: true 
                                  })}
                                </span>
                              </div>
                            </div>
                            
                            {/* Note content with delete button */}
                            <div style={{ 
                              backgroundColor: '#24262E', 
                              padding: '12px 15px',
                              borderRadius: '4px',
                              position: 'relative',
                              marginLeft: '32px'
                            }}>
                              <div style={{ fontSize: '14px', color: 'white', whiteSpace: 'pre-wrap' }}>
                                {note.note}
                              </div>
                              
                              {/* Delete icon absolutely positioned to the top right */}
                              <div style={{ 
                                position: 'absolute', 
                                top: '10px', 
                                right: '10px',
                                cursor: 'pointer'
                              }}>
                                {deletingNoteId === note.note_id ? (
                                  <div className="spinner-border spinner-border-sm text-danger" role="status">
                                    <span className="visually-hidden">Deleting...</span>
                                  </div>
                                ) : (
                                  <button
                                    onClick={() => callDeleteNoteApi(note.note_id)}
                                    style={{
                                      background: 'none',
                                      border: 'none',
                                      color: '#888',
                                      cursor: 'pointer',
                                      padding: '0',
                                      fontSize: '14px'
                                    }}
                                    title="Delete note"
                                  >
                                    <i className="bi bi-three-dots-vertical"></i>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Note Input Area - Fixed at bottom */}
                  <div style={{ 
                    borderTop: '1px solid #222',
                    padding: '15px 20px',
                    backgroundColor: '#17191f'
                  }}>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (newNote.trim() && selectedConversation?.conversation_id) {
                          callAddNoteApi(newNote);
                        }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}
                    >
                      <input
                        type="text"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        placeholder="Type here..."
                        style={{ 
                          flex: 1,
                          backgroundColor: '#17191f',
                          border: 'none',
                          color: '#EEE',
                          padding: '8px 2px',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                        disabled={!selectedConversation?.conversation_id}
                      />
                      <button 
                        type="submit"
                        style={{
                          backgroundColor: '#146ef5',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '4px 4px',
                          fontSize: '12px',
                          cursor: selectedConversation?.conversation_id && newNote.trim() ? 'pointer' : 'not-allowed',
                          opacity: selectedConversation?.conversation_id && newNote.trim() ? '1' : '0.7'
                        }}
                        disabled={!selectedConversation?.conversation_id || !newNote.trim()}
                      >
                        + Add note
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='rightSectionContainer' style={{ width: '30%', flex: 'none' ,height:"100%" ,paddingLeft:"10px"}}> 
          <RightSection
            className="box"
            style={{ width: "100%", height: "calc(100vh - 100px)" }}
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
  );
};

export default Inbox;