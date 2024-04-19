import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import "./calenderModel.css";
import Calendar from "./Calender";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ScheduleCalender from "../schedule/ScheduleCalender";
import axios from "axios";

const CalenderModel = ({ selectedProperty, showCalender, setShowCalender }) => {
  const [monthButton, setMonthButton] = useState(true);
  const [scheduleButton, setscheduleButton] = useState(false);
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

        setCalendarSchedule(()=> response?.data?.schedule)
        console.log("API Response: ", response.data.schedule)


        // if (response.status === 200) {
        //     dispatch({
        //         type: "get_all_Task",
        //         payload: response.data.data,
        //     });
        // } else {
        //     dispatch({
        //         type: "get_all_Task",
        //         payload: [],
        //     });
        // }
      } else {
        alert("No Token");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedProperty !== "" || selectedProperty !== undefined) {
      // axios.get(`${process.env.}`)
      calenderSchedule(selectedProperty);
    }
  }, [selectedProperty]);

  return (
    <div>
      <Modal
        show={showCalender}
        size="xl"
        onHide={handleCalenderClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div>
            <div className="row">
              <div
                className="d-flex justify-content-between px-3 calenderHeader"
                style={{ fontSize: "14px", color: "#fff" }}
              >
                <div className="d-flex justify-between">
                  <FiChevronLeft onClick={handlePrevMonth} />
                  <FiChevronRight onClick={handleNextMonth} />
                </div>
                {monthButton && (
                  <div>
                    {`${date.toLocaleString("default", {
                      month: "long",
                    })} ${date.getFullYear()}`}
                  </div>
                )}

                {scheduleButton && <div>Hostbudddy schedule for property</div>}

                <div className="d-flex ">
                  <button
                    type="button"
                    onClick={() => handleButtonToggle("month")}
                    className={`btn ${
                      monthButton
                        ? "btn-primary"
                        : "btn-tranparent border border-primary text-light"
                    } rounded-0`}
                  >
                    Month
                  </button>
                  <button
                    type="button"
                    onClick={() => handleButtonToggle("schedule")}
                    className={`btn ${
                      scheduleButton
                        ? "btn-primary"
                        : "btn-tranparent border border-primary text-light"
                    } rounded-0`}
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>

            {monthButton && <Calendar date={date} scheduleData={calendarSchedule}/>}

            {scheduleButton && <ScheduleCalender />}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalenderModel;
