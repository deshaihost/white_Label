

import React from "react";

const ScheduleCalender = () => {
  // Function to convert 24-hour format to 12-hour format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes, period] = time.split(/:| /);
    let hour = parseInt(hours, 10);
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes.padStart(2, "0")} ${period}`;
  };

  // Function to handle button click and display alert
  const handleClick = (startTime, dayOfWeek) => {
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = (startHour + 1) % 24;
    const interval = `${startTime} - ${String(endHour).padStart(2, "0")}:00`;
    alert(`You clicked the button for ${interval} on ${dayOfWeek}`);
  };

  // Generate an array of time slots from 12:00 AM to 11:00 PM with 1 hour intervals
  const generateTimeSlots = () => {
    const timeSlots = [];
    const amPm = ["AM", "PM"];

    for (let hour = 0; hour <= 23; hour++) {
      const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
      const amPmIndex = Math.floor(hour / 12);

      const startTime = `${hour.toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;
      const endTime = `${((hour + 1) % 12 || 12).toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;

      timeSlots.push({ startTime, endTime });
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar">
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
          {/* Map over time slots */}
          {timeSlots.map((time, index) => (
            <tr key={index}>
              {/* Render time slot */}
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
                      <div className="bg-success sdfcd">{/* date */}</div>
                    </div>
                  </div>
                </div>
              </td>
              {/* Render weekdays */}
              {daysOfWeek.map((dayOfWeek, dayIndex) => (
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
                        {/* Render two buttons for each time slot in 24-hour format */}
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleClick(`${time.startTime.split(":")[0]}:00`, daysOfWeek[dayIndex])
                          }
                        >
                          {/* {`${time.startTime.split(":")[0]}:00 - ${time.startTime.split(":")[0]}:30`} */}
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleClick(
                              `${time.startTime.split(":")[0]}:30`,
                              daysOfWeek[dayIndex]
                            )
                          }
                        >
                          {/* {`${time.startTime.split(":")[0]}:30 - ${(parseInt(time.startTime.split(":")[0], 10) + 1)
                            .toString()
                            .padStart(2, "0")
                            }:00`} */}
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
    </div>
  );
};

export default ScheduleCalender;


