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

const SchedulePopupModal = ({ show, setShow, responseObject, setResponseObject }) => {

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


  // Make sure that the newly selected time range is not overlapping with any existing time range
  const validateNewTimeRange = (selectedDays, existingSchedule) => {
    let startSchedule = `${data.startTime}`;
    let endSchedule = `${data.endTime}`;
    let newTimeRangeStart = new Date(`01/01/2000 ${startSchedule}`);
    let newTimeRangeEnd = new Date(`01/01/2000 ${endSchedule}`);
    let newTimeRangeDuration = newTimeRangeEnd - newTimeRangeStart;

    for (let day of selectedDays) {
      if (existingSchedule.hasOwnProperty(day.value)) {
        let existingTimeRanges = existingSchedule[day.value];
        for (let i = 0; i < existingTimeRanges.length; i += 2) {
          let existingTimeRangeStart = new Date(`01/01/2000 ${existingTimeRanges[i]}`);
          let existingTimeRangeEnd = new Date(`01/01/2000 ${existingTimeRanges[i + 1]}`);

          if (newTimeRangeStart >= existingTimeRangeStart && newTimeRangeStart <= existingTimeRangeEnd) {
            return false;
          }
          if (newTimeRangeEnd >= existingTimeRangeStart && newTimeRangeEnd <= existingTimeRangeEnd) {
            return false;
          }
          if (newTimeRangeStart <= existingTimeRangeStart && newTimeRangeEnd >= existingTimeRangeEnd) {
            return false;
          }
          if (newTimeRangeDuration < 0) {
            return false;
          }
        }
      }
    }
    return true;
  };


  const validateNewFullSchedule = (scheduleObj) => {
    
  };



  const handleSchedule = (e) => {
    e.preventDefault();
    let responseObjectToSend = structuredClone(responseObject); // make a deep copy

    const startSchedule = `${data.startTime}`;
    const endSchedule = `${data.endTime}`;

    if (startSchedule >= endSchedule) {
      ToastHandle("End time must be after start time", "danger");
      return;
    }

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

    if (!validateNewTimeRange(selectedDays, responseObjectToSend)) {
      ToastHandle("New time range cannot overlap with an existing time range", "danger");
      return;
    }

    selectedDays.forEach((day) => {
      if (!responseObjectToSend.hasOwnProperty(day.value)) {
        responseObjectToSend[day.value] = [];
      }
      responseObjectToSend[day.value].push(startSchedule);
      responseObjectToSend[day.value].push(endSchedule);
    });

    setResponseObject(responseObjectToSend);
    setShow(false);
  };


  return (
    <div>
      <Modal show={show} size="md" onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Body style={{overflowY:'auto'}}>
          <div className="6">
            <div className="row border-bottom py-3">
              <h3 className="text-white text-center">Add New Status</h3>
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
