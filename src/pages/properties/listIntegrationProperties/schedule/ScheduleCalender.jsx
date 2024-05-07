import React, { useState } from "react";
import "./ScheduleCalendar.css";
import SchedulePopupModal from "../popupmodal/SchedulePopupModal";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

const weekDayName = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const ScheduleCalender = ({
  setShowCalender,
  selectedProperty,
  scheduleData,
}) => {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});

  if (!scheduleData) {
    return <div>Loading...</div>; // Or display some loading indicator
  }

  // const specificDates = scheduleData?.weekly;
  const specificDates = scheduleData?.weekly;

  const scheduledDate = structuredClone(specificDates);
  const scheduleDefulatArray = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  // const currentData = scheduleData.weekly.CURRENT;
  // const futureData = scheduleData.weekly.FUTURE;
  // const inquiryPastData = scheduleData.weekly["INQUIRY/PAST"];
  console.log(specificDates, "specificDates");

  const responseObject = {
    properties: [selectedProperty],
    schedule: scheduledDate,
  };

  // console.log("scheduleData: ", scheduleData)
  // console.log("specificDates: ", specificDates);
  // console.log("responseObject: ", responseObject);
  console.log("Schedulefor weekday: ", responseObject.schedule);

  // Function to convert 24-hour format to 12-hour format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes, period] = time.split(/:| /);
    let hour = parseInt(hours, 10);
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes.padStart(2, "0")} ${period}`;
  };

  const handleClick = (startTime, dayOfWeek, dayIndex) => {
    const selectedDay = weekDayName[dayIndex];
    const startHour = parseInt(startTime.split(":")[0]);
    const startMinute = parseInt(startTime.split(":")[1]);

    let endHour, endMinute;
    if (startMinute === 0) {
      endHour = startHour;
      endMinute = 30;
    } else {
      endHour = (startHour + 1) % 24;
      endMinute = 0;
    }

    const endTime = `${String(endHour).padStart(2, "0")}:${String(
      endMinute
    ).padStart(2, "0")}`;
    const interval = `${startTime} - ${endTime}`;

    const selectedCellTime = {
      startTime: startTime,
      endTime: endTime,
      day: selectedDay,
    };

    // alert(`You clicked the button for ${interval} on ${dayOfWeek} - ${selectedDay}`);

    setSelectedTime(selectedCellTime);
    setShow(true);
  };

  // Generate an array of time slots from 12:00 AM to 11:00 PM with 1 hour intervals
  const generateTimeSlots = () => {
    const timeSlots = [];
    const amPm = ["AM", "PM"];

    for (let hour = 0; hour <= 23; hour++) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const amPmIndex = Math.floor(hour / 12);

      const startTime = `${hour.toString().padStart(2, "0")}:00 ${
        amPm[amPmIndex]
      }`;
      const endTime = `${((hour + 1) % 12 || 12)
        .toString()
        .padStart(2, "0")}:00 ${amPm[amPmIndex]}`;

      timeSlots.push({ startTime, endTime });
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();

  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const renderTimeSlots = (timeSlots) => {
    const timePairs = [];
    for (let i = 0; i < timeSlots.length; i += 2) {
      timePairs.push(
        <div key={i / 2}>
          {timeSlots[i]} - {timeSlots[i + 1]}
        </div>
      );
    }
    return timePairs;
  };

  const { weekly } = scheduleData;

  return (
    <>
      {/* <div className="calendar">
        <table>
          <thead>
            <tr className="text-light text-center">
              <th
                style={{ minHeight: "100px", minWidth: "100px" }}
                className="border"
              ></th>
              {daysOfWeek.map((day, index) => (
                <th key={index} style={{ minHeight: "100px", minWidth: "100px" }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            
            {timeSlots.map((time, index) => (
              <tr key={index}>
               
                <td
                  style={{
                    minHeight: "100px",
                    minWidth: "100px",
                    border: "",
                  }}
                  className="text-center border-end"
                >
                  <div className="row">
                    <div className="col">
                      <div
                        style={{ minHeight: "48px", minWidth: "100px" }}
                        className="pt-0 ps-0 d-flex flex-column justify-content-between"
                      >
                        <div className="text-center text-light">{convertTo12HourFormat(time.startTime)}</div>
                        <div className="bg-success sdfcd"></div>
                      </div>
                    </div>
                  </div>
                </td>
                
                {weekDayName.map((dayOfWeek, dayIndex) => (
                  <td
                    key={dayIndex}
                    style={{
                      minHeight: "100px",
                      minWidth: "100px",
                      border: "1px solid #ddd",
                    }}
                  >
                    <div className="row">
                      <div className="col">
                        <div
                          style={{ minHeight: "48px", minWidth: "100px" }}
                          className=" pt-0 ps-0 d-grid"
                        >
                          
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              handleClick(`${time.startTime.split(":")[0]}:00`, daysOfWeek[dayIndex], dayIndex)
                            }
                          >
                            
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              handleClick(
                                `${time.startTime.split(":")[0]}:30`,
                                daysOfWeek[dayIndex],
                                dayIndex
                              )
                            }
                          >
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div className="table-responsive p-3">
        <table className="w-100">
          <thead>
            <tr>
              <th>
                <div></div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Monday</h4>
                </div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Tuesday</h4>
                </div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Wednesday</h4>
                </div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Thursday</h4>{" "}
                </div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Friday</h4>
                </div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Saturday</h4>
                </div>
              </th>
              <th>
                <div className="calendar-week-field">
                  <h4>Sunday</h4>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {scheduleDefulatArray?.map((schedule) => {
              const weeklySchedule = scheduledDate[schedule];

              return (
                <tr>
                  <td
                    className={
                      schedule === "CURRENT"
                        ? "bg-success"
                        : schedule === "FUTURE"
                        ? "bg-primary  "
                        : schedule === "INQUIRY/PAST"
                        ? "bg-warning"
                        : ""
                    }
                    // style={{ background: "green" }}
                  >
                    <div className="calendar-schedule-data data-head ">
                      <h5 className="mb-0">{schedule}</h5>
                    </div>
                  </td>
                  {daysOfWeek?.map((days) => {
                    
                    return (
                      <td>
                        <div className="calendar-schedule-data">
                          <div className="calendar-schedule-time">
                            <p>
                              <div className="row">
                                {weeklySchedule[days]?.map((data, index) => {
                                  const parsedTime = new Date(`2000-01-01T${data}`);
                                  // Get hours and minutes
                                  const hours = parsedTime.getHours();
                                  const minutes = parsedTime.getMinutes();
                                  // Determine AM/PM
                                  const ampm = hours >= 12 ? 'PM' : 'AM';
                                  // Adjust hours for AM/PM format
                                  const formattedHours = hours % 12 || 12;
                                  // Format minutes with leading zero if needed
                                  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                                  // Construct formatted time string
                                  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

                                  return (
                                    <>
                                      <div className="col-6 ">
                                      {formattedTime}

                                        {index % 2 !== 0 && ( 
                                          <span className="calendar-schedule-button mainCursor ms-1">
                                            <FaRegEdit />
                                            <FaRegTrashCan />
                                          </span>
                                        )}
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </p>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="row"></div>

      {show && (
        <SchedulePopupModal
          show={show}
          setShow={setShow}
          selectedTime={selectedTime}
          setselectedTime={setSelectedTime}
          responseObject={responseObject}
          setShowCalender={setShowCalender}
        />
      )}
    </>
  );
};

export default ScheduleCalender;
