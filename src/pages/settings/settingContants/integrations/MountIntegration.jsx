import React, { useEffect, useState } from 'react';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';

const MountIntegration = ({ ApiUserData }) => {
  const [isLoading, setIsLoading] = useState(false);

  // For now, this is a placeholder component
  // You can add actual Mount integration functionality here later
  
  return (
    <div>
      <div style={{ marginTop: '40px' }}>
        <h3>Mount Integration</h3>
        <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px', color: '#AAA' }}>
          Mount integration allows you to automatically provide your guests with trip planning concierge services. 
          HostBuddy will guide your guests through the trip planning process based on upsells in your area.
        </p>
        
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #045ce9', borderRadius: '8px' }}>
          <h4 style={{ color: '#fff', marginBottom: '15px' }}>Features:</h4>
          <ul style={{ color: '#AAA', lineHeight: '1.6' }}>
            <li>Automatic trip planning concierge activation</li>
            <li>Personalized guest experience recommendations</li>
            <li>Local upsell opportunities</li>
            <li>Seamless integration with HostBuddy messaging</li>
          </ul>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#AAA', fontSize: '14px' }}>
            Mount integration is currently in development. Stay tuned for more features!
          </p>
        </div>
      </div>
    </div>
  );
};

export default MountIntegration;
