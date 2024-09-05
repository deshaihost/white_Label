import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../../../../redux/actions";
import { formatDateRange, timeFormat } from "../../../../../helper/commonFun";
import { callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";
import { BoxLoader } from "../../../../../helper/Loader";

const LeftMessage = ({ allConversations, setAllConversations, setSelectedConvo, fetchConversations, urgentFilterIsEnabled, setUrgentFilterIsEnabled, propertyFilterValue, setPropertyFilterValue }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const containerRef = useRef(null);

  const [selectedSearch, setSelectedSearch] = useState({type: "", textGet: "", search: ""});
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [nextBatchLoading, setNextBatchLoading] = useState(false);
  
  const [filterQueryLoading, setFilterQueryLoading] = useState(false);

  // Load the next batch of conversations. fetchConversations handles excluding conversations we already have, calling the API, and updating the state
  const loadNextBatch = async () => {
    setNextBatchLoading(true);
    const num_existing_convos = allConversations.length;
    await fetchConversations(num_existing_convos+10, false, urgentFilterIsEnabled, propertyFilterValue);
    setNextBatchLoading(false);
  };

  // When loadNextBatch is defined (i.e. component mount), initialize the event listener that tracks scrolling (so we can load more convos whenever the user scrolls to the bottom)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) { loadNextBatch(); }
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
  };

  // As soon as the state populates with conversations, select the first one (if none is selected yet)
  useEffect(() => {
    if (selectedConversationId === "" && allConversations.length > 0) {
      openConversationHandle(allConversations[0], allConversations[0]?.conversation_id);
    }
  }, [allConversations]);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];

  const [searchActive, setSearchActive] = useState(0);
  const [searchInputShow, setSearchInputShow] = useState(false);
  
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  const selectedHndle = (value, valueType, valueId) => {
    setSelectedSearch({
      typeSearch: valueType,
      textGet: value,
    });
    setSearchActive(valueId);
  };

  const searchCloseHndl = () => {
    setSearchInputShow(!searchInputShow);
    setSelectedSearch({
      type: "",
      textGet: "",
      search: "",
    });
  };

  const handlePropertyFilterChange = async (e) => {
    if (filterQueryLoading) { return; }
    const selectedFilterVal = e.target.value;
    setFilterQueryLoading(true);

    await fetchConversations(10, true, urgentFilterIsEnabled, selectedFilterVal);

    setFilterQueryLoading(false);
    setPropertyFilterValue(selectedFilterVal);
  };

  const handleUrgentClick = async () => {
    if (filterQueryLoading) { return; }
    setFilterQueryLoading(true);

    await fetchConversations(10, true, !urgentFilterIsEnabled, propertyFilterValue);
    
    setFilterQueryLoading(false);
    setUrgentFilterIsEnabled(!urgentFilterIsEnabled);
  }

  return (
    <div className="left-bar">
      <div className="message-filter">
        <div className="messsage-search">
          <h2>Messages</h2>
          {/* Search button
          <div className={`${searchInputShow && "active"} search-form`}>
            <input type="search" name="search" value={selectedSearch?.search} onChange={(e) => {setSelectedSearch({ search: e.target.value });}}/>
            {searchInputShow ? (
              <i class="bi bi-x" onClick={searchCloseHndl}></i>
            ) : (
              <i class="bi bi-search" onClick={searchCloseHndl}></i>
            )}
          </div>
          */}
        </div>
        <div className="filter-btns">

          {/* Properties Select */}
          <div className="custom-select">
            <select name="all" id="all" value={propertyFilterValue} className={`${propertyFilterValue ? "select-active" : "bg-dark"}`} onChange={handlePropertyFilterChange}>
              <option value="" selected>
                All Properties
              </option>
              {allPropertyName?.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Phase Select
          <div className="custom-select">
            <select name="phase" id="phase" value={selectedSearch?.textGet}
              className={`${searchActive === 1 ? "select-active" : "bg-dark"}`}
              onChange={(e) => selectedHndle(e.target.value, "Phase", 1)}
            >
              <option value="" selected>
                Phase
              </option>
              {["Current", "Inquiry", "Future", "Past"].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          */}

          {/* Urgent Button */}
          <span onClick={handleUrgentClick} className={`${urgentFilterIsEnabled ? "bg-light text-dark" : "bg-dark"}`} style={{cursor:"pointer"}}>
            Urgent
          </span>
        </div>
      </div>
      {filterQueryLoading ? (<BoxLoader />) : (
        <div className="left-bar-chat" ref={containerRef}>
          {allConversations?.map((message, messageIndex) => {
            const { property_name, guest_name, arrival_date, departure_date, opened, conversation_id } = message;
            const allDataForConversation = message;
            const messages = message?.messages; // Assuming message?.messages is an array
            const lastValue = messages[messages.length - 1];
            const { sender, text, time } = lastValue;
            let result;
            if (text.length > 25) {
              result = text.slice(0, 25) + "...";
            } else {
              result = text;
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

            if (datesAndPropertyNameDisplay.length > 40) {
              datesAndPropertyNameDisplay = datesAndPropertyNameDisplay.slice(0, 40) + "...";
            }

            return (
              <>
                <div>
                  <div style={{ cursor: "pointer" }}
                    className={`${conversation_id === selectedConversationId && "bg-dark"} left-inner-tab`}
                    onClick={() => openConversationHandle(allDataForConversation, conversation_id)}
                  >
                    <div className="left-description">
                      <div className="d-flex justify-content-between description-item">
                        <h2>
                          {opened ? guest_name : <strong>{guest_name}</strong>}
                        </h2>
                        <div className="date" style={{margin:"0"}}>
                          {opened ? timeFormat(time) : <strong>{timeFormat(time)}</strong>}
                        </div>
                      </div>
                      <div className="short-des">
                      {opened ? (
                        <>
                          <strong>{sender}:</strong> {result}
                        </>
                      ) : (
                        <strong>{sender}: {result}</strong>
                      )}
                      </div>
                      <div className="date">
                        {opened ? datesAndPropertyNameDisplay : <strong>{datesAndPropertyNameDisplay}</strong>}
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              </>
            );
          })}
        </div>
      )}
      {nextBatchLoading && <BoxLoader />}
    </div>
  );
};

export default LeftMessage;
