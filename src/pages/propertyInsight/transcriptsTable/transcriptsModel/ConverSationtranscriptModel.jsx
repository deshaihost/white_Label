import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import JustificationModal from "../../../testProperty/banner/messages/justificationModal/justificationModal";

const ConverSationtranscriptModel = ({ handleClose, show, prntData }) => {
  let { subject, success_rating, channel, conversation_start_time, property_name } = prntData
    ? prntData
    : [];
  if (channel === "hostbuddy") { channel = "HostBuddy Chat Link"; }
  const messageData = prntData?.["messages"]?.slice().reverse() || null; // will be null if the conversation could not be found. This happens for example if we try to click "view" for an action item for a property that has been deleted.

  const [showJustificationModal, setShowJustificationModal] = useState(false);
  const [justificationText, setJustificationText] = useState("");

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

  const handleJustificationClick = (e, justificationText) => {
    e.preventDefault();
    setShowJustificationModal(true);
    setJustificationText(justificationText);
  };

  return (
    <div>
      <Modal show={show} size="lg" onHide={() => handleClose("conversationModelClose")} aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <h5 className="modal-title">Conversation transcript</h5>
        </Modal.Header>
        <Modal.Body>
          {messageData ? (
            <div className="row text-white">
              <div className="col-12">
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
                {property_name && <span style={{ margin: '0 8px' }}>{property_name}</span>}
                {(property_name && subject) && <span style={{ margin: '0 8px' }}>-</span>}
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
                          {messg?.justification && (
                            <div style={{width:'100%', display:'flex', justifyContent:'center', alignItems:'center', marginTop:'10px'}}>
                              <a style={{display:'block', margin:'0 auto', marginBottom:'-10px', fontSize:'14px'}} onClick={(e) => handleJustificationClick(e, messg.justification)} href="#">Where did this come from?</a>
                            </div>
                          )}
                        </div>
                        <hr className="messageDivider" />
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center" style={{ color: 'white' }}>This conversation couldn't be found. The conversation or property may have been deleted.</div>
          )}
        </Modal.Body>
      </Modal>
      <JustificationModal show={showJustificationModal} handleClose={() => setShowJustificationModal(false)} propertyName={property_name} justification={justificationText}/>
    </div>
  );
};

export default ConverSationtranscriptModel;
