import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/actions";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import Authorized from "../../helper/Authorized";
import { APICore, setAuthorization } from "../../helper/apiCore";
import useWhiteLabelBranding from "../../helper/useWhiteLabelBranding";

const api = new APICore();

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
    const isLoggedOut = sessionStorage.getItem('whiteLabelLoggedOut');

    // If user just logged out, clear the logout flag and stay on white label login page
    if (isLoggedOut) {
      sessionStorage.removeItem('whiteLabelLoggedOut');
      // Show the login interface instead of redirecting
      setIsLoading(false);
      return;
    }

    if (token) {
      // Handle direct token authentication (from POST API)
      // Always redirect to dashboard when token is provided
      handleTokenAuth(token, redirect || 'dashboard');
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
        data: "userData",
        id: 1,
        password: "test",
        lastName: "User",
        role: "userRole",
        token: token, // This is the main token used by the system
        refreshToken: token, // Use token as refresh token for compatibility
      };

      // Use the same method as regular login to set the user session
      api.setLoggedInUser(user, false); // false = don't remember me
      setAuthorization(token);
      
      ToastHandle("success", "Authentication successful!");
      
      // Always redirect to dashboard when token is provided
      setTimeout(() => {
        navigate('/dashboard');
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

  const isLoggedOut = sessionStorage.getItem('whiteLabelLoggedOut');
  
  if (isLoggedOut || (!isLoading && !loginLoading)) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ 
          textAlign: 'center', 
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h2 style={{ marginBottom: '1rem', color: '#333' }}>
            🔐 {brandName || "White Label"} Login
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            You have been logged out. Please contact your administrator to get new login credentials.
          </p>
          <button 
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Go to Standard Login
          </button>
        </div>
      </div>
    );
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
