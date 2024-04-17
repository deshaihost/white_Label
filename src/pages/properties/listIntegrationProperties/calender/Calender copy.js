import React, { useState } from "react";

const Calendar = ({ date }) => {
  //   const [date, setDate] = useState(new Date());

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Determine the number of days in the previous month
  const lastDayOfPrevMonth = new Date(year, month, 0);
  const daysInPrevMonth = lastDayOfPrevMonth.getDate();

  // Determine the number of days to be shown from the next month
  const totalDays = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;
  const daysFromNextMonth = totalDays - (daysInMonth + startingDayOfWeek) + 7; // to show extra 1 week from next month

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
  // Push days from the next month
  for (let i = 1; i <= daysFromNextMonth; i++) {
    days.push({
      day: i,
      month: month === 11 ? 0 : month + 1, // Handle January
      year: month === 11 ? year + 1 : year, // Handle January
    });
  }

  console.log("daysFromNextMonth: ", daysFromNextMonth);

  const weeks = [];
  let week = [];
  days.forEach((day, index) => {
    if (index % 7 === 0 && index !== 0) {
      weeks.push(week);
      week = [];
    }
    week.push(
      <td key={index} className="calendar-day">
        {day.day}
      </td>
    );
  });
  weeks.push(week);

  console.log("weeks: ", weeks);

  return (
    <div className="calendar">
      {/* <h2>{`${date.toLocaleString("default", { month: "long" })} ${year}`}</h2> */}
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
            <tr key={index}>{week}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
