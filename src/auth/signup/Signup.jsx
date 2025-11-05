import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link, useLocation } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PrimaryButton from "../../component/button/button";
import "../auth.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { registerActions } from "../../redux/auth/register/actions";
import { loginActions } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../helper/Loader";
import { stateEmptyActions } from "../../redux/stateEmpty/actions";
import { useNavigate } from "react-router-dom";
import ToastHandle from "../../helper/ToastMessage";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import { getLogo, getCssConfig } from "../../pages/settings/settingContants/whiteLabel/whiteLabelServices";

// Default images for HostBuddy domain
const DefaultLogo = 'https://hostbuddylb.com/logo/logo_footer.webp';

// Add dynamic styles to document head for pseudo-elements
const addDynamicStyles = (css) => {
  const styleId = 'white-label-signup-styles';
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
    .signup.auth input::placeholder {
      color: ${placeholderColor} !important;
      opacity: 0.7;
    }
    
    .signup.auth input:focus {
      border-color: ${focusBorderColor} !important;
      box-shadow: 0 0 0 2px ${focusShadowColor} !important;
      outline: none !important;
    }
    
    .signup.auth .password-box input::placeholder {
      color: ${placeholderColor} !important;
      opacity: 0.7;
    }
    
    .signup.auth .password-box input:focus {
      border-color: ${focusBorderColor} !important;
      box-shadow: 0 0 0 2px ${focusShadowColor} !important;
      outline: none !important;
    }
    
    .signup.auth a {
      color: ${linkColor} !important;
    }
    
    .signup.auth a:hover {
      color: ${linkColor} !important;
      opacity: 0.8;
    }
  `;
};
const DefaultAuthImage = 'https://hostbuddylb.com/home-new/_Signup.webp';

const Signup = () => {
  console.log('🟢 [Signup] Component rendering');
  
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Added to access query parameters
  const { data, status } = store?.registerReducer?.register ? store?.registerReducer?.register : [];
  const registerLoading = store?.registerReducer?.loading;
  const registerUserMessage = store?.registerReducer?.register?.data?.message;
  const registerUserStatus = store?.registerReducer?.register?.status;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailEntered, setEmailEntered] = useState("");
  const [hasAgreedToTerms, setHasAgreedToTerms] = useState(false);

  // White-label logo states
  const [whiteLabelLogos, setWhiteLabelLogos] = useState(null);
  const [isLoadingLogos, setIsLoadingLogos] = useState(true);
  const [isHostBuddyDomain, setIsHostBuddyDomain] = useState(true);

  // White-label CSS states
  const [whiteLabelCss, setWhiteLabelCss] = useState(null);
  const [isLoadingCss, setIsLoadingCss] = useState(true);

  // State for discount code field behavior
  const [isDiscountFieldVisible, setIsDiscountFieldVisible] = useState(false);
  const [isDiscountFieldEditable, setIsDiscountFieldEditable] = useState(false);
  const [partnerValue, setPartnerValue] = useState(""); // If partner is specified in the URL, send that value to the backend to be stored with the newly created user data

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  const [inputData, setInputData] = useState({ email: "", password: "" });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const discountCodeQuery = queryParams.get("discount_code");
    const allowDiscountQuery = queryParams.get("allow_discount");
    const partnerQuery = queryParams.get("partner");

    if (discountCodeQuery) {
      setIsDiscountFieldVisible(true);
      setIsDiscountFieldEditable(false);
      setValue("discountCode", discountCodeQuery);
    } else if (allowDiscountQuery) {
      setIsDiscountFieldVisible(true);
      setIsDiscountFieldEditable(true);
      setValue("discountCode", "");
    } else {
      setIsDiscountFieldVisible(false);
      // Optionally clear the value if the field is hidden
      // setValue("discountCode", undefined); 
    }

    if (partnerQuery) {
      setPartnerValue(partnerQuery);
    }
  }, [location.search, setValue]);

  // Check domain and fetch white-label logos if needed
  useEffect(() => {
    const currentDomain = window.location.hostname;
    const isMainDomain = currentDomain === 'hostbuddy.ai' || currentDomain === 'www.hostbuddy.ai';
    
    console.log('🟢 [Signup] Domain check:', {
      currentDomain,
      isMainDomain,
      timestamp: new Date().toISOString()
    });
    
    setIsHostBuddyDomain(isMainDomain);
    
    if (!isMainDomain) {
      console.log('🟢 [Signup] White-label domain detected, fetching logos and CSS...');
      fetchWhiteLabelLogos(currentDomain);
      fetchWhiteLabelCss(currentDomain);
    } else {
      console.log('🟢 [Signup] HostBuddy domain, using default logos and CSS');
      setIsLoadingLogos(false);
      setIsLoadingCss(false);
    }
  }, []);

  // Fetch white-label logos using get_logo endpoint
  const fetchWhiteLabelLogos = async (domain) => {
    try {
      console.log('🟢 [Signup] Calling getLogo API for domain:', domain);
      
      const response = await getLogo({ domain });

      console.log('🟢 [Signup] API response:', {
        success: response.success,
        hasData: !!response.data
      });

      if (response.success && response.data) {
        console.log('🟢 [Signup] API response data:', {
          domain_name: response.data.domain_name,
          logos_count: response.data.logos_count,
          has_logo: !!response.data.logos_available?.logo,
          has_full_logo: !!response.data.logos_available?.full_logo,
          full_logo_url: response.data.logos_available?.full_logo?.url
        });

        setWhiteLabelLogos(response.data.logos_available);
      } else {
        console.error('🟢 [Signup] Failed to fetch white-label logos:', response.error);
        setWhiteLabelLogos(null);
      }
    } catch (error) {
      console.error('🟢 [Signup] Error fetching white-label logos:', error);
      setWhiteLabelLogos(null);
    } finally {
      setIsLoadingLogos(false);
      console.log('🟢 [Signup] Logo loading complete');
    }
  };

  // Fetch white-label CSS configuration
  const fetchWhiteLabelCss = async (domain) => {
    try {
      console.log('🟢 [Signup] Calling getCssConfig API for domain:', domain);
      
      const response = await getCssConfig({ domain });

      console.log('🟢 [Signup] CSS API response:', {
        success: response.success,
        hasData: !!response.data
      });

      if (response.success && response.data) {
        console.log('🟢 [Signup] CSS API response data:', {
          branding_name: response.data.Branding_name,
          has_css_data: !!response.data.css_data,
          primary_bg: response.data.css_data?.background?.primary,
          secondary_bg: response.data.css_data?.background?.secondary
        });

        setWhiteLabelCss(response.data.css_data);
        // Apply dynamic styles for pseudo-elements
        addDynamicStyles(response.data.css_data);
      } else {
        console.error('🟢 [Signup] Failed to fetch white-label CSS:', response.error);
        setWhiteLabelCss(null);
      }
    } catch (error) {
      console.error('🟢 [Signup] Error fetching white-label CSS:', error);
      setWhiteLabelCss(null);
    } finally {
      setIsLoadingCss(false);
      console.log('🟢 [Signup] CSS loading complete');
    }
  };

  // Get the appropriate logo and auth image based on domain
  // CRITICAL: White-label domains must NEVER show default HostBuddy logo
  const getLogoUrl = () => {
    if (isHostBuddyDomain) {
      console.log('🟢 [Signup] Using default logo for HostBuddy domain');
      return DefaultLogo;
    }
    
    // Return null if no white-label logo available - skeleton loader will show instead
    const logoUrl = whiteLabelLogos?.full_logo?.url || whiteLabelLogos?.logo?.url || null;
    console.log('🟢 [Signup] Using white-label logo:', logoUrl || 'null (skeleton will show)');
    return logoUrl;
  };

  const getAuthImageUrl = () => {
    if (isHostBuddyDomain) {
      console.log('🟢 [Signup] Using default auth image for HostBuddy domain');
      return DefaultAuthImage;
    }
    
    // For white-label domains, use full_logo for auth image or hide it
    const authImageUrl = whiteLabelLogos?.full_logo?.url || null;
    console.log('🟢 [Signup] Using white-label auth image:', authImageUrl || 'none (hidden)');
    return authImageUrl;
  };

  const onSubmit = (data) => {
    setEmailEntered(data.email);
    const payload = { 
      email: data.email, 
      password: data.newPassword, 
      first_name: data.firstName, 
      last_name: data.lastName, 
      phone: data.phone,
      hear_about_us: data.hear_about_us
    };

    if (isDiscountFieldVisible) {
      payload.discount_code = data.discountCode;
    }

    if (partnerValue) {
      payload.partner = partnerValue;
    }

    dispatch(
      registerActions(payload)
    );
    setInputData({email: data.email, password: data.newPassword});
  };

  // this functionality is space not allow in input
  const [inputSpaceValidation, setInputSpaceValidation] = useState({firstName:"", lastName:""});
  const firstNameSpaceHandle = (event) => {
    const trimmedValue = event.target.value.trim();
    const regex = /^[a-zA-Z]*$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setInputSpaceValidation({...inputSpaceValidation, firstName: trimmedValue});
      setValue("firstName", trimmedValue);
    }
  };

  const lastNameSpaceHandle = (event) => {
    const trimmedValue = event.target.value.trim();
    const regex = /^[a-zA-Z]*$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setInputSpaceValidation({...inputSpaceValidation, lastName: trimmedValue});
      setValue("lastName", trimmedValue);
    }
  };
  // this functionality is space not allow in input

  // this functionaly used after register
  const loginStatus = store?.loginReducer?.login?.status;
  const loginMessage = store?.loginReducer?.login?.message;
  const [loginLoading, setLoginLoading] = useState(false);
  const afterRegisterLogin = () => {
    dispatch(
      loginActions({email: inputData.email, password: inputData.password})
    );
  };
  
  useEffect(() => {
    if (loginStatus === 401) {
      ToastHandle(loginMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (loginStatus === 200) {
      navigate("/dashboard");
      dispatch(stateEmptyActions());
    } else if (loginStatus === 202) { // credentials good, but user hasn't confirmed email yet. Backend will not provide tokens until email is confirmed
      localStorage.setItem('loginEmailEntered', emailEntered); // this nees to be accessible on the confirm-email page
      navigate('/confirm-email')
      dispatch(stateEmptyActions());
    }
  }, [loginStatus]);
  // this functionaly used after register

  useEffect(() => {
    if (status === 400) {
      dispatch(stateEmptyActions());
      ToastHandle(data?.error, "danger");
    } else if (status === 409) {
      dispatch(stateEmptyActions());
      ToastHandle(data?.error, "danger");
    } else if (registerUserStatus === 201) {
      afterRegisterLogin();
      setLoginLoading(true);
      ToastHandle(registerUserMessage, "success");
      dispatch(stateEmptyActions());
    }
  }, [status, registerUserStatus]);

  // Show loader while fetching white-label logos and CSS (prevents flash of default logo/styles)
  if (isLoadingLogos || isLoadingCss) {
    console.log('🟢 [Signup] Showing loader while fetching logos and CSS (preventing flash)');
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
    
    console.log('🟢 [Signup] Applying background style:', styles);
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
    
    console.log('🟢 [Signup] Applying input style:', styles);
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

  console.log('🟢 [Signup] Rendering signup page with:', {
    isHostBuddyDomain,
    logoUrl,
    authImageUrl: authImageUrl || 'hidden',
    showAuthImage: !!authImageUrl,
    hasCss: !!whiteLabelCss
  });

  return (
    <div className="signup auth" style={getBackgroundStyle()}>
      <Helmet>
        <title>Sign Up – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/signup" />
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
            <div className="signup-content auth-content">
              {/* <Link to="/" className="logo1">
                <img src={Logo} alt="logo"  />
              </Link> */}
              <div className="auth-form">
                <h2 style={!isHostBuddyDomain && whiteLabelCss ? { color: whiteLabelCss.text?.primary } : {}}>Create An Account</h2>
                <p>Already have an account? <Link to="/login">Sign in here</Link></p>
                <form action="" onSubmit={handleSubmit( (data) => { onSubmit(data); } )}>

                  <div className="input-container">
                    <input type="text" {...register("firstName", { required: false })} placeholder="First Name..." value={inputSpaceValidation?.firstName} onInput={(e) => { firstNameSpaceHandle(e); }} style={getInputStyle()}/>
                  </div>
                  {errors.firstName?.type === "required" && (
                    <>
                      {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_NAME)}
                    </>
                  )}

                  <div className="input-container">
                    <input type="text" {...register("lastName", { required: false })} placeholder="Last Name..." value={inputSpaceValidation?.lastName} onInput={(e) => { lastNameSpaceHandle(e) }} style={getInputStyle()}/>
                  </div>
                  {errors.lastName?.type === "required" && (
                    <>
                      {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME)}
                    </>
                  )}

                  <div className="input-container">
                    <input type="text" placeholder="Email..." {...register("email", {
                        required: true,
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: `${ErrorMessageKey.INVALID_EMAIL_ADDRESS}` },
                      })}
                      style={getInputStyle()}
                    />
                  </div>
                  {errors.email?.type === "required" && (
                    <>
                      {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL)}
                    </>
                  )}
                  {errors.email?.type === "pattern" && (
                    <>{ErrorMessageShow(errors.email?.message)}</>
                  )}

                  <div className="input-container">
                    <div className="password-box">
                      <input type={showPassword ? "text" : "password"} placeholder="Password..."
                        {...register("newPassword", { required: true, pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,300}$/,
                            message: `${ErrorMessageKey.MIX_IT_UP_USE_A_COMBINATION_OF_UPPERCASE_AND_LOWERCASE_LETTERS_SPECIAL_CHARACTERS_IN_YOUR}`,
                          },
                          minLength: { value: 8, message: `${ErrorMessageKey.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTER_LONG}` }, maxLength: 300
                        })}
                        style={getInputStyle()}
                      />
                      <button type="button" className="eye-btn" style={{ cursor: "pointer" }} onClick={() => { setShowPassword(!showPassword); }}>
                        {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                    {errors?.newPassword?.type === "required" && (
                      <>
                        {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_PASSWORD )}
                      </>
                    )}
                    {errors?.newPassword?.type === "pattern" && (
                      <>{ErrorMessageShow(errors?.newPassword?.message)}</>
                    )}
                    {errors?.newPassword?.type === "minLength" && (
                      <>{ErrorMessageShow(errors?.newPassword?.message)}</>
                    )}
                    {errors?.newPassword?.type === "maxLength" && (
                      <>{ErrorMessageShow("Password is too long.")}</>
                    )}
                    <p className="password-criteria">Password should have special characters like $,@,%,! and minimum 8 length.</p>
                  </div>

                  <div className="input-container">
                    <div className="password-box">
                      <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password..."
                        {...register("confirmPassword", { required: true, validate: (value) =>
                            value === password.current || ErrorMessageKey.PASSWORD_DOESNT_MATCH,
                        })}
                        style={getInputStyle()}
                      />
                      <button type="button" className="eye-btn" style={{ cursor: "pointer" }} onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}>
                        {!showConfirmPassword ? ( <FaRegEye /> ) : ( <FaRegEyeSlash /> )}
                      </button>
                    </div>
                    {errors?.confirmPassword?.type === "required" && (
                      <>
                        {ErrorMessageShow(ErrorMessageKey.THIS_FIELD_REQUIRED)}
                      </>
                    )}
                    {errors?.confirmPassword?.type === "validate" && (
                      <>{ErrorMessageShow(errors?.confirmPassword?.message)}</>
                    )}
                  </div>

                  {isDiscountFieldVisible && (
                    <div className="input-container">
                      <input
                        type="text"
                        placeholder="Discount Code..."
                        {...register("discountCode")}
                        readOnly={!isDiscountFieldEditable}
                        style={getInputStyle()}
                      />
                      {/* You can add error handling for discountCode if needed */}
                    </div>
                  )}

                  <div className="input-container">
                    <input type="text" placeholder="How did you hear about us? ..." {...register("hear_about_us")} style={getInputStyle()}/>
                  </div>

                  <div className="input-container footer-auth">
                    <label>
                      <input type="checkbox" checked={hasAgreedToTerms} onChange={(e) => setHasAgreedToTerms(e.target.checked)}/>
                      I agree to the{" "}<a href="/termsof-service" target="_blank">Terms of Service</a>{" "}and{" "}<a href="/privacy-policy" target="_blank">Privacy Policy</a>.
                    </label>
                  </div>

                  <div className="input-container">
                    <PrimaryButton
                      text={!registerLoading ? "Register" : <Loader />}
                      additionalClass={`w-100 ${!hasAgreedToTerms ? 'btn-disabled' : ''}`}
                      disableType={registerLoading || !hasAgreedToTerms}
                      style={{ opacity: hasAgreedToTerms ? 1 : 0.5, pointerEvents: hasAgreedToTerms ? 'auto' : 'none' }}
                    />
                  </div>
                  {loginLoading && (
                    <div className="text-center border pill text-success py-2">Redirecting...</div>
                  )}
                </form>
              </div>

              {/*
              <div className="footer-auth">
                <div>
                  By continuing, you agree to the <a href="/termsofservice" target="_blank">Terms of Service</a> and <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                </div>
              </div>
              */}

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Signup;
