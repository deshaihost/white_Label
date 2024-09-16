import React, { useState, useEffect } from "react";
import {  Modal } from "react-bootstrap";
import CopyToPropertiesModal from "./copyToPropertiesModal/CopyToPropertiesModal";

const PencilIconModal = ({ show, setShowModal, question_obj, sectionName, subSectionName, checkbox_group_option, handleModalSave }) => {

  // Unpack question object, handling the special case for checkbox_group
  let { question_type, question_text, response_text, hide_for_reservations, response_options } = question_obj || {};
  let hide_for_reservations_data = null;
  if (question_type === "checkbox_group") {
    const optionIndex = response_options.indexOf(checkbox_group_option);
    hide_for_reservations_data = hide_for_reservations[optionIndex];
    response_text = response_text[optionIndex];
    question_text = checkbox_group_option;
  } else {
    hide_for_reservations_data = hide_for_reservations;
  }

  // Initialize the reservation stage selections
  const all_possible_res_stages = ["Future", "Inquiry/Past", "Current"]; // We could get this from the questionnaire API data, but that isn't too important right now
  const initialReservationStageSelections = all_possible_res_stages.reduce((obj, stage) => { // convert list to obj
    obj[stage] = false; // "false" means res stage is not chosen to be hidden. So in the UI, the button will appear as selected (blue background)
    return obj;
  }, {});

  const [reservationStageData, setReservationStageData] = useState(initialReservationStageSelections);
  const [extraNoteData, setextraNoteData] = useState("");
  const [showCopyToPropertiesModal, setShowCopyToPropertiesModal] = useState(false);

  // When the modal is opened, populate the textArea and set reservationStageData according to any previous input
  useEffect(() => {
    if (show) {
      if (hide_for_reservations_data) {
        const hiddenStages = hide_for_reservations_data.replace(/['"\[\] ]/g, '').split(','); // hide_for_reservations_data is either a json style string or a comma separated list of stages. First remove any quotes, brackets, or spaces, then split by commas
        const updatedReservationStageData = { ...reservationStageData };

        hiddenStages.forEach(stage => {
          if (updatedReservationStageData.hasOwnProperty(stage)) {
            updatedReservationStageData[stage] = true;
          }
        });
        setReservationStageData(updatedReservationStageData);
      } else {
        setReservationStageData(initialReservationStageSelections);
      }
      setextraNoteData(response_text || "");
    }
  }, [hide_for_reservations_data, show]);

  // Reset modal variables, to make sure we don't get old data when the modal is opened again
  const modalCleanup = () => {
    hide_for_reservations_data = null; // this is important. Otherwise the next time the modal is opened (show set to true), the useEffect might run and set the old hide_for_reservations_data values
    setReservationStageData(initialReservationStageSelections);
    setextraNoteData("");
  }

  const saveAndClose = () => {
    const selectedResStages = Object.keys(reservationStageData).filter(stage => reservationStageData[stage]);
    handleModalSave(selectedResStages, extraNoteData);
    modalCleanup();
    setShowModal(false);
  }

  return (
    <>
      <Modal size="md" show={show} onHide={() => saveAndClose(false)} aria-labelledby="contained-modal-title-vcenter" centered className="contact-modal" >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Additional Information
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-design mb-4">
            <label style={{ display: 'block', textAlign: 'center' }}>{question_text}</label>
            {["select", "checkbox_group"].includes(question_type) && (
              <textarea className="form-control" name={question_text} id="" cols="30" rows="10" placeholder="Enter note here..." value={extraNoteData} onChange={(e) => setextraNoteData(e.target.value)}></textarea>
            )}
            <hr style={{ borderTop: "0px solid #0078F0" }} />
            <label>Information from this question will only be provided to guests at the selected (blue) reservation stages. You can de-select stages below to prevent HostBuddy from sharing this information with those guests.</label>

            <div className=" d-flex justify-content-between mt-3">

              {/* Generate the reservation stage buttons dynamically */}
              {all_possible_res_stages.map((stage, index) => (
                <div className="col text-center" key={stage}>
                  <input type="checkbox" checked={reservationStageData[stage]} className="btn-check" id={stage} autoComplete="off" onChange={(e) => {
                    setReservationStageData(prevState => ({ ...prevState, [stage]: e.target.checked }));
                  }}/>
                  <label className={`btn btn-primary rounded-pill px-4 tab-btn-stage ${reservationStageData[stage] ? "btn-unselected" : ""}`} htmlFor={stage}>
                    {stage}
                  </label>
                </div>
              ))}

            </div>
            <hr style={{ borderTop: "2px solid #0078F0", margin: "20px 0 30px 0" }} />

            <div className="d-flex justify-content-center mt-3">
              <button className="mw-auto" onClick={() => { saveAndClose() }}>
                Save
              </button>
            </div>

            <a style={{ color:'#146EF5', textDecoration:'none', display:'block', textAlign:'center', marginTop:'15px', cursor:'pointer' }} onClick={() => setShowCopyToPropertiesModal(true)}>
              Copy To Other Properties
            </a>

          </div>
        </Modal.Body>
      </Modal>
      {showCopyToPropertiesModal && (
        <CopyToPropertiesModal show={showCopyToPropertiesModal} setShow={setShowCopyToPropertiesModal} question_obj={question_obj} sectionName={sectionName} subSectionName={subSectionName} checkbox_group_option={checkbox_group_option} liveTextData={extraNoteData} liveHideForReservationsData={reservationStageData} />
      )}
    </>
  );
};

export default PencilIconModal;
