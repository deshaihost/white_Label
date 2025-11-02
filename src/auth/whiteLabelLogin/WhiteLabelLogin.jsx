import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../redux/actions";
import Loader, { ProgressLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import Authorized from "../../helper/Authorized";
import { APICore, setAuthorization } from "../../helper/apiCore";
import useWhiteLabelBranding from "../../helper/useWhiteLabelBranding";
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

const api = new APICore();

const WhiteLabelLogin = () => {
  console.log('🟡 WhiteLabelLogin component rendering');
  
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  const { cssConfig, loading: cssLoading, progress } = useWhiteLabelCss();
  
  const [isLoading, setIsLoading] = useState(true); // Start with loading true for immediate token auth
  const { brandName } = useWhiteLabelBranding();
  
  const loginStatus = store?.loginReducer?.login?.status;
  const loginLoading = store?.loginReducer?.loading;

  console.log('🟡 WhiteLabelLogin component state:', {
    pathname: location.pathname,
    search: location.search,
    isLoading,
    token: !!token
  });

  useEffect(() => {
    console.log('🟡 WhiteLabelLogin useEffect triggered');
    
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    const password = params.get('password');
    const token = params.get('token');
    const redirect = params.get('redirect');
    const userType = params.get('user'); // Check for user=gcs parameter
    const isGcsUser = userType === 'gcs';
    const isLoggedOut = sessionStorage.getItem('whiteLabelLoggedOut');

    console.log('🟡 WhiteLabelLogin useEffect params:', {
      email,
      password: password ? '***' : null,
      token: token ? `${token.substring(0, 10)}...` : null,
      redirect,
      userType,
      isGcsUser,
      isLoggedOut: !!isLoggedOut,
      paramsString: params.toString()
    });

    // If user just logged out, clear the logout flag and stay on white label login page
    if (isLoggedOut) {
      console.log('🟡 WhiteLabelLogin: User just logged out, staying on white label page');
      sessionStorage.removeItem('whiteLabelLoggedOut');
      // Show the login interface instead of redirecting
      setIsLoading(false);
      return;
    }

    // Check if we have valid white label credentials
    const hasValidToken = token && token.trim().length > 0;
    const hasValidEmailPassword = email && email.trim().length > 0 && password && password.trim().length > 0;

    console.log('🟡 WhiteLabelLogin credential check:', {
      hasValidToken,
      hasValidEmailPassword,
      isGcsUser
    });

    if (hasValidToken) {
      console.log('🟡 WhiteLabelLogin: Processing token authentication', isGcsUser ? '(GCS User)' : '(Regular User)');
      // Handle direct token authentication (from POST API)
      // Keep loading true during token auth
      handleTokenAuth(token, redirect, isGcsUser);
    } else if (hasValidEmailPassword) {
      console.log('🟡 WhiteLabelLogin: Processing email/password authentication', isGcsUser ? '(GCS User)' : '(Regular User)');
      // Auto-login with URL parameters
      handleLogin(email, password, isGcsUser);
    } else {
      console.log('🟡 WhiteLabelLogin: No valid credentials, REDIRECTING to /login');
      // No valid white label credentials - redirect to regular login immediately
      // This prevents white label login from being accessed without proper credentials
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate]);

  const handleTokenAuth = (token, redirectTo = 'dashboard', isGcsUser = false) => {
    try {
      setIsLoading(true);
      
      console.log('🟡 WhiteLabelLogin: handleTokenAuth', { token: `${token.substring(0, 10)}...`, redirectTo, isGcsUser });
      
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

      // If this is a GCS user, add the GCS access token field
      if (isGcsUser) {
        user["gcs_access_token"] = token;
        console.log('🟡 WhiteLabelLogin: Added GCS access token to user object');
      }

      // Use the same method as regular login to set the user session
      api.setLoggedInUser(user, false); // false = don't remember me
      setAuthorization(token);
      
      ToastHandle("success", "Authentication successful!");
      
      // Redirect based on user type
      const targetPath = isGcsUser ? '/gcs-users' : (redirectTo === 'dashboard' ? '/dashboard' : `/${redirectTo}`);
      console.log('🟡 WhiteLabelLogin: Redirecting to', targetPath);
      
      setTimeout(() => {
        navigate(targetPath);
      }, 1000);
      
    } catch (error) {
      console.error('Token authentication error:', error);
      ToastHandle("error", "Authentication failed.");
      navigate('/login');
    }
  };

  const handleLogin = (email, password, isGcsUser = false) => {
    setIsLoading(true);
    
    console.log('🟡 WhiteLabelLogin: handleLogin', { email, isGcsUser });
    
    const loginPayload = {
      email,
      password,
      rememberMe: false
    };
    
    // Store GCS user flag for handling login response
    if (isGcsUser) {
      sessionStorage.setItem('whiteLabelGcsLogin', 'true');
    } else {
      sessionStorage.removeItem('whiteLabelGcsLogin');
    }
    
    dispatch(loginActions(loginPayload));
  };

  // Handle login response
  useEffect(() => {
    const isGcsLogin = sessionStorage.getItem('whiteLabelGcsLogin') === 'true';
    
    if (loginStatus === 200) {
      console.log('🟡 WhiteLabelLogin: Login successful', { isGcsLogin, isGcs: store?.loginReducer?.login?.gcs });
      
      ToastHandle("success", "Login successful!");
      setIsLoading(false);
      
      // Check if this is a GCS user from the login response or our stored flag
      const isGcsUser = store?.loginReducer?.login?.gcs || isGcsLogin;
      
      if (isGcsUser) {
        console.log('🟡 WhiteLabelLogin: Redirecting GCS user to /gcs-users');
        navigate("/gcs-users");
      } else {
        console.log('🟡 WhiteLabelLogin: Redirecting regular user to /dashboard');
        navigate("/dashboard");
      }
      
      // Clean up the session storage flag
      sessionStorage.removeItem('whiteLabelGcsLogin');
    } else if (loginStatus && loginStatus !== 200) {
      ToastHandle("error", "Login failed. Please check your credentials.");
      setIsLoading(false);
      // Clean up the session storage flag on error
      sessionStorage.removeItem('whiteLabelGcsLogin');
    }
  }, [loginStatus, navigate, store?.loginReducer?.login?.gcs]);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      console.log('🟡 WhiteLabelLogin: User already logged in, checking user type');
      
      // Check if this is a GCS user by looking for gcs_access_token
      if (getAuthToken?.gcs_access_token) {
        console.log('🟡 WhiteLabelLogin: Existing GCS user, redirecting to /gcs-users');
        navigate("/gcs-users");
      } else {
        console.log('🟡 WhiteLabelLogin: Existing regular user, redirecting to /dashboard');
        navigate("/dashboard");
      }
    }
  }, [token, navigate, getAuthToken]);

  // Show loader while CSS is loading OR while authenticating
  if (cssLoading || isLoading || loginLoading) {
    return <ProgressLoader progress={cssLoading ? progress : 50} message={cssLoading ? "Loading branding..." : "Authenticating..."} />;
  }

  const isLoggedOut = sessionStorage.getItem('whiteLabelLoggedOut');
  
  // Check if this is a GCS user request
  const params = new URLSearchParams(location.search);
  const isGcsUser = params.get('user') === 'gcs';
  
  if (isLoggedOut || (!isLoading && !loginLoading)) {
    const loginTitle = isGcsUser ? 
      `🔐 ${brandName || "White Label"} GCS Login` : 
      `🔐 ${brandName || "White Label"} Login`;
      
    const loginMessage = isGcsUser ?
      "You have been logged out from the GCS portal. Please contact your administrator to get new login credentials." :
      "You have been logged out. Please contact your administrator to get new login credentials.";
    
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
            {loginTitle}
          </h2>
          <p style={{ marginBottom: '1.5rem', color: '#666' }}>
            {loginMessage}
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

  // Check if this is a GCS user request for loading screen
  const loadingParams = new URLSearchParams(location.search);
  const isGcsUserLoading = loadingParams.get('user') === 'gcs';
  const loadingTitle = isGcsUserLoading ? 
    `🔐 ${brandName || "White Label"} GCS Login` : 
    `🔐 ${brandName || "White Label"} Login`;

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2>{loadingTitle}</h2>
        <p>Authenticating your credentials...</p>
        <Loader />
      </div>
    </div>
  );
};

export default WhiteLabelLogin;
