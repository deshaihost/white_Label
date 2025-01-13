import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "./lockPropertiesModal.css";
import axios from "axios";
import ToastHandle from "../../../helper/ToastMessage";
import { BoxLoader } from "../../../helper/Loader";
import { Link } from "react-router-dom";

function LockPropertiesModal({ propertiesToLock, modalShow, handleClose, setPropertiesChanged }) {
  const store = useSelector((state) => state);

  const [lockPropertiesLoading, setLockPropertiesLoading] = useState(false);

  const callLockPropertiesApi = async (propertiesArray, reduceBilling = false) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { property_names: propertiesArray };
    setLockPropertiesLoading(true);
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: (status) => status >= 200 && status < 500
      };
      const response = await axios.post(
        `${baseUrl}/lock_properties${reduceBilling ? '?reduce_billing=true' : ''}`,
        dataToSend,
        config
      );
      if (response.status === 200) {
        ToastHandle("Property locked successfully.", "success");
        setPropertiesChanged(true);
      } else {
        ToastHandle(response?.data?.error || "Failed to lock property.", "danger");
      }
    } catch (error) {
      ToastHandle("An error occurred.", "danger");
    } finally {
      setLockPropertiesLoading(false);
    }
  };

  const handleLockClick = async () => {
    await callLockPropertiesApi(propertiesToLock);
    handleClose();
  };

  const handleLockAndReduce = async () => {
    await callLockPropertiesApi(propertiesToLock, true);
    handleClose();
  };

  return (
    <Modal show={modalShow} size="md" onHide={() => handleClose()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="lock-properties-modal">
          <h3 className="text-white text-center mb-4 fw-bold fs-4">Lock Property</h3>
          <hr />
          <div className="text-white text-center">
            <p>Locking a property stops all messaging and data sync.</p>
            <p style={{marginTop:'15px'}}>If you select "Lock and Reduce Subscription", your subscription's property count will be reduced by {propertiesToLock.length} so you won't be billed for {propertiesToLock.length > 1 ? "these properties" : "this property"} next cycle.</p>
            <p style={{marginTop:'15px'}}>Proceed?</p>
          </div>
          {!lockPropertiesLoading ? (
            <div className="button-group">
              <button className="text-button" onClick={() => handleLockClick()}>Lock Property</button>
              <button className="text-button" onClick={() => handleLockAndReduce()}>Lock and Reduce Subscription</button>
            </div>
          ) : (
            <div className="text-center mt-4">
              <span className="spinner-border spinner-border-sm"></span>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LockPropertiesModal;
