import React from "react";
import Modal from "react-bootstrap/Modal";

const MessgFeedBckModel = ({ show, handleClose }) => {
  return (
    <Modal
      show={show}
      size="lg"
      onHide={() => handleClose("addPropertyClose")}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">Your Plan</h5>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default MessgFeedBckModel;
