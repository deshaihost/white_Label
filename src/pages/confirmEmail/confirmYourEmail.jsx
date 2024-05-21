import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import { BoxLoader } from '../../helper/Loader';

const ConfirmYourEmail = () => {

  // Add the styles here because if I create a standalone .css file for this, it applies to the entire app, and I can't figure out how to make it not do that
  const styles = {
  h1: { 
    marginBottom: '20px', 
    color: '#fff',
  },
  p: { 
    marginBottom: '20px', 
    color: '#fff',
    fontSize: '1.2em',
  },
  button: {
    background: 'none',
    color: '#007bff',
    cursor: 'pointer',
    border: 'none',
    padding: '0',
    font: 'inherit',
    outline: 'inherit',
  },
  confirmEmailPageSpacer: { 
    height: '400px', 
  },
  confirmEmailPageContent: { 
    padding: '50px', 
  },
};

  const [emailResent, setEmailReSent] = useState(false);
  const [emailEntered, setEmailEntered] = useState("");
  const [reSendApiLoading, setReSendApiLoading] = useState(false);

  // On page load: get the email entered (on the login page) from local storage, save it here, and remove it from local storage
  useEffect(() => {
    const emailEntered = localStorage.getItem('loginEmailEntered');
    if (emailEntered) {
      setEmailEntered(emailEntered);
      localStorage.removeItem('loginEmailEntered');
    }
  }, []);

  const callResendEmailApi = async (email_addr) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { email: email_addr };
    setReSendApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/send_confirmation_email`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setEmailReSent(true);
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
    } catch (error) {
      ToastHandle(error, "danger");
    } finally {
      setReSendApiLoading(false);
    }
  }

  const resendEmail = () => {
    callResendEmailApi(emailEntered);
  };

  return (
    <>
      <div style={styles.confirmEmailPageContent} className='confirm-email-page-content'>
        <h1 style={styles.h1}>Confirm Your Email</h1>
        <p style={styles.p}>An email has been sent to "{emailEntered}". Please click the link in the email to continue.</p>
        {reSendApiLoading ? (
          <BoxLoader />
        ) : (
          !emailResent ? (
            <button style={styles.button} onClick={resendEmail}>Resend Email</button>
          ) : (
            <p style={{ ...styles.p, fontSize: '1em' }}>Confirmation email to "{emailEntered}" has been re-sent. Please check your inbox.</p>
          )
        )}
        </div>
        <div className='confirm-email-page-spacer' style={styles.confirmEmailPageSpacer}></div>
    </>
  );
};

export default ConfirmYourEmail;