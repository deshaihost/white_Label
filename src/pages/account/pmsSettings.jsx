import React, { useState, useEffect } from 'react';
import './account.css';
import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import Loader from '../../helper/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getCalryLinkActions } from '../../redux/actions';
import ReauthenticatePMSModal from '../../component/modal/reauthenticateModal/ReauthenticatePMSModal';

const PMSSettings = ({ ApiUserData }) => {
  const [pmsDisconnectLoading, setPmsDisconnectLoading] = useState(false);
  const [reauthenticateLoading, setReauthenticateLoading] = useState(false);
  const [showReauthModal, setShowReauthModal] = useState(false);
  const dispatch = useDispatch();

  const store = useSelector((state) => state);
  const getCarlyLinkStatus = store?.getCalryLinkReducer?.getCalryLing?.status;
  const getCarlyLink = store?.getCalryLinkReducer?.getCalryLing?.data?.calry_link;
  const getCalryLinkLoading = store?.getCalryLinkReducer?.loading;

  // Get PMS platform from user data
  const getPlatform = () => {
    if (ApiUserData?.calry_integrations && Object.keys(ApiUserData.calry_integrations).length > 0) {
      return Object.keys(ApiUserData.calry_integrations)[0];
    }
    return null;
  };

  const platform = getPlatform();

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : '';
  };

  useEffect(() => {
    // When calry link is ready and modal is open, it will be displayed in the modal
    if (showReauthModal && getCarlyLinkStatus !== 200) {
      setReauthenticateLoading(true);
    } else if (getCarlyLinkStatus === 200) {
      setReauthenticateLoading(false);
    }
  }, [getCarlyLinkStatus, showReauthModal]);

  const callDisconnectPMSAPI = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setPmsDisconnectLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.delete(`${baseUrl}/remove_integration`, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
      setPmsDisconnectLoading(false);
      return response.status;
    }
    catch (error) {
      ToastHandle('An error occurred.', "danger");
    }
    finally {
      setPmsDisconnectLoading(false);
    }
  };

  const handleDisconnectPMS = () => {
    if (window.confirm("Are you sure you want to disconnect your PMS? Your HostBuddy properties won't be deleted, but any data synced from your PMS (including guest conversations) will be deleted from HostBuddy and all data sync will be stopped.")) {
      callDisconnectPMSAPI();
    }
  };

  const handleReauthenticatePMS = () => {
    if (!platform) {
      ToastHandle("No PMS integration found", "danger");
      return;
    }

    if (window.confirm(`Are you sure you want to reauthenticate to ${capitalizeFirstLetter(platform)}?\nNote: If you connect a different ${capitalizeFirstLetter(platform)} account, you'll need to individually re-link each HostBuddy property with the correct new listing on ${capitalizeFirstLetter(platform)}.`)) {
      // Get the calry link and show the modal
      dispatch(getCalryLinkActions({ platform }));
      setShowReauthModal(true);
    }
  };

  const handleCloseReauthModal = () => {
    setShowReauthModal(false);
  };

  return (
    <>
      {/* Integrations Section Divider */}
      <div className="section-divider" style={{ marginTop: '40px', marginBottom: '24px' }}>
        <div className="section-divider-line"></div>
        <span className="section-divider-text">Integrations</span>
        <div className="section-divider-line"></div>
      </div>

      {/* PMS Settings Card */}
      <div className="account-content">
        <div className="account-section-card">
          <div className="section-header-with-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M3 5V19A9 3 0 0 0 21 19V5"></path>
              <path d="M3 12A9 3 0 0 0 21 12"></path>
            </svg>
            <h3>PMS Settings</h3>
          </div>

          <p className="section-description">
            Manage your Property Management System integration.
          </p>

          {pmsDisconnectLoading ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <Loader />
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                className="bg_theme_btn" 
                onClick={handleReauthenticatePMS}
              >
                Reauthenticate PMS
              </button>
              <button 
                className="danger-button" 
                onClick={handleDisconnectPMS}
              >
                Disconnect PMS
              </button>
            </div>
          )}
        </div>
      </div>
      
      <ReauthenticatePMSModal 
        showModal={showReauthModal}
        handleClose={handleCloseReauthModal}
        calryLink={getCarlyLink}
        platformName={platform}
        loading={getCalryLinkLoading || reauthenticateLoading}
      />
    </>
  );
};

export default PMSSettings;
