import React, { useEffect, useState } from "react";
import PopupModal from "../popupmodal/PopupModal";
import CopyToPropertiesModal from "../../../../helper/copyToPropertiesModal/CopyToPropertiesModal";
import { groupTimeRangesMonthly } from "../helper/combineResStages";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Loader from "../../../../helper/Loader";
import { FaRegEdit } from "react-icons/fa";

const Calendar = ({ getScheduleAPI, allProperties, setShowCalender, selectedProperty, scheduleData, date, setScheduleChanged, currentMonth, propTimeZone }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const [showCopyToPropertiesModal, setShowCopyToPropertiesModal] = useState(false);
  const [commonArray, setCommonArray] = useState([]); // [{ status:"on"/"off", start:"07/20/2024 14:00", end:"07/22/2024 08:00", startIndex:2, endIndex:3, resStage:<reservation_stage> }, ...]

  // common section
  const parseMonthYearCommon = (monthYearStr) => {
    const [monthStr, yearStr] = monthYearStr.split(" ");
    const month = new Date(Date.parse(monthStr + " 1, 2022")).getMonth(); // using 2022 to get the correct month index
    const year = parseInt(yearStr, 10);
    return { month, year };
  };

  // Function to get the start and end dates of the specified month and year
  const getMonthStartEnd = (month, year) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0, 23, 59, 59, 999); // Last millisecond of the month
    return { startDate, endDate };
  };
  
  // Filter function to check if a date range overlaps with the specified month and year
  const filterMonthCommon = (start, end, month, year) => {
    const { startDate, endDate } = getMonthStartEnd(month, year);
    const startObj = new Date(start);
    const endObj = new Date(end);
    return (startObj <= endDate && endObj >= startDate);
  };
  
  const monthYearStrCommon = currentMonth;
  const monthCommon = parseMonthYearCommon(monthYearStrCommon)?.month;
  const yearCommon = parseMonthYearCommon(monthYearStrCommon)?.year;
  const filteredDataCommon = commonArray?.filter( // filteredDataCommon is commonArray, but filtered to only elements in the current month
    (dateTime) =>
      filterMonthCommon(dateTime?.start, dateTime?.end, monthCommon, yearCommon)
  );

  // time format
  function formatTime(time) {
    const [hours, minutes] = time.split(":");
    let hoursInt = parseInt(hours, 10);
    const ampm = hoursInt >= 12 ? "PM" : "AM";
    hoursInt = hoursInt % 12 || 12; // Convert hour '0' to '12' for 12 AM and 12 PM
    return `${hoursInt}:${minutes} ${ampm}`;
  }
  // time format

  const specificDates = scheduleData?.specific_dates;

  // new code
  const scheduledDate = structuredClone(specificDates);

  // Maintain an obj groupedTimeRanges (based on scheduledDate) that maps each time range to all reservation stages that share it
  let groupedTimeRanges = groupTimeRangesMonthly(scheduledDate);

  const responseObject = {
    properties: [selectedProperty],
    dates: scheduledDate,
  };

  const copyToAllResponseObject = {
    properties: allProperties,
    dates: scheduledDate,
  };
  // Generate sorted schedule data for on and off
  //// code optomices

  const categoryListArray = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const combineSchedules = () => {
    if (specificDates) {
      let commonArrayGet = [];
      categoryListArray?.map((resStage) => {
        specificDates[resStage]?.on?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = { status:"on", start:item, end:specificDates[resStage].on[index + 1], startIndex:index, endIndex:index + 1, resStage:resStage };
            commonArrayGet.push(obj);
          }
        });

        specificDates[resStage]?.off?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = { status:"off", start:item, end:specificDates[resStage].off[index + 1], startIndex:index, endIndex:index + 1, resStage:resStage };
            commonArrayGet.push(obj);
          }
        });
      });

      setCommonArray(commonArrayGet);
    }
  };
  // code optomices

  const handleSetCalendarAPI = async (dataToSend) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
      };
      const response = await axios.put( `${baseUrl}/set_datetime_toggle`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setScheduleChanged(true); // re-render the listings on the Properties page, since current status might be different
        getScheduleAPI(selectedProperty);
      } else {
        ToastHandle("Something went wrong", "danger");
        getScheduleAPI(selectedProperty);
      }
    } catch (error) {
      ToastHandle(error?.data?.error, "danger");
      getScheduleAPI(selectedProperty);
    }
  };

  // Clear All Button
  const handleClearAll = () => {
    const isConfirmed = window.confirm(
      "Do you want to clear all Status Events for this property? Weekly schedule will not be affected."
    );
    if (!isConfirmed) {
      return;
    }
    const blankScheduleObject = { properties: [selectedProperty], dates: {} };
    handleSetCalendarAPI(blankScheduleObject);
  };

  // copy to all property onClickHandle
  const handleCopyToAll = () => {
    const isConfirmed = window.confirm(
      "Do you want to Copy this specific date/time scheduling to all properties? Weekly schedules will not be copied or changed."
    );
    if (!isConfirmed) {
      return;
    }
    handleSetCalendarAPI(copyToAllResponseObject);
  };

  // Add Schedule Click
  const handleCellClick = () => {
    const todayDate = date.getDate();
    const todayMonth = date.getMonth();
    const todayYear = date.getFullYear();

    let day = { day: todayDate, month: todayMonth, year: todayYear };

    setSelectedDate(day);
    setShow(true);
  };

  // Remove Schedule click
  const handleScheduleDelete = (category, deleteData) => {
    const isConfirmed = window.confirm("Do you want to delete this Status Event?");
    if (!isConfirmed) {
      return;
    }

    if (category === "CURRENT") {
      if (deleteData.status === "on") {
        responseObject.dates[category].on.splice(deleteData.startIndex, 2);
      }
      if (deleteData.status === "off") {
        responseObject.dates[category].off.splice(deleteData.startIndex, 2);
      }
    }
    if (category === "FUTURE") {
      if (deleteData.status === "on") {
        responseObject.dates[category].on.splice(deleteData.startIndex, 2);
      }
      if (deleteData.status === "off") {
        responseObject.dates[category].off.splice(deleteData.startIndex, 2);
      }
    }
    if (category === "INQUIRY/PAST") {
      if (deleteData.status === "on") {
        responseObject.dates[category].on.splice(deleteData.startIndex, 2);
      }
      if (deleteData.status === "off") {
        responseObject.dates[category].off.splice(deleteData.startIndex, 2);
      }
    }
    handleSetCalendarAPI(responseObject);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit"});
    return `${month} ${day}`;
  };

  useEffect(() => {
    if (scheduleData) {
      combineSchedules();
    }
  }, [scheduleData]);

  return (
    <>
      {!scheduleData ? (
        <div className="d-flex w-full justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="calendar">
            <div className="container">
              <div className="row">
                <div className="col-12 text-left text-light ">
                  <p className="">Choose specific dates/times to selectively enable/disable HostBuddy. These selections will override the weekly schedule during the chosen times.</p>
                </div>
              </div>

              <div class="row mt-3">
                <div className="container text-white">
                  {filteredDataCommon?.length > 0 ? (
                    <div className="row">
                      <div className="col-md-8">
                        <div className="container px-0 px-md-auto text-white">
                          <div className="row">
                            <div className="col-12">
                              <div className="calendar-month-table-data">
                                {filteredDataCommon?.map((dateTime, index) => { // // [{ status:"on"/"off", start:"07/20/2024 14:00", end:"07/22/2024 08:00", startIndex:2, endIndex:3, resStage:<reservation_stage> }, ...]
                                  const { status, start, end, resStage } = dateTime;
                                  const [startDate, startTime] = start.split(" ");
                                  const [endDate, endTime] = end.split(" ");

                                  const timeRangeString = `${status.toLowerCase()} ${start}-${end}`; // e.g. "off 07/20/2024 14:00-07/22/2024 08:00". Use this to look up which reservation stages share this time range, from the groupedTimeRanges object
                                  const resStagesForThisTimeRange = groupedTimeRanges[timeRangeString] ? groupedTimeRanges[timeRangeString].map((stage) => stage.toUpperCase()) : [];
                                  delete groupedTimeRanges[timeRangeString]; // remove this time range from groupedTimeRanges, so we only display it once

                                  return (
                                    (resStagesForThisTimeRange.length > 0) && (
                                      <div key={index} className="calendar-month-schedule border border-primary my-3 rounded-pill px-3 bg-black">
                                        <div className={`main-calendar-data-status`}>
                                          {status.toUpperCase() == "ON" ? <span style={{ color: "rgb(0, 190, 0)" }}>{status}</span> : <span style={{ color: "rgb(190, 0, 0)" }}>{status}</span>}
                                        </div>
                                        <div>
                                          <div>From</div>
                                          <div>To</div>
                                        </div>
                                        <div>
                                          <div>{formatDate(startDate)}</div>
                                          <div>{formatDate(endDate)}</div>
                                        </div>
                                        <div>
                                          <div>{formatTime(startTime)}</div>
                                          <div>{formatTime(endTime)}</div>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between">
                                          <div data-bs-toggle="tooltip" data-bs-placement="top" title={resStage}>
                                            <p className="d-flex align-items-center justify-content-center gap-2">
                                              {resStagesForThisTimeRange.includes("FUTURE") ? (
                                                <span className="future-status calender-table-status"></span>
                                              ) : (
                                                <span className="placeholder-status calender-table-status"></span>
                                              )}
                                              {resStagesForThisTimeRange.includes("CURRENT") ? (
                                                <span className="current-status calender-table-status"></span>
                                              ) : (
                                                <span className="placeholder-status calender-table-status"></span>
                                              )}
                                              {resStagesForThisTimeRange.includes("INQUIRY/PAST") ? (
                                                <span className="inquery-status calender-table-status"></span>
                                              ) : (
                                                <span className="placeholder-status calender-table-status"></span>
                                              )}
                                            </p>
                                          </div>
                                          <div className="ms-2 ms-md-5 d-flex align-items-center">
                                            {/*
                                            <span className="me-2">
                                              <FaRegEdit className="text-primary" />
                                            </span>
                                            */}
                                            <div onClick={() => handleScheduleDelete(resStage, dateTime)}>
                                              <FaRegTrashCan className="text-primary" />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-white">
                        <div className="px-0 px-lg-3 px-md-3 px-xxl-5">
                          <div className="border border-primary border-2 p-4 rounded-3">
                            <h4 className="fs-6 text-center mb-3">Legend</h4>
                            <p className="fs-14 mb-3">Colored dots indicate that this selection will apply to HostBuddy's responses to guests at reservation stages:</p>
                            <p className="fs-14">
                              <span className="future-status calender-table-status me-2"></span>{" "}
                              Future
                            </p>
                            <p className="fs-14">
                              <span className="current-status calender-table-status me-2"></span>{" "}
                              Current
                            </p>
                            <p className="fs-14">
                              <span className="inquery-status calender-table-status me-2"></span>{" "}
                              Inquiry/Past
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{height: "400px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                      <span style={{color: "#AAA"}}>No dates added</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div class="row w-full mt-5 mb-3 d-flex justify-content-center">
              <div className="d-flex gap-3 flex-wrap flex-md-nowrap" style={{ width: "80%" }}>
                <button className="btn btn-primary form-control" style={{ color: "rgb(220, 0, 0)" }} onClick={handleClearAll}>
                  Clear All
                </button>
                <button className="btn btn-primary form-control" onClick={() => setShowCopyToPropertiesModal(true)}>
                  Copy to Other Properties
                </button>
                <button className="btn btn-primary form-control" onClick={handleCellClick}>
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {show && (
        <PopupModal show={show} setShow={setShow} selectedDate={selectedDate} setSelectedDate={setSelectedDate} responseObject={responseObject} setShowCalender={setShowCalender} getScheduleAPI={getScheduleAPI} selectedProperty={selectedProperty} setScheduleChanged={setScheduleChanged}/>
      )}
      <CopyToPropertiesModal show={showCopyToPropertiesModal} setShow={setShowCopyToPropertiesModal} schedule={scheduledDate} scheduleType="month" curr_timezone={propTimeZone} />
    </>
  );
};

export default Calendar;
