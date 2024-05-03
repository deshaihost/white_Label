// correct code
// import React, { useState } from "react";
// import SchedulePopupModal from "../popupmodal/SchedulePopupModal";

// const weekDayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// const ScheduleCalender = ({ setShowCalender, selectedProperty, scheduleData }) => {
//   const [show, setShow] = useState(false);
//   const [selectedTime, setSelectedTime] = useState({});

//   if (!scheduleData) {
//     return <div>Loading...</div>; // Or display some loading indicator
//   }

//   const specificDates = scheduleData?.weekly;

//   const scheduledDate = structuredClone(specificDates);

//   const responseObject = {
//     properties: [
//       selectedProperty
//     ],
//     "schedule": scheduledDate
//   }

//   console.log("scheduleData: ", scheduleData)
//   console.log("specificDates: ", specificDates);
//   console.log("responseObject: ", responseObject);

//   // Function to convert 24-hour format to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     const [hours, minutes, period] = time.split(/:| /);
//     let hour = parseInt(hours, 10);
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes.padStart(2, "0")} ${period}`;
//   };

//   const handleClick = (startTime, dayOfWeek, dayIndex) => {
//     const selectedDay = weekDayName[dayIndex];
//     const startHour = parseInt(startTime.split(":")[0]);
//     const startMinute = parseInt(startTime.split(":")[1]);

//     let endHour, endMinute;
//     if (startMinute === 0) {
//       endHour = startHour;
//       endMinute = 30;
//     } else {
//       endHour = (startHour + 1) % 24;
//       endMinute = 0;
//     }

//     const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
//     const interval = `${startTime} - ${endTime}`;

//     const selectedCellTime = {
//       startTime: startTime,
//       endTime: endTime,
//       day: selectedDay
//     };

//     console.log("StartTime: ", startTime, " endTime: ", endTime, " dayOfWeek: ", dayOfWeek, " dayIndex: ", dayIndex);
//     alert(`You clicked the button for ${interval} on ${dayOfWeek} - ${selectedDay}`);

//     setSelectedTime(selectedCellTime);
//     setShow(true);
//   };

//   // Generate an array of time slots from 12:00 AM to 11:00 PM with 1 hour intervals
//   const generateTimeSlots = () => {
//     const timeSlots = [];
//     const amPm = ["AM", "PM"];

//     for (let hour = 0; hour <= 23; hour++) {
//       const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
//       const amPmIndex = Math.floor(hour / 12);

//       const startTime = `${hour.toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;
//       const endTime = `${((hour + 1) % 12 || 12).toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;

//       timeSlots.push({ startTime, endTime });
//     }

//     return timeSlots;
//   };

//   const timeSlots = generateTimeSlots();
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <>
//       {console.log("Selected time: ", selectedTime)}
//       <div className="calendar">
//         <table>
//           <thead>
//             <tr className="text-light text-center">
//               <th
//                 style={{ minHeight: "100px", minWidth: "100px" }}
//                 className="border"
//               ></th>
//               {daysOfWeek.map((day, index) => (
//                 <th key={index} style={{ minHeight: "100px", minWidth: "100px" }}>
//                   {day}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* Map over time slots */}
//             {timeSlots.map((time, index) => (
//               <tr key={index}>
//                 {/* Render time slot */}
//                 <td
//                   style={{
//                     minHeight: "100px",
//                     minWidth: "100px",
//                     border: "",
//                   }}
//                   className="text-center border-end"
//                 >
//                   <div className="row">
//                     <div className="col">
//                       <div
//                         style={{ minHeight: "48px", minWidth: "100px" }}
//                         className="pt-0 ps-0 d-flex flex-column justify-content-between"
//                       >
//                         <div className="text-center text-light">{convertTo12HourFormat(time.startTime)}</div>
//                         <div className="bg-success sdfcd">{/* date */}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 {/* Render weekdays */}
//                 {daysOfWeek.map((dayOfWeek, dayIndex) => (
//                   <td
//                     key={dayIndex}
//                     style={{
//                       minHeight: "100px",
//                       minWidth: "100px",
//                       border: "1px solid #ddd",
//                     }}
//                   >
//                     <div className="row">
//                       <div className="col">
//                         <div
//                           style={{ minHeight: "48px", minWidth: "100px" }}
//                           className=" pt-0 ps-0 d-grid"
//                         >
//                           {/* Render two buttons for each time slot in 24-hour format */}
//                           <div
//                             type="button"
//                             className="btn btn-primary"
//                             onClick={() =>
//                               handleClick(`${time.startTime.split(":")[0]}:00`, daysOfWeek[dayIndex], dayIndex)
//                             }
//                           >
//                             {/* {`${time.startTime.split(":")[0]}:00 - ${time.startTime.split(":")[0]}:30`} */}
//                           </div>
//                           <button
//                             type="button"
//                             className="btn btn-primary"
//                             onClick={() =>
//                               handleClick(
//                                 `${time.startTime.split(":")[0]}:30`,
//                                 daysOfWeek[dayIndex],
//                                 dayIndex
//                               )
//                             }
//                           >
//                             {/* {`${time.startTime.split(":")[0]}:30 - ${(parseInt(time.startTime.split(":")[0], 10) + 1)
//                             .toString()
//                             .padStart(2, "0")
//                             }:00`} */}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {show && (
//         <SchedulePopupModal
//           show={show}
//           setShow={setShow}
//           selectedTime={selectedTime}
//           setselectedTime={setSelectedTime}
//           responseObject={responseObject}
//           setShowCalender={setShowCalender}
//         />
//       )}
//     </>
//   );
// };

// export default ScheduleCalender;

// second one

// import React, { useState } from "react";
// import SchedulePopupModal from "../popupmodal/SchedulePopupModal";

// const weekDayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// const ScheduleCalender = ({ setShowCalender, selectedProperty, scheduleData }) => {
//   const [show, setShow] = useState(false);
//   const [selectedTime, setSelectedTime] = useState({});

//   if (!scheduleData) {
//     return <div>Loading...</div>; // Or display some loading indicator
//   }

//   const specificDates = scheduleData?.weekly;

//   const scheduledDate = structuredClone(specificDates);

//   const responseObject = {
//     properties: [
//       selectedProperty
//     ],
//     "schedule": scheduledDate
//   }

//   console.log("scheduleData: ", scheduleData)
//   console.log("specificDates: ", specificDates);
//   console.log("responseObject: ", responseObject);

//   // Function to convert 24-hour format to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     const [hours, minutes, period] = time.split(/:| /);
//     let hour = parseInt(hours, 10);
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes.padStart(2, "0")} ${period}`;
//   };

//   const handleClick = (startTime, dayOfWeek, dayIndex) => {
//     const selectedDay = weekDayName[dayIndex];
//     const startHour = parseInt(startTime.split(":")[0]);
//     const startMinute = parseInt(startTime.split(":")[1]);

//     let endHour, endMinute;
//     if (startMinute === 0) {
//       endHour = startHour;
//       endMinute = 30;
//     } else {
//       endHour = (startHour + 1) % 24;
//       endMinute = 0;
//     }

//     const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
//     const interval = `${startTime} - ${endTime}`;

//     const selectedCellTime = {
//       startTime: startTime,
//       endTime: endTime,
//       day: selectedDay
//     };

//     console.log("StartTime: ", startTime, " endTime: ", endTime, " dayOfWeek: ", dayOfWeek, " dayIndex: ", dayIndex);
//     alert(`You clicked the button for ${interval} on ${dayOfWeek} - ${selectedDay}`);

//     setSelectedTime(selectedCellTime);
//     setShow(true);
//   };

//   // Generate an array of time slots from 12:00 AM to 11:00 PM with 1 hour intervals
//   const generateTimeSlots = () => {
//     const timeSlots = [];
//     const amPm = ["AM", "PM"];

//     for (let hour = 0; hour <= 23; hour++) {
//       const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
//       const amPmIndex = Math.floor(hour / 12);

//       const startTime = `${hour.toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;
//       const endTime = `${((hour + 1) % 12 || 12).toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;

//       timeSlots.push({ startTime, endTime });
//     }

//     return timeSlots;
//   };

//   const timeSlots = generateTimeSlots();
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <>
//       {console.log("Selected time: ", selectedTime)}
//       <div className="calendar">
//         <table>
//           <thead>
//             <tr className="text-light text-center">
//               <th
//                 style={{ minHeight: "100px", minWidth: "100px" }}
//                 className="border"
//               ></th>
//               {daysOfWeek.map((day, index) => (
//                 <th key={index} style={{ minHeight: "100px", minWidth: "100px" }}>
//                   {day}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* Map over time slots */}
//             {timeSlots.map((time, index) => (
//               <tr key={index}>
//                 {/* Render time slot */}
//                 <td
//                   style={{
//                     minHeight: "100px",
//                     minWidth: "100px",
//                     border: "",
//                   }}
//                   className="text-center border-end"
//                 >
//                   <div className="row">
//                     <div className="col">
//                       <div
//                         style={{ minHeight: "48px", minWidth: "100px" }}
//                         className="pt-0 ps-0 d-flex flex-column justify-content-between"
//                       >
//                         <div className="text-center text-light">{convertTo12HourFormat(time.startTime)}</div>
//                         <div className="bg-success sdfcd">{/* date */}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 {/* Render weekdays */}
//                 {daysOfWeek.map((dayOfWeek, dayIndex) => (
//                   <td
//                     key={dayIndex}
//                     style={{
//                       position: "relative",
//                       minHeight: "100px",
//                       minWidth: "100px",
//                       border: "1px solid #ddd",
//                     }}
//                   >
//                     {/* Check if there are scheduled intervals for this weekday */}
//                     {responseObject.schedule && responseObject.schedule[weekDayName[dayIndex]] &&
//                       // Check each scheduled interval
//                       responseObject.schedule[weekDayName[dayIndex]].map((interval, index) => {
//                         // Parse start and end times
//                         const [startHour, startMinute] = interval[0].split(":").map(Number);
//                         const [endHour, endMinute] = interval[1].split(":").map(Number);

//                         // Convert start and end times to minutes for comparison
//                         const startTimeInMinutes = startHour * 60 + startMinute;
//                         const endTimeInMinutes = endHour * 60 + endMinute;

//                         // Parse current time slot
//                         const [slotStartHour, slotStartMinute] = time.startTime.split(":").map(Number);
//                         const [slotEndHour, slotEndMinute] = time.endTime.split(":").map(Number);

//                         // Convert current time slot to minutes for comparison
//                         const slotStartTimeInMinutes = slotStartHour * 60 + slotStartMinute;
//                         const slotEndTimeInMinutes = slotEndHour * 60 + slotEndMinute;

//                         // Check if current time slot falls within any scheduled interval
//                         if (slotStartTimeInMinutes >= startTimeInMinutes && slotEndTimeInMinutes <= endTimeInMinutes) {
//                           // Calculate the top position of the red div based on the time slot's height
//                           const topPosition = (slotStartTimeInMinutes - startTimeInMinutes) / (endTimeInMinutes - startTimeInMinutes) * 100;

//                           // Calculate the height of the red div based on the time slot's height
//                           const height = (slotEndTimeInMinutes - slotStartTimeInMinutes) / (endTimeInMinutes - startTimeInMinutes) * 100;

//                           // Add red div above the button
//                           return (
//                             <div
//                               key={index}
//                               style={{
//                                 position: "absolute",
//                                 top: `${topPosition}%`,
//                                 left: 0,
//                                 width: "100%",
//                                 height: `${height}%`,
//                                 backgroundColor: "red",
//                                 opacity: 0.5,
//                                 pointerEvents: "none", // Make sure the red div doesn't interfere with button clicks
//                                 zIndex: 1, // Ensure the red div appears above the buttons
//                               }}
//                             ></div>
//                           );
//                         }

//                         // If the time slot does not fall within any scheduled interval, return null
//                         return null;
//                       })
//                     }

//                     {/* Render two buttons for each time slot in 24-hour format */}
//                     <div
//                       style={{
//                         position: "relative",
//                         zIndex: 2, // Ensure the buttons appear above the red div
//                       }}
//                     >
//                       <div
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() =>
//                           handleClick(`${time.startTime.split(":")[0]}:00`, daysOfWeek[dayIndex], dayIndex)
//                         }
//                       >
//                         {/* {`${time.startTime.split(":")[0]}:00 - ${time.startTime.split(":")[0]}:30`} */}
//                       </div>
//                       <button
//                         type="button"
//                         className="btn btn-primary"
//                         onClick={() =>
//                           handleClick(
//                             `${time.startTime.split(":")[0]}:30`,
//                             daysOfWeek[dayIndex],
//                             dayIndex
//                           )
//                         }
//                       >
//                         {/* {`${time.startTime.split(":")[0]}:30 - ${(parseInt(time.startTime.split(":")[0], 10) + 1)
//         .toString()
//         .padStart(2, "0")
//         }:00`} */}
//                       </button>
//                     </div>
//                   </td>
//                 ))}

//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {show && (
//         <SchedulePopupModal
//           show={show}
//           setShow={setShow}
//           selectedTime={selectedTime}
//           setselectedTime={setSelectedTime}
//           responseObject={responseObject}
//           setShowCalender={setShowCalender}
//         />
//       )}
//     </>
//   );
// };

// export default ScheduleCalender;

// better currently using this
// import React, { useState } from "react";
// import SchedulePopupModal from "../popupmodal/SchedulePopupModal";

// const weekDayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

// const ScheduleCalender = ({ setShowCalender, selectedProperty, scheduleData }) => {
//   const [show, setShow] = useState(false);
//   const [selectedTime, setSelectedTime] = useState({});

//   if (!scheduleData) {
//     return <div>Loading...</div>; // Or display some loading indicator
//   }

//   const specificDates = scheduleData?.weekly;

//   const scheduledDate = structuredClone(specificDates);

//   const responseObject = {
//     properties: [
//       selectedProperty
//     ],
//     schedule: scheduledDate
//   }

//   // console.log("scheduleData: ", scheduleData)
//   // console.log("specificDates: ", specificDates);
//   // console.log("responseObject: ", responseObject);
//   console.log("Schedulefor weekday: ", responseObject.schedule)

//   // Function to convert 24-hour format to 12-hour format
//   const convertTo12HourFormat = (time) => {
//     const [hours, minutes, period] = time.split(/:| /);
//     let hour = parseInt(hours, 10);
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour}:${minutes.padStart(2, "0")} ${period}`;
//   };

//   const handleClick = (startTime, dayOfWeek, dayIndex) => {
//     const selectedDay = weekDayName[dayIndex];
//     const startHour = parseInt(startTime.split(":")[0]);
//     const startMinute = parseInt(startTime.split(":")[1]);

//     let endHour, endMinute;
//     if (startMinute === 0) {
//       endHour = startHour;
//       endMinute = 30;
//     } else {
//       endHour = (startHour + 1) % 24;
//       endMinute = 0;
//     }

//     const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
//     const interval = `${startTime} - ${endTime}`;

//     const selectedCellTime = {
//       startTime: startTime,
//       endTime: endTime,
//       day: selectedDay
//     };

//     console.log("StartTime: ", startTime, " endTime: ", endTime, " dayOfWeek: ", dayOfWeek, " dayIndex: ", dayIndex);
//     // alert(`You clicked the button for ${interval} on ${dayOfWeek} - ${selectedDay}`);

//     setSelectedTime(selectedCellTime);
//     setShow(true);
//   };

//   // Generate an array of time slots from 12:00 AM to 11:00 PM with 1 hour intervals
//   const generateTimeSlots = () => {
//     const timeSlots = [];
//     const amPm = ["AM", "PM"];

//     for (let hour = 0; hour <= 23; hour++) {
//       const hourFormatted = hour % 12 === 0 ? 12 : hour % 12;
//       const amPmIndex = Math.floor(hour / 12);

//       const startTime = `${hour.toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;
//       const endTime = `${((hour + 1) % 12 || 12).toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;

//       timeSlots.push({ startTime, endTime });
//     }

//     return timeSlots;
//   };

//   const timeSlots = generateTimeSlots();
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//   return (
//     <>
//       {console.log("timeSlots: ", timeSlots)}
//       {/* {console.log("Selected time: ", selectedTime)} */}
//       <div className="calendar">
//         <table>
//           <thead>
//             <tr className="text-light text-center">
//               <th
//                 style={{ minHeight: "100px", minWidth: "100px" }}
//                 className="border"
//               ></th>
//               {daysOfWeek.map((day, index) => (
//                 <th key={index} style={{ minHeight: "100px", minWidth: "100px" }}>
//                   {day}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {/* Map over time slots */}
//             {timeSlots.map((time, index) => (
//               <tr key={index}>
//                 {/* Render time slot */}
//                 <td
//                   style={{
//                     minHeight: "100px",
//                     minWidth: "100px",
//                     border: "",
//                   }}
//                   className="text-center border-end"
//                 >
//                   <div className="row">
//                     <div className="col">
//                       <div
//                         style={{ minHeight: "48px", minWidth: "100px" }}
//                         className="pt-0 ps-0 d-flex flex-column justify-content-between"
//                       >
//                         <div className="text-center text-light">{convertTo12HourFormat(time.startTime)}</div>
//                         <div className="bg-success sdfcd">{/* date */}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 {/* Render weekdays */}
//                 {weekDayName.map((dayOfWeek, dayIndex) => (
//                   <td
//                     key={dayIndex}
//                     style={{
//                       minHeight: "100px",
//                       minWidth: "100px",
//                       border: "1px solid #ddd",
//                     }}
//                   >
//                     <div className="row">
//                       <div className="col">
//                         <div
//                           style={{ minHeight: "48px", minWidth: "100px" }}
//                           className=" pt-0 ps-0 d-grid"
//                         >
//                           {/* Render two buttons for each time slot in 24-hour format */}
//                           <button
//                             type="button"
//                             className="btn btn-primary"
//                             onClick={() =>
//                               handleClick(`${time.startTime.split(":")[0]}:00`, daysOfWeek[dayIndex], dayIndex)
//                             }
//                           >
//                             {/* {`${time.startTime.split(":")[0]}:00 - ${time.startTime.split(":")[0]}:30`} */}
//                           </button>
//                           <button
//                             type="button"
//                             className="btn btn-primary"
//                             onClick={() =>
//                               handleClick(
//                                 `${time.startTime.split(":")[0]}:30`,
//                                 daysOfWeek[dayIndex],
//                                 dayIndex
//                               )
//                             }
//                           >
//                             {/* {`${time.startTime.split(":")[0]}:30 - ${(parseInt(time.startTime.split(":")[0], 10) + 1)
//                             .toString()
//                             .padStart(2, "0")
//                             }:00`} */}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {show && (
//         <SchedulePopupModal
//           show={show}
//           setShow={setShow}
//           selectedTime={selectedTime}
//           setselectedTime={setSelectedTime}
//           responseObject={responseObject}
//           setShowCalender={setShowCalender}
//         />
//       )}
//     </>
//   );
// };

// export default ScheduleCalender;

// test schedule show in this code 

import React, { useState } from "react";
import SchedulePopupModal from "../popupmodal/SchedulePopupModal";

const weekDayName = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const ScheduleCalender = ({ setShowCalender, selectedProperty, scheduleData }) => {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});

  if (!scheduleData) {
    return <div>Loading...</div>; // Or display some loading indicator
  }

  const specificDates = scheduleData?.weekly;

  const scheduledDate = structuredClone(specificDates);

  const responseObject = {
    properties: [
      selectedProperty
    ],
    schedule: scheduledDate
  }

  // console.log("scheduleData: ", scheduleData)
  // console.log("specificDates: ", specificDates);
  // console.log("responseObject: ", responseObject);
  console.log("Schedulefor weekday: ", responseObject.schedule)

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

    const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(2, "0")}`;
    const interval = `${startTime} - ${endTime}`;

    const selectedCellTime = {
      startTime: startTime,
      endTime: endTime,
      day: selectedDay
    };

    console.log("StartTime: ", startTime, " endTime: ", endTime, " dayOfWeek: ", dayOfWeek, " dayIndex: ", dayIndex);
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

      const startTime = `${hour.toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;
      const endTime = `${((hour + 1) % 12 || 12).toString().padStart(2, "0")}:00 ${amPm[amPmIndex]}`;

      timeSlots.push({ startTime, endTime });
    }

    return timeSlots;
  };

  const timeSlots = generateTimeSlots();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <>
      {console.log("timeSlots: ", timeSlots)}
      {/* {console.log("Selected time: ", selectedTime)} */}
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
                          {/* Render two buttons for each time slot in 24-hour format */}
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() =>
                              handleClick(`${time.startTime.split(":")[0]}:00`, daysOfWeek[dayIndex], dayIndex)
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
                                daysOfWeek[dayIndex],
                                dayIndex
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




