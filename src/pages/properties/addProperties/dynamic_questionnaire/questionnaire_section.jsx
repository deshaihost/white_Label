import SelectComponent from "./form_components/select";
import ShortAnswerComponent from "./form_components/short_answer";
import LongAnswerComponent from "./form_components/long_answer";
import CheckboxGroupComponent from "./form_components/checkbox_group";
import React, { useState } from "react";
import Loader from "../../../../helper/Loader";
import AddQuestionModal from "./AddQuestionModal";

// Code for the input components in a single section in the dynamic questionnaire (but NOT "Basics" or "External Resources")
const QuestionnaireSection = ({questionnaire_section_name, liveQuestionnaireData, handleInputComponentChange, handlePencilIconClick, handleSaveAndNext, triggeredSaveLoading, property_name, section_num, num_total_sections}) => {

  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [currentSubsection, setCurrentSubsection] = useState("");

  const questionnaire_section_data = liveQuestionnaireData.questionnaire[questionnaire_section_name];
  const subsection_order = liveQuestionnaireData.metadata.subsection_order[questionnaire_section_name];

  const is_first_section = section_num === 0;
  const is_last_section = section_num === num_total_sections - 1;
  
  const isTopicsToAvoid = questionnaire_section_name === "Topics to Avoid";
  const isSOPs = questionnaire_section_name === "SOPs";
  const shouldShowAddItem = isTopicsToAvoid || isSOPs;

  const handleAddButtonClick = (subsectionName) => {
    setCurrentSubsection(subsectionName);
    setShowAddQuestionModal(true);
  };

  const handleAddQuestion = (subsectionName, questionText, responseText) => {
    const topics_to_avoid_placeholder_text = "(Optional) Clarify the definition of this topic to help the AI apply it to the right messages...";
    const general_placeholder_text = "Enter text...";

    // Create a new question object of long_answer type
    const newQuestion = {
      question_text: questionText,
      question_type: "long_answer",
      response_text: responseText,
      placeholder_text: questionnaire_section_name === "Topics to Avoid" ? topics_to_avoid_placeholder_text : general_placeholder_text,
      hide_for_reservations: "[]"
    };

    // Create a deep copy of the data
    const updatedData = JSON.parse(JSON.stringify(liveQuestionnaireData));
    
    // Initialize section if it doesn't exist
    if (!updatedData.questionnaire[questionnaire_section_name]) {
      updatedData.questionnaire[questionnaire_section_name] = {};
    }
    
    // Initialize subsection if it doesn't exist
    if (!updatedData.questionnaire[questionnaire_section_name][subsectionName]) {
      updatedData.questionnaire[questionnaire_section_name][subsectionName] = [];
      
      // Also make sure it's in the subsection_order if needed
      if (!updatedData.metadata.subsection_order[questionnaire_section_name]) {
        updatedData.metadata.subsection_order[questionnaire_section_name] = [];
      }
      if (!updatedData.metadata.subsection_order[questionnaire_section_name].includes(subsectionName)) {
        updatedData.metadata.subsection_order[questionnaire_section_name].push(subsectionName);
      }
    }
    
    // Add the new question
    updatedData.questionnaire[questionnaire_section_name][subsectionName].push(newQuestion);
    
    // Update the state with the modified data
    const questionIndex = updatedData.questionnaire[questionnaire_section_name][subsectionName].length - 1;
    
    // Create a custom event that includes both the question text and response text
    const customEvent = {
      target: { 
        value: responseText,
        dataset: { 
          questionText: questionText,
          placeholderText: newQuestion.placeholder_text
        }
      }
    };
    
    handleInputComponentChange(
      customEvent,
      questionnaire_section_name,
      subsectionName,
      questionIndex,
      "long_answer"
    );
  };

  return (
    <div className="form-design">
      {questionnaire_section_name === "Topics to Avoid" ? (
        <>
          <p style={{marginBottom:'50px', color:'#AAA'}}>In this section, you can <span style={{color:'rgb(255,165,0)'}}>add any conversation topics that you want HostBuddy to avoid</span> while communicating with your guests. If a guest's message relates to any of the topics you add here, HostBuddy will not respond to it.</p>
          <p style={{marginBottom:'50px', color:'#AAA'}}>Unsure what topics to avoid? View the full guide with examples and setup tips in the <a href="https://userguide.hostbuddy.ai/property-profile-setup/setting-topics-to-avoid" target="_blank" rel="noopener noreferrer">HostBuddy User Guide</a>.</p>
        </>
      ) : questionnaire_section_name === "SOPs" ? (
          <p style={{marginBottom:'50px', color:'#AAA'}}>Need help writing SOPs? View the full guide with step-by-step instructions in the <a href="https://userguide.hostbuddy.ai/property-profile-setup/building-standard-operating-procedures" target="_blank" rel="noopener noreferrer">HostBuddy User Guide</a>.</p>
      ) : (
        <p style={{marginBottom:'50px', color:'#AAA'}}>All fields are optional, but the more details you provide, the better HostBuddy can serve your guests.</p>
      )}

      {/* Form for this questionnaire section (map thru each subsection & question) */}
      {questionnaire_section_data && subsection_order.map((subsectionName) => {
        const subsection = questionnaire_section_data[subsectionName];
        return (
          <React.Fragment key={subsectionName}>
            <h1 className="text-white mb-3 fs-4 fw-bold">{subsectionName}</h1>
              <div className="row my-3">
                {subsection && subsection.map((question, index) => {
                  if (question.question_type === 'select') {
                    return <SelectComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} key={index} />;
                  } else if (question.question_type === 'short_answer') {
                    return <ShortAnswerComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} key={index} />;
                  } else if (question.question_type === 'long_answer') {
                    return <LongAnswerComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} key={index} />;
                  } else if (question.question_type === 'checkbox_group') {
                    return <CheckboxGroupComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} key={index} />;
                  }
                })}
              </div>
              
              {/* Add Question Button - Now visible in Topics to Avoid AND SOPs sections */}
              {shouldShowAddItem && (
                <div className="d-flex justify-content-start mb-4">
                  <a className="add-item-link" onClick={() => handleAddButtonClick(subsectionName)}>
                    <i className="fas fa-plus me-1"></i> + Add Item
                  </a>
                </div>
              )}
            <div style={{ marginBottom: '50px' }}></div>
          </React.Fragment>
        );
      })}
      
      {/* Prev and Next buttons */}
      <div className="d-flex justify-content-around my-5">
        {triggeredSaveLoading ? (
          <Loader />
        ) : (
          <>
            <button className="btn btn-primary" onClick={() => handleSaveAndNext(true)}>
              {is_first_section ? "Save & Exit" : " < Save & Previous"}
            </button>
            <button className="border_theme_btn previous" onClick={() => handleSaveAndNext()}>
              {is_last_section ? "Save & Finish" : "Save & Next >"}
            </button>
          </>
        )}
      </div>

      <AddQuestionModal 
        show={showAddQuestionModal} 
        handleClose={() => setShowAddQuestionModal(false)} 
        handleAddQuestion={handleAddQuestion} 
        subsectionName={currentSubsection}
        skipPresets={questionnaire_section_name === "SOPs"} // Add this prop to skip presets for SOPs section
      />
    </div>
  );
};

export default QuestionnaireSection;