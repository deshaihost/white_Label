import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// import "./calenderModel.css";
import Form from "react-bootstrap/Form";
// import { useNavigate } from "react-router-dom";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { Button } from "react-bootstrap";

const PopupModal = ({
  show,
  setShow,
  selectedDate,
  // setSelectedDate,
  responseObject,
  setShowCalender,
  getScheduleAPI,
  selectedProperty,
  setScheduleChanged
}) => {
  // const navigate = useNavigate();

  const [submit, setSubmit] = useState(false);

  // const [date, setDate] = useState(new Date());

  const [data, setData] = useState({
    status: "",
    startDate: "",
    endDate: "",
    startTime: "05:30",
    endTime: "05:30",
  });

  const [checkedSchedule, setCheckedSchedule] = useState({
    Future: true,
    Past: true,
    Current: true,
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
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleOnChange = (e, type) => {
    if (type === "Future") {
      setCheckedSchedule((prevData) => ({
        ...prevData,
        Future: e.target.checked,
      }));
    }
    if (type === "Past") {
      setCheckedSchedule((prevData) => ({
        ...prevData,
        Past: e.target.checked,
      }));
    }
    if (type === "Current") {
      setCheckedSchedule((prevData) => ({
        ...prevData,
        Current: e.target.checked,
      }));
    }
  };

  // to get the schedule to show on the calender
  const addCalenderSchedule = async (dataToSend) => {
    setSubmit(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;
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
        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          setScheduleChanged(true); // re-render the listings on the Properties page, since current status might be different

          setTimeout(() => {
            setShow(false);
            // setShowCalender(false);
          }, 1500);

          getScheduleAPI(selectedProperty);
        } else {
          ToastHandle("Something went wrong", "danger");
          setTimeout(() => {
            setShow(false);
            setShowCalender(false);
          }, 1500);

          getScheduleAPI(selectedProperty);
        }
      } else {
        ToastHandle("No Token", "danger");
        setTimeout(() => {
          setShow(false);
          setShowCalender(false);
        }, 1500);
        getScheduleAPI(selectedProperty);
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
      /* Leave the windows open so the user can correct the error and resubmit
      setTimeout(() => {
        setShow(false);
        setShowCalender(false);
      }, 1500); */
      getScheduleAPI(selectedProperty);
    }
    setSubmit(false);
  };

  const handleSchedule = (e) => {
    e.preventDefault();

    const startSchedule = `${formatDate(data.startDate)} ${data.startTime}`;
    const endSchedule = `${formatDate(data.endDate)} ${data.endTime}`;

    if (data.status === "") {
      ToastHandle("Please select status", "danger");
      return;
    }

    if (
      !checkedSchedule.Current &&
      !checkedSchedule.Future &&
      !checkedSchedule.Past
    ) {
      ToastHandle("Please select at least one reservation stage", "danger");
      return;
    }

    if (checkedSchedule.Current) {
      // Check if "CURRENT" key exists in dates
      if (!responseObject.dates.hasOwnProperty("CURRENT")) {
        responseObject.dates["CURRENT"] = { on: [], off: [] }; // Create empty object if not exists
      }
      if (data.status === "on") {
        // Now you can access responseObject.dates["CURRENT"] safely and push values into "on" or "off" arrays
        responseObject.dates["CURRENT"].on.push(startSchedule);
        responseObject.dates["CURRENT"].on.push(endSchedule);
      }
      if (data.status === "off") {
        responseObject.dates["CURRENT"].off.push(startSchedule);
        responseObject.dates["CURRENT"].off.push(endSchedule);
      }
    }

    if (checkedSchedule.Past) {
      // Check if "INQUIRY/PAST" key exists in dates
      if (!responseObject.dates.hasOwnProperty("INQUIRY/PAST")) {
        responseObject.dates["INQUIRY/PAST"] = { on: [], off: [] }; // Create empty object if not exists
      }
      if (data.status === "on") {
        // Now you can access responseObject.dates["INQUIRY/PAST"] safely and push values into "on" or "off" arrays
        responseObject.dates["INQUIRY/PAST"].on.push(startSchedule);
        responseObject.dates["INQUIRY/PAST"].on.push(endSchedule);
      }
      if (data.status === "off") {
        responseObject.dates["INQUIRY/PAST"].off.push(startSchedule);
        responseObject.dates["INQUIRY/PAST"].off.push(endSchedule);
      }
    }

    if (checkedSchedule.Future) {
      // Check if "FUTURE" key exists in dates
      if (!responseObject.dates.hasOwnProperty("FUTURE")) {
        responseObject.dates["FUTURE"] = { on: [], off: [] }; // Create empty object if not exists
      }
      if (data.status === "on") {
        // Now you can access responseObject.dates["FUTURE"] safely and push values into "on" or "off" arrays
        responseObject.dates["FUTURE"].on.push(startSchedule);
        responseObject.dates["FUTURE"].on.push(endSchedule);
      }
      if (data.status === "off") {
        responseObject.dates["FUTURE"].off.push(startSchedule);
        responseObject.dates["FUTURE"].off.push(endSchedule);
      }
    }

    addCalenderSchedule(responseObject);
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
          <div className="row py-3 border-bottom d-flex flex-column gap-2">

            <div className="6">
              <div className="row border-bottom py-3">
                <h3 className="text-white text-center">Add New Status</h3>
              </div>
              <p style={{marginTop: '10px'}} className="text-white text-center">
                Apply to the following reservation stages:
              </p>
            </div>

            <div className="6 d-flex justify-content-between">
              <div class="col text-center">
                <input
                  type="checkbox"
                  checked={checkedSchedule.Future}
                  onChange={(e) => handleOnChange(e, "Future")}
                  className="btn-check"
                  id="future"
                  autocomplete="off"
                />
                <label
                  className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Future ? "" : "btn-unselected"
                    }`}
                  for="future"
                >
                  Future
                </label>
              </div>
              <div class="col text-center">
                <input
                  type="checkbox"
                  checked={checkedSchedule.Past}
                  onChange={(e) => handleOnChange(e, "Past")}
                  className="btn-check"
                  id="past"
                  autocomplete="off"
                />
                <label
                  className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Past ? "" : "btn-unselected"
                    }`}
                  for="past"
                >
                  Inquiry/Past
                </label>
              </div>
              <div class="col text-center">
                <input
                  type="checkbox"
                  checked={checkedSchedule.Current}
                  onChange={(e) => handleOnChange(e, "Current")}
                  className="btn-check"
                  id="current"
                  autocomplete="off"
                />
                <label
                  className={`btn btn-primary rounded-pill tab-btn-stage px-4 ${checkedSchedule.Current ? "" : "btn-unselected"
                    }`}
                  for="current"
                >
                  Current
                </label>
              </div>
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

            <div className="row">
              <div className="col-4 offset-2 d-flex justify-content-center align-items-center">
                <Button className="bg-primary form-control d-block" onClick={() => setShow(false)}>
                  Cancel
                </Button>
              </div>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <input
                  type="submit"
                  data-attr-date="once"
                  className="bg-primary form-control"
                  value={`${submit ? "Please wait..." : "Apply"}`}
                  id="submit-single-property"
                  onClick={handleSchedule}
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupModal;
