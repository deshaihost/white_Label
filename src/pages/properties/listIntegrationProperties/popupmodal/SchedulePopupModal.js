import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";

const SchedulePopupModal = ({
  show,
  setShow,
  selectedTime,
  setselectedTime,
  responseObject,
  setShowCalender
}) => {

  const [submit, setSubmit] = useState(false)

  const [data, setData] = useState({
    startTime: "",
    endTime: "",
  });

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

    const startSchedule = `${data.startTime}`;
    const endSchedule = `${data.endTime}`;

    console.log(startSchedule, " ", endSchedule);

    // If the day exists in weekly object, push start and end time
    if (responseObject.schedule[data.day]) {
      responseObject.schedule[data.day].push(startSchedule);
      responseObject.schedule[data.day].push(endSchedule);
    } else {
      // If the day doesn't exist, create a new array and push start and end time
      responseObject.schedule[data.day] = [startSchedule, endSchedule];
    }

    console.log("Submit", responseObject);

    addCalenderSchedule(responseObject);
  };

  useEffect(() => {
    // Set the initial start and end time in the state
    setData((prevData) => ({
      ...prevData,
      startTime: selectedTime?.startTime,
      endTime: selectedTime?.endTime,
      day: selectedTime?.day
    }));
  }, [selectedTime]); // Update when selectedTime changes

  console.log("Data: ", data);
  console.log("selectedTime: ", selectedTime);
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
          <div className="d-flex flex-column pt-3 gap-4">

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

export default SchedulePopupModal;
