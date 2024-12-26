import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";
import { BoxLoader } from "../../../../../helper/Loader";

import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";

const LeftMessage = ({ allPropertyNamesList, allGuestNames, allConversations, setAllConversations, setSelectedConvo, fetchConversations, userHasPMS, urgentFilterIsEnabled, setUrgentFilterIsEnabled, propertyFilterVal, setPropertyFilterVal, phaseFilterVal, setPhaseFilterVal, fromHostBuddyFilterVal, setFromHostBuddyFilterVal, guestNameSearchVal, setGuestNameSearchVal, setCurrentView, currentView, setAllowConvIdQuery }) => {

  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [nextBatchLoading, setNextBatchLoading] = useState(false);

  const [filteredGuests, setFilteredGuests] = useState([]);
  const [searchFocus, setSearchFocus] = useState(false);
  const [guestNameInputVal, setGuestNameInputVal] = useState(""); // currently typed text in the guest name search input
  
  const [filterQueryLoading, setFilterQueryLoading] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Load the next batch of conversations. fetchConversations handles excluding conversations we already have, calling the API, and updating the state
  const loadNextBatch = async () => {
    setAllowConvIdQuery(false); // once the user decides to load more conversations: we cno longer want to regard the conversationId query param, if one was passed
    setNextBatchLoading(true);
    const num_existing_convos = allConversations.length;
    await fetchConversations(num_existing_convos+10, false, urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, fromHostBuddyFilterVal, guestNameSearchVal, false);
    setNextBatchLoading(false);
  };

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
    // Only auto-select if:
    // 1. No conversation is selected yet (selectedConversationId is empty)
    // 2. There are conversations to select from
    // 3. Either we're on desktop OR we're not coming back from a conversation view
    const isMobile = window.innerWidth < 992;
    if (selectedConversationId === "" && allConversations.length > 0 && (!isMobile || currentView !== 'conversations')) {
      openConversationHandle(allConversations[0], allConversations[0]?.conversation_id);
    }
  }, [allConversations, currentView]);

  // Add the listener for clicking outside the guest search dropdown (so it can be closed)
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePropertyFilterChange = async (e) => {
    if (filterQueryLoading) { return; }
    const selectedFilterVal = e.target.value;
    setFilterQueryLoading(true);

    await fetchConversations(10, true, urgentFilterIsEnabled, selectedFilterVal, phaseFilterVal, fromHostBuddyFilterVal, '');

    setFilterQueryLoading(false);
    setPropertyFilterVal(selectedFilterVal);
  };

  const handleUrgentClick = async () => {
    if (filterQueryLoading) { return; }
    setFilterQueryLoading(true);

    await fetchConversations(10, true, !urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, fromHostBuddyFilterVal, '');
    
    setFilterQueryLoading(false);
    setUrgentFilterIsEnabled(!urgentFilterIsEnabled);
  }

  const handleFromHostBuddyClick = async () => {
    if (filterQueryLoading) { return; }
    setFilterQueryLoading(true);

    await fetchConversations(10, true, urgentFilterIsEnabled, propertyFilterVal, phaseFilterVal, !fromHostBuddyFilterVal, '');
    
    setFilterQueryLoading(false);
    setFromHostBuddyFilterVal(!fromHostBuddyFilterVal);
  }

  const handlePhaseFilterChange = async (e) => {
    if (filterQueryLoading) { return; }
    const selectedFilterVal = e.target.value;
    setFilterQueryLoading(true);

    await fetchConversations(10, true, urgentFilterIsEnabled, propertyFilterVal, selectedFilterVal, fromHostBuddyFilterVal, '');

    setFilterQueryLoading(false);
    setPhaseFilterVal(selectedFilterVal);
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
    <div className="left-bar">
      <div className="message-filter">
        <div className="messsage-search">
          <h2>Messages</h2>
          <button onClick={() => setFiltersVisible(!filtersVisible)} className={filtersVisible ? "bg-light text-dark" : ""}>
            Filters
          </button>
        </div>
        {filtersVisible && (
          <div className="filter-btns">

            {/* Guest Search */}
            {allGuestNames && allGuestNames.length > 0 && (
              <div className="search-input-wrapper" ref={dropdownRef}>
                <div className="search-input" style={{ maxWidth: (searchFocus || guestNameInputVal) ? '400px' : '150px' }}>
                  <input type="search" value={guestNameInputVal} onChange={handleGuestSearchChange} placeholder={searchFocus ? "" : "Guest name..."} onFocus={() => setSearchFocus(true)} onBlur={() => setSearchFocus(false)} style={{width:"100%", maxWidth:"100%"}} />
                  {!guestNameInputVal && <i className="bi bi-search search-icon"></i> }
                </div>
                {filteredGuests.length > 0 && (
                  <div className="dropdown">
                    {filteredGuests.map((guest) => (
                      <div key={guest?.id_for_react} className="dropdown-item" onClick={() => handleGuestClick(guest)}>
                        <div className="guest-name">{guest.name}</div>
                        <div className="guest-property">{guest.property}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Properties Select */}
            <div className="custom-select">
              <select name="all" id="all" value={propertyFilterVal} className={`${propertyFilterVal ? "select-active" : "bg-dark"}`} onChange={handlePropertyFilterChange}>
                <option value="">
                  All Properties
                </option>
                {allPropertyNamesList?.map((option, index) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Phase Select */}
            <div className="custom-select">
              <select name="all" id="all" value={phaseFilterVal} className={`${phaseFilterVal ? "select-active" : "bg-dark"}`} onChange={handlePhaseFilterChange} style={{minWidth:"120px"}}>
                <option value="">All Phases</option>
                  <option value='inquiry'>Inquiry</option>
                  <option value='future'>Future</option>
                  <option value='current'>Current</option>
                  <option value='past'>Past</option>
              </select>
            </div>

            {/* Urgent Button */}
            <span onClick={handleUrgentClick} className={`${urgentFilterIsEnabled ? "bg-light text-dark" : "bg-dark"}`} style={{cursor:"pointer"}}>
              Urgent
            </span>

            {/* HostBuddy Messages Button */}
            <span onClick={handleFromHostBuddyClick} className={`${fromHostBuddyFilterVal ? "bg-light text-dark" : "bg-dark"}`} style={{cursor:"pointer"}}>
              From HostBuddy
            </span>

          </div>
        )}
      </div>
      {filterQueryLoading ? (<BoxLoader />) : (
        allConversations && allConversations.length ? (
          <div className={`left-bar-chat ${filtersVisible ? 'filters-visible' : ''}`} ref={containerRef}>
            {allConversations?.map((message) => {
              const { property_name, guest_name, arrival_date, departure_date, opened, conversation_id, image_url, channel } = message;
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

              /*
              if (datesAndPropertyNameDisplay.length > 40) {
                datesAndPropertyNameDisplay = datesAndPropertyNameDisplay.slice(0, 40) + "...";
              }
              */

              return (
                <React.Fragment key={conversation_id}>
                  <div style={{ cursor: "pointer", overflow: 'hidden', width: '100%' }}
                    className={`${conversation_id === selectedConversationId && "bg-dark"} left-inner-tab`}
                    onClick={() => openConversationHandle(allDataForConversation, conversation_id)}
                  >
                    <div style={{ display:'flex', alignItems:'flex-start', overflow: 'hidden', width: '100%' }}>
                      <div style={{flexShrink:0}}>
                        <img src={image_url ? image_url : dummyPropertyImg} alt="Property Thumbnail Image" style={{width:"61px", height:"61px", marginTop:"2px"}} onError={(e) => { e.target.onerror = null; e.target.src = dummyPropertyImg; }}/>
                      </div>
                      <div className="left-description" style={{ flex: 1, marginLeft: '10px', overflow: 'hidden' }}>
                        <div className="d-flex justify-content-between description-item">
                          <h2>
                            {channel != 'hostbuddy' ? (
                              opened ? guest_name : <strong>{guest_name}</strong>
                            ) : (
                              opened ? 'Chat Window' : <strong>Chat Window</strong>
                            )}
                          </h2>
                          <div className="date" style={{margin:"0"}}>
                            {opened ? timeFormat(time) : <strong>{timeFormat(time)}</strong>}
                          </div>
                        </div>
                        <div className="short-des" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {opened ? (
                          <>
                            <strong>{sender}:</strong> {shortenedText}
                          </>
                        ) : (
                          <strong>{sender}: {shortenedText}</strong>
                        )}
                        </div>
                        <div className="date" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {opened ? datesAndPropertyNameDisplay : <strong>{datesAndPropertyNameDisplay}</strong>}
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
              <div style={{height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <BoxLoader />
              </div>
            ) : (
              <button className="btn btn-primary" onClick={loadNextBatch} style={{display:'block', margin:'10px auto 0px auto', borderRadius:'50px'}}>
                Load More
              </button>
            )}
          </div>
        ) : (
          (fromHostBuddyFilterVal || urgentFilterIsEnabled || propertyFilterVal || phaseFilterVal || guestNameSearchVal) ? (
            <div className="no-messages" style={{textAlign:'center', margin:'10px auto 0 auto', width:'85%'}}>
              <p style={{color:'#AAA', fontSize:'16px'}}>No conversations match the selected filters.</p>
            </div>
          ) : (
            userHasPMS ? (
              <div className="no-messages" style={{textAlign:'center', margin:'10px auto 0 auto', width:'85%'}}>
                <p style={{color:'#AAA', fontSize:'16px'}}>No conversations found.</p>
              </div>
            ) : (
              <div className="no-messages" style={{textAlign:'center', margin:'10px auto 0 auto', width:'95%'}}>
                <p style={{color:'#AAA', fontSize:'16px'}}>No conversations found. <Link to="/getstarted">Connecting your PMS</Link> will automatically import your conversations.</p>
              </div>
            )
          )
        )
      )}
    </div>
  );
};

export default LeftMessage;
