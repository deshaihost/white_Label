import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./calenderModel.css";
import Calendar from "./Calender";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ScheduleCalender from "../schedule/ScheduleCalender";
import axios from "axios";
import { Button } from "react-bootstrap";

const CalenderModel = ({ selectedProperty, showCalender, setShowCalender, allProperties }) => {
  const [monthButton, setMonthButton] = useState( false);
  const [scheduleButton, setscheduleButton] = useState(true);
  const [date, setDate] = useState(new Date());

  const [calendarSchedule, setCalendarSchedule] = useState(null);

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
    const API_KEY = "biUdFBzFi5MDscRDSdO9TgLCmqXbXQCDbZLwQtVPLzixfnEWpw";

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;
    console.log("token ", token);

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.get(
          `${baseUrl}/properties/${propertyName}/get_schedule`,
          config
        );

        setCalendarSchedule(() => response?.data?.schedules);
        console.log("API Response: ", response.data.schedules);

      } else {
        alert("No Token");
      }
    } catch (error) {
      console.log(error);
      setCalendarSchedule(() => { });
    }
  };

  useEffect(() => {
    if (selectedProperty !== "" || selectedProperty !== undefined) {
      calenderSchedule(selectedProperty);
    }
  }, [selectedProperty]);

  return (
    <div>
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
                    className={`bg-none border-0 shadow-none fs-3 ${scheduleButton && 'invisible'}`}
                    onClick={handlePrevMonth}
                  >
                    <FiChevronLeft />
                  </Button>
                  <Button
                    onClick={handleNextMonth}
                    className={`bg-none border-0 shadow-none fs-3 ${scheduleButton && 'invisible'}`}
                  >
                    <FiChevronRight />
                  </Button>
                </div>
                {monthButton && (
                  <h3>
                    {`${date.toLocaleString("default", {
                      month: "long",
                    })} ${date.getFullYear()}`}
                  </h3>
                )}

                {scheduleButton && <h3>Schedule</h3>}

                <div className="d-flex ">
                  
                  <button
                    type="button"
                    onClick={() => handleButtonToggle("schedule")}
                    className={`shadow-none btn ${scheduleButton
                      ? "btn-primary"
                      : "btn-tranparent border border-primary text-light"
                      } rounded-0`}
                  >
                    Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonToggle("month")}
                    className={`shadow-none btn ${monthButton
                      ? "btn-primary"
                      : "btn-tranparent border border-primary text-light"
                      } rounded-0`}
                  >
                    Month
                  </button>
                </div>
              </div>
            </div>

            {monthButton && (
              <Calendar getScheduleAPI={calenderSchedule} allProperties={allProperties} setShowCalender={setShowCalender} selectedProperty={selectedProperty} date={date} scheduleData={calendarSchedule} />
            )}

            {scheduleButton && <ScheduleCalender getScheduleAPI={calenderSchedule} allProperties={allProperties} setShowCalender={setShowCalender} selectedProperty={selectedProperty} scheduleData={calendarSchedule} />}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalenderModel;
