import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions, stateEmptyActions } from "../../redux/actions";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import Authorized from "../../helper/Authorized";
import { APICore, setAuthorization } from "../../helper/apiCore";

const WhiteLabelLogin = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState(null);
  
  const loginStatus = store?.loginReducer?.login?.status;
  const loginLoading = store?.loginReducer?.loading;

  // Function to handle POST API login from white-label domains
  const handleWhiteLabelLogin = async (email, password) => {
    setIsLoading(true);
    
    try {
      // Extract the referrer domain to identify white-label client
      const referrerDomain = document.referrer ? new URL(document.referrer).hostname : null;
      const currentDomain = window.location.hostname;
      
      // Check if this is coming from a white-label domain
      const isWhiteLabel = referrerDomain && referrerDomain !== currentDomain && referrerDomain !== 'hostbuddy.ai';
      
      const loginPayload = {
        email,
        password,
        rememberMe: false,
        whiteLabelDomain: isWhiteLabel ? referrerDomain : null
      };
      
      // Dispatch login action
      dispatch(loginActions(loginPayload));
      
    } catch (error) {
      console.error('White label login error:', error);
      ToastHandle('Login failed. Please try again.', "danger");
      setIsLoading(false);
    }
  };

  // Function to extract login credentials from URL parameters or POST body
  const extractLoginCredentials = () => {
    const urlParams = new URLSearchParams(location.search);
    const email = urlParams.get('email') || urlParams.get('username') || urlParams.get('login');
    const password = urlParams.get('password');
    
    return { email, password };
  };

  // Handle login response
  useEffect(() => {
    if (loginStatus === 400 || loginStatus === 401) {
      ToastHandle('Invalid credentials', "danger");
      dispatch(stateEmptyActions());
      setIsLoading(false);
      
      // For white-label domains, we might want to redirect back or show an error page
      const referrerDomain = document.referrer ? new URL(document.referrer).hostname : null;
      if (referrerDomain && referrerDomain !== 'hostbuddy.ai') {
        // Could redirect back to the white-label domain with an error parameter
        setTimeout(() => {
          window.location.href = `https://${referrerDomain}/login?error=invalid_credentials`;
        }, 2000);
      }
      
    } else if (loginStatus === 200) {
      // Success - redirect to dashboard
      if (store?.loginReducer?.login?.gcs) {
        navigate('/gcs-users');
      } else {
        navigate('/dashboard', { replace: true });
      }
      dispatch(stateEmptyActions());
      setIsLoading(false);
      
    } else if (loginStatus === 202) {
      // Email confirmation needed
      const { email } = loginData || extractLoginCredentials();
      if (email) {
        localStorage.setItem('loginEmailEntered', email);
      }
      navigate('/confirm-email');
      dispatch(stateEmptyActions());
      setIsLoading(false);
    }
  }, [loginStatus, navigate, dispatch, loginData, location]);

  // Check if already authenticated
  useEffect(() => {
    if (token !== undefined) {
      if (getAuthToken?.gcs_access_token) {
        navigate('/gcs-users');
      } else {
        navigate('/dashboard', { replace: true });
      }
      return;
    }

    // Auto-login if credentials are provided in URL
    const { email, password } = extractLoginCredentials();
    if (email && password) {
      setLoginData({ email, password });
      handleWhiteLabelLogin(email, password);
    }
  }, [token, getAuthToken, location.search]);

  // Listen for POST messages from parent window (for iframe scenarios)
  useEffect(() => {
    const handlePostMessage = (event) => {
      // Verify origin for security
      const allowedOrigins = ['https://c.acental.com', 'https://hostbuddy.ai'];
      if (!allowedOrigins.some(origin => event.origin.startsWith(origin))) {
        return;
      }

      if (event.data.type === 'WHITE_LABEL_LOGIN' && event.data.credentials) {
        const { email, password } = event.data.credentials;
        if (email && password) {
          setLoginData({ email, password });
          handleWhiteLabelLogin(email, password);
        }
      }
    };

    window.addEventListener('message', handlePostMessage);
    return () => window.removeEventListener('message', handlePostMessage);
  }, []);

  // If loading, show loader
  if (isLoading || loginLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <Loader />
        <p style={{ marginTop: '20px', color: '#666' }}>Authenticating...</p>
      </div>
    );
  }

  // If no credentials provided, show message
  const { email, password } = extractLoginCredentials();
  if (!email || !password) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column'
      }}>
        <h3>White Label Login</h3>
        <p>Please provide login credentials via URL parameters or POST message.</p>
        <small>Expected parameters: email/username/login and password</small>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column'
    }}>
      <Loader />
      <p style={{ marginTop: '20px', color: '#666' }}>Processing login...</p>
    </div>
  );
};

export default WhiteLabelLogin;