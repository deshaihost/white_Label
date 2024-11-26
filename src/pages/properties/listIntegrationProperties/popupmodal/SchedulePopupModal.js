import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { Button } from "react-bootstrap";
import Select from "react-select";

// const weekDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
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

const SchedulePopupModal = ({ show, setShow, selectedTime, setselectedTime, responseObject, setShowCalender, getScheduleAPI, selectedProperty, setScheduleChanged }) => {

  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState({ startTime: "", endTime: "" });
  const [checkedSchedule, setCheckedSchedule] = useState({ Future: true, Past: true, Current: true });
  const [selectedDays, setSelectedDays] = useState([]);

  // handle time change 
  const handleInputChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  // handle select onChange
  const handleDaySelect = (selectedOptions) => {
    setSelectedDays(selectedOptions);
  };

  // handle Stage button clicks
  const handleOnChange = (e, type) => {
    if (type === "Future") {
      setCheckedSchedule((prevData) => ({ ...prevData, Future: e.target.checked }));
    }
    if (type === "Past") {
      setCheckedSchedule((prevData) => ({ ...prevData, Past: e.target.checked }));
    }
    if (type === "Current") {
      setCheckedSchedule((prevData) => ({ ...prevData, Current: e.target.checked }));
    }
  };
  // to get the schedule to show on the calender
  const addCalenderSchedule = async (dataToSend) => {
    setSubmit(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.put( `${baseUrl}/set_recurring_schedule`, dataToSend, config );
      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setScheduleChanged(true); // re-render the listings on the Properties page, since current status might be different

        setTimeout(() => {
          setShow(false);
        }, 1500);
        getScheduleAPI(selectedProperty);
      } else {
        ToastHandle(response.data.error, "danger");
      }
    } catch (error) {
      console.log(error);
      getScheduleAPI(selectedProperty);
    }
    setSubmit(false);
  };

  const handleSchedule = (e) => {
    e.preventDefault();
    let responseObjectToSend = JSON.parse(JSON.stringify(responseObject)); // make a deep copy

    const startSchedule = `${data.startTime}`;
    const endSchedule = `${data.endTime}`;
    if (!startSchedule || !endSchedule) {
      ToastHandle("Please enter start and end time", "danger");
      return;
    }
    if (!checkedSchedule.Current && !checkedSchedule.Future && !checkedSchedule.Past) {
      ToastHandle("Please select at least one reservation stage", "danger");
      return;
    }
    if (selectedDays.length <= 0) {
      ToastHandle("Please select week day[s]", "danger");
      return;
    }
    if (checkedSchedule.Current) {
      if (!responseObjectToSend.schedules.hasOwnProperty("CURRENT")) {
        responseObjectToSend.schedules["CURRENT"] = {};
      }
      selectedDays.forEach((day) => {
        if (!responseObjectToSend.schedules["CURRENT"].hasOwnProperty(day.value)) {
          responseObjectToSend.schedules["CURRENT"][day.value] = [];
        }
        responseObjectToSend.schedules["CURRENT"][day.value].push(startSchedule);
        responseObjectToSend.schedules["CURRENT"][day.value].push(endSchedule);
      });
    }

    if (checkedSchedule.Past) {
      if (!responseObjectToSend.schedules.hasOwnProperty("INQUIRY/PAST")) {
        responseObjectToSend.schedules["INQUIRY/PAST"] = {};
      }
      selectedDays.forEach((day) => {
        if (!responseObjectToSend.schedules["INQUIRY/PAST"].hasOwnProperty(day.value)) {
          responseObjectToSend.schedules["INQUIRY/PAST"][day.value] = [];
        }
        responseObjectToSend.schedules["INQUIRY/PAST"][day.value].push(startSchedule);
        responseObjectToSend.schedules["INQUIRY/PAST"][day.value].push(endSchedule);
      });
    }

    if (checkedSchedule.Future) {
      if (!responseObjectToSend.schedules.hasOwnProperty("FUTURE")) {
        responseObjectToSend.schedules["FUTURE"] = {};
      }
      selectedDays.forEach((day) => {
        if (!responseObjectToSend.schedules["FUTURE"].hasOwnProperty(day.value)) {
          responseObjectToSend.schedules["FUTURE"][day.value] = [];
        }
        responseObjectToSend.schedules["FUTURE"][day.value].push(startSchedule);
        responseObjectToSend.schedules["FUTURE"][day.value].push(endSchedule);
      });
    }

    addCalenderSchedule(responseObjectToSend);
  };
  return (
    <div>
      <Modal show={show} size="md" onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body style={{overflowY:'auto'}}>
          <div className="6">
            <div className="row border-bottom py-3">
              <h3 className="text-white text-center">Add New Status</h3>
            </div>
            <p style={{marginTop: '10px'}} className="text-white text-center">
              Apply to the following reservation stages:
            </p>
          </div>

          <div className=" d-flex justify-content-between mt-3">
            <div class="col text-center">
              <input type="checkbox" checked={checkedSchedule.Future} onChange={(e) => handleOnChange(e, "Future")} className="btn-check" id="future" autocomplete="off"/>
              <label for="future" className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Future ? "" : "btn-unselected"}`}>
                Future
              </label>
            </div>
            <div class="col text-center">
              <input type="checkbox" checked={checkedSchedule.Past} onChange={(e) => handleOnChange(e, "Past")} className="btn-check" id="past" autocomplete="off" />
              <label for="past" className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${checkedSchedule.Past ? "" : "btn-unselected"}`} >
                Inquiry/Past
              </label>
            </div>
            <div class="col text-center">
              <input type="checkbox" checked={checkedSchedule.Current} onChange={(e) => handleOnChange(e, "Current")} className="btn-check" id="current" autocomplete="off" />
              <label for="current" className={`btn btn-primary rounded-pill tab-btn-stage px-4 ${checkedSchedule.Current ? "" : "btn-unselected"}`} >
                Current
              </label>
            </div>
          </div>
          <div className="d-flex flex-column pt-3 gap-4">
            <div class="row py-2">
              <div class="col">
                <label>Choose Day[s] of Week:</label>
                <Select isMulti options={weekDayOptions} value={selectedDays} onChange={handleDaySelect} placeholder="--Select--" closeMenuOnSelect={false}/>
              </div>
            </div>

            <div class="row py-2">
              <div class="col">
                <label>Start Time:</label>
                <input type="time" name="st" id="startTime" class="form-control" value={data.startTime} onChange={handleInputChange}
                />
              </div>
              <div class="col">
                <label>End Time:</label>
                <input type="time" name="et" id="endTime" class="form-control" value={data.endTime} onChange={handleInputChange}/>
              </div>
            </div>

            <div className="row">
              <div className="col-4 offset-2 text-center">
                <Button className="bg-primary form-control d-block" onClick={() => setShow(false)}>
                  Cancel
                </Button>
              </div>
              <div className="col-4 text-center">
                <input type="submit" data-attr-date="once" className="bg-primary form-control" value={`${submit ? "Please wait..." : "Apply"}`} id="submit-single-property" onClick={handleSchedule} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SchedulePopupModal;
