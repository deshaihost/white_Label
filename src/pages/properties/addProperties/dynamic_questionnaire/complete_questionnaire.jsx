import React, { useState, useEffect, useRef } from "react";
import "../AddProperty.css";
import QuestionnaireHeader from "./questionnaire_header";
import { stateEmptyActions, updateQuestionnaireActions } from "../../../../redux/actions";
import { getQuestionnaireActions, resetQuestionnaireStateActions } from "../../../../redux/actions";
import { Container } from "react-bootstrap";
import { Helmet } from "react-helmet";
import QuestionnaireSection from "./questionnaire_section";
import QuestionnaireFirstPage from "./questionnaireFirstPage/questionnaire_first_page";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { FullScreenLoader } from "../../../../helper/Loader";
import ToastHandle from "../../../../helper/ToastMessage";
import axios from "axios";
import PencilIconModal from "./PencilIconModal";
import ExternalResourcesForm from "./ExternalResources/ExternalResourcesForm";
import { set } from "react-hook-form";


// Code for the entire questionnaire page, including the header and all sections, including Basics and External Resources.
const QuestionnairePage = ({ startAtPage=0, property_name:propPropertyName, jumpToSection=null, scrollToBottom=false, exitFunct=null }) => {
  const { property_name: paramPropertyName } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  
  // Use path param first, fall back to prop
  const property_name = paramPropertyName || propPropertyName;

  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const apiQuestionnaireData = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire;
  const section_order_data = store?.getQuestionnaireReducer?.getQuestionnaire?.data?.questionnaire?.metadata?.section_order

  // If jumpToSection is 'SOPs' but that section doesn't exist: use 'Extras' instead
  let sectionToJump = jumpToSection;
  if (section_order_data && sectionToJump === 'SOPs' && !section_order_data.includes('SOPs')) {
    sectionToJump = 'Extras';
  }

  let questionnaire_section_names = ["Resources", ...(section_order_data || [])]; // All pages; the first "resources" page plus all those retrieved from the dynamic questionnaire
  questionnaire_section_names = questionnaire_section_names.slice(startAtPage); // Start at the specified page, and forget the rest
  const jumpTo = sectionToJump || questionnaire_section_names[0];

  const [liveQuestionnaireData, setLiveQuestionnaireData] = useState({});
  const [selectedSection, setSelectedSection] = useState(jumpTo); // FYI - can be undefined if the questionnaire get hasn't finished yet, since questionnaire_section_names is not yet known
  const [questionnairePostLoading, setQuestionnairePostLoading] = useState(false);
  const [triggeredSaveLoading, setTriggeredSaveLoading] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState([]); // Sections that contain modified data to be saved
  const [showPencilModal, setShowPencilModal] = useState(false); // pencil icon modal
  const [dataForModal, setDataForModal] = useState({}); // data to be passed to the pencil icon modal
  const [doTriggeredSave, setDoTriggeredSave] = useState(false); // Set this to trigger a save
  const [triggeredSaveComplete, setTriggeredSaveComplete] = useState(false); // Set this to false after a triggered save is complete
  const [navigateToProperties, setNavigateToProperties] = useState(false); // Set this to redirect to properties page
  const [apiPropertyData, setApiPropertyData] = useState(null);

  const curr_sec_num = questionnaire_section_names.indexOf(selectedSection);
  const num_total_sections = questionnaire_section_names.length;

  // Get the questionnaire data from the API. Should run once, immediately when the page loads
  useEffect(() => {
    if (property_name) {
      dispatch(getQuestionnaireActions(property_name));
      return () => { dispatch(stateEmptyActions("getQuestionnaire")); } // Clear the state when the component unmounts
    }
  }, [property_name]);

  // When the API questionnaire data is available, set it to our local state
  useEffect(() => {
    if (apiQuestionnaireData) {
      setLiveQuestionnaireData(JSON.parse(JSON.stringify(apiQuestionnaireData))); // ensure deep copy
      setSelectedSection(jumpTo);
    }
  }, [apiQuestionnaireData]);

  // Get property data from the API
  const getPropertyDataFromAPI = async (propertyName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const response = await axios.get(`${baseUrl}/properties/${propertyName}`, config);

      if (response.status === 200) {
        setApiPropertyData(response.data.property);
      } else {  }
    } catch (error) {  }
  };

  // Update questionnaire data to the API
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
  }

  // On page load, get the property data from the API, if we have the property name and not done already
  useEffect(() => {
    if (property_name && !apiPropertyData) {
      getPropertyDataFromAPI(property_name);
    }
  }, [property_name, apiPropertyData]);

  // Auto save. After form data changes, wait for 3 seconds of no further changes, then save to the API
  useEffect(() => {
    const interval = setInterval(() => {
      if (!questionnairePostLoading) { // Don't auto save if we're still waiting for a response from another save (i.e. a triggered save)
        if (dataToUpdate.length > 0 && property_name && liveQuestionnaireData) { // Only include the sections in dataToUpdate in questionnaireDataToUpdate
          let questionnaireDataToUpdate = {questionnaire:{}};
          dataToUpdate.forEach((section) => {
            questionnaireDataToUpdate.questionnaire[section] = liveQuestionnaireData.questionnaire[section];
          });
          setDataToUpdate([]);
          update_questionnaire_to_API(property_name, {questionnaire:questionnaireDataToUpdate});
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [dataToUpdate, property_name, liveQuestionnaireData, questionnairePostLoading]);

  // Triggered save, for when the user explicitly clicks any "Save" button
  const triggerSave = async () => {
    //console.log("Triggered save");
    setTriggeredSaveLoading(true);
    if (dataToUpdate.length > 0 && property_name && liveQuestionnaireData) { // if dataToUpdate false, don't bother

      // If the questionnaire is still updating from another save (i.e. an autosave), busywait for it to finish to avoid concurrent updates
      let counter = 0;
      const maxWaitPeriods = 10;
      while (questionnairePostLoading && counter < maxWaitPeriods) {
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms polling interval
        counter++;
      }

      if (counter < maxWaitPeriods) {
        let questionnaireDataToUpdate = {questionnaire:{}};
        dataToUpdate.forEach((section) => {
          questionnaireDataToUpdate.questionnaire[section] = liveQuestionnaireData.questionnaire[section];
        });
        const api_resp_status = await update_questionnaire_to_API(property_name, {questionnaire:questionnaireDataToUpdate});
        if (api_resp_status === 200) {
          setDataToUpdate([]);
        }
      } else { } // max wait period exceeded. abort
    }
    setTriggeredSaveLoading(false);
    setTriggeredSaveComplete(true);
  }

  // Clear the triggered save complete flag after a second (of it being set)
  useEffect(() => {
    if (triggeredSaveComplete) {
      const timeout = setTimeout(() => { setTriggeredSaveComplete(false); }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [triggeredSaveComplete]);

  // Redirect to properties page when navigateToProperties is set, and the triggered save is complete
  useEffect(() => {
    if (navigateToProperties && triggeredSaveComplete) {
      navigate('/properties');
    }
  }, [navigateToProperties, triggeredSaveComplete]);

  // Handle triggered save calls. Need to use a UseEffect to ensure dependencies are properly available
  useEffect(() => {
    if (doTriggeredSave) {
      if (dataToUpdate.length > 0) {
        setDoTriggeredSave(false);
        triggerSave();
      } else {
        setTriggeredSaveComplete(true);
        setDoTriggeredSave(false);
      }
    }
  }, [dataToUpdate, doTriggeredSave]);

  // When an input field is changed, update our questionnaire object
  const handleInputComponentChange = (event, sec_name, subsec_name, q_ind, question_type) => {
    setLiveQuestionnaireData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      
      // Ensure section exists
      if (!newData.questionnaire[sec_name]) {
        newData.questionnaire[sec_name] = {};
      }
      
      // Ensure subsection exists
      if (!newData.questionnaire[sec_name][subsec_name]) {
        newData.questionnaire[sec_name][subsec_name] = [];
      }
      
      // Check if we have a question_text coming from the event
      const questionText = event.target?.dataset?.questionText || "";
      
      // Ensure question at index exists
      while (newData.questionnaire[sec_name][subsec_name].length <= q_ind) {
        newData.questionnaire[sec_name][subsec_name].push({
          question_text: questionText, // Use the question text from the event if available
          question_type: question_type,
          response_text: question_type === "checkbox_group" ? [] : "",
          placeholder_text: "",
          hide_for_reservations: question_type === "checkbox_group" ? [] : "[]"
        });
      }

      if (question_type === "short_answer" || question_type === "long_answer") {
        // Only update response_text, preserve existing question_text
        newData.questionnaire[sec_name][subsec_name][q_ind].response_text = event.target.value;
        // If we have a question_text in the event, update it
        if (questionText) {
          newData.questionnaire[sec_name][subsec_name][q_ind].question_text = questionText;
        }
        // Only set placeholder_text if it is currently empty
        if (
          event.target?.dataset?.placeholderText &&
          !newData.questionnaire[sec_name][subsec_name][q_ind].placeholder_text
        ) {
          newData.questionnaire[sec_name][subsec_name][q_ind].placeholder_text =
            event.target.dataset.placeholderText;
        }
      } else if (question_type === "select") {
        newData.questionnaire[sec_name][subsec_name][q_ind].response_option = event.target.value;

      } else if (question_type === "checkbox_group") {
        const question = newData.questionnaire[sec_name][subsec_name][q_ind];
        if (!question.response_options) question.response_options = [];
        if (!question.response_text) question.response_text = [];
        if (!question.hide_for_reservations) question.hide_for_reservations = [];
        
        if (event.target.checked) {
          if (!question.response_options.includes(event.target.value)) {
            question.response_options.push(event.target.value); 
            question.response_text.push('');
            question.hide_for_reservations.push('');
          }
        } else {
          const optionIndex = question.response_options.indexOf(event.target.value);
          if (optionIndex > -1) {
            question.response_options = question.response_options.filter((item) => item !== event.target.value);
            question.response_text.splice(optionIndex, 1);
            question.hide_for_reservations.splice(optionIndex, 1);
          }
        }
      }
      return newData;
    });
    console.log("Input component changed");
    setDataToUpdate([...(dataToUpdate || []), sec_name]);
  }

  // When modal data is saved, update our questionnaire object and save to the API
  const handleModalSave = (resStageData, extraNoteData) => {
    const { sec_name, subsec_name, q_ind, checkbox_group_option } = dataForModal;
    const question_type = liveQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind].question_type;
    setDataToUpdate([...(dataToUpdate || []), sec_name]); // if this isn't set, then the triggered save funct won't do anything
  
    setLiveQuestionnaireData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData)); // Create a deep copy of the previous state
  
      if (question_type === "short_answer" || question_type === "long_answer") {
        newData.questionnaire[sec_name][subsec_name][q_ind].hide_for_reservations = JSON.stringify(resStageData);
      } else if (question_type === "select") {
        newData.questionnaire[sec_name][subsec_name][q_ind].hide_for_reservations = JSON.stringify(resStageData);
        newData.questionnaire[sec_name][subsec_name][q_ind].response_text = extraNoteData;
      } else if (question_type === "checkbox_group") {
        const question = newData.questionnaire[sec_name][subsec_name][q_ind];
        const optionIndex = question.response_options.indexOf(checkbox_group_option);
        const newHideForReservations = [...question.hide_for_reservations];
        const newResponseText = [...question.response_text];
        newHideForReservations[optionIndex] = JSON.stringify(resStageData);
        newResponseText[optionIndex] = extraNoteData;
        question.hide_for_reservations = newHideForReservations;
        question.response_text = newResponseText;
      }
  
      return newData;
    });
  
    setDoTriggeredSave(true);
  };

  // Trigger a save, then move to the next section (if there is one) or the previous section (if prev is true, and there is one), or return to properties page
  const handleSaveAndNext = (prev=false) => {
    setDoTriggeredSave(true);
    const currSectionIndex = questionnaire_section_names.indexOf(selectedSection);
    if (prev && currSectionIndex === 0) {
      if (exitFunct) { exitFunct(); }
      else { setNavigateToProperties(true); }
    }
    else if (prev && currSectionIndex > 0) { setSelectedSection(questionnaire_section_names[currSectionIndex - 1]); }
    else if (!prev && currSectionIndex < questionnaire_section_names.length - 1) { setSelectedSection(questionnaire_section_names[currSectionIndex + 1]); }
    else if (!prev && currSectionIndex === questionnaire_section_names.length - 1) {
      if (exitFunct) { exitFunct(); }
      else {setNavigateToProperties(true);}
    }
  }

  const callDeleteQuestionApi = async (sectionName, subSectionName, questionText, propertyName) => {
    const baseUrl = process.env.REACT_APP_API_ENDPOINT;
    const API_KEY = process.env.REACT_APP_API_KEY;

    try {
      const config = {
        headers: {"X-API-Key": API_KEY},
        validateStatus: function (status) { return status >= 200 && status < 500; } // don't throw an error for non-2xx responses
      };
      const body_data = {section_name:sectionName, subsection_name:subSectionName, question_text:questionText, property_names:[propertyName]};
      const response = await axios.post(`${baseUrl}/delete_questionnaire_question`, body_data, config);

      if (response.status === 200) { 
        ToastHandle('Successfully deleted question', 'success'); 
        dispatch(getQuestionnaireActions(propertyName)); // Re-fetch the questionnaire. This should also trigger a re-render
      }
      else { ToastHandle(response?.data?.error || 'Failed to delete question', 'danger'); }
    } catch (error) { ToastHandle('Failed to delete question', 'danger'); }
  }

  // When the pencil icon is clicked (in a form component, in a section): render the modal with the corresponding question data
  const handlePencilIconClick = (sec_name, subsec_name, q_ind, checkbox_group_option) => {
    const question = liveQuestionnaireData.questionnaire[sec_name][subsec_name][q_ind];
    setDataForModal({ question_obj:question, sec_name:sec_name, subsec_name:subsec_name, q_ind:q_ind, checkbox_group_option:checkbox_group_option });
    setShowPencilModal(true);
  }

  // Add scroll to bottom effect
  useEffect(() => {
    if (scrollToBottom && apiQuestionnaireData) {
      // Find the closest scrollable parent container
      const findScrollableParent = (element) => {
        if (!element) return document.documentElement;
        
        const style = window.getComputedStyle(element);
        const overflowY = style.getPropertyValue('overflow-y');
        
        if (overflowY === 'auto' || overflowY === 'scroll') {
          return element;
        }
        
        return findScrollableParent(element.parentElement);
      };

      const scrollableContainer = findScrollableParent(containerRef.current);
      scrollableContainer.scrollTo({
        top: scrollableContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [scrollToBottom, apiQuestionnaireData]);

  return (
    <div ref={containerRef}>
      <Helmet>
        <title>Edit Property</title>
      </Helmet>
      <Container className="py-3">
        {apiQuestionnaireData ? (
          <>
            {/* Header, with section names and progress bar */}
            <div className="row">
              <div className="col-lg-8 mx-auto">
                <hr className="border-secondary" style={{ opacity: "1" }} />
              </div>
              <div className="col-12">
                <QuestionnaireHeader property_name={property_name} section_names={questionnaire_section_names} selectedSection={selectedSection} setSelectedSection={setSelectedSection} />
              </div>
            </div>

            {/* Form for questionnaire section (whichever is selected - render one at a time) and next/prev buttons */}
            <div className="row">
              <div className="col-lg-10 mx-auto mt-5 form_multisteps">
                {selectedSection !== "External Resources" ? (
                  selectedSection === "Resources" ? (
                    <QuestionnaireFirstPage handleSaveAndNext={handleSaveAndNext} triggeredSaveLoading={triggeredSaveLoading} property_name={property_name} apiPropertyData={apiPropertyData} setApiPropertyData={setApiPropertyData} getPropertyDataFromAPI={getPropertyDataFromAPI}/>
                  ) : (
                    selectedSection && Object.keys(liveQuestionnaireData).length > 0 &&
                      <QuestionnaireSection questionnaire_section_name={selectedSection} liveQuestionnaireData={liveQuestionnaireData} handleInputComponentChange={handleInputComponentChange} handlePencilIconClick={handlePencilIconClick} handleSaveAndNext={handleSaveAndNext} triggeredSaveLoading={triggeredSaveLoading} property_name={property_name} section_num={curr_sec_num} num_total_sections={num_total_sections}/>
                  )
                ) : (
                  <ExternalResourcesForm property_name={property_name} handleSaveAndNext={handleSaveAndNext}/>
                )}
              </div>
            </div>

            {/* Pencil icon modal */}
            <PencilIconModal show={showPencilModal} setShowModal={setShowPencilModal} question_obj={dataForModal.question_obj} checkbox_group_option={dataForModal.checkbox_group_option} handleModalSave={handleModalSave} callDeleteQuestionApi={callDeleteQuestionApi} sectionName={dataForModal.sec_name} subSectionName={dataForModal.subsec_name} questionIndex={dataForModal.q_ind} propertyName={property_name} />
          </>
        ) : (
          <div style={{ paddingTop: '200px', paddingBottom: '200px' }}>
            <FullScreenLoader />
          </div>
        )}
          
      </Container>
    </div>
  );
};

export default QuestionnairePage;
