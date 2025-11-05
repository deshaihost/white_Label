import React, { useState, useEffect } from "react";
import "./ScheduleCalendar.css";
import Modal from "react-bootstrap/Modal";
import SchedulePopupModal from "./SchedulePopupModal";
import { FaRegTrashCan } from "react-icons/fa6";
import ToastHandle from "../../helper/ToastMessage";
import Loader from "../../helper/Loader";
import axios from "axios";

const daysOfWeek = [ "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday" ];

const SettingsCalendar = ({ showSchedule, setShowSchedule, scheduleData, setScheduleData }) => {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});

  const specificDates = scheduleData;
  const scheduledDate = structuredClone(specificDates);
  const scheduleDefulatArray = ["CURRENT", "FUTURE", "INQUIRY/PAST"];

  // Maintain an obj groupedTimeRanges (based on scheduledDate) that maps each time range to all reservation stages that share it
  let groupedTimeRanges = null;
  //setGroupedTimeRanges(groupTimeRangesWeekly(scheduledDate)); // this causes infinite loop
  /* this also causes infinite loop
  useEffect(() => {
    if (scheduledDate) {
      setGroupedTimeRanges(groupTimeRangesWeekly(scheduledDate));
    }
  }, [scheduledDate]);
  */

  const handleAddClick = () => {
    setShow(true);
  };

  const handleRemoveSchedule = (deleteData) => {
    const isConfirmed = window.confirm("Do you want to delete this Status Event?");
    if (!isConfirmed) {
      return;
    }

    if ( !deleteData.day || !deleteData.startTime || !deleteData.endTime || deleteData.startIndex === undefined || deleteData.endIndex === undefined ) {
      ToastHandle("Something went wrong here", "danger");
      return;
    }
    
    scheduledDate[deleteData.day].splice( deleteData.startIndex, 2 );
    setScheduleData(scheduledDate);
  };

  // onclick handler for clear all
  const handleClearAll = () => {
    const isConfirmed = window.confirm("Do you want to clear the weekly schedule for this config?");
    if (!isConfirmed) { return; }
    setScheduleData({});
  };

  return (
    <Modal show={showSchedule} size="xl" className="custom-calendar-modal" onHide={() => setShowSchedule(false)} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body className="p-4">
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
                      let findRang = (() => {
                        let daysTime = scheduledDate?.[dayOfWeek], startTime, startIndex, endTime, endIndex, startDateTime, endDateTime;
                      
                        return (
                          <div>
                            {daysTime !== undefined && ( // if there are time ranges for this day (for this reservation stage): display them
                              <>
                                {daysTime?.length > 0 && ( // always true if above condition is true
                                  daysTime?.map((data, index) => {
                                    const parsedTime = new Date(`2000-01-01T${data}`);
                                    // Get hours and minutes
                                    const hours = parsedTime.getHours();
                                    const minutes = parsedTime.getMinutes();
                                    // Determine AM/PM
                                    const ampm = hours >= 12 ? "PM" : "AM";
                                    // Adjust hours for AM/PM format
                                    const formattedHours = hours % 12 || 12;
                                    // Format minutes with leading zero if needed
                                    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                                    // Construct formatted time string
                                    const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
                      
                                    if (index % 2 === 0) {
                                      startTime = data;
                                      startIndex = index;
                                      startDateTime = formattedTime;
                                    } else {
                                      endTime = data;
                                      endIndex = index;
                                      endDateTime = formattedTime;
                                    }
                      
                                    const dataToRemove = { day:dayOfWeek, startTime:startTime, endTime:endTime, startIndex:startIndex, endIndex:endIndex };
                      
                                    return (
                                      <>
                                        {(index % 2 !== 0) && (
                                          <>
                                            <div className="calendar-timeline align-items-center border border-primary mb-1 rounded-pill px-2 bg-black">
                                              <p className="fs-14 m-0">ON</p>
                                              <p className="fs-14">
                                                <span>{startDateTime}</span>
                                                <span> - </span>
                                                <span>{endDateTime}</span>
                                              </p>
                      
                                              <div>
                                                <span className="calendar-schedule-button mainCursor ms-1">
                                                  <FaRegTrashCan onClick={() => handleRemoveSchedule(dataToRemove)} />
                                                </span>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </>
                                    );
                                  })
                                )}
                              </>
                            )}
                          </div>
                        );
                      })();
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
                </div>
              </div>
            </div>

            <div class="row w-full mt-3 mb-3 d-flex justify-content-center">
              <div className="d-flex gap-3 flex-wrap flex-md-nowrap" style={{ width: "80%" }}>
                <button onClick={handleClearAll} className="btn btn-primary form-control" style={{ color: "rgb(220, 0, 0)" }}>
                  Clear All
                </button>
                <button className="btn btn-primary form-control" onClick={handleAddClick}>
                  Add
                </button>
              </div>
            </div>
          </>
        )}
        {show && (
          <SchedulePopupModal show={show} setShow={setShow} responseObject={scheduledDate} setResponseObject={setScheduleData}/>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SettingsCalendar;
