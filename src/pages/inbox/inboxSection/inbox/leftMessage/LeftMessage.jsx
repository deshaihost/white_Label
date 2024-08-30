import React, { useState, useEffect } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../../../../redux/actions";
import { formatDateRange } from "../../../../../helper/commonFun";
import { callMarkConversationAsOpenedApi } from "../../../../../helper/getConversationsTest/inboxApi";

const LeftMessage = ({ messageList, getUserMessage }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const [selectedSearch, setSelectedSearch] = useState({type: "", textGet: "", search: ""});
  const [activeMessageId, setActiveMessageId] = useState("");
  const [allConversations, setAllConversations] = useState([]);

  // As soon as we get messageList (all conversations), put it in the state
  useEffect(() => {
    setAllConversations(messageList);
  }, [messageList]);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const conversations = messageList ? messageList : [];

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

  // Mark a conversation as opened, in the state and in the API
  const markConversationAsOpened = (conversationId, propertyName) => {
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
    getUserMessage(data);
    setActiveMessageId(id);
    markConversationAsOpened(data.conversation_id, data.property_name);
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
      <div className="left-bar-chat">
        {allConversations?.map((message, messageIndex) => {
          const { property_name, guest_name, arrival_date, departure_date, opened } = message;
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
                <div
                  style={{ cursor: "pointer" }}
                  className={`${activeMessageId === messageIndex && "bg-dark"} left-inner-tab`}
                  onClick={() => openConversationHandle(allDataForConversation, messageIndex)}
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
    </div>
  );
};

export default LeftMessage;
