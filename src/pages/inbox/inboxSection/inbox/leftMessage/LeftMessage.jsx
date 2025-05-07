import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";
import { BoxLoader } from "../../../../../helper/Loader";
import { TextField } from "./searchComponent/searchInput"; // Import the TextField component

import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";

// Add a simple modal component
function FilterModal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal-content">
        <button className="filter-modal-close" onClick={onClose}></button>
        <h3 style={{ marginBottom: '16px', color: '#ffffff', fontSize: '16px', fontWeight: '500' }}>Filters</h3>
        {children}
      </div>
    </div>
  );
}

const LeftMessage = ({ allPropertyNamesList, allGuestNames, allConversations, setAllConversations, setSelectedConvo, fetchConversations, userHasPMS, urgentFilterIsEnabled, setUrgentFilterIsEnabled, propertyFilterVal, setPropertyFilterVal, phaseFilterVal, setPhaseFilterVal, fromHostBuddyFilterVal, setFromHostBuddyFilterVal, guestNameSearchVal, setGuestNameSearchVal, setCurrentView, currentView, setAllowConvIdQuery }) => {

  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [nextBatchLoading, setNextBatchLoading] = useState(false);

  const [filteredGuests, setFilteredGuests] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [guestNameInputVal, setGuestNameInputVal] = useState(""); // currently typed text in the guest name search input
  
  const [filterQueryLoading, setFilterQueryLoading] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  
  // Temporary filter state (not applied until user clicks "Apply")
  const [tempPropertyFilter, setTempPropertyFilter] = useState("");
  const [tempPhaseFilter, setTempPhaseFilter] = useState("");
  const [tempUrgentFilter, setTempUrgentFilter] = useState(false);
  const [tempFromHostBuddyFilter, setTempFromHostBuddyFilter] = useState(false);
  const [tempGuestNameFilter, setTempGuestNameFilter] = useState("");

  // Use the current date for real-time checking
  const currentDate = new Date();
  // Function to check if a date is today - using the proper YYMMDD_HHMMSS format
  const isToday = (dateString) => {
    if (!dateString) return false;
    
    try {
      // Parse the YYMMDD_HHMMSS format
      // Format example: 250419_120000 (for April 19, 2025 at 12:00:00)
      const year = parseInt('20' + dateString.substring(0, 2)); // Convert YY to YYYY
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

  // Load the next batch of conversations. fetchConversations handles excluding conversations we already have, calling the API, and updating the state
  const loadNextBatch = async () => {
    setAllowConvIdQuery(false); // once the user decides to load more conversations: we cno longer want to regard the conversationId query param, if one was passed
    setNextBatchLoading(true);
    const num_existing_convos = allConversations.length;
    await fetchConversations(num_existing_convos+10, false, urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, fromHostBuddyFilterVal, guestNameSearchVal, false);
    setNextBatchLoading(false);
  };

  useEffect(() => {
    if (searchInputValue.trim() === "") {
      setFilteredConversations(allConversations);
    } else {
      const filtered = allConversations.filter(convo => 
        convo.guest_name && 
        convo.guest_name.toLowerCase().includes(searchInputValue.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [allConversations, searchInputValue]);

  // When loadNextBatch is defined (i.e. component mount), initialize the event listener that tracks scrolling (so we can load more convos whenever the user scrolls to the bottom)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) { // 5px buffer to load just before reaching the bottom
          loadNextBatch();
        }
      }
    };
    const container = containerRef.current;
    if (container) { container.addEventListener('scroll', handleScroll); }
    return () => {
      if (container) { container.removeEventListener('scroll', handleScroll); }
    };
  }, [loadNextBatch]);

  // Mark a conversation as opened, in the state and in the API
  const markConversationAsOpened = (conversationId, propertyName) => {

    // Make sure the conversation isn't already opened
    const conversation = allConversations.find(convo => convo.conversation_id === conversationId);
    if (conversation && conversation.opened) { return; }

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

  const openConversationHandle = (data, id) => {
    setSelectedConvo(data);
    setSelectedConversationId(id); // This is used to highlight the selected conversation
    markConversationAsOpened(data.conversation_id, data.property_name);

    // On mobile, navigate to messages view
    if (window.innerWidth < 992) {
      setCurrentView('messages');
    }
  };

  // Modify the useEffect that auto-selects the first conversation
  useEffect(() => {
    const isMobile = window.innerWidth < 992;
    const conversationsToUse = filteredConversations.length > 0 ? filteredConversations : allConversations;
    
    if (selectedConversationId === "" && conversationsToUse.length > 0 && (!isMobile || currentView !== 'conversations')) {
      openConversationHandle(conversationsToUse[0], conversationsToUse[0]?.conversation_id);
    }
  }, [filteredConversations, allConversations, currentView]);

  // Add the listener for clicking outside the guest search dropdown (so it can be closed)
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handlePropertyFilterChange = (e) => {
    // Store selected value in temporary state without applying filter
    setTempPropertyFilter(e.target.value);
  };

  const handleUrgentClick = () => {
    // Toggle urgent filter in temporary state without applying
    setTempUrgentFilter(!tempUrgentFilter);
  }

  const handleFromHostBuddyClick = () => {
    // Toggle FromHostBuddy filter in temporary state without applying
    setTempFromHostBuddyFilter(!tempFromHostBuddyFilter);
  }

  const handlePhaseFilterChange = (e) => {
    // Store selected phase in temporary state without applying filter
    setTempPhaseFilter(e.target.value);
  };

  const handleResetFilters = () => {
    // Reset all temporary filters to default values
    setTempPropertyFilter("");
    setTempPhaseFilter("");
    setTempUrgentFilter(false);
    setTempFromHostBuddyFilter(false);
    setTempGuestNameFilter("");
  };

  const handleApplyFilters = async () => {
    // Only fetch if filters have changed
    if (tempPropertyFilter !== propertyFilterVal ||
        tempPhaseFilter !== phaseFilterVal ||
        tempUrgentFilter !== urgentFilterIsEnabled ||
        tempFromHostBuddyFilter !== fromHostBuddyFilterVal ||
        tempGuestNameFilter !== guestNameSearchVal) {
      
      setFilterQueryLoading(true);
      
      // Update the actual filter states with temporary values
      setPropertyFilterVal(tempPropertyFilter);
      setPhaseFilterVal(tempPhaseFilter);
      setUrgentFilterIsEnabled(tempUrgentFilter);
      setFromHostBuddyFilterVal(tempFromHostBuddyFilter);
      setGuestNameSearchVal(tempGuestNameFilter);
      
      // Apply filters by fetching filtered conversations
      await fetchConversations(10, true, tempUrgentFilter, tempPropertyFilter, tempPhaseFilter, tempFromHostBuddyFilter, tempGuestNameFilter);
      
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
    setFilterModalOpen(true);
  };

  const handleGuestSearchChange = async (e) => {
    const searchVal = e.target.value;
    setGuestNameInputVal(searchVal);

    if (searchVal) {
      const searchValLower = searchVal.toLowerCase().replace(/[^a-z0-9]/g, '');
      const filtered = allGuestNames.filter(guest =>
        guest.searchable.startsWith(searchValLower)
      );
      setFilteredGuests(filtered);
    } else {
      setFilteredGuests([]);
      if (guestNameSearchVal) {
        setGuestNameSearchVal("");
        setFilterQueryLoading(true);
        await fetchConversations(10, true, false, '', '', false, '');
        setFilterQueryLoading(false);
      }
    }
  };

  const handleGuestClick = async (guest) => {
    setFilterQueryLoading(true);
    setFilteredGuests([]);
    setGuestNameSearchVal(guest.name);

    // Clear all other filters. Guest name search overrides everything
    setPropertyFilterVal("");
    setPhaseFilterVal("");
    setUrgentFilterIsEnabled(false);
    setFromHostBuddyFilterVal(false);

    await fetchConversations(10, true, false, '', '', false, guest.name);

    setFilterQueryLoading(false);
  };

  const handleClickOutside = (event) => { // Close the dropdown if the user clicks outside of it
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setFilteredGuests([]);
    }
  };

  return (
    <div className="left-bar" style={{ width: '30%' ,height: '100vh', overflowY: 'auto'}}>
      <div className="message-filter">
        <div className="messsage-search" >
          <div className="search-container" >
            <TextField 
              className="custom-padding"
              type="search" 
              placeholder="Search..." 
              style={{ width: "100%", borderRadius: "4px", paddingLeft: '30px' }}
              onChange={handleSearchInputChange}
              value={searchInputValue}
            />
          </div>
          <button 
            className="filters-button"
            onClick={openFilterModal} 
            style={{ marginLeft: '8px', whiteSpace: 'nowrap' }}
          >
            <i className="bi bi-filter"></i>
            Filters
          </button>
        </div>
      </div>
      <FilterModal show={filterModalOpen} onClose={() => setFilterModalOpen(false)}>
        <div className="filter-btns">
          {/* Properties Select */}
          <div className="custom-select">
            <div className="filter-section-label">Property</div>
            <select 
              name="all" 
              id="all" 
              value={tempPropertyFilter} 
             // className={`${tempPropertyFilter ? "select-active" : "bg-dark"}`}
             className={`${tempPropertyFilter ? "bg-dark" : "bg-dark"}`}  
              onChange={handlePropertyFilterChange}
              style={{ width: "290px" }}
            >
              <option value="" style={{ width: "290px" }}>
                All Properties
              </option>
              {allPropertyNamesList?.map((option, index) => (
                <option key={option} value={option} >
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          {/* Phase Select */}
          <div className="custom-select">
            <div className="filter-section-label">Phase</div>
            <select 
              name="all" 
              id="all" 
              value={tempPhaseFilter} 
              className={`${tempPhaseFilter ? "bg-dark" : "bg-dark"}`} 
              onChange={handlePhaseFilterChange}
            >
              <option value="">All Phases</option>
                <option value='inquiry'>Inquiry</option>
                <option value='future'>Future</option>
                <option value='current'>Current</option>
                <option value='past'>Past</option>
            </select>
          </div>
          
          {/* Urgent Button */}
          <div>
            <div className="filter-section-label">Importance</div>
            <span 
              onClick={handleUrgentClick} 
              className={`${tempUrgentFilter ? "bg-light text-dark" : "bg-dark"} pointer-cursor`}
            >
              Urgent
            </span>
          </div>
          
          {/* HostBuddy Messages Button */}
          <div>
            <div className="filter-section-label">Source</div>
            <span 
              onClick={handleFromHostBuddyClick} 
              className={`${tempFromHostBuddyFilter ? "bg-light text-dark" : "bg-dark"} pointer-cursor`}
            >
              From HostBuddy
            </span>
          </div>
        </div>
        
        {/* Filter Action Buttons */}
        <div className="filter-modal-actions">
          <button 
            className="filter-modal-button reset-button" 
            onClick={handleResetFilters}
          >
            Reset Filters
          </button>
          <div style={{ display: 'flex', gap: '3px' }}>
            <button 
              className="filter-modal-button cancel-button" 
              onClick={handleCancelFilters}
              style={{ borderRadius: '4px' }}
            >
              Cancel
            </button>
            <button 
              className="filter-modal-button apply-button" 
              onClick={handleApplyFilters}
              style={{ borderRadius: '4px' }}
            >
              Apply
            </button>
          </div>
        </div>
      </FilterModal>
      {filterQueryLoading ? (<BoxLoader />) : (
        filteredConversations && filteredConversations.length ? (
          <div className={`left-bar-chat`} ref={containerRef}>
            {filteredConversations.map((message) => {
              const { property_name, guest_name, arrival_date, departure_date, opened, conversation_id, image_url, channel , action_items , user, status } = message;
              const allDataForConversation = message;
              const messages = message?.messages; // Assuming message?.messages is an array
              const lastValue = messages[messages.length - 1];
              const { sender, text, time } = lastValue;
              let shortenedText = text;
              if (text.length > 50) {
                shortenedText = text.slice(0, 50) + "...";
              } else {
                shortenedText = text;
              }

              // Based on which of these fields are present (arrival_date, departure_date, property_name): render the appropriate string
              let datesAndPropertyNameDisplay = "";
              const reservationDateRange = formatDateRange(arrival_date, departure_date);
              if (reservationDateRange && property_name) {
                datesAndPropertyNameDisplay = `${reservationDateRange} | ${property_name}`;
              } else if (reservationDateRange) {
                datesAndPropertyNameDisplay = reservationDateRange;
              } else if (property_name) {
                datesAndPropertyNameDisplay = property_name;
              } else {
                datesAndPropertyNameDisplay = '';
              }

              return (
                <React.Fragment key={conversation_id}>
                  <div 
                    className={`conversation-item ${conversation_id === selectedConversationId ? "bg-dark" : ""} left-inner-tab`}
                    onClick={() => openConversationHandle(allDataForConversation, conversation_id)}
                  >
                    <div className="left-bar-container">
                      <div className="image-container">
                        <img 
                          src={image_url ? image_url : dummyPropertyImg} 
                          alt="Property Thumbnail Image" 
                          className="property-thumbnail"
                          onError={(e) => { e.target.onerror = null; e.target.src = dummyPropertyImg; }}
                        />
                      </div>
                      <div className="content-container">
                        {/* First line: Guest name and time format */}
                        <div className="description-container description-item">
                          <h2 className="guest-name ">
                            {channel !== 'hostbuddy' ? (
                              opened ? guest_name : <strong>{guest_name}</strong>
                            ) : (
                              opened ? 'Chat Window' : <strong>Chat Window</strong>
                            )}
                          </h2>
                          <div className="date date-no-margin">
                            {opened ? timeFormat(time) : <strong>{timeFormat(time)}</strong>}
                          </div>
                        </div>
                        
                        {/* Second line: Message text and count of unread messages */}
                        <div className="message-container short-des">
                          <div className="message-text">
                            {opened ? (
                              <>
                                <strong></strong> {shortenedText}
                              </>
                            ) : (
                              <strong> {shortenedText}</strong>
                            )}
                          </div>
                          {!opened && (
                            <span className="message-counter">
                              {messages && messages.filter(msg => !msg.read).length || 1}
                            </span>
                          )}
                        </div>
                        
                        {/* Third line: Reservation date and property address */}
                        <div className="reservation-info">
                          <div>
                            {/* Reservation date range */}
                            {arrival_date && departure_date && (
                              <span>{formatDateRange(arrival_date, departure_date, false)}</span>
                            )}
                          </div>
                          <div>
                            {/* Property address/name */}
                            {property_name && <span>{property_name}</span>}
                          </div>
                        </div>
                        
                        {/* Fourth line: User and status indicators */}
                        <div className="status-container">
                          <div>
                            {/* User from line 324 */}
                            <span className="user-badge ">
                              {user || sender || "Unknown"}
                            </span>
                            {action_items && action_items.length === 0 && 
                              <span className="urgent-badge">
                                urgent
                              </span>
                            }
                            {/* Display status badges */}
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
                          <div className="status-indicators">
                            {/* Status indicators */}
                            
                            {isToday(departure_date) && 
                              <span className="checkout-badge">
                                check-out today
                              </span>
                            }
                            {isToday(arrival_date) && 
                              <span className="checkin-badge">
                                check-in today
                              </span>
                            }
                                {status === 'future' && 
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
                            }{status === 'past' && 
                              <span className="inquiry-badge">
                                past
                              </span>
                            }

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                </React.Fragment>
              );
            })}
            
            {/* Button to load more conversations (failsafe for auto-load when user scrolls to bottom) - or loader icon if already loading */}
            {nextBatchLoading ? (
              <div className="loading-container">
                <BoxLoader />
              </div>
            ) : (
              <button className="btn btn-primary load-more-button" onClick={loadNextBatch}>
                Load More
              </button>
            )}
          </div>
        ) : (
          (searchInputValue || fromHostBuddyFilterVal || urgentFilterIsEnabled || propertyFilterVal || phaseFilterVal || guestNameSearchVal) ? (
            <div className="no-messages-container">
              <p className="no-messages-text">No conversations match the selected filters.</p>
            </div>
          ) : (
            userHasPMS ? (
              <div className="no-messages-container">
                <p className="no-messages-text">No conversations found.</p>
              </div>
            ) : (
              <div className="no-messages-container no-messages-wide">
                <p className="no-messages-text">No conversations found. <Link to="/getstarted">Connecting your PMS</Link> will automatically import your conversations.</p>
              </div>
            )
          )
        )
      )}
    </div>
  );
};

export default LeftMessage;
