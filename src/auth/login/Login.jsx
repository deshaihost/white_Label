import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
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
import { APICore, setAuthorization } from "../../helper/apiCore";

//import Logo from "../../public/img/logo_footer.png";
const Logo = 'https://hostbuddylb.com/logo/logo_footer.webp';
const AuthImage = 'https://hostbuddylb.com/home-new/_Signup.webp';

const Login = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getAuthToken = Authorized();
  const { token } = getAuthToken ? getAuthToken : [];
  const [showPassword, setShowPassword] = useState(false);
  const [emailEntered, setEmailEntered] = useState("");
  const loginStatus = store?.loginReducer?.login?.status;
  const loginMessage = store?.loginReducer?.login?.message;
  const loginLoading = store?.loginReducer?.loading;
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    setEmailEntered(data.email);

    // If JWT is entered directly, save the token and redirect to dashboard
    if (data.password.startsWith("ey") && data.password.length > 100 && (data.password.match(/\./g) || []).length === 2) {
      const api = new APICore();
      const user = { data: "userData", id: 1, password: "test", lastName: "User", role: "userRole", token: data.password, refreshToken: data.password };
      api.setLoggedInUser(user);
      setAuthorization(user["token"]);
      navigate('/dashboard')
      dispatch(stateEmptyActions());
    }
    
    else { dispatch( loginActions({ email: data.email, password: data.password }) ); }
  };

  useEffect(() => {
    if (loginStatus === 401) {
      ToastHandle(loginMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (loginStatus === 200) {
      navigate('/dashboard')
      dispatch(stateEmptyActions());
    } else if (loginStatus === 202) { // credentials good, but user hasn't confirmed email yet. Backend will not provide tokens until email is confirmed
      localStorage.setItem('loginEmailEntered', emailEntered); // this nees to be accessible on the confirm-email page
      navigate('/confirm-email')
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
        <title>Login – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/login" />
      </Helmet>
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-img">
              <img src={AuthImage} alt="auth-img" />
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
                <form action="" onSubmit={handleSubmit( (data) => { onSubmit(data); } )}>
                  <div className="input-container">
                    <input type="text" {...register("email", { required: true })} placeholder="Email..."/>
                  </div>
                  {errors.email?.type === "required" &&
                    <>{ErrorMessageShow("Please enter your email")}</>
                  }
                  <div className="input-container">
                    <div className="password-box">
                      <input type={showPassword ? "text" : "password"} placeholder="Password..." {...register("password", { required: true })}/>
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
                      <input type="checkbox" className="form-check-input" value="" id="login_remember" name="login_remember"/>
                      <label className="form-check-label" htmlFor="login_remember">Remember me</label>
                    </div>
                    <Link className="forgot_pass" to="/forgot">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="input-container">
                    <PrimaryButton text={!loginLoading ? "Login" : <Loader />} additionalClass="w-100"/>
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
