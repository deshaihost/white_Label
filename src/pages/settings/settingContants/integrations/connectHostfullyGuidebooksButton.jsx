import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import './Integrations.css';
import IntegrationCredentialsModal from './integrationCredentialsModal';

const ConnectToHostfullyGuidebooks = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleConnectClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  // After successful connection, refresh user data to show the new integration
  const handleSuccess = () => {
    dispatch(getUserDataActions(false));
  };

  return (
    <>
      <div className="partner-tile" onClick={handleConnectClick}>
        <img className="partner-logo" alt="Hostfully Guidebooks Logo" src="https://storage.googleapis.com/frontend_media/partners/hostfully_circle.svg" style={{ height: '50px', width: '50px' }}
        />
        <p>Connect to Hostfully Guidebooks to allow HostBuddy to provide your guests with accurate, up-to-date information about your property and local recommendations directly from your Hostfully Guidebooks.</p>
      </div>
      <IntegrationCredentialsModal show={showModal} handleClose={handleModalClose} onSuccess={handleSuccess} integration="hostfullyGuidebooks" title="Connect to Hostfully Guidebooks"/>
    </>
  );
};

export default ConnectToHostfullyGuidebooks;
