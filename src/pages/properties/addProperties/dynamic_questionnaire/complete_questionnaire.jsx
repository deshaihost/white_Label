import React, { useState, useEffect} from "react";
import "../AddProperty.css";
import QuestionnaireHeader from "./questionnaire_header";
import { stateEmptyActions, updateQuestionnaireActions } from "../../../../redux/actions";
import { getQuestionnaireActions } from "../../../../redux/actions";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import QuestionnaireSection from "./questionnaire_section";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { BoxLoader } from "../../../../helper/Loader";
import axios from "axios";
import PencilIconModal from "./PencilIconModal";


// Code for the entire questionnaire page, including the header and all sections, including Basics and External Resources
const QuestionnairePage = () => {
  const { property_name } = useParams();

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const questionnaire_section_names = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire?.metadata?.section_order

  const [selectedSection, setSelectedSection] = useState("Basics");
  const [questionnairePostLoading, setQuestionnairePostLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(false); // whether there is new data to update to the API
  const [showModal, setShowModal] = useState(false); // pencil icon modal
  const [dataForModal, setDataForModal] = useState({}); // data to be passed to the pencil icon modal

  // Get the questionnaire data from the API, if we don't have it already. Should run once, immediately when the page loads
  useEffect(() => {
    if (property_name) {
      if (!apiQuestionnaireData) { dispatch(getQuestionnaireActions(property_name)); }
    }
  }, [property_name]);

  const update_questionnaire_to_API = async (property_name, questionnaire_data) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;
    setQuestionnairePostLoading(true);
    try {
      const config = {
        headers: { "X-API-Key": API_KEY },
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };

      const response = await axios.put( `${baseUrl}/properties/${property_name}/update_questionnaire`, questionnaire_data, config );
      if (response.status === 200) { } //ToastHandle(response.data.message, "success");
      else { } //ToastHandle(response?.data?.error, "danger");
      return response.status;
    } catch (error) {  } //ToastHandle(error, "danger");
    finally { setQuestionnairePostLoading(false); }
    return -1;
  }

  // Auto save. Every 10 seconds, if there's changed form data, send the questionnaire to the API
  useEffect(() => {
    const interval = setInterval(() => {
      if (!questionnairePostLoading) { // Don't auto save if we're still waiting for a response from another save (i.e. a triggered save)
        if (dataToUpdate && property_name && apiQuestionnaireData) {
          setDataToUpdate(false);
          update_questionnaire_to_API(property_name, {questionnaire:apiQuestionnaireData});
          console.log("Auto update triggered", property_name, apiQuestionnaireData);
        }
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [dataToUpdate, property_name, apiQuestionnaireData]);

  // Triggered save, for when the user explicitly clicks any "Save" button
  const triggerSave = async () => {
    if (dataToUpdate && property_name && apiQuestionnaireData) { // if dataToUpdate false, don't bother

      // If the questionnaire is still updating from another save (i.e. an autosave), busywait for it to finish to avoid concurrent updates
      let counter = 0;
      const maxWaitPeriods = 10;
      while (questionnairePostLoading && counter < maxWaitPeriods) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms polling interval
        counter++;
      }

      if (counter < maxWaitPeriods) {
        const api_resp_status = await update_questionnaire_to_API(property_name, {questionnaire:apiQuestionnaireData});
        if (api_resp_status === 200) { setDataToUpdate(false); }
      } else { } // max wait period exceeded. abort
    }
  }

  // When an input field is changed, update our questionnaire object
  const handleInputComponentChange = (event, sec_name, subsec_name, q_ind, question_type) => {
    if (question_type === "short_answer" || question_type === "long_answer") {
      apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].response_text = event.target.value;

    } else if (question_type === "select") {
      apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].response_option = event.target.value;

    } else if (question_type === "checkbox_group") {
      const question = apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind];
      if (event.target.checked) { // Add our selection to response_options, and a blank string to response_text and hide_for_reservations
        if (!question.response_options.includes(event.target.value)) {
          question.response_options.push(event.target.value); 
          question.response_text.push('');
          question.hide_for_reservations.push('');
        }
      } else { // Remove our selection from response_options, and the corresponding elements from response_text and hide_for_reservations
        const optionIndex = question.response_options.indexOf(event.target.value);
        if (optionIndex > -1) {
          question.response_options = question.response_options.filter((item) => item !== event.target.value);
          question.response_text.splice(optionIndex, 1);
          question.hide_for_reservations.splice(optionIndex, 1);
        }
      }
    }
    setDataToUpdate(true);
  }

  // When modal data is saved, update our questionnaire object and save to the API
  const handleModalSave = (resStageData, extraNoteData) => {
    const { sec_name, subsec_name, q_ind, checkbox_group_option } = dataForModal;
    const question_type = apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].question_type;

    if (question_type === "short_answer" || question_type === "long_answer") {
      apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].hide_for_reservations = JSON.stringify(resStageData);
    } else if (question_type === "select") {
      apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].hide_for_reservations = JSON.stringify(resStageData);
      apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].response_text = extraNoteData;
    } else if (question_type === "checkbox_group") {
      const question = apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind];
      const optionIndex = question.response_options.indexOf(checkbox_group_option);
      question.hide_for_reservations[optionIndex] = JSON.stringify(resStageData);
      question.response_text[optionIndex] = extraNoteData;
    }
    triggerSave();
  }

  // Trigger a save, then move to the next section (if there is one) or the previous section (if prev is true, and there is one)
  const handleSaveAndNext = (prev=false) => {
    triggerSave();
    const currSectionIndex = questionnaire_section_names.indexOf(selectedSection);
    if (prev && currSectionIndex > 0) { setSelectedSection(questionnaire_section_names[currSectionIndex - 1]); }
    else if (!prev && currSectionIndex < questionnaire_section_names.length - 1) { setSelectedSection(questionnaire_section_names[currSectionIndex + 1]); }
  }

  // When the pencil icon is clicked (in a form component, in a section): render the modal with the corresponding question data
  const handlePencilIconClick = (sec_name, subsec_name, q_ind, checkbox_group_option) => {
    const question = apiQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind];
    setDataForModal({ question_obj:question, sec_name:sec_name, subsec_name:subsec_name, q_ind:q_ind, checkbox_group_option:checkbox_group_option });
    setShowModal(true);
  }

  return (
    <div>
      <Helmet>
        <title>Edit Property</title>
      </Helmet>;
      <Container className="py-3">
        {apiQuestionnaireData ? (
          <>
            {/* Header */}
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <hr className="border-secondary" style={{ opacity: "1" }} />
              </div>
              <div className="col-12">
                <QuestionnaireHeader property_name={property_name} section_names={questionnaire_section_names} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
              </div>
            </div>

            {/* Form for questionnaire section (whichever is selected - render one at a time) */}
            <div className="row">
              <div className="col-lg-10 mx-auto mt-5 form_multisteps">
                <QuestionnaireSection questionnaire_section_name={selectedSection} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} handleSaveAndNext={handleSaveAndNext}/>
              </div>
            </div>

            {/* Pencil icon modal */}
            <PencilIconModal show={showModal} setShowModal={setShowModal} question_obj={dataForModal.question_obj} checkbox_group_option={dataForModal.checkbox_group_option} handleModalSave={handleModalSave} />
          </>
        ) : (
          <BoxLoader />
        )}
          
      </Container>
    </div>
  );
};

export default QuestionnairePage;
