import React, { useState } from "react";
import PopupModal from "../popupmodal/PopupModal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";

const Calendar = ({
  setShowCalender,
  selectedProperty,
  scheduleData,
  date,
}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const currentDate = new Date();

  if (!scheduleData) {
    return <div>Loading...</div>; // Or display some loading indicator
  }

  const specificDates = scheduleData?.specific_dates;

  const scheduledDate = structuredClone(specificDates);

  const responseObject = {
    properties: [selectedProperty],
    dates: scheduledDate,
  };

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const lastDayOfPrevMonth = new Date(year, month, 0);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  const days = [];

  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: month === 0 ? 11 : month - 1,
      year: month === 0 ? year - 1 : year,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month: month,
      year: year,
    });
  }

  const remainingDays = 6 * 7 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;

  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      month: nextMonth,
      year: nextYear,
    });
  }

  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  // to remove the schedule showed on the calender
  const removeCalenderSchedule = async (dataToSend) => {
    // setSubmit(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = { headers: {"X-API-Key": API_KEY} };
      const response = await axios.put(`${baseUrl}/set_datetime_toggle`, dataToSend, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");

        setTimeout(() => {
          setShowCalender(false);
        }, 1500);
      } else {
        ToastHandle("Something went wrong", "danger");
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
    }
    // setSubmit(false);
  };

  const handleCellClick = (day, type, start, end) => {
    if (!type || type === undefined) {
      setSelectedDate(day);
      setShow(true);
      return;
    }
  };

  const handleScheduleRemove = (type, endDate, endDateIndex) => {
    if (type === "on") {
      let start = responseObject.dates.on[endDateIndex - 1];
      const valuesToRemove = [start, endDate];
      const isConfirmed = window.confirm(
        "Do you want to delete this Status Event?"
      );
      if (isConfirmed) {
        responseObject.dates.on = responseObject.dates.on.filter(
          (date) => !valuesToRemove.includes(date)
        );
        removeCalenderSchedule(responseObject);
      } else {
        return;
      }
    }

    if (type === "off") {
      let start = responseObject.dates.off[endDateIndex - 1];
      const valuesToRemove = [start, endDate];
      const isConfirmed = window.confirm(
        "Do you want to delete this Status Event?"
      );
      if (isConfirmed) {
        responseObject.dates.off = responseObject.dates.off.filter(
          (date) => !valuesToRemove.includes(date)
        );
        removeCalenderSchedule(responseObject);
      } else {
        return;
      }
    }
  };

  return (
    <>
      <div className="calendar">
        <table className="w-100">
          <thead>
            <tr className="text-light text-center">
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
          </thead>
          <tbody>
            {/* using this code */}

            {weeks.map((week, index) => (
              <tr key={index}>
                {week.map((day, idx) => {
                  let classNames = "calendar-day";
                  const dayDate = new Date(day.year, day.month, day.day);

                  // Check if the day is today, in the past, or in the future
                  if (
                    dayDate.getDate() === currentDate.getDate() &&
                    dayDate.getMonth() === currentDate.getMonth() &&
                    dayDate.getFullYear() === currentDate.getFullYear()
                  ) {
                    classNames += " today-date";
                  } else if (dayDate < currentDate) {
                    classNames += " past-date";
                  } else {
                    classNames += " future-date";
                  }

                  let status = "";
                  let statusType;
                  let startStatus;
                  let endStatus;
                  let startTime;
                  let endTime;

                  // let statusOn = "";
                  // let statusTypeOn;
                  // let startStatusOn;
                  // let endStatusOn;
                  // let startTimeOn;
                  // let endTimeOn;
                  // eslint-disable-next-line
                  let startDateString; // Declare startDateString
                  // eslint-disable-next-line
                  let endDateString; // Declare endDateString
                  let dateCount = 0;
                  let onDateCount = 0;

                  if (specificDates) {
                    specificDates.off.forEach((offDate, index) => {
                      const offDateTime = new Date(offDate);
                      if (index % 2 === 0) {
                        // This is the start date of off schedule
                        startStatus = offDate;
                        startDateString = offDateTime.toLocaleString(); // Store full date-time string
                        startTime = offDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      } else {
                        // This is the end date of off schedule
                        endStatus = offDate;
                        endDateString = offDateTime.toLocaleString(); // Store full date-time string
                        endTime = offDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        // Render off status for each day between start and end date
                        let currentDate = new Date(startStatus);

                        while (currentDate <= offDateTime) {
                          dateCount++;
                          if (
                            currentDate.toDateString() ===
                            dayDate.toDateString()
                          ) {

                            if (dateCount === 1) {
                              statusType = "off";
                              status = (
                                <div
                                  onClick={() =>
                                    handleScheduleRemove("off", offDate, index)
                                  }
                                  className="bg-danger status-data"
                                  style={{ opacity: "0.5" }}
                                >
                                  <p>Status: Off</p>
                                  <span>{`${startTime} - ${endTime}`}</span>
                                </div>
                              );
                            } else {
                              if (currentDate.getDay() === 0) {
                                statusType = "off";
                                status = (
                                  <div
                                    onClick={() =>
                                      handleScheduleRemove(
                                        "off",
                                        offDate,
                                        index
                                      )
                                    }
                                    className="bg-danger status-data"
                                    style={{ opacity: "0.5" }}
                                  >
                                    <p>Status: Off</p>
                                    <span>{`${startTime} - ${endTime}`}</span>
                                  </div>
                                );
                              } else {
                                statusType = "off";
                                status = (
                                  <div
                                    onClick={() =>
                                      handleScheduleRemove(
                                        "off",
                                        offDate,
                                        index
                                      )
                                    }
                                    className="bg-danger status-data"
                                    style={{ opacity: "0.5" }}
                                  >
                                    <p style={{ visibility: "hidden" }}>
                                      Status: Off
                                    </p>
                                    <span
                                      style={{ visibility: "hidden" }}
                                    >{`${startTime} - ${endTime}`}</span>
                                  </div>
                                );
                              }
                            }
                          }
                          // Move to the next day
                          currentDate.setDate(currentDate.getDate() + 1);
                          // dateCount++;
                        }
                        dateCount = 0;
                      }
                    });

                    specificDates.on.forEach((onDate, index) => {
                      const onDateTime = new Date(onDate);
                      if (index % 2 === 0) {
                        // This is the start date of on schedule
                        startStatus = onDate;
                        startDateString = onDateTime.toLocaleString(); // Store full date-time string
                        startTime = onDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                      } else {
                        // This is the end date of on schedule
                        endStatus = onDate;
                        endDateString = onDateTime.toLocaleString(); // Store full date-time string
                        endTime = onDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        // Render on status for each day between start and end date
                        let currentDate = new Date(startStatus);
                        while (currentDate <= onDateTime) {
                          onDateCount++;
                          if (
                            currentDate.toDateString() ===
                            dayDate.toDateString()
                          ) {

                            if (onDateCount === 1) {
                              statusType = "on";
                              status = (
                                <div
                                  onClick={() =>
                                    handleScheduleRemove("on", onDate, index)
                                  }
                                  className="bg-success status-data"
                                  style={{ opacity: "0.5" }}
                                >
                                  <p>Status: On</p>
                                  <span>{`${startTime} - ${endTime}`}</span>
                                </div>
                              );
                            } else {
                              if (currentDate.getDay() === 0) {
                                statusType = "on";
                                status = (
                                  <div
                                    onClick={() =>
                                      handleScheduleRemove("on", onDate, index)
                                    }
                                    className="bg-success status-data"
                                    style={{ opacity: "0.5" }}
                                  >
                                    <p>Status: On</p>
                                    <span>{`${startTime} - ${endTime}`}</span>
                                  </div>
                                );
                              } else {
                                statusType = "on";
                                status = (
                                  <div
                                    onClick={() =>
                                      handleScheduleRemove("on", onDate, index)
                                    }
                                    className="bg-success status-data"
                                    style={{ opacity: "0.5" }}
                                  >
                                    <p style={{ visibility: "hidden" }}>
                                      Status: On
                                    </p>
                                    <span
                                      style={{ visibility: "hidden" }}
                                    >{`${startTime} - ${endTime}`}</span>
                                  </div>
                                );
                              }
                            }
                          }
                          // Move to the next day
                          currentDate.setDate(currentDate.getDate() + 1);
                        }
                        onDateCount = 0;
                      }
                    });
                  }

                  return (
                    <td
                      key={idx}
                      className={classNames}
                      onClick={() =>
                        !statusType &&
                        handleCellClick(day, statusType, startStatus, endStatus)
                      }
                    >
                      <div className="main-td-inner">
                        <div className="child-main-inner">
                          <div className="pt-0 ps-0 status-data-grid">
                            <div></div>
                            <div className="d-flex flex-column justify-content-between position-relative">
                              {status}
                              {/* {statusOn} */}
                            </div>
                            <div className="text-end date-text">{day.day}</div>
                          </div>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {show && (
        <PopupModal
          show={show}
          setShow={setShow}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          responseObject={responseObject}
          setShowCalender={setShowCalender}
        />
      )}
    </>
  );
};

export default Calendar;
