import React, { useEffect, useState } from "react";
import { copyExistingPropertyActions, postPropertiesActions } from "../../../../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { stateEmptyActions } from "../../../../../redux/actions";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader from "../../../../../helper/Loader";
import axios from "axios";
import CopyExistingPropertyModel from "./CopyExistingPropertyModel";

// Code for the section containing property name and thumbnail image inputs and "Copy Existing Property" button, to be placed on the first page of the questionnaire.
// Present for both adding a new property (property_name is null) and editing an existing property (property_name is non-empty string), with different behavior.
const BasicInformationForm = ({ property_name }) => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const propertiesAddStatus = store?.postPropertiesReducer?.postProperties?.status;
  const propertiesAddMessage = store?.postPropertiesReducer?.postProperties?.data?.error;
  const propertiesAddLoading = store?.postPropertiesReducer?.loading;

  const [uploadedFile, setFile] = useState(null);
  const [propertyName, setPropertyName] = useState(property_name); // allow property_name to be set when user creates a new property
  const [imgIsUplaoding, setImgIsUplaoding] = useState(false);

  const add_thumbnail_image_API_call = async (propertyName, imgFile) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const token = JSON.parse(sessionStorage.getItem("hostBuddy_auth"))?.token;
    setImgIsUplaoding(true);

    if (uploadedFile && uploadedFile.length > 0) {
      let formData = new FormData();
      let file = uploadedFile !== null ? uploadedFile[0] : imgFile;
      if ( file?.type === "image/jpeg" || file?.type === "image/jpg" || file?.type === "image/png" ) {
        formData?.append("file", file);
        try {
          if (token) {
            const config = {
              headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
              validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
            };
            let formData = new FormData();
            formData.append("file", uploadedFile[0]);
            config.headers["Content-Type"] = "multipart/form-data";

            const response = await axios.post( `${baseUrl}/properties/${propertyName}/add_thumbnail_image`, formData, config );
            if (response.status === 200) { }
            else { ToastHandle( `Error adding thumbnail image: ${response?.data?.error}`, "danger" ); }
          } else { alert("No Token"); }
        } catch (error) { ToastHandle( "500 Internal Server Error", "danger" ); }
        finally { setImgIsUplaoding(false); }
      } else { ToastHandle( "Invalid file type. Must be .jpg, .jpeg, or .png", "danger" ); }
    }
    setImgIsUplaoding(false);
  };

  // "Submit" button click, for creating a new property. Just POST the property here - thumbnail image is handled in useEffect
  const onSubmit = () => {
    setPropertyName(propertyName.trim()); // Backend will reject property names with leading/trailing spaces
    if (!propertyName) {
      ToastHandle("Please enter a property name", "danger");
      return;
    }
    dispatch(postPropertiesActions({ property_name: propertyName }));
  };

  // "Update" button click, for editing existing property. For now only thumbnail image is editable, but when we add support for changing the property name, handle that here too.
  const handleUpdateForExistingProp = () => {
    add_thumbnail_image_API_call(propertyName, uploadedFile);
  };

  // When a new property is created successfully, upload the thumbnail image to the newly created property (if included) then navigate to the next page
  useEffect(() => {
    if (propertiesAddStatus === 200) {
      ToastHandle("New property created", "success");
      add_thumbnail_image_API_call(propertyName, uploadedFile);
      dispatch(stateEmptyActions());
      navigate(`/edit-property/${encodeURIComponent(propertyName)}`);

    } else if (propertiesAddStatus === 402) {
      ToastHandle(propertiesAddMessage, "danger");
      dispatch(stateEmptyActions());

    } else if (propertiesAddStatus === 409) {
      ToastHandle(propertiesAddMessage, "danger");
      dispatch(stateEmptyActions());
    }
  }, [propertiesAddStatus]);
  
  return (
    <div>
      <div>
        <h3 className="text-white fw-bold mb-3 fs-4">Property Name & Thumbnail</h3>
      </div>
      <div className="row">
        <div className="col-12 mx-auto form-design">
          <div className="container" style={{ marginLeft: '0px', marginRight: '0px', paddingLeft: '0px', paddingRight: '0px' }}>
            <div className="row mt-2">

              {/* Property Name input (if editing existing property, shows the property name and is unchangeable) */}
              <div className="col-md-6">
                <label className="text-white">Property Name</label>
                <div className="">
                  <input className="form-control" type="text" value={propertyName || null} readOnly={!!property_name} placeholder="eg. smith villa"
                  onChange={(e) => { setPropertyName(e.target.value); }} />
                </div>
              </div>

              {/* Thumbnail Image input */}
              <div className="col-md-6">
                <label className="text-white">
                  Thumbnail Photo <span>(.png, .jpg, .jpeg supported)</span>
                </label>
                <div className="">
                  <input className="form-control" type="file" placeholder="" onChange={(e) => { setFile(e.target.files); }} />
                </div>
              </div>
            </div>

            {/* Update (thumbnail image) button (only if editing existing property & new image selected). When we add support for changing the property name, this button should be changed to trigger that too. */}
            {property_name && uploadedFile && (
              <div className="col-md-12 mt-4">
                <div className="d-flex justify-content-center">
                  <button className="mw-auto" disabled={propertiesAddLoading ? true : false}
                    onClick={() => handleUpdateForExistingProp()}>
                    {!imgIsUplaoding ? <>Update</> : <Loader />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Save & Next button, only shown if adding a property */}
          {!property_name && (
            <div className="col-md-12 mt-5">
              <div className="d-flex justify-content-center">
                <button className="mw-auto" disabled={propertiesAddLoading ? true : false}
                  onClick={() => onSubmit()}>
                  {!propertiesAddLoading ? <>Create New Property</> : <Loader />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInformationForm;
