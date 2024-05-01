import React, { useState } from "react";
import ConverSationtranscriptModel from "./transcriptsModel/ConverSationtranscriptModel";
const TranscriptsTable = ({ conversationData }) => {
  const [model, setModel] = useState({
    conversationModel: false,
    conversationDataSend: "",
  });
  const conversationModelOpen = "conversationModelOpen";
  const conversationModelClose = "conversationModelClose";
  const handleModelOpen = (type, data) => {
    if (type === conversationModelOpen) {
      setModel({
        ...model,
        conversationModel: true,
        conversationDataSend: data,
      });
    }
  };
  const handleModelClose = (type) => {
    if (type === conversationModelClose) {
      setModel({ ...model, conversationModel: false });
    }
  };

  function formatDateAndTime(timestamp) {
    const months = [
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

    // Parse the timestamp string into a Date object
    const date = new Date(timestamp);

    // Get the components of the date
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date
    const formattedDate = `${month} ${day}, ${year}`;

    // Get the components of the time
    let hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert hours to 12-hour format and determine am/pm
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format minutes to have leading zero if necessary
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    // Format the time
    const formattedTime = `${hours}:${formattedMinutes}${ampm}`;

    return { date: formattedDate, time: formattedTime };
  }
  return (
    <div>
      <div class="row">
        <div class="col-lg-12">
          <div class="custom_table_wrapper">
            <div class="custom_table_heading">
              <h4>Transcripts </h4>
              <div class="expendable_search property_select">
                <select id="sort-conversation">
                  <option>Sort by</option>
                  <option>Successful</option>
                  <option>Unsuccessful</option>
                </select>
              </div>
            </div>
            <div class="custom_table_design table-responsive">
              <table class="table conversation-table">
                <thead>
                  <tr>
                    <th scope="col">DATE</th>
                    <th scope="col">TIME</th>
                    <th scope="col">SUBJECT</th>
                    <th scope="col">STATUS</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody class="transcript-data-table empty-table-conversation text-white">
                  {conversationData?.map((convers, index) => {
                    const timestamp = convers?.conversation_start_time;
                    const formattedDateTime = formatDateAndTime(timestamp);
                    console.log(convers?.subject,'convers?.subject')
                    return (
                      <>
                        <tr>
                          <td>{formattedDateTime.date}</td>
                          <td>{formattedDateTime.time}</td>
                          <td>{convers?.subject!==undefined?convers?.subject:<span className="text-danger">Empty</span>}</td>
                          <td>
                            {convers?.success_rating === "NEUTRAL" ? (
                              <span>{convers?.success_rating}</span>
                            ) : (
                              <>
                                {convers?.success_rating === "UNSUCCESSFUL" ? (
                                  <span className="text-danger">
                                    {convers?.success_rating}
                                  </span>
                                ) : (
                                  <>
                                    {convers?.success_rating ===
                                    "SUCCESSFUL" ? (
                                      <span className="text-success">
                                        {convers?.success_rating}
                                      </span>
                                    ) : (
                                      <span className="text-danger">Empty</span>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </td>
                          <td>
                            <i
                              class="bi bi-arrow-up-right"
                              onClick={() => {
                                handleModelOpen(conversationModelOpen, convers);
                              }}
                            ></i>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ConverSationtranscriptModel
        handleClose={handleModelClose}
        show={model?.conversationModel}
        prntData={model?.conversationDataSend}
      />
    </div>
  );
};

export default TranscriptsTable;
