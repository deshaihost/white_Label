import React, { useState, useEffect } from "react";
import "./index.css";
import dummyPropertyImg from "../../../../../public/img/dummyPropertyImg.png";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions } from "../../../../../redux/actions";

const LeftMessage = ({ messageList, getUserMessage }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  const property_data =
    store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName =
    property_data !== undefined ? Object.keys(property_data) : [];
  const { conversations } = messageList ? messageList : [];

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

  // e.g. formatDateRange("210101_000000", "210103_000000") => "Jan 1-3"
  // e.g. formatDateRange("210101_000000", "210203_000000") => "Jan 1 - Feb 3"
  function formatDateRange(startDate, endDate) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Helper function to parse date string
    function parseDate(dateString) {
        const datePart = dateString.split('_')[0];
        const year = parseInt(datePart.slice(0, 2), 10) + 2000; // Assuming 20xx
        const month = parseInt(datePart.slice(2, 4), 10) - 1; // Month is 0-indexed
        const day = parseInt(datePart.slice(4, 6), 10);
        return new Date(year, month, day);
    }

    // Parse the start and end dates
    const start = parseDate(startDate);
    const end = parseDate(endDate);

    // Get the month and day for both dates
    const startMonth = monthNames[start.getMonth()];
    const startDay = start.getDate();
    const endMonth = monthNames[end.getMonth()];
    const endDay = end.getDate();

    // Create the formatted date range
    if (startMonth === endMonth) {
        return `${startMonth} ${startDay}-${endDay}`;
    } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
    }
}

  const [searchActive, setSearchActive] = useState(0);
  const [searchInputShow, setSearchInputShow] = useState(false);
  const searchSection = [
    { type: "select", label: "All", option: allPropertyName },
    { type: "select", label: "Phase", option: ["Current", "Inquiry", "Future", "Past"] },
    { type: "button", label: "Urgent" },
  ];
  const extractTextFromHTML = (html) => {
    // Create a temporary DOM element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    // Extract text content from the DOM element
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    // Split the text by newline characters
    return textContent.split("\n");
  };
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  return (
    <div className="left-bar">
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
            const { type, label, option } = searchItem;
            return (
              <>
                {type === "select" && (
                  <>
                    <select name="cars" id="cars"
                      className={`${ searchActive === index ? "bg-light text-dark" : "bg-dark" } `}
                      onClick={() => setSearchActive(index)}
                    >
                      <>
                        <option value="" selected>
                          {label}
                        </option>
                        {option?.map((opetion) => {
                          return (
                            <>
                              ;<option value="volvo">{opetion}</option>;
                            </>
                          );
                        })}
                      </>
                    </select>
                  </>
                )}
                {type === "button" && (
                  <span
                    onClick={() => setSearchActive(index)}
                    className={`${ searchActive === index ? "bg-light text-dark" : "bg-dark" }`}
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
        const { guest_name, arrival_date, departure_date } = message;
        const allDataForConversation = message;
        const messages = message?.messages; // Assuming message?.messages is an array
        const lastValue = messages[messages.length - 1];
        const { sender, text, time } = lastValue;
        let result;
        if (text.length > 25) { result = text.slice(0,25) + "..."; }
        else { result = text; }
        return (
          <div style={{ cursor: "pointer" }} className="row left-inner-tab " onClick={() => getUserMessage(allDataForConversation)}>
            {/* Remove image for now
            <div className="col-lg-3 col-12">
              <img src={dummyPropertyImg} alt="" />
            </div>
            */}
            <div className="col-lg-12 col-12 left-description">
              <div className="d-flex justify-content-between description-item">
                <h2><strong>{guest_name}</strong></h2>
                <p>{timeFormat(time)}</p>
              </div>
              <div className="short-des">
                <strong>{sender}:</strong> {result}
              </div>
              <div className="date"> {formatDateRange(arrival_date, departure_date)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeftMessage;
