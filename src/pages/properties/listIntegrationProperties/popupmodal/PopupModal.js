import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
// import "./calenderModel.css";
import Table from "react-bootstrap/Table";
// import Calendar from "./Calender";

const PopupModal = ({ showCalender, setShowCalender }) => {
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
  return (
    <div>
      <Modal
        show={false}
        size="md"
        onHide={() => setShowCalender(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div>
            <div className="row">
              <div
                className="d-flex justify-content-between px-3 "
                style={{ fontSize: "14px", color: "#fff" }}
              >
                <div>1</div>
                <div>{`${date.toLocaleString("default", { month: "long" })}`}</div>
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

            
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
