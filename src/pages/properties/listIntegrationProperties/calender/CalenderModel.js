import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./calenderModel.css";
import Calendar from "./Calender";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ScheduleCalender from "../schedule/ScheduleCalender";
import ScheduleModal from "../schedule/ScheduleModal";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const CalenderModel = ({
  selectedProperty,
  showCalender,
  setShowCalender,
  allProperties,
  setScheduleChanged,
}) => {
  const [monthButton, setMonthButton] = useState(false);
  const [scheduleButton, setscheduleButton] = useState(true);
  const [date, setDate] = useState(new Date());

  const currentMonth = `${date.toLocaleString("default", {
    month: "long",
  })} ${date.getFullYear()}`;
  const [calendarSchedule, setCalendarSchedule] = useState(null);
  const [timeZone, setTimeZone] = useState(null);

  const handleButtonToggle = (type) => {
    if (type === "month") {
      setMonthButton(true);
      setscheduleButton(false);
    }
    if (type === "schedule") {
      setMonthButton(false);
      setscheduleButton(true);
    }
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(newDate);
  };

  const handleCalenderClose = () => {
    setShowCalender(false);
    setDate(new Date());
  };

  // to get the schedule to show on the calender
  const calenderSchedule = async (propertyName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {headers: {"X-API-Key": API_KEY}};
      const response = await axios.get(`${baseUrl}/properties/${propertyName}/get_schedule`, config);

      setCalendarSchedule(() => response?.data?.schedules);
      setTimeZone(() => response?.data?.time_zone);
    } catch (error) {
      console.log(error);
      setCalendarSchedule(() => {});
    }
  };

  useEffect(() => {
    if (selectedProperty !== "" || selectedProperty !== undefined) {
      calenderSchedule(selectedProperty);
    }
  }, [selectedProperty]);

  return (
    <div>
      {/* New Schedule Modal - takes over when Schedule tab is selected */}
      {scheduleButton && (
        <ScheduleModal
          isOpen={showCalender}
          onClose={handleCalenderClose}
          propertyName={selectedProperty}
          allProperties={allProperties}
          currTimeZone={timeZone}
        />
      )}

      {/* Keep existing Month modal */}
      {monthButton && (
        <Modal
          show={showCalender}
          size="xl"
          className="custom-calendar-modal"
          onHide={handleCalenderClose}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className="p-0">
            <div>
              <div className="">
                <div
                  className="d-flex justify-content-between px-3 calenderHeader"
                  style={{ fontSize: "14px", color: "#fff" }}
                >
                  <div className="d-flex justify-between">
                    <Button
                      className="bg-none border-0 shadow-none fs-3"
                      onClick={handlePrevMonth}
                    >
                      <FiChevronLeft />
                    </Button>
                    <Button
                      onClick={handleNextMonth}
                      className="bg-none border-0 shadow-none fs-3"
                    >
                      <FiChevronRight />
                    </Button>
                  </div>
                  <h3>
                    {`${date.toLocaleString("default", {
                      month: "long",
                    })} ${date.getFullYear()}`}
                  </h3>

                  <div className="d-flex ">
                    <button
                      type="button"
                      onClick={() => handleButtonToggle("schedule")}
                      className="shadow-none btn btn-tranparent border border-primary text-light rounded-0"
                    >
                      Schedule
                    </button>
                    <button
                      type="button"
                      onClick={() => handleButtonToggle("month")}
                      className="shadow-none btn btn-primary rounded-0"
                    >
                      Month
                    </button>
                  </div>
                </div>
              </div>

              <Calendar
                getScheduleAPI={calenderSchedule}
                allProperties={allProperties}
                setShowCalender={setShowCalender}
                selectedProperty={selectedProperty}
                date={date}
                scheduleData={calendarSchedule}
                setScheduleChanged={setScheduleChanged}
                currentMonth={currentMonth}
                propTimeZone={timeZone}
              />

              {timeZone ? (
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <p className="text-center mb-3" style={{color:"rgb(128, 128, 128)"}}>
                    Property time zone: {timeZone}
                  </p>
                  <a href='https://userguide.hostbuddy.ai/quick-start/4-go-live' target="_blank" style={{marginBottom:'20px', fontSize:'16px'}}>Learn More About Scheduling</a>
                </div>
              ) : null}
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default CalenderModel;
