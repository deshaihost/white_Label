import React, { useState } from "react";
import "./ScheduleCalendar.css";
import SchedulePopupModal from "../popupmodal/SchedulePopupModal";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
import axios from "axios";

const daysOfWeek = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const ScheduleCalender = ({
  getScheduleAPI,
  allProperties,
  setShowCalender,
  selectedProperty,
  scheduleData,
}) => {
  const [show, setShow] = useState(false);
  const [selectedTime, setSelectedTime] = useState({});

  // if (!scheduleData) {
  //   return <div>Loading...</div>; // Or display some loading indicator
  // }

  const specificDates = scheduleData?.weekly;

  const scheduledDate = structuredClone(specificDates);

  const scheduleDefulatArray = ["CURRENT", "FUTURE", "INQUIRY/PAST"];

  // console.log(specificDates, "specificDates");

  const responseObject = {
    properties: [selectedProperty],
    schedules: scheduledDate,
  };

  const copyToAllResponseObject = {
    properties: allProperties,
    schedules: scheduledDate,
  };


  // const daysOfWeek = [
  //   "monday",
  //   "tuesday",
  //   "wednesday",
  //   "thursday",
  //   "friday",
  //   "saturday",
  //   "sunday",
  // ];

  const handleAddClick = () => {
    setShow(true);
  }

  // API to remove or update calendar schedule the schedule on the calender
  const handleCalenderScheduleAPI = async (dataToSend) => {

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );

    const token = getSessionStorageData?.token;

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
            setShowCalender(false);
          }, 1500);
        } else {
          ToastHandle("Something went wrong", "danger");
          setTimeout(() => {
            setShowCalender(false);
          }, 1500);
        }
      } else {
        ToastHandle("No Token", "danger");
        setTimeout(() => {
          setShowCalender(false);
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
      setTimeout(() => {
        setShowCalender(false);
      }, 1500);
    }
  };

  const handleRemoveSchedule = (deleteData) => {

    const isConfirmed = window.confirm(
      "Do you want to delete this Status Event?"
    );
    if (!isConfirmed) {
      return;
    }

    if (!deleteData.scheduleStage || !deleteData.day || !deleteData.startTime || !deleteData.endTime || deleteData.startIndex === undefined || deleteData.endIndex === undefined) {
      console.log("data inside if: ", deleteData)
      ToastHandle("Something went wrong here", "danger");
      return;
    }

    responseObject.schedules[deleteData.scheduleStage][deleteData.day].splice(deleteData.startIndex, 2);

    handleCalenderScheduleAPI(responseObject);

  }

  // copy to all property onClickHandle

  const handleCopyToAll = () => {
    const isConfirmed = window.confirm(
      "Do you want to Copy this schedule to all properties?"
    );
    if (!isConfirmed) {
      return;
    }

    handleCalenderScheduleAPI(copyToAllResponseObject);
  };

  console.log("scheduledDate: ", scheduledDate)
  console.log("responseObject: ", responseObject)
  console.log("copyToAllResponseObject: ", copyToAllResponseObject);
  return (
    <>
      {!scheduleData ? <div className="d-flex w-full justify-content-center"><Loader /></div> : (
        <>
          <div className="table-responsive p-3">
            <table className="w-100">
              <thead>
                <tr>
                  <th>
                    <div></div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Monday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Tuesday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Wednesday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Thursday</h4>{" "}
                    </div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Friday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Saturday</h4>
                    </div>
                  </th>
                  <th>
                    <div className="calendar-week-field">
                      <h4>Sunday</h4>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {scheduleDefulatArray?.map((schedule) => {
                  const weeklySchedule = scheduledDate[schedule];

                  return (
                    <tr>
                      <td
                        className={
                          schedule === "CURRENT"
                            ? "bg-success"
                            : schedule === "FUTURE"
                              ? "bg-primary  "
                              : schedule === "INQUIRY/PAST"
                                ? "bg-warning"
                                : ""
                        }
                      >
                        <div className="calendar-schedule-data data-head ">
                          <h5 className="mb-0">{schedule}</h5>
                        </div>
                      </td>

                      {daysOfWeek?.map((days) => {
                        let startTime;
                        let startIndex;
                        let endTime;
                        let endIndex;

                        return (
                          <td>
                            <div className="calendar-schedule-data">
                              <div className="calendar-schedule-time">
                                <p>
                                  <div className="row custom-row">
                                    {weeklySchedule[days]?.map((data, index) => {
                                      const parsedTime = new Date(`2000-01-01T${data}`);
                                      // Get hours and minutes
                                      const hours = parsedTime.getHours();
                                      const minutes = parsedTime.getMinutes();
                                      // Determine AM/PM
                                      const ampm = hours >= 12 ? 'PM' : 'AM';
                                      // Adjust hours for AM/PM format
                                      const formattedHours = hours % 12 || 12;
                                      // Format minutes with leading zero if needed
                                      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
                                      // Construct formatted time string
                                      const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

                                      // Get all keys of weeklySchedule object
                                      const keys = Object.keys(weeklySchedule);

                                      if (index % 2 === 0) {
                                        startTime = data;
                                        startIndex = index
                                      } else {
                                        endTime = data;
                                        endIndex = index
                                      }


                                      const dataToRemove = {
                                        scheduleStage: schedule,
                                        day: days,
                                        startTime: startTime,
                                        endTime: endTime,
                                        startIndex: startIndex,
                                        endIndex: endIndex

                                      }

                                      return (
                                        <>
                                          <div className="col-6 custom-col">
                                            {formattedTime}

                                            {index % 2 !== 0 && (
                                              <span className="calendar-schedule-button mainCursor ms-1">
                                                <FaRegEdit />
                                                <FaRegTrashCan onClick={() => handleRemoveSchedule(dataToRemove)} />
                                              </span>
                                            )}
                                          </div>
                                        </>
                                      );
                                    })}
                                  </div>
                                </p>
                              </div>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div class="row w-full mb-5 mt-3 d-flex justify-content-center">
            <div className="d-flex gap-3 w-50">
              <button
                className="btn btn-primary form-control"
                onClick={handleAddClick}
              >
                Add
              </button>
              <button
                onClick={handleCopyToAll}
                className="btn btn-primary form-control"
              >
                Copy to All Properties
              </button>
            </div>
          </div>

        </>
      )}

      {show && (
        <SchedulePopupModal
          show={show}
          setShow={setShow}
          selectedTime={selectedTime}
          setselectedTime={setSelectedTime}
          responseObject={responseObject}
          setShowCalender={setShowCalender}
          getScheduleAPI={getScheduleAPI}
          selectedProperty={selectedProperty}
        />
      )}
    </>
  );
};

export default ScheduleCalender;
