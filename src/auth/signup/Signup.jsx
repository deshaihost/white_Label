import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/Container";
import AuthImage from "../../public/img/auth_left_img.png";
import Logo from "../../public/img/footer-logo.webp";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PrimaryButton from "../../component/button/button";
import "../auth.css";
import { Helmet } from "react-helmet";
//new code
import { useForm } from "react-hook-form";
import { registerActions } from "../../redux/auth/register/actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../helper/Loader";
import { stateEmptyActions } from "../../redux/stateEmpty/actions";
import { useNavigate } from "react-router-dom";
import ToastHandle from "../../helper/ToastMessage";
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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("newPassword", "");

  const onSubmit = (data) => {
    dispatch(
      registerActions({
        email: data.email,
        password: data.newPassword,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.plan,
      })
    );
  };
  
  useEffect(() => {
    if (status === 400) {
      dispatch(stateEmptyActions());
      ToastHandle(data?.error, "danger");
    } else if (status === 409) {
      dispatch(stateEmptyActions());
      ToastHandle(data?.error, "danger");
    } else if (registerUserStatus === 201) {
      navigate('/login');
      ToastHandle(registerUserMessage, "success");
      dispatch(stateEmptyActions());
    }
  }, [status, registerUserStatus]);

  return (
    <div className="signup auth">
      <Helmet>
        <title>Sign Up – Hostbuddy</title>
      </Helmet>
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-img">
              <img src={AuthImage} alt="auth-img" />
              <div className="auth-chat">
                <p>
                  "I've been using HostBuddy for a while now, and it has
                  completely transformed the way I engage with my customers.
                  Their chatbot solutions are top-notch, and the support team is
                  fantastic.”
                </p>
                <h4>John Smith</h4>
                <h6>CEO of TechSolutions Inc</h6>
              </div>
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
                    />
                  </div>
                  {errors.firstName?.type === "required" && (
                    <span className="text-danger">Please enter your name </span>
                  )}
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("lastName", { required: true })}
                      placeholder="Last Name..."
                    />
                  </div>
                  {errors.lastName?.type === "required" && (
                    <span className="text-danger">
                      {" "}
                      Please enter your name{" "}
                    </span>
                  )}
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("email", {
                        required: true,
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email..."
                    />
                  </div>
                  {errors.email?.type === "required" && (
                    <span className="text-danger">
                      Please enter your email{" "}
                    </span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span className="text-danger">{errors.email?.message}</span>
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
                            message:
                              "Mix it up! Use a combination of uppercase and lowercase letters, special characters (!$@%) in your password ",
                          },
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long!",
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
                      <span className="text-danger">Please enter password</span>
                    )}
                    {errors?.newPassword?.type === "pattern" && (
                      <span className="text-danger">
                        {errors?.newPassword?.message}
                      </span>
                    )}
                    {errors?.newPassword?.type === "minLength" && (
                      <span className="text-danger">
                        {errors?.newPassword?.message}
                      </span>
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
                            "password doesn't match ",
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
                      <span className="text-danger">This field Required</span>
                    )}
                    {errors?.confirmPassword?.type === "validate" && (
                      <span className="text-danger">
                        {errors?.confirmPassword?.message}
                      </span>
                    )}
                  </div>
                  <div className="input-container">
                    <input
                      type="text"
                      {...register("phone", {
                        required: true,
                        pattern: /^[0-9]{10}$/,
                      })}
                      placeholder="Phone..."
                      maxLength="10"
                    />
                  </div>
                  {errors.phone?.type === "required" && (
                    <span className="text-danger">
                      Please enter your phone number
                    </span>
                  )}
                  {errors.phone?.type === "pattern" && (
                    <span className="text-danger">
                      Please enter a valid phone number
                    </span>
                  )}
                  {/* <div className="input-container">
                    <select
                      name=""
                      id=""
                      {...register("plan", { required: true })}
                    >
                      <option value="" default>
                        Select Plan
                      </option>
                      <option value="essentials">The Essentials</option>
                      <option value="work">The Works</option>
                    </select>
                  </div>
                  {errors.plan?.type === "required" && (
                    <span className="text-danger">Please select one plan</span>
                  )} */}
                  <div className="input-container">
                    <PrimaryButton
                      text={!registerLoading ? "Register" : <Loader />}
                      additionalClass="w-100"
                    />
                  </div>
                </form>
              </div>
              <div className="footer-auth">
                <div>
                  By Continue, you agree to the{" "}
                  <Link to="/">terms & Conditions</Link> and{" "}
                  <Link to="/">Privacy Policy</Link>
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
