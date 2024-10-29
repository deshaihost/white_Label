import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PrimaryButton from "../../component/button/button";
import "../auth.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Loader from "../../helper/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import ToastHandle from "../../helper/ToastMessage";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import { APICore, setAuthorization } from '../../helper/apiCore';
import axios from "axios";

//import Logo from "../../public/img/logo_footer.png";
const Logo = 'https://hostbuddylb.com/logo/logo_footer.webp';
const AuthImage = 'https://hostbuddylb.com/home-new/_Signup.webp';

const InviteSignup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [invitationData, setInvitationData] = useState({});

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  const { email, invited_by, account_already_exists } = invitationData;
  console.log(email, ',', invited_by, ',', account_already_exists);

  // Get the invite code from the query param
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const inviteCode = queryParams.get('code');

  const onSubmit = async (data) => {
    // Confirmation window if the user already has an account
    let userConfirmed
    if (account_already_exists) {
      userConfirmed = window.confirm(`WARNING: Accepting this invitation will create a new account in ${invited_by}'s team. If you have an existing account, you will lose access to it. Are you sure you want to continue?`);
    } else {
      userConfirmed = true
    }
    if (!userConfirmed) { return; }

    // Call the API to accept the invitation, then redirect to the getstarted page
    const acceptSuccess = await callAcceptInvitationApi(data.newPassword, data.firstName, data.lastName);
    if (acceptSuccess) { navigate("/getstarted"); }
  };

  const [inputSpaceValidation, setInputSpaceValidation] = useState({ firstName: "", lastName: ""});
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

  const callGetInvitationDataApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get(`${baseUrl}/get_email_from_invitation_code?code=${inviteCode}`, config);

      if (response.status === 200) {
        setInvitationData(response?.data); // email, invited_by, account_already_exists
      } else {
        ToastHandle(response.data.error, "danger");
      }
    }
    catch (error) { ToastHandle("Failed to get invitation data", "danger"); }
  }

  const callAcceptInvitationApi = async (password, firstName, lastName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setAcceptLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const body_data = { password:password, code:inviteCode, first_name:firstName, last_name:lastName };
      const response = await axios.post(`${baseUrl}/accept_invitation`, body_data, config);

      if (response.status === 200) {
        ToastHandle('Invitation Accepted!', 'success');
        const userData = { // this is how the data is saved in the login logic. Most of these fields are gibberish and surely unused, but copy them anyway just to be safe
          data: "userData", id: 1, password: "test", lastName: "User", role: "userRole",
          token: response.data.access_token, refreshToken: response.data.refresh_token,
        };

        // Save the token. This is copied from saga.js in src/redux/auth/login (it's what the login flow uses to save the token)
        const api = new APICore();
        api.setLoggedInUser(userData);
        setAuthorization(userData.token);

        return true;
      } else {
        ToastHandle(response?.data?.error, "danger");
        return false;
      }
    }
    catch (error) { ToastHandle("Failed to accept invitation", "danger"); }
    finally { setAcceptLoading(false); }
    return false;
  }

  // When the page loads, call the API to get invitation data
  useEffect(() => {
    callGetInvitationDataApi();
  }, []);


  return (
    <div className="signup auth">
      <Helmet>
        <title>Sign Up – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/signup" />
      </Helmet>
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-img">
              <img src={AuthImage} alt="auth-img" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="signup-content auth-content">
              <Link to="/" className="logo">
                <img src={Logo} alt="logo" />
              </Link>
              <div className="auth-form">
                <h2>Accept Team Invitation</h2>
                <form action="" onSubmit={handleSubmit( (data) => { onSubmit(data); } )}>

                  <div className="input-container">
                    <input type="text" placeholder="Email..." value={email} disabled={true}/>
                  </div>

                  <div className="input-container">
                    <input type="text" {...register("firstName", { required:true })} placeholder="First Name..." value={inputSpaceValidation?.firstName} onInput={(e) => { firstNameSpaceHandle(e); }}/>
                  </div>
                  {errors.firstName?.type === "required" && (ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_NAME))}

                  <div className="input-container">
                    <input type="text" {...register("lastName", { required:false })} placeholder="Last Name..." value={inputSpaceValidation?.lastName} onInput={(e) => { lastNameSpaceHandle(e) }}/>
                  </div>
                  {errors.lastName?.type === "required" && ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME)}

                  {errors.email?.type === "required" && (ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL))}
                  {errors.email?.type === "pattern" && (ErrorMessageShow(errors.email?.message))}

                  <div className="input-container">
                    <div className="password-box">
                      <input type={showPassword ? "text" : "password"} placeholder="Password..."
                        {...register("newPassword", { required: true, pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,30}$/,
                            message: `${ErrorMessageKey.MIX_IT_UP_USE_A_COMBINATION_OF_UPPERCASE_AND_LOWERCASE_LETTERS_SPECIAL_CHARACTERS_IN_YOUR}`,
                          },
                          minLength: { value: 8, message: `${ErrorMessageKey.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTER_LONG}` }, maxLength: 30
                        })}
                      />
                      <button type="button" className="eye-btn" style={{ cursor: "pointer" }} onClick={() => { setShowPassword(!showPassword); }}>
                        {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                    {errors?.newPassword?.type === "required" && (ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_PASSWORD ))}
                    {errors?.newPassword?.type === "pattern" && (ErrorMessageShow(errors?.newPassword?.message))}
                    {errors?.newPassword?.type === "minLength" && (ErrorMessageShow(errors?.newPassword?.message))}
                    <p className="password-criteria">Password should have special characters like $,@,%,! and minimum 8 length.</p>
                  </div>

                  <div className="input-container">
                    <div className="password-box">
                      <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password..."
                        {...register("confirmPassword", { required: true, validate: (value) => value === password.current || ErrorMessageKey.PASSWORD_DOESNT_MATCH })}
                      />
                      <button type="button" className="eye-btn" style={{ cursor: "pointer" }} onClick={() => { setShowConfirmPassword(!showConfirmPassword); }}>
                        {!showConfirmPassword ? ( <FaRegEye /> ) : ( <FaRegEyeSlash /> )}
                      </button>
                    </div>
                    {errors?.confirmPassword?.type === "required" && (ErrorMessageShow(ErrorMessageKey.THIS_FIELD_REQUIRED))}
                    {errors?.confirmPassword?.type === "validate" && (ErrorMessageShow(errors?.confirmPassword?.message))}
                  </div>

                  <div className="input-container" style={{display:"none"}}>
                    <input type="text" {...register("phone", { pattern: /^[0-9]{10}$/, })} placeholder="Phone (optional) ..." maxLength="10" />
                  </div>
                  {errors.phone?.type === "pattern" && (ErrorMessageShow("Please enter a valid phone number"))}

                  <div className="input-container">
                    <PrimaryButton text={!acceptLoading ? "Join Team" : <Loader />} additionalClass={`w-100`} disableType={acceptLoading}/>
                  </div>
                  {loginLoading && (
                    <div className="text-center border pill text-success py-2">Redirecting...</div>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default InviteSignup;
