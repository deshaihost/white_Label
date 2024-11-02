import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import "./CopyToPropertiesModel.css"
import axios from "axios";
import ToastHandle from "../../../../../../../helper/ToastMessage";
import Loader from "../../../../../../../helper/Loader";

const CopyToPropertiesModal = ({ show, setShow, fileName, propertyName }) => {
  const store = useSelector((state) => state);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [copyToPropertiesLoading, setCopyToPropertiesLoading] = useState(false);

  const allPropertyNameList = allPropertyName?.map((property) => {
    return { value: property, label: property };
  });

  const handleDaySelect = (selectedOptions) => {
    setSelectedProperties(selectedOptions);
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: "#000" };
    }
  };

  const callCopyFileApi = async (selectedProperties) => {
    setCopyToPropertiesLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    
    const data_to_send = {
      to_properties: selectedProperties.map(obj => obj.value),
      source_property: propertyName,
      file_name: fileName
    };

    try {
      const config = {
        headers: { "X-API-Key": API_KEY, 'Content-Type': 'application/json' },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.post(`${baseUrl}/copy_file`, data_to_send, config);

      if (response.status === 200) {
        ToastHandle("File copied successfully", "success");
        setShow(false);
      } else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) { ToastHandle("Error copying file", "danger"); }
    finally { setCopyToPropertiesLoading(false); }
  };

  const handleSubmit = () => {
    if (selectedProperties.length === 0) {
      ToastHandle("Please select at least one property", "danger");
    } else {
      callCopyFileApi(selectedProperties);
    }
  };

  return (
    <Modal show={show} size="md" onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered className="custom-model-ui" style={{zIndex: 9060}}>
      <Modal.Body>
        <div className="text-white copy-to-properties-modal">
          <h3 className="text-center fw-bold mb-4">Copy To Other Properties</h3>

          <div className="choose-properties" style={{marginTop:'40px'}}>
            <div class="row py-2">
              <div class="col">
                <label className="fw-normal pb-2">Choose Properties</label>
                <Select className="custom-select property_Custom_Select" isMulti options={allPropertyNameList} value={selectedProperties} styles={colourStyles} onChange={handleDaySelect} closeMenuOnSelect={false} placeholder="--Select Properties--"/>
              </div>
            </div>
            <div className="select-all-container">
              <button className="select-btn" onClick={() => { setSelectedProperties(allPropertyNameList); }}>
                Select All
              </button>
            </div>
          </div>

          <div style={{ padding: selectedProperties.length <= 10 ? '100px 0' : '50px 0' }} /> {/* Add a bunch of empty space */}

          <div style={{marginBottom:'10px'}}>
            {!copyToPropertiesLoading ? (
              <button className="save-btn" onClick={handleSubmit}>Copy</button>
            ) : (
              <Loader />
            )}
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CopyToPropertiesModal;