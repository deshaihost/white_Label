import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import "./CopyToPropertiesModel.css"
import axios from "axios";
import ToastHandle from "../ToastMessage";

const CopyToPropertiesModal = (props) => {
  const { show, setShow, schedule } = props;
  const store = useSelector((state) => state);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [selectedTimeZone, setSelectedTimeZone] = useState("actual");
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

  const callCopyToPropertiesApi = async () => {
    setCopyToPropertiesLoading(true);
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const getSessionStorageData = JSON.parse(sessionStorage.getItem("hostBuddy_auth"));
    const token = getSessionStorageData?.token;

    const data_to_send = { properties:selectedProperties, schedules:schedule, copyToLocalTime:selectedTimeZone === "relative" }

    try {
      if (token) {
        const config = {
          headers: { Authorization: `Bearer ${token}`, "X-API-Key": API_KEY },
          validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
        };

        const response = await axios.get(`${baseUrl}/set_recurring_schedule`, data_to_send, config);

        if (response.status === 200) {
          ToastHandle("Schedule copied successfully", "success");
          setShow(false);
        } else { ToastHandle(response?.data?.error, "danger"); }
      }
    } catch (error) { ToastHandle("Error copying schedule", "danger"); }
    finally { setCopyToPropertiesLoading(false); }
  };

  const handleSubmit = () => {
    callCopyToPropertiesApi();
  }


  return (
    <Modal show={show} size="md" onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered className="custom-model-ui">
      <Modal.Body>
        <div className="text-white copy-to-properties-modal">
          <h3 className="text-center fw-bold mb-4">Copy To Other Properties</h3>

          <div className="choose-properties">
            <div class="row py-2">
              <div class="col">
                <label className="fw-normal pb-2">Choose Properties</label>
                <Select className="custom-select property_Custom_Select" isMulti options={allPropertyNameList} value={selectedProperties} styles={colourStyles} onChange={handleDaySelect} placeholder="--Select--"/>
              </div>
            </div>
            <div className="select-all-container">
              <button className="select-btn" onClick={() => { setSelectedProperties(allPropertyNameList); }}>
                Select All
              </button>
            </div>
          </div>
        
          <div>
            <div className="cs-select-option time-zone-section">
              <label className="fw-normal pb-2">Time Zone Behavior</label>
              <select className="form-select form-control time-zone-select" aria-label="Time zone select menu" value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)}>
                <option value="actual">Copy Actual Time</option>
                <option value="relative">Copy Relative Time</option>
              </select>
              {selectedTimeZone === 'relative' && (
                <p>e.g. “12PM - 6PM (PST)” for a US/Pacific property will copy as “12PM - 6PM (EST)” to a US/Eastern property</p>
              )}
              {selectedTimeZone === 'actual' && (
                <p>e.g. “12PM - 6PM (PST)” for a US/Pacific property will copy as “3PM - 9PM (EST)” to a US/Eastern property</p>
              )}
            </div>
          </div>

          <button className="save-btn" onClick={handleSubmit}>Copy</button>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CopyToPropertiesModal;