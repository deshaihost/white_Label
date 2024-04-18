import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./calenderModel.css";
import Form from "react-bootstrap/Form";
// import Calendar from "./Calender";

const PopupModal = ({ show, setShow, selectedDate, setSelectedDate }) => {
  const [date, setDate] = useState(new Date());

  const [data, setData] = useState({
    status: "",
    startDate: "",
    endDate: "",
    startTime: "05:30",
    endTime: "05:30",
  });

  const handleStatusChange = (e) => {
    setData({
      ...data,
      status: e.target.value,
    });
  };

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  useEffect(() => {
    // Format the selected date
    const formattedDate = `${selectedDate.year}-${(selectedDate.month + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;

    // Set the initial start and end date in the state
    setData((prevData) => ({
      ...prevData,
      startDate: formattedDate,
      endDate: formattedDate,
    }));
  }, [selectedDate]); // Update when selectedDate changes

  console.log("Data: ", data);
  console.log("selectedDate: ", selectedDate);

  return (
    <div>
      <Modal
        show={show}
        size="md"
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="row py-3 border-bottom">
            <div className="6">
              <h3 className="text-white text-center">Chatbot Status</h3>
            </div>
          </div>
          <div className="d-flex flex-column pt-3 gap-3">
            <div className="row">
              <div className="col">
                <div>
                  <label>Status</label>
                  <Form.Select
                    aria-label="Default select example"
                    style={{ backgroundColor: "#0A1A44", color: "#fff" }}
                    className="form-control"
                    value={data.status}
                    onChange={handleStatusChange}
                  >
                    <option value="">Select Status</option>
                    <option value="on">ON</option>
                    <option value="off">OFF</option>
                  </Form.Select>
                </div>
              </div>
            </div>

            <div className="d-flex row">
              <div className="col">
                <label>Start Date:</label>
                <input
                  type="date"
                  name="stdate"
                  id="startDate"
                  className="form-control"
                  value={data.startDate}
                  onChange={handleInputChange}
                />
              </div>

              <div class="col">
                <label>End Date:</label>
                <input
                  type="date"
                  name="etdate"
                  id="endDate"
                  className="form-control"
                  value={data.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <label>Start Time:</label>
                <input
                  type="time"
                  name="st"
                  id="startTime"
                  class="form-control"
                  value={data.startTime}
                  onChange={handleInputChange}
                />
              </div>
              <div class="col">
                <label>End Time:</label>
                <input
                  type="time"
                  name="et"
                  id="endTime"
                  class="form-control"
                  value={data.endTime}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col text-center">
                <input
                  type="submit"
                  data-attr-date="once"
                  class="bg-primary form-control"
                  value="Apply"
                  id="submit-single-property"
                />{" "}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
