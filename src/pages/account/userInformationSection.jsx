import React, { useEffect, useState, useRef } from "react";
import SideBar from "../../component/sideBar/SideBar";
import "./account.css";
import { useForm } from "react-hook-form";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataActions, goToBillingportalPostActions, stateEmptyActions, updateAccountInfoActions, updateAccountPasswordActions } from "../../redux/actions";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import AccountRegionSection from "./regionSection";
import AccountNotificationSection from "./notificationSection";
import Location from "./Location";


const UserInformationSection = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const { email, first_name, last_name, phone } = userDataGet ? userDataGet : {};
  const userDataStatus = store?.getUserDataReducer?.getUserData?.status;
  const userDataLoading = store?.getUserDataReducer?.loading;
  const updateUserDataLoading = store?.updateAccountInfoReducer?.loading;
  const updateUserMessage = store?.updateAccountInfoReducer?.updateAccountInof?.data?.message;
  const updateUserStatus = store?.updateAccountInfoReducer?.updateAccountInof?.status;

  const updatePasswordMessage = store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.data?.message;
  const updatePasswordStatus = store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.status;
  const updatePasswordErrorMessage = store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.message;

  const [passwordFieldsShow, setPasswordFielsShow] = useState(false);
  const [changePassBtnShow, setChangePassBtnShow] = useState(true);

  const password = useRef({});
  password.current = watch("newPassword", "");

  const passwordFieldsShowHndle = (e) => {
    e.preventDefault();
    setPasswordFielsShow(!passwordFieldsShow);
    setChangePassBtnShow(false);
  };

  const onSubmit = (data) => {

    if (!passwordFieldsShow) {
      dispatch( updateAccountInfoActions({ first_name: data.firstName, last_name: data.lastName, phone: data.phone }) );

    } else { // dispatch for password change api
      dispatch( updateAccountPasswordActions({ old_password: data.oldPassword, new_password: data.newPassword }) );
    }
  };
  useEffect(() => {
    if (userDataStatus === 200) {
      reset({ email: email, firstName: first_name, lastName: last_name, phone: phone });
    }

  }, [userDataStatus]);

  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  useEffect(() => {
    if (updateUserStatus === 200) {
      ToastHandle(updateUserMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions());
    }
  }, [updateUserStatus]);

  useEffect(() => {
    if (updatePasswordStatus === 200) {
      reset({ oldPassword: "", newPassword: "", confirmPassword: "" })
      ToastHandle(updatePasswordMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions());
    }
    if (updatePasswordStatus === 401) {
      reset({ oldPassword: "", newPassword: "", confirmPassword: "" })
      ToastHandle(updatePasswordErrorMessage, "danger");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions());
    }
  }, [updatePasswordStatus]);

  const subscriptionClickHandler = (event) => {
    event.preventDefault();

    // Remove local storage data related to subscription, since the user may be going to change it. This will re-update next time user goes to dashboard page.
    localStorage.removeItem("paymentStatus");
    localStorage.removeItem("servicesExpireDate");
    localStorage.removeItem("numPropertiesAllowed");
    localStorage.removeItem("numPropertiesUsed");
    localStorage.removeItem("tooManyPropertiesGraceUntil");

    dispatch(goToBillingportalPostActions());
  };

  // subscription functionality
  const billingPortalUrl = store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.data?.billing_portal_url;
  const billingPortalUrlLoading = store?.gotoBillingPortalPostReducer?.loading;
  const billingProtalUrlStatus = store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  useEffect(() => {
    if (billingProtalUrlStatus === 200) {
      window.location.href = billingPortalUrl;
    } else if (billingProtalUrlStatus === 404) {
    }
  }, [billingProtalUrlStatus]);


  return (
    <div className="account-content">

      <h5 className="mb-3">Account</h5>

      {billingPortalUrlLoading && (
        <div className="text-end">
          <FullScreenLoader />
        </div>
      )}
      {userDataLoading && (
        <div className="text-end">
          <FullScreenLoader />
        </div>
      )}

      <form action="">
        <div className="row">
          <div className="col input_group">
            <label htmlFor="">First Name</label>
            <input type="text" name="firstname" className="form-control" {...register("firstName")}/>
            {errors.firstName?.type === "required" && (
              <>
                {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_NAME )}
              </>
            )}
          </div>
          <div className="col input_group">
            <label htmlFor="">Last Name</label>
            <input type="text" name="lastname" className="form-control" {...register("lastName")}/>
            {errors.lastName?.type === "required" && (
              <>
                {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME )}
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col input_group">
            <label htmlFor="">Phone Number</label>
            <input type="tel" name="phonenumber" className="form-control" maxLength="10" {...register("phone", { pattern: /^[0-9]{10}$/ })} />
            {errors.phone?.type === "required" && (
              <>
                {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_YOUR_PHONE_NUMBER )}
              </>
            )}
            {errors.phone?.type === "pattern" && (
              <>
                {ErrorMessageShow( ErrorMessageKey.PLEASE_ENTER_A_VALID_PHONE_NUMBER )}
              </>
            )}
          </div>
          <div className="col input_group">
            <label htmlFor="">Email</label>
            <input type="email" name="email" className="form-control" disabled {...register("email")}/>
          </div>
        </div>
        {passwordFieldsShow && (
          <>
            <div className="row">
              <div className="col input_group">
                <label htmlFor="">Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  {...register("oldPassword", { required: true, pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-]).{8,30}$/,
                      message: `${ErrorMessageKey.MIX_IT_UP_USE_A_COMBINATION_OF_UPPERCASE_AND_LOWERCASE_LETTERS_SPECIAL_CHARACTERS_IN_YOUR}`,
                    },
                    minLength: { value: 8, message: `${ErrorMessageKey.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTER_LONG}` },
                    maxLength: 30,
                  })}
                />

                {errors?.oldPassword?.type === "required" && (
                  <>
                    {ErrorMessageShow(
                      ErrorMessageKey.PLEASE_ENTER_YOUR_OLD_PASSWORD
                    )}
                  </>
                )}
                {errors?.oldPassword?.type === "pattern" && (
                  <>
                    {ErrorMessageShow(errors?.oldPassword?.message)}
                  </>
                )}
                {errors?.oldPassword?.type === "minLength" && (
                  <>
                    {ErrorMessageShow(errors?.oldPassword?.message)}
                  </>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col input_group">
                <label htmlFor="">New Password</label>
                <input type="password" name="firstname" className="form-control"
                  {...register("newPassword", { required: true,
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
                {errors?.newPassword?.type === "required" && (
                  <>
                    {ErrorMessageShow(
                      ErrorMessageKey.PLEASE_ENTER_YOUR_PASSWORD
                    )}
                  </>
                )}
                {errors?.newPassword?.type === "pattern" && (
                  <>
                    {ErrorMessageShow(errors?.newPassword?.message)}
                  </>
                )}
                {errors?.newPassword?.type === "minLength" && (
                  <>
                    {ErrorMessageShow(errors?.newPassword?.message)}
                  </>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col input_group">
                <label htmlFor="">Confirm New Password</label>
                <input type="password" name="confirmPassword" className="form-control"
                  {...register("confirmPassword", {
                    required: true, validate: (value) => value === password.current || ErrorMessageKey.PASSWORD_DOESNT_MATCH,
                  })}
                />
                {errors?.confirmPassword?.type === "required" && (
                  <>
                    {ErrorMessageShow(
                      ErrorMessageKey.THIS_FIELD_REQUIRED
                    )}
                  </>
                )}
                {errors?.confirmPassword?.type === "validate" && (
                  <>
                    {ErrorMessageShow(
                      errors?.confirmPassword?.message
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
        <div className="row">
          <div className="col-lg-10 col-12 text-center d-lg-flex align-items-center justify-content-center gap-3">
            {changePassBtnShow && (
              <button type="submit" className="bg_theme_btn show_password_fields" onClick={(e) => { passwordFieldsShowHndle(e); }}>
                Change Password
              </button>
            )}
            <button type="submit" className="bg_theme_btn update_user_info ms-0 ms-lg-3" onClick={() => handleSubmit(data => onSubmit(data))}>
              {!updateUserDataLoading ? <>Save</> : <Loader />}
            </button>
          </div>
        </div>
      </form>
      <span className="d-flex justify-content-center" style={{ marginTop: '10px' }}>
        <Link to="#" className="text-link" onClick={subscriptionClickHandler}>Subscription</Link>
      </span>
      <Location/>
    </div>
  );
};

export default UserInformationSection;