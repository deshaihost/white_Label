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
    setImgIsUplaoding(true);

    if (uploadedFile && uploadedFile.length > 0) {
      let formData = new FormData();
      let file = uploadedFile !== null ? uploadedFile[0] : imgFile;
      if ( file?.type === "image/jpeg" || file?.type === "image/jpg" || file?.type === "image/png" ) {
        formData?.append("file", file);
        try {
            const config = {
              headers: { "X-API-Key": API_KEY },
              validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
            };
            let formData = new FormData();
            formData.append("file", uploadedFile[0]);
            config.headers["Content-Type"] = "multipart/form-data";

            const response = await axios.post( `${baseUrl}/properties/${propertyName}/add_thumbnail_image`, formData, config );
            if (response.status === 200) { ToastHandle( "Thumbnail image added successfully", "success" ); }
            else { ToastHandle( `Error adding thumbnail image: ${response?.data?.error}`, "danger" ); }
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
      //navigate(`/edit-property/${encodeURIComponent(propertyName)}`);
      navigate(`/guided-setup/${encodeURIComponent(propertyName)}`);

    } else if (propertiesAddStatus === 400) {
      ToastHandle(propertiesAddMessage, "danger");
      dispatch(stateEmptyActions());

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
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: 700,
          fontFamily: '"DM Sans", sans-serif',
          marginBottom: '16px'
        }}>
          Property Name & Thumbnail
        </h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
        {/* Property Name input (if editing existing property, shows the property name and is unchangeable) */}
        <div>
          <label className="modern-label">Property Name</label>
          <input 
            className="modern-input" 
            type="text" 
            value={propertyName || ''} 
            readOnly={!!property_name} 
            placeholder="eg. smith villa"
            onChange={(e) => { setPropertyName(e.target.value); }} 
          />
        </div>

        {/* Thumbnail Image input */}
        <div>
          <label className="modern-label">
            Thumbnail Photo <span style={{ color: '#676a73', fontSize: '11px' }}>(.png, .jpg, .jpeg supported)</span>
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <label 
              htmlFor="thumbnail-upload"
              className="modern-btn-primary" 
              style={{ 
                cursor: 'pointer', 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
            >
              Choose File
            </label>
            <input 
              id="thumbnail-upload"
              type="file" 
              style={{ display: 'none' }}
              accept=".png,.jpg,.jpeg"
              onChange={(e) => { setFile(e.target.files); }} 
            />
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              alignItems: 'center', 
              padding: '12px 16px',
              backgroundColor: '#17191f',
              border: '1px solid #013280',
              borderRadius: '8px'
            }}>
              <span style={{ 
                color: uploadedFile && uploadedFile.length > 0 ? 'white' : '#676a73', 
                fontSize: '13px',
                fontFamily: '"DM Sans", sans-serif'
              }}>
                {uploadedFile && uploadedFile.length > 0 ? uploadedFile[0].name : 'No file chosen'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Update (thumbnail image) button (only if editing existing property & new image selected). When we add support for changing the property name, this button should be changed to trigger that too. */}
      {property_name && uploadedFile && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
          <button 
            className="modern-btn-primary" 
            disabled={propertiesAddLoading || imgIsUplaoding}
            onClick={() => handleUpdateForExistingProp()}
          >
            {!imgIsUplaoding ? 'Update Thumbnail' : <Loader />}
          </button>
        </div>
      )}

      {/* Save & Next button, only shown if adding a property */}
      {!property_name && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button 
            className="modern-btn-primary"
            style={{ paddingLeft: '48px', paddingRight: '48px' }}
            disabled={propertiesAddLoading}
            onClick={() => onSubmit()}
          >
            {!propertiesAddLoading ? 'Create New Property' : <Loader />}
          </button>
        </div>
      )}
    </div>
  );
};

export default BasicInformationForm;
