import React, {  useState } from "react";
import ConverSationtranscriptModel from "./transcriptsModel/ConverSationtranscriptModel";
const TranscriptsTable = ({ conversationData, propertyConversationId, propertyName }) => {
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
    // Parse the timestamp string into a Date object (assuming it's in UTC format)
    const apiDate = new Date(timestamp);

    /* MBoddie - removed since time zone handling / conversion is now done in the backend
    // Get the time zone offset in milliseconds
    const timeZoneOffsetMs = new Date().getTimezoneOffset() * 60000;

    // Convert the UTC timestamp to the local timestamp
    const localTimestamp = apiDate.getTime() - timeZoneOffsetMs;

    // Create a new Date object for the local timestamp
    const localDate = new Date(localTimestamp);
    */
    const localDate = apiDate;

    // Get the components of the date
    const month = localDate.getMonth() + 1; // Months are zero-indexed, so add 1
    const day = localDate.getDate();
    const year = localDate.getFullYear();

    // Get the components of the time
    let hours = localDate.getHours();
    const minutes = localDate.getMinutes();
    const seconds = localDate.getSeconds();

    // Convert hours to 12-hour format and determine am/pm
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Format minutes and seconds to have leading zero if necessary
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    // Format the date and time in the desired format
    const formattedDate = `${month}/${day}/${year}`;
    const formattedTime = `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

    return { date: formattedDate, time: formattedTime };
  }

  // useEffect(() => {
  //   if (propertyConversationId !== "") {
  //     let conversationDataFilter = conversationData?.filter(
  //       (item) => item?.conversation_id === propertyConversationId
  //     );
  //     handleModelOpen(conversationModelOpen, conversationDataFilter?.[0]);
  //   }
  // }, [propertyConversationId]);

  return (
    <div>
      <div class="row">
        <div class="col-lg-12">
          <div class="custom_table_wrapper">
            <div class="custom_table_heading">
              <h4>Transcripts </h4>
              <div class="expendable_search property_select">
                {/*
                <select id="sort-conversation">
                  <option>Sort by</option>
                  <option>Successful</option>
                  <option>Unsuccessful</option>
                </select>
                */}
              </div>
            </div>
            <div class="custom_table_design table-responsive">
              <table class="table conversation-table">
                <thead>
                  <tr>
                    <th scope="col">DATE</th>
                    <th scope="col">TIME</th>
                    <th scope="col">SUBJECT</th>
                    {/* <th scope="col">STATUS</th> */}
                    <th scope="col"></th> {/* Empty column to correct spacing, since STATUS was commented out */}
                    <th scope="col">VIEW</th>
                  </tr>
                </thead>
                <tbody class="transcript-data-table empty-table-conversation text-white">
                  {conversationData?.map((convers, index) => {
                    convers.property_name = propertyName;
                    //const timestamp = convers?.conversation_start_time;
                    const timestamp = convers?.messages[convers?.messages.length - 1]?.time; // Use the timestamp of the last message in the conversation, instead of convo start time
                    const formattedDateTime = formatDateAndTime(timestamp);
                    const firstConversationId = convers?.conversation_id;
                    return (
                      <>
                        {firstConversationId === propertyConversationId
                          ? true
                          : false}
                        <tr>
                          <td>{formattedDateTime.date}</td>
                          <td>{formattedDateTime.time}</td>
                          <td>
                            {convers?.subject !== undefined ? (
                              convers?.subject
                            ) : (
                              <span style={{ color: 'rgb(120,120,120)' }}>TBD</span>
                            )}
                          </td>
                          <td>
                            {/* Remove "STATUS" column & logic for now 
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
                                      <span className="text-danger">TBD</span>
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            */}
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
