import React, { useState } from "react";
import PopupModal from "../popupmodal/PopupModal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";

const Calendar = ({ setShowCalender, selectedProperty, scheduleData, date }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const currentDate = new Date();

  if (!scheduleData) {
    return <div>Loading...</div>; // Or display some loading indicator
  }

  const specificDates = scheduleData?.specific_dates;

  const scheduledDate = structuredClone(specificDates);

  const responseObject = {
    properties: [
      selectedProperty
    ],
    "dates": scheduledDate
    // {
    //     "on": [
    //         "01/01/2025 10:00",
    //         "01/01/2025 11:00",
    //         "02/01/2025 10:00",
    //         "02/01/2025 11:00"
    //     ],
    //     "off": [
    //         "01/01/2025 10:00",
    //         "01/01/2025 11:00",
    //         "02/01/2025 10:00",
    //         "02/01/2025 11:00"
    //     ]
    // }
  }

  console.log("scheduleData: ", scheduleData)
  console.log("specificDates: ", specificDates);
  console.log("responseObject: ", responseObject);



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

  // to remove the schedule showed on the calender
  const removeCalenderSchedule = async (dataToSend) => {
    // setSubmit(true);
    console.log("data to send: ", dataToSend)
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.put(
          `${baseUrl}/set_datetime_toggle`,
          dataToSend,
          config
        );

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");

          setTimeout(() => {
            setShowCalender(false);
          }, 1500);


        } else {
          ToastHandle("Something went wrong", "danger");
        }

      } else {
        ToastHandle("No Token", "danger");
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
      return
    }
    const valuesToRemove = [start, end];

    console.log("valuesToRemove: ", valuesToRemove)

    if (type === "on") {
      const isConfirmed = window.confirm("Do you want to delete this Status Event?");

      if (isConfirmed) {

        responseObject.dates.on = responseObject.dates.on.filter(date => !valuesToRemove.includes(date));

        removeCalenderSchedule(responseObject)

      } else {
        return
      }

    }

    if (type === "off") {
      const isConfirmed = window.confirm("Do you want to delete this Status Event?");

      if (isConfirmed) {

        responseObject.dates.off = responseObject.dates.off.filter(date => !valuesToRemove.includes(date));

        removeCalenderSchedule(responseObject)

      } else {
        return
      }

    }
    console.log("day clicked: ", day)
    console.log("type: ", type, " start: ", start, " end: ", end)

  };

  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

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
                  let arrayIndex = 0;
                  let arrayIndexOn = 0;
                  let statusType;
                  let startStatus;
                  let endStatus;
                  let startTime;
                  let endTime;
                  let timeStatus = 0;

                  if (specificDates) {


                    specificDates?.off?.forEach((offDate, index) => {
                      //   let startTime;
                      // let endTime;
                      // const onDateTime = new Date(specificDates.off[index - 1]);
                      const offDateTime = new Date(offDate);
                      if (
                        offDateTime.toDateString() === dayDate.toDateString()
                      ) {

                        if (arrayIndex % 2 === 0) {
                          timeStatus = 1;
                          startStatus = offDate;
                          startTime = offDateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                        } else {
                          timeStatus = 0;
                          endStatus = offDate
                          endTime = offDateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                        }
                        arrayIndex = arrayIndex + 1;
                        statusType = "off"
                        if (timeStatus == 0) {

                          status = (
                            <div className="bg-danger">
                              <div>Status: Off</div>
                              <div>{`${startTime} - ${endTime}`}</div>
                            </div>
                          );
                        }
                      } else {
                        if (timeStatus === 1) {
                          timeStatus = 0;
                          endStatus = offDate
                          endTime = offDateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });

                          arrayIndex = arrayIndex + 1;
                          statusType = "off"
                          status = (
                            <div className="bg-danger">
                              <div>Status: Off</div>
                              <div>{`${startTime} - ${endTime}`}</div>
                            </div>
                          );
                        }
                      }
                    });

                    specificDates?.on?.forEach((onDate, index) => {
                      const onDateTime = new Date(onDate);

                      // console.log("dayDate: ", onDate)

                      if (
                        onDateTime.toDateString() === dayDate.toDateString()
                      ) {
                        if (arrayIndexOn % 2 === 0) {
                          startStatus = onDate;

                          startTime = onDateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                        }
                        else {
                          endStatus = onDate;
                          endTime = onDateTime.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                        }
                        arrayIndexOn = arrayIndexOn + 1;
                        statusType = "on"



                        status = (
                          <div className="bg-success">
                            <div>Status: On</div>
                            <div>{`${startTime} - ${endTime}`}</div>
                          </div>
                        );
                      }
                    });


                  }

                  return (
                    <td
                      key={idx}
                      className={classNames}
                      onClick={() => handleCellClick(day, statusType, startStatus, endStatus)}
                    >
                      <div className="">
                        <div className="">
                          <div className="pt-0 ps-0 d-flex flex-column justify-content-between">
                            <div className="d-flex flex-column justify-content-between">
                              {status}
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
