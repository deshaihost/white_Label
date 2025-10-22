import React from 'react';
import { Modal } from 'react-bootstrap';
import '../../pages/account/account.css';

const ConfirmationModal = ({ 
  show, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = "Continue",
  cancelText = "Cancel",
  isDanger = false,
  loading = false,
  icon = null
}) => {
  return (
    <Modal 
      show={show} 
      onHide={onClose}
      centered
      className={isDanger ? "confirmation-modal danger-modal" : "confirmation-modal"}
    >
      <Modal.Body className="confirmation-modal-body">
        <div className="confirmation-modal-header">
          <h3 className="confirmation-modal-title">
            {icon}
            {title}
          </h3>
        </div>
        
        <p className="confirmation-modal-message">{message}</p>

        <div className="confirmation-modal-footer">
          <button 
            className="secondary-button"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className={isDanger ? "danger-button" : "bg_theme_btn"}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;
