import React, { useState, useEffect } from 'react';
import './confirmEmail.css';
import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import { BoxLoader } from '../../helper/Loader';

const ConfirmYourEmail = () => {
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
        <div className='confirm-email-page-content'>
        <h1>Confirm Your Email</h1>
        <p>An email has been sent to "{emailEntered}". Please click the link in the email to continue.</p>
        {reSendApiLoading ? (
          <BoxLoader />
        ) : (
          !emailResent ? (
            <button onClick={resendEmail}>Resend Email</button>
          ) : (
            <p style={{ fontSize: '1em' }}>Confirmation email to "{emailEntered}" has been re-sent. Please check your inbox.</p>
          )
        )}
        </div>
        <div className='confirm-email-page-spacer'></div>
    </>
  );
};

export default ConfirmYourEmail;