import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./calenderModel.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";

const PopupModal = ({
  show,
  setShow,
  selectedDate,
  setSelectedDate,
  responseObject,
  setShowCalender
}) => {

  const navigate = useNavigate();

  const [submit, setSubmit] = useState(false)

  const [date, setDate] = useState(new Date());

  const [data, setData] = useState({
    status: "",
    startDate: "",
    endDate: "",
    startTime: "05:30",
    endTime: "05:30",
  });

  //  format date to dd/mm/yyyy format
  function formatDate(startDate) {
    const [year, month, day] = startDate.split("-");
    return `${month}/${day}/${year}`;
  }

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

  // to get the schedule to show on the calender
  const addCalenderSchedule = async (dataToSend) => {
    setSubmit(true);
    console.log("data to send: ", dataToSend)
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;
    console.log("dataToSend ", dataToSend);

    // return;


    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        const response = await axios.put(
          `${baseUrl}/set_datetime_toggle`,
          dataToSend,
          config
        );

        // setCalendarSchedule(() => response?.data?.schedule);
        console.log("API Response: ", response.data);

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");

          setTimeout(() => {
            setShow(false);
            setShowCalender(false);
          }, 1500);


        } else {
          ToastHandle("Something went wrong", "danger");
        }

      } else {
        alert("No Token");
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
    }
    setSubmit(false);
  };

  const handleSchedule = (e) => {
    e.preventDefault();

    const startSchedule = `${formatDate(data.startDate)} ${data.startTime}`;
    const endSchedule = `${formatDate(data.endDate)} ${data.endTime}`;

    console.log(startSchedule, " ", endSchedule);

    if (data.status === "") {
      ToastHandle("Please select status", "danger");
      return;
    }

    if (data.status === "on") {
      responseObject.dates.on.push(startSchedule);
      responseObject.dates.on.push(endSchedule);
    }

    if (data.status === "off") {
      responseObject.dates.off.push(startSchedule);
      responseObject.dates.off.push(endSchedule);
    }

    addCalenderSchedule(responseObject);
    console.log("Submit", responseObject);
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
  console.log("Response Object: ", responseObject)

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
                  className="bg-primary form-control"
                  value={`${submit ? 'Please wait...' : 'Apply'}`}
                  id="submit-single-property"
                  onClick={handleSchedule}
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
