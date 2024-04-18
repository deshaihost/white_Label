import React, { useState } from "react";
import PopupModal from "../popupmodal/PopupModal";

const Calendar = ({ date }) => {
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
  };

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  console.log("weeks: ", weeks)

  return (
    <>
      <div className="calendar">
        <table>
          <thead>
            <tr>
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
                {week.map((day, idx) => (
                  <td key={idx} className="calendar-day" onClick={() => handleCellClick(day)}>
                    {day.day}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PopupModal />
    </>
  );
};

export default Calendar;