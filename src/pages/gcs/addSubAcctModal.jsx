import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./addSubAcctModal.css";
import Loader from "../../helper/Loader";
import { callAddSubAccountApi } from "./gcs_functionality";
import ToastHandle from "../../helper/ToastMessage";

const AddSubAcctModal = ({ show, handleClose, onAccountAdded }) => {
  const [accountName, setAccountName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accountName.trim()) {
      ToastHandle("Please enter an account name", "warning");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await callAddSubAccountApi(accountName, setIsLoading);
      
      if (response && response.subaccount_id) {
        ToastHandle("Account created successfully", "success");
        setAccountName("");
        onAccountAdded(); // Trigger refresh in parent component
        handleClose();
      }
    } catch (error) {
      console.error("Error creating subaccount:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    setAccountName("");
    handleClose();
  };

  return (
    <Modal show={show} size="lg" onHide={handleCancel} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <h5 className="modal-title">Add A PM Account</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="simple-text-modal text-center">
          <form onSubmit={handleSubmit}>
            <input className="form-control" type="text" placeholder="Enter a name for the account" value={accountName} onChange={(e) => setAccountName(e.target.value)} disabled={isLoading}/>
            {isLoading ? (
              <div className="mt-3">
                <Loader />
              </div>
            ) : (
              <button type="submit" className="btn btn-primary mt-3">
                Add Account
              </button>
            )}
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddSubAcctModal;
