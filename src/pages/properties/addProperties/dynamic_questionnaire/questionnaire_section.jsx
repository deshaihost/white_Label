import SelectComponent from "./form_components/select";
import ShortAnswerComponent from "./form_components/short_answer";
import LongAnswerComponent from "./form_components/long_answer";
import CheckboxGroupComponent from "./form_components/checkbox_group";
import React from "react";
import Loader from "../../../../helper/Loader";

// Code for the input components in a single section in the dynamic questionnaire (but NOT "Basics" or "External Resources")
const QuestionnaireSection = ({questionnaire_section_name, liveQuestionnaireData, handleInputComponentChange, handlePencilIconClick, handleSaveAndNext, triggeredSaveLoading, property_name, section_num, num_total_sections}) => {

  const questionnaire_section_data = liveQuestionnaireData.questionnaire[questionnaire_section_name];
  const subsection_order = liveQuestionnaireData.metadata.subsection_order[questionnaire_section_name];

  const is_first_section = section_num === 0;
  const is_last_section = section_num === num_total_sections - 1;

  return (
    <div className="form-design">
      <p style={{ color: 'white', marginBottom: '50px', color: '#AAA' }}>All fields are optional, but the more details you provide, the better HostBuddy can serve your guests.</p>

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


    </div>
  );




};

export default QuestionnaireSection;