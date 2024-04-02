import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import AuthImage from "../../public/img/auth_left_img.png";
import Logo from "../../public/img/footer-logo.webp";
import { Link } from "react-router-dom";
import "../auth.css";
import PrimaryButton from "../../component/button/button";
import { Helmet } from "react-helmet";
import { sendPasswordRestEmailActions } from "../../redux/auth/forgotPassword/actions";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { stateEmptyActions } from "../../redux/actions";
import Loader from "../../helper/Loader";

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

  const [apiError, setApiError] = useState({
    status: false,
    message: "",
  });
  const timeOutErrorClear = () => {
    setTimeout(() => {
      setApiError({
        status: false,
        message: "",
      }); // Reset apiError to null after 3 seconds
    }, 4000);
  };

  useEffect(() => {
    if (forgetPasswordStatus === 200) {
      setApiError({
        status: true,
        message: forgetPasswordMessage,
      });
      timeOutErrorClear();
      dispatch(stateEmptyActions());
    }else if(forgetPasswordStatus===429){
      setApiError({
        status: false,
        message: 'server error 429',
      });
      timeOutErrorClear();
      dispatch(stateEmptyActions());

    }
  }, [forgetPasswordStatus]);

  return (
    <div className="forgot-pass auth">
      <Helmet>
        <title>Forgot Password – Hostbuddy</title>
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

                      text= {!forgetPasswordLoading ? "Get Password Reset Token " : <Loader />}
                      additionalClass="w-100"
                    />
                  </div>
                  {apiError?.message !== "" && (
                    <span
                      className={`${
                        apiError?.status ? "text-success" : "text-danger"
                      } border d-flex justify-content-center mt-4`}
                    >
                      {apiError?.message}
                    </span>
                  )}
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

export default ForgotPass;
