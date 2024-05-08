import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

const BillingPortalModel = ({ handleClose, show }) => {
    const store = useSelector((state) => state);
    const billingPortalUrl =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.data?.billing_portal_url
    const goToBillingSubcripstionhndl=()=>{
        window.location.href = billingPortalUrl;
    }
  return (
    <Modal
      show={show}
      size="md"
      onHide={() => handleClose("billingPortalClose")}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <p className="text-white">
          Visit the billing portal to adjust the number of properties in your
          subscription
        </p>
        <button type="button" className="shadow-none border-0" onClick={goToBillingSubcripstionhndl}>
          billing portal
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default BillingPortalModel;
