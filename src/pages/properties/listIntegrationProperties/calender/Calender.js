import React, { useState } from "react";
import PopupModal from "../popupmodal/PopupModal";

const Calendar = ({ selectedProperty, scheduleData, date }) => {
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

  console.log("scheduledDate: ", specificDates);
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

  const handleCellClick = (day) => {
    setSelectedDate(day);
    setShow(true);
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

                  // let status = "";
                  // if (specificDates) {
                  //   specificDates?.on?.forEach((onDate, index) => {
                  //     const onDateTime = new Date(onDate);
                  //     const offDateTime = new Date(specificDates.on[index]);
                  //     if (
                  //       onDateTime.toDateString() === dayDate.toDateString()
                  //     ) {
                  //       const startTime = onDateTime.toLocaleTimeString([], {
                  //         hour: "2-digit",
                  //         minute: "2-digit",
                  //       });
                  //       const endTime = offDateTime.toLocaleTimeString([], {
                  //         hour: "2-digit",
                  //         minute: "2-digit",
                  //       });
                  //       status = (
                  //         <div className="bg-success">
                  //           <div>Status: On</div>
                  //           <div>{`${startTime} - ${endTime}`}</div>
                  //         </div>
                  //       );
                  //     }
                  //   });
                  // }
                  let status = "";
                  if (specificDates) {
                    specificDates.on.forEach((onDate, index) => {
                      const onDateTime = new Date(onDate);
                      const offDateTime = new Date(specificDates.on[index]);
                      if (
                        onDateTime.toDateString() === dayDate.toDateString()
                      ) {
                        const startTime = onDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        const endTime = offDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        status = (
                          <div className="bg-success">
                            <div>Status: On</div>
                            <div>{`${startTime} - ${endTime}`}</div>
                          </div>
                        );
                      }
                    });

                    specificDates.off.forEach((offDate, index) => {
                      const onDateTime = new Date(specificDates.off[index]);
                      const offDateTime = new Date(offDate);
                      if (
                        offDateTime.toDateString() === dayDate.toDateString()
                      ) {
                        const startTime = onDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        const endTime = offDateTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        });
                        status = (
                          <div className="bg-danger">
                            <div>Status: Off</div>
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
                      onClick={() => handleCellClick(day)}
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
        />
      )}
    </>
  );
};

export default Calendar;
