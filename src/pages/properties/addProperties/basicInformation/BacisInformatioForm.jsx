import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessageShow from "../../../../helper/ErrorMessageShow";
import {
  postPropertiesActions,
} from "../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stateEmptyActions } from "../../../../redux/actions";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
import { nameKey, ParamsGet } from "../../../../helper/Authorized";
import LocationForm from "./location/LocationForm";
const BacisInformatioForm = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locationUrl = ParamsGet();
  const propertiesAddStatus =
    store?.postPropertiesReducer?.postProperties?.status;
  const propertiesAddMessage =
    store?.postPropertiesReducer?.postProperties?.data?.error;
  const propertiesAddLoading = store?.postPropertiesReducer?.loading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let localStorageKey = "nameKey";
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const getLocalStorageData = nameKey();
  const getLocalStorageNameKey = getLocalStorageData?.nameKey;
  const onSubmit = (data) => {
    setGetInputNameKey({ nameKey: data.propertyName });
    let formData = new FormData();
    formData.append("property_name:", data.propertyName);
    formData.append("image", data?.files[0]);
    dispatch(postPropertiesActions(formData));
  };

  useEffect(() => {
    if (propertiesAddStatus === 200) {
      navigate(
        "/add-properties/kd6PrMhLpwQrj5C94mscgOtydO8tXjQItEvjr3OUPal03jtMaGvW9PMrwdsxIFuw"
      );
      localStorage.setItem(localStorageKey, JSON?.stringify(getInputNameKey));
      dispatch(stateEmptyActions());
    } else if (propertiesAddStatus === 402) {
      ToastHandle(propertiesAddMessage, "danger");
      dispatch(stateEmptyActions());
    } else if (propertiesAddStatus === 409) {
      ToastHandle(propertiesAddMessage, "danger");
      dispatch(stateEmptyActions());
    }
  }, [propertiesAddStatus]);

  useEffect(() => {
    if (getLocalStorageNameKey !== null) {
      reset({ propertyName: getLocalStorageNameKey });
    }
  }, [getLocalStorageNameKey]);
  return (
    <div>
      <div>
        <h3 className="text-white fw-bold mb-3 fs-4">Basic Information</h3>
      </div>
      <div className="row">
        <div className="col-12 mx-auto form-design">
          <form
            onSubmit={handleSubmit(
              (data) => {
                onSubmit(data);
              },
              (err) => {
                console.log(err, "ee");
              }
            )}
          >
            <div className="row mt-2">
              <div className="col-md-6">
                <label className="text-white">Property Name</label>
                <div className="">
                  <input
                    className="form-control"
                    type="text"
                    {...register("propertyName", { required: true })}
                    placeholder="eg. smith villa"
                  />
                  {errors.propertyName?.type === "required" && (
                    <>{ErrorMessageShow("Please enter property name.")}</>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <label className="text-white">
                  {" "}
                  Thumbnail Photo <span>(.png, .jpg, .jpeg supported)</span>
                </label>
                <div className="">
                  <input className="form-control" type="file" {...register("files")} placeholder="" />
                </div>
              </div>
            </div>
            <div className="col-md-12 mt-5">
              <div className="d-flex justify-content-center">
                <button className="mw-auto" disabled={propertiesAddLoading ? true : false}>
                  {!propertiesAddLoading ? <>Save & Next</> : <Loader />}
                </button>
              </div>
            </div>
          </form>
          {locationUrl !== undefined && <LocationForm />}
        </div>
      </div>
    </div>
  );
};

export default BacisInformatioForm;
