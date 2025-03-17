import React, { useState } from 'react';
import './account.css';
import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import Loader from '../../helper/Loader';
import { is_gcs_subaccount_user } from '../gcs/gcs_functionality';
import { useNavigate } from "react-router-dom";

const DangerZone = () => {

  const [pmsDisconnectLoading, setPmsDisconnectLoading] = useState(false);
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);
  const navigate = useNavigate();

  const callDisconnectPMSAPI = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setPmsDisconnectLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.delete( `${baseUrl}/remove_integration`, config );

      if (response.status === 200) { ToastHandle(response.data.message, "success"); }
      else { ToastHandle(response?.data?.error, "danger"); }
      setPmsDisconnectLoading(false);
      return response.status;
    }
    catch (error) { ToastHandle('An error occurred.', "danger"); }
    finally { setPmsDisconnectLoading(false); }
  }


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


  const handleDisconnectPMS = () => {
    if (window.confirm("Are you sure you want to disconnect your PMS? Your HostBuddy properties won't be deleted, but any data synced from your PMS (including guest conversations) will be deleted from HostBuddy and all data sync will be stopped.")) {
      callDisconnectPMSAPI();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      if (is_gcs_subaccount_user()) { // For now, only allow GCS subaccount users to delete their account
        callDeleteAccountAPI();
      } else {} // do nothing for now
    }
  };

  return (
    <div className="account-content">
      <h5>Danger Zone</h5>
      <p style={{marginLeft:"10px", textAlign:"center", fontSize:"15px"}}>
        These actions are destructive and cannot be undone. Please proceed with caution.
      </p>

      {(pmsDisconnectLoading || deleteAccountLoading) ? (
        <div className="row">
          <div className="col text-center">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col text-center">
            <button className="bg_theme_btn update_user_info" style={{marginRight: "10px", backgroundColor: "#661111"}} onClick={handleDisconnectPMS}>
              Disconnect PMS
            </button>
            <button className="bg_theme_btn update_user_info" style={{backgroundColor: "#661111"}} onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DangerZone;
