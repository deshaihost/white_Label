import React from "react";
import Modal from "react-bootstrap/Modal";
import { BoxLoader } from "../../../helper/Loader";
import { useWhiteLabelCss } from "../../../helper/WhiteLabelCssContext";

function ReauthenticatePMSModal({ showModal, handleClose, calryLink, platformName, loading }) {
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();
  
  const goToCalryLink = () => {
    if (calryLink) {
      window.open(calryLink, "_blank");
      handleClose();
    }
  };

  const pmsNameForUrl = platformName ? platformName.toLowerCase() : "";
  const capitalizedPlatformName = platformName ? platformName.charAt(0).toUpperCase() + platformName.slice(1) : "";

  return (
    <Modal show={showModal} size="md" onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered className="reauthenticate-pms-modal">
      <Modal.Body 
        style={{
          backgroundColor: !cssLoading ? (cssConfig?.css_data?.background?.secondary || '#17191f') : '#17191f'
        }}
      >
        <h3 className="text-white text-center mb-4 fw-bold fs-4">Reconnect Your PMS</h3>
        <hr />
        {!loading ? (
          <div className="text-white text-center">
            <p>
              Click below to securely enter your account information and complete the re-authentication.
            </p>
            <button className="btn btn-primary px-5 my-4 rounded-pill" onClick={goToCalryLink}>
              Reconnect
            </button>
            {platformName && (
              <p style={{fontSize: '0.9em'}}>
                For specific instructions on how to complete your PMS integration with {capitalizedPlatformName}, check out <a style={{fontSize: 'inherit'}} href={`https://userguide.hostbuddy.ai/pms-integration-guides/${pmsNameForUrl}`} target="_blank" rel="noopener noreferrer">this page</a>.
              </p>
            )}
          </div>
        ) : (
          <BoxLoader />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ReauthenticatePMSModal;
