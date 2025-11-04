import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "./addSubAcctModal.css";
import Loader from "../../helper/Loader";
import { callAddSubAccountApi } from "./gcs_functionality";
import ToastHandle from "../../helper/ToastMessage";

const AddSubAcctModal = ({ show, handleClose, onAccountAdded }) => {
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!accountName.trim()) {
      ToastHandle("Please enter an account name", "warning");
      return;
    }
    
    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      ToastHandle("Please enter a valid email address", "warning");
      return;
    }
    
    // If email is provided, password must also be provided
    if (email && !password) {
      ToastHandle("Password is required when email is provided", "warning");
      return;
    }
    
    // Validate password match if password is provided
    if (password && password !== confirmPassword) {
      ToastHandle("Passwords do not match", "warning");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await callAddSubAccountApi({
        accountName,
        email: email || undefined,
        password: password || undefined,
        confirmPassword: confirmPassword || undefined
      }, setIsLoading);
      
      if (response && response.subaccount_id) {
        ToastHandle("Account created successfully", "success");
        setAccountName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
    setEmail("");
    setPassword("");
    setConfirmPassword("");
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
            <input 
              className="form-control" 
              type="text" 
              placeholder="Enter a name for the account" 
              value={accountName} 
              onChange={(e) => setAccountName(e.target.value)} 
              disabled={isLoading}
            />
            
            <div className="mt-3 mb-2 text-muted" style={{ fontSize: '0.9rem' }}>
              <em>If provided, these credentials will allow the user to log in to this account directly</em>
            </div>
            
            <input 
              className="form-control mt-2" 
              type="email" 
              placeholder="Email (optional)" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              disabled={isLoading}
            />
            
            <input 
              className="form-control mt-2" 
              type="password" 
              placeholder="Password (optional)" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              disabled={isLoading}
            />
            
            <input 
              className="form-control mt-2" 
              type="password" 
              placeholder="Confirm password (optional)" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              disabled={isLoading}
            />
            
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