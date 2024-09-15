import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Modal } from "react-bootstrap";
import "./CopyToPropertiesModel.css"
import axios from "axios";
import ToastHandle from "../../../../../helper/ToastMessage";
import Loader, { BoxLoader } from "../../../../../helper/Loader";

// TODO: convert liveHideForReservationsData into whatever format it needs to be for the questionnaire, both for regular questions and checkbox_group. For now, that data just doesn't copy if it isn't saved first
const CopyToPropertiesModal = ({ show, setShow, question_obj, sectionName, subSectionName, checkbox_group_option, liveTextData, liveHideForReservationsData }) => {
  const store = useSelector((state) => state);

  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [copyToPropertiesLoading, setCopyToPropertiesLoading] = useState(false);

  // Construct dataToSend. If it's not a checkbox_group question, it's just the question obj. Otherwise, need to reformat
  let questionDataToSend
  if (question_obj.question_type !== "checkbox_group") {
    questionDataToSend = {...question_obj, response_text:liveTextData};
  } else {
    const index = question_obj.response_options.indexOf(checkbox_group_option);
    const response_text = liveTextData || "";
    const hide_for_reservations = question_obj?.hide_for_reservations[index] || "";
    questionDataToSend = { option:checkbox_group_option, response_text:response_text, hide_for_reservations:hide_for_reservations, question_type:question_obj.question_type };
  }
  const dataToSend = {section_name:sectionName, subsection_name:subSectionName, question:questionDataToSend, to_properties:selectedProperties.map(property => property.value)};


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
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setCopyToPropertiesLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.put( `${baseUrl}/copy_questionnaire_question`, dataToSend, config );

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
      }
      else { ToastHandle(response?.data?.error, "danger"); }
    } catch (error) {
      ToastHandle("An error occurred.", "danger");
    } finally {
      setCopyToPropertiesLoading(false);
    }
  }

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
                <Select className="custom-select property_Custom_Select" isMulti options={allPropertyNameList} value={selectedProperties} styles={colourStyles} onChange={handleDaySelect} closeMenuOnSelect={false} placeholder="--Select Properties--"/>
              </div>
            </div>
            <div className="select-all-container">
              <button className="select-btn" onClick={() => { setSelectedProperties(allPropertyNameList); }}>
                Select All
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center' }}>This will overwrite any existing data for this question in the selected properties.</p>
        
          <div style={{marginTop: "150px"}}></div> {/* Vertical spacer, so there's room in the modal for the dropdown options */}

          {!copyToPropertiesLoading ? (
            <button className="save-btn" onClick={handleSubmit}>Copy</button>
          ) : (
            <BoxLoader />
          )}

        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CopyToPropertiesModal;