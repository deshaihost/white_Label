import React from 'react';
import './Integrations.css';
import MountLogo from './Icons/Mount Logo.svg';

const ConnectToMount = () => {

  const handleConnectClick = () => {
    // For now, just show an alert or redirect to Mount's page
    // You can replace this with actual integration logic
    alert('Mount integration coming soon!');
  };

  return (
    <div className="partner-tile" onClick={handleConnectClick}>
      <img className="partner-logo" alt="Mount Logo" src={MountLogo} style={{ maxWidth: '150px', height: 'auto', filter: 'invert(1)' }} />
      <p>Activate Mount Upsells to automatically provide your guests with a trip planning concierge! When activated, HostBuddy will guide your guests through the trip planning process, based on upsells in your area</p>
    </div>
  );
};

export default ConnectToMount;
