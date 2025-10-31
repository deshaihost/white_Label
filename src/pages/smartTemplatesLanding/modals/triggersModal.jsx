import React from "react";
import { Modal } from "react-bootstrap";
import "./templateLandingModals.css";

const TriggersModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="smt-landing-modal-content">
        <Modal.Header closeButton>
          <span className="bold-text">Smart Template Timing Events</span>
        </Modal.Header>
        <Modal.Body>
          <p>These are all of the events you can use to trigger sending of a message. We want this to be as robust as possible, and we encourage our users to reach out to us if they have any specific timing they would like to see added.</p>
          <hr />
          <div className="condition-modal-list">
            <p>Send Once
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Send immediately</li>
                <li style={{listStyleType:'disc', color:'white'}}>Schedule for a specific date and time</li>
                <li style={{listStyleType:'disc', color:'white'}}>One-time message to selected guests</li>
              </ul>
            </p>
            <p>During reservation
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Days into reservation</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>Before reservation
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Days before reservation</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>After reservation
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Days after reservation</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>Before stay ends
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Days before stay ends</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>After guest books
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Hours and minutes after guest books</li>
              </ul>
            </p>
            <p>After guest cancels
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Hours and minutes after guest cancels</li>
              </ul>
            </p>
            <p>Daily
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>Weekly
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Day of week</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>Monthly
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Day of month</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>Yearly
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Day of year</li>
                <li style={{listStyleType:'disc', color:'white'}}>Time of day</li>
              </ul>
            </p>
            <p>After pre-stay cleaning is complete
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>Hours and minutes after cleaning is complete</li>
                <li style={{listStyleType:'disc', color:'white'}}>This requires a cleaning management software integration. Currently, we support integrating with Turno.</li>
              </ul>
            </p>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  );
};

export default TriggersModal;
