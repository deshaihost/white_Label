import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "./unlockPropertiesModal.css";
import axios from "axios";
import ToastHandle from "../../../helper/ToastMessage";
import { BoxLoader } from "../../../helper/Loader";
import { Link } from "react-router-dom";

function UnlockPropertiesModal({ propertiesToUnlock, has_active_subscription, remaining_unlocks_allowed, remaining_locked_properties, modalShow, handleClose, setPropertiesChanged }) {
  const store = useSelector((state) => state);

  const [unlockPropertiesLoading, setUnlockPropertiesLoading] = useState(false);
  const [addPropertiesToSubscriptionLoading, setAddPropertiesToSubscriptionLoading] = useState(false);

  // Get information about the status of the subscription
  const subscription_data = store?.getUserDataReducer?.getUserData?.data?.user?.subscription;
  const paymentGoodUntilDate = new Date(subscription_data?.payment_good_until);

  const callUnlockPropertiesApi = async (propertiesToUnlock) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { property_names: propertiesToUnlock };
    setUnlockPropertiesLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/unlock_properties`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setPropertiesChanged(true); // so that the properties page re-renders
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle("An error occurred.", "danger");
    } finally {
      setUnlockPropertiesLoading(false);
    }
  }

  const callAddPropertiesToSubscriptionApi = async (num_properties) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { num_properties: num_properties };
    setAddPropertiesToSubscriptionLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/add_properties_to_subscription`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setPropertiesChanged(true); // so that the properties page re-renders
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle("An error occurred.", "danger");
    } finally {
      setAddPropertiesToSubscriptionLoading(false);
    }
  }

  const handleUnlockClick = async () => {
    await callUnlockPropertiesApi(propertiesToUnlock);
    handleClose();
  }

  const handleAddToSubscriptionClick = async () => {
    if (!addPropertiesToSubscriptionLoading) {
      const userConfirmed = window.confirm("Add one more property to your subscription? You will be billed for this at the beginning of your next billing cycle.");
      
      if (userConfirmed) {
        await callAddPropertiesToSubscriptionApi(1);
        await callUnlockPropertiesApi(propertiesToUnlock);
        handleClose();
      }
    }
  }


  return (
    <Modal show={modalShow} size="md" onHide={() => handleClose()} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="unlock-properties-modal">
          <h3 className="text-white text-center mb-4 fw-bold fs-4">Unlock Properties</h3>
          <hr />
          <div className="unlock-properties-text">
            <p>Locked properties allow setup and testing only. You'll need to unlock a property to allow HostBuddy to respond to its guests.</p>
            {remaining_unlocks_allowed > 0 && remaining_unlocks_allowed < remaining_locked_properties && (
              <p>Your current subscription allows you to unlock {remaining_unlocks_allowed} more {remaining_unlocks_allowed == 1 ? "property" : "properties"}.</p>
            )}
            {remaining_unlocks_allowed <= 0 ? (
              has_active_subscription ? ( // in an ideal world we detect if the user is on a Stripe free trial - and show them the above p tag if they are, and the below if they aren't
                <>
                  <p>Your current subscription does not allow you to unlock any more properties. Click <a href="#" onClick={() => handleAddToSubscriptionClick()}>here</a> to add a property to your subscription and unlock this listing.</p> {/* This option lets users add properties during a Stripe free trial without ending the trial */}
                  <p>Alternatively, you can add properties to your subscription from the <Link to="/setting/subscription">Subscription page</Link> to unlock more properties.</p> {/* If the user changes their property count in the subscription page, it will charge immediately for all the properties, even if they are in a free trial */}
                </>
              ) : (
                <p>You've reached the limit of properties you can unlock during the trial. Please subscribe to unlock more properties.</p>
              )
            ) : remaining_unlocks_allowed < propertiesToUnlock.length ? ( // user selected more properties to unlock than they're allowed. *this should never happen* since the "unlock all" button should not appear if the user can't unlock all properties.
              <p>Your subscription only allows you to unlock {remaining_unlocks_allowed} more properties. Upgrade your subscription in the <Link to="/setting/subscription">Subscription page</Link> to unlock them all, or return to the properties page to unlock them individually.</p>
            ) : (
              <p>Would you like to unlock {propertiesToUnlock.length > 1 ? "these properties" : "this property"}?</p>
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

export default UnlockPropertiesModal;
