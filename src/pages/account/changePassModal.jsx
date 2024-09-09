import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import ToastHandle from "../../helper/ToastMessage";
import axios from 'axios';
import Loader from "../../helper/Loader";

const ChangePassModal = ({ show, handleClose }) => {
  
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changePasswordApiLoading, setChangePasswordApiLoading] = useState(false);

  const callChangePasswordApi = async (oldPassword, newPassword) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setChangePasswordApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { old_password:oldPassword, new_password:newPassword };

      const response = await axios.post( `${baseUrl}/change_password`, body_data, config );

      if (response.status === 200) {
        ToastHandle("Password changed successfully", "success");
        handleClose();
      }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    } finally {
      setChangePasswordApiLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      ToastHandle("Password must be at least 8 characters", "danger");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      ToastHandle("New passwords do not match", "danger");
      return;
    }
    await callChangePasswordApi(oldPassword, newPassword);
  };

  return (
    <Modal show={show} onHide={handleClose} size="md" aria-labelledby="contained-modal-title-vcenter" centered className="contact-modal">
      <Modal.Header closeButton>
        <div>
          <Modal.Title id="contained-modal-title-vcenter">Change Password</Modal.Title>
          <p style={{ marginTop: '15px', fontSize: '16px', color: 'white', textAlign: 'center' }}>Please enter your current password and the new password you would like to set.</p>
        </div>
      </Modal.Header>
      <Modal.Body>

        <Form onSubmit={onSubmit}>

          <div className="input-group">
            <Form.Control type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} maxLength="100" required />
            <Form.Label>Old Password</Form.Label>
          </div>

          <div className="my-3">
            <div className="input-group">
              <Form.Control type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} maxLength="100" required />
              <Form.Label>New Password</Form.Label>
            </div>
          </div>

          <div className="input-group">
            <Form.Control type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} maxLength="100" required />
            <Form.Label>Confirm New Password</Form.Label>
          </div>

          <div className="text-center">
            <Button type="submit" className="bg_theme_btn" style={{ marginTop: '20px' }} disabled={changePasswordApiLoading}>{!changePasswordApiLoading ? "Change Password" : <Loader />}</Button>
          </div>

        </Form>

      </Modal.Body>
    </Modal>
  );
};

export default ChangePassModal;