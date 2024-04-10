import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorMessageShow from "../../../../helper/ErrorMessageShow";
import { postPropertiesActions } from "../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stateEmptyActions } from "../../../../redux/actions";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
const BacisInformatioForm = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const propertiesAddStatus =
    store?.postPropertiesReducer?.postProperties?.status;
  const propertiesAddMessage =
    store?.postPropertiesReducer?.postProperties?.data?.error;
  const propertiesAddLoading = store?.postPropertiesReducer?.loading;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  let localStorageKey = "nameKey";
  const [nameKey, setNameKey] = useState({ nameKey: "" });
  const getLocalStorageData = JSON.parse(localStorage.getItem(localStorageKey));
  console.log(getLocalStorageData, "getLocalStorageData");
  const onSubmit = (data) => {
    setNameKey({ nameKey: data.propertyName });
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
      localStorage.setItem(localStorageKey, JSON.stringify(nameKey));
      dispatch(stateEmptyActions());
    } else if (propertiesAddStatus === 402) {
      ToastHandle(propertiesAddMessage, "danger");
      dispatch(stateEmptyActions());
    }
  }, [propertiesAddStatus]);
  return (
    <div>
      <div>
        <h3 className="text-white">Basic Information</h3>
      </div>
      <div className="row">
        <div className="col-4 mx-auto">
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
            <div className="text-white">Property Name</div>
            <div className="input-container">
              <input
                type="text"
                {...register("propertyName", { required: true })}
                placeholder="eg. smith villa"
              />
              {errors.propertyName?.type === "required" && (
                <>{ErrorMessageShow("Please enter property name.")}</>
              )}
            </div>
            <div className="text-white mt-3">
              {" "}
              Thumbnail Photo (.png, .jpg, .jpeg supported)
            </div>
            <div className="input-container">
              <input type="file" {...register("files")} placeholder="" />
            </div>
            <div className="input-container d-flex justify-content-center">
              <button disabled={propertiesAddLoading ? true : false}>
                {!propertiesAddLoading ? <>Save & Next</> : <Loader />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BacisInformatioForm;
