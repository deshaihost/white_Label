import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import axios from "axios";
import ToastHandle from "../../../../helper/ToastMessage";
import { BoxLoader } from "../../../../helper/Loader";
import DeleteFromPropertiesModal from "./deleteFromPropertiesModal/DeleteFromPropertiesModal";

const PencilIconModal = ({ show, setShowModal, question_obj, sectionName, subSectionName, checkbox_group_option, handleModalSave, callDeleteQuestionApi, questionIndex, propertyName }) => {

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
  const [showDeleteFromPropertiesModal, setShowDeleteFromPropertiesModal] = useState(false);
  const [questionDeleted, setQuestionDeleted] = useState(false);
  
  // Copy to properties state
  const [showCopyToProperties, setShowCopyToProperties] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [copyToPropertiesLoading, setCopyToPropertiesLoading] = useState(false);
  
  // Get properties from Redux store
  const store = useSelector((state) => state);
  const property_data = store?.getUserDataReducer?.getUserData?.data?.user?.property_data;
  const allPropertyName = property_data !== undefined ? Object.keys(property_data) : [];
  const allPropertyNameList = allPropertyName?.map((property) => {
    return { value: property, label: property };
  });

  // Check if phases are modified (any stage is deselected)
  const arePhasesModified = Object.values(reservationStageData).some(value => value === true);

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

  const handleDeleteQuestion = () => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestionDeleted(true);
      callDeleteQuestionApi(sectionName, subSectionName, question_text, propertyName);
      setShowModal(false);
    }
  }

  // Copy to properties functionality
  const callCopyToPropertiesApi = async () => {
    // Construct dataToSend. If it's not a checkbox_group question, it's just the question obj. Otherwise, need to reformat
    let questionDataToSend;
    if (question_type !== "checkbox_group") {
      questionDataToSend = {...question_obj, response_text: extraNoteData};
    } else {
      const index = response_options.indexOf(checkbox_group_option);
      const response_text_data = extraNoteData || "";
      const hide_for_reservations_formatted = hide_for_reservations[index] || "";
      questionDataToSend = { 
        option: checkbox_group_option, 
        response_text: response_text_data, 
        hide_for_reservations: hide_for_reservations_formatted, 
        question_type: question_type 
      };
    }
    
    const dataToSend = {
      section_name: sectionName, 
      subsection_name: subSectionName, 
      question: questionDataToSend, 
      to_properties: selectedProperties.map(property => property.value)
    };

    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setCopyToPropertiesLoading(true);

    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; }
      };

      const response = await axios.put(`${baseUrl}/copy_questionnaire_question`, dataToSend, config);

      if (response.status === 200) {
        ToastHandle(response.data.message, "success");
        setShowCopyToProperties(false);
        setSelectedProperties([]);
      } else { 
        ToastHandle(response?.data?.error, "danger"); 
      }
    } catch (error) {
      ToastHandle("An error occurred.", "danger");
    } finally {
      setCopyToPropertiesLoading(false);
    }
  };

  const handleCopyToProperties = () => {
    if (selectedProperties.length === 0) {
      ToastHandle("Please select at least one property", "warning");
      return;
    }
    callCopyToPropertiesApi();
  };

  // Reset modal variables, to make sure we don't get old data when the modal is opened again
  const modalCleanup = () => {
    hide_for_reservations_data = null; // this is important. Otherwise the next time the modal is opened (show set to true), the useEffect might run and set the old hide_for_reservations_data values
    setReservationStageData(initialReservationStageSelections);
    setextraNoteData("");
    setQuestionDeleted(false);
    setShowCopyToProperties(false);
    setSelectedProperties([]);
  }

  const saveAndClose = () => {
    // Only save if the question hasn't been deleted
    if (!questionDeleted) {
      const selectedResStages = Object.keys(reservationStageData).filter(stage => reservationStageData[stage]);
      handleModalSave(selectedResStages, extraNoteData);
    }
    modalCleanup();
    setShowModal(false);
  }

  return (
    <>
      <Modal 
        size="md" 
        show={show} 
        onHide={() => saveAndClose()} 
        aria-labelledby="contained-modal-title-vcenter" 
        centered 
        contentClassName="modern-modal"
        style={{ fontFamily: '"DM Sans", sans-serif' }}
      >
        <div style={{
          background: 'var(--white-label-background-primary, #0F1117)',
          border: '1px solid var(--white-label-border-primary, #013280)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <Modal.Header 
            style={{
              background: 'var(--white-label-background-secondary, #17191f)',
              borderBottom: '1px solid var(--white-label-border-primary, #013280)',
              padding: '20px 24px'
            }}
          >
            <div style={{ flex: 1 }}>
              <Modal.Title style={{ 
                fontSize: '18px',
                fontWeight: '500',
                color: 'var(--white-label-text-primary, #fff)',
                margin: 0,
                marginBottom: '4px'
              }}>
                Additional Information
              </Modal.Title>
              <p style={{
                fontSize: '12px',
                color: 'var(--white-label-text-tertiary, #a6a9b2)',
                margin: 0
              }}>
                Configure visibility and management options
              </p>
            </div>
            <button
              onClick={() => saveAndClose()}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--white-label-text-quaternary, #676a73)',
                fontSize: '24px',
                cursor: 'pointer',
                padding: 0,
                marginLeft: 'auto'
              }}
            >
              ×
            </button>
          </Modal.Header>
          
          <Modal.Body style={{ padding: '24px', background: 'var(--white-label-background-primary, #0F1117)' }}>
            <div>
              {/* Question Label */}
              <label className="modern-label" style={{ 
                display: 'block', 
                textAlign: 'center',
                marginBottom: '16px',
                fontSize: '16px'
              }}>
                {question_text}
              </label>
              
              {/* Extra Note Textarea - only for select and checkbox_group */}
              {["select", "checkbox_group"].includes(question_type) && (
                <textarea 
                  className="modern-input" 
                  name={question_text} 
                  cols="30" 
                  rows="6" 
                  placeholder="Enter note here..." 
                  value={extraNoteData} 
                  onChange={(e) => setextraNoteData(e.target.value)}
                  style={{ marginBottom: '24px', minHeight: '120px' }}
                />
              )}

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                background: 'var(--white-label-border-primary, #013280)', 
                margin: '24px 0' 
              }} />

              {/* Reservation Stages Section with Badge */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  marginBottom: '12px' 
                }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--white-label-text-primary, #fff)',
                    margin: '0',
                    padding: '0',
                    lineHeight: '1.2'
                  }}>
                    Reservation Stages
                  </div>
                  {arePhasesModified && (
                    <span style={{
                      background: 'var(--white-label-status-warning, #FB923C)',
                      color: 'var(--white-label-text-primary, #fff)',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      lineHeight: '1',
                      display: 'inline-flex',
                      alignItems: 'center',
                      height: '18px',
                      margin: '0'
                    }}>
                      Phases Modified
                    </span>
                  )}
                </div>
                <label className="modern-label" style={{ 
                  display: 'block',
                  marginBottom: '16px',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  color: 'var(--white-label-text-tertiary, #a6a9b2)',
                  fontWeight: '400'
                }}>
                  Select which reservation stages should have access to this information. Deselected stages will not see this information.
                </label>
              </div>

              {/* Reservation Stage Buttons */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(3, 1fr)', 
                gap: '12px',
                marginBottom: '24px'
              }}>
                {all_possible_res_stages.map((stage) => {
                  const isSelected = !reservationStageData[stage]; // inverted logic from original
                  return (
                    <div key={stage}>
                      <input 
                        type="checkbox" 
                        checked={reservationStageData[stage]} 
                        id={stage} 
                        autoComplete="off" 
                        onChange={(e) => {
                          setReservationStageData(prevState => ({ ...prevState, [stage]: e.target.checked }));
                        }}
                        style={{ display: 'none' }}
                      />
                      <label 
                        htmlFor={stage}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          textAlign: 'center',
                          background: isSelected ? 'var(--white-label-interactive-primary, #3e88f7)' : 'var(--white-label-background-primary, #0F1117)',
                          color: isSelected ? 'var(--white-label-text-primary, #fff)' : 'var(--white-label-text-quaternary, #676a73)',
                          border: `2px solid ${isSelected ? 'var(--white-label-interactive-primary, #3e88f7)' : 'var(--white-label-border-primary, #013280)'}`,
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                          userSelect: 'none',
                          display: 'block',
                          boxShadow: isSelected ? '0 0 12px rgba(62, 136, 247, 0.15)' : 'none'
                        }}
                      >
                        {stage}
                      </label>
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                background: 'var(--white-label-border-primary, #013280)', 
                margin: '24px 0' 
              }} />

              {/* Management Options Section */}
              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--white-label-text-primary, #fff)',
                  margin: '0 0 12px 0'
                }}>
                  Management Options
                </h3>

                <div style={{ marginBottom: '12px' }}>
                  {/* Copy to Properties Toggle */}
                  <button
                    onClick={() => setShowCopyToProperties(!showCopyToProperties)}
                    style={{
                      width: '100%',
                      background: 'var(--white-label-background-primary, #0F1117)',
                      border: `1px solid ${showCopyToProperties ? 'var(--white-label-interactive-primary, #3e88f7)' : 'var(--white-label-border-primary, #013280)'}`,
                      color: 'var(--white-label-interactive-primary, #3e88f7)',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Other Properties
                    <span style={{ marginLeft: 'auto', fontSize: '18px' }}>
                      {showCopyToProperties ? '−' : '+'}
                    </span>
                  </button>

                  {/* Copy to Properties Expanded Section */}
                  {showCopyToProperties && (
                    <div style={{
                      marginTop: '12px',
                      padding: '16px',
                      background: 'var(--white-label-background-secondary, #17191f)',
                      border: '1px solid var(--white-label-border-primary, #013280)',
                      borderRadius: '8px'
                    }}>
                      <label className="modern-label" style={{ marginBottom: '8px', display: 'block' }}>
                        Choose Properties
                      </label>
                      <Select
                        isMulti
                        options={allPropertyNameList}
                        value={selectedProperties}
                        onChange={setSelectedProperties}
                        closeMenuOnSelect={false}
                        placeholder="--Select Properties--"
                        styles={{
                          control: (base) => ({
                            ...base,
                            background: 'var(--white-label-background-input, #01255e)',
                            borderColor: 'var(--white-label-border-primary, #013280)',
                            color: 'var(--white-label-text-primary, #fff)',
                            minHeight: '42px'
                          }),
                          menu: (base) => ({
                            ...base,
                            background: 'var(--white-label-background-input, #01255e)',
                            border: '1px solid var(--white-label-border-primary, #013280)'
                          }),
                          option: (base, state) => ({
                            ...base,
                            background: state.isFocused ? 'var(--white-label-border-primary, #013280)' : 'var(--white-label-background-input, #01255e)',
                            color: 'var(--white-label-text-primary, #fff)',
                            cursor: 'pointer'
                          }),
                          multiValue: (base) => ({
                            ...base,
                            background: 'var(--white-label-border-primary, #013280)'
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: 'var(--white-label-text-primary, #fff)'
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: 'var(--white-label-text-tertiary, #a6a9b2)',
                            ':hover': {
                              background: 'var(--white-label-interactive-primary, #3e88f7)',
                              color: 'var(--white-label-text-primary, #fff)'
                            }
                          })
                        }}
                      />
                      <button
                        onClick={() => setSelectedProperties(allPropertyNameList)}
                        style={{
                          marginTop: '8px',
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--white-label-interactive-primary, #3e88f7)',
                          fontSize: '13px',
                          cursor: 'pointer',
                          padding: '4px 0',
                          textDecoration: 'underline'
                        }}
                      >
                        Select All
                      </button>
                      <p style={{
                        fontSize: '12px',
                        color: 'var(--white-label-text-tertiary, #a6a9b2)',
                        margin: '12px 0',
                        textAlign: 'center'
                      }}>
                        This will overwrite any existing data for this question in the selected properties.
                      </p>
                      {copyToPropertiesLoading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '12px' }}>
                          <BoxLoader />
                        </div>
                      ) : (
                        <button
                          onClick={handleCopyToProperties}
                          className="modern-btn-primary"
                          style={{ width: '100%', marginTop: '8px' }}
                        >
                          Copy to Selected Properties
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Delete Options - only for certain sections */}
                {((sectionName === 'SOPs' || (sectionName === 'Extras' && subSectionName === 'Other') || sectionName === 'Topics to Avoid')) && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                      onClick={() => handleDeleteQuestion(true)}
                      style={{
                        width: '100%',
                        background: 'var(--white-label-background-primary, #0F1117)',
                        border: '1px solid var(--white-label-border-primary, #013280)',
                        color: 'var(--white-label-status-error, #ef4444)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#4a1616';
                        e.target.style.borderColor = 'var(--white-label-status-error, #ef4444)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'var(--white-label-background-primary, #0F1117)';
                        e.target.style.borderColor = 'var(--white-label-border-primary, #013280)';
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete Entry
                    </button>
                    
                    <button
                      onClick={() => setShowDeleteFromPropertiesModal(true)}
                      style={{
                        width: '100%',
                        background: 'var(--white-label-background-primary, #0F1117)',
                        border: '1px solid var(--white-label-border-primary, #013280)',
                        color: 'var(--white-label-status-error, #ef4444)',
                        padding: '12px 16px',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#4a1616';
                        e.target.style.borderColor = 'var(--white-label-status-error, #ef4444)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'var(--white-label-background-primary, #0F1117)';
                        e.target.style.borderColor = 'var(--white-label-border-primary, #013280)';
                      }}
                    >
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete from Multiple Properties
                    </button>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{ 
                height: '1px', 
                background: 'var(--white-label-border-primary, #013280)', 
                margin: '24px 0 16px 0' 
              }} />

              {/* Save Button */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => saveAndClose()}
                  className="modern-btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button 
                  className="modern-btn-primary"
                  onClick={() => { saveAndClose() }}
                  style={{ flex: 1 }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </Modal.Body>
        </div>
      </Modal>
      
      {showDeleteFromPropertiesModal && (
        <DeleteFromPropertiesModal 
          show={showDeleteFromPropertiesModal} 
          setShow={setShowDeleteFromPropertiesModal} 
          sectionName={sectionName} 
          subSectionName={subSectionName} 
          questionText={question_text} 
          currentPropertyName={propertyName}
          onDeleteSuccess={() => {
            setQuestionDeleted(true);
            callDeleteQuestionApi(sectionName, subSectionName, question_text, propertyName);
          }}
        />
      )}
    </>
  );
};

export default PencilIconModal;
