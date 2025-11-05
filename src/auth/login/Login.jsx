import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../auth.css";
import PrimaryButton from "../../component/button/button";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginActions, stateEmptyActions } from "../../redux/actions";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import Authorized from "../../helper/Authorized";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { APICore, setAuthorization } from "../../helper/apiCore";
import { getLogo, getCssConfig } from "../../pages/settings/settingContants/whiteLabel/whiteLabelServices";

// Default images for HostBuddy domain
const DefaultLogo = 'https://hostbuddylb.com/logo/logo_footer.webp';
const DefaultAuthImage = 'https://hostbuddylb.com/home-new/_Signup.webp';

// Add dynamic styles to document head for pseudo-elements
const addDynamicStyles = (css) => {
  const styleId = 'white-label-login-styles';
  let styleElement = document.getElementById(styleId);
  
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  
  const placeholderColor = css.text?.secondary || '#888888';
  const focusBorderColor = css.borders?.active || css.components?.primary || '#0066FF';
  const focusShadowColor = `${focusBorderColor}33`;
  const linkColor = css.components?.primary || '#0066FF';
  
  styleElement.textContent = `
    .login.auth input::placeholder {
      color: ${placeholderColor} !important;
      opacity: 0.7;
    }
    
    .login.auth input:focus {
      border-color: ${focusBorderColor} !important;
      box-shadow: 0 0 0 2px ${focusShadowColor} !important;
      outline: none !important;
    }
    
    .login.auth .password-box input::placeholder {
      color: ${placeholderColor} !important;
      opacity: 0.7;
    }
    
    .login.auth .password-box input:focus {
      border-color: ${focusBorderColor} !important;
      box-shadow: 0 0 0 2px ${focusShadowColor} !important;
      outline: none !important;
    }
    
    .login.auth a {
      color: ${linkColor} !important;
    }
    
    .login.auth a:hover {
      color: ${linkColor} !important;
      opacity: 0.8;
    }
  `;
};

const Login = () => {
  console.log('🔵 [Login] Component rendering');
  
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  const [showPassword, setShowPassword] = useState(false);
  const [emailEntered, setEmailEntered] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // White-label logo states
  const [whiteLabelLogos, setWhiteLabelLogos] = useState(null);
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);
  const [isHostBuddyDomain, setIsHostBuddyDomain] = useState(true);
  
  // White-label CSS states
  const [whiteLabelCss, setWhiteLabelCss] = useState(null);
  const [isLoadingCss, setIsLoadingCss] = useState(true);
  
  const loginStatus = store?.loginReducer?.login?.status;
  const loginMessage = store?.loginReducer?.login?.message;
  const loginLoading = store?.loginReducer?.loading;
  const isGcs = store?.loginReducer?.login?.gcs;
  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues: {login_remember:false}});

  // Check domain and fetch white-label logos if needed
  useEffect(() => {
    const currentDomain = window.location.hostname;
    const isMainDomain = currentDomain === 'hostbuddy.ai' || currentDomain === 'www.hostbuddy.ai';
    
    console.log('🔵 [Login] Domain check:', {
      currentDomain,
      isMainDomain,
      timestamp: new Date().toISOString()
    });
    
    setIsHostBuddyDomain(isMainDomain);
    
    if (!isMainDomain) {
      console.log('🔵 [Login] White-label domain detected, fetching logos and CSS...');
      fetchWhiteLabelLogos(currentDomain);
      fetchWhiteLabelCss(currentDomain);
    } else {
      console.log('🔵 [Login] HostBuddy domain, using default logos and CSS');
      setIsLoadingLogos(false);
      setIsLoadingCss(false);
    }
  }, []);

  // Fetch white-label logos using get_logo endpoint
  const fetchWhiteLabelLogos = async (domain) => {
    try {
      console.log('🔵 [Login] Calling getLogo API for domain:', domain);
      
      const response = await getLogo({ domain });

      console.log('🔵 [Login] API response:', {
        success: response.success,
        hasData: !!response.data
      });

      if (response.success && response.data) {
        console.log('🔵 [Login] API response data:', {
          domain_name: response.data.domain_name,
          logos_count: response.data.logos_count,
          has_logo: !!response.data.logos_available?.logo,
          has_full_logo: !!response.data.logos_available?.full_logo,
          full_logo_url: response.data.logos_available?.full_logo?.url
        });

        setWhiteLabelLogos(response.data.logos_available);
      } else {
        console.error('🔵 [Login] Failed to fetch white-label logos:', response.error);
        setWhiteLabelLogos(null);
      }
    } catch (error) {
      console.error('🔵 [Login] Error fetching white-label logos:', error);
      setWhiteLabelLogos(null);
    } finally {
      setIsLoadingLogos(false);
      console.log('🔵 [Login] Logo loading complete');
    }
  };

  // Fetch white-label CSS configuration
  const fetchWhiteLabelCss = async (domain) => {
    try {
      console.log('🔵 [Login] Calling getCssConfig API for domain:', domain);
      
      const response = await getCssConfig({ domain });

      console.log('🔵 [Login] CSS API response:', {
        success: response.success,
        hasData: !!response.data
      });

      if (response.success && response.data) {
        console.log('🔵 [Login] CSS API response data:', {
          branding_name: response.data.Branding_name,
          has_css_data: !!response.data.css_data,
          primary_bg: response.data.css_data?.background?.primary,
          secondary_bg: response.data.css_data?.background?.secondary
        });

        setWhiteLabelCss(response.data.css_data);
        // Apply dynamic styles for pseudo-elements
        addDynamicStyles(response.data.css_data);
      } else {
        console.error('🔵 [Login] Failed to fetch white-label CSS:', response.error);
        setWhiteLabelCss(null);
      }
    } catch (error) {
      console.error('🔵 [Login] Error fetching white-label CSS:', error);
      setWhiteLabelCss(null);
    } finally {
      setIsLoadingCss(false);
      console.log('🔵 [Login] CSS loading complete');
    }
  };

  // Get the appropriate logo and auth image based on domain
  const getLogoUrl = () => {
    if (isHostBuddyDomain) {
      console.log('🔵 [Login] Using default logo for HostBuddy domain');
      return DefaultLogo;
    }
    
    // 🔒 CRITICAL: White-label domains must NEVER show default HostBuddy logo
    // Return null if no custom logo available - component will handle showing skeleton/nothing
    const logoUrl = whiteLabelLogos?.full_logo?.url || whiteLabelLogos?.logo?.url || null;
    console.log('🔵 [Login] White-label logo:', logoUrl || 'NONE - will show skeleton');
    return logoUrl;
  };

  const getAuthImageUrl = () => {
    if (isHostBuddyDomain) {
      console.log('🔵 [Login] Using default auth image for HostBuddy domain');
      return DefaultAuthImage;
    }
    
    // For white-label domains, use full_logo for auth image or hide it
    const authImageUrl = whiteLabelLogos?.full_logo?.url || null;
    console.log('🔵 [Login] Using white-label auth image:', authImageUrl || 'none (hidden)');
    return authImageUrl;
  };

  // Only redirect to white label if explicitly coming from a known white label domain
  useEffect(() => {
    const isLoggedOut = sessionStorage.getItem('whiteLabelLoggedOut');
    
    // Don't redirect if user just logged out, already redirecting, or came via normal navigation
    if (isLoggedOut || isRedirecting) {
      return;
    }
    
    // Never redirect if we're on the main hostbuddy domain
    const currentDomain = window.location.hostname;
    const isMainDomain = currentDomain === 'hostbuddy.ai' || 
                        currentDomain === 'www.hostbuddy.ai' || 
                        currentDomain === 'localhost' || 
                        currentDomain === '127.0.0.1';
    
    if (isMainDomain) {
      return;
    }
    
    // Only redirect if current hostname is a known white-label domain
    const knownWhiteLabelDomains = [
      'c.acental.com',
      'app.acental.com',
      'acental.com'
      // Add other known white label domains here
    ];
    
    // Only redirect if we're currently on a known white-label domain
    const isOnWhiteLabelDomain = knownWhiteLabelDomains.includes(currentDomain);
    
    if (isOnWhiteLabelDomain) {
      setIsRedirecting(true);
      navigate(`/white-label-login${location.search}`, { replace: true });
    }
  }, [location.search, navigate, isRedirecting]);

  // Show loading screen while redirecting to prevent flash
  if (isRedirecting) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Loader />
      </div>
    );
  }

  const onSubmit = (data) => {
    setEmailEntered(data.email);
    const rememberMe = data.login_remember;

    // If JWT is entered directly, save the token based on "Remember Me"
    if (data.password.startsWith("ey") && data.password.length > 100 && (data.password.match(/\./g) || []).length === 2) {
      const api = new APICore();
      const user = { data: "userData", id: 1, password: "test", lastName: "User", role: "userRole", token: data.password, refreshToken: data.password };
      api.setLoggedInUser(user, rememberMe);
      setAuthorization(user["token"]);
      navigate('/dashboard');
      dispatch(stateEmptyActions());
    }
    
    else {
      dispatch(loginActions({email:data.email, password:data.password, rememberMe}) ); 
    }
  };

  // When login API returns, check the status and handle accordingly
  useEffect(() => {
    if (loginStatus === 400 || loginStatus === 401) {
      ToastHandle('Invalid credentials', "danger");
      dispatch(stateEmptyActions());
    } else if (loginStatus === 200) { // success - redirect to dashboard or whatever page user was trying to access
      if (store?.loginReducer?.login?.gcs) {
        navigate('/gcs-users');
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
      dispatch(stateEmptyActions());
    } else if (loginStatus === 202) { // credentials good, but user hasn't confirmed email yet. Backend will not provide tokens until email is confirmed
      localStorage.setItem('loginEmailEntered', emailEntered); // this nees to be accessible on the confirm-email page
      navigate('/confirm-email')
      dispatch(stateEmptyActions());
    }
  }, [loginStatus]);

  // If token is already present, redirect to dashboard or the page user was trying to access without needing to log in
  useEffect(() => {
    if (token !== undefined) {

      // If this is a GCS user, redirect to the GCS users page no matter what
      if (getAuthToken?.gcs_access_token) {
        navigate('/gcs-users');
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    }
  }, []);

  // Show loader while fetching white-label logos and CSS (prevents flash of default logo/styles)
  if (isLoadingLogos || isLoadingCss) {
    console.log('🔵 [Login] Showing loader while fetching logos and CSS (preventing flash)');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Loader />
      </div>
    );
  }

  const logoUrl = getLogoUrl();
  const authImageUrl = getAuthImageUrl();

  // Get CSS styles for white-label domains
  const getBackgroundStyle = () => {
    if (isHostBuddyDomain || !whiteLabelCss) {
      return {};
    }
    
    const styles = {
      backgroundColor: whiteLabelCss.background?.primary || '#0F1117'
    };
    
    console.log('🔵 [Login] Applying background style:', styles);
    return styles;
  };

  const getInputStyle = () => {
    if (isHostBuddyDomain || !whiteLabelCss) {
      return {};
    }
    
    const styles = {
      backgroundColor: whiteLabelCss.background?.input || '#0F1117',
      color: whiteLabelCss.text?.primary || '#FFFFFF',
      borderColor: whiteLabelCss.borders?.inactive || '#013280',
      borderWidth: '1px',
      borderStyle: 'solid'
    };
    
    console.log('🔵 [Login] Applying input style:', styles);
    return styles;
  };

  const getInputFocusStyle = () => {
    if (isHostBuddyDomain || !whiteLabelCss) {
      return {};
    }
    
    return {
      backgroundColor: whiteLabelCss.background?.input || '#0F1117',
      color: whiteLabelCss.text?.primary || '#FFFFFF',
      borderColor: whiteLabelCss.borders?.active || whiteLabelCss.components?.primary || '#0066FF',
      outline: 'none',
      boxShadow: `0 0 0 2px ${whiteLabelCss.borders?.active || whiteLabelCss.components?.primary || '#0066FF'}33`
    };
  };

  console.log('🔵 [Login] Rendering login page with:', {
    isHostBuddyDomain,
    logoUrl,
    authImageUrl: authImageUrl || 'hidden',
    showAuthImage: !!authImageUrl,
    hasCss: !!whiteLabelCss
  });

  return (
    <div className="login auth" style={getBackgroundStyle()}>
      <Helmet>
        <title>Login – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/login" />
      </Helmet>
      <Container>
        <div className="row">
          {/* Only show auth image column if we have an image to display */}
          {authImageUrl && (
            <div className="col-lg-6">
              <div className="auth-img blur-background-top-right blur-background-bottom-left">
                <img src={authImageUrl} alt="auth-img" />
              </div>
            </div>
          )}
          <div className={authImageUrl ? "col-lg-6" : "col-lg-12"}>
            <div className="login-content auth-content">
              {/* 🔒 CRITICAL: Only render logo if available (white-label) or if HostBuddy domain */}
              {logoUrl ? (
                <Link to="/" className="logo">
                  <img src={logoUrl} alt="logo" />
                </Link>
              ) : (
                <div className="logo-skeleton" style={{
                  width: '200px',
                  height: '60px',
                  backgroundColor: '#e0e0e0',
                  borderRadius: '8px',
                  margin: '0 auto 30px',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }} />
              )}
              <div className="auth-form">
                <h2 style={!isHostBuddyDomain && whiteLabelCss ? { color: whiteLabelCss.text?.primary } : {}}>Welcome Back!</h2>
                <p>
                  Don’t have an account? <Link to="/signup">Sign up</Link>
                </p>
                <form action="" onSubmit={handleSubmit( (data) => { onSubmit(data); } )}>
                  <div className="input-container">
                    <input 
                      type="text" 
                      {...register("email", { required: true })} 
                      placeholder="Email..."
                      style={getInputStyle()}
                    />
                  </div>
                  {errors.email?.type === "required" &&
                    <>{ErrorMessageShow("Please enter your email")}</>
                  }
                  <div className="input-container">
                    <div className="password-box">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Password..." 
                        {...register("password", { required: true })}
                        style={getInputStyle()}
                      />
                      <button type="button" className="eye-btn" onClick={() => { setShowPassword(!showPassword); }} style={{ cursor: "pointer" }}>
                        {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>

                  </div>
                  {errors.password?.type === "required" && (
                    <span className="text-danger ms-3">
                      Please enter your password{" "}
                    </span>
                  )}
                  <div className="input-container d-flex align-items-center justify-content-between">
                    <div className="form-check remember">
                      <input type="checkbox" className="form-check-input" id="login_remember" {...register("login_remember")}/>
                      <label className="form-check-label" htmlFor="login_remember">Remember me</label>
                    </div>
                    <Link className="forgot_pass" to="/forgot">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="input-container">
                    <PrimaryButton text={!loginLoading ? "Log In" : <Loader />} additionalClass="w-100"/>
                  </div>
                </form>
              </div>
              <div className="footer-auth">
                <div>
                  By continuing, you agree to the{" "}
                  <a href="/termsof-service" target="_blank">Terms of Service</a> and{" "}
                  <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
