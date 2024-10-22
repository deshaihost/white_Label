import React from "react";
import { Modal } from "react-bootstrap";
import "./templateLandingModals.css";

const ConditionsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <div className="smt-landing-modal-content">
        <Modal.Header closeButton>
          <span className="bold-text">Smart Template Conditions</span>
        </Modal.Header>
        <Modal.Body>
          <p>These are all of the conditions you can use to target guests. We want this to be as robust as possible, and we encourage our users to reach out to us if they have any specific conditions they would like to see added.</p>
          <hr />
          <div className="condition-modal-list">
            <p>Reservation status is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>inquiry, current, future, or past</li>
              </ul>
            </p>
            <p>Weekday is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[choose one or more days of the week]</li>
              </ul>
            </p>
            <p>Time of day is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>From (start time)</li>
                <li style={{listStyleType:'disc', color:'white'}}>To (end time)</li>
              </ul>
            </p>
            <p>Reservation duration is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of days]</li>
              </ul>
            </p>
            <p>Guest count is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of guests]</li>
              </ul>
            </p>
            <p>Pet count is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of pets]</li>
              </ul>
            </p>
            <p>Child count is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of children]</li>
              </ul>
            </p>
            <p>Infant count is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of infants]</li>
              </ul>
            </p>
            <p>Check-in day is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of days from now]</li>
              </ul>
            </p>
            <p>Check-out day is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>[specify min and/or max number of days from now]</li>
              </ul>
            </p>
            <p>Reservation dates contain...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>a specific day of the year</li>
              </ul>
            </p>
            <p>Guest sentiment is...
              <ul>
                <li style={{listStyleType:'disc', color:'white'}}>positive, neutral, and/or negative</li>
              </ul>
            </p>
          </div>


        </Modal.Body>
      </div>
    </Modal>
  );
};

export default ConditionsModal;