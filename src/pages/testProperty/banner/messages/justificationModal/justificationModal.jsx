import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import "./justificationModal.css"; // Import the CSS file

const JustificationModal = ({ show, handleClose, propertyName, justification }) => {
  const logo = "https://hostbuddylb.com/logo/logoNoText.png";
  const closeFeedBackModel=()=>{
    handleClose("addPropertyClose");
  }
  return (
    <Modal show={show} size="lg" onHide={() => closeFeedBackModel()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Hey HostBuddy, where did this response come from?</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="justification-modal">
          <div className="justification-block">
            <div className="justification-content" style={{ display:'flex', alignItems:'center' }}>
              <img src={logo} alt="Logo" className="justification-logo" />
              <p className="text-white justification-text">{justification}</p>
            </div>
          </div>
          <hr/>
          <p className="text-center" style={{marginTop:"30px", marginBottom:"30px", fontSize:"16px", color:"#999"}}>HostBuddy's responses are based on the information in its knowledge base for this property. If something is missing or incorrect, you can <Link to={`/edit-property/${propertyName}`}>manage the knowledge base or add to the property profile</Link>.</p>
          <p className="text-center" style={{marginTop:"30px", marginBottom:"30px", fontSize:"16px", color:"#999"}}>You can also adjust your <Link to='/inbox/preferences'>conversation preferences</Link> to change HostBuddy's behavior.</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JustificationModal;
