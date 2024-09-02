import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './index.css';

const GenerateReportModal = ({ reviewId, callGenerateReportApi, showOverwriteWarning, showFiveStarWarning, show, closeModal }) => {
  const [explanation, setExplanation] = useState('');

  const handleSubmit = () => {
    if (!explanation || explanation.trim() === '') { return; }
    callGenerateReportApi(reviewId, explanation)
    handleClose();
  };

  const handleClose = () => {
    setExplanation('');
    closeModal();
  }

  return (
    <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Generate Review Removal Report</h5>
      </Modal.Header>
      <Modal.Body className="text-center">

        <div className='generate-report-modal'>
          <p style={{ textAlign:'center', 'color':'#FFF' }}>Explain why you think this review is in violation of policy, and HostBuddy will generate a report for you to send to the OTA.</p>
          <hr />
          <textarea type="text" rows={5} placeholder="Enter your explanation..." value={explanation} onChange={(e) => setExplanation(e.target.value)} style={{ width:'100%', textAlign:'left' }}/>
        </div>

        <hr style={{ borderTopWidth:'2px', borderTopColor:'rgb(200,200,255)', borderTopStyle:'solid', marginTop:"30px", marginBottom:"30px" }} />

        {showFiveStarWarning ? <p style={{ color:'orange', marginBottom:"20px", fontSize:"16px" }}>You are about to generate a removal report for a 5-star review.</p> : null}
        {showOverwriteWarning ? <p style={{ color:'orange', marginBottom:"20px", fontSize:"16px" }}>Warning: Generating a new report will overwrite the existing one.</p> : null}

        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateReportModal;