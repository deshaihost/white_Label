import { useEffect, useState } from 'react';
import axios from 'axios';
import ToastHandle from '../../../../helper/ToastMessage';
import Loader from '../../../../helper/Loader';


const WhatsappIntegration = () => {
  const [whatsappNumber, setWhatsappNumber] = useState(''); // single WhatsApp number
  const [getIsLoading, setGetIsLoading]       = useState(false);
  

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


  return (
    <div>
      <h3 style={{marginTop:'40px'}}>Connected to WhatsApp!</h3>
      {!getIsLoading ? (
        <p style={{ fontSize: '14px', textAlign: 'left', width: '95%', marginTop: '20px', color: '#FFF' }}>
          Your WhatsApp number: <b>{whatsappNumber || 'No number connected'}</b>
        </p>
      ) : (
        <div style={{ marginTop: '20px' }}><Loader /></div>
      )}
    </div>
  );
};

export default WhatsappIntegration;
