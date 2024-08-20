import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";


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
            <div className="justification-block" style={{ display:'flex', alignItems:'center' }}>
              <img src={logo} alt="Logo" style={{ marginRight:'30px', height:'50px' }} />
              <p className="text-white" style={{ marginTop:'30px', marginBottom:'30px', fontSize:'18px', textAlign:'left' }}>{justification}</p>
            </div>
          </div>
          <hr/>
          <p className="text-center" style={{marginTop:"30px", marginBottom:"30px", fontSize:"16px", color:"#999"}}>HostBuddy's responses are based on the information in its knowledge base for this property. If something is missing or incorrect, you can <Link to={`/edit-property/${propertyName}`}>manage the knowledge base or add to the property profile</Link>.</p>
          <p className="text-center" style={{marginTop:"30px", marginBottom:"30px", fontSize:"16px", color:"#999"}}>You can also adjust your <Link to='/setting/conversation-preferences'>conversation preferences</Link> to change HostBuddy's behavior.</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default JustificationModal;
