import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import './Integrations.css';
import IntegrationCredentialsModal from './integrationCredentialsModal';
import HostfullyIconSvg from './Icons/Hostfully_tile_icon.svg';

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
        <img src={HostfullyIconSvg} className="partner-logo" style={{ height: '50px', width: '62%' }} alt="Hostfully Logo" />
        <p>Connect to Hostfully Guidebooks to allow HostBuddy to provide your guests with accurate, up-to-date information about your property and local recommendations directly from your Hostfully Guidebooks.</p>
      </div>
      <IntegrationCredentialsModal show={showModal} handleClose={handleModalClose} onSuccess={handleSuccess} integration="hostfullyGuidebooks" title="Connect to Hostfully Guidebooks"/>
    </>
  );
};

export default ConnectToHostfullyGuidebooks;
