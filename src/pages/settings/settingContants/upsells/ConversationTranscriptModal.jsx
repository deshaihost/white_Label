import React from "react";
import { Modal } from "react-bootstrap";
import {useState, useEffect} from "react";
import { BoxLoader } from "../../../../helper/Loader";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";

const ConversationTranscriptModal = ({ handleClose, show, modalData }) => {

  const { conversationId, propertyName } = modalData;

  const [conversationTranscriptLoading, setConversationTranscriptLoading] = useState(false);
  const [conversationApiData, setConversationApiData] = useState(null);
  const [conversationNotFound, setConversationNotFound] = useState(false);

  // Call the API to get the conversation transcript
  const callGetConversationsAPI = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setConversationTranscriptLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/properties/${propertyName}/get_conversation?conversation_id=${conversationId}`, config);

      if (response.status === 200) {
        setConversationNotFound(false);
        setConversationTranscriptLoading(false);
        setConversationApiData(response?.data?.conversation);
      }
      else {
        ToastHandle(response?.data?.error, "danger");
        setConversationNotFound(true);
      }
    } catch (error) {
      ToastHandle("Unable to load this conversation.", "danger");
      setConversationNotFound(true);
    } finally {
      setConversationTranscriptLoading(false);
    }
  }

  // When the modal is opened, call the API to get the conversation transcript
  useEffect(() => {
    if (modalData && Object.keys(modalData).length > 0) {
      callGetConversationsAPI();
    }
  }, [modalData]);


  let { subject, channel, conversation_start_time } = conversationApiData || {}; // subject is guest name for integration conversations
  const messageData = conversationApiData?.["messages"]?.slice().reverse() || null; // Reverse the order to show the most recent message at the top of the modal
  if (channel === "hostbuddy") { channel = "HostBuddy Chat Link"; }

  function formatDateTime(dateTimeString, showYear=true) {
    const date = new Date(dateTimeString);
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 hour should be 12
    minutes = minutes < 10 ? "0" + minutes : minutes;

    if (showYear) { return `${month} ${day}, ${year} ${hours}:${minutes}${ampm}`; }
    else { return `${month} ${day}, ${hours}:${minutes}${ampm}`; }
  }

  return (
    <div>
      <Modal show={show} size="lg" onHide={() => handleClose("conversationModelClose")} aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <h5 className="modal-title">Conversation transcript</h5>
        </Modal.Header>
        <Modal.Body>
          {!conversationTranscriptLoading ? (
            (messageData && !conversationNotFound) ? (
              <div className="row text-white">
                <div className="col-12">
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
                  {propertyName && <span style={{ margin: '0 8px' }}>{propertyName}</span>}
                  {(propertyName && subject) && <span style={{ margin: '0 8px' }}>-</span>}
                  {subject && <span style={{ margin: '0 8px' }}>{subject}</span>}
              </div>
                  <div className="d-flex justify-content-between">
                    <div className="flex-grow-1 text-start" style={{ margin: '0 10px' }}>
                        <div>
                            <span>Start Time</span>:{" "}
                            <span style={{ color: 'rgb(140, 140, 140)' }}>{formatDateTime(conversation_start_time)}</span>
                        </div>
                    </div>
                    <div className="flex-grow-1 text-end" style={{ margin: '0 10px' }}>
                        <div>
                            <span>Source</span>: <span style={{ color: 'rgb(140, 140, 140)' }}>{channel}</span>
                        </div>
                    </div>
                </div>

                  <hr className="headerDivider" />

                  <div className="row mt-5">
                    {messageData?.map((messg) => {
                      return (
                        <>
                          <div className="col-3">
                            <div>{messg?.sender ? messg.sender.toUpperCase() : ''}</div>
                            <div style={{ whiteSpace: 'pre-line', color: 'rgb(140, 140, 140)' }}>{formatDateTime(messg?.time, false)}</div>
                          </div>
                          <div className="col-9">
                            <div style={{ whiteSpace: 'pre-wrap' }}>{messg?.text}</div>
                          </div>
                          <hr className="messageDivider" />
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center" style={{ color: 'white' }}>This conversation could not be retrieved.</div>
            )
          ) : (
            <BoxLoader />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConversationTranscriptModal;
