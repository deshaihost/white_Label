import React from "react";
import { Modal } from "react-bootstrap";

const ConverSationtranscriptModel = ({ handleClose, show, prntData }) => {
  const { subject, success_rating, channel, conversation_start_time } = prntData
    ? prntData
    : [];
  const messageData = prntData["messages"];

  return (
    <div>
      <Modal
        show={show}
        size="lg"
        onHide={() => handleClose("conversationModelClose")}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title">Conversation transcript</h5>
        </Modal.Header>
        <Modal.Body>
          <div className="row text-white">
            <div className="col-12">
              <div className="row ">
                <div className="col-8">
                  <div>
                    <span>Subject</span>:{" "}
                    <span>
                      {subject !== undefined ? (
                        subject
                      ) : (
                        <span className="text-danger">TBD</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span>Start Time</span>:{" "}
                    <span>{conversation_start_time}</span>
                  </div>
                </div>
                <div className="col-4">
                  <div>
                    <span>Rating</span>:{" "}
                    <span className={
                      success_rating === "SUCCESSFUL" ? "text-success" :
                      success_rating === "UNSUCCESSFUL" ? "text-danger" :
                      "text-white"
                    }>
                      {success_rating !== undefined ? (
                        success_rating
                      ) : (
                        <span className="text-danger">TBD</span>
                      )}
                    </span>
                  </div>
                  <div>
                    <span>Channel</span>: <span>{channel}</span>
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
                        <div>{messg?.time}</div>
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
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ConverSationtranscriptModel;
