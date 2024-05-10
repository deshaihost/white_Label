import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { Button } from "react-bootstrap";
import Select from "react-select";

const weekDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const weekDayOptions = [
  { value: 'sunday', label: 'Sunday' },
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
];
//  ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const SchedulePopupModal = ({
  show,
  setShow,
  selectedTime,
  setselectedTime,
  responseObject,
  setShowCalender,
  getScheduleAPI,
  selectedProperty
}) => {
  const [submit, setSubmit] = useState(false);

  const [data, setData] = useState({
    startTime: "05:30",
    endTime: "05:30",
  });

  const [checkedSchedule, setCheckedSchedule] = useState({
    Future: false,
    Past: false,
    Current: false,
  });

  const [selectedDays, setSelectedDays] = useState([]);
  // handle time change 
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  // handle select onChange
  const handleDaySelect = (selectedOptions) => {
    setSelectedDays(selectedOptions);
  };

  // handle Stage button clicks
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

    console.log("Checked: ", e.target.checked);
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
          `${baseUrl}/set_recurring_schedule`,
          dataToSend,
          config
        );

        console.log("API Response: ", response.data);

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");

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
      setTimeout(() => {
        setShow(false);
        setShowCalender(false);
      }, 1500);
      getScheduleAPI(selectedProperty);
    }
    setSubmit(false);
  };

  const handleSchedule = (e) => {
    e.preventDefault();

    const startSchedule = `${data.startTime}`;
    const endSchedule = `${data.endTime}`;

    console.log("selectedDays: ", selectedDays);
    console.log(startSchedule, " ", endSchedule);

    if (!checkedSchedule.Current && !checkedSchedule.Future && !checkedSchedule.Past) {
      ToastHandle("Please select at least one reservation stage", "danger");
      return;
    }

    if (selectedDays.length <= 0) {
      ToastHandle("Please select week day[s]", "danger");
      return;
    }


    if (checkedSchedule.Current) {
      if (!responseObject.schedules.hasOwnProperty("CURRENT")) {
        responseObject.schedules["CURRENT"] = {};
      }
      selectedDays.forEach((day) => {
        if (!responseObject.schedules["CURRENT"].hasOwnProperty(day.value)) {
          responseObject.schedules["CURRENT"][day.value] = [];
        }
        responseObject.schedules["CURRENT"][day.value].push(startSchedule);
        responseObject.schedules["CURRENT"][day.value].push(endSchedule);
      });
    }

    if (checkedSchedule.Past) {
      if (!responseObject.schedules.hasOwnProperty("INQUIRY/PAST")) {
        responseObject.schedules["INQUIRY/PAST"] = {};
      }
      selectedDays.forEach((day) => {
        if (!responseObject.schedules["INQUIRY/PAST"].hasOwnProperty(day.value)) {
          responseObject.schedules["INQUIRY/PAST"][day.value] = [];
        }
        responseObject.schedules["INQUIRY/PAST"][day.value].push(startSchedule);
        responseObject.schedules["INQUIRY/PAST"][day.value].push(endSchedule);
      });
    }

    if (checkedSchedule.Future) {
      if (!responseObject.schedules.hasOwnProperty("FUTURE")) {
        responseObject.schedules["FUTURE"] = {};
      }
      selectedDays.forEach((day) => {
        if (!responseObject.schedules["FUTURE"].hasOwnProperty(day.value)) {
          responseObject.schedules["FUTURE"][day.value] = [];
        }
        responseObject.schedules["FUTURE"][day.value].push(startSchedule);
        responseObject.schedules["FUTURE"][day.value].push(endSchedule);
      });
    }

    console.log("Submit", responseObject);

    addCalenderSchedule(responseObject);
  };

  console.log("Data: ", data);
  console.log("selectedTime: ", selectedTime);
  console.log("Response Object: ", responseObject);

  return (
    <div>
      <Modal
        show={show}
        size="md"
        onHide={() => setShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body style={{overflowY:'auto'}}>
          <div className="row py-3 border-bottom">
            <div className="6">
              <h3 className="text-white text-center">Add New Status</h3>
              <p className="text-white">
                Apply to the following reservation stages:
              </p>
            </div>
          </div>

          <div className=" d-flex justify-content-between mt-3">
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
          <div className="d-flex flex-column pt-3 gap-4">
            <div class="row py-2">
              <div class="col">
                <label>Choose Day[s] of Week:</label>
                <Select 
                className=""
                  isMulti
                  options={weekDayOptions}
                  value={selectedDays}
                  onChange={handleDaySelect}
                  placeholder="--Select--"
                />
              </div>
            </div>

            <div class="row py-2">
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
              <div class="col-4 text-center ">
                <div className="">
                  <Button className="bg-primary form-control d-block" onClick={() => setShow(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
              <div class="col text-center">
                <input
                  type="submit"
                  data-attr-date="once"
                  className="bg-primary form-control"
                  value={`${submit ? "Please wait..." : "Apply"}`}
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

export default SchedulePopupModal;
