import React, { useState } from "react";
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";

const LeftMessage = ({ messageList, getUserMessage }) => {
  const { conversations } = messageList ? messageList : [];
  const timeFormat = (timestamp) => {
    const date = new Date(timestamp);
    // Extract hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes();
    // Determine AM/PM
    const ampm = hours >= 12 ? "PM" : "AM";
    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Hour '0' should be '12'
    // Format minutes with leading zero if necessary
    const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;
    // Create the time string
    const timeString = `${hours}:${minutesFormatted} ${ampm}`;
    return timeString;
  };
  function formatDateRange(dateString) {
    const monthNames = [
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
    // Parse the date
    const date = new Date(dateString);
    // Get the month and day
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    // Create the formatted date range
    // Adjust the range if needed
    const startDay = Math.max(day - 12, 1); // Example: assuming range start is 12 days before
    const endDay = day; // Example: current day as the end
    return `${month} ${startDay}-${endDay}`;
  }
  const [searchActive, setSearchActive] = useState(0);
  const [searchInputShow, setSearchInputShow] = useState(false);
  const searchSection = [
    { type: "select", label: "All" },
    { type: "button", label: "Phase" },
    { type: "button", label: "Urgent" },
  ];
  const extractTextFromHTML = (html) => {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
  
    // Extract text content from the DOM element
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
  
    // Split the text by newline characters
    return textContent.split('\n');
  };
  

  return (
    <>
      <div className="message-filter">
        <div className="messsage-search d-flex justify-between">
          <h2>Messages</h2>
          <form className={`${searchInputShow && "active"}`}>
            <input type="text" name="search" />
            {searchInputShow ? (
              <i
                class="bi bi-x"
                onClick={() => setSearchInputShow(!searchInputShow)}
              ></i>
            ) : (
              <i
                class="bi bi-search"
                onClick={() => setSearchInputShow(!searchInputShow)}
              ></i>
            )}
          </form>
        </div>
        <div className="filter-btns">
          {searchSection?.map((searchItem, index) => {
            const { type, label } = searchItem;
            return (
              <>
                {type === "select" && (
                  <>
                    <select
                      name="cars"
                      id="cars"
                      className={`${searchActive === index && "active"}`}
                      onClick={() => setSearchActive(index)}
                    >
                      <option value="volvo">{label}</option>
                      <option value="saab">1</option>
                      <option value="mercedes">2</option>
                      <option value="audi">3</option>
                    </select>
                  </>
                )}
                {type === "button" && (
                  <span
                    onClick={() => setSearchActive(index)}
                    className={`${searchActive === index && "active"}`}
                  >
                    {label}
                  </span>
                )}
              </>
            );
          })}
        </div>
      </div>
      {conversations?.map((message) => {
        const { guest_name, conversation_start_time } = message;
        const allUserMessage = message?.messages;
        const currentMessage = message?.messages[0];
        const { sender, text, time } = currentMessage;
        return (
          <div
            className="row left-inner-tab"
            onClick={() => getUserMessage(allUserMessage)}
          >
            <div className="col-lg-3 col-12">
              <img src={dummyPropertyImg} alt="" />
            </div>
            <div className="col-lg-8 col-12 left-description">
              <div className="d-flex justify-content-between description-item">
                <h2>{guest_name}</h2>
                <p>{timeFormat(conversation_start_time)}</p>
              </div>
              <div className="short-des">
                {sender}: {text?.split("\n")[0]}
              </div>
              <div className="date"> {formatDateRange(time)}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default LeftMessage;
