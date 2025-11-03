import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import "./SelectPropertiesModal.css"
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader from "../../../../../helper/Loader";
import MultiSelect from "../../../../../component/multiSelect/multiSelect";

const SelectPropertiesModal = ({ show, setShow, currentProperty, handleSave }) => {
  const store = useSelector((state) => state);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const [selectedProperties, setSelectedProperties] = useState([]);

  const allPropertyNameList = allPropertyName?.map((property) => {
    return { value: property, label: property };
  });

  useEffect(() => {
    if (currentProperty && allPropertyName.includes(currentProperty)) {
      setSelectedProperties((prevSelected) => {
        if (!prevSelected.some(option => option.value === currentProperty)) {
          return [...prevSelected, { value: currentProperty, label: currentProperty }];
        }
        return prevSelected;
      });
    }
  }, [currentProperty, allPropertyName]);

  const handleDaySelect = (selectedOptions) => {
    const uniqueOptions = selectedOptions.filter((option, index, self) =>
      index === self.findIndex((t) => t.value === option.value)
    );
    
    if (currentProperty && allPropertyName.includes(currentProperty)) {
      if (!uniqueOptions.some(option => option.value === currentProperty)) {
        uniqueOptions.push({ value: currentProperty, label: currentProperty });
      }
    }
    setSelectedProperties(uniqueOptions);
  };

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: "#000" };
    }
  };

  const handleSubmit = () => {
    handleSave(selectedProperties.map(prop => prop.value));
    setShow(false);
  };

  return (
    <Modal show={show} size="md" onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered className="custom-model-ui" style={{zIndex: 9060}}>
      <Modal.Body>
        <div className="text-white copy-to-properties-modal">
          <h3 className="text-center fw-bold mb-4">Save To Properties</h3>

          <div className="choose-properties" style={{marginTop:'40px'}}>
            <div class="row py-2">
              <div class="col">
                <label className="fw-normal pb-2">Choose Properties</label>
                <MultiSelect
                  options={allPropertyNameList.filter(option => option.value !== currentProperty)}
                  selectedOptions={selectedProperties}
                  setSelectedOptions={setSelectedProperties}
                  placeholder="--Select Properties--"
                  selectAllText="Select All"
                  width="100%"
                />
              </div>
            </div>
          </div>

          <div style={{ padding: selectedProperties.length <= 10 ? '100px 0' : '50px 0' }} /> {/* Add a bunch of empty space */}

          <div style={{marginBottom:'10px'}}>
            <button className="save-btn" onClick={handleSubmit}>Save</button>
          </div>

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SelectPropertiesModal;