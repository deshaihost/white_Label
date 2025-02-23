import React from "react";
import Modal from "react-bootstrap/Modal";
import "./upsells.css";


const UpsellMessageModal = ({ headerText, bodyTopText, bodyMainText, bodyBottomText, show, handleClose, ai_personalization }) => {
  return (
    <Modal show={show} size="lg" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">{headerText}</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="upsell-message-modal text-center">
          {bodyTopText && (
            <>
              <p className="text-center">{bodyTopText}</p>
              <hr style={{ borderTopWidth: '2px', borderTopColor: 'blue', borderTopStyle: 'solid' }} />
            </>
          )}
          {bodyMainText.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          {bodyBottomText && (
            <>
              <hr style={{ borderTopWidth: '2px', borderTopColor: 'blue', borderTopStyle: 'solid' }} />
              <p style={{fontSize:"16px", color:"#AAA"}} className="text-center">{bodyBottomText}</p>
            </>
          )}
          {ai_personalization && (
            <>
              <hr style={{ borderTopWidth: '2px', borderTopColor: 'blue', borderTopStyle: 'solid' }} />
              <p style={{fontSize:"16px", color:"#AAA"}} className="text-center">AI Personalization is enabled, so this message may be slightly reworded before sending to personalize it to the guest.</p>
            </>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default UpsellMessageModal;
