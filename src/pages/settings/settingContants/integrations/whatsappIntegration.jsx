import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';


const WhatsappIntegration = () => {
  const [whatsappNumber, setWhatsappNumber] = useState(''); // single WhatsApp number
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
        const res = await axios.get(`${baseUrl}/get_twilio_whatsapp_data`, cfg);
        if (res.status === 200) {
          const nums = res.data?.phone_number || [];
          setWhatsappNumber(nums);
        } else {
          ToastHandle(res.data?.error || 'Could not load Twilio WhatsApp data', 'danger');
        }
      } catch (e) {
        ToastHandle('Network error fetching Twilio WhatsApp data', 'danger');
      } finally {
        setGetIsLoading(false);
      }
    })();
  }, []);

  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      const cfg = {
        headers: { 'X-API-Key': API_KEY, 'Content-Type': 'application/json' },
        validateStatus: s => s >= 200 && s < 500,
      };
      const res = await axios.delete(`${baseUrl}/disconnect_whatsapp_integration`, cfg);
      if (res.status === 200) {
        setWhatsappNumber('');
        setShowDisconnectModal(false);
        ToastHandle('WhatsApp integration disconnected successfully', 'success');
      } else {
        ToastHandle(res.data?.error || 'Failed to disconnect WhatsApp integration', 'danger');
      }
    } catch (e) {
      ToastHandle('Network error disconnecting WhatsApp integration', 'danger');
    } finally {
      setIsDisconnecting(false);
    }
  };


  return (
    <div>
      <h3 style={{marginTop:'40px'}}>Connected to WhatsApp!</h3>
      {!getIsLoading ? (
        <>
          <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px', color: '#FFF' }}>
            Your WhatsApp number: <b>{whatsappNumber || 'No number connected'}</b>
          </p>
          
          {whatsappNumber && (
            <button
              onClick={() => setShowDisconnectModal(true)}
              style={{
                marginTop: '30px',
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
        </>
      ) : (
        <div style={{ marginTop: '20px' }}><Loader /></div>
      )}

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
                <strong>WhatsApp</strong>?<br />
                This action will remove the connection and you'll need to reconnect to use WhatsApp integration again.
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

export default WhatsappIntegration;
