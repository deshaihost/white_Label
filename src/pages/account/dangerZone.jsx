import React, { useState } from 'react';
import './account.css';
import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import Loader from '../../helper/Loader';
import { is_gcs_subaccount_user } from '../gcs/gcs_functionality';
import { useNavigate } from "react-router-dom";
import ConfirmationModal from '../../component/modal/ConfirmationModal';

const DangerZone = () => {

  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const callDeleteAccountAPI = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setDeleteAccountLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.delete( `${baseUrl}/delete_user`, config );

      if (response.status === 200) { 
        ToastHandle(response.data.message, "success");
        navigate("/");
      }
      else { ToastHandle(response?.data?.error, "danger"); }
      setDeleteAccountLoading(false);
      return response.status;
    }
    catch (error) { ToastHandle('An error occurred.', "danger"); }
    finally { setDeleteAccountLoading(false); }
  }

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAccount = () => {
    if (is_gcs_subaccount_user()) { // For now, only allow GCS subaccount users to delete their account
      callDeleteAccountAPI();
    } else {} // do nothing for now
    setShowDeleteConfirm(false);
  };

  return (
    <>
      {/* Danger Zone Section Divider */}
      <div className="section-divider danger" style={{ marginTop: '40px', marginBottom: '24px' }}>
        <div className="section-divider-line"></div>
        <span className="section-divider-text">Danger Zone</span>
        <div className="section-divider-line"></div>
      </div>

      {/* Danger Zone Card */}
      <div className="account-content">
        <div className="account-section-card danger">
          <div className="section-header-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ef4444' }}>
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" x2="12" y1="9" y2="13"></line>
              <line x1="12" x2="12.01" y1="17" y2="17"></line>
            </svg>
            <h3>Delete Account</h3>
          </div>

          <p className="section-description">
            These actions are destructive and cannot be undone. Please proceed with caution.
          </p>

          {deleteAccountLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Loader />
            </div>
          ) : (
            <button 
              className="danger-button" 
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          )}
        </div>
      </div>

      {/* Delete Account Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDeleteAccount}
        title={
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
              <line x1="12" x2="12" y1="9" y2="13"></line>
              <line x1="12" x2="12.01" y1="17" y2="17"></line>
            </svg>
            Delete Account
          </>
        }
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently deleted."
        confirmText="Delete Account"
        isDanger={true}
        loading={deleteAccountLoading}
      />
    </>
  );
};

export default DangerZone;
