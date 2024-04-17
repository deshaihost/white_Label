import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./calenderModel.css";
import Table from "react-bootstrap/Table";
import Calendar from "./Calender";

const CalenderModel = ({ showCalender, setShowCalender }) => {
  const [monthButton, setMonthButton] = useState(true);
  const [scheduleButton, setscheduleButton] = useState(false);

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
        show={showCalender}
        size="xl"
        onHide={() => setShowCalender(false)}
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
                <div>1</div>
                <div>April 2024</div>
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

              {/* </div> */}
            </div>
            
            {/* <Table bordered className="">
              <thead>
                <tr className="text-light text-center">
                  <th className="text-center">Sun</th>
                  <th>Mon</th>
                  <th>Tue</th>
                  <th>Wed</th>
                  <th>Thu</th>
                  <th>Fri</th>
                  <th>Sat</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="">1</td>
                  <td className="">1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </Table> */}
            <Calendar />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CalenderModel;
