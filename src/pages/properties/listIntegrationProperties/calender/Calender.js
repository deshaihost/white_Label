import React, { useEffect, useState } from "react";
import PopupModal from "../popupmodal/PopupModal";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import Loader from "../../../../helper/Loader";
import { FaRegEdit } from "react-icons/fa";

const Calendar = ({
  getScheduleAPI,
  allProperties,
  setShowCalender,
  selectedProperty,
  scheduleData,
  date,
  setScheduleChanged,
  currentMonth,
}) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState({});
  // const currentDate = new Date();
  // const [currentStageData, setCurrentStageData] = useState([]);
  // const [futureStageData, setFutureStageData] = useState([]);
  // const [pastStageData, setPastStageData] = useState([]);
  ////// functionality 16-jul-2024
  const [commonArray, setCommonArray] = useState([]);

  // common section
  const parseMonthYearCommon = (monthYearStr) => {
    const [monthStr, yearStr] = monthYearStr.split(" ");
    const month = new Date(Date.parse(monthStr + " 1, 2022")).getMonth(); // using 2022 to get the correct month index
    const year = parseInt(yearStr, 10);
    return { month, year };
  };

  // Filter function to check if a date is in the specified month and year
  const filterMonthCommon = (date, month, year) => {
    const dateObj = new Date(date);
    return dateObj.getMonth() === month && dateObj.getFullYear() === year;
  };

  const monthYearStrCommon = currentMonth;
  const monthCommon = parseMonthYearCommon(monthYearStrCommon)?.month;
  const yearCommon = parseMonthYearCommon(monthYearStrCommon)?.year;
  // const { month, year } = parseMonthYearCommon(monthYearStrCo);
  const filteredDataCommon = commonArray?.filter(
    (dateTime) =>
      filterMonthCommon(dateTime?.start, monthCommon, yearCommon) ||
      filterMonthCommon(dateTime?.end, monthCommon, yearCommon)
  );

  // time format
  function formatTime(time) {
    const [hours, minutes] = time.split(":");
    let hoursInt = parseInt(hours, 10);
    const ampm = hoursInt >= 12 ? "PM" : "AM";
    hoursInt = hoursInt % 12 || 12; // Convert hour '0' to '12' for 12 AM and 12 PM
    return `${hoursInt}:${minutes} ${ampm}`;
  }
  // time format

  // common section

  ////// functionality 16-jul-2024

  const specificDates = scheduleData?.specific_dates;

  // new code
  // current section
  // const parseMonthYearCurrent = (monthYearStr) => {
  //   const [monthStr, yearStr] = monthYearStr.split(" ");
  //   const month = new Date(Date.parse(monthStr + " 1, 2022")).getMonth(); // using 2022 to get the correct month index
  //   const year = parseInt(yearStr, 10);
  //   return { month, year };
  // };

  // // Filter function to check if a date is in the specified month and year
  // const filterMonthCurrent = (date, month, year) => {
  //   const dateObj = new Date(date);
  //   return dateObj.getMonth() === month && dateObj.getFullYear() === year;
  // };

  // const monthYearStrCurrent = currentMonth;
  // const { month, year } = parseMonthYearCurrent(monthYearStrCurrent);
  // const filteredDataCurrent = currentStageData?.filter(
  //   (dateTime) =>
  //     filterMonthCurrent(dateTime?.start, month, year) ||
  //     filterMonthCurrent(dateTime?.end, month, year)
  // );

  // // current section

  // // future section
  // const parseMonthYearFuture = (monthYearStr) => {
  //   const [monthStr, yearStr] = monthYearStr.split(" ");
  //   const month = new Date(Date.parse(monthStr + " 1, 2022")).getMonth(); // using 2022 to get the correct month index
  //   const year = parseInt(yearStr, 10);
  //   return { month, year };
  // };

  // // Filter function to check if a date is in the specified month and year
  // const filterMonthFuture = (date, month, year) => {
  //   const dateObj = new Date(date);
  //   return dateObj.getMonth() === month && dateObj.getFullYear() === year;
  // };

  // const monthYearStrFuture = currentMonth;
  // const monthFuture = parseMonthYearFuture(monthYearStrFuture)?.month;
  // const yearFuture = parseMonthYearFuture(monthYearStrFuture)?.year;

  // const filteredDataCurrentFuture = futureStageData?.filter(
  //   (dateTime) =>
  //     filterMonthFuture(dateTime?.start, monthFuture, yearFuture) ||
  //     filterMonthFuture(dateTime?.end, monthFuture, yearFuture)
  // );
  // // future section

  // // Inquiry/past section
  // const parseMonthYearInquire = (monthYearStr) => {
  //   const [monthStr, yearStr] = monthYearStr.split(" ");
  //   const month = new Date(Date.parse(monthStr + " 1, 2022")).getMonth(); // using 2022 to get the correct month index
  //   const year = parseInt(yearStr, 10);
  //   return { month, year };
  // };

  // // Filter function to check if a date is in the specified month and year
  // const filterMonthInquire = (date, month, year) => {
  //   const dateObj = new Date(date);
  //   return dateObj.getMonth() === month && dateObj.getFullYear() === year;
  // };

  // const monthYearStrInquire = currentMonth;
  // const monthInquire = parseMonthYearInquire(monthYearStrInquire)?.month;
  // const yearInquire = parseMonthYearInquire(monthYearStrInquire)?.year;

  // const filteredDataInquire = pastStageData?.filter(
  //   (dateTime) =>
  //     filterMonthInquire(dateTime?.start, monthInquire, yearInquire) ||
  //     filterMonthInquire(dateTime?.end, monthInquire, yearInquire)
  // );
  // Inquiry/past section

  // new code
  const scheduledDate = structuredClone(specificDates);

  const responseObject = {
    properties: [selectedProperty],
    dates: scheduledDate,
  };

  const copyToAllResponseObject = {
    properties: allProperties,
    dates: scheduledDate,
  };
  // Generate sorted schedule data for on and off
  //// code optomices

  const categoryListArray = ["CURRENT", "FUTURE", "INQUIRY/PAST"];
  const combineSchedules = () => {
    if (specificDates) {
      let commonArrayGet = [];
      categoryListArray?.map((category) => {
        specificDates[category]?.on?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "on",
              start: item,
              end: specificDates[category].on[index + 1],
              startIndex: index,
              endIndex: index + 1,
              interFace: category,
            };
            commonArrayGet.push(obj);
          }
        });

        specificDates[category]?.off?.forEach((item, index) => {
          if (index % 2 === 0) {
            let obj = {
              status: "off",
              start: item,
              end: specificDates[category].off[index + 1],
              startIndex: index,
              endIndex: index + 1,
              interFace: category,
            };
            commonArrayGet.push(obj);
          }
        });
      });

      setCommonArray((prev) => commonArrayGet);
    }
  };
  // code optomices

  const handleSetCalendarAPI = async (dataToSend) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
        };
        const response = await axios.put(
          `${baseUrl}/set_datetime_toggle`,
          dataToSend,
          config
        );

        if (response.status === 200) {
          ToastHandle(response.data.message, "success");
          setScheduleChanged(true); // re-render the listings on the Properties page, since current status might be different
          getScheduleAPI(selectedProperty);
        } else {
          ToastHandle("Something went wrong", "danger");
          getScheduleAPI(selectedProperty);
        }
      } else {
        ToastHandle("No Token", "danger");
        getScheduleAPI(selectedProperty);
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
      getScheduleAPI(selectedProperty);
    }
  };

  // Clear All Button
  const handleClearAll = () => {
    const isConfirmed = window.confirm(
      "Do you want to clear all Status Events for this property? Weekly schedule will not be affected."
    );
    if (!isConfirmed) {
      return;
    }
    const blankScheduleObject = { properties: [selectedProperty], dates: {} };
    handleSetCalendarAPI(blankScheduleObject);
  };

  // copy to all property onClickHandle
  const handleCopyToAll = () => {
    const isConfirmed = window.confirm(
      "Do you want to Copy this specific date/time scheduling to all properties? Weekly schedules will not be copied or changed."
    );
    if (!isConfirmed) {
      return;
    }
    handleSetCalendarAPI(copyToAllResponseObject);
  };

  // Add Schedule Click
  const handleCellClick = () => {
    const todayDate = date.getDate();
    const todayMonth = date.getMonth();
    const todayYear = date.getFullYear();

    let day = { day: todayDate, month: todayMonth, year: todayYear };

    setSelectedDate(day);
    setShow(true);
  };

  // Remove Schedule click
  const handleScheduleDelete = (category, deleteData) => {
    console.log(category, deleteData, "category, deleteData");
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
    handleSetCalendarAPI(responseObject);
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${month} ${day}`;
  };

  useEffect(() => {
    if (scheduleData) {
      combineSchedules();
    }
  }, [scheduleData]);

  return (
    <>
      {!scheduleData ? (
        <div className="d-flex w-full justify-content-center">
          <Loader />
        </div>
      ) : (
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
                {/* {Object.keys(specificDates).map((category) => (
                  <div key={category} class="col">
                    <div className="main-calendar-card">
                      <div className="">
                        <p className="text-center text-white my-2">
                          {category}
                        </p>
                      </div>
                      <div className="main-calendar-card-data">
                        <div className="">
                          {category === "CURRENT" &&
                            filteredDataCurrent?.map((dateTime, index) => (
                              <div
                                key={index}
                                className="main-calendar-card-data-child"
                              >
                                <div
                                  className={`main-calendar-data-status ${
                                    dateTime?.status === "on"
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
                            filteredDataCurrentFuture?.map(
                              (dateTime, index) => (
                                <div
                                  key={index}
                                  className="main-calendar-card-data-child"
                                >
                                  <div
                                    className={`main-calendar-data-status ${
                                      dateTime?.status === "on"
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
                                    <div
                                      onClick={() =>
                                        handleScheduleDelete(category, dateTime)
                                      }
                                    >
                                      <FaRegTrashCan />
                                    </div>
                                  </div>
                                </div>
                              )
                            )}

                          {category === "INQUIRY/PAST" &&
                            filteredDataInquire?.map((dateTime, index) => (
                              <div
                                key={index}
                                className="main-calendar-card-data-child"
                              >
                                <div
                                  className={`main-calendar-data-status ${
                                    dateTime?.status === "on"
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
                ))} */}
                <div className="container text-white">
                  {filteredDataCommon?.length > 0 ? (
                    <div className="row">
                      <div className="col-md-8">
                        <div className="container px-0 px-md-auto text-white">
                          <div className="row">
                            <div className="col-12">
                              <div className="calendar-month-table-data">
                                {filteredDataCommon?.map((dateTime, index) => {
                                  const { status, start, end, interFace } =
                                    dateTime;
                                  // Split the start and end dates to get date and time separately
                                  const [startDate, startTime] =
                                    start.split(" ");
                                  const [endDate, endTime] = end.split(" ");

                                  return (
                                    <div
                                      key={index}
                                      className="calendar-month-schedule border border-primary my-3 rounded-pill px-3 bg-black"
                                    >
                                      <div
                                        className={`main-calendar-data-status`}
                                      >
                                        {status}
                                      </div>
                                      <div>
                                        <div>From</div>
                                        <div>To</div>
                                      </div>
                                      <div>
                                        <div>{formatDate(startDate)}</div>
                                        <div>{formatDate(endDate)}</div>
                                      </div>
                                      <div>
                                        <div>{formatTime(startTime)}</div>
                                        <div>{formatTime(endTime)}</div>
                                      </div>

                                      <div className="d-flex align-items-center justify-content-between">
                                        <div
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          title={interFace}
                                        >
                                          <p className="d-flex align-items-center justify-content-center gap-2">
                                            {interFace === "FUTURE" ? (
                                              <span className="future-status calender-table-status"></span>
                                            ) : interFace === "CURRENT" ? (
                                              <span className="current-status calender-table-status"></span>
                                            ) : interFace === "INQUIRY/PAST" ? (
                                              <span className="inquery-status calender-table-status"></span>
                                            ) : (
                                              ""
                                            )}
                                          </p>
                                        </div>
                                        <div className="ms-2 ms-md-5 d-flex align-items-center">
                                          <span className="me-2">
                                            <FaRegEdit className="text-primary" />
                                          </span>
                                          <div
                                            onClick={() =>
                                              handleScheduleDelete(
                                                interFace,
                                                dateTime
                                              )
                                            }
                                          >
                                            <FaRegTrashCan className="text-primary" />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4 text-white">
                        <div className="px-0 px-lg-3 px-md-3 px-xxl-5">
                          <div className="border border-primary border-2 p-4 rounded-3">
                            <h4 className="fs-6 text-center mb-3">Legend</h4>
                            <p className="fs-14 mb-3">
                              {" "}
                              Colored dots indicate that HostBuddy will respond
                              to guests at reservation stages:
                            </p>
                            <p className="fs-14">
                              {" "}
                              <span className="future-status calender-table-status me-2"></span>{" "}
                              Future
                            </p>
                            <p className="fs-14">
                              {" "}
                              <span className="current-status calender-table-status me-2"></span>{" "}
                              Current
                            </p>
                            <p className="fs-14">
                              {" "}
                              <span className="inquery-status calender-table-status me-2"></span>{" "}
                              Inquiry/Past
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-danger d-flex justify-content-center">
                      Empty
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div class="row w-full mt-5 mb-3 d-flex justify-content-center">
              <div className="d-flex gap-3 flex-wrap flex-md-nowrap" style={{ width: "80%" }}>
                <button
                  className="btn btn-primary form-control"
                  style={{ color: "rgb(220, 0, 0)" }}
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
                <button
                  className="btn btn-primary form-control"
                  onClick={handleCopyToAll}
                >
                  Copy to All Properties
                </button>
                <button
                  className="btn btn-primary form-control"
                  onClick={handleCellClick}
                >
                  Add
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
          setScheduleChanged={setScheduleChanged}
        />
      )}
    </>
  );
};

export default Calendar;
