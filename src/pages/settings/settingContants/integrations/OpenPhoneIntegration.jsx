import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';

const OpenPhoneIntegration = () => {
  const [openPhoneNumbers, setOpenPhoneNumbers] = useState([]); // [{ number, label?, active }]
  const [selectedNumber, setSelectedNumber]   = useState('');   // dropdown selection
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [getIsLoading, setGetIsLoading]       = useState(false);
  const [showDisconnectModal, setShowDisconnectModal] = useState(false);
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const baseUrl = process.env.REACT_APP_API_ENDPOINT;
  const API_KEY  = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    (async () => {
      setGetIsLoading(true);
      try {
        const cfg = {
          headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
          validateStatus: s => s >= 200 && s < 500,
        };
        const res = await axios.get(`${baseUrl}/get_openphone_data`, cfg);
        if (res.status === 200) {
          const nums = res.data?.phone_numbers || [];
          setOpenPhoneNumbers(nums);
          const active = nums.find(n => n.active);
          setSelectedNumber(active?.number || '');
        } else {
          ToastHandle(res.data?.error || 'Could not load OpenPhone data', 'danger');
        }
      } catch (e) {
        ToastHandle('Network error fetching OpenPhone data', 'danger');
      } finally {
        setGetIsLoading(false);
      }
    })();
  }, []);                                

  const handleSubmit = async () => {
    if (!selectedNumber) {
      ToastHandle('Select a number first', 'warning');
      return;
    }
    setSubmitIsLoading(true);
    try {
      const cfg = {
        headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
        validateStatus: s => s >= 200 && s < 500,
      };
      const body = { phone_numbers: [selectedNumber] };
      const res  = await axios.post(`${baseUrl}/set_openphone_numbers`, body, cfg);

      if (res.status === 200) {
        ToastHandle('Phone number updated successfully', 'success');
        // flip the active flag locally so UI updates instantly
        setOpenPhoneNumbers(prev =>
          prev.map(n => ({ ...n, active: n.number === selectedNumber }))
        );
      } else {
        ToastHandle(res.data?.error || 'Unable to update number', 'danger');
      }
    } catch (e) {
      ToastHandle('Network error updating number', 'danger');
    } finally {
      setSubmitIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const cfg = {
        headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
        validateStatus: s => s >= 200 && s < 500,
      };
      const res = await axios.delete(`${baseUrl}/disconnect_openphone_integration`, cfg);
      
      if (res.status === 200) {
        setOpenPhoneNumbers([]);
        setSelectedNumber('');
        setShowDisconnectModal(false);
        ToastHandle('OpenPhone integration disconnected successfully', 'success');
      } else {
        ToastHandle(res.data?.error || 'Failed to disconnect OpenPhone integration', 'danger');
      }
    } catch (e) {
      console.error('Network error:', e);
      ToastHandle('Network error disconnecting OpenPhone integration', 'danger');
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div>
      <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px' }}>
        Use the table below to set your OpenPhone number. Click "Change Phone Number" at the bottom to change the current number.
      </p>

      <table style={{ marginTop: '50px', width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>
              Current OpenPhone Number
            </th>
            <th style={{ padding: '10px', borderBottom: '1px solid white', fontSize: '18px', color: '#AAA' }}>
              Available Numbers
            </th>
          </tr>
        </thead>
        <tbody>
          {!getIsLoading ? (
            <tr style={{ height: '40px', borderBottom: '1px solid white' }}>
              <td style={{ padding: '10px', fontSize: '14px' }}>
                {openPhoneNumbers.find(n => n.active)?.number || '[None active]'}
              </td>
              <td style={{ padding: '10px' }}>
                <select
                  className="form-control"
                  value={selectedNumber}
                  onChange={e => setSelectedNumber(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="">[None selected]</option>
                  {openPhoneNumbers.map(num => (
                    <option key={num.number} value={num.number}>
                      {num.formattedNumber || num.number}
                      {num.name ? ` – ${num.name}` : ''}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={2}><Loader /></td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px' }}>
        <div style={{ flex: 1 }}></div>
        
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
          {!submitIsLoading ? (
            <button
              type="button"
              className="btn btn-primary"
              style={{ borderRadius: '50px', padding: '10px 20px' }}
              onClick={handleSubmit}
            >
              Change Phone Number
            </button>
          ) : (
            <Loader />
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          {openPhoneNumbers.length > 0 && (
            <button
              onClick={() => setShowDisconnectModal(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Disconnect Integration
            </button>
          )}
        </div>
      </div>

      {/* Disconnect Confirmation Modal */}
      {showDisconnectModal && (
        <div className="modal fade show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content" style={{ backgroundColor: "#0f1a36", color: "#fff" }}>
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowDisconnectModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to disconnect the integration{" "}
                <strong>OpenPhone</strong>?<br />
                This action will remove your phone number configuration and you'll need to reconfigure it if you reconnect.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDisconnectModal(false)}
                  disabled={isDisconnecting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                >
                  {isDisconnecting ? "Disconnecting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenPhoneIntegration;