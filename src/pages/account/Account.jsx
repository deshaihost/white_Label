import React, { useEffect, useState, useRef } from "react";
import SideBar from "../../component/sideBar/SideBar";
import GetStartedImg from "../../public/img/getstartedimg.png";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "./account.css";
import { useForm } from "react-hook-form";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDataActions,
  stateEmptyActions,
  updateAccountInfoActions,
  updateAccountPasswordActions,
} from "../../redux/actions";
import Loader, { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
const Account = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const userDataGet = store?.getUserDataReducer?.getUserData?.data?.user;
  const { email, first_name, last_name, phone } = userDataGet
    ? userDataGet
    : [];
  const userDataStatus = store?.getUserDataReducer?.getUserData?.status;
  const userDataLoading = store?.getUserDataReducer?.loading;
  const updateUserDataLoading = store?.updateAccountInfoReducer?.loading;
  const updateUserMessage =
    store?.updateAccountInfoReducer?.updateAccountInof?.data?.message;
  const updateUserStatus =
    store?.updateAccountInfoReducer?.updateAccountInof?.status;

  const updatePasswordMessage =
    store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.data?.message;
  const updatePasswordStatus =
    store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.status;

  const updatePasswordErrorMessage =
    store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.message;



  const [passwordFieldsShow, setPasswordFielsShow] = useState(false);

  const password = useRef({});
  password.current = watch("newPassword", "");

  const passwordFieldsShowHndle = (e) => {
    e.preventDefault();
    setPasswordFielsShow(!passwordFieldsShow);
  };

  const onSubmit = (data) => {

    if (!passwordFieldsShow) {
      dispatch(
        updateAccountInfoActions({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          // password_change: data.newPassword
        })
      );

    } else {
      // dispatch for password change api
      dispatch(
        updateAccountPasswordActions({
          old_password: data.oldPassword,
          new_password: data.newPassword
        })
      );
    }
  };
  useEffect(() => {
    if (userDataStatus === 200) {
      reset({
        email: email,
        firstName: first_name,
        lastName: last_name,
        phone: phone,
      });
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
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      ToastHandle(updatePasswordMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions());
    }
    if (updatePasswordStatus === 401) {
      reset({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      ToastHandle(updatePasswordErrorMessage, "danger");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions());
    }
  }, [updatePasswordStatus]);


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
                {userDataLoading && (
                  <div className="text-end">
                    <FullScreenLoader />
                  </div>
                )}

                <form action="">
                  <div className="row">
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">First Name</label>
                        <input
                          type="text"
                          name="firstname"
                          className="form-control"
                          {...register("firstName")}
                        />
                        {errors.firstName?.type === "required" && (
                          <>
                            {ErrorMessageShow(
                              ErrorMessageKey.PLEASE_ENTER_YOUR_NAME
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">Last Name</label>
                        <input
                          type="text"
                          name="lastname"
                          className="form-control"
                          {...register("lastName")}
                        />
                        {errors.lastName?.type === "required" && (
                          <>
                            {ErrorMessageShow(
                              ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">Phone Number</label>
                        <input
                          type="tel"
                          name="phonenumber"
                          className="form-control"
                          {...register("phone", {
                            pattern: /^[0-9]{10}$/,
                          })}
                          maxLength="10"
                        />
                        {errors.phone?.type === "required" && (
                          <>
                            {ErrorMessageShow(
                              ErrorMessageKey.PLEASE_ENTER_YOUR_PHONE_NUMBER
                            )}
                          </>
                        )}
                        {errors.phone?.type === "pattern" && (
                          <>
                            {ErrorMessageShow(
                              ErrorMessageKey.PLEASE_ENTER_A_VALID_PHONE_NUMBER
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col">
                      <div className="input_group">
                        <label htmlFor="">Email</label>
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          disabled
                          {...register("email")}
                        />
                      </div>
                    </div>
                  </div>
                  {passwordFieldsShow && (
                    <>
                      <div className="row">
                        <div className="col">
                          <div className="input_group">
                            <label htmlFor="">Old Password</label>
                            <input
                              type="password"
                              name="oldPassword"
                              className="form-control"
                              {...register("oldPassword", {
                                required: true,
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
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="input_group">
                            <label htmlFor="">New Password</label>
                            <input
                              type="password"
                              name="firstname"
                              className="form-control"
                              {...register("newPassword", {
                                required: true,
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
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="input_group">
                            <label htmlFor="">Confirm New Password</label>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              {...register("confirmPassword", {
                                required: true,
                                validate: (value) =>
                                  value === password.current ||
                                  ErrorMessageKey.PASSWORD_DOESNT_MATCH,
                                // "password doesn't match ",
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
                      </div>
                    </>
                  )}
                  <div className="row">
                    <div className="col text-center">
                      <button
                        type="submit"
                        className="bg_theme_btn show_password_fields"
                        onClick={(e) => {
                          passwordFieldsShowHndle(e);
                        }}
                      >
                        Change Password
                      </button>
                      <button
                        type="submit"
                        className="bg_theme_btn update_user_info"
                        onClick={handleSubmit(
                          (data) => {
                            onSubmit(data);
                          },
                          (err) => {
                            console.log(err, "ee");
                          }
                        )}
                      >
                        {!updateUserDataLoading ? <>Save</> : <Loader />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
