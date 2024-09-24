import React, { useState, useEffect } from "react";
import "./ScheduleCalendar.css";
import SchedulePopupModal from "../popupmodal/SchedulePopupModal";
import CopyToPropertiesModal from "../../../../helper/copyToPropertiesModal/CopyToPropertiesModal";
import { groupTimeRangesWeekly } from "../helper/combineResStages";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
import axios from "axios";

const daysOfWeek = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ];

const ScheduleCalender = ({ getScheduleAPI, allProperties, setShowCalender, selectedProperty, scheduleData, setScheduleChanged, propTimeZone }) => {
  const [show, setShow] = useState(false);
  const [showCopyToPropertiesModal, setShowCopyToPropertiesModal] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});

  // if (!scheduleData) {
  //   return <div>Loading...</div>; // Or display some loading indicator
  // }

  const specificDates = scheduleData?.weekly;
  const scheduledDate = structuredClone(specificDates);
  const scheduleDefulatArray = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const responseObject = { properties: [selectedProperty], schedules: scheduledDate };

  // Maintain an obj groupedTimeRanges (based on scheduledDate) that maps each time range to all reservation stages that share it
  let groupedTimeRanges = groupTimeRangesWeekly(scheduledDate);
  //setGroupedTimeRanges(groupTimeRangesWeekly(scheduledDate)); // this causes infinite loop
  /* this also causes infinite loop
  useEffect(() => {
    if (scheduledDate) {
      setGroupedTimeRanges(groupTimeRangesWeekly(scheduledDate));
    }
  }, [scheduledDate]);
  */

  const copyToAllResponseObject = {
    properties: allProperties,
    schedules: scheduledDate,
  };

  const handleAddClick = () => {
    setShow(true);
  };

  // API to remove or update calendar schedule the schedule on the calender
  const handleCalenderScheduleAPI = async (dataToSend) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
        };
        const response = await axios.put(
          `${baseUrl}/set_recurring_schedule`,
          dataToSend,
          config
        );

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          setScheduleChanged(true); // re-render the listings on the Properties page, since current status might be different
          getScheduleAPI(selectedProperty);
        } else {
          ToastHandle("Something went wrong", "danger");
          getScheduleAPI(selectedProperty);
        }
      } else {
        ToastHandle("No Token", "danger");
        getScheduleAPI(selectedProperty);
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
      getScheduleAPI(selectedProperty);
    }
  };

  const handleRemoveSchedule = (deleteData) => {
    const isConfirmed = window.confirm(
      "Do you want to delete this Status Event?"
    );
    if (!isConfirmed) {
      return;
    }

    if ( !deleteData.scheduleStages || !deleteData.day || !deleteData.startTime || !deleteData.endTime || deleteData.startIndex === undefined || deleteData.endIndex === undefined ) {
      ToastHandle("Something went wrong here", "danger");
      return;
    }

    for (const stage of deleteData.scheduleStages) {
      responseObject.schedules[stage][deleteData.day].splice( deleteData.startIndex, 2 );
    }
    handleCalenderScheduleAPI(responseObject);
  };

  // copy to all property onClickHandle
  const handleCopyToAll = () => {
    const isConfirmed = window.confirm("Do you want to Copy this schedule to all properties? Month schedules will not be copied or changed.");
    if (!isConfirmed) {
      return;
    }
    handleCalenderScheduleAPI(copyToAllResponseObject);
  };

  // clear all property onClickHandle
  const handleClearAll = () => {
    const isConfirmed = window.confirm("Do you want to clear the weekly schedule for this property? Month schedule will not be affected.");
    if (!isConfirmed) {
      return;
    }
    const blankScheduleObject = {
      properties: [selectedProperty],
      schedules: {},
    };
    handleCalenderScheduleAPI(blankScheduleObject);
  };

  return (
    <>
      {!scheduleData ? (
        <div className="d-flex w-full justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="px-0 px-lg-3 px-md-3 px-xxl-5">
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  {daysOfWeek?.map((dayOfWeek) => { // for every day of the week
                    let findRang = scheduleDefulatArray?.map((resStage, index) => { // for every reservation stage
                      let daysTime = scheduledDate?.[resStage][dayOfWeek];
                      let startTime;
                      let startIndex;
                      let endTime;
                      let endIndex;
                      let startDateTime;
                      let endDateTime;

                      return (
                        <div>
                          {daysTime !== undefined ? ( // if there are time ranges for this day (for this reservation stage): display them
                            <>
                              {daysTime?.length > 0 ? ( // always true if above condition is true
                                daysTime?.map((data, index) => {
                                  const timeRangeString = index % 2 !== 0 ? `${dayOfWeek} ${daysTime[index - 1]}-${data}` : null; // e.g. "monday 14:00-16:00". Use this to look up which reservation stages share this time range, from the groupedTimeRanges object
                                  const resStagesForThisTimeRange = index % 2 !== 0 ? (groupedTimeRanges[timeRangeString] ? groupedTimeRanges[timeRangeString].map(stage => stage.toUpperCase()) : []) : [];
                                  if (index % 2 !== 0) { delete groupedTimeRanges[timeRangeString]; } // remove this time range from groupedTimeRanges, so we only display it once

                                  const parsedTime = new Date(`2000-01-01T${data}`);
                                  // Get hours and minutes
                                  const hours = parsedTime.getHours();
                                  const minutes = parsedTime.getMinutes();
                                  // Determine AM/PM
                                  const ampm = hours >= 12 ? "PM" : "AM";
                                  // Adjust hours for AM/PM format
                                  const formattedHours = hours % 12 || 12;
                                  // Format minutes with leading zero if needed
                                  const formattedMinutes =
                                    minutes < 10 ? `0${minutes}` : minutes;
                                  // Construct formatted time string
                                  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

                                  // Get all keys of weeklySchedule object
                                  // const keys = Object.keys(weeklySchedule);

                                  if (index % 2 === 0) {
                                    startTime = data;
                                    startIndex = index;
                                    startDateTime = formattedTime;
                                  } else {
                                    endTime = data;
                                    endIndex = index;
                                    endDateTime = formattedTime;
                                  }

                                  const dataToRemove = { scheduleStages:resStagesForThisTimeRange, day:dayOfWeek, startTime:startTime, endTime:endTime, startIndex:startIndex, endIndex:endIndex };

                                  return (
                                    <>
                                      {(index % 2 !== 0 && resStagesForThisTimeRange.length > 0) && (
                                        <>
                                          <div className="calendar-timeline align-items-center border border-primary mb-1 rounded-pill px-2 bg-black">
                                            <p className="fs-14 m-0">ON</p>
                                            <p className="fs-14">
                                              <span>{startDateTime}</span>
                                              <span> - </span>
                                              <span>{endDateTime}</span>
                                            </p>
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

                                            <div>
                                              {/* 
                                                <span className="me-1">
                                                  <FaRegEdit className="text-primary" />
                                                </span>
                                              */}
                                              <span className="calendar-schedule-button mainCursor ms-1">
                                                <FaRegTrashCan onClick={() => handleRemoveSchedule( dataToRemove ) }/>
                                              </span>
                                            </div>
                                          </div>
                                        </>
                                      )}
                                    </>
                                  );
                                })
                              ) : (
                                <>
                                  {daysTime?.length === 0 && (
                                    <span style={{fontStyle:"italic"}} className={`fs-14 ${index !== 0 ? "off-all-day" : index === 1 ? "off-all-day" : index === 2 ? "off-all-day" : "" }`}>
                                      OFF ALL DAY
                                    </span>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            <span style={{fontStyle:"italic"}} className={`fs-14 ${ index === 0 ? "off-all-day" : index === 1 ? "off-all-day" : "" }` }>
                              OFF ALL DAY
                            </span>
                          )}
                        </div>
                      );

                    });
                    return (
                      <>
                        <div className="row text-white">
                          <div className="col-xxl-3 col-lg-4">
                            <h4 className="fs-6 border-2 m-0 border border-primary rounded-3 px-3 py-2 text-center text-capitalize">
                              {dayOfWeek}
                            </h4>
                          </div>
                          <div className="col-xxl-9 col-lg-8 border-start border-secondary p-0 border-remove">
                            <div className="py-1 calendar-table-list-data">
                              <div className="calendar-table-data-child">
                                {findRang}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
                <div className="col-md-4 text-white">
                  <div className="px-0 px-lg-3 px-md-3 px-xxl-5">
                    <div className="border border-primary border-2 p-4 rounded-3">
                      <h4 className="fs-6 text-center mb-3">Legend</h4>
                      <p className="fs-14 mb-3">Colored dots indicate that HostBuddy will respond to guests at reservation stages:</p>
                      <p className="fs-14">
                        <span className="future-status calender-table-status me-2"></span>
                        Future
                      </p>
                      <p className="fs-14">
                        <span className="current-status calender-table-status me-2"></span>
                        Current
                      </p>
                      <p className="fs-14">
                        <span className="inquery-status calender-table-status me-2"></span>
                        Inquiry/Past
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* // */}

          <div class="row w-full mt-3 mb-3 d-flex justify-content-center">
            <div className="d-flex gap-3 flex-wrap flex-md-nowrap" style={{ width: "80%" }}>
              <button onClick={handleClearAll} className="btn btn-primary form-control" style={{ color: "rgb(220, 0, 0)" }}>
                Clear All
              </button>
              <button onClick={() => setShowCopyToPropertiesModal(true)} className="btn btn-primary form-control">
                Copy to Other Properties
              </button>
              <button className="btn btn-primary form-control" onClick={handleAddClick}>
                Add
              </button>
            </div>
          </div>
        </>
      )}

      {show && (
        <SchedulePopupModal show={show} setShow={setShow} selectedTime={selectedTime} setselectedTime={setSelectedTime} responseObject={responseObject} setShowCalender={setShowCalender} getScheduleAPI={getScheduleAPI} selectedProperty={selectedProperty} setScheduleChanged={setScheduleChanged}/>
      )}
      <CopyToPropertiesModal show={showCopyToPropertiesModal} setShow={setShowCopyToPropertiesModal} schedule={scheduledDate} scheduleType="schedule" curr_timezone={propTimeZone} />
    </>
  );
};

export default ScheduleCalender;
