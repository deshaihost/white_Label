import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import AuthImage from '../../public/img/auth_left_img.png';
import Logo from '../../public/img/footer-logo.webp';
import { Link } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import '../auth.css';
import PrimaryButton from '../../component/button/button';

const ForgotPass = () => {
  return (
    <div className='forgot-pass auth'>
      <Container>
        <div className="row">
          <div className="col-lg-6">
            <div className="auth-img">
              <img src={AuthImage} alt='auth-img' />
              <div className="auth-chat">
                <p>"I've been using HostBuddy for a while now, and it has completely transformed the way I engage with my customers. Their chatbot solutions are top-notch, and the support team is fantastic.”</p>
                <h4>John Smith</h4>
                <h6>CEO of TechSolutions Inc</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="forgot-pass-content auth-content">
              <Link to='/' className="logo">
                <img src={Logo} alt='logo' />
              </Link>
              <div className="auth-form">
                <h2>Welcome Back!</h2>
                <p>Don’t have an account?  <Link to='/signup'>Sign up</Link></p>
                <form action="">
                  <div className="input-container">
                    <input type='email' placeholder='Email...' />
                  </div>
                  <div className="input-container">
                    <PrimaryButton text="Get Password Reset Token " additionalClass="w-100" />
                  </div>
                </form>
              </div>
              <div className="footer-auth">
                <div>
                  By Continue, you agree to the <Link to='/'>terms & Conditions</Link> and <Link to='/'>Privacy Policy</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ForgotPass
