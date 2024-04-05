import React from 'react'
import SideBar from '../../component/sideBar/SideBar';
import GetStartedImg from '../../public/img/getstartedimg.png';
import { Link } from 'react-router-dom';
import './account.css';

const Account = () => {
  return (
    <div className="account-main">
      <div className="container">
        <div className="banner-heading">
          <h2>My HostBuddy</h2>
          <p>Manage your profile here </p>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <SideBar />
          </div>
          <div className="col-lg-8">
            <div className="account-container">
              <div className="account-content">
                <form action="">
                  <div className="row">
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">First Name</label>
                        <input type="text" name="firstname" className='form-control' />
                      </div>
                    </div>
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="lastname" className='form-control' />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">Phone Number</label>
                        <input type="tel" name="phonenumber" className='form-control' />
                      </div>
                    </div>
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">Email</label>
                        <input type="email" name="email" className='form-control' />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-center">
                      <button type='submit' className='bg_theme_btn show_password_fields'>Change Password</button>
                      <button type='submit' className='bg_theme_btn update_user_info'>Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
