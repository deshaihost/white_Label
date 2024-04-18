import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./calenderModel.css";
import Calendar from "./Calender";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ScheduleCalender from "../schedule/ScheduleCalender";

const CalenderModel = ({ showCalender, setShowCalender }) => {
  const [monthButton, setMonthButton] = useState(true);
  const [scheduleButton, setscheduleButton] = useState(false);
  const [date, setDate] = useState(new Date());

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
                {monthButton && <div>
                  {`${date.toLocaleString("default", {
                    month: "long",
                  })} ${date.getFullYear()}`}
                </div>}

                {scheduleButton && <div>
                  Hostbudddy schedule for property
                </div>}

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

            {monthButton && <Calendar date={date} />}

            {scheduleButton && <ScheduleCalender />}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalenderModel;
