import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserDataActions } from '../../../../redux/actions';
import './Integrations.css';
import IntegrationCredentialsModal from './integrationCredentialsModal';
import OpenPhonePng from './Icons/OpenPhone-Logo.png';
import MountLogo from './Icons/Mount Logo.svg';
import OpenphoneLogoSvg from './Icons/Openphone.svg';


const ConnectToOpenPhone = () => {
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
        <img src={OpenphoneLogoSvg} className="partner-logo" style={{ width: '200px', height: '22px' }} alt="OpenPhone Logo" />
        <p>Connect your OpenPhone Account to view your OpenPhone conversations in your inbox, and let HostBuddy automatically respond to your guests over OpenPhone.</p>
      </div>
      <IntegrationCredentialsModal show={showModal} handleClose={handleModalClose} onSuccess={handleSuccess} integration="openphone" title="Connect to OpenPhone"/>
    </>
  );
};


export default ConnectToOpenPhone;


