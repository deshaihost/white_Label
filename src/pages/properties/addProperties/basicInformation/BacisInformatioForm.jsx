import React, { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import ErrorMessageShow from "../../../../helper/ErrorMessageShow";
import { postPropertiesActions } from "../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stateEmptyActions } from "../../../../redux/actions";
import ToastHandle from "../../../../helper/ToastMessage";
import Loader from "../../../../helper/Loader";
import { nameKey, ParamsGet } from "../../../../helper/Authorized";
import LocationForm from "./location/LocationForm";
import axios from "axios";

const BacisInformatioForm = ({ prntFuntionHeaderActive }) => {
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

  const [uploadedFile, setFile] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [propertyName, setPropertyName] = useState(null);
  const nameKeyGet = nameKey();
  const add_thumbnail_image = async (propertyName, imgFile) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(
      sessionStorage.getItem("hostBuddy_auth")
    );
    const token = getSessionStorageData?.token;

    try {
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-API-Key": API_KEY,
          },
        };
        let formData = new FormData();
        formData.append(
          "file",
          updateImage !== null ? updateImage?.[0] : imgFile
        );
        config.headers["Content-Type"] = "multipart/form-data";

        const response = await axios.post(
          `${baseUrl}/properties/${
            nameKeyGet !== null ? nameKeyGet?.nameKey : propertyName
          }/add_thumbnail_image`,
          formData,
          config
        );
        if (response.status === 200) {
        } else {
          ToastHandle(
            `Error adding thumbnail image: ${response.error}`,
            "danger"
          );
        }
      } else {
        alert("No Token");
      }
    } catch (error) {
      console.error("Error adding thumbnail image", error);
    } finally {
    }
  };

  let localStorageKey = "nameKey";
  const [getInputNameKey, setGetInputNameKey] = useState({ nameKey: "" });
  const getLocalStorageData = nameKey();
  const getLocalStorageNameKey = getLocalStorageData?.nameKey;
  const onSubmit = (data) => {
    setGetInputNameKey({ nameKey: data.propertyName });
    setUpdateImage(null);
    setFile(data?.files[0]);
    setPropertyName(data.propertyName);
    //Create the property, with the given name
    let CreatePropertyData = { property_name: data.propertyName };
    dispatch(postPropertiesActions(CreatePropertyData));
  };
  // updateImageHndle functinality add only update case
  const updateImageHndle = () => {
    add_thumbnail_image();
  };
  // updateImageHndle functinality add only update case

  useEffect(() => {
    if (propertiesAddStatus === 200) {
      // First, add the thumbnail image to the property, if one was included
      add_thumbnail_image(propertyName,uploadedFile);
      // Then, navigate to the next page
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
                  <input
                    className="form-control"
                    type="file"
                    {...register("files")}
                    onChange={(e) => {
                      setUpdateImage(e.target.files);
                    }}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
            {!locationUrl && (
              <div className="col-md-12 mt-5">
                <div className="d-flex justify-content-center">
                  <button
                    className="mw-auto"
                    disabled={propertiesAddLoading ? true : false}
                  >
                    {!propertiesAddLoading ? <>Save & Next</> : <Loader />}
                  </button>
                </div>
              </div>
            )}
          </form>
          {locationUrl !== undefined && (
            <LocationForm
              prntFuntionHeaderActive={prntFuntionHeaderActive}
              updateImageHndle={updateImageHndle}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BacisInformatioForm;
