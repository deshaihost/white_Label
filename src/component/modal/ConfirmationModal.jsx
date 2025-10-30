import React from 'react';
import { Modal } from 'react-bootstrap';
import '../../pages/account/account.css';
import { useWhiteLabelCss } from '../../helper/WhiteLabelCssContext';

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
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  
  return (
    <Modal 
      show={show} 
      onHide={onClose}
      centered
      className={isDanger ? "confirmation-modal danger-modal delete-account-modal" : "confirmation-modal account-confirmation-modal"}
    >
      <Modal.Body 
        className="confirmation-modal-body"
        style={{
          backgroundColor: !cssLoading ? (cssConfig?.css_data?.background?.secondary || '#17191f') : '#17191f'
        }}
      >
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
            style={{ 
              backgroundColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7',
              borderColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7'
            }}
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button 
            className={isDanger ? "danger-button" : "bg_theme_btn"}
            style={!isDanger ? { 
              backgroundColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7',
              borderColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7'
            } : {}}
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
