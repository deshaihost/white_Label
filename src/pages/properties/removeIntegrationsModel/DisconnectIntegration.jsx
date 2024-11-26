import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { BoxLoader } from "../../../helper/Loader";
import ToastHandle from "../../../helper/ToastMessage";
import axios from "axios";

const DisconnectIntegration = ({ handleNoPlanClose, showNoPlan }) => {
  const [disconnectLoading, setDisconnectLoading] = useState(false);

  const DisconnectPMS = async () => {
    setDisconnectLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
  
    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
      };
      const response = await axios.delete(`${baseUrl}/remove_integration`, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        handleNoPlanClose("disconnectIntegrationsClose")
      } else {
        ToastHandle("Something went wrong", "danger");
      }
    } catch (error) {
      console.log(error);
      ToastHandle(error?.data?.error, "danger");
    } finally {
      setDisconnectLoading(false);
    }
  };
  
  return (
    <div>
      <Modal
        show={showNoPlan}
        size="md"
        onHide={() => {
          if (!disconnectLoading) { handleNoPlanClose("disconnectIntegrationsClose"); }
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="form-design">
          <div className="row ">
            <div className="col-lg-12">
              <h3 className="text-white text-center mb-5 fs-4 fw-bold">
                Disconnect Integration
              </h3>
              <hr />
            </div>
          </div>
          {disconnectLoading ? (
            <>
              <div className="d-flex justify-content-center">
                <p style={{ color: 'white', textAlign: 'center', marginBottom: '50px' }}> Disconnecting. Please wait, this can take a few minutes... </p>
              </div>
              <BoxLoader />
            </>
            ) : (
              <>
                <p style={{ color: 'white', textAlign: 'center', marginBottom: '50px' }}> Disconnect this PMS from your Hostbuddy account? </p>
                <div className="d-flex justify-content-center">
                  <button className="btn btn-primary btn-sm me-3" onClick={() => handleNoPlanClose("disconnectIntegrationsClose")}>
                    No
                  </button>
                  <button className="btn btn-primary btn-sm" style={{ backgroundColor: 'rgb(160, 0, 0)' }} onClick={DisconnectPMS}>
                    Yes
                  </button>
                </div>
              </>
            )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DisconnectIntegration;
