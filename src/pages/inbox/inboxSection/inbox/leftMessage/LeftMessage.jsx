import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../../../../redux/actions";
import { formatDateRange } from "../../../../../helper/commonFun";
import { callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";
import { BoxLoader } from "../../../../../helper/Loader";

const LeftMessage = ({ allConversations, setAllConversations, setSelectedConvo, fetchConversations }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const containerRef = useRef(null);

  const [selectedSearch, setSelectedSearch] = useState({type: "", textGet: "", search: ""});
  const [selectedConversationId, setSelectedConversationId] = useState("");
  const [nextBatchLoading, setNextBatchLoading] = useState(false);

  // Load the next batch of conversations. fetchConversations handles excluding conversations we already have, calling the API, and updating the state
  const loadNextBatch = async () => {
    setNextBatchLoading(true);
    const num_existing_convos = allConversations.length;
    await fetchConversations(num_existing_convos + 10);
    setNextBatchLoading(false);
  };

  // When loadNextBatch is defined (i.e. component mount), initialize the event listener that tracks scrolling (so we can load more convos whenever the user scrolls to the bottom)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          loadNextBatch();
        }
      }
    };
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
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

  const timeFormat = (timestamp) => {
    const date = new Date(timestamp);
    // Extract month, day, hours, and minutes
    const month = date.getMonth() + 1; // Months are zero-based
    const day = date.getDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes; // Format minutes with leading zero if necessary
    // Create and return the time string
    const timeString = `${month}/${day} ${hours}:${minutesFormatted} ${ampm}`;
    return timeString;
  };

  const [searchActive, setSearchActive] = useState(0);
  const [searchInputShow, setSearchInputShow] = useState(false);
  const searchSection = [
    { type: "select", label: "All", option: allPropertyName },
    {
      type: "select",
      label: "Phase",
      option: ["Current", "Inquiry", "Future", "Past"],
    },
    { type: "button", label: "Urgent" },
  ];
  
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
        {/* Filter buttons
        <div className="filter-btns">
          {searchSection?.map((searchItem, index) => {
            const { type, label, option } = searchItem;
            return (
              <>
                {type === "select" && (
                  <>
                    <div className="custom-select">
                      <select name="cars" id="cars" value={selectedSearch?.textGet}
                        className={`${searchActive === index ? "select-active" : "bg-dark"}`}
                        onChange={(e) => selectedHndle(e.target.value, label, index)}
                      >
                        <>
                          <option value="" selected>
                            {label}
                          </option>
                          {option?.map((option) => {
                            return (
                              <>
                                ;<option value={option}>{option}</option>;
                              </>
                            );
                          })}
                        </>
                      </select>
                    </div>
                  </>
                )}
                {type === "button" && (
                  <span
                    onClick={() => setSearchActive(index)}
                    className={`${
                      searchActive === index ? "bg-light text-dark" : "bg-dark"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </>
            );
          })}
        </div>
        */}
      </div>
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

          const reservationDateRange = formatDateRange(arrival_date, departure_date);
          let datesAndPropertyNameDisplay = `${reservationDateRange} | ${property_name}`;

          if (datesAndPropertyNameDisplay.length > 50) {
            datesAndPropertyNameDisplay = datesAndPropertyNameDisplay.slice(0, 50) + "...";
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
      {nextBatchLoading && <BoxLoader />}
    </div>
  );
};

export default LeftMessage;
