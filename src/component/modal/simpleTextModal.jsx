import React from "react";
import Modal from "react-bootstrap/Modal";
import "./simpleTextModal.css";


const SimpleTextModal = ({ headerText, bodyText, show, handleClose }) => {
  return (
    <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">{headerText}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="simple-text-modal text-center">
          {bodyText.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SimpleTextModal;
