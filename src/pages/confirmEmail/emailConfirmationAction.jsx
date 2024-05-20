import React, { useState, useEffect } from 'react';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ToastHandle from '../../helper/ToastMessage';
import Authorized from '../../helper/Authorized';
import { stateEmptyActions } from '../../redux/actions';
import { useDispatch } from "react-redux";
import { APICore, setAuthorization } from '../../helper/apiCore';

// No UI here; just logic to send the API request to confirm the email, save the returned token, and redirect to the dashboard
const EmailConfirmationAction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [apiLoading, setApiLoading] = useState(false);
  const [confirmSuccessful, setConfirmSuccessful] = useState(false);

  const callConfirmEmailApi = async (codeToSubmit) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { confirmation_code: codeToSubmit };
    setApiLoading(true);

    try {
        const config = {
            headers: { "X-API-Key": API_KEY },
            validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };

        const response = await axios.post( `${baseUrl}/confirm_email`, dataToSend, config );

        if (response.status === 200) {
            ToastHandle(response.data.message, "success");
            const userData = { // this is how the data is saved in the login logic. Most of these fields are gibberish, but copy them anyway just to be safe
                data: "userData", id: 1, password: "test", lastName: "User", role: "userRole",
                token: response.data.access_token, refreshToken: response.data.refresh_token,
            };

            // Save the token. This is copied from saga.js in src/redux/auth/login (it's what the login flow uses to save the token)
            const api = new APICore();
            api.setLoggedInUser(userData);
            setAuthorization(userData.token);

            setConfirmSuccessful(true);
        } else {
            ToastHandle(response?.data?.error, "danger");
        }
    } catch (error) {
        ToastHandle(error.mesage, "danger");
    } finally {
        setApiLoading(false);
    }
  };

  // When the component mounts, send a POST request to the server to confirm the email. If successful, save the returned token and redirect to dashboard
  useEffect(() => {
    const confirmationCode = new URLSearchParams(location.search).get('confirmationCode');
    callConfirmEmailApi(confirmationCode);
  }, [location]);

  // After the confirmation is successful, redirect to the dashboard
  useEffect(() => {
    if (confirmSuccessful) {
        navigate('/dashboard');
        dispatch(stateEmptyActions());
    }
  }, [confirmSuccessful]);

  return null;
};

export default EmailConfirmationAction;