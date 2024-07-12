import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { getUserDataActions } from "../../redux/actions";
import { Modal } from "react-bootstrap";
import "./CopyToPropertiesModel.css"

const CopyToPropertiesModalDynamically = (props) => {
  const {
    show,
    modelClose,
    headingDynamicallyNameChange,
    saveButtonMain,
    dynamicallyDataGetInChildComponent,
  } = props;

  const store = useSelector((state) => state);
  const dispatch = useDispatch();

  //
  const createPropertiesName =
    store?.getUserDataReducer?.getUserData?.data?.user?.properties;
  const allPropertyName =
    createPropertiesName !== undefined ? createPropertiesName : [];
  const [propertyName, setPropertyName] = useState([]);

  const allPropertyNameList = allPropertyName?.map((property) => {
    return { value: property, label: property };
  });

  const handleDaySelect = (selectedOptions) => {
    setPropertyName(selectedOptions);
  };
  //

  // time zone
  const [selectedTimeZone, setSelectedTimeZone] = useState(""); // Initialize state to store user selection

  const handleSelectChange = (event) => {
    setSelectedTimeZone(event.target.value); // Update state with user selection
  };
  // time zone

  // user List get
  useEffect(() => {
    dispatch(getUserDataActions());
  }, []);

  useEffect(() => {
    dynamicallyDataGetInChildComponent({
      propertyName,
      selectedTimeZone,
    });
  }, [propertyName, selectedTimeZone]);
  // user List get

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      console.log({ data, isDisabled, isFocused, isSelected });
      return {
        ...styles,
        color: "#000"
      };
    }
  };


  return (
    <Modal
      show={show}
      size="md"
      onHide={modelClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-model-ui"
    >
      <Modal.Body>
        <div className="text-white">
          <h3 className="text-center fw-bold mb-4">{headingDynamicallyNameChange}</h3>
          <div>
            <div class="row py-2">
              <div class="col">
                <label className="fw-normal pb-2">Choose Day[s] of Week:</label>
                <Select
                  className="custom-select property_Custom_Select"
                  isMulti
                  options={allPropertyNameList}
                  value={propertyName}
                  styles={colourStyles}
                  onChange={handleDaySelect}
                  placeholder="--Select--"
                />
              </div>
            </div>
          </div>
          <button className="select-btn pt-1"
            onClick={() => {
              setPropertyName(allPropertyNameList);
            }}
          >
            Select All
          </button>
          <div>
            <div className="cs-select-option my-4">
            <label className="fw-normal pb-2">Selected Time Zone: {selectedTimeZone}</label>
              <select
                className="form-select form-control"
                aria-label="Time zone select menu"
                value={selectedTimeZone}
                onChange={handleSelectChange}
              >
                <option value="" disabled>
                  Select time zone option
                </option>
                <option value="source">Use source property time zone</option>
                <option value="destination">
                  Convert to destination property time zone
                </option>
              </select>
             {" "}
              {/* Display selected option */}
            </div>
          </div>
          <button className="save-btn" onClick={saveButtonMain}>Save Button</button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CopyToPropertiesModalDynamically;