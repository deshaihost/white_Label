import React from "react";
import { Modal } from "react-bootstrap";
import "./templateLandingModals.css";

const AiExamplesModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="smt-landing-modal-content">
        <Modal.Header closeButton>
        <span className="bold-text">AI Personalization with Smart Templates</span>
        </Modal.Header>
        <Modal.Body>
          <p className="p-header" style={{marginTop:'0'}}>Before AI Personalization</p>
          <p>Hey there! I hope you're doing well. I wanted to reach out and see if you have any questions about your upcoming stay. I'm here to help with anything you need. Just let me know!</p>
          <p className="p-header">After AI Personalization</p>
          <p>Hi there! I noticed that you have a reservation coming up soon. I'm here to help with anything you need. Do you have any questions about your stay?</p>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default AiExamplesModal;