import React from "react";

const ScheduleCalender = () => {
  // Generate an array of time slots from 12:00 AM to 11:00 PM
  const generateTimeSlots = () => {
    const timeSlots = [];
    const amPm = ["AM", "PM"];

    for (let hour = 0; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 60) {
        const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
        const amPmIndex = Math.floor(hour / 12);

        const timeString = `${hourFormatted
          .toString()
          .padStart(2, "0")}:${minute.toString().padStart(2, "0")} ${amPm[amPmIndex]
          }`;
        timeSlots.push(timeString);
      }
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();
  //   console.log(timeSlots);

  return (
    <div className="calendar">
      <table>
        <thead>
          <tr className="text-light text-center">
            <th
              style={{ minHeight: "100px", minWidth: "100px" }}
              className="border"
            ></th>

            <th style={{ minHeight: "100px", minWidth: "100px" }}>Sun</th>
            <th style={{ minHeight: "100px", minWidth: "100px" }}>Mon</th>
            <th style={{ minHeight: "100px", minWidth: "100px" }}>Tue</th>
            <th style={{ minHeight: "100px", minWidth: "100px" }}>Wed</th>
            <th style={{ minHeight: "100px", minWidth: "100px" }}>Thu</th>
            <th style={{ minHeight: "100px", minWidth: "100px" }}>Fri</th>
            <th style={{ minHeight: "100px", minWidth: "100px" }}>Sat</th>
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
                      <div className="text-center text-light"> {time}</div>
                      <div className="bg-success sdfcd">
                        {/* {dayDate.getDate() === currentDate.getDate()
                          ? "status"
                          : ""} */}
                        {/* date */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* {time} */}
              </td>
              {/* Render weekdays */}
              <td
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
                      // Add onClick handler to display modal
                      >
                        {/* Add day-specific content here */}
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                      // Add onClick handler to display modal
                      >
                        {/* Add day-specific content here */}
                      </button>

                    </div>
                  </div>
                </div>
              </td>
              <td style={{ minHeight: "100px", minWidth: "100px" }}>
                <button
                  type="button"
                  className="btn btn-primary"
                // Add onClick handler to display modal
                >
                  {/* Add day-specific content here */}
                </button>
              </td>
              {/* Repeat for other weekdays */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleCalender;
