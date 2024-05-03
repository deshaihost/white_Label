import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import AuthImage from "../../public/img/Sign_Up_Page.png";
import Logo from "../../public/img/logo_footer.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../auth.css";
import PrimaryButton from "../../component/button/button";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { loginActions, stateEmptyActions } from "../../redux/actions";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import { useNavigate } from "react-router-dom";
import Authorized from "../../helper/Authorized";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
const Login = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  const [showPassword, setShowPassword] = useState(false);
  const loginStatus = store?.loginReducer?.login?.status;
  const loginMessage = store?.loginReducer?.login?.message;
  const loginLoading = store?.loginReducer?.loading;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      loginActions({
        email: data.email,
        password: data.password,
      })
    );
  };

  useEffect(() => {
    if (loginStatus === 401) {
      ToastHandle(loginMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (loginStatus === 200) {
      navigate('/dashboard')
      dispatch(stateEmptyActions());
    }
  }, [loginStatus]);

  useEffect(() => {
    if (token !== undefined) {
      navigate('/dashboard')
    } else {
      navigate('/login')
    }
  }, [token])

  return (
    <div className="login auth">
      <Helmet>
        <title>Login – Hostbuddy</title>
      </Helmet>
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-img">
              <img src={AuthImage} alt="auth-img" />
              {/* <div className="auth-chat">
                <p>
                  "I've been using HostBuddy for a while now, and it has
                  completely transformed the way I engage with my customers.
                  Their chatbot solutions are top-notch, and the support team is
                  fantastic.”
                </p>
                <h4>John</h4>
                <h6>CEO of TechSolutions Inc</h6>
              </div> */}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="login-content auth-content">
              <Link to="/" className="logo">
                <img src={Logo} alt="logo" />
              </Link>
              <div className="auth-form">
                <h2>Welcome Back!</h2>
                <p>
                  Don’t have an account? <Link to="/signup">Sign up</Link>
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
                      {...register("email", { required: true })}
                      placeholder="Email..."
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

                  </div>
                  {errors.password?.type === "required" && (
                    <span className="text-danger ms-3">
                      Please enter your password{" "}
                    </span>
                  )}
                  <div className="input-container d-flex align-items-center justify-content-between">
                    <div className="form-check remember">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value=""
                        id="login_remember"
                        name="login_remember"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="login_remember"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link className="forgot_pass" to="/forgot">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="input-container">
                    <PrimaryButton
                      text={!loginLoading ? "Login" : <Loader />}
                      additionalClass="w-100"
                    />
                  </div>
                </form>
              </div>
              <div className="footer-auth">
                {/*<div>
                  By continuing, you agree to the{" "}
                  <Link to="/">terms & Conditions</Link> and{" "}
                  <Link to="/">Privacy Policy</Link>
                </div>*/}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Login;
