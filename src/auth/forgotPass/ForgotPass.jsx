import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import "../auth.css";
import PrimaryButton from "../../component/button/button";
import { Helmet } from "react-helmet";
import { sendPasswordRestEmailActions } from "../../redux/auth/forgotPassword/actions";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { stateEmptyActions } from "../../redux/actions";
import Loader from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";

//import Logo from "../../public/img/logo_footer.png";
const Logo = 'https://hostbuddylb.com/logo/logo_footer.webp';
const AuthImage = 'https://hostbuddylb.com/home-new/_Signup.webp';

const ForgotPass = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const forgetPasswordMessage =
    store?.sendPasswordRestEmailReducer?.sendPasswordRestEmail?.data?.message;
  const forgetPasswordStatus =
    store?.sendPasswordRestEmailReducer?.sendPasswordRestEmail?.status;
  const forgetPasswordLoading = store?.sendPasswordRestEmailReducer?.loading;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(
      sendPasswordRestEmailActions({
        email: data?.email,
      })
    );
  };
  useEffect(() => {
    if (forgetPasswordStatus === 200) {
      ToastHandle(forgetPasswordMessage, "success");
      dispatch(stateEmptyActions());
    }else if(forgetPasswordStatus===429){
      ToastHandle('server error 429', "danger");
      dispatch(stateEmptyActions());
    }
  }, [forgetPasswordStatus]);

  return (
    <div className="forgot-pass auth">
      <Helmet>
        <title>Forgot Password – HostBuddy AI</title>
        <link rel="canonical" href="https://www.hostbuddy.ai/forgot" />
      </Helmet>
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-img">
              <img src={AuthImage} alt="auth-img" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="forgot-pass-content auth-content">
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
                      type="email"
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
                    <PrimaryButton
                      text= {!forgetPasswordLoading ? "Send Password Reset Link" : <Loader />}
                      additionalClass="w-100"
                    />
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

export default ForgotPass;
