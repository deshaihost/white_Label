import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getUserDataActions } from "../../redux/actions";
import { Modal } from "react-bootstrap";
import "./CopyToPropertiesModel.css"

const CopyToPropertiesModalDynamically = (props) => {
  const { show, modelClose, headingDynamicallyNameChange, saveButtonMain, dynamicallyDataGetInChildComponent } = props;
  const store = useSelector((state) => state);
  const dispatch = useDispatch();


  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const [propertyName, setPropertyName] = useState([]);

  const allPropertyNameList = allPropertyName?.map((property) => {
    return { value: property, label: property };
  });

  const handleDaySelect = (selectedOptions) => {
    setPropertyName(selectedOptions);
  };


  const [selectedTimeZone, setSelectedTimeZone] = useState(""); // Initialize state to store user selection


  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  useEffect(() => {
    dynamicallyDataGetInChildComponent({ propertyName, selectedTimeZone });
  }, [propertyName, selectedTimeZone]);

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: "#000" };
    }
  };


  return (
    <Modal show={show} size="md" onHide={modelClose} aria-labelledby="contained-modal-title-vcenter" centered className="custom-model-ui">
      <Modal.Body>
        <div className="text-white copy-to-properties-modal">
          <h3 className="text-center fw-bold mb-4">{headingDynamicallyNameChange}</h3>

          <div className="choose-properties">
            <div class="row py-2">
              <div class="col">
                <label className="fw-normal pb-2">Choose Properties</label>
                <Select className="custom-select property_Custom_Select" isMulti options={allPropertyNameList} value={propertyName} styles={colourStyles} onChange={handleDaySelect} placeholder="--Select--"/>
              </div>
            </div>
            <div className="select-all-container">
              <button className="select-btn" onClick={() => { setPropertyName(allPropertyNameList); }}>
                Select All
              </button>
            </div>
          </div>
        
          <div>
            <div className="cs-select-option time-zone-section">
              <label className="fw-normal pb-2">Time Zone Behavior</label>
              <select className="form-select form-control time-zone-select" aria-label="Time zone select menu" value={selectedTimeZone} onChange={(e) => setSelectedTimeZone(e.target.value)}>
                <option value="relative">Copy Relative Time</option>
                <option value="actual">Copy Actual Time</option>
              </select>
              {selectedTimeZone === 'relative' && (
                <p>e.g. “12PM - 6PM (PST)” for a US/Pacific property will copy as “12PM - 6PM (EST)” to a US/Eastern property</p>
              )}
              {selectedTimeZone === 'actual' && (
                <p>e.g. “12PM - 6PM (PST)” for a US/Pacific property will copy as “3PM - 9PM (EST)” to a US/Eastern property</p>
              )}
            </div>
          </div>

          <button className="save-btn" onClick={saveButtonMain}>Copy</button>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CopyToPropertiesModalDynamically;