import SelectComponent from "./form_components/select";
import ShortAnswerComponent from "./form_components/short_answer";
import LongAnswerComponent from "./form_components/long_answer";
import CheckboxGroupComponent from "./form_components/checkbox_group";
import PencilIcon from "./form_components/pencil_icon";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import questionnaireData from './test_questionnaire.json';
import Loader, { BoxLoader } from "../../../../helper/Loader";
import { Prev } from "react-bootstrap/esm/PageItem";

// Code for the input components in a single section in the dynamic questionnaire (but NOT "Basics" or "Externam Resources")
const QuestionnaireSection = ({questionnaire_section_name, handleInputComponentChange, handlePencilIconClick, handleSaveAndNext}) => {

  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const apiQuestionnaireLoading = store?.getQuestionnaireReducer?.loading;
  const updateQuestionaireLoading = store?.updateQuestionnaireReducer?.loading;

  // Test data
  // questionnaire_section = questionnaireData.questionnaire["Listing Details"];
  // const subsection_order = questionnaireData.metadata.subsection_order[questionnaire_section_name];
  const questionnaire_section_data = apiQuestionnaireData.questionnaire[questionnaire_section_name];
  const subsection_order = apiQuestionnaireData.metadata.subsection_order[questionnaire_section_name];

  return (
    <div className="form-design">
      {questionnaire_section_data && subsection_order.map((subsectionName) => {
        const subsection = questionnaire_section_data[subsectionName];
        return (
          <>
            <h1 className="text-white mb-3 fs-4 fw-bold">{subsectionName}</h1>
              <div className="row my-3">
                {subsection && subsection.map((question, index) => {
                  if (question.question_type === 'select') {
                    return <SelectComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} />;
                  } else if (question.question_type === 'short_answer') {
                    return <ShortAnswerComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} />;
                  } else if (question.question_type === 'long_answer') {
                    return <LongAnswerComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} />;
                  } else if (question.question_type === 'checkbox_group') {
                    return <CheckboxGroupComponent question_object={question} sec_name={questionnaire_section_name} subsec_name={subsectionName} q_ind={index} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} />;
                  }
                })}
              </div>
            <div style={{ marginBottom: '50px' }}></div>
          </>
        );
      })}
      
      <div className="d-flex justify-content-around my-5">
        <button className="btn btn-primary" onClick={() => handleSaveAndNext(true)}> &lt; Save & Previous </button>
        <button className="border_theme_btn previous" onClick={() => handleSaveAndNext()}> Save & Next &gt; </button>
      </div>


    </div>
  );




};

export default QuestionnaireSection;