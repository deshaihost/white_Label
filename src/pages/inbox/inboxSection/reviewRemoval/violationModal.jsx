import React from "react";
import Modal from "react-bootstrap/Modal";


const ViolationModal = ({ title, bodyTopText, bodyMainText, show, handleClose }) => {
  return (
    <Modal show={show} size="xl" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">{title}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="upsell-message-modal text-center">
          {bodyTopText ? (
            <>
              <p className="text-center">{bodyTopText}</p>
              <hr style={{ borderTopWidth: '2px', borderTopColor: 'blue', borderTopStyle: 'solid' }} />
            </>
          ) : null}
          {bodyMainText.split('\n').map((line, index) => (
            <p key={index} style={{ textAlign: 'left', textJustify: 'inter-word' }}>
              {line}
            </p>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ViolationModal;
