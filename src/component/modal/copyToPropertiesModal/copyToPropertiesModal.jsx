import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./unlockPropertiesModal.css";
import axios from "axios";
import ToastHandle from "../../../helper/ToastMessage";
import { BoxLoader } from "../../../helper/Loader";
import { Link } from "react-router-dom";

function CopyToPropertiesModal({ property_names, subscription_active, remaining_unlocks_allowed, remaining_locked_properties, modalShow, handleClose, setPropertiesChanged }) {

  const [unlockPropertiesLoading, setUnlockPropertiesLoading] = useState(false);

  const callUnlockPropertiesApi = async (property_names) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { property_names: property_names };
    setUnlockPropertiesLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/unlock_properties`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setPropertiesChanged(true);
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle(error, "danger");
    } finally {
      setUnlockPropertiesLoading(false);
    }
  }

  const handleUnlockClick = async () => {
    await callUnlockPropertiesApi(property_names);
    handleClose();
  }


  return (
    <Modal show={modalShow} size="md" onHide={() => handleClose()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="copy-to-properties-modal">
          <h3 className="text-white text-center mb-4 fw-bold fs-4">Unlock Properties</h3>
          <hr />
          <div className="copy-to-properties-text">
            <p>Locked properties are for testing only. You'll need to unlock a property to allow HostBuddy to respond to its guests.</p>
            {remaining_unlocks_allowed > 0 && remaining_unlocks_allowed < remaining_locked_properties && (
              <p>Your current subscription allows you to unlock {remaining_unlocks_allowed} more {remaining_unlocks_allowed == 1 ? "property" : "properties"}.</p>
            )}
            {remaining_unlocks_allowed == 0 ? (
              subscription_active ? (
                <p>Your current subscription does not allow you to unlock any more properties. Upgrade your subscription in the <Link to="/setting/subscription">Subscription page</Link> to unlock more properties.</p>
              ) : (
                <p>You do not have an active subscription. Subscribe to unlock your properties.</p>
              )
            ) : remaining_unlocks_allowed < property_names.length ? (
              <p>Your subscription only allows you to unlock {remaining_unlocks_allowed} more properties. Upgrade your subscription in the <Link to="/setting/subscription">Subscription page</Link> to unlock them all, or return to the properties page to unlock them individually.</p>
            ) : (
              <p>Would you like to unlock {property_names.length > 1 ? "these properties" : "this property"}?</p>
            )}
          </div>
          {remaining_unlocks_allowed > 0 && (
            !unlockPropertiesLoading ? (
              <button className="btn btn-primary mt-4" onClick={() => handleUnlockClick()}>Unlock</button>
            ) : (
              <BoxLoader />
            )
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default CopyToPropertiesModal;
