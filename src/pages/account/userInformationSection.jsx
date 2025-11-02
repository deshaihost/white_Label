import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stateEmptyActions } from "../../redux/actions";
import "./account.css";
import { useForm } from "react-hook-form";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from 'axios';
import ChangePassModal from './changePassModal';
import { useWhiteLabelCss } from "../../helper/WhiteLabelCssContext";

const UserInformationSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cssConfig, loading: cssLoading } = useWhiteLabelCss();

  const [formData, setFormData] = useState({ firstName: '', lastName: '', phone: '', email: '', oldPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [updateApiLoading, setUpdateApiLoading] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);

  const callUpdateAccountApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = { first_name:formData.firstName, last_name:formData.lastName, phone:formData.phone, email:formData.email };

      const response = await axios.put( `${baseUrl}/update_account_info`, body_data, config );

      if (response.status === 200) {
        ToastHandle("Account information updated", "success");
        if (response?.data?.email_changed) {
          // Log out the user and redirect to the confirm-email page
          localStorage.clear();
          sessionStorage.removeItem("hostBuddy_auth");
          localStorage.setItem('loginEmailEntered', formData.email); // this nees to be accessible on the confirm-email page
          dispatch(stateEmptyActions());
          navigate('/confirm-email')
        }
      }
      else { ToastHandle(response?.data?.error, "danger"); }
      return response.data;
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    }
  };

  const callGetAccountInfoApi = async () => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.get( `${baseUrl}/get_account_info`, config );

      if (response.status === 200) {
        return response.data;
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle("Internal server error", "danger");
      return { error: "Internal server error" };
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = ErrorMessageKey.PLEASE_ENTER_A_VALID_PHONE_NUMBER;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateApiLoading(true);
    if (validate()) {
      let execute_update = true;
      if (formData.email !== formData.email) {
        execute_update = window.confirm("You are about to change your email address. If you continue, you will need to confirm the new address and use that for future logins, and you won't be able to log in with the old address anymore. Continue?");
      }

      if (execute_update) {
        const response = await callUpdateAccountApi();
        if (!(response?.error || response?.email_changed)) {
          const data = await callGetAccountInfoApi();
          if (data && !data.error) {
            setFormData({firstName: data.first_name, lastName: data.last_name, phone: data.phone, email: data.email});
          }
        }
      }
    }
    setUpdateApiLoading(false);
  };

  // When the user data is fetched, update the form fields
  useEffect(() => {
    async function fetchUserData() {
      const data = await callGetAccountInfoApi();
      if (data && !data.error) {
        setFormData({firstName: data.first_name, lastName: data.last_name, phone: data.phone, email: data.email});
      }
    }
    fetchUserData();
  }, []);

  return (
    <div className="account-content">
      {/* Section Divider */}
      <div className="section-divider">
        <div className="section-divider-line"></div>
        <span className="section-divider-text">Personal Information</span>
        <div className="section-divider-line"></div>
      </div>

      {/* Account Details Card */}
      <div className="account-section-card">
        <div className="section-header-with-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <h3>Account Details</h3>
        </div>

        <form>
          <div style={{ marginBottom: '16px' }}>
            <div className="row">
              <div className="input_group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <>{ErrorMessageShow(errors.firstName)}</>}
              </div>
              <div className="input_group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <>{ErrorMessageShow(errors.lastName)}</>}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <div className="row">
              <div className="input_group">
                <label htmlFor="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="form-control" maxLength="10" value={formData.phone} onChange={handleChange} placeholder="(555) 123-4567" />
                {errors.phone && <>{ErrorMessageShow(errors.phone)}</>}
              </div>
              <div className="input_group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="button-container">
            <button type="button" className="secondary-button show_password_fields" style={{ backgroundColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7', borderColor: cssConfig?.css_data?.interactive?.button_background || '#3e88f7' }} onClick={() => setShowChangePassModal(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Change Password
            </button>
            <button className="bg_theme_btn update_user_info" onClick={handleSubmit} disabled={updateApiLoading} type="button">
              {!updateApiLoading ? <>Save</> : <Loader />}
            </button>
          </div>
        </form>
      </div>

      <ChangePassModal show={showChangePassModal} handleClose={() => setShowChangePassModal(false)} />
    </div>
  );
};

export default UserInformationSection;