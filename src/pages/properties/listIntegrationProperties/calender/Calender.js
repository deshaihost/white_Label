import React, { useState } from "react";
import PopupModal from "../popupmodal/PopupModal";

const Calendar = ({ date }) => {
  const [show, setShow] = useState(false);

  const [selectedDate, setSelectedDate] = useState({});

  const currentDate = new Date(); // Current date

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Determine the number of days in the previous month
  const lastDayOfPrevMonth = new Date(year, month, 0);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  // Determine the total number of days to show in the calendar
  const totalDays = daysInMonth + startingDayOfWeek;

  const days = [];
  // Push days from the previous month
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: month === 0 ? 11 : month - 1, // Handle December
      year: month === 0 ? year - 1 : year, // Handle December
    });
  }
  // Push days from the current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month: month,
      year: year,
    });
  }
  // Push days from the next month to fill up to 6 rows
  const remainingDays = 6 * 7 - days.length; // Total cells in 6 weeks
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
    console.log("Clicked on day:", day);
    // Open modal or perform other actions here
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
        <table>
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
                  return (
                    <td
                      key={idx}
                      className={classNames}
                      onClick={() => handleCellClick(day)}
                    >
                      <div className="row">
                        <div className="col">
                          <div style={{minHeight:'100px', minWidth:'100px'}} className="border pt-0 ps-0 d-flex flex-column justify-content-between">
                            <div className="bg-success">{dayDate.getDate() === currentDate.getDate() ? 'status' : ''}</div>
                            <div className="text-end text-light"> {day.day}</div>
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
        />
      )}
    </>
  );
};

export default Calendar;
