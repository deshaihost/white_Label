import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PrimaryButton from "../../component/button/button";
import "../auth.css";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import { useLocation, useNavigate } from "react-router-dom";

//import Logo from "../../public/img/logo_footer.png";
const Logo = 'https://hostbuddylb.com/logo/logo_footer.webp';
const AuthImage = 'https://hostbuddylb.com/home-new/_Signup.webp';

const ResetPass = () => {
  const navigate = useNavigate();
  const [resetApiLoading, setResetApiLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);

  // Get the "token" query param
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  const callResetPasswordApi = async (email_addr, new_pass, token) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const dataToSend = { email: email_addr, new_password: new_pass, token: token };
    setResetApiLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post( `${baseUrl}/reset_password`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setPasswordResetSuccessful(true);
      } else {
        ToastHandle(response?.data?.error, "danger");
      }
    } catch (error) {
      ToastHandle(error, "danger");
    } finally {
      setResetApiLoading(false);
    }
  }

  const onSubmit = (data) => {
    callResetPasswordApi(data.email, data.newPassword, token);
  };

  // Upon successful reset: wait 1 second, then redirect to the login page
  useEffect(() => {
    if (passwordResetSuccessful) {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    }
  }, [passwordResetSuccessful, navigate]);

  return (
    <div className="signup auth">
      <Helmet>
        <title>Reset Password – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/reset-password" />
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
                <h2>Reset Password</h2>

                {/* Only show the form if "token" is specified in the URL param */}
                {token ? (
                
                  <form action="" onSubmit={handleSubmit( (data) => { onSubmit(data); },
                      (err) => { console.log(err, "ee"); }
                    )}
                  >
                    {errors.firstName?.type === "required" && (
                      <>
                        {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_NAME)}
                      </>
                    )}
                    {errors.lastName?.type === "required" && (
                      <>
                        {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME )}
                      </>
                    )}
                    <div className="input-container">
                      <input
                        type="text"
                        {...register("email", {
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: `${ErrorMessageKey.INVALID_EMAIL_ADDRESS}`,
                          },
                        })}
                        placeholder="Email..."
                      />
                    </div>
                    {errors.email?.type === "required" && (
                      <>
                        {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL )}
                      </>
                    )}
                    {errors.email?.type === "pattern" && (
                      <>{ErrorMessageShow(errors.email?.message)}</>
                    )}
                    <div className="input-container">
                      <div className="password-box">
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="New Password..."
                          {...register("newPassword", {
                            required: true,
                            pattern: {
                              value:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,30}$/,
                              message: `${ErrorMessageKey.MIX_IT_UP_USE_A_COMBINATION_OF_UPPERCASE_AND_LOWERCASE_LETTERS_SPECIAL_CHARACTERS_IN_YOUR}`,
                            },
                            minLength: {
                              value: 8,
                              message: `${ErrorMessageKey.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTER_LONG}`,
                            },
                            maxLength: 30,
                          })}
                        />
                        <button type="button" className="eye-btn" onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                          style={{ cursor: "pointer" }}
                        >
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
                      <p className="password-criteria">
                        Password should have special characters like $,@,%,! and minimum 8 length.
                      </p>
                    </div>
                    <div className="input-container">
                      <div className="password-box">
                        <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm New Password..." {
                            ...register("confirmPassword", {
                              required: true,
                              validate: (value) =>
                                value === password.current ||
                                ErrorMessageKey.PASSWORD_DOESNT_MATCH,
                          })}
                        />
                        <button type="button" className="eye-btn" style={{ cursor: "pointer" }} onClick={() => {
                            setShowConfirmPassword(!showConfirmPassword);
                          }}
                        >
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
                    {errors.phone?.type === "required" && (
                      <>{ErrorMessageShow("Please enter your phone number")}</>
                    )}
                    {errors.phone?.type === "pattern" && (
                      <>{ErrorMessageShow("Please enter a valid phone number")}</>
                    )}
                    <div className="input-container">
                      <PrimaryButton text={!resetApiLoading ? "Set New Password" : <Loader />} additionalClass="w-100" disableType={resetApiLoading} />
                    </div>
                  </form>
                ) : (
                  <div className="alert alert-danger">
                    <p>Invalid or expired reset link.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResetPass;
