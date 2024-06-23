import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import AuthImage from "../../public/img/Sign_Up_Page.jpg";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PrimaryButton from "../../component/button/button";
import "../auth.css";
import { Helmet } from "react-helmet";
//new code
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

//import Logo from "../../public/img/logo_footer.png";
const Logo = 'https://hostbuddylb.com/logo/logo_footer.webp';

const Signup = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, status } = store?.registerReducer?.register
    ? store?.registerReducer?.register
    : [];
  const registerLoading = store?.registerReducer?.loading;
  const registerUserMessage = store?.registerReducer?.register?.data?.message;
  const registerUserStatus = store?.registerReducer?.register?.status;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailEntered, setEmailEntered] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (data) => {
    setEmailEntered(data.email);
    dispatch(
      registerActions({ email: data.email, password: data.newPassword, first_name: data.firstName, last_name: data.lastName, phone: data.phone })
    );
    setInputData({
      email: data.email,
      password: data.newPassword,
    });
  };
  // this functionality is space not allow in input
  const [inputSpaceValidation, setInputSpaceValidation] = useState({
    firstName: "",
    lastName: "",
  });
  const firstNameSpaceHandle = (event) => {
    const trimmedValue = event.target.value.trim();
    const regex = /^[a-zA-Z]*$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setInputSpaceValidation({
        ...inputSpaceValidation,
        firstName: trimmedValue,
      });
      setValue("firstName", trimmedValue);
    }
  };
  const lastNameSpaceHandle = (event) => {
    const trimmedValue = event.target.value.trim();
    const regex = /^[a-zA-Z]*$/;
    if (event.target.value === "" || regex.test(event.target.value)) {
      setInputSpaceValidation({
        ...inputSpaceValidation,
        lastName: trimmedValue,
      });
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
      loginActions({
        email: inputData.email,
        password: inputData.password,
      })
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
                <h2>Try HostBuddy Today!</h2>
                <p>
                  Already have an account? <Link to="/login">Sign in here</Link>
                </p>
                <form
                  action=""
                  onSubmit={handleSubmit(
                    (data) => {
                      onSubmit(data);
                    },
                    (err) => {
                      console.log(err, "ee");
                    }
                  )}
                >
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("firstName", { required: true })}
                      placeholder="First Name..."
                      value={inputSpaceValidation?.firstName}
                      onInput={(e) => {
                        firstNameSpaceHandle(e);
                      }}
                    />
                  </div>
                  {errors.firstName?.type === "required" && (
                    <>
                      {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_NAME)}
                    </>
                  )}
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      placeholder="Last Name..."
                      value={inputSpaceValidation?.lastName}
                      onInput={(e) => { lastNameSpaceHandle(e) }}
                    />
                  </div>
                  {errors.lastName?.type === "required" && (
                    <>
                      {ErrorMessageShow(
                        ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME
                      )}
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
                      {ErrorMessageShow(
                        ErrorMessageKey.PLEASE_ENTER_YOUR_EMAIL
                      )}
                    </>
                  )}
                  {errors.email?.type === "pattern" && (
                    <>{ErrorMessageShow(errors.email?.message)}</>
                  )}
                  <div className="input-container">
                    <div className="password-box">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password..."
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
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                    </div>
                    {errors?.newPassword?.type === "required" && (
                      <>
                        {ErrorMessageShow(
                          ErrorMessageKey.PLEASE_ENTER_YOUR_PASSWORD
                        )}
                      </>
                    )}
                    {errors?.newPassword?.type === "pattern" && (
                      <>{ErrorMessageShow(errors?.newPassword?.message)}</>
                    )}
                    {errors?.newPassword?.type === "minLength" && (
                      <>{ErrorMessageShow(errors?.newPassword?.message)}</>
                    )}
                    <p className="password-criteria">
                      Password should have special characters like $,@,%,! and
                      minimum 8 length.
                    </p>
                  </div>
                  <div className="input-container">
                    <div className="password-box">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password..."
                        {...register("confirmPassword", {
                          required: true,
                          validate: (value) =>
                            value === password.current ||
                            ErrorMessageKey.PASSWORD_DOESNT_MATCH,
                        })}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() => {
                          setShowConfirmPassword(!showConfirmPassword);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {!showConfirmPassword ? (
                          <FaRegEye />
                        ) : (
                          <FaRegEyeSlash />
                        )}
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
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("phone", {
                        pattern: /^[0-9]{10}$/,
                      })}
                      placeholder="Phone (optional) ..."
                      maxLength="10"
                    />
                  </div>
                  {errors.phone?.type === "required" && (
                    <>{ErrorMessageShow("Please enter your phone number")}</>
                  )}
                  {errors.phone?.type === "pattern" && (
                    <>{ErrorMessageShow("Please enter a valid phone number")}</>
                  )}
                  <div className="input-container">
                    <PrimaryButton
                      text={!registerLoading ? "Register" : <Loader />}
                      additionalClass="w-100"
                      disableType={registerLoading}
                    />
                  </div>
                  {loginLoading && (
                    <div className="text-center border pill text-success py-2">
                      Redirecting...
                    </div>
                  )}
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

export default Signup;
