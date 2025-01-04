import React, { useEffect, useState, useRef } from "react";
import "./account.css";
import { useForm } from "react-hook-form";
import { ErrorMessageKey } from "../../helper/ErrorMessageKey";
import ErrorMessageShow from "../../helper/ErrorMessageShow";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDataActions,
  goToBillingportalPostActions,
  stateEmptyActions,
  updateAccountInfoActions,
  updateAccountPasswordActions,
} from "../../redux/actions";
import { FullScreenLoader } from "../../helper/Loader";
import ToastHandle from "../../helper/ToastMessage";
const Location = () => {
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
    : {};
  const userDataStatus = store?.getUserDataReducer?.getUserData?.status;
  const userDataLoading = store?.getUserDataReducer?.loading;
  const updateUserDataLoading = store?.updateAccountInfoReducer?.loading;
  const updateUserMessage =
    store?.updateAccountInfoReducer?.updateAccountInof?.data?.message;
  const updateUserStatus =
    store?.updateAccountInfoReducer?.updateAccountInof?.status;

  const updatePasswordMessage =
    store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword?.data
      ?.message;
  const updatePasswordStatus =
    store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword
      ?.status;
  const updatePasswordErrorMessage =
    store?.updateAccountUpdatePasswordReducer?.updateAccountUpdatePassword
      ?.message;

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
      dispatch(
        updateAccountInfoActions({
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
        })
      );
    } else {
      // dispatch for password change api
      dispatch(
        updateAccountPasswordActions({
          old_password: data.oldPassword,
          new_password: data.newPassword,
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
    dispatch(getUserDataActions(false));
  }, []);

  useEffect(() => {
    if (updateUserStatus === 200) {
      ToastHandle(updateUserMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions(false));
    }
  }, [updateUserStatus]);

  useEffect(() => {
    if (updatePasswordStatus === 200) {
      reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
      ToastHandle(updatePasswordMessage, "success");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions(false));
    }
    if (updatePasswordStatus === 401) {
      reset({ oldPassword: "", newPassword: "", confirmPassword: "" });
      ToastHandle(updatePasswordErrorMessage, "danger");
      dispatch(stateEmptyActions());
      dispatch(getUserDataActions(false));
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
  const billingPortalUrl =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.data
      ?.billing_portal_url;
  const billingPortalUrlLoading = store?.gotoBillingPortalPostReducer?.loading;
  const billingProtalUrlStatus =
    store?.gotoBillingPortalPostReducer?.gotoBillingPortal?.status;
  useEffect(() => {
    if (billingProtalUrlStatus === 200) {
      window.location.href = billingPortalUrl;
    } else if (billingProtalUrlStatus === 404) {
    }
  }, [billingProtalUrlStatus]);
  return (
    <div className="account-content fs-14">
      <h5 className="mt-3 mt-lg-0">Location</h5>
      <p className="mb-3 fs-14">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus veritatis
        iure voluptatum aliquam aliquid ducimus reiciendis officiis,{" "}
      </p>

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
          <div className="col-lg-6 input_group mb-3 mb-lg-0">
            <label htmlFor="">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              {...register("city")}
            />
            {errors.city?.type === "required" && (
              <>{ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_NAME)}</>
            )}
          </div>
          <div className="col-lg-6  input_group">
            <label htmlFor="">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              {...register("state")}
            />
            {errors.state?.type === "required" && (
              <>
                {ErrorMessageShow(ErrorMessageKey.PLEASE_ENTER_YOUR_LAST_NAME)}
              </>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 input_group mb-3 mb-lg-0">
            <label htmlFor="">Postal Code</label>
            <input
              type="number"
              name="postalcode"
              className="form-control"
              maxLength="10"
              {...register("postalcode", { pattern: /^[0-9]{10}$/ })}
            />
            {errors.postalcode?.type === "required" && (
              <>
                {ErrorMessageShow(
                  ErrorMessageKey.PLEASE_ENTER_YOUR_PHONE_NUMBER
                )}
              </>
            )}
            {errors.postalcode?.type === "pattern" && (
              <>
                {ErrorMessageShow(
                  ErrorMessageKey.PLEASE_ENTER_A_VALID_PHONE_NUMBER
                )}
              </>
            )}
          </div>
          <div className="col-lg-6 input_group">
            <label htmlFor="">Country</label>
            <input type="text" name="country" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <button
              type="submit"
              className="bg_theme_btn update_user_info"
              onClick={() => handleSubmit((data) => onSubmit(data))}
            >
              <>Save</>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Location;
