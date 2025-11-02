import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import "../copyToPropertiesModal/CopyToPropertiesModel.css";
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import { BoxLoader } from "../../../../../helper/Loader";

const DeleteFromPropertiesModal = ({ show, setShow, sectionName, subSectionName, questionText, currentPropertyName, onDeleteSuccess }) => {
  const store = useSelector((state) => state);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [deleteFromPropertiesLoading, setDeleteFromPropertiesLoading] = useState(false);

  const allPropertyNameList = allPropertyName?.map((property) => {
    return { value: property, label: property };
  });

  const handlePropertySelect = (selectedOptions) => {
    setSelectedProperties(selectedOptions);
  };

  const colourStyles = {
    option: (styles) => {
      return { ...styles, color: "var(--white-label-text-primary, #000)" };
    }
  };

  const callDeleteFromPropertiesApi = async () => {
    if (selectedProperties.length === 0) {
      ToastHandle("Please select at least one property", "danger");
      return;
    }
    
    if (!window.confirm('Are you sure you want to delete this question from the selected properties?')) {
      return;
    }

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setDeleteFromPropertiesLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const selectedPropertyNames = selectedProperties.map(property => property.value);
      const body_data = {
        section_name: sectionName,
        subsection_name: subSectionName,
        question_text: questionText,
        property_names: selectedPropertyNames
      };

      const response = await axios.post(`${baseUrl}/delete_questionnaire_question`, body_data, config);

      if (response.status === 200) {
        ToastHandle(response.data.message || "Successfully deleted question from selected properties", "success");
        
        // Check if current property is among those where the question was deleted
        if (currentPropertyName && selectedPropertyNames.includes(currentPropertyName)) {
          onDeleteSuccess(); // Trigger refresh of the current property's questionnaire
        }
        
        setShow(false);
      } else {
        ToastHandle(response?.data?.error || "Failed to delete question", "danger");
      }
    } catch (error) {
      ToastHandle("An error occurred while deleting the question", "danger");
    } finally {
      setDeleteFromPropertiesLoading(false);
    }
  };

  return (
    <Modal show={show} size="md" onHide={() => setShow(false)} aria-labelledby="contained-modal-title-vcenter" centered className="custom-model-ui">
      <Modal.Body>
        <div className="text-white copy-to-properties-modal">
          <h3 className="text-center fw-bold mb-4">Delete Question From Properties</h3>

          <div className="choose-properties">
            <div className="row py-2">
              <div className="col">
                <label className="fw-normal pb-2">Choose Properties</label>
                <Select className="custom-select property_Custom_Select" isMulti options={allPropertyNameList} value={selectedProperties} styles={colourStyles} onChange={handlePropertySelect} closeMenuOnSelect={false} placeholder="--Select Properties--"/>
              </div>
            </div>
            <div className="select-all-container">
              <button className="select-btn" onClick={() => { setSelectedProperties(allPropertyNameList); }}>
                Select All
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center', color: 'var(--white-label-status-warning, rgb(255, 165, 0))' }}>Warning: This will permanently delete this question from the selected properties.</p>
        
          <div style={{marginTop: "150px"}}></div>

          {!deleteFromPropertiesLoading ? (
            <button className="save-btn" onClick={callDeleteFromPropertiesApi} style={{ backgroundColor: 'red' }}>
              Delete
            </button>
          ) : (
            <BoxLoader />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteFromPropertiesModal;
