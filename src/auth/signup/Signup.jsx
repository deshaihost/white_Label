import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import AuthImage from '../../public/img/auth_left_img.png';
import Logo from '../../public/img/footer-logo.webp';
import { Link } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import PrimaryButton from '../../component/button/button';
import '../auth.css';

const Signup = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className='signup auth'>
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
            <div className="signup-content auth-content">
              <Link to='/' className="logo">
                <img src={Logo} alt='logo' />
              </Link>
              <div className="auth-form">
                <h2>Try HostBuddy Today!</h2>
                <p>Already have an account? <Link to='/login'>Sign in here</Link></p>
                <form action="">
                  <div className="input-container">
                    <input type='text' placeholder='Full Name...' />
                  </div>
                  <div className="input-container">
                    <input type='email' placeholder='Email...' />
                  </div>
                  <div className="input-container">
                    <div className="password-box">
                      <input type={showPassword ? 'text' : 'password'} placeholder='Password...' />
                      <button type='button' className='eye-btn'  onClick={() => {setShowPassword(!showPassword)}} style={{cursor: 'pointer'}}>
                        {!showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        
                      </button>
                    </div>
                    <p className="password-criteria">Password should have special characters like $,@,%,! and minimum 8 length.</p>
                  </div>
                  <div className="input-container">
                    <div className="password-box">
                      <input type={showConfirmPassword ? 'text' : 'password'} placeholder='Confirm Password...' />
                      <button type='button' className='eye-btn'  onClick={() => {setShowConfirmPassword(!showConfirmPassword)}} style={{cursor: 'pointer'}}>
                        {!showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                      </button>
                      </div>
                  </div>
                  <div className="input-container">
                    <select name="" id="">
                      <option value="" default>Select Plan</option>
                      <option value="essentials">The Essentials</option>
                      <option value="work">The Works</option>
                    </select>
                  </div>
                  <div className="input-container">
                    <PrimaryButton text="Register" additionalClass="w-100" />
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

export default Signup
