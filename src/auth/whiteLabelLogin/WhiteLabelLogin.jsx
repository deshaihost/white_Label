import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/actions";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import Authorized from "../../helper/Authorized";
import useWhiteLabelBranding from "../../helper/useWhiteLabelBranding";

const WhiteLabelLogin = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  
  const [isLoading, setIsLoading] = useState(false);
  const { brandName } = useWhiteLabelBranding();
  
  const loginStatus = store?.loginReducer?.login?.status;
  const loginLoading = store?.loginReducer?.loading;

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const password = params.get('password');
    const token = params.get('token');
    const redirect = params.get('redirect');

    if (token) {
      // Handle direct token authentication (from POST API)
      handleTokenAuth(token, redirect);
    } else if (email && password) {
      // Auto-login with URL parameters
      handleLogin(email, password);
    } else {
      // Redirect to regular login if no credentials provided
      navigate('/login');
    }
  }, [location.search, navigate]);

  const handleTokenAuth = (token, redirectTo = 'dashboard') => {
    try {
      setIsLoading(true);
      
      // Create user object in the same format as normal login
      const user = {
        token: token,
        refreshToken: null,
        data: "userData",
        id: 1,
        lastName: "User",
        role: "userRole"
      };
      
      // Store authentication data
      localStorage.setItem('hostBuddy_auth', JSON.stringify(user));
      localStorage.setItem('hostBuddy_active_token', token);
      
      // Set authorization header for future API calls
      const { setAuthorization } = require('../../helper/apiCore');
      setAuthorization(token);
      
      ToastHandle("success", "Authentication successful!");
      
      // Redirect to the specified page
      setTimeout(() => {
        navigate(`/${redirectTo}`);
      }, 1000);
      
    } catch (error) {
      console.error('Token authentication error:', error);
      ToastHandle("error", "Authentication failed.");
      navigate('/login');
    }
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    
    const loginPayload = {
      email,
      password,
      rememberMe: false
    };
    
    dispatch(loginActions(loginPayload));
  };

  // Handle login response
  useEffect(() => {
    if (loginStatus === 200) {
      ToastHandle("success", "Login successful!");
      setIsLoading(false);
      navigate("/dashboard");
    } else if (loginStatus && loginStatus !== 200) {
      ToastHandle("error", "Login failed. Please check your credentials.");
      setIsLoading(false);
    }
  }, [loginStatus, navigate]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  if (isLoading || loginLoading) {
    return <Loader />;
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>🔐 {brandName || "White Label"} Login</h2>
        <p>Authenticating your credentials...</p>
        <Loader />
      </div>
    </div>
  );
};

export default WhiteLabelLogin;
