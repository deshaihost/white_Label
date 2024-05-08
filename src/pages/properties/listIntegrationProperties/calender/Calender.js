import React, { useEffect, useState } from "react";
import PopupModal from "../popupmodal/PopupModal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Loader from "../../../../helper/Loader";

const Calendar = ({
  getScheduleAPI,
  allProperties,
  setShowCalender,
  selectedProperty,
  scheduleData,
  date,
}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  const currentDate = new Date();
  const [currentStageData, setCurrentStageData] = useState([]);
  const [futureStageData, setFutureStageData] = useState([]);
  const [pastStageData, setPastStageData] = useState([]);

  // if (!scheduleData) {
  //   return <div>Loading...</div>; // Or display some loading indicator
  // }

  const specificDates = scheduleData?.specific_dates;

  const scheduledDate = structuredClone(specificDates);

  const responseObject = {
    properties: [selectedProperty],
    dates: scheduledDate,
  };

  const copyToAllResponseObject = {
    properties: allProperties,
    dates: scheduledDate,
  };

  console.log("copyToAllResponseObject: ", copyToAllResponseObject);

  // Generate sorted schedule data for on and off
  const combineSchedules = () => {
    if (specificDates) {
      let combineCurrentStage = [];
      let combineFutureStage = [];
      let combinePastStage = [];

      if (specificDates["CURRENT"]) {
        specificDates["CURRENT"]?.on?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "on",
              start: item,
              end: specificDates["CURRENT"].on[index + 1],
              startIndex: index,
              endIndex: index + 1,
            };
            combineCurrentStage.push(obj);
          }
        });

        specificDates["CURRENT"]?.off?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "off",
              start: item,
              end: specificDates["CURRENT"].off[index + 1],
              startIndex: index,
              endIndex: index + 1,
            };
            combineCurrentStage.push(obj);
          }
        });

        combineCurrentStage?.sort((a, b) => {
          const dateA = new Date(a.start);
          const dateB = new Date(b.start);
          return dateA - dateB;
        });
      }
      if (specificDates["FUTURE"]) {
        specificDates["FUTURE"]?.on?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "on",
              start: item,
              end: specificDates["FUTURE"].on[index + 1],
              startIndex: index,
              endIndex: index + 1,
            };
            combineFutureStage.push(obj);
          }
        });

        specificDates["FUTURE"]?.off?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "off",
              start: item,
              end: specificDates["FUTURE"].off[index + 1],
              startIndex: index,
              endIndex: index + 1,
            };
            combineFutureStage.push(obj);
          }
        });

        combineFutureStage?.sort((a, b) => {
          const dateA = new Date(a.start);
          const dateB = new Date(b.start);
          return dateA - dateB;
        });
      }

      if (specificDates["INQUIRY/PAST"]) {
        specificDates["INQUIRY/PAST"]?.on?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "on",
              start: item,
              end: specificDates["INQUIRY/PAST"].on[index + 1],
              startIndex: index,
              endIndex: index + 1,
            };
            combinePastStage.push(obj);
          }
        });

        specificDates["INQUIRY/PAST"]?.off?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "off",
              start: item,
              end: specificDates["INQUIRY/PAST"].off[index + 1],
              startIndex: index,
              endIndex: index + 1,
            };
            combinePastStage.push(obj);
          }
        });

        combinePastStage?.sort((a, b) => {
          const dateA = new Date(a.start);
          const dateB = new Date(b.start);
          return dateA - dateB;
        });
      }

      setCurrentStageData((prev) => combineCurrentStage);
      setFutureStageData((prev) => combineFutureStage);
      setPastStageData((prev) => combinePastStage);
    }
  };

  // to add the schedule to all properties
  const copyToAllSchedule = async (dataToSend) => {
    // setSubmit(true);
    console.log("data to send: ", dataToSend);
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
        // console.log("API Response: ", response.data);

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");


          setTimeout(() => {
            setShow(false);
            setShowCalender(false);
          }, 1500);

          // getScheduleAPI(selectedProperty);
        } else {
          ToastHandle("Something went wrong", "danger");
          setTimeout(() => {
            setShow(false);
            setShowCalender(false);
          }, 1500);

          // getScheduleAPI(selectedProperty);

        }
      } else {
        ToastHandle("No Token", "danger");
        setTimeout(() => {
          setShow(false);
          setShowCalender(false);
        }, 1500);

        // getScheduleAPI(selectedProperty);

      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
      setTimeout(() => {
        setShow(false);
        setShowCalender(false);
      }, 1500);
      // getScheduleAPI(selectedProperty);
    }
    // setSubmit(false);
  };

  // copy to all property onClickHandle

  const handleCopyToAll = () => {
    const isConfirmed = window.confirm(
      "Do you want to Copy this schedule to all properties?"
    );
    if (!isConfirmed) {
      return;
    }

    copyToAllSchedule(copyToAllResponseObject);
  };

  //  Remove Schedule API
  const removeCalenderSchedule = async (dataToSend) => {
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
          `${baseUrl}/set_datetime_toggle`,
          dataToSend,
          config
        );

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

  // Add Schedule Click
  const handleCellClick = () => {
    const todayDate = date.getDate();
    const todayMonth = date.getMonth();
    const todayYear = date.getFullYear();

    let day = {
      day: todayDate,
      month: todayMonth,
      year: todayYear,
    };

    setSelectedDate(day);
    setShow(true);
  };

  // Remove Schedule click
  const handleScheduleDelete = (category, deleteData) => {
    console.log("deleteData: ", deleteData, " category: ", category);
    const isConfirmed = window.confirm(
      "Do you want to delete this Status Event?"
    );
    if (!isConfirmed) {
      return;
    }
    if (category === "CURRENT") {
      if (deleteData.status === "on") {
        responseObject.dates[category].on.splice(deleteData.startIndex, 2);
      }

      if (deleteData.status === "off") {
        responseObject.dates[category].off.splice(deleteData.startIndex, 2);
      }
    }
    if (category === "FUTURE") {
      if (deleteData.status === "on") {
        responseObject.dates[category].on.splice(deleteData.startIndex, 2);
      }

      if (deleteData.status === "off") {
        responseObject.dates[category].off.splice(deleteData.startIndex, 2);
      }
    }
    if (category === "INQUIRY/PAST") {
      if (deleteData.status === "on") {
        responseObject.dates[category].on.splice(deleteData.startIndex, 2);
      }

      if (deleteData.status === "off") {
        responseObject.dates[category].off.splice(deleteData.startIndex, 2);
      }
    }

    console.log("responseObject after delete: ", responseObject);

    removeCalenderSchedule(responseObject);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${month} ${day}, ${year} ${time}`;
  };

  useEffect(() => {
    if (scheduleData) {
      combineSchedules();
    }
  }, [scheduleData]);

  return (
    <>
      {!scheduleData ? <div className="d-flex w-full justify-content-center"><Loader /></div> : (
        <>
          <div className="calendar">
            <div className="container">
              <div className="row">
                <div className="col-12 text-left text-light ">
                  <p className="">
                    Choose specific dates/times to selectively enable/disable
                    HostBuddy. These selections will override the weekly
                    schedule during the chosen times.
                  </p>
                </div>
              </div>

              <div class="row mt-3">
                {/* Render schedules for CURRENT, FUTURE, and INQUIRY/PAST */}
                {Object.keys(specificDates).map((category) => (
                  <div key={category} class="col">
                    <div className="main-calendar-card">
                      <div className="">
                        <p className="text-center text-white my-2">
                          {category}
                        </p>
                      </div>
                      <div className="main-calendar-card-data">
                        <div className="">
                          {/* Render ON schedules */}
                          {category === "CURRENT" &&
                            currentStageData?.map((dateTime, index) => (
                              <div
                                key={index}
                                className="main-calendar-card-data-child"
                              >
                                <div
                                  className={`main-calendar-data-status ${dateTime?.status === "on"
                                    ? "bg-success"
                                    : "bg-danger"
                                    }`}
                                >
                                  {dateTime?.status}
                                </div>
                                <div className="d-flex gap-3 text-center py-4 ps-1">
                                  <div className="w-50">
                                    {formatDate(dateTime?.start)}
                                  </div>
                                  <div className="w-50">
                                    {"- "} {formatDate(dateTime?.end)}
                                  </div>
                                </div>
                                <div className="h-100 d-flex flex-column justify-content-between">
                                  <div className="text-end">
                                    <FiEdit />
                                  </div>
                                  <div
                                    className="text-end"
                                    onClick={() =>
                                      handleScheduleDelete(category, dateTime)
                                    }
                                  >
                                    <FaRegTrashCan />
                                  </div>
                                </div>
                              </div>
                            ))}

                          {category === "FUTURE" &&
                            futureStageData?.map((dateTime, index) => (
                              <div
                                key={index}
                                className="main-calendar-card-data-child"
                              >
                                <div
                                  className={`main-calendar-data-status ${dateTime?.status === "on"
                                    ? "bg-success"
                                    : "bg-danger"
                                    }`}
                                >
                                  {dateTime?.status}
                                </div>
                                <div className="d-flex gap-3 text-center py-4 ps-1">
                                  <div className="w-50">
                                    {formatDate(dateTime?.start)}
                                  </div>
                                  {/* {specificDates[category].on[index + 1] && // Check if there's a corresponding end time */}
                                  <div className="w-50">
                                    {"- "} {formatDate(dateTime?.end)}
                                  </div>
                                  {/* } */}
                                </div>
                                <div className="h-100 d-flex flex-column justify-content-between">
                                  <div>
                                    <FiEdit />
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleScheduleDelete(category, dateTime)
                                    }
                                  >
                                    <FaRegTrashCan />
                                  </div>
                                </div>
                              </div>
                            ))}

                          {category === "INQUIRY/PAST" &&
                            pastStageData?.map((dateTime, index) => (
                              <div
                                key={index}
                                className="main-calendar-card-data-child"
                              >
                                <div
                                  className={`main-calendar-data-status ${dateTime?.status === "on"
                                    ? "bg-success"
                                    : "bg-danger"
                                    }`}
                                >
                                  {dateTime?.status}
                                </div>
                                <div className="d-flex gap-3 text-center py-4 ps-1 ">
                                  <div className="w-50">
                                    {formatDate(dateTime?.start)}
                                  </div>
                                  <div className="w-50">
                                    {"- "} {formatDate(dateTime?.end)}
                                  </div>
                                </div>
                                <div className="h-100 d-flex flex-column justify-content-between">
                                  <div>
                                    <FiEdit />
                                  </div>
                                  <div
                                    onClick={() =>
                                      handleScheduleDelete(category, dateTime)
                                    }
                                  >
                                    <FaRegTrashCan />
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div class="row w-full mt-5 d-flex justify-content-center">
              <div className="d-flex gap-3 w-50">
                <button
                  className="btn btn-primary form-control"
                  onClick={handleCellClick}
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
          </div>
        </>
      )}

      {show && (
        <PopupModal
          show={show}
          setShow={setShow}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          responseObject={responseObject}
          setShowCalender={setShowCalender}
          getScheduleAPI={getScheduleAPI}
          selectedProperty={selectedProperty}
        />
      )}
    </>
  );
};

export default Calendar;
